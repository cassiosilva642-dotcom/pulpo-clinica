# Integração de WASI e SON-R no `corretor_pulpo_piloto.html`

Este guia mostra exatamente onde colar cada pedaço, seguindo o mesmo padrão
já usado para o WAIS-III no app (`tipo: "ponderado+qi"`). Os dois instrumentos
usam os arquivos `wasi.bundle.json` e `sonr.bundle.json` (formato já pronto
para virar `BUNDLE.instrumentos['WASI']` / `BUNDLE.instrumentos['SON-R']`).

## 1. Registrar no BUNDLE

No objeto gigante `const BUNDLE = {...}` (linha ~300), dentro de
`"instrumentos": { ... }`, adicione duas entradas irmãs de `"WAIS-III"`:

```js
"WASI": <conteúdo de wasi.bundle.json>,
"SON-R": <conteúdo de sonr.bundle.json>,
```

(Copie o JSON dos arquivos direto — já estão no formato
`{tipo, pendencias, nota, dados:{...}}` igual ao WAIS-III.)

## 2. Registrar em `META` (perto de `WAIS-III`)

```js
const META = {
  ...
  'WASI':{desc:'Escala Wechsler Abreviada de Inteligência (4 subtestes)',kind:'bruto → ponderado + QI'},
  'SON-R':{desc:'Teste Não-verbal de Inteligência (Snijders-Oomen) — Mosaicos, Categorias, Situações, Padrões',kind:'bruto → normatizado + QI'},
  ...
};
```

## 3. Ordem canônica de subtestes (perto de `WAIS_ORDER`)

```js
const WASI_ORDER=['Vocabulário','Semelhanças','Cubos','Raciocínio Matricial'];
const SONR_ORDER=['Mosaicos','Categorias','Situações','Padrões'];
```

## 4. Funções de lookup (perto de `engWAIS` / `engWAISqi`)

**Atenção — diferença importante em relação ao WAIS-III:** no WASI, quem
alimenta as tabelas de QI (A3-A6) é a **soma do Escore T** (20-80 por
subteste), não a soma do ponto ponderado (1-19) como no WAIS-III. Por isso
`tabela_A1_brutos_para_escoreT` guarda o Escore T diretamente — é esse valor
que deve ser somado para consultar `tabela_A3/A4/A5/A6`. O ponto ponderado
(1-19) existe à parte, só para fins de exibição no gráfico de perfil
(`tabela_A2_escoreT_para_pontoPonderado`), e **não** entra no cálculo do QI.

```js
function engWASI(key,bruto){const t=BUNDLE.instrumentos['WASI'].dados.tabela_A1_brutos_para_escoreT[SEL.faixa][key];
  const h=[];for(const p in t){const c=t[p];if(c.bruto_min<=bruto&&bruto<=c.bruto_max)h.push(+p);}
  if(!h.length)return{oob:true};return h.length>1?{escoreT:h[0],amb:h}:{escoreT:h[0]};}
function engWASIqi(tabela,soma){for(const l of BUNDLE.instrumentos['WASI'].dados[tabela]){if(l.soma===soma)return l;}return null;}
function engWASIponderado(escoreT){return BUNDLE.instrumentos['WASI'].dados.tabela_A2_escoreT_para_pontoPonderado[String(escoreT)];} // só para exibição

function engSONR(key,bruto){const t=BUNDLE.instrumentos['SON-R'].dados.tabela_A1_brutos_para_normatizados[SEL.faixa][key];
  const h=[];for(const p in t){const c=t[p];if(c.bruto_min<=bruto&&bruto<=c.bruto_max)h.push(+p);}
  if(!h.length)return{oob:true};return h.length>1?{normatizado:h[0],amb:h}:{normatizado:h[0]};}
function engSONRqi(tabela,soma){for(const l of BUNDLE.instrumentos['SON-R'].dados[tabela]){if(l.soma===soma)return l;}return null;}
```

## 5. Composição das escalas (perto de `WAIS_IDX`)

```js
const WASI_IDX={
  'Q.I. Verbal':{subs:['Vocabulário','Semelhanças'],tab:'tabela_A3_QI_Verbal'},
  'Q.I. Execução':{subs:['Cubos','Raciocínio Matricial'],tab:'tabela_A4_QI_Execucao'},
  'Q.I. Total (4 subtestes)':{subs:['Vocabulário','Semelhanças','Cubos','Raciocínio Matricial'],tab:'tabela_A5_QI_Total',total:true},
  'Q.I. Total (2 subtestes)':{subs:['Vocabulário','Raciocínio Matricial'],tab:'tabela_A6_QI_Total2'},
};
// nota: tabela_A3/A4/A5/A6 trazem ic_90_crianca/ic_90_adulto/ic_95_crianca/ic_95_adulto
// (WASI atende 6-89 anos, diferente do WAIS que so tem faixa adulta) — escolha o
// campo certo comparando a idade do paciente com o limiar de 17 anos.

const SONR_IDX={
  'Escala de Execução (SON-EE)':{subs:['Mosaicos','Padrões'],tab:'tabela_EE',semQI:true},
  'Escala de Raciocínio (SON-ER)':{subs:['Categorias','Situações'],tab:'tabela_ER',semQI:true},
  'SON-QI':{subs:['Mosaicos','Categorias','Situações','Padrões'],tab:'tabela_QI',total:true},
};
// nota: tabela_EE e tabela_ER sao {soma,valor} simples (EE/ER, media100 dp15,
// sem percentil/IC tabelado — o manual so da IC80 fixo p/ EE(±9) e ER(±10),
// ja documentado em sonr.json->intervalos_confianca_80_simplificados).
// tabela_QI e {soma,qi,percentil,ic_80}.
```

## 6. Itens de entrada (dentro de `itemsFor`, perto do bloco `WAIS-III`)

```js
if(name==='WASI'){const avail=d.tabela_A1_brutos_para_escoreT[SEL.faixa];
  return WASI_ORDER.filter(k=>avail[k]).map(k=>({key:k,label:k}));}
if(name==='SON-R'){const avail=d.tabela_A1_brutos_para_normatizados[SEL.faixa];
  return SONR_ORDER.filter(k=>avail[k]).map(k=>({key:k,label:k}));}
```

## 7. Seletor de faixa etária (dentro de `buildForm`, perto do bloco `WAIS-III`)

```js
if(name==='WASI'){
  const bands=Object.keys(d.tabela_A1_brutos_para_escoreT); SEL.faixa=bands[0];
  const {f}=selField('Faixa etária',bands,v=>{SEL.faixa=v;rebuild();}); row.appendChild(f);
}
if(name==='SON-R'){
  const bands=Object.keys(d.tabela_A1_brutos_para_normatizados); SEL.faixa=bands[0];
  const {f}=selField('Faixa etária',bands,v=>{SEL.faixa=v;rebuild();}); row.appendChild(f);
}
```

## 8. Renderização dos resultados (dentro de `compute`, copiar o bloco `WAIS-III` e adaptar)

```js
else if(name==='WASI'){
  head=`<tr><th>Subteste</th><th class="num">Bruto</th><th class="num">Escore T</th><th class="num">Pont. Ponder.</th></tr>`;
  const pond={}; // aqui "pond" guarda o ESCORE T (nome mantido só por paralelismo com o bloco WAIS-III)
  ins.forEach(x=>{const r=engWASI(x.key,x.val);
    if(!r.oob)pond[x.key]=r.escoreT;
    const cell=r.oob?'<span class="oob">fora da tabela</span>':(r.amb?ambSpan(r.amb):`<span class="big">${r.escoreT}</span>`);
    const pp=r.oob?'':engWASIponderado(r.escoreT)??'';
    rows+=`<tr><td>${x.key}</td><td class="num">${x.val}</td><td class="num">${cell}</td><td class="num subtle">${pp}</td></tr>`;});
  let irows='';
  const adulto = !SEL.faixa.includes(':'); // faixas de criança/adolescente têm ":" (ex. "9:0 - 9:3"); faixas adultas não (ex. "17 - 19")
  for(const nome in WASI_IDX){const cfg=WASI_IDX[nome];
    const faltando=cfg.subs.filter(s=>!(s in pond));
    if(faltando.length){continue;}
    const soma=cfg.subs.reduce((a,s)=>a+pond[s],0);
    let comp=null,pc='—',ic='—';
    if(cfg.tab){const l=engWASIqi(cfg.tab,soma);
      if(l){comp=l.qi;pc=l.percentil;ic=adulto?(l.ic_95_adulto||l.ic_90_adulto):(l.ic_95_crianca||l.ic_90_crianca);}}
    const cls=classifica(comp);
    const strong=cfg.total?' style="background:var(--teal-wash)"':'';
    irows+=`<tr${strong}><td>${nome}</td><td class="num">${soma}</td><td class="num"><span class="big">${comp??'—'}</span></td><td class="num">${pc}</td><td class="num subtle">${ic}</td><td class="cls">${cls}</td></tr>`;
  }
  const idxTable = irows?`<p class="eyebrow" style="margin:28px 0 10px">Conversão em pontos compostos</p>
    <table class="rtable"><thead><tr><th>Escala</th><th class="num">Soma Escore T</th><th class="num">QI</th><th class="num">Percentil</th><th class="num">IC</th><th>Classificação</th></tr></thead><tbody>${irows}</tbody></table>`
    :'<p class="subtle" style="margin-top:18px">Preencha os subtestes de uma escala completa para ver o QI.</p>';
  res.classList.remove('hidden');
  res.innerHTML=`<table class="rtable"><thead>${head}</thead><tbody>${rows}</tbody></table>${idxTable}`+
    `<p class="foot" style="border:none;margin-top:16px">45 faixas etárias (6-89 anos). A soma que entra nas tabelas de QI é do Escore T (não do ponto ponderado). QIV=VC+SM, QIE=CB+RM, QIT-4=os 4, QIT-2=VC+RM. ${AMB_FOOT}</p>`;
  setStep(3); res.scrollIntoView({behavior:'smooth',block:'nearest'});
  return;
}
else if(name==='SON-R'){
  head=`<tr><th>Subteste</th><th class="num">Bruto</th><th class="num">Normatizado</th></tr>`;
  const norm={};
  ins.forEach(x=>{const r=engSONR(x.key,x.val);
    if(!r.oob)norm[x.key]=r.normatizado;
    const cell=r.oob?'<span class="oob">fora da tabela</span>':(r.amb?ambSpan(r.amb):`<span class="big">${r.normatizado}</span>`);
    rows+=`<tr><td>${x.key}</td><td class="num">${x.val}</td><td class="num">${cell}</td></tr>`;});
  let irows='';
  for(const nome in SONR_IDX){const cfg=SONR_IDX[nome];
    const faltando=cfg.subs.filter(s=>!(s in norm));
    if(faltando.length){continue;}
    const soma=cfg.subs.reduce((a,s)=>a+norm[s],0);
    let comp=null,pc='—',ic='—';
    if(cfg.semQI){const l=engSONRqi(cfg.tab,soma); if(l)comp=l.valor;
      ic = cfg.tab==='tabela_EE' ? `${comp-9} - ${comp+9}` : `${comp-10} - ${comp+10}`; // IC80 fixo (manual)
    } else {
      const l=engSONRqi(cfg.tab,soma); if(l){comp=l.qi;pc=l.percentil;ic=l.ic_80;}
    }
    const cls=classifica(comp);
    const strong=cfg.total?' style="background:var(--teal-wash)"':'';
    irows+=`<tr${strong}><td>${nome}</td><td class="num">${soma}</td><td class="num"><span class="big">${comp??'—'}</span></td><td class="num">${pc}</td><td class="num subtle">${ic}</td><td class="cls">${cls}</td></tr>`;
  }
  const idxTable = irows?`<p class="eyebrow" style="margin:28px 0 10px">Conversão em pontos compostos</p>
    <table class="rtable"><thead><tr><th>Escala</th><th class="num">Soma norm.</th><th class="num">Escore</th><th class="num">Percentil</th><th class="num">IC 80%</th><th>Classificação</th></tr></thead><tbody>${irows}</tbody></table>`
    :'<p class="subtle" style="margin-top:18px">Preencha os 4 subtestes para ver o SON-QI.</p>';
  res.classList.remove('hidden');
  res.innerHTML=`<table class="rtable"><thead>${head}</thead><tbody>${rows}</tbody></table>${idxTable}`+
    `<p class="foot" style="border:none;margin-top:16px">66 idades (2;6 a 7;11). SON-EE=Mosaicos+Padrões, SON-ER=Categorias+Situações, SON-QI=os 4. ⚠ Padrões/idade 5;9/bruto 8 tem discrepância não resolvida — ver nota do instrumento. ${AMB_FOOT}</p>`;
  setStep(3); res.scrollIntoView({behavior:'smooth',block:'nearest'});
  return;
}
```

## 9. Coletor para o gerador de laudo (perto de `coletorWechslerWAIS`)

```js
const WASI_SIGLA={'Q.I. Total (4 subtestes)':'QIT4','Q.I. Total (2 subtestes)':'QIT2','Q.I. Verbal':'QIV','Q.I. Execução':'QIE'};
function coletorWechslerWASI(){
  const brutos=lerBrutos();const pond={}; // guarda Escore T (ver observação da seção 4)
  for(const k in brutos){const r=engWASI(k,brutos[k]);if(r&&!r.oob&&!r.amb)pond[k]=r.escoreT;else if(r&&r.amb)pond[k]=r.amb[0];}
  const indices={};
  for(const nome in WASI_IDX){const cfg=WASI_IDX[nome];if(cfg.subs.some(s=>!(s in pond)))continue;
    const soma=cfg.subs.reduce((a,s)=>a+pond[s],0);
    const l=engWASIqi(cfg.tab,soma);if(!l)continue;
    const sigla=WASI_SIGLA[nome];if(!sigla)continue;
    indices[sigla]={pont:l.qi,ic:parseIC(l.ic_95_crianca||l.ic_95_adulto),percentil:l.percentil,
      classificacao:(NORM_WECHSLER[classifica(l.qi)]||classifica(l.qi))};}
  return {indices};}

function coletorSONR(){
  const brutos=lerBrutos();const norm={};
  for(const k in brutos){const r=engSONR(k,brutos[k]);if(r&&!r.oob&&!r.amb)norm[k]=r.normatizado;else if(r&&r.amb)norm[k]=r.amb[0];}
  const indices={};
  for(const nome in SONR_IDX){const cfg=SONR_IDX[nome];if(cfg.subs.some(s=>!(s in norm)))continue;
    const soma=cfg.subs.reduce((a,s)=>a+norm[s],0);
    const l=engSONRqi(cfg.tab,soma);if(!l)continue;
    const sigla = cfg.tab==='tabela_EE'?'SON_EE':cfg.tab==='tabela_ER'?'SON_ER':'SON_QI';
    indices[sigla]={pont: l.valor!=null?l.valor:l.qi, percentil: l.percentil,
      classificacao: classifica(l.valor!=null?l.valor:l.qi)};}
  return {indices};}
```

## Observações importantes

- **WASI**: nota de verificação em `wasi.json` → `estado_de_verificacao` (extraído
  de planilha Excel digital, 6 correções de digitação aplicadas, zero
  inconsistência restante; não validado contra caso clínico real).
- **SON-R**: nota de verificação em `sonr.json` → `estado_de_verificacao` — tem
  **1 discrepância não resolvida** (Padrões, idade 5;9, bruto=8). Mantive
  `pendencias:1` no bundle para o app mostrar o aviso (⚠) no card, igual já
  faz para outros instrumentos com pendências.
- Os arquivos `wasi.engine.js` e `sonr.engine.js` (motor standalone, formato
  `ENGINES`) continuam existindo e são mais ricos (Z-Score, classificação
  Guilmette por subteste, alertas de discrepância automáticos) — use-os se
  preferir estender o padrão `ENGINES` em vez do padrão `BUNDLE`. Os arquivos
  `.bundle.json` aqui são a via rápida para encaixar no padrão que o app já
  usa para WISC-IV/WAIS-III sem escrever lógica nova de score.
