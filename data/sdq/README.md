# Normas de correção — SDQ (Questionário de Capacidades e Dificuldades)

Dados extraídos da planilha `PULPO_NEURO_MODELO_V1` (aba `SDQ-Pr`). Instrumento:
**SDQ — Strengths and Difficulties Questionnaire**, versão em português do
Brasil (link oficial na própria planilha:
https://www.sdqinfo.org/py/sdqinfo/b3.py?language=Portugueseqz(Brazil)).

## Arquivos

| Arquivo | Conteúdo |
|---|---|
| **`sdq.engine.js`** | Motor de correção pronto (JS puro, dados embutidos, sem dependências). |
| `sdq.json` | Dados brutos: composição dos fatores, itens invertidos, cortes por respondente. |

## ⚠️ Texto dos itens não está na planilha

A planilha original **não contém o texto das 25 perguntas** — só os números
dos itens e códigos de resposta de exemplo (F/M/V). Baixe a versão oficial em
português no link acima para montar o formulário; não invente o texto das
perguntas de um instrumento clínico.

O Suplemento de Impacto (5 perguntas extras) **tem** o texto na planilha e já
está incluído em `sdq.json` / `SDQ.impactoItensTexto`.

## Uso rápido

```html
<script src="sdq.engine.js"></script>
<script>
  // respostas: { numeroDoItem: 'F'|'M'|'V' }, itens 1 a 25 — envie exatamente
  // como o respondente marcou; a inversão dos itens 7, 11, 14, 21, 25 é
  // feita internamente pelo motor.
  const respostas = { 1: 'V', 2: 'V', 3: 'F', /* ...até o item 25 */ };

  const resultado = SDQ.corrigir(respostas, { respondente: 'Auto' });
  // respondente: 'Professor' | 'Cuidador' | 'Auto' — define os cortes usados

  console.log(resultado.fatores.Hiperatividade);
  // { nome, escoreBruto, itensRespondidos, itensEsperados, completo, classificacao }
  console.log(resultado.total); // soma dos 4 fatores (exclui Pró-Social)

  // Suplemento de Impacto (opcional, formulário separado):
  const impacto = SDQ.corrigirImpacto(
    { 1: 'MM', 2: 'P', 3: 'MM', 4: 'M', 5: 'P' },
    { respondente: 'Auto' }
  );
  console.log(impacto); // { escoreBruto, classificacao: 'Normal'|'Limítrofe'|'Anormal' }
</script>
```

`SDQ.impactoItensPorRespondente` mostra quais dos 5 itens do Suplemento de
Impacto cada tipo de respondente responde: **Professor** responde só 3 (itens
1, 3, 4 — não avalia vida em casa nem lazer); **Cuidador** e **Auto**
respondem os 5.

## Fatores e composição dos itens (25 itens principais)

| Fator | Itens |
|---|---|
| Sintomas Emocionais | 3, 8, 13, 16, 24 |
| Problemas de Conduta | 5, 7, 12, 18, 22 |
| Hiperatividade | 2, 10, 15, 21, 25 |
| Problemas de Relacionamento com Colegas | 6, 11, 14, 19, 23 |
| Comportamento Pró-Social *(não entra no Total)* | 1, 4, 9, 17, 20 |
| **Total de Dificuldades** | soma dos 4 fatores acima (exclui Pró-Social) — 20 itens |

**Itens invertidos:** 7, 11, 14, 21, 25 — pontuados como `F=2, M=1, V=0`
(os demais itens são `F=0, M=1, V=2`). O motor aplica isso sozinho, basta
enviar a resposta bruta (F/M/V) tal como o respondente marcou.

## Escalas de resposta

| Escala | Valores | Mapeamento |
|---|---|---|
| Principal (25 itens) | `F` / `M` / `V` | Falso / Mais ou Menos / Verdadeiro → 0/1/2 (ou 2/1/0 se invertido) |
| Suplemento de Impacto | `N` / `P` / `M` / `MM` | Nada / Pouco / Médio / Muito → **0 / 0 / 1 / 2** |

## Classificação — cortes por tipo de respondente

O SDQ **não usa** tabela de percentil nem Z-Score: a classificação é por
faixas fixas de escore bruto, e os cortes **mudam conforme quem responde**
(Professor e Auto usam os mesmos cortes; Cuidador tem cortes próprios em
3 dos 6 indicadores).

### Professor e Auto (idênticos)

| Fator | Normal | Limítrofe | Anormal |
|---|---|---|---|
| Sintomas Emocionais | ≤ 4 | 5 | ≥ 6 |
| Problemas de Conduta | ≤ 2 | 3 | ≥ 4 |
| Hiperatividade | ≤ 5 | 6 | ≥ 7 |
| Relacionamento com Colegas | ≤ 3 | 4 | ≥ 5 |
| Pró-Social *(invertido: maior = melhor)* | ≥ 6 | 5 | ≤ 4 |
| **Total** | ≤ 11 | 12–15 | ≥ 16 |

### Cuidador

| Fator | Normal | Limítrofe | Anormal |
|---|---|---|---|
| Sintomas Emocionais | ≤ 3 | 4 | ≥ 5 |
| Problemas de Conduta | ≤ 2 | 3 | ≥ 4 |
| Hiperatividade | ≤ 5 | 6 | ≥ 7 |
| Relacionamento com Colegas | ≤ 2 | 3 | ≥ 4 |
| Pró-Social *(invertido)* | ≥ 6 | 5 | ≤ 4 |
| **Total** | ≤ 13 | 14–16 | ≥ 17 |

### Suplemento de Impacto (mesma faixa para todos os respondentes)

| Escore | Classificação |
|---|---|
| 0 | Normal |
| 1 | Limítrofe |
| ≥ 2 | Anormal |

## Validação do motor

Composição de itens, itens invertidos e cortes foram extraídos diretamente
das fórmulas da planilha (não estimados de memória) e conferidos manualmente
contra os dados de exemplo preenchidos na aba original — os fatores
Hiperatividade e Relacionamento com Colegas (que têm itens invertidos)
bateram exatamente com a soma calculada à mão, item a item.
