// Consolidate AI Analysis - Consolidar análises individuais em relatório único
const aiAnalyses = $input.all();

console.log(`📊 Consolidando ${aiAnalyses.length} análises da IA`);

// Extrair conteúdo das análises
const analyses = aiAnalyses.map(item => {
  try {
    return item.json.choices[0].message.content;
  } catch (error) {
    console.log(`⚠️ Erro ao processar análise: ${error.message}`);
    return null;
  }
}).filter(analysis => analysis !== null);

console.log(`✅ ${analyses.length} análises válidas processadas`);

// Consolidar resumos executivos
const resumos = analyses.map(analysis => analysis.resumo_executivo);
const resumoConsolidado = resumos.join(' ');

// Consolidar análises de mercado
const analisesMercado = {
  ortopedia: [],
  dispositivos_medicos: [],
  big_pharma: [],
  healthtech: []
};

analyses.forEach(analysis => {
  if (analysis.analise_mercado) {
    Object.keys(analysis.analise_mercado).forEach(setor => {
      if (analisesMercado[setor]) {
        analisesMercado[setor].push(analysis.analise_mercado[setor]);
      }
    });
  }
});

// Consolidar principais notícias
const todasNoticias = [];
analyses.forEach(analysis => {
  if (analysis.principais_noticias) {
    todasNoticias.push(...analysis.principais_noticias);
  }
});

// Consolidar recomendações
const todasRecomendacoes = [];
analyses.forEach(analysis => {
  if (analysis.recomendacoes) {
    todasRecomendacoes.push(...analysis.recomendacoes);
  }
});

// Consolidar tendências
const todasTendencias = [];
analyses.forEach(analysis => {
  if (analysis.tendencias) {
    todasTendencias.push(...analysis.tendencias);
  }
});

// Criar relatório consolidado
const relatorioConsolidado = {
  data: new Date().toISOString().split('T')[0],
  resumo_executivo: resumoConsolidado.substring(0, 500) + '...',
  analise_mercado: {
    ortopedia: analisesMercado.ortopedia.slice(0, 3).join(' '),
    dispositivos_medicos: analisesMercado.dispositivos_medicos.slice(0, 3).join(' '),
    big_pharma: analisesMercado.big_pharma.slice(0, 3).join(' '),
    healthtech: analisesMercado.healthtech.slice(0, 3).join(' ')
  },
  principais_noticias: todasNoticias.slice(0, 5),
  recomendacoes: [...new Set(todasRecomendacoes)].slice(0, 5),
  tendencias: [...new Set(todasTendencias)].slice(0, 5),
  metricas: {
    analises_processadas: analyses.length,
    noticias_identificadas: todasNoticias.length,
    recomendacoes_geradas: todasRecomendacoes.length,
    tendencias_identificadas: todasTendencias.length
  }
};

console.log(`📈 Relatório consolidado criado com sucesso`);
console.log(`   - ${relatorioConsolidado.metricas.analises_processadas} análises processadas`);
console.log(`   - ${relatorioConsolidado.metricas.noticias_identificadas} notícias identificadas`);
console.log(`   - ${relatorioConsolidado.metricas.recomendacoes_geradas} recomendações geradas`);

return [{ json: relatorioConsolidado }];
