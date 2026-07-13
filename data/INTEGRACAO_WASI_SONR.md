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
    `<p class="foot" style="border:none;margin-top:16px">66 idades (2;6 a 7;11). SON-EE=Mosaicos+Padrões, SON-ER=Categorias+Situações, SON-QI=os 4. Validado 16/16 contra os 3 casos clínicos do manual. ${AMB_FOOT}</p>`;
  setStep(3); res.scrollIntoView({behavior:'smooth',block:'nearest'});
  return;
}
```

> Este bloco (tabelas simples) continua funcional e é o mínimo necessário. A
> **seção 10** abaixo mostra como trocar o `idxTable`/`res.innerHTML` deste
> bloco por um painel visual estilo "Folha de Registro" do manual (curvas de
> sino + réguas de percentil), que foi pedido explicitamente para o SON-R.

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

## 10. Painel "Folha de Registro" do SON-R (curvas de sino + réguas de percentil)

Pedido explícito: os resultados do SON-R devem aparecer **abaixo do formulário
de entrada** (o `res` do app já fica lá — não precisa mudar isso) e devem se
parecer com a **Folha de Registro** oficial do manual: uma tabela de
Subtestes (B / Idade Ref. / N) com uma régua de percentil por subteste, e uma
tabela de Escores Totais (Idade Ref. / N / 80%-int) com régua de percentil,
mais a linha `SON-QI pct=X% f=0,91 g=0,83` e a linha `EE-ER: n.s. / p<0,05 /
p<0,01`.

Na Folha de Registro impressa, os 9 rótulos de percentil (`1% 2% 10% 25% 50%
75% 90% 98% 99%`) ficam alinhados **diretamente acima** dos 9 valores de
escala (`2 4 6 8 10 12 14 16 18` para subtestes; `60 70 80 ... 140` para os
totais) — não é um eixo de percentil calculado com precisão estatística, é um
alinhamento fixo 1-para-1 igual ao formulário. O código abaixo reproduz
exatamente isso.

### 10.1 CSS (perto do resto do `<style>`)

```css
.folha-tabela td, .folha-tabela th { vertical-align: middle; }
.folha-linha-cell { min-width: 260px; position: relative; }
.folha-regua { display: block; width: 100%; height: 54px; color: var(--ink, #334155); }
.folha-tag { display: block; font-size: 11px; opacity: .6; text-align: right; margin-top: -4px; }
```

### 10.2 JS — régua de percentil (helper reutilizável)

```js
// 9 rótulos de percentil, alinhados 1-para-1 com os 9 ticks de valor (replica o formulário impresso)
const FOLHA_PCT_LABELS = ['1%','2%','10%','25%','50%','75%','90%','98%','99%'];

// Desenha uma régua horizontal com 9 marcações (percentil em cima, valor embaixo)
// e um X na posição do escore do paciente. min/max/step devem gerar 9 pontos.
function folhaNumberLineSVG(min, max, step, valor, w, h){
  const n = Math.round((max-min)/step)+1; // 9
  const mx = 18, usableW = w - mx*2;
  const xAt = i => mx + (usableW*i)/(n-1);
  let ticks='', labels='', pcts='';
  for(let i=0;i<n;i++){
    const val = min+i*step, x = xAt(i);
    ticks  += `<line x1="${x}" y1="${h*0.30}" x2="${x}" y2="${h*0.62}" stroke="currentColor" stroke-width="1"/>`;
    labels += `<text x="${x}" y="${h*0.85}" text-anchor="middle" font-size="10">${val}</text>`;
    pcts   += `<text x="${x}" y="${h*0.16}" text-anchor="middle" font-size="9" opacity="0.65">${FOLHA_PCT_LABELS[i]||''}</text>`;
  }
  ticks += `<line x1="${mx}" y1="${h*0.46}" x2="${w-mx}" y2="${h*0.46}" stroke="currentColor" stroke-width="1"/>`;
  let marker='';
  if(valor!=null && !isNaN(valor)){
    const clamped = Math.max(min, Math.min(max, valor));
    const x = mx + usableW*(clamped-min)/(max-min);
    marker = `<text x="${x}" y="${h*0.58}" text-anchor="middle" font-size="13" font-weight="700" fill="var(--teal,#0d9488)">✕</text>`;
  }
  return `<svg viewBox="0 0 ${w} ${h}" class="folha-regua" preserveAspectRatio="none">${pcts}${ticks}${labels}${marker}</svg>`;
}
```

### 10.3 Substituir o bloco `else if(name==='SON-R')` da seção 8 por este

```js
else if(name==='SON-R'){
  const bruto={}, norm={}, amb={};
  ins.forEach(x=>{const r=engSONR(x.key,x.val);
    bruto[x.key]=x.val;
    if(!r.oob)norm[x.key]=r.normatizado;
    if(r.amb)amb[x.key]=r.amb;
  });

  const somaEE = (norm.Mos!=null && norm.Pad!=null) ? norm.Mos+norm.Pad : null;
  const somaER = (norm.Cat!=null && norm.Sit!=null) ? norm.Cat+norm.Sit : null;
  const soma14 = (somaEE!=null && somaER!=null) ? somaEE+somaER : null;

  const eeLinha = somaEE!=null ? engSONRqi('tabela_EE', somaEE) : null;
  const erLinha = somaER!=null ? engSONRqi('tabela_ER', somaER) : null;
  const qiLinha = soma14!=null ? engSONRqi('tabela_QI', soma14) : null;

  const eeValor = eeLinha?.valor ?? null;
  const erValor = erLinha?.valor ?? null;
  const icCfg = d.intervalos_confianca_80_simplificados;
  const eeIC = eeValor!=null ? `${eeValor-icCfg.SON_EE.meia_amplitude} - ${eeValor+icCfg.SON_EE.meia_amplitude}` : null;
  const erIC = erValor!=null ? `${erValor-icCfg.SON_ER.meia_amplitude} - ${erValor+icCfg.SON_ER.meia_amplitude}` : null;
  const qiValor = qiLinha?.qi ?? null;
  const qiPct   = qiLinha?.percentil ?? null;
  const qiIC    = qiLinha?.ic_80 ?? null;

  const dif = (eeValor!=null && erValor!=null) ? Math.abs(eeValor-erValor) : null;
  const lim = d.diferenca_ee_er_significativa;
  const sig = dif==null ? null : dif>=lim.p01 ? 'p01' : dif>=lim.p05 ? 'p05' : 'ns';

  function linhaSub(nome, tag, key){
    const b=bruto[key], n=norm[key], a=amb[key];
    const nCell = n!=null ? `<span class="big">${n}</span>` : (a?ambSpan(a):'<span class="oob">—</span>');
    return `<tr><td>${nome}</td><td class="num">${b??'—'}</td><td class="num subtle">—</td>
      <td class="num">${nCell}</td>
      <td class="folha-linha-cell">${n!=null?folhaNumberLineSVG(2,18,2,n,260,54):''}<span class="folha-tag">${tag}</span></td></tr>`;
  }
  function linhaTot(nome, valor, ic){
    return `<tr><td>${nome}</td><td class="num subtle">—</td>
      <td class="num">${valor!=null?`<span class="big">${valor}</span>`:'—'}</td>
      <td class="num subtle">${ic??'—'}</td>
      <td class="folha-linha-cell">${valor!=null?folhaNumberLineSVG(60,140,10,valor,260,54):''}</td></tr>`;
  }

  res.classList.remove('hidden');
  res.innerHTML = `
    <p class="eyebrow" style="margin:8px 0 10px">Folha de Registro — Subtestes</p>
    <table class="rtable folha-tabela">
      <thead><tr><th>Subteste</th><th class="num">B</th><th class="num">Idade Ref.</th><th class="num">N</th><th></th></tr></thead>
      <tbody>
        ${linhaSub('1. Mosaicos','Mos (EE)','Mos')}
        ${linhaSub('2. Categorias','Cat (ER)','Cat')}
        ${linhaSub('3. Situações','Sit (ER)','Sit')}
        ${linhaSub('4. Padrões','Pad (EE)','Pad')}
      </tbody>
    </table>
    <p class="foot" style="border:none;margin-top:6px">Soma [1 e 4] = ${somaEE??'—'} &nbsp;+&nbsp; Soma [2 e 3] = ${somaER??'—'} &nbsp;=&nbsp; Soma [1-4] = ${soma14??'—'}</p>

    <p class="eyebrow" style="margin:28px 0 10px">Folha de Registro — Escores Totais</p>
    <table class="rtable folha-tabela">
      <thead><tr><th>Escore Total</th><th class="num">Idade Ref.</th><th class="num">N</th><th class="num">80%-int</th><th></th></tr></thead>
      <tbody>
        ${linhaTot('SON-EE', eeValor, eeIC)}
        ${linhaTot('SON-ER', erValor, erIC)}
        ${linhaTot('SON-QI', qiValor, qiIC)}
      </tbody>
    </table>

    <p class="foot" style="border:none;margin-top:10px">
      SON-QI &nbsp; pct = <b>${qiPct??'—'}%</b> &nbsp; f = 0,91 &nbsp; g = 0,83
      &nbsp;&nbsp;|&nbsp;&nbsp;
      EE-ER: ${sig==='ns'?'<b>n.s.</b>':'n.s.'} / ${sig==='p05'?'<b>p&lt;0,05</b>':'p&lt;0,05'} / ${sig==='p01'?'<b>p&lt;0,01</b>':'p&lt;0,01'}
      ${dif!=null?`<span class="subtle"> (diferença = ${dif})</span>`:''}
    </p>
    <p class="foot" style="border:none;margin-top:4px">"Idade Ref." não é calculada por este motor — depende do software oficial do SON-R (algoritmo não documentado nas tabelas de normas extraídas).</p>
    <p class="foot" style="border:none;margin-top:2px">IC80% do SON-QI vem direto da Tabela 76 (exato). IC80% de SON-EE/SON-ER usa o método simplificado do manual (amplitude fixa ±${icCfg.SON_EE.meia_amplitude}/±${icCfg.SON_ER.meia_amplitude} sobre o escore bruto) — o manual também oferece um método mais preciso por "escore verdadeiro" com coeficiente de fidedignidade por idade (Tabelas 30/31), não incluído aqui; por isso esse IC pode diferir um pouco dos exemplos impressos no Capítulo 9. ${AMB_FOOT}</p>
  `;
  setStep(3); res.scrollIntoView({behavior:'smooth',block:'nearest'});
  return;
}
```

### 10.4 Notas de fidelidade ao formulário

- **f e g** (`0,91` e `0,83`) são constantes fixas do manual (fidedignidade e
  generalizabilidade do SON-QI, Tabela 76 rodapé) — não variam por paciente,
  então ficam hard-coded, exatamente como aparecem em todas as Folhas de
  Registro do Capítulo 9.
- **EE-ER**: os limiares (16 / 20 pontos) e a amplitude fixa do IC80% de
  SON-EE/SON-ER (`±9` / `±10`) são o método *simplificado* que o próprio
  manual oferece como alternativa ao cálculo por escore verdadeiro (que exige
  coeficientes de fidedignidade por idade — Tabelas 30/31 — não incluídos
  nesta extração). O SON-QI usa o IC80% exato da Tabela 76 (`qiIC`), não o
  simplificado.
- **"Idade Ref."**: deliberadamente fora do escopo (ver nota no rodapé do
  próprio painel) — o manual explica que só o software oficial calcula esse
  valor, e as tabelas de normas extraídas não contêm o algoritmo reverso
  necessário para reconstruí-lo. Isso não afeta nenhum resultado que entra no
  laudo (B, N, Escores Totais, IC, percentil).

## Observações importantes

- **WASI**: nota de verificação em `wasi.json` → `estado_de_verificacao` (extraído
  de planilha Excel digital, 6 correções de digitação aplicadas, zero
  inconsistência restante; não validado contra caso clínico real).
- **SON-R**: nota de verificação em `sonr.json` → `estado_de_verificacao`.
  Todas as 66 tabelas de idade foram re-conferidas contra um re-scan de alta
  resolução do manual; a discrepância antes documentada (Padrões, idade 5;9)
  era um erro de leitura do escore bruto do Caso 1 (era 3, não 8) — resolvida.
  `pendencias:0` no bundle. Validado 16/16 contra os 3 casos do Capítulo 9.
- Os arquivos `wasi.engine.js` e `sonr.engine.js` (motor standalone, formato
  `ENGINES`) continuam existindo e são mais ricos (Z-Score, classificação
  Guilmette por subteste, alertas de discrepância automáticos) — use-os se
  preferir estender o padrão `ENGINES` em vez do padrão `BUNDLE`. Os arquivos
  `.bundle.json` aqui são a via rápida para encaixar no padrão que o app já
  usa para WISC-IV/WAIS-III sem escrever lógica nova de score.
