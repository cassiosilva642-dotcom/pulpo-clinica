(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.SCARED = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // ---------------------------------------------------------------------
  // DADOS: extraídos de PULPO_NEURO_MODELO_V1 (abas SCARED / SCARED-Normas).
  // Gerado automaticamente — não editar manualmente.
  // ---------------------------------------------------------------------
  var DADOS = {"instrumento": "SCARED - Screen for Child Anxiety Related Emotional Disorders (autorrelato)", "referencia": "Isolan, L., Salum, G. A., Osowski, A. T., Amaro, E., & Manfro, G. G. (2011). Psychometric properties of the Screen for Child Anxiety Related Emotional Disorders (SCARED) in Brazilian children and adolescents. Journal of Anxiety Disorders, 25(6), 741-748.", "faixa_etaria": "9 a 18 anos (autorrelato). Abaixo de 9 anos, a planilha original prevê aplicação apenas com cuidadores (fora do escopo deste motor, que cobre a versão de autorrelato).", "observacao_escala_resposta": "Escala 0 a 2 por item. Os rótulos textuais das opções (ex.: \"não é verdade / às vezes verdade / muito verdadeira\") não constam na planilha original — confira a versão oficial do instrumento antes de exibir no app.", "fatores": {"PanicoSintomasSomaticos": "Pânico / Sintomas Somáticos", "AnsiedadeGeneralizada": "Ansiedade Generalizada", "AnsiedadeSeparacao": "Ansiedade de Separação", "FobiaSocial": "Fobia Social", "EvitacaoEscolar": "Evitação Escolar", "Total": "Total"}, "composicao_itens": {"PanicoSintomasSomaticos": [1, 6, 9, 12, 15, 18, 19, 22, 24, 27, 30, 34, 38], "AnsiedadeGeneralizada": [5, 7, 14, 21, 23, 28, 33, 35, 37], "AnsiedadeSeparacao": [4, 8, 13, 16, 20, 25, 29, 31], "FobiaSocial": [3, 10, 26, 32, 39, 40, 41], "EvitacaoEscolar": [2, 11, 17, 36]}, "estatisticas": {"Crianca_Masculino": {"PanicoSintomasSomaticos": {"media": 4.16, "desv_pad": 3.8}, "AnsiedadeGeneralizada": {"media": 7.24, "desv_pad": 3.57}, "AnsiedadeSeparacao": {"media": 4.98, "desv_pad": 2.65}, "FobiaSocial": {"media": 4.98, "desv_pad": 2.83}, "EvitacaoEscolar": {"media": 1.24, "desv_pad": 1.19}, "Total": {"media": 22.6, "desv_pad": 10.45}}, "Crianca_Feminino": {"PanicoSintomasSomaticos": {"media": 5.36, "desv_pad": 4.69}, "AnsiedadeGeneralizada": {"media": 8.03, "desv_pad": 3.7}, "AnsiedadeSeparacao": {"media": 6.03, "desv_pad": 3.22}, "FobiaSocial": {"media": 5.74, "desv_pad": 2.92}, "EvitacaoEscolar": {"media": 1.39, "desv_pad": 1.3}, "Total": {"media": 26.55, "desv_pad": 12.21}}, "Adolescente_Masculino": {"PanicoSintomasSomaticos": {"media": 3.29, "desv_pad": 3.4}, "AnsiedadeGeneralizada": {"media": 7.51, "desv_pad": 3.73}, "AnsiedadeSeparacao": {"media": 3.55, "desv_pad": 2.36}, "FobiaSocial": {"media": 4.43, "desv_pad": 2.95}, "EvitacaoEscolar": {"media": 0.94, "desv_pad": 1.14}, "Total": {"media": 19.73, "desv_pad": 10.41}}, "Adolescente_Feminino": {"PanicoSintomasSomaticos": {"media": 5.34, "desv_pad": 4.58}, "AnsiedadeGeneralizada": {"media": 8.87, "desv_pad": 3.78}, "AnsiedadeSeparacao": {"media": 4.78, "desv_pad": 2.86}, "FobiaSocial": {"media": 5.46, "desv_pad": 3.2}, "EvitacaoEscolar": {"media": 1.24, "desv_pad": 1.21}, "Total": {"media": 25.69, "desv_pad": 12.17}}}, "tabelas_normativas": ["Crianca_Masculino", "Crianca_Feminino", "Adolescente_Masculino", "Adolescente_Feminino"], "cutoffs_clinicos": {"PanicoSintomasSomaticos": {"nota_de_corte": 7, "max": 26}, "AnsiedadeGeneralizada": {"nota_de_corte": 9, "max": 18}, "AnsiedadeSeparacao": {"nota_de_corte": 5, "max": 16}, "FobiaSocial": {"nota_de_corte": 8, "max": 14}, "EvitacaoEscolar": {"nota_de_corte": 3, "max": 8}, "Total": {"nota_de_corte": 25, "max": 82}}, "classificacao_zscore_guilmette": [{"z_min": 2.0, "classificacao": "Muito Superior"}, {"z_min": 1.333, "classificacao": "Superior"}, {"z_min": 0.667, "classificacao": "Média Superior"}, {"z_min": -0.666, "classificacao": "Média"}, {"z_min": -1.333, "classificacao": "Média Inferior"}, {"z_min": -2.0, "classificacao": "Limítrofe"}, {"z_min": null, "classificacao": "Deficitário (z < -2)"}], "formula_zscore": "z = (escore_bruto - media) / desv_pad ; ponto_ponderado = z*3 + 10 ; percentil = NORM.S.DIST(z)*100", "selecao_automatica_tabela": {"regra": "Sexo + idade em anos completos. <9 anos: apenas cuidadores (não coberto aqui). >18: \"Reveja idade\".", "faixas": [{"sexo": "Masculino", "idade_min": 12, "idade_max": 18, "tabela": "Adolescente_Masculino"}, {"sexo": "Feminino", "idade_min": 12, "idade_max": 18, "tabela": "Adolescente_Feminino"}, {"sexo": "Masculino", "idade_min": 9, "idade_max": 11, "tabela": "Crianca_Masculino"}, {"sexo": "Feminino", "idade_min": 9, "idade_max": 11, "tabela": "Crianca_Feminino"}]}};

  function arredondar2(v) {
    return Math.round((v + Number.EPSILON) * 100) / 100;
  }

  // Aproximação de Abramowitz & Stegun para a CDF normal padrão
  // (equivalente ao NORM.S.DIST(z, TRUE) do Excel usado na planilha original).
  function normSDist(z) {
    var t = 1 / (1 + 0.2316419 * Math.abs(z));
    var d = 0.3989423 * Math.exp(-z * z / 2);
    var prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return z > 0 ? 1 - prob : prob;
  }

  function classificarGuilmette(z) {
    if (z >= 2) return 'Muito Superior';
    if (z >= 1.333) return 'Superior';
    if (z >= 0.667) return 'Média Superior';
    if (z >= -0.666) return 'Média';
    if (z >= -1.333) return 'Média Inferior';
    if (z >= -2) return 'Limítrofe';
    return 'Deficitário';
  }

  var TABELAS_VALIDAS = DADOS.tabelas_normativas;

  /**
   * Seleciona a tabela normativa pela regra da planilha original:
   * sexo (Masculino/Feminino) + idade em anos completos, faixa 9-18.
   */
  function selecionarTabela(sexo, idadeAnos) {
    if (idadeAnos != null && idadeAnos > 18) return null; // "Reveja idade" na planilha original
    if (idadeAnos != null && idadeAnos < 9) return null;  // só cuidadores, fora do escopo deste motor
    var faixas = DADOS.selecao_automatica_tabela.faixas;
    for (var i = 0; i < faixas.length; i++) {
      var f = faixas[i];
      if (f.sexo === sexo && idadeAnos >= f.idade_min && idadeAnos <= f.idade_max) {
        return f.tabela;
      }
    }
    return null;
  }

  /**
   * Corrige o SCARED (autorrelato, 41 itens, escala 0-2).
   * @param {Object} respostas - mapa { numeroDoItem: valor(0-2) }, itens 1 a 41.
   * @param {Object} [opcoes]
   * @param {string} [opcoes.sexo] - 'Masculino' | 'Feminino'
   * @param {number} [opcoes.idadeAnos] - idade em anos completos (9 a 18)
   * @param {string} [opcoes.tabela] - força uma tabela específica, sobrepõe sexo/idade
   *        (ex.: 'Crianca_Masculino', 'Adolescente_Feminino', etc.)
   * @returns {Object} resultado com os 5 fatores + Total: escore bruto, Z-Score,
   *          classificação Guilmette e classificação clínica (nota de corte).
   */
  function corrigir(respostas, opcoes) {
    opcoes = opcoes || {};
    respostas = respostas || {};

    var tabela = opcoes.tabela || selecionarTabela(opcoes.sexo, opcoes.idadeAnos);
    if (!tabela) {
      throw new Error(
        'Não foi possível determinar a tabela normativa. Informe opcoes.sexo ' +
        '("Masculino"/"Feminino") e opcoes.idadeAnos (9 a 18), ou force opcoes.tabela. ' +
        'Tabelas disponíveis: ' + TABELAS_VALIDAS.join(', ')
      );
    }
    if (TABELAS_VALIDAS.indexOf(tabela) === -1) {
      throw new Error('Tabela normativa inválida: "' + tabela + '". Use uma de: ' + TABELAS_VALIDAS.join(', '));
    }

    var resultado = { instrumento: 'SCARED', tabela: tabela, fatores: {}, itensRespondidos: 0, itensEsperados: 41 };
    var somaTotal = 0;
    var respondidosTotal = 0;

    Object.keys(DADOS.composicao_itens).forEach(function (fatorKey) {
      var itens = DADOS.composicao_itens[fatorKey];
      var soma = 0, respondidos = 0;
      itens.forEach(function (numeroItem) {
        var valor = respostas[numeroItem];
        if (valor === undefined || valor === null || valor === '') return;
        soma += Number(valor);
        respondidos++;
      });
      resultado.itensRespondidos += respondidos;
      somaTotal += soma;
      respondidosTotal += respondidos;

      if (respondidos === 0) {
        resultado.fatores[fatorKey] = null;
        return;
      }

      var stats = DADOS.estatisticas[tabela][fatorKey];
      var corte = DADOS.cutoffs_clinicos[fatorKey];
      var z = (soma - stats.media) / stats.desv_pad;
      resultado.fatores[fatorKey] = {
        nome: DADOS.fatores[fatorKey],
        escoreBruto: soma,
        itensRespondidos: respondidos,
        itensEsperados: itens.length,
        completo: respondidos === itens.length,
        media: stats.media,
        desvioPadrao: stats.desv_pad,
        zScore: arredondar2(z),
        pontoPonderado: arredondar2(z * 3 + 10),
        percentilZ: arredondar2(normSDist(z) * 100),
        classificacaoGuilmette: classificarGuilmette(z),
        notaDeCorte: corte.nota_de_corte,
        escoreMaximo: corte.max,
        classificacaoClinica: soma >= corte.nota_de_corte ? 'Clínico' : 'Não Clínico',
      };
    });

    // Fator "Total" (soma de todos os 41 itens, com suas próprias norma e nota de corte)
    if (respondidosTotal > 0) {
      var statsTotal = DADOS.estatisticas[tabela].Total;
      var corteTotal = DADOS.cutoffs_clinicos.Total;
      var zTotal = (somaTotal - statsTotal.media) / statsTotal.desv_pad;
      resultado.total = {
        nome: 'Total',
        escoreBruto: somaTotal,
        itensRespondidos: respondidosTotal,
        itensEsperados: 41,
        completo: respondidosTotal === 41,
        media: statsTotal.media,
        desvioPadrao: statsTotal.desv_pad,
        zScore: arredondar2(zTotal),
        pontoPonderado: arredondar2(zTotal * 3 + 10),
        percentilZ: arredondar2(normSDist(zTotal) * 100),
        classificacaoGuilmette: classificarGuilmette(zTotal),
        notaDeCorte: corteTotal.nota_de_corte,
        escoreMaximo: corteTotal.max,
        classificacaoClinica: somaTotal >= corteTotal.nota_de_corte ? 'Clínico' : 'Não Clínico',
      };
    } else {
      resultado.total = null;
    }

    resultado.completo = resultado.itensRespondidos === resultado.itensEsperados;
    return resultado;
  }

  return {
    dados: DADOS,
    fatores: DADOS.fatores,
    tabelasNormativas: TABELAS_VALIDAS,
    selecionarTabela: selecionarTabela,
    corrigir: corrigir,
  };
});
