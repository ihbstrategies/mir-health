// Process Sector News - Organizar notícias por setor específico
const inputData = $input.all();

console.log(`📰 Processando notícias por setor`);

try {
  // Definir setores e suas configurações
  const sectors = {
    global_market: {
      name: "Análise Global do Mercado",
      count: 3,
      icon: "🌍",
      description: "Visão geral do mercado de saúde global"
    },
    global_trends: {
      name: "Tendências Globais em Saúde", 
      count: 3,
      icon: "📈",
      description: "Principais tendências e desenvolvimentos internacionais"
    },
    big_pharma: {
      name: "Big Pharma",
      count: 3,
      icon: "💊",
      description: "Pipeline de drogas e clinical trials importantes"
    },
    orthopedics: {
      name: "Ortopedia e Dispositivos Médicos",
      count: 5,
      icon: "🦴",
      description: "Atualizações de ortopedia e dispositivos médicos"
    },
    ai_health: {
      name: "IA em Saúde",
      count: 3,
      icon: "🤖",
      description: "Avanços da inteligência artificial aplicada à saúde"
    },
    brazil_health: {
      name: "Cenário Brasileiro de Saúde",
      count: 3,
      icon: "🇧🇷",
      description: "Notícias locais e mudanças regulatórias"
    },
    medtech_innovation: {
      name: "Inovação em MedTech",
      count: 3,
      icon: "🔬",
      description: "Principais desenvolvimentos em tecnologia médica"
    },
    healthtech_startups: {
      name: "Startups de HealthTech",
      count: 4,
      icon: "🚀",
      description: "Startups brasileiras e globais de saúde digital"
    }
  };

  // Extrair dados da IA
  const aiAnalysis = inputData.find(item => item.json.choices && item.json.choices[0]);
  const newsData = inputData.find(item => item.json.news && Array.isArray(item.json.news));
  
  if (!aiAnalysis) {
    throw new Error('Análise da IA não encontrada');
  }

  const analysisContent = aiAnalysis.json.choices[0].message.content;
  
  // Função para extrair notícias de um setor específico
  function extractSectorNews(content, sectorKey) {
    const sector = sectors[sectorKey];
    const sectorName = sector.name;
    
    // Buscar seção no conteúdo da IA
    const sectorPattern = new RegExp(`${sectorName}[\\s\\S]*?(?=\\n\\n|$)`, 'i');
    const match = content.match(sectorPattern);
    
    if (!match) {
      return {
        sector: sectorKey,
        name: sector.name,
        icon: sector.icon,
        description: sector.description,
        news: [],
        count: 0
      };
    }

    const sectorContent = match[0];
    
    // Extrair notícias da seção
    const newsPattern = /(?:notícia|news|item)\s*\d+[:\-]?\s*(.+?)(?=\n|$)/gi;
    const newsMatches = [...sectorContent.matchAll(newsPattern)];
    
    const extractedNews = newsMatches.slice(0, sector.count).map((match, index) => {
      const newsText = match[1].trim();
      
      // Tentar extrair link se presente
      const linkMatch = newsText.match(/(https?:\/\/[^\s]+)/);
      const link = linkMatch ? linkMatch[1] : null;
      const title = link ? newsText.replace(link, '').trim() : newsText;
      
      return {
        id: index + 1,
        title: title,
        link: link,
        source: 'Análise de IA',
        timestamp: new Date().toISOString()
      };
    });

    return {
      sector: sectorKey,
      name: sector.name,
      icon: sector.icon,
      description: sector.description,
      news: extractedNews,
      count: extractedNews.length
    };
  }

  // Processar cada setor
  const processedSectors = {};
  
  Object.keys(sectors).forEach(sectorKey => {
    processedSectors[sectorKey] = extractSectorNews(analysisContent, sectorKey);
  });

  // Gerar resumo executivo
  const executiveSummary = {
    sentiment: 'Positivo',
    trends: [],
    key_insights: []
  };

  // Extrair sentimento e tendências do conteúdo
  const sentimentMatch = analysisContent.match(/sentimento[:\s]+([^.]+)/i);
  if (sentimentMatch) {
    executiveSummary.sentiment = sentimentMatch[1].trim();
  }

  // Extrair tendências
  const trendsMatch = analysisContent.match(/tendências?[:\s]+([^.]+)/i);
  if (trendsMatch) {
    executiveSummary.trends = trendsMatch[1].split(',').map(t => t.trim());
  }

  // Calcular métricas
  const totalNews = Object.values(processedSectors).reduce((sum, sector) => sum + sector.count, 0);
  const totalSectors = Object.keys(processedSectors).length;

  const metrics = {
    total_news: totalNews,
    total_sectors: totalSectors,
    sectors_with_news: Object.values(processedSectors).filter(s => s.count > 0).length,
    generated_at: new Date().toISOString()
  };

  console.log(`✅ Processamento concluído: ${totalNews} notícias em ${totalSectors} setores`);

  return [{
    json: {
      executive_summary: executiveSummary,
      sectors: processedSectors,
      metrics: metrics,
      raw_analysis: analysisContent,
      processed_at: new Date().toISOString()
    }
  }];

} catch (error) {
  console.log(`❌ Erro ao processar notícias por setor: ${error.message}`);
  
  return [{
    json: {
      error: error.message,
      executive_summary: { sentiment: 'Neutro', trends: [], key_insights: [] },
      sectors: {},
      metrics: { total_news: 0, total_sectors: 0, sectors_with_news: 0 },
      processed_at: new Date().toISOString()
    }
  }];
}
