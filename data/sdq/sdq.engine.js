(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.SDQ = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // ---------------------------------------------------------------------
  // DADOS: extraídos de PULPO_NEURO_MODELO_V1 (abas SDQ-Pr).
  // Gerado automaticamente — não editar manualmente.
  // ---------------------------------------------------------------------
  var DADOS = {"instrumento": "SDQ - Questionário de Capacidades e Dificuldades (Strengths and Difficulties Questionnaire)", "fonte_oficial_itens": "https://www.sdqinfo.org/py/sdqinfo/b3.py?language=Portugueseqz(Brazil) — o texto oficial dos 25 itens não está na planilha original (só os códigos de resposta de exemplo); baixe a versão oficial em português no link para renderizar o formulário.", "respondentes": ["Professor", "Cuidador", "Auto"], "escala_resposta_principal": {"valores_possiveis": ["F", "M", "V"], "legenda": {"F": "Falso", "M": "Mais ou Menos", "V": "Verdadeiro"}, "mapa_normal": {"F": 0, "M": 1, "V": 2}, "mapa_invertido": {"F": 2, "M": 1, "V": 0}}, "escala_resposta_impacto": {"valores_possiveis": ["N", "P", "M", "MM"], "legenda": {"N": "Nada", "P": "Pouco", "M": "Médio/Mais ou menos", "MM": "Muito/Mais que médio"}, "mapa": {"N": 0, "P": 0, "M": 1, "MM": 2}}, "fatores": {"SintomasEmocionais": "Sintomas Emocionais", "ProblemasConduta": "Problemas de Conduta", "Hiperatividade": "Hiperatividade", "ProblemasRelacionamentoColegas": "Problemas de Relacionamento com Colegas", "ComportamentoProSocial": "Comportamento Pró-Social (não somado ao Total)", "Total": "Total de Dificuldades (soma dos 4 fatores, exclui Pró-Social)", "Impacto": "Suplemento de Impacto"}, "composicao_itens": {"SintomasEmocionais": [3, 8, 13, 16, 24], "ProblemasConduta": [5, 7, 12, 18, 22], "Hiperatividade": [2, 10, 15, 21, 25], "ProblemasRelacionamentoColegas": [6, 11, 14, 19, 23], "ComportamentoProSocial": [1, 4, 9, 17, 20]}, "itens_invertidos": [7, 11, 14, 21, 25], "cutoffs_por_respondente": {"Professor": {"SintomasEmocionais": {"anormal_min": 6, "limitrofe": 5, "normal_max": 4}, "ProblemasConduta": {"anormal_min": 4, "limitrofe": 3, "normal_max": 2}, "Hiperatividade": {"anormal_min": 7, "limitrofe": 6, "normal_max": 5}, "ProblemasRelacionamentoColegas": {"anormal_min": 5, "limitrofe": 4, "normal_max": 3}, "ComportamentoProSocial": {"normal_min": 6, "limitrofe": 5, "anormal_max": 4}, "Total": {"anormal_min": 16, "limitrofe_min": 12, "normal_max": 11}}, "Auto": {"SintomasEmocionais": {"anormal_min": 6, "limitrofe": 5, "normal_max": 4}, "ProblemasConduta": {"anormal_min": 4, "limitrofe": 3, "normal_max": 2}, "Hiperatividade": {"anormal_min": 7, "limitrofe": 6, "normal_max": 5}, "ProblemasRelacionamentoColegas": {"anormal_min": 5, "limitrofe": 4, "normal_max": 3}, "ComportamentoProSocial": {"normal_min": 6, "limitrofe": 5, "anormal_max": 4}, "Total": {"anormal_min": 16, "limitrofe_min": 12, "normal_max": 11}}, "Cuidador": {"SintomasEmocionais": {"anormal_min": 5, "limitrofe": 4, "normal_max": 3}, "ProblemasConduta": {"anormal_min": 4, "limitrofe": 3, "normal_max": 2}, "Hiperatividade": {"anormal_min": 7, "limitrofe": 6, "normal_max": 5}, "ProblemasRelacionamentoColegas": {"anormal_min": 4, "limitrofe": 3, "normal_max": 2}, "ComportamentoProSocial": {"normal_min": 6, "limitrofe": 5, "anormal_max": 4}, "Total": {"anormal_min": 17, "limitrofe_min": 14, "normal_max": 13}}}, "impacto_itens_texto": {"1": "Dificuldades incomodam ou aborrecem a Criança?", "2": "Interferem no dia-a-dia em casa?", "3": "Interferem nas amizades?", "4": "Interferem no aprendizado escolar?", "5": "Interferem nas atividades de lazer?"}, "impacto_itens_por_respondente": {"Professor": [1, 3, 4], "Cuidador": [1, 2, 3, 4, 5], "Auto": [1, 2, 3, 4, 5]}, "impacto_classificacao": {"anormal_min": 2, "limitrofe": 1, "normal": 0}};

  var RESPONDENTES_VALIDOS = DADOS.respondentes;
  var ITENS_INVERTIDOS = {};
  DADOS.itens_invertidos.forEach(function (n) { ITENS_INVERTIDOS[n] = true; });

  /**
   * Converte a resposta bruta (F/M/V) para valor numérico (0-2),
   * já aplicando a inversão dos itens 7, 11, 14, 21 e 25.
   */
  function valorItemPrincipal(numeroItem, resposta) {
    if (resposta === undefined || resposta === null || resposta === '') return null;
    var r = String(resposta).toUpperCase();
    var mapa = ITENS_INVERTIDOS[numeroItem]
      ? DADOS.escala_resposta_principal.mapa_invertido
      : DADOS.escala_resposta_principal.mapa_normal;
    var valor = mapa[r];
    if (valor === undefined) {
      throw new Error('Resposta inválida no item ' + numeroItem + ': "' + resposta + '". Use F, M ou V.');
    }
    return valor;
  }

  /** Converte a resposta bruta do Suplemento de Impacto (N/P/M/MM) para 0-2. */
  function valorItemImpacto(resposta) {
    if (resposta === undefined || resposta === null || resposta === '') return null;
    var r = String(resposta).toUpperCase();
    var valor = DADOS.escala_resposta_impacto.mapa[r];
    if (valor === undefined) {
      throw new Error('Resposta inválida no Suplemento de Impacto: "' + resposta + '". Use N, P, M ou MM.');
    }
    return valor;
  }

  function classificarFator(fatorKey, soma, cortes) {
    if (fatorKey === 'ComportamentoProSocial') {
      // Escala invertida: quanto maior, melhor.
      if (soma >= cortes.normal_min) return 'Normal';
      if (soma === cortes.limitrofe) return 'Limítrofe';
      return 'Anormal';
    }
    if (fatorKey === 'Total') {
      if (soma >= cortes.anormal_min) return 'Anormal';
      if (soma >= cortes.limitrofe_min) return 'Limítrofe';
      return 'Normal';
    }
    if (soma >= cortes.anormal_min) return 'Anormal';
    if (soma === cortes.limitrofe) return 'Limítrofe';
    return 'Normal';
  }

  /**
   * Corrige o SDQ (25 itens principais, escala F/M/V).
   * @param {Object} respostas - mapa { numeroDoItem: 'F'|'M'|'V' }, itens 1 a 25,
   *        SEM inversão manual — envie exatamente como o respondente marcou.
   * @param {Object} [opcoes]
   * @param {string} opcoes.respondente - 'Professor' | 'Cuidador' | 'Auto' (define os cortes usados).
   * @returns {Object} resultado com os 5 fatores + Total (escore, classificação Normal/Limítrofe/Anormal).
   */
  function corrigir(respostas, opcoes) {
    opcoes = opcoes || {};
    respostas = respostas || {};
    var respondente = opcoes.respondente;
    if (RESPONDENTES_VALIDOS.indexOf(respondente) === -1) {
      throw new Error('opcoes.respondente inválido: "' + respondente + '". Use um de: ' + RESPONDENTES_VALIDOS.join(', '));
    }
    var cortes = DADOS.cutoffs_por_respondente[respondente];

    var resultado = { instrumento: 'SDQ', respondente: respondente, fatores: {}, itensRespondidos: 0, itensEsperados: 25 };
    var somaTotal = 0;
    var respondidosTotal = 0;

    Object.keys(DADOS.composicao_itens).forEach(function (fatorKey) {
      var itens = DADOS.composicao_itens[fatorKey];
      var soma = 0, respondidos = 0;
      itens.forEach(function (numeroItem) {
        var valor = valorItemPrincipal(numeroItem, respostas[numeroItem]);
        if (valor === null) return;
        soma += valor;
        respondidos++;
      });
      resultado.itensRespondidos += respondidos;
      if (fatorKey !== 'ComportamentoProSocial') {
        somaTotal += soma;
        respondidosTotal += respondidos;
      }

      if (respondidos === 0) {
        resultado.fatores[fatorKey] = null;
        return;
      }
      resultado.fatores[fatorKey] = {
        nome: DADOS.fatores[fatorKey],
        escoreBruto: soma,
        itensRespondidos: respondidos,
        itensEsperados: itens.length,
        completo: respondidos === itens.length,
        classificacao: classificarFator(fatorKey, soma, cortes[fatorKey]),
      };
    });

    if (respondidosTotal > 0) {
      resultado.total = {
        nome: DADOS.fatores.Total,
        escoreBruto: somaTotal,
        itensRespondidos: respondidosTotal,
        itensEsperados: 20, // 25 itens - 5 do Pró-Social (não somado ao Total)
        completo: respondidosTotal === 20,
        classificacao: classificarFator('Total', somaTotal, cortes.Total),
      };
    } else {
      resultado.total = null;
    }

    resultado.completo = resultado.itensRespondidos === resultado.itensEsperados;
    return resultado;
  }

  /**
   * Corrige o Suplemento de Impacto (3 itens para Professor; 5 para Cuidador/Auto).
   * @param {Object} respostas - mapa { numeroDoItem(1-5): 'N'|'P'|'M'|'MM' }.
   * @param {Object} opcoes
   * @param {string} opcoes.respondente - 'Professor' | 'Cuidador' | 'Auto'
   * @returns {Object} { escoreBruto, itensRespondidos, itensEsperados, completo, classificacao }
   */
  function corrigirImpacto(respostas, opcoes) {
    opcoes = opcoes || {};
    respostas = respostas || {};
    var respondente = opcoes.respondente;
    if (RESPONDENTES_VALIDOS.indexOf(respondente) === -1) {
      throw new Error('opcoes.respondente inválido: "' + respondente + '". Use um de: ' + RESPONDENTES_VALIDOS.join(', '));
    }
    var itens = DADOS.impacto_itens_por_respondente[respondente];
    var soma = 0, respondidos = 0;
    itens.forEach(function (numeroItem) {
      var valor = valorItemImpacto(respostas[numeroItem]);
      if (valor === null) return;
      soma += valor;
      respondidos++;
    });
    if (respondidos === 0) return null;

    var limites = DADOS.impacto_classificacao;
    var classificacao = soma >= limites.anormal_min ? 'Anormal' : (soma === limites.limitrofe ? 'Limítrofe' : 'Normal');

    return {
      nome: 'Suplemento de Impacto',
      escoreBruto: soma,
      itensRespondidos: respondidos,
      itensEsperados: itens.length,
      completo: respondidos === itens.length,
      classificacao: classificacao,
    };
  }

  return {
    dados: DADOS,
    fatores: DADOS.fatores,
    respondentes: RESPONDENTES_VALIDOS,
    itensInvertidos: DADOS.itens_invertidos,
    impactoItensTexto: DADOS.impacto_itens_texto,
    impactoItensPorRespondente: DADOS.impacto_itens_por_respondente,
    corrigir: corrigir,
    corrigirImpacto: corrigirImpacto,
  };
});
