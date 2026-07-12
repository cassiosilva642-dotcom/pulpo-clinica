# Normas de correção — SCARED (autorrelato)

Dados normativos extraídos da planilha `PULPO_NEURO_MODELO_V1` (abas `SCARED` e
`SCARED-Normas`). Instrumento: **SCARED — Screen for Child Anxiety Related
Emotional Disorders**, versão de autorrelato validada no Brasil por Isolan,
Salum, Osowski, Amaro & Manfro (2011), *Journal of Anxiety Disorders*, 25(6),
741-748.

## Arquivos

| Arquivo | Conteúdo |
|---|---|
| **`scared.engine.js`** | Motor de correção pronto (JS puro, dados embutidos, sem dependências). |
| `scared.json` | Dados brutos: composição dos fatores, estatísticas (média/desvio) por tabela, notas de corte clínicas. |

## Uso rápido

```html
<script src="scared.engine.js"></script>
<script>
  // respostas: { numeroDoItem: valor(0-2) }, itens 1 a 41
  const respostas = { 1: 1, 2: 2, 3: 0, /* ...até o item 41 */ };

  const resultado = SCARED.corrigir(respostas, { sexo: 'Masculino', idadeAnos: 10 });
  // tabela escolhida automaticamente por sexo+idade (9-11 = criança, 12-18 = adolescente)

  console.log(resultado.fatores.PanicoSintomasSomaticos);
  // { nome, escoreBruto, media, desvioPadrao, zScore, pontoPonderado, percentilZ,
  //   classificacaoGuilmette, notaDeCorte, escoreMaximo, classificacaoClinica }
  console.log(resultado.total); // idem, para a soma dos 41 itens
</script>
```

Ou force uma tabela específica: `SCARED.corrigir(respostas, { tabela: 'Adolescente_Feminino' })`.

## Faixa etária e aplicabilidade

- **9 a 18 anos** — versão de autorrelato coberta por este motor.
- **< 9 anos**: a planilha original só permite aplicação com cuidadores (fora
  do escopo deste motor).
- **> 18 anos**: a planilha original mostra "Reveja idade" (não há tabela).
- `SCARED.corrigir(...)` lança `Error` nesses dois casos-limite se a tabela
  não puder ser determinada automaticamente.

## Fatores e composição dos itens (41 itens)

| Fator | Itens | Nº de itens |
|---|---|---|
| Pânico / Sintomas Somáticos | 1, 6, 9, 12, 15, 18, 19, 22, 24, 27, 30, 34, 38 | 13 |
| Ansiedade Generalizada | 5, 7, 14, 21, 23, 28, 33, 35, 37 | 9 |
| Ansiedade de Separação | 4, 8, 13, 16, 20, 25, 29, 31 | 8 |
| Fobia Social | 3, 10, 26, 32, 39, 40, 41 | 7 |
| Evitação Escolar | 2, 11, 17, 36 | 4 |
| **Total** | soma dos 41 itens | 41 |

Não há itens invertidos no SCARED — some os valores como respondidos (0 a 2).

> **Atenção:** a planilha original não contém o texto dos itens (apenas os
> números e códigos de resposta de exemplo). Use a versão oficial em
> português validada por Isolan et al. (2011) para montar o formulário —
> não invente o texto das perguntas.

## Classificação

### Z-Score (sistema Guilmette, 2020) — a mesma lógica do ETDAH

```
z               = (escore_bruto − media) / desv_pad
ponto_ponderado = z * 3 + 10
percentil       = NORM.S.DIST(z) * 100
```

| Z-Score | Classificação |
|---|---|
| ≥ 2.0 | Muito Superior |
| ≥ 1.333 | Superior |
| ≥ 0.667 | Média Superior |
| ≥ −0.666 | Média |
| ≥ −1.333 | Média Inferior |
| ≥ −2.0 | Limítrofe |
| < −2.0 | Deficitário |

### Nota de corte clínica (fixa, independe de sexo/idade)

| Fator | Nota de corte | Escore máximo |
|---|---|---|
| Pânico / Sintomas Somáticos | ≥ 7 | 26 |
| Ansiedade Generalizada | ≥ 9 | 18 |
| Ansiedade de Separação | ≥ 5 | 16 |
| Fobia Social | ≥ 8 | 14 |
| Evitação Escolar | ≥ 3 | 8 |
| **Total** | ≥ 25 | 82 |

Escore ≥ nota de corte → `"Clínico"`; abaixo → `"Não Clínico"`.

## Validação do motor

A composição dos itens de cada fator foi extraída diretamente das fórmulas de
soma da planilha (não estimada) e conferida item a item nos dados de exemplo
preenchidos na planilha original — a soma calculada pelo motor bateu com a
soma manual para todos os 5 fatores testados.
