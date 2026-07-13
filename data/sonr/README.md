# Motor de correção — SON-R 2½-7[a]

Teste Não-verbal de Inteligência (Snijders-Oomen), versão reduzida, adaptação e
normatização brasileira (Tellegen, Laros, de Jesus & Karino — Hogrefe CETEPP,
2ª ed., 2016). Faixa etária: **2 anos e 6 meses a 7 anos e 11 meses**.

## ⚠️ Leia antes de usar clinicamente

Diferente do ETDAH/SCARED/SDQ (que vieram de uma planilha Excel com fórmulas
exatas), os dados normativos do SON-R vieram de um **manual em PDF escaneado**
(fotos de página, sem texto digital). Foram transcritos visualmente e
conferidos contra os 3 casos clínicos completos que o próprio manual traz
resolvidos (Capítulo 9) — mas isso **não é o mesmo nível de certeza** que uma
fórmula de planilha.

**Status da verificação:**
- ✅ **Tabela 76** (combinação Soma normatizada → SON-EE / SON-ER / SON-QI /
  IC80% / percentil): validada em **3 de 3** casos do manual, valor a valor,
  incluindo o percentil e o intervalo de confiança. Alta confiança.
- ✅ **Tabelas de conversão bruto→normatizado por idade** (Tabelas 59-75):
  conferidas contra os 3 casos (idades 5;9, 6;3 e 7;9) — **11 de 12** valores
  bateram exatamente; 1 erro real de transcrição foi encontrado e corrigido
  durante o processo.
- ⚠️ **1 discrepância não resolvida**: subteste **Padrões, idade 5;9, escore
  bruto 8** — o Caso 1 do manual indica normatizado = 1, a tabela transcrita
  (conferida duas vezes) dá 6. Como a mesma linha "Padrões" validou certinha
  nos outros dois casos, suspeita-se de erro de leitura pontual no formulário
  do Caso 1 (não na tabela) — mas isso não foi confirmado.
- ⚠️ As **idades fora dos 3 casos testados** (a maior parte da faixa 2;6-7;11)
  não foram conferidas individualmente contra o manual físico.

**Recomendação:** use este motor como apoio ao cálculo, não como fonte única.
Antes de emitir um laudo, confira pelo menos a tabela da idade real do paciente
contra o manual impresso (Apêndice A), especialmente a linha do subteste
Padrões.

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

  console.log(resultado.subtestes.Mos);
  // { nome: 'Mosaicos', escala: 'Execução (SON-EE)', escoreBruto: 7, escoreNormatizado: 7 }

  console.log(resultado.sonEE);  // { escore: 86, ic80: {min, max} }
  console.log(resultado.sonER);  // { escore: 62, ic80: {min, max} }
  console.log(resultado.sonQI);  // { escore: 71, ic80, percentil: 3, classificacao: 'Baixo' }

  console.log(resultado.diferencaEeEr);
  // { diferenca, significativa_p05, significativa_p01 }
</script>
```

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
