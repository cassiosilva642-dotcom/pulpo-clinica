# Motor de correção — WASI

Escala Wechsler Abreviada de Inteligência (Wechsler Abbreviated Scale of
Intelligence), versão de 4 subtestes. Faixa etária: **6 a 89 anos**.

## Diferente do SON-R: fonte confiável

Este motor foi extraído de uma **planilha Excel (.xlsm) com dados digitais
reais**, não de um PDF escaneado — a leitura de célula é exata, sem risco de
erro de transcrição visual. Ainda assim, rodamos uma varredura automática de
monotonicidade em toda a base (~10.000 pontos de dados) e encontramos **6
erros de digitação isolados na própria planilha original** (ex.: "100" no
lugar de "10", "98" no lugar de "8") — corrigidos com segurança porque só um
valor inteiro cabia na sequência crescente esperada. Depois das correções, a
varredura não encontrou mais nenhuma inconsistência. Detalhes completos em
`wasi.json` → `estado_de_verificacao`.

**Não validado contra caso clínico real** — diferente do SON-R, esta planilha
não trazia exemplos resolvidos pelo fabricante para conferência ponta a
ponta. A extração foi conferida estruturalmente (monotonicidade), mas não
contra um resultado humano conhecido.

## Arquivos

| Arquivo | Conteúdo |
|---|---|
| **`wasi.engine.js`** | Motor de correção (JS puro, dados embutidos, sem dependências). |
| `wasi.json` | Dados brutos: 45 tabelas de idade × 4 subtestes, tabela de pontos ponderados, 4 tabelas de combinação de QI, regras e log de correções. |

## Estrutura do WASI

- **4 subtestes**: Vocabulário (VC) e Semelhanças (SM) → escala Verbal;
  Cubos (CB) e Raciocínio Matricial (RM) → escala de Execução.
- **4 escalas compostas**:
  - `QIV` = VC + SM
  - `QIE` = CB + RM
  - `QIT4` = VC + SM + CB + RM (bateria completa)
  - `QIT2` = VC + RM (versão reduzida de 2 subtestes)

## Uso rápido

```html
<script src="wasi.engine.js"></script>
<script>
  const brutos = { VC: 20, SM: 18, CB: 25, RM: 22 };

  // opção 1: faixa etária direta (uma das 45, ex.: "9:0 - 9:3", "17 - 19", "30 - 34")
  const resultado = WASI.corrigir(brutos, { faixaEtaria: '9:0 - 9:3' });

  // opção 2: idade calculada automaticamente
  // const resultado = WASI.corrigir(brutos, {
  //   dataNascimento: '2004-05-04',
  //   dataAplicacao: '2024-08-09',
  //   nivelIC: '90%',   // ou '95%'
  // });

  console.log(resultado.subtestes.VC);
  // { nome, escala, escoreBruto, escoreT, zScore, pontoPonderado, percentil, classificacao }

  console.log(resultado.QIV);   // { qi, percentil, intervaloConfianca, classificacao }
  console.log(resultado.QIE);
  console.log(resultado.QIT4);  // usa os 4 subtestes
  console.log(resultado.QIT2);  // versão reduzida (só VC+RM)

  console.log(resultado.alertas);
  // avisos automáticos de discrepância entre escalas (ex.: QIV muito diferente de QIE)
</script>
```

### Aplicando só a versão reduzida (2 subtestes)

Se só `VC` e `RM` forem informados, o motor calcula `QIT2` normalmente e
deixa `QIV`, `QIE` e `QIT4` como `null` (já que dependem de SM/CB).

### Faixas etárias disponíveis

45 faixas: de `"6:0 - 6:3"` até `"16:8 - 16:11"` em intervalos de 4 meses
(crianças/adolescentes), depois faixas mais largas para adultos (`"17 - 19"`,
`"20 - 24"`, `"25 - 29"`, `"30 - 34"`, `"35 - 44"`, `"45 - 54"`, `"55 - 64"`,
`"65 - 69"`, `"70 - 74"`, `"75 - 79"`, `"80 - 84"`, `"85 - 89"`). Lista
completa em `WASI.faixasEtarias`.

## Duas escalas de classificação diferentes (igual à planilha original)

- **Por subteste individual**: classificação por Z-Score (sistema
  Guilmette), a mesma lógica usada no ETDAH/SCARED/SON-R.
- **Por escala composta (QIV/QIE/QIT4/QIT2)**: classificação padrão Wechsler
  direto pelo valor de QI (Muito Superior ≥130, Superior ≥120, Média
  Superior ≥110, Média ≥90, Média Inferior ≥80, Limítrofe ≥70, Extremamente
  Baixo <70) — extraída literalmente da fórmula da planilha (Tabela 27 do
  manual do WASI).

## Intervalo de confiança

Dois níveis disponíveis (`opcoes.nivelIC = '90%'` ou `'95%'`), cada um com
tabela própria para "idades 6-16" e "idades 17-89" — a seleção
criança/adulto é automática a partir da idade informada.

## Alertas de discrepância

O motor reproduz os dois avisos automáticos da planilha original:
- **QIV vs QIE** ≥ 23 pontos: sugere que o QIT-4 pode não representar bem o
  desempenho cognitivo do paciente.
- **VC vs RM** (pontos ponderados) ≥ 5 pontos: mesmo aviso para o QIT-2.

## Fora do escopo desta extração

- Análise avançada de diferenças ipsativas entre subtestes (a seção
  correspondente na planilha original tinha fórmulas `#REF!` quebradas).
- Intervalos de predição cruzados com WISC-III/WISC-IV/WAIS (Tabelas B1-B4).
- Intercorrelações entre subtestes (Tabela C1).

Nenhum desses itens é necessário para gerar o resultado principal (escores,
percentis, IC e classificação) — são análises complementares/qualitativas.
