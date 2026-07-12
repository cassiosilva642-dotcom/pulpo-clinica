# Normas de correção — E-TDAH (AD) e E-TDAH (Pais)

Dados normativos extraídos da planilha `PULPO_NEURO_MODELO_V1` (abas `ETDAH-AD`,
`ETDAH-AD-Normas`, `ETDAH-Pais` e `ETDAH-Pais-Normas`), prontos para uso no
aplicativo. Instrumentos de **Edyleine Bellini Peroni Benczik**.

## Arquivos

| Arquivo | Conteúdo |
|---|---|
| **`etdah-ad.engine.js`** | **Motor de correção pronto para uso** (JS puro, sem dependências) — já embute todos os dados do `etdah_ad.json`. |
| **`etdah-pais.engine.js`** | **Motor de correção pronto para uso** (JS puro, sem dependências) — já embute todos os dados do `etdah_pais.json`. |
| `etdah_ad.json` | Dados brutos do E-TDAH (AD): itens (texto + fator + inversão), normas, estatísticas, composição de fatores, regras de classificação. |
| `etdah_pais.json` | Dados brutos do E-TDAH (Pais): idem, com tabelas por sexo × faixa etária. |
| `etdah_ad_normas.csv` | Tabela de percentis do AD em formato longo (referência / outros stacks). |
| `etdah_ad_estatisticas.csv` | Média e desvio-padrão por amostra/fator (AD). |
| `etdah_pais_normas.csv` | Tabela de percentis do Pais em formato longo (referência / outros stacks). |
| `etdah_pais_estatisticas.csv` | Média e desvio-padrão por tabela/fator (Pais). |

## Motor de correção (JavaScript) — uso rápido

Os arquivos `.engine.js` são **auto-contidos**: já têm os dados normativos
embutidos, não precisam de `fetch` nem de build step. Funcionam tanto em
`<script>` no navegador (expõem `window.ETDAH_AD` / `window.ETDAH_PAIS`)
quanto via `require()` no Node.

O time que for montar o HTML/CSS só precisa: (1) incluir o script, (2) montar
o formulário a partir de `.itens` (já vem com o texto de cada pergunta),
(3) juntar as respostas do usuário num objeto e chamar `.corrigir(...)`.

### E-TDAH (AD)

```html
<script src="etdah-ad.engine.js"></script>
<script>
  // respostas: { numeroDoItem: valor(0-5) }, para os itens 1 a 69 — envie
  // exatamente como o examinando respondeu, o motor cuida da inversão.
  const respostas = { 1: 3, 2: 4, 3: 2, /* ...até o item 69 */ };

  const resultado = ETDAH_AD.corrigir(respostas, { amostra: 'Amostra Geral' });
  // amostra: 'Amostra Geral' | 'Ensino Fundamental' | 'Ensino Medio' | 'Ensino Superior'

  console.log(resultado.fatores.F1_Desatencao);
  // { nome, escoreBruto, percentil, classificacao,
  //   media, desvioPadrao, zScore, pontoPonderado, percentilZ, classificacaoGuilmette,
  //   itensRespondidos, itensEsperados, completo }
</script>
```

Para montar o formulário: `ETDAH_AD.itens` é um array com
`{ numero, texto, fator, invertido }` para os 69 itens — não é preciso
recopiar as perguntas na mão.

### E-TDAH (Pais)

```html
<script src="etdah-pais.engine.js"></script>
<script>
  // respostas agrupadas por fator; cada fator tem seus próprios itens 1..N
  // (a numeração reinicia em cada fator, igual à planilha original).
  const respostas = {
    F1_RegulacaoEmocional:            { 1: 3, 2: 5, /* ...até 19 */ },
    F2_HiperatividadeImpulsividade:   { 1: 4, 2: 4, /* ...até 13 */ },
    F3_ComportamentoAdaptativo:       { 1: 3, 2: 2, /* ...até 14 */ },
    F4_Atencao:                       { 1: 4, 2: 6, /* ...até 12 */ },
  };

  // A tabela normativa é escolhida automaticamente por sexo + idade da
  // criança/adolescente (faixas 2-5, 6-9, 10-13, 14-17 anos):
  const resultado = ETDAH_PAIS.corrigir(respostas, { sexo: 'Masculino', idadeAnos: 7 });

  // ou force uma tabela específica (ex.: 'Amostra Geral'):
  // ETDAH_PAIS.corrigir(respostas, { tabela: 'Amostra Geral' });

  console.log(resultado.tabela);          // tabela usada, ex. "Masculino 6-9 anos"
  console.log(resultado.fatores.F1_RegulacaoEmocional);
  console.log(resultado.escoreGeral);     // { escoreBruto, percentil, classificacao, ... }
</script>
```

`ETDAH_PAIS.itens` traz `{ F1_RegulacaoEmocional: [{numero,texto,invertido}, ...], F2_..., F3_..., F4_... }`
com o texto de todos os 58 itens, prontos para renderizar o formulário.

**Importante:** enviem sempre o valor **tal como o respondente marcou**
(0–5 no AD, 1–6 no Pais). A inversão de itens (ex. Fator 4 do AD, Fator 3
inteiro do Pais) é feita **internamente pelo motor** — não inverta nada na
tela.

### Erros tratados pelo motor

- Amostra/tabela normativa inexistente → lança `Error` com a lista de opções válidas.
- Pais sem `sexo`/`idadeAnos` (ou idade fora de 2–17 anos) e sem `tabela` forçada → lança `Error` explicando o que falta.
- Fator sem nenhum item respondido → aquele fator vem como `null` no resultado (em vez de quebrar o cálculo dos demais).
- Cada fator e o resultado geral trazem `itensRespondidos` / `itensEsperados` / `completo` para a UI avisar quando o questionário está incompleto.

## Validação do motor

O motor foi conferido contra um caso real da planilha (informante "mãe",
Fator 1 = 60, Fator 2 = 26, Fator 3 = 53, Fator 4 = 57, Escore Geral = 196):
rodando `ETDAH_PAIS.corrigir(...)` com `sexo: 'Masculino', idadeAnos: 7`, o
motor seleciona sozinho a tabela `Masculino 6-9 anos` e devolve exatamente
os mesmos percentis/classificações da planilha para os 4 fatores **e** o
escore geral. A soma dos itens do Fator 1 e do Fator 2 (sem inversão) e do
Fator 3 (com a inversão `7 − x` em todos os itens) também bateu item a item
com os valores mostrados na planilha.

Os CSV têm formato longo (uma linha por escore bruto):

```
amostra, fator, escore_bruto, percentil, classificacao        # AD
tabela,  fator, escore_bruto, percentil, classificacao        # Pais
```

## Como consultar (LOOKUP)

A planilha usa `LOOKUP` com correspondência aproximada sobre os escores brutos
em ordem crescente. Para um escore bruto `x`, pegue **a última linha cujo
`escore_bruto` seja ≤ `x`** (dentro do mesmo fator/amostra) e use o `percentil`
e a `classificacao` dessa linha.

```python
def consultar(rows, raw):
    achado = None
    for e in rows:            # rows já ordenadas por escore_bruto
        if e['escore_bruto'] <= raw:
            achado = e
        else:
            break
    return achado             # {'escore_bruto', 'percentil', 'classificacao'}
```

## E-TDAH (AD) — 12 a 87 anos

- **Escala de resposta:** 0 a 5.
- **Amostras normativas (4):** `Amostra Geral`, `Ensino Fundamental`,
  `Ensino Medio`, `Ensino Superior`.
- **Fatores (5):**
  - `F1_Desatencao` — Fator 1 · Desatenção (D)
  - `F2_Impulsividade` — Fator 2 · Impulsividade (I)
  - `F3_AspectosEmocionais` — Fator 3 · Aspectos Emocionais (AE)
  - `F4_AAMA` — Fator 4 · Autorregulação da Atenção, Motivação e Ação (AMAA)
  - `F5_Hiperatividade` — Fator 5 · Hiperatividade (H)

### Composição dos fatores (nº do item, 1–69)

| Fator | Itens |
|---|---|
| F1 Desatenção | 6, 19, 20, 22, 23, 24, 28, 30, 32, 33, 34, 36, 37, 44, 49, 50, 51, 54, 56, 57, 64, 67, 69 |
| F2 Impulsividade | 9, 11, 12, 15, 18, 25, 26, 38, 39, 40, 41, 45, 46, 47, 48, 52, 53, 60, 61, 62, 63, 66, 68 |
| F3 Aspectos Emocionais | 4, 7, 21, 55 |
| F4 AMAA | 1, 5, 8, 10, 14, 16, 27, 29, 42, 58, 59, 65 |
| F5 Hiperatividade | 2, 3, 13, 17, 31, 35, 43 |

### Itens invertidos

Os 12 itens do **Fator 4 (AMAA)** — 1, 5, 8, 10, 14, 16, 27, 29, 42, 58, 59, 65 —
têm pontuação invertida: `0→5, 1→4, 2→3, 3→2, 4→1, 5→0`
(equivalente a `valor_corrigido = 5 − valor_respondido`).

## E-TDAH (Pais)

- **Escala de resposta:** 1 a 6.
- **Seleção da tabela:** por **sexo + faixa etária** da criança/adolescente.
  Faixas: 2–5, 6–9, 10–13 e 14–17 anos. Há também a `Amostra Geral`.
- **Tabelas normativas (9):** `Amostra Geral`, `Feminino 2-5 anos`,
  `Feminino 6-9 anos`, `Feminino 10-13 anos`, `Feminino 14-17 anos`,
  `Masculino 2-5 anos`, `Masculino 6-9 anos`, `Masculino 10-13 anos`,
  `Masculino 14-17 anos`.
- **Fatores (4 + escore geral):**
  - `F1_RegulacaoEmocional` — Fator 1 · Regulação Emocional (19 itens)
  - `F2_HiperatividadeImpulsividade` — Fator 2 · Hiperatividade / Impulsividade (13 itens)
  - `F3_ComportamentoAdaptativo` — Fator 3 · Comportamento Adaptativo (14 itens)
  - `F4_Atencao` — Fator 4 · Atenção (12 itens)
  - `EscoreGeral` — Escala Geral = soma dos 4 fatores

> Na planilha a numeração dos itens **reinicia em cada fator**.

### Itens invertidos (Pais)

- **Fator 3 (Comportamento Adaptativo):** todos os 14 itens são invertidos.
- **Fator 4 (Atenção):** apenas o item 1 é invertido.
- Regra: `valor_corrigido = 7 − valor_respondido` (escala 1 a 6).

## Classificação

### Por percentil (tabela manual do AD)

| Percentil | Classificação |
|---|---|
| ≥ 85 | Superior |
| ≥ 65 | Média Superior |
| ≥ 45 | Média |
| ≥ 25 | Média Inferior |
| < 25 | Inferior |

A `classificacao` já vem embutida em cada linha das tabelas de percentil.

### Por Z-Score (sistema Guilmette, 2020)

Cálculo a partir da média e do desvio-padrão (`etdah_*_estatisticas.csv` /
campo `estatisticas` no JSON):

```
z              = (escore_bruto − media) / desv_pad
ponto_ponderado = z * 3 + 10
percentil       = NORM.S.DIST(z) * 100     # distribuição normal padrão acumulada
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

> Referência do sistema de classificação: Guilmette et al. (2020), *American
> Academy of Clinical Neuropsychology consensus conference statement on uniform
> labeling of performance test scores*, The Clinical Neuropsychologist, 34(3),
> 437–453. DOI: 10.1080/13854046.2020.1722244
