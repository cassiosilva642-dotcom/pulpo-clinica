# Motor de correção — SON-R 2½-7[a]

Teste Não-verbal de Inteligência (Snijders-Oomen), versão reduzida, adaptação e
normatização brasileira (Tellegen, Laros, de Jesus & Karino — Hogrefe CETEPP,
2ª ed., 2016). Faixa etária: **2 anos e 6 meses a 7 anos e 11 meses**.

## ⚠️ Leia antes de usar clinicamente

Diferente do ETDAH/SCARED/SDQ (que vieram de uma planilha Excel com fórmulas
exatas), os dados normativos do SON-R vieram de um **manual em PDF escaneado**
(fotos de página, sem texto digital). Foram transcritos visualmente em duas
passagens — a segunda a partir de um re-scan de alta resolução do mesmo
capítulo — e conferidos contra os 3 casos clínicos completos que o próprio
manual traz resolvidos (Capítulo 9).

**Status da verificação (atualizado após a 2ª passagem):**
- ✅ **Tabela 76** (combinação Soma normatizada → SON-EE / SON-ER / SON-QI /
  IC80% / percentil): validada em **3 de 3** casos do manual, valor a valor.
  Nenhuma célula divergiu entre as duas passagens. Alta confiança.
- ✅ **Tabelas de conversão bruto→normatizado por idade** (Tabelas 59-75, 66
  tabelas de idade): **28 das 66 tabelas** tinham pelo menos um erro pontual
  de transcrição na 1ª passagem (tipicamente um degrau intermediário ausente
  ou extra — algo que a checagem de monotonicidade sozinha não pega, porque a
  sequência continua "válida", só com o ponto de virada deslocado). Todas
  foram corrigidas nesta 2ª passagem e re-validadas.
- ✅ **Discrepância anterior resolvida**: o caso documentado como "Padrões,
  idade 5;9, escore bruto 8 → tabela dá 6, manual dá 1" era um **erro de
  leitura do escore bruto do Caso 1** na folha de registro escaneada (baixa
  resolução) — o valor real é **bruto = 3**, não 8. Com a leitura correta, o
  motor devolve normatizado = 1, batendo exatamente com o manual. A tabela em
  si (Tabela 68, idade 5;9) estava correta desde o início.
- ✅ **Validação end-to-end**: os 3 casos do manual (idades 5;9, 6;3, 7;9)
  batem **20 de 20** — os 4 escores normatizados de subteste + SON-EE + SON-ER
  + SON-QI + percentil + IC80% + **escore verdadeiro (T_EE/T_ER) e o IC80%
  exato calculado por ele** (método de Kelley, Tabelas 30/31) de cada caso.
- ✅ **IC além de 80%**: agora possível para SON-EE/SON-ER/SON-QI usando o EPE
  da Tabela 31 (mesma técnica usada no WASI) — o manual só imprime 80%, os
  demais níveis (90%/95%) são extensão padrão, não "oficiais" do fabricante.
- ⚠️ **2 células de confiança levemente menor**: subteste Situações, idades
  5;0 e 5;1, escores brutos 13-14 — caem exatamente sobre uma dobra física da
  página no scan de origem. Foram lidas com o valor estruturalmente mais
  consistente, mas vale conferência manual se esses escores brutos altos
  aparecerem na prática (são raros).

**Recomendação:** mesmo com confiança alta após a 2ª passagem, este motor é
apoio ao cálculo, não substitui a conferência do psicólogo — como boa prática
padrão para qualquer tabela extraída de scan.

## Arquivos

| Arquivo | Conteúdo |
|---|---|
| **`sonr.engine.js`** | Motor de correção (JS puro, dados embutidos, sem dependências). |
| `sonr.json` | Dados brutos: tabelas de normas por idade, tabela de combinação, regras de pontuação, status de verificação completo. |

## O que este motor NÃO faz

O SON-R é um teste de **aplicação física** (blocos, cartões, desenhos), com
procedimento **adaptativo** (o examinador decide onde começar e quando parar
conforme as respostas da criança). Este motor **não substitui a aplicação** —
ele parte do princípio de que o psicólogo já aplicou o teste e já sabe o
**escore bruto final de cada subteste** (um número de 0 a 15/16, calculado
seguindo as regras do Capítulo 7 do manual: último item aplicado menos erros
e recusas). A partir desses 4 números, o motor faz o resto automaticamente.

## Uso rápido

```html
<script src="sonr.engine.js"></script>
<script>
  // escoresBrutos: um número por subteste (0 a 15/16), já calculado na aplicação
  const brutos = { Mos: 7, Cat: 4, Sit: 2, Pad: 10 };

  // opção 1: informar a idade diretamente ("anos;meses")
  const resultado = SONR.corrigir(brutos, { idade: '6;3' });

  // opção 2: informar data de nascimento + data de aplicação (idade calculada automaticamente)
  // const resultado = SONR.corrigir(brutos, {
  //   dataNascimento: '2004-05-04',
  //   dataAplicacao: '2010-08-09',
  // });

  // opção: nível do intervalo de confiança ('80%' padrão — o único impresso no
  // manual —, '90%' ou '95%', calculados via EPE/Tabela 31, mesma técnica do WASI)
  // const resultado = SONR.corrigir(brutos, { idade: '6;3', nivelIC: '90%' });

  console.log(resultado.subtestes.Mos);
  // { nome: 'Mosaicos', escala: 'Execução (SON-EE)', escoreBruto: 7, escoreNormatizado: 7 }

  console.log(resultado.sonEE);
  // { escore: 86, escoreVerdadeiro: 88, nivelIC: '80%', ic: {min: 79, max: 97} }
  console.log(resultado.sonER);
  // { escore: 62, escoreVerdadeiro: 68, nivelIC: '80%', ic: {min: 58, max: 78} }
  console.log(resultado.sonQI);
  // { escore: 71, nivelIC: '80%', ic: {min: 66, max: 82}, percentil: 3, classificacao: 'Baixo' }

  console.log(resultado.diferencaEeEr);
  // { diferenca, significativa_p05, significativa_p01 }
</script>
```

`escore` é o valor observado (o que sai direto da Tabela 76). `escoreVerdadeiro`
é o escore corrigido pela fórmula de Kelley (mais preciso, é o que o manual usa
como centro do IC nos 3 casos do Capítulo 9) — só existe em SON-EE/SON-ER; o
SON-QI da Tabela 76 já é o escore final, não passa por essa correção.

### Se só alguns subtestes foram administrados

O motor calcula os escores normatizados individuais mesmo sem os 4 subtestes,
mas **não** calcula SON-EE/SON-ER/SON-QI nesse caso (retorna `null` com um
`aviso` explicando o motivo) — assim como o manual exige os 4 subtestes para
o SON-QI.

## Estrutura dos dados (`sonr.json`)

- **`normas_subtestes`**: objeto por idade (`"2;6"` a `"7;11"`, 66 chaves),
  cada uma com 4 arrays (`Mos`, `Cat`, `Sit`, `Pad`) de 17 posições — índice =
  escore bruto (0 a 16), valor = escore normatizado (1-19) ou `null` quando o
  bruto excede o máximo de itens daquele subteste (Mos/Cat=15, Sit=14, Pad=16).
- **`combinacao_ee_er_qi`**: a Tabela 76 — soma dos normatizados → SON-EE,
  SON-ER, e soma dos 4 → SON-QI + IC80% + percentil.
- **`regras_pontuacao`**: como calcular o escore bruto na aplicação (valores
  de item, fórmula, procedimento de entrada por idade, regras de interrupção).
- **`classificacao_qi`**: faixas de QI → descrição (Muito alto…Muito baixo).
- **`estado_de_verificacao`**: o mesmo resumo de confiabilidade descrito acima,
  em formato estruturado.

## Referência

Tellegen, P. J., Laros, J. A., de Jesus, G. R., & Karino, C. A. (2016).
*Teste Não-verbal de Inteligência: validação e normatização brasileira:
SON-R 2½-7[a]* (2ª ed.). São Paulo: Hogrefe CETEPP.
