(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.SONR = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // ---------------------------------------------------------------------
  // DADOS: SON-R 2 1/2-7[a] - Teste Nao-verbal de Inteligencia.
  // Extraido do manual (Hogrefe CETEPP, 2a ed. 2016). Ver DADOS.estado_de_verificacao
  // para o status de validacao de cada parte antes de uso clinico.
  // Gerado automaticamente -- nao editar manualmente.
  // ---------------------------------------------------------------------
  var DADOS = {"instrumento": "SON-R 2½-7[a] - Teste Não-verbal de Inteligência (versão reduzida)", "autores": "P.J. Tellegen, J.A. Laros, G.R. de Jesus, C.A. Karino (adaptação e normatização brasileira)", "editora": "Hogrefe CETEPP, 2ª edição, 2016", "faixa_etaria": "2 anos e 6 meses a 7 anos e 11 meses", "aplicacao": "Individual, com materiais físicos (blocos, cartões, formulário de desenho). Este motor cobre apenas a etapa de CORREÇÃO (bruto -> normatizado -> EE/ER/QI -> classificação); a aplicação em si (decidir se um item foi acertado, quando interromper, etc.) continua sendo feita pelo psicólogo seguindo o manual.", "subtestes": {"Mos": {"nome": "Mosaicos", "escala": "Execução (SON-EE)", "itens_total": 15, "tarefa": "Reproduzir modelos com quadrados coloridos numa moldura."}, "Cat": {"nome": "Categorias", "escala": "Raciocínio (SON-ER)", "itens_total": 15, "tarefa": "Classificar cartões conforme a categoria a que pertencem."}, "Sit": {"nome": "Situações", "escala": "Raciocínio (SON-ER)", "itens_total": 14, "tarefa": "Escolher, entre alternativas, a peça que completa a situação-problema."}, "Pad": {"nome": "Padrões", "escala": "Execução (SON-EE)", "itens_total": 16, "tarefa": "Copiar desenhos formados por pontos conectados por linhas."}}, "regras_pontuacao": {"valores_item": {"+": "Item pulado pelo procedimento adaptativo de entrada (idade/série) — conta como correto (1).", "1": "Item correto (respondido de forma independente, dentro do tempo-limite quando aplicável).", "0": "Item incorreto (não resolvido, resolvido com ajuda, ou fora do tempo-limite).", "-": "Item recusado — conta como incorreto (0) no escore, mas 2 recusas consecutivas interrompem e invalidam o subteste inteiro para fins de SON-QI."}, "formula_escore_bruto": "escore_bruto = número do ÚLTIMO item aplicado − quantidade de itens incorretos (0) − quantidade de itens recusados (-). Itens pulados no início pelo procedimento adaptativo (+) contam como corretos e não entram na subtração. EXCEÇÃO: quando a criança precisa voltar a itens anteriores (por errar os itens iniciais do ponto de entrada 3 ou 5) e comete mais de 3 erros no subteste, o escore é calculado a partir do item em que o critério de interrupção foi atingido como último item aplicado (não o item mais alto tentado). Ver manual, Capítulo 7, \"Uma situação especial: começar e voltar para itens anteriores\", para os casos completos.", "procedimento_entrada": {"item_1": "Crianças de 2 ou 3 anos, ou quando se suspeita de atraso cognitivo relevante.", "item_3": "Crianças de 4 ou 5 anos (ou 6-7 anos defasados no ensino fundamental).", "item_5": "Crianças de 6 ou 7 anos."}, "regras_interrupcao": {"regra_A": "O subteste é interrompido ao atingir 3 respostas incorretas no total (não precisam ser consecutivas).", "regra_B": "(Somente Mosaicos e Padrões, Parte II) interrompido também com 2 erros CONSECUTIVOS na Parte II.", "regra_C": "Interrompido quando a criança recusa 2 itens consecutivos — nesse caso o subteste NÃO é pontuado e não pode ser usado para o SON-QI."}}, "normas_subtestes": {"2;6": {"Mos": [6, 9, 12, 14, 15, 16, 17, 18, 19, 19, 19, 19, 19, 19, 19, 19, null], "Cat": [9, 12, 12, 13, 14, 15, 15, 16, 17, 18, 19, 19, 19, 19, 19, 19, null], "Sit": [7, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19, 19, 19, 19, 19, null, null], "Pad": [6, 9, 10, 11, 12, 13, 14, 16, 17, 19, 19, 19, 19, 19, 19, 19, 19]}, "2;7": {"Mos": [5, 9, 12, 14, 15, 16, 17, 18, 19, 19, 19, 19, 19, 19, 19, 19, null], "Cat": [8, 11, 12, 13, 13, 14, 15, 16, 17, 18, 19, 19, 19, 19, 19, 19, null], "Sit": [7, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19, 19, 19, 19, 19, null, null], "Pad": [6, 8, 9, 10, 11, 13, 14, 15, 17, 18, 19, 19, 19, 19, 19, 19, 19]}, "2;8": {"Mos": [5, 9, 12, 14, 15, 15, 16, 17, 19, 19, 19, 19, 19, 19, 19, 19, null], "Cat": [8, 11, 12, 12, 13, 14, 15, 16, 17, 18, 18, 19, 19, 19, 19, 19, null], "Sit": [6, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 19, 19, 19, 19, null, null], "Pad": [6, 8, 9, 10, 11, 12, 14, 15, 17, 18, 19, 19, 19, 19, 19, 19, 19]}, "2;9": {"Mos": [5, 9, 11, 13, 14, 15, 16, 17, 19, 19, 19, 19, 19, 19, 19, 19, null], "Cat": [8, 11, 11, 12, 13, 14, 15, 16, 16, 17, 18, 19, 19, 19, 19, 19, null], "Sit": [6, 8, 10, 11, 12, 13, 14, 15, 16, 17, 19, 19, 19, 19, 19, null, null], "Pad": [6, 8, 9, 9, 11, 12, 13, 15, 16, 18, 19, 19, 19, 19, 19, 19, 19]}, "2;10": {"Mos": [5, 9, 11, 13, 14, 15, 16, 17, 18, 19, 19, 19, 19, 19, 19, 19, null], "Cat": [8, 10, 11, 12, 13, 13, 14, 15, 16, 17, 18, 19, 19, 19, 19, 19, null], "Sit": [6, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 19, 19, 19, null, null], "Pad": [5, 7, 8, 9, 10, 12, 13, 14, 16, 17, 19, 19, 19, 19, 19, 19, 19]}, "2;11": {"Mos": [5, 8, 11, 13, 14, 15, 15, 17, 18, 19, 19, 19, 19, 19, 19, 19, null], "Cat": [7, 10, 11, 11, 12, 13, 14, 15, 16, 17, 18, 19, 19, 19, 19, 19, null], "Sit": [6, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 19, 19, 19, null, null], "Pad": [5, 7, 8, 9, 10, 11, 13, 14, 16, 17, 19, 19, 19, 19, 19, 19, 19]}, "3;0": {"Mos": [4, 8, 11, 12, 13, 14, 15, 16, 18, 19, 19, 19, 19, 19, 19, 19, null], "Cat": [7, 10, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 19, 19, 19, 19, null], "Sit": [5, 8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 19, 19, 19, 19, null, null], "Pad": [5, 7, 7, 8, 9, 11, 12, 14, 15, 17, 18, 19, 19, 19, 19, 19, 19]}, "3;1": {"Mos": [4, 8, 10, 12, 13, 14, 15, 16, 17, 19, 19, 19, 19, 19, 19, 19, null], "Cat": [7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 19, 19, 19, 19, 19, null], "Sit": [5, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 19, 19, null, null], "Pad": [4, 6, 7, 8, 9, 10, 12, 13, 15, 17, 18, 19, 19, 19, 19, 19, 19]}, "3;2": {"Mos": [4, 8, 10, 12, 13, 14, 15, 16, 17, 19, 19, 19, 19, 19, 19, 19, null], "Cat": [7, 9, 10, 10, 11, 12, 13, 14, 15, 16, 17, 19, 19, 19, 19, 19, null], "Sit": [5, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 19, 19, null, null], "Pad": [4, 6, 7, 8, 9, 10, 12, 13, 15, 16, 18, 19, 19, 19, 19, 19, 19]}, "3;3": {"Mos": [4, 7, 10, 11, 12, 13, 14, 15, 17, 19, 19, 19, 19, 19, 19, 19, null], "Cat": [7, 9, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 19, 19, 19, null], "Sit": [5, 7, 8, 9, 10, 11, 13, 14, 15, 16, 18, 19, 19, 19, 19, null, null], "Pad": [4, 6, 6, 7, 8, 10, 11, 13, 14, 16, 17, 19, 19, 19, 19, 19, 19]}, "3;4": {"Mos": [4, 7, 9, 11, 12, 13, 14, 15, 17, 18, 19, 19, 19, 19, 19, 19, null], "Cat": [6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 19, 19, 19, null], "Sit": [5, 7, 8, 9, 10, 11, 12, 14, 15, 16, 18, 19, 19, 19, 19, null, null], "Pad": [3, 5, 6, 7, 8, 9, 11, 13, 14, 16, 17, 18, 19, 19, 19, 19, 19]}, "3;5": {"Mos": [4, 7, 9, 11, 12, 13, 14, 15, 16, 18, 19, 19, 19, 19, 19, 19, null], "Cat": [6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 19, 19, 19, null], "Sit": [4, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 19, 19, null, null], "Pad": [3, 5, 6, 7, 8, 9, 11, 12, 14, 15, 17, 18, 19, 19, 19, 19, 19]}, "3;6": {"Mos": [3, 7, 9, 10, 11, 12, 13, 15, 16, 18, 19, 19, 19, 19, 19, 19, null], "Cat": [6, 8, 8, 9, 10, 11, 12, 13, 15, 16, 16, 17, 19, 19, 19, 19, null], "Sit": [4, 6, 7, 9, 10, 11, 12, 13, 15, 16, 17, 19, 19, 19, 19, null, null], "Pad": [3, 5, 6, 6, 7, 9, 10, 12, 14, 15, 17, 18, 19, 19, 19, 19, 19]}, "3;7": {"Mos": [3, 7, 9, 10, 11, 12, 13, 14, 16, 18, 19, 19, 19, 19, 19, 19, null], "Cat": [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 19, 19, null], "Sit": [4, 6, 7, 8, 10, 11, 12, 13, 14, 16, 17, 19, 19, 19, 19, null, null], "Pad": [3, 4, 5, 6, 7, 8, 10, 12, 13, 15, 16, 18, 19, 19, 19, 19, 19]}, "3;8": {"Mos": [3, 6, 8, 10, 11, 12, 13, 14, 16, 17, 19, 19, 19, 19, 19, 19, null], "Cat": [5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 19, 19, null], "Sit": [4, 6, 7, 8, 9, 10, 12, 13, 14, 16, 17, 19, 19, 19, 19, null, null], "Pad": [2, 4, 5, 6, 7, 8, 10, 11, 13, 15, 16, 17, 19, 19, 19, 19, 19]}, "3;9": {"Mos": [3, 6, 8, 9, 10, 11, 12, 14, 15, 17, 19, 19, 19, 19, 19, 19, null], "Cat": [5, 7, 8, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 19, 19, null], "Sit": [4, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 19, null, null], "Pad": [2, 4, 5, 5, 6, 8, 9, 11, 13, 14, 16, 17, 18, 19, 19, 19, 19]}, "3;10": {"Mos": [3, 6, 8, 9, 10, 11, 12, 14, 15, 17, 19, 19, 19, 19, 19, 19, null], "Cat": [5, 7, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 19, 19, null], "Sit": [3, 5, 7, 8, 9, 10, 11, 13, 14, 15, 17, 18, 19, 19, 19, null, null], "Pad": [2, 4, 4, 5, 6, 7, 9, 11, 12, 14, 15, 17, 18, 19, 19, 19, 19]}, "3;11": {"Mos": [3, 6, 8, 9, 10, 11, 12, 13, 15, 17, 19, 19, 19, 19, 19, 19, null], "Cat": [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18, 19, 19, 19, null], "Sit": [3, 5, 6, 8, 9, 10, 11, 12, 14, 15, 16, 18, 19, 19, 19, null, null], "Pad": [2, 3, 4, 5, 6, 7, 9, 10, 12, 14, 15, 17, 18, 19, 19, 19, 19]}, "4;0": {"Mos": [2, 5, 7, 9, 10, 11, 12, 13, 15, 16, 19, 19, 19, 19, 19, 19, null], "Cat": [4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 19, 19, null], "Sit": [3, 5, 6, 7, 9, 10, 11, 12, 14, 15, 16, 18, 19, 19, 19, null, null], "Pad": [1, 3, 4, 5, 6, 7, 8, 10, 12, 13, 15, 16, 18, 19, 19, 19, 19]}, "4;1": {"Mos": [2, 5, 7, 8, 9, 10, 11, 13, 14, 16, 18, 19, 19, 19, 19, 19, null], "Cat": [4, 6, 7, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 19, 19, 19, null], "Sit": [3, 5, 6, 7, 8, 10, 11, 12, 13, 15, 16, 18, 19, 19, 19, null, null], "Pad": [1, 3, 4, 4, 5, 7, 8, 10, 11, 13, 15, 16, 17, 19, 19, 19, 19]}, "4;2": {"Mos": [2, 5, 7, 8, 9, 10, 11, 12, 14, 16, 18, 19, 19, 19, 19, 19, null], "Cat": [4, 6, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 19, null], "Sit": [3, 5, 6, 7, 8, 9, 11, 12, 13, 15, 16, 18, 19, 19, 19, null, null], "Pad": [1, 3, 3, 4, 5, 6, 8, 9, 11, 13, 14, 16, 17, 18, 19, 19, 19]}, "4;3": {"Mos": [2, 5, 7, 8, 9, 10, 11, 12, 14, 16, 18, 19, 19, 19, 19, 19, null], "Cat": [4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 19, null], "Sit": [3, 5, 6, 7, 8, 9, 10, 12, 13, 14, 16, 17, 19, 19, 19, null, null], "Pad": [1, 2, 3, 4, 5, 6, 7, 9, 11, 12, 14, 16, 17, 18, 19, 19, 19]}, "4;4": {"Mos": [2, 5, 6, 8, 8, 9, 11, 12, 14, 16, 18, 19, 19, 19, 19, 19, null], "Cat": [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 19, 19, null], "Sit": [2, 4, 5, 7, 8, 9, 10, 12, 13, 14, 16, 17, 18, 19, 19, null, null], "Pad": [1, 2, 3, 4, 5, 6, 7, 9, 10, 12, 14, 15, 17, 18, 19, 19, 19]}, "4;5": {"Mos": [2, 5, 6, 7, 8, 9, 10, 12, 13, 15, 17, 19, 19, 19, 19, 19, null], "Cat": [3, 5, 6, 6, 7, 9, 10, 12, 13, 15, 17, 19, 19, 19, 19, 19, null], "Sit": [2, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18, 19, null, null], "Pad": [1, 2, 3, 3, 4, 5, 7, 8, 10, 12, 14, 15, 16, 18, 19, 19, 19]}, "4;6": {"Mos": [2, 4, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 19, 19, 19, 19, null], "Cat": [3, 5, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 18, 19, 19, null], "Sit": [2, 4, 5, 6, 7, 9, 10, 11, 13, 14, 15, 17, 19, 19, 19, null, null], "Pad": [1, 2, 2, 3, 4, 5, 7, 8, 10, 12, 13, 15, 16, 17, 19, 19, 19]}, "4;7": {"Mos": [2, 4, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 19, 19, 19, 19, null], "Cat": [3, 5, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 18, 19, 19, null], "Sit": [2, 4, 5, 6, 7, 8, 10, 11, 12, 14, 15, 17, 18, 19, 19, null, null], "Pad": [1, 1, 2, 3, 4, 5, 6, 8, 10, 11, 13, 14, 16, 17, 18, 19, 19]}, "4;8": {"Mos": [1, 4, 6, 7, 7, 8, 9, 11, 13, 15, 17, 19, 19, 19, 19, 19, null], "Cat": [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 19, 19, null], "Sit": [2, 4, 5, 6, 7, 8, 10, 11, 12, 14, 15, 17, 18, 19, 19, null, null], "Pad": [1, 1, 2, 3, 4, 5, 6, 8, 9, 11, 13, 14, 16, 17, 18, 19, 19]}, "4;9": {"Mos": [1, 4, 5, 6, 7, 8, 9, 11, 12, 14, 16, 19, 19, 19, 19, 19, null], "Cat": [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 17, 18, 19, 19, null], "Sit": [2, 3, 5, 6, 7, 8, 9, 11, 12, 14, 15, 17, 18, 19, 19, null, null], "Pad": [1, 1, 2, 2, 3, 4, 6, 7, 9, 11, 12, 14, 15, 17, 18, 19, 19]}, "4;10": {"Mos": [1, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 19, 19, 19, 19, null], "Cat": [2, 4, 5, 5, 6, 7, 9, 10, 11, 12, 13, 14, 16, 17, 19, 19, null], "Sit": [1, 3, 4, 6, 7, 8, 9, 11, 12, 13, 15, 16, 18, 19, 19, null, null], "Pad": [1, 1, 1, 2, 3, 4, 6, 7, 9, 11, 12, 14, 15, 16, 18, 19, 19]}, "4;11": {"Mos": [1, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 19, 19, 19, 19, null], "Cat": [2, 4, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 16, 17, 19, 19, null], "Sit": [1, 3, 4, 5, 7, 8, 9, 10, 12, 13, 15, 16, 18, 19, 19, null, null], "Pad": [1, 1, 1, 2, 3, 4, 5, 7, 9, 10, 12, 13, 15, 16, 18, 19, 19]}, "5;0": {"Mos": [1, 3, 5, 6, 6, 7, 8, 10, 12, 14, 16, 18, 19, 19, 19, 19, null], "Cat": [2, 4, 4, 5, 6, 7, 8, 9, 11, 12, 14, 16, 18, 19, 19, 19, null], "Sit": [1, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 17, 18, null, null], "Pad": [1, 1, 1, 2, 3, 4, 5, 7, 8, 10, 12, 13, 15, 16, 17, 19, 19]}, "5;1": {"Mos": [1, 3, 5, 5, 6, 7, 8, 10, 12, 13, 16, 18, 19, 19, 19, 19, null], "Cat": [2, 3, 4, 5, 6, 7, 8, 10, 12, 13, 16, 18, 19, 19, 19, 19, null], "Sit": [1, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 17, 18, null, null], "Pad": [1, 1, 1, 2, 2, 4, 5, 6, 8, 10, 11, 13, 14, 16, 18, 19, 19]}, "5;2": {"Mos": [1, 3, 4, 5, 6, 7, 8, 9, 11, 13, 15, 17, 19, 19, 19, 19, null], "Cat": [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 18, 19, null], "Sit": [1, 3, 4, 5, 6, 7, 8, 10, 11, 13, 14, 16, 17, 19, 19, null, null], "Pad": [1, 1, 1, 1, 2, 3, 5, 6, 8, 10, 11, 13, 14, 16, 17, 19, 19]}, "5;3": {"Mos": [1, 3, 4, 5, 6, 7, 8, 9, 11, 13, 15, 17, 19, 19, 19, 19, null], "Cat": [2, 3, 4, 5, 5, 7, 8, 9, 10, 11, 12, 14, 15, 16, 18, 19, null], "Sit": [1, 3, 4, 5, 6, 7, 8, 10, 11, 13, 14, 16, 17, 19, 19, null, null], "Pad": [1, 1, 1, 1, 2, 3, 4, 6, 8, 9, 11, 13, 14, 15, 17, 18, 19]}, "5;4": {"Mos": [1, 3, 4, 5, 6, 6, 8, 9, 11, 13, 15, 17, 19, 19, 19, 19, null], "Cat": [1, 3, 4, 4, 5, 6, 7, 9, 10, 11, 12, 13, 15, 16, 18, 19, null], "Sit": [1, 2, 4, 5, 6, 7, 8, 10, 11, 12, 14, 16, 17, 19, 19, null, null], "Pad": [1, 1, 1, 1, 2, 3, 4, 6, 7, 9, 11, 12, 14, 15, 17, 18, 19]}, "5;5": {"Mos": [1, 3, 4, 5, 5, 6, 7, 9, 11, 13, 15, 17, 19, 19, 19, 19, null], "Cat": [1, 3, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 16, 18, 19, null], "Sit": [1, 2, 3, 5, 6, 7, 8, 9, 11, 12, 14, 15, 17, 19, 19, null, null], "Pad": [1, 1, 1, 1, 2, 3, 4, 5, 7, 9, 10, 12, 13, 15, 16, 18, 19]}, "5;6": {"Mos": [1, 2, 4, 4, 5, 6, 7, 9, 10, 12, 14, 16, 18, 19, 19, 19, null], "Cat": [1, 3, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 16, 18, 19, null], "Sit": [1, 2, 3, 4, 5, 7, 8, 9, 11, 12, 14, 15, 17, 19, 19, null, null], "Pad": [1, 1, 1, 1, 1, 3, 4, 5, 7, 9, 10, 12, 13, 15, 16, 18, 19]}, "5;7": {"Mos": [1, 2, 4, 4, 5, 6, 7, 8, 10, 12, 14, 16, 18, 19, 19, 19, null], "Cat": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 16, 17, 19, null], "Sit": [1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 14, 15, 17, 18, 19, null, null], "Pad": [1, 1, 1, 1, 1, 2, 4, 5, 7, 8, 10, 12, 13, 14, 16, 18, 19]}, "5;8": {"Mos": [1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 18, 19, 19, 19, null], "Cat": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 17, 19, null], "Sit": [1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 13, 15, 17, 18, 19, null, null], "Pad": [1, 1, 1, 1, 1, 2, 3, 5, 6, 8, 10, 11, 13, 14, 16, 17, 19]}, "5;9": {"Mos": [1, 2, 3, 4, 5, 5, 7, 8, 10, 12, 14, 16, 18, 19, 19, 19, null], "Cat": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 17, 19, null], "Sit": [1, 2, 3, 4, 5, 6, 7, 9, 10, 12, 13, 15, 16, 18, 19, null, null], "Pad": [1, 1, 1, 1, 1, 2, 3, 5, 6, 8, 10, 11, 13, 14, 16, 17, 19]}, "5;10": {"Mos": [1, 2, 3, 4, 4, 5, 6, 8, 10, 12, 14, 16, 18, 19, 19, 19, null], "Cat": [1, 2, 3, 4, 4, 5, 6, 8, 9, 10, 11, 12, 14, 15, 17, 19, null], "Sit": [1, 2, 3, 4, 5, 6, 7, 9, 10, 12, 13, 15, 16, 18, 19, null, null], "Pad": [1, 1, 1, 1, 1, 2, 3, 4, 6, 8, 9, 11, 12, 14, 15, 17, 19]}, "5;11": {"Mos": [1, 2, 3, 4, 4, 5, 6, 8, 9, 11, 13, 15, 17, 19, 19, 19, null], "Cat": [1, 2, 3, 3, 4, 5, 6, 7, 9, 10, 11, 12, 14, 15, 17, 19, null], "Sit": [1, 1, 3, 4, 5, 6, 7, 8, 10, 11, 13, 15, 16, 18, 19, null, null], "Pad": [1, 1, 1, 1, 1, 2, 3, 4, 6, 7, 9, 11, 12, 14, 15, 17, 19]}, "6;0": {"Mos": [1, 2, 3, 3, 4, 5, 6, 7, 9, 11, 13, 15, 17, 19, 19, 19, null], "Cat": [1, 2, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 15, 17, 19, null], "Sit": [1, 1, 2, 4, 5, 6, 7, 8, 10, 11, 13, 14, 16, 18, 19, null, null], "Pad": [1, 1, 1, 1, 1, 1, 3, 4, 6, 7, 9, 10, 12, 13, 15, 17, 19]}, "6;1": {"Mos": [1, 2, 3, 3, 4, 5, 6, 7, 9, 11, 13, 15, 17, 19, 19, 19, null], "Cat": [1, 2, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 15, 17, 19, null], "Sit": [1, 1, 2, 3, 5, 6, 7, 8, 10, 11, 13, 14, 16, 18, 19, null, null], "Pad": [1, 1, 1, 1, 1, 1, 2, 4, 5, 7, 9, 10, 12, 13, 15, 16, 19]}, "6;2": {"Mos": [1, 2, 2, 3, 4, 5, 6, 7, 9, 11, 13, 15, 17, 18, 19, 19, null], "Cat": [1, 2, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 15, 16, 19, null], "Sit": [1, 1, 2, 3, 4, 6, 7, 8, 9, 11, 13, 14, 16, 17, 19, null, null], "Pad": [1, 1, 1, 1, 1, 1, 2, 4, 5, 7, 8, 10, 12, 13, 15, 16, 19]}, "6;3": {"Mos": [1, 1, 2, 3, 4, 4, 5, 7, 9, 11, 13, 15, 16, 18, 19, 19, null], "Cat": [1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 16, 19, null], "Sit": [1, 1, 2, 3, 4, 5, 7, 8, 9, 11, 12, 14, 16, 17, 19, null, null], "Pad": [1, 1, 1, 1, 1, 1, 2, 4, 5, 7, 8, 10, 11, 13, 14, 16, 19]}, "6;4": {"Mos": [1, 1, 2, 3, 3, 4, 5, 7, 9, 10, 12, 14, 16, 18, 19, 19, null], "Cat": [1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 16, 19, null], "Sit": [1, 1, 2, 3, 4, 5, 6, 8, 9, 11, 12, 14, 16, 17, 19, null, null], "Pad": [1, 1, 1, 1, 1, 1, 2, 3, 5, 6, 8, 10, 11, 13, 14, 16, 19]}, "6;5": {"Mos": [1, 1, 2, 3, 3, 4, 5, 7, 8, 10, 12, 14, 16, 18, 19, 19, null], "Cat": [1, 1, 2, 3, 4, 4, 6, 7, 8, 9, 10, 11, 13, 14, 16, 19, null], "Sit": [1, 1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 14, 15, 17, 19, null, null], "Pad": [1, 1, 1, 1, 1, 1, 2, 3, 5, 6, 8, 9, 11, 12, 14, 16, 18]}, "6;6": {"Mos": [1, 1, 2, 3, 3, 4, 5, 6, 8, 10, 12, 14, 16, 17, 19, 19, null], "Cat": [1, 1, 2, 3, 3, 4, 5, 6, 8, 9, 10, 11, 12, 14, 16, 18, null], "Sit": [1, 1, 2, 3, 4, 5, 6, 7, 9, 10, 12, 14, 15, 17, 19, null, null], "Pad": [1, 1, 1, 1, 1, 1, 2, 3, 5, 6, 8, 9, 11, 12, 14, 16, 18]}, "6;7": {"Mos": [1, 1, 2, 2, 3, 4, 5, 6, 8, 10, 12, 14, 15, 17, 19, 19, null], "Cat": [1, 1, 2, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 14, 16, 18, null], "Sit": [1, 1, 2, 3, 4, 5, 6, 7, 9, 10, 12, 13, 15, 17, 19, null, null], "Pad": [1, 1, 1, 1, 1, 1, 2, 3, 4, 6, 7, 9, 11, 12, 14, 15, 18]}, "6;8": {"Mos": [1, 1, 2, 2, 3, 4, 5, 6, 8, 10, 12, 14, 15, 17, 18, 19, null], "Cat": [1, 1, 2, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 14, 16, 18, null], "Sit": [1, 1, 2, 3, 4, 5, 6, 7, 9, 10, 12, 13, 15, 17, 19, null, null], "Pad": [1, 1, 1, 1, 1, 1, 1, 3, 4, 6, 7, 9, 10, 12, 13, 15, 18]}, "6;9": {"Mos": [1, 1, 2, 2, 3, 3, 5, 6, 8, 10, 12, 13, 15, 17, 18, 19, null], "Cat": [1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 14, 16, 18, null], "Sit": [1, 1, 1, 3, 4, 5, 6, 7, 8, 10, 11, 13, 15, 17, 19, null, null], "Pad": [1, 1, 1, 1, 1, 1, 1, 3, 4, 6, 7, 9, 10, 12, 13, 15, 18]}, "6;10": {"Mos": [1, 1, 1, 2, 3, 3, 4, 6, 8, 9, 11, 13, 15, 16, 18, 19, null], "Cat": [1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 14, 15, 18, null], "Sit": [1, 1, 1, 2, 4, 5, 6, 7, 8, 10, 11, 13, 15, 16, 19, null, null], "Pad": [1, 1, 1, 1, 1, 1, 1, 2, 4, 5, 7, 8, 10, 12, 13, 15, 18]}, "6;11": {"Mos": [1, 1, 1, 2, 2, 3, 4, 6, 7, 9, 11, 13, 15, 16, 17, 19, null], "Cat": [1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 15, 18, null], "Sit": [1, 1, 1, 2, 3, 4, 6, 7, 8, 10, 11, 13, 15, 16, 19, null, null], "Pad": [1, 1, 1, 1, 1, 1, 1, 2, 4, 5, 7, 8, 10, 11, 13, 15, 18]}, "7;0": {"Mos": [1, 1, 1, 2, 2, 3, 4, 6, 7, 9, 11, 13, 14, 16, 17, 19, null], "Cat": [1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 15, 18, null], "Sit": [1, 1, 1, 2, 3, 4, 5, 7, 8, 9, 11, 13, 14, 16, 18, null, null], "Pad": [1, 1, 1, 1, 1, 1, 1, 2, 4, 5, 7, 8, 10, 11, 13, 15, 17]}, "7;1": {"Mos": [1, 1, 1, 2, 2, 3, 4, 5, 7, 9, 11, 13, 14, 16, 17, 19, null], "Cat": [1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 15, 18, null], "Sit": [1, 1, 1, 2, 3, 4, 5, 7, 8, 9, 11, 13, 14, 16, 18, null, null], "Pad": [1, 1, 1, 1, 1, 1, 1, 2, 3, 5, 6, 8, 9, 11, 13, 15, 17]}, "7;2": {"Mos": [1, 1, 1, 2, 2, 3, 4, 5, 7, 9, 11, 13, 14, 15, 17, 19, null], "Cat": [1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 18, null], "Sit": [1, 1, 1, 2, 3, 4, 5, 6, 8, 9, 11, 12, 14, 16, 18, null, null], "Pad": [1, 1, 1, 1, 1, 1, 1, 2, 3, 5, 6, 8, 9, 11, 12, 14, 17]}, "7;3": {"Mos": [1, 1, 1, 1, 2, 3, 4, 5, 7, 9, 11, 12, 14, 15, 16, 18, null], "Cat": [1, 1, 1, 2, 3, 4, 4, 5, 7, 8, 9, 10, 11, 13, 15, 18, null], "Sit": [1, 1, 1, 2, 3, 4, 5, 6, 8, 9, 11, 12, 14, 16, 18, null, null], "Pad": [1, 1, 1, 1, 1, 1, 1, 2, 3, 5, 6, 8, 9, 11, 12, 14, 17]}, "7;4": {"Mos": [1, 1, 1, 1, 2, 3, 4, 5, 7, 9, 10, 12, 14, 15, 16, 18, null], "Cat": [1, 1, 1, 2, 3, 3, 4, 5, 6, 7, 9, 10, 11, 13, 15, 17, null], "Sit": [1, 1, 1, 2, 3, 4, 5, 6, 8, 9, 11, 12, 14, 16, 18, null, null], "Pad": [1, 1, 1, 1, 1, 1, 1, 2, 3, 5, 6, 8, 9, 11, 12, 14, 17]}, "7;5": {"Mos": [1, 1, 1, 1, 2, 3, 4, 5, 7, 9, 10, 12, 14, 15, 16, 18, null], "Cat": [1, 1, 1, 2, 2, 3, 4, 5, 6, 7, 9, 10, 11, 13, 15, 17, null], "Sit": [1, 1, 1, 2, 3, 4, 5, 6, 7, 9, 10, 12, 14, 16, 18, null, null], "Pad": [1, 1, 1, 1, 1, 1, 1, 2, 3, 4, 6, 7, 9, 10, 12, 14, 17]}, "7;6": {"Mos": [1, 1, 1, 1, 2, 2, 3, 5, 7, 8, 10, 12, 13, 15, 16, 18, null], "Cat": [1, 1, 1, 2, 2, 3, 4, 5, 6, 7, 8, 10, 11, 13, 15, 17, null], "Sit": [1, 1, 1, 2, 3, 4, 5, 6, 7, 9, 10, 12, 14, 15, 18, null, null], "Pad": [1, 1, 1, 1, 1, 1, 1, 1, 3, 4, 6, 7, 9, 10, 12, 14, 17]}, "7;7": {"Mos": [1, 1, 1, 1, 2, 2, 3, 5, 6, 8, 10, 12, 13, 14, 15, 17, null], "Cat": [1, 1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 13, 15, 17, null], "Sit": [1, 1, 1, 2, 3, 4, 5, 6, 7, 9, 10, 12, 14, 15, 18, null, null], "Pad": [1, 1, 1, 1, 1, 1, 1, 1, 3, 4, 6, 7, 9, 10, 12, 14, 17]}, "7;8": {"Mos": [1, 1, 1, 1, 1, 2, 3, 5, 6, 8, 10, 12, 13, 14, 15, 16, null], "Cat": [1, 1, 1, 1, 2, 3, 4, 6, 8, 10, 12, 13, 14, 15, 17, null, null], "Sit": [1, 1, 1, 1, 3, 4, 5, 6, 7, 8, 9, 11, 12, 14, 17, null, null], "Pad": [1, 1, 1, 1, 1, 1, 1, 3, 4, 5, 7, 8, 10, 12, 13, 15, 18]}, "7;9": {"Mos": [1, 1, 1, 1, 1, 2, 3, 5, 6, 8, 10, 11, 13, 14, 15, 17, null], "Cat": [1, 1, 1, 1, 2, 3, 4, 6, 8, 10, 11, 13, 14, 15, 17, null, null], "Sit": [1, 1, 1, 1, 2, 3, 5, 6, 7, 8, 9, 11, 12, 14, 17, null, null], "Pad": [1, 1, 1, 1, 1, 1, 1, 1, 2, 4, 5, 7, 8, 10, 11, 13, 16]}, "7;10": {"Mos": [1, 1, 1, 1, 1, 2, 3, 4, 6, 8, 10, 11, 13, 14, 15, 17, null], "Cat": [1, 1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 14, 17, null], "Sit": [1, 1, 1, 1, 2, 3, 4, 6, 7, 8, 10, 11, 13, 15, 17, null, null], "Pad": [1, 1, 1, 1, 1, 1, 1, 1, 2, 4, 5, 7, 8, 10, 11, 13, 16]}, "7;11": {"Mos": [1, 1, 1, 1, 1, 2, 3, 4, 6, 8, 10, 11, 13, 14, 14, 16, null], "Cat": [1, 1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 14, 17, null], "Sit": [1, 1, 1, 1, 2, 3, 4, 6, 7, 8, 10, 11, 13, 15, 17, null, null], "Pad": [1, 1, 1, 1, 1, 1, 1, 1, 2, 4, 5, 7, 8, 10, 11, 13, 16]}}, "combinacao_ee_er_qi": {"soma_ee": {"2": 52, "3": 54, "4": 57, "5": 59, "6": 62, "7": 65, "8": 67, "9": 70, "10": 73, "11": 75, "12": 78, "13": 81, "14": 83, "15": 86, "16": 89, "17": 92, "18": 94, "19": 97, "20": 100, "21": 103, "22": 105, "23": 108, "24": 111, "25": 114, "26": 117, "27": 119, "28": 122, "29": 125, "30": 128, "31": 131, "32": 134, "33": 137, "34": 140, "35": 142, "36": 145, "37": 148, "38": 150}, "soma_er": {"2": 52, "3": 55, "4": 57, "5": 60, "6": 62, "7": 65, "8": 67, "9": 70, "10": 72, "11": 75, "12": 78, "13": 80, "14": 83, "15": 86, "16": 89, "17": 91, "18": 94, "19": 97, "20": 100, "21": 103, "22": 105, "23": 108, "24": 111, "25": 114, "26": 117, "27": 120, "28": 123, "29": 126, "30": 129, "31": 132, "32": 135, "33": 138, "34": 141, "35": 145, "36": 148, "37": 150, "38": 150}, "soma_qi": {"4": {"qi": 50, "ic80_min": 47, "ic80_max": 62, "percentil": 1}, "5": {"qi": 50, "ic80_min": 47, "ic80_max": 62, "percentil": 1}, "6": {"qi": 51, "ic80_min": 48, "ic80_max": 63, "percentil": 1}, "7": {"qi": 52, "ic80_min": 49, "ic80_max": 64, "percentil": 1}, "8": {"qi": 53, "ic80_min": 50, "ic80_max": 65, "percentil": 1}, "9": {"qi": 55, "ic80_min": 51, "ic80_max": 66, "percentil": 1}, "10": {"qi": 56, "ic80_min": 53, "ic80_max": 68, "percentil": 1}, "11": {"qi": 57, "ic80_min": 54, "ic80_max": 69, "percentil": 1}, "12": {"qi": 59, "ic80_min": 55, "ic80_max": 70, "percentil": 1}, "13": {"qi": 60, "ic80_min": 56, "ic80_max": 71, "percentil": 1}, "14": {"qi": 62, "ic80_min": 58, "ic80_max": 73, "percentil": 1}, "15": {"qi": 63, "ic80_min": 59, "ic80_max": 74, "percentil": 1}, "16": {"qi": 64, "ic80_min": 60, "ic80_max": 75, "percentil": 1}, "17": {"qi": 66, "ic80_min": 61, "ic80_max": 76, "percentil": 1}, "18": {"qi": 67, "ic80_min": 63, "ic80_max": 78, "percentil": 1}, "19": {"qi": 69, "ic80_min": 64, "ic80_max": 79, "percentil": 2}, "20": {"qi": 70, "ic80_min": 65, "ic80_max": 80, "percentil": 2}, "21": {"qi": 71, "ic80_min": 66, "ic80_max": 82, "percentil": 3}, "22": {"qi": 73, "ic80_min": 68, "ic80_max": 83, "percentil": 4}, "23": {"qi": 74, "ic80_min": 69, "ic80_max": 84, "percentil": 4}, "24": {"qi": 76, "ic80_min": 70, "ic80_max": 85, "percentil": 5}, "25": {"qi": 77, "ic80_min": 72, "ic80_max": 87, "percentil": 6}, "26": {"qi": 79, "ic80_min": 73, "ic80_max": 88, "percentil": 8}, "27": {"qi": 80, "ic80_min": 74, "ic80_max": 89, "percentil": 9}, "28": {"qi": 82, "ic80_min": 76, "ic80_max": 91, "percentil": 12}, "29": {"qi": 83, "ic80_min": 77, "ic80_max": 92, "percentil": 13}, "30": {"qi": 85, "ic80_min": 78, "ic80_max": 93, "percentil": 16}, "31": {"qi": 86, "ic80_min": 80, "ic80_max": 95, "percentil": 18}, "32": {"qi": 87, "ic80_min": 81, "ic80_max": 96, "percentil": 19}, "33": {"qi": 89, "ic80_min": 82, "ic80_max": 98, "percentil": 23}, "34": {"qi": 91, "ic80_min": 84, "ic80_max": 99, "percentil": 27}, "35": {"qi": 92, "ic80_min": 85, "ic80_max": 100, "percentil": 30}, "36": {"qi": 94, "ic80_min": 87, "ic80_max": 102, "percentil": 34}, "37": {"qi": 95, "ic80_min": 88, "ic80_max": 103, "percentil": 37}, "38": {"qi": 97, "ic80_min": 89, "ic80_max": 104, "percentil": 42}, "39": {"qi": 98, "ic80_min": 91, "ic80_max": 106, "percentil": 45}, "40": {"qi": 100, "ic80_min": 92, "ic80_max": 107, "percentil": 50}, "41": {"qi": 101, "ic80_min": 94, "ic80_max": 109, "percentil": 53}, "42": {"qi": 103, "ic80_min": 95, "ic80_max": 110, "percentil": 58}, "43": {"qi": 104, "ic80_min": 96, "ic80_max": 112, "percentil": 61}, "44": {"qi": 106, "ic80_min": 98, "ic80_max": 113, "percentil": 66}, "45": {"qi": 108, "ic80_min": 99, "ic80_max": 114, "percentil": 70}, "46": {"qi": 109, "ic80_min": 101, "ic80_max": 116, "percentil": 73}, "47": {"qi": 111, "ic80_min": 102, "ic80_max": 117, "percentil": 77}, "48": {"qi": 112, "ic80_min": 104, "ic80_max": 119, "percentil": 79}, "49": {"qi": 114, "ic80_min": 105, "ic80_max": 120, "percentil": 82}, "50": {"qi": 115, "ic80_min": 107, "ic80_max": 122, "percentil": 84}, "51": {"qi": 117, "ic80_min": 108, "ic80_max": 123, "percentil": 87}, "52": {"qi": 119, "ic80_min": 109, "ic80_max": 125, "percentil": 90}, "53": {"qi": 120, "ic80_min": 111, "ic80_max": 126, "percentil": 91}, "54": {"qi": 122, "ic80_min": 112, "ic80_max": 128, "percentil": 93}, "55": {"qi": 124, "ic80_min": 114, "ic80_max": 129, "percentil": 95}, "56": {"qi": 125, "ic80_min": 115, "ic80_max": 131, "percentil": 95}, "57": {"qi": 127, "ic80_min": 117, "ic80_max": 132, "percentil": 96}, "58": {"qi": 129, "ic80_min": 118, "ic80_max": 134, "percentil": 97}, "59": {"qi": 130, "ic80_min": 120, "ic80_max": 135, "percentil": 98}, "60": {"qi": 132, "ic80_min": 121, "ic80_max": 137, "percentil": 98}, "61": {"qi": 134, "ic80_min": 123, "ic80_max": 138, "percentil": 99}, "62": {"qi": 135, "ic80_min": 125, "ic80_max": 140, "percentil": 99}, "63": {"qi": 137, "ic80_min": 126, "ic80_max": 141, "percentil": 99}, "64": {"qi": 139, "ic80_min": 128, "ic80_max": 143, "percentil": 99}, "65": {"qi": 140, "ic80_min": 129, "ic80_max": 144, "percentil": 99}, "66": {"qi": 142, "ic80_min": 131, "ic80_max": 146, "percentil": 99}, "67": {"qi": 144, "ic80_min": 132, "ic80_max": 147, "percentil": 99}, "68": {"qi": 146, "ic80_min": 134, "ic80_max": 149, "percentil": 99}, "69": {"qi": 147, "ic80_min": 135, "ic80_max": 151, "percentil": 99}, "70": {"qi": 149, "ic80_min": 137, "ic80_max": 152, "percentil": 99}, "71": {"qi": 150, "ic80_min": 138, "ic80_max": 153, "percentil": 99}, "72": {"qi": 150, "ic80_min": 138, "ic80_max": 153, "percentil": 99}, "73": {"qi": 150, "ic80_min": 138, "ic80_max": 153, "percentil": 99}, "74": {"qi": 150, "ic80_min": 138, "ic80_max": 153, "percentil": 99}, "75": {"qi": 150, "ic80_min": 138, "ic80_max": 153, "percentil": 99}, "76": {"qi": 150, "ic80_min": 138, "ic80_max": 153, "percentil": 99}}}, "classificacao_qi": [{"qi_min": 131, "qi_max": null, "classificacao": "Muito alto", "pct_populacao": 2}, {"qi_min": 121, "qi_max": 130, "classificacao": "Alto", "pct_populacao": 7}, {"qi_min": 111, "qi_max": 120, "classificacao": "Acima da média", "pct_populacao": 16}, {"qi_min": 90, "qi_max": 110, "classificacao": "Médio", "pct_populacao": 50}, {"qi_min": 80, "qi_max": 89, "classificacao": "Abaixo da média", "pct_populacao": 16}, {"qi_min": 70, "qi_max": 79, "classificacao": "Baixo", "pct_populacao": 7}, {"qi_min": null, "qi_max": 69, "classificacao": "Muito baixo", "pct_populacao": 2}], "intervalos_confianca_80_simplificados": {"observacao": "A Tabela 76 já traz o IC 80% exato do SON-QI para cada soma. Para SON-EE e SON-ER individualmente, o manual oferece um método simplificado (Tabela 58) com amplitude FIXA, mais simples que o método por \"escore verdadeiro\" (que exige coeficientes de fidedignidade por idade, não incluídos aqui): IC80% = escore ± metade da amplitude.", "SON_QI": {"amplitude": 16, "meia_amplitude": 8}, "SON_EE": {"amplitude": 18, "meia_amplitude": 9}, "SON_ER": {"amplitude": 20, "meia_amplitude": 10}}, "diferenca_ee_er_significativa": {"observacao": "Para testar se a diferença entre SON-EE e SON-ER é estatisticamente significativa, o manual usa a Razão Crítica (RC) com erro padrão de mensuração por idade (Tabela 30/31, não incluída neste motor). Como referência fixa aproximada dada pelo próprio manual (Tabela 76, rodapé): diferença ≥ 16 pontos é significativa a p<0,05; diferença ≥ 20 pontos é significativa a p<0,01.", "p05": 16, "p01": 20}, "estado_de_verificacao": {"metodo": "Dados extraídos visualmente do manual em PDF escaneado, em duas passagens. Primeira passagem: leitura de baixa resolução, gerou o motor original. Segunda passagem (atual): re-leitura completa das 66 tabelas de idade a partir de um re-scan de alta resolução do mesmo capítulo (Capítulo 9 + Apêndice A), usando múltiplas leituras independentes (incluindo recortes com zoom de até 500 DPI para células ambíguas) e checagem estrutural automática (17 posições por linha, sequência não decrescente, posição correta dos valores \"não aplicável\"/teto).", "resultado_validacao": "28 das 66 tabelas de idade tinham pelo menos uma célula incorreta na primeira passagem (a maioria diferenças pontuais de 1 posição, tipicamente um degrau intermediário ausente ou extra). Todas foram corrigidas nesta segunda passagem. Validado end-to-end contra os 3 estudos de caso completos do manual (Capítulo 9): idades 5;9 (Caso 1, I.B.), 6;3 (Caso 2, A.O.) e 7;9 (Caso 3, A.G.) — 16 de 16 valores batem exatamente: os 4 escores normatizados de subteste + SON-EE + SON-ER + SON-QI + percentil + IC80% de cada um dos 3 casos.", "discrepancia_anterior_resolvida": "A discrepância documentada em versões anteriores deste arquivo — subteste Padrões, idade 5;9, \"escore bruto 8\" — foi um erro de leitura da folha de registro escaneada do Caso 1 na primeira passagem (baixa resolução): o escore bruto real de Padrões no Caso 1 é 3, não 8. Com a leitura correta (bruto=3), o motor retorna escore normatizado=1, que bate exatamente com o manual. A linha \"Padrões\" da Tabela 68 (idade 5;9) estava correta desde o início; o erro era só na leitura do caso, não na tabela.", "ressalva_paginas_com_dobra": "Duas células (Situações, idades 5;0 e 5;1, escores brutos 13-14) caem exatamente sobre uma dobra física da página no scan de origem. Foram lidas com o valor estruturalmente mais consistente (respeitando o padrão de \"2 pontos finais\" do subteste Situações), mas têm confiança levemente menor que o resto da tabela — afetam apenas escores brutos muito altos (raros clinicamente) nessas duas idades.", "recomendacao": "Ferramenta de apoio ao cálculo, não substitui a conferência do psicólogo. Confiança alta em toda a tabela após a segunda passagem; ainda assim, recomenda-se conferir a tabela da idade real do paciente contra o manual impresso antes de uso clínico, como boa prática padrão para qualquer tabela extraída de scan."}, "fidedignidade_por_idade": {"fonte": "Tabela 30 do manual (p.88): Fidedignidade Lambda 2 de Guttman e EPM dos escores normatizados, depois do ajuste. 10 grupos de idade (centros de faixas de 6 meses, de 3;3 a 7;9). Para idades fora desse intervalo (2;6 a 3;2, ou seja, abaixo do primeiro grupo), usa-se o grupo mais próximo disponível (3;3).", "grupos_idade": ["3;3", "3;9", "4;3", "4;9", "5;3", "5;9", "6;3", "6;9", "7;3", "7;9"], "fidedignidade": {"3;3": {"Mos": 0.75, "Cat": 0.9, "Sit": 0.82, "Pad": 0.82, "M": 0.82, "EE": 0.87, "ER": 0.91, "QI": 0.93}, "3;9": {"Mos": 0.82, "Cat": 0.86, "Sit": 0.82, "Pad": 0.81, "M": 0.83, "EE": 0.88, "ER": 0.9, "QI": 0.93}, "4;3": {"Mos": 0.83, "Cat": 0.84, "Sit": 0.8, "Pad": 0.8, "M": 0.82, "EE": 0.89, "ER": 0.89, "QI": 0.93}, "4;9": {"Mos": 0.81, "Cat": 0.82, "Sit": 0.79, "Pad": 0.8, "M": 0.81, "EE": 0.88, "ER": 0.88, "QI": 0.93}, "5;3": {"Mos": 0.79, "Cat": 0.81, "Sit": 0.77, "Pad": 0.8, "M": 0.79, "EE": 0.87, "ER": 0.87, "QI": 0.92}, "5;9": {"Mos": 0.77, "Cat": 0.8, "Sit": 0.76, "Pad": 0.79, "M": 0.78, "EE": 0.87, "ER": 0.86, "QI": 0.92}, "6;3": {"Mos": 0.76, "Cat": 0.79, "Sit": 0.74, "Pad": 0.79, "M": 0.77, "EE": 0.86, "ER": 0.85, "QI": 0.91}, "6;9": {"Mos": 0.76, "Cat": 0.77, "Sit": 0.73, "Pad": 0.78, "M": 0.76, "EE": 0.86, "ER": 0.84, "QI": 0.91}, "7;3": {"Mos": 0.77, "Cat": 0.76, "Sit": 0.72, "Pad": 0.76, "M": 0.75, "EE": 0.86, "ER": 0.83, "QI": 0.91}, "7;9": {"Mos": 0.79, "Cat": 0.75, "Sit": 0.71, "Pad": 0.74, "M": 0.75, "EE": 0.86, "ER": 0.83, "QI": 0.9}}, "epm": {"3;3": {"Mos": 1.49, "Cat": 0.96, "Sit": 1.26, "Pad": 1.27, "M": 1.25, "EE": 5.41, "ER": 4.46, "QI": 3.88}, "3;9": {"Mos": 1.29, "Cat": 1.11, "Sit": 1.29, "Pad": 1.31, "M": 1.25, "EE": 5.09, "ER": 4.79, "QI": 3.86}, "4;3": {"Mos": 1.25, "Cat": 1.2, "Sit": 1.33, "Pad": 1.33, "M": 1.28, "EE": 5.07, "ER": 5.06, "QI": 3.95}, "4;9": {"Mos": 1.31, "Cat": 1.26, "Sit": 1.38, "Pad": 1.34, "M": 1.32, "EE": 5.18, "ER": 5.27, "QI": 4.08}, "5;3": {"Mos": 1.38, "Cat": 1.31, "Sit": 1.43, "Pad": 1.34, "M": 1.37, "EE": 5.34, "ER": 5.46, "QI": 4.22}, "5;9": {"Mos": 1.45, "Cat": 1.35, "Sit": 1.48, "Pad": 1.36, "M": 1.41, "EE": 5.5, "ER": 5.64, "QI": 4.35}, "6;3": {"Mos": 1.48, "Cat": 1.38, "Sit": 1.52, "Pad": 1.38, "M": 1.44, "EE": 5.61, "ER": 5.81, "QI": 4.46}, "6;9": {"Mos": 1.47, "Cat": 1.42, "Sit": 1.56, "Pad": 1.42, "M": 1.47, "EE": 5.67, "ER": 5.97, "QI": 4.54}, "7;3": {"Mos": 1.43, "Cat": 1.46, "Sit": 1.6, "Pad": 1.47, "M": 1.49, "EE": 5.69, "ER": 6.12, "QI": 4.61}, "7;9": {"Mos": 1.37, "Cat": 1.5, "Sit": 1.63, "Pad": 1.53, "M": 1.51, "EE": 5.67, "ER": 6.25, "QI": 4.66}}}, "generalizabilidade": {"fonte": "Tabela 31 do manual (p.89): Generalizabilidade e erro padrão de estimação (EPE) para SON-EE/SON-ER/SON-QI. Valores fixos em todos os grupos de idade (não há relação clara entre as covariâncias e a idade).", "SON_EE": {"generalizabilidade": 0.77, "epe": 7.1}, "SON_ER": {"generalizabilidade": 0.73, "epe": 7.8}, "SON_QI": {"generalizabilidade": 0.83, "epe": 6.3}}};

  var IDADES_VALIDAS = Object.keys(DADOS.normas_subtestes);
  var SUBTESTES = ['Mos', 'Cat', 'Sit', 'Pad'];

  /**
   * Converte idade em anos+meses completos para a chave "anos;meses" usada
   * nas tabelas (ex.: 5 anos e 9 meses -> "5;9"). A idade é sempre
   * arredondada para baixo, seguindo a regra do manual.
   */
  function chaveIdade(anos, meses) {
    return anos + ';' + meses;
  }

  /**
   * Calcula idade em anos e meses completos a partir da data de nascimento
   * e da data de aplicação (ambas Date ou string 'YYYY-MM-DD').
   */
  function calcularIdade(dataNascimento, dataAplicacao) {
    var nasc = dataNascimento instanceof Date ? dataNascimento : new Date(dataNascimento);
    var apl = dataAplicacao instanceof Date ? dataAplicacao : new Date(dataAplicacao);
    var anos = apl.getFullYear() - nasc.getFullYear();
    var meses = apl.getMonth() - nasc.getMonth();
    var dias = apl.getDate() - nasc.getDate();
    if (dias < 0) meses -= 1;
    if (meses < 0) { anos -= 1; meses += 12; }
    return { anos: anos, meses: meses };
  }

  /**
   * Ajusta a idade calculada para a faixa coberta pelas tabelas (2;6 a 7;11),
   * conforme instrução do manual ("< 2;6" e "> 7;11" não têm norma; usa-se o limite).
   */
  function normalizarChaveIdade(anos, meses) {
    var totalMeses = anos * 12 + meses;
    var minMeses = 2 * 12 + 6;   // 2;6
    var maxMeses = 7 * 12 + 11;  // 7;11
    if (totalMeses < minMeses) totalMeses = minMeses;
    if (totalMeses > maxMeses) totalMeses = maxMeses;
    var a = Math.floor(totalMeses / 12);
    var m = totalMeses % 12;
    return chaveIdade(a, m);
  }

  /**
   * Normaliza o escore bruto de um subteste (0-16) para escore normatizado
   * (1-19, média 10, DP 3) usando a tabela da idade informada.
   * @param {string} idadeChave - "anos;meses", ex. "5;9"
   * @param {string} subteste - 'Mos' | 'Cat' | 'Sit' | 'Pad'
   * @param {number} bruto - escore bruto do subteste
   */
  function normalizarSubteste(idadeChave, subteste, bruto) {
    var tabelaIdade = DADOS.normas_subtestes[idadeChave];
    if (!tabelaIdade) {
      throw new Error('Idade fora da faixa normatizada (2;6 a 7;11): "' + idadeChave + '"');
    }
    var linha = tabelaIdade[subteste];
    if (bruto == null || bruto < 0 || bruto >= linha.length || linha[bruto] === null) {
      throw new Error('Escore bruto inválido para ' + subteste + ' na idade ' + idadeChave + ': ' + bruto);
    }
    return linha[bruto];
  }

  function classificarQI(qi) {
    var faixas = DADOS.classificacao_qi;
    for (var i = 0; i < faixas.length; i++) {
      var f = faixas[i];
      var min = f.qi_min == null ? -Infinity : f.qi_min;
      var max = f.qi_max == null ? Infinity : f.qi_max;
      if (qi >= min && qi <= max) return f.classificacao;
    }
    return null;
  }

  // z (valor crítico bicaudal) para cada nível de confiança suportado
  var Z_NIVEL_IC = { '80%': 1.2816, '90%': 1.6449, '95%': 1.96 };

  /**
   * Seleciona o grupo de idade da Tabela 30 (fidedignidade/EPM) mais próximo da
   * idade informada. A Tabela 30 só tem 10 grupos (centros de faixas de 6 meses,
   * 3;3 a 7;9); para idades fora desse intervalo usa-se o grupo mais próximo.
   */
  function grupoFidedignidadeMaisProximo(idadeChave) {
    var partes = idadeChave.split(';');
    var totalMeses = Number(partes[0]) * 12 + Number(partes[1]);
    var grupos = DADOS.fidedignidade_por_idade.grupos_idade;
    var melhor = grupos[0], melhorDist = Infinity;
    grupos.forEach(function (g) {
      var gp = g.split(';');
      var gMeses = Number(gp[0]) * 12 + Number(gp[1]);
      var dist = Math.abs(gMeses - totalMeses);
      if (dist < melhorDist) { melhorDist = dist; melhor = g; }
    });
    return melhor;
  }

  /**
   * Escore verdadeiro (fórmula de Kelley): "encolhe" o escore observado em
   * direção à média (100) proporcionalmente à fidedignidade (alpha) da escala
   * naquela idade. Reproduz o método exato usado nos 3 casos do Capítulo 9
   * do manual (não o método simplificado que usa o escore observado direto).
   */
  function escoreVerdadeiro(escoreObservado, alpha) {
    return Math.round(100 + alpha * (escoreObservado - 100));
  }

  function amplitudeIC(nivelIC, epe) {
    var z = Z_NIVEL_IC[nivelIC] || Z_NIVEL_IC['80%'];
    return Math.round(z * epe);
  }

  /**
   * Corrige o SON-R 2½-7[a] completo a partir dos 4 escores brutos.
   *
   * @param {Object} escoresBrutos - { Mos, Cat, Sit, Pad } (cada um o escore
   *        bruto já calculado pelo psicólogo na aplicação: número do último
   *        item aplicado menos erros e recusas — ver DADOS.regras_pontuacao).
   * @param {Object} opcoes
   * @param {string} [opcoes.idade] - chave direta "anos;meses", ex. "5;9"
   * @param {Date|string} [opcoes.dataNascimento] - alternativa a opcoes.idade
   * @param {Date|string} [opcoes.dataAplicacao] - usado junto com dataNascimento
   * @returns {Object} resultado com escores normatizados por subteste,
   *          SON-EE, SON-ER, SON-QI, IC80%, percentil e classificação.
   */
  function corrigir(escoresBrutos, opcoes) {
    opcoes = opcoes || {};
    escoresBrutos = escoresBrutos || {};

    var idadeChave = opcoes.idade;
    if (!idadeChave) {
      if (!opcoes.dataNascimento || !opcoes.dataAplicacao) {
        throw new Error('Informe opcoes.idade ("anos;meses", ex. "5;9") ou opcoes.dataNascimento + opcoes.dataAplicacao.');
      }
      var idadeCalc = calcularIdade(opcoes.dataNascimento, opcoes.dataAplicacao);
      idadeChave = normalizarChaveIdade(idadeCalc.anos, idadeCalc.meses);
    }
    if (IDADES_VALIDAS.indexOf(idadeChave) === -1) {
      throw new Error('Idade inválida: "' + idadeChave + '". Deve estar entre "2;6" e "7;11".');
    }

    var resultado = { instrumento: 'SON-R 2½-7[a]', idade: idadeChave, subtestes: {} };
    var normalizados = {};
    var subtestesAdministrados = 0;

    SUBTESTES.forEach(function (sub) {
      var bruto = escoresBrutos[sub];
      if (bruto === undefined || bruto === null || bruto === '') {
        resultado.subtestes[sub] = null;
        return;
      }
      var n = normalizarSubteste(idadeChave, sub, Number(bruto));
      normalizados[sub] = n;
      subtestesAdministrados++;
      resultado.subtestes[sub] = {
        nome: DADOS.subtestes[sub].nome,
        escala: DADOS.subtestes[sub].escala,
        escoreBruto: Number(bruto),
        escoreNormatizado: n,
      };
    });

    if (subtestesAdministrados < 4) {
      resultado.aviso = 'SON-QI requer os 4 subtestes administrados. Com menos de 4, apenas os ' +
        'escores normatizados individuais são calculados (sem SON-EE / SON-ER / SON-QI).';
      resultado.sonEE = null;
      resultado.sonER = null;
      resultado.sonQI = null;
      return resultado;
    }

    var somaEE = normalizados.Mos + normalizados.Pad;   // Execução: Mosaicos + Padrões
    var somaER = normalizados.Cat + normalizados.Sit;   // Raciocínio: Categorias + Situações
    var soma1a4 = somaEE + somaER;

    var ee = DADOS.combinacao_ee_er_qi.soma_ee[String(somaEE)];
    var er = DADOS.combinacao_ee_er_qi.soma_er[String(somaER)];
    var qiInfo = DADOS.combinacao_ee_er_qi.soma_qi[String(soma1a4)];

    var nivelIC = (opcoes.nivelIC || '80%');
    if (!Z_NIVEL_IC[nivelIC]) nivelIC = '80%';

    // Escore verdadeiro (fórmula de Kelley, igual aos 3 casos do Cap. 9): "encolhe"
    // o escore observado (ee/er) em direção a 100 usando a fidedignidade (alpha)
    // da idade real da criança (Tabela 30), depois aplica o IC pelo EPE (Tabela 31).
    var grupoFid = grupoFidedignidadeMaisProximo(idadeChave);
    var alphaEE = DADOS.fidedignidade_por_idade.fidedignidade[grupoFid].EE;
    var alphaER = DADOS.fidedignidade_por_idade.fidedignidade[grupoFid].ER;
    var epeEE = DADOS.generalizabilidade.SON_EE.epe;
    var epeER = DADOS.generalizabilidade.SON_ER.epe;
    var epeQI = DADOS.generalizabilidade.SON_QI.epe;

    var tEE = escoreVerdadeiro(ee, alphaEE);
    var tER = escoreVerdadeiro(er, alphaER);
    var meiaEE = amplitudeIC(nivelIC, epeEE);
    var meiaER = amplitudeIC(nivelIC, epeER);

    resultado.sonEE = {
      nome: 'Escala de Execução (SON-EE)',
      somaNormatizados: somaEE,
      escore: ee,
      escoreVerdadeiro: tEE,
      nivelIC: nivelIC,
      ic: { min: tEE - meiaEE, max: tEE + meiaEE },
    };
    resultado.sonER = {
      nome: 'Escala de Raciocínio (SON-ER)',
      somaNormatizados: somaER,
      escore: er,
      escoreVerdadeiro: tER,
      nivelIC: nivelIC,
      ic: { min: tER - meiaER, max: tER + meiaER },
    };

    // SON-QI: no nível 80% usa o IC exato impresso na Tabela 76 (não precisa de
    // escore verdadeiro/EPE, o manual já fornece o valor pronto). Em 90%/95%,
    // que o manual não imprime, estende o mesmo raciocínio usando o EPE do
    // SON-QI (Tabela 31) direto sobre o escore (o SON-QI da Tabela 76 já é o
    // escore verdadeiro/composto final, não precisa do encolhimento de Kelley).
    var qiIC;
    if (nivelIC === '80%') {
      qiIC = { min: qiInfo.ic80_min, max: qiInfo.ic80_max };
    } else {
      var meiaQI = amplitudeIC(nivelIC, epeQI);
      qiIC = { min: qiInfo.qi - meiaQI, max: qiInfo.qi + meiaQI };
    }
    resultado.sonQI = {
      nome: 'Escala Geral (SON-QI)',
      somaNormatizados: soma1a4,
      escore: qiInfo.qi,
      nivelIC: nivelIC,
      ic: qiIC,
      percentil: qiInfo.percentil,
      classificacao: classificarQI(qiInfo.qi),
    };

    var diffEE_ER = Math.abs(ee - er);
    var difLimiares = DADOS.diferenca_ee_er_significativa;
    resultado.diferencaEeEr = {
      diferenca: ee - er,
      significativa_p05: diffEE_ER >= difLimiares.p05,
      significativa_p01: diffEE_ER >= difLimiares.p01,
      observacao: 'Baseado nos limiares fixos do manual (Tabela 76): não usa erro padrão por idade.',
    };

    return resultado;
  }

  return {
    dados: DADOS,
    subtestes: DADOS.subtestes,
    idadesValidas: IDADES_VALIDAS,
    calcularIdade: calcularIdade,
    normalizarChaveIdade: normalizarChaveIdade,
    classificarQI: classificarQI,
    corrigir: corrigir,
  };
});
