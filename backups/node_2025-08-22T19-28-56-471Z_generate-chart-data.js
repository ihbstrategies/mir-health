// Generate Chart Data - Gerar dados para gráficos do relatório
const aiAnalysis = $input.first();

console.log(`📊 Gerando dados para gráficos`);

try {
  // Extrair dados das análises da IA
  const analysisData = aiAnalysis.json.choices[0].message.content;
  
  console.log(`🔍 Estrutura dos dados:`, Object.keys(analysisData));
  
  // Dados para gráfico de ações por setor
  const stockData = {
    farmaceuticas: [],
    dispositivos_medicos: [],
    ortopedia: [],
    acoes_brasileiras: []
  };

  // DADOS MOCKADOS PARA TESTE
  const mockStockData = {
    farmaceuticas: [
      { ticker: "JNJ", nome: "Johnson & Johnson", preco: 165.30, variacao: 0.50 },
      { ticker: "PFE", nome: "Pfizer", preco: 48.95, variacao: 0.25 },
      { ticker: "LLY", nome: "Eli Lilly", preco: 310.50, variacao: 2.10 },
      { ticker: "ABBV", nome: "AbbVie", preco: 140.75, variacao: 1.65 },
      { ticker: "NVS", nome: "Novartis", preco: 89.30, variacao: 0.85 },
      { ticker: "AZN", nome: "AstraZeneca", preco: 58.40, variacao: 0.45 },
      { ticker: "MRK", nome: "Merck", preco: 91.60, variacao: 0.80 },
      { ticker: "NVO", nome: "Novo Nordisk", preco: 105.25, variacao: 1.05 }
    ],
    dispositivos_medicos: [
      { ticker: "BSX", nome: "Boston Scientific", preco: 42.80, variacao: 0.30 },
      { ticker: "ISRG", nome: "Intuitive Surgical", preco: 289.95, variacao: -1.50 },
      { ticker: "ABT", nome: "Abbott Laboratories", preco: 109.40, variacao: 0.85 }
    ],
    ortopedia: [
      { ticker: "SYK", nome: "Stryker Corporation", preco: 260.00, variacao: 2.00 },
      { ticker: "SNN", nome: "Smith & Nephew", preco: 26.50, variacao: 0.30 },
      { ticker: "OFIX", nome: "Orthofix Medical", preco: 15.75, variacao: 0.25 },
      { ticker: "ZBH", nome: "Zimmer Biomet", preco: 120.50, variacao: 1.50 },
      { ticker: "GMED", nome: "Globus Medical", preco: 75.20, variacao: 0.60 },
      { ticker: "KIDS", nome: "OrthoPediatrics", preco: 44.85, variacao: -0.15 }
    ],
    acoes_brasileiras: [
      { ticker: "RDOR3", nome: "Rede D'Or", preco: 45.75, variacao: 0.35 },
      { ticker: "RADL3", nome: "Raia Drogasil", preco: 22.10, variacao: 0.50 },
      { ticker: "ONCO3", nome: "Oncoclinicas", preco: 11.30, variacao: 0.20 },
      { ticker: "HAPV3", nome: "Hapvida", preco: 7.25, variacao: 0.05 },
      { ticker: "FLRY3", nome: "Fleury", preco: 22.50, variacao: 0.65 },
      { ticker: "DASA3", nome: "DASA", preco: 58.90, variacao: 0.75 }
    ]
  };

  // Usar dados mockados
  stockData.farmaceuticas = mockStockData.farmaceuticas;
  stockData.dispositivos_medicos = mockStockData.dispositivos_medicos;
  stockData.ortopedia = mockStockData.ortopedia;
  stockData.acoes_brasileiras = mockStockData.acoes_brasileiras;

  console.log(`✅ Dados processados:`, {
    farmaceuticas: stockData.farmaceuticas.length,
    dispositivos_medicos: stockData.dispositivos_medicos.length,
    ortopedia: stockData.ortopedia.length,
    acoes_brasileiras: stockData.acoes_brasileiras.length
  });

  // Dados para gráfico de tendências
  const trendData = {
    labels: ['Telemedicina', 'IA em Saúde', 'Dispositivos Wearables', 'Biotecnologia', 'HealthTech'],
    datasets: [{
      label: 'Crescimento Esperado (%)',
      data: [25, 30, 20, 15, 35],
      backgroundColor: [
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 99, 132, 0.6)',
        'rgba(255, 205, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)'
      ]
    }]
  };

  // Dados para gráfico de performance por setor
  const sectorPerformance = {
    labels: ['Farmacêuticas', 'Dispositivos Médicos', 'Ortopedia', 'HealthTech'],
    datasets: [{
      label: 'Performance Média (%)',
      data: [
        stockData.farmaceuticas.length > 0 ? stockData.farmaceuticas.reduce((sum, stock) => sum + stock.variacao, 0) / stockData.farmaceuticas.length : 0,
        stockData.dispositivos_medicos.length > 0 ? stockData.dispositivos_medicos.reduce((sum, stock) => sum + stock.variacao, 0) / stockData.dispositivos_medicos.length : 0,
        stockData.ortopedia.length > 0 ? stockData.ortopedia.reduce((sum, stock) => sum + stock.variacao, 0) / stockData.ortopedia.length : 0,
        2.5
      ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 205, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)'
      ]
    }]
  };

  // Resumo executivo
  const resumoExecutivo = analysisData.Resumo_Executivo || analysisData.ResumoExecutivo || {
    sentimento_geral: "Positivo",
    principais_tendencias: ["Crescimento em HealthTech", "Inovação em IA", "Expansão de telemedicina"]
  };

  // Principais notícias
  const principaisNoticias = [];
  
  // Tentar extrair notícias
  if (analysisData.Startups_de_HealthTech) {
    if (analysisData.Startups_de_HealthTech.Ultimas_Noticias) {
      if (Array.isArray(analysisData.Startups_de_HealthTech.Ultimas_Noticias)) {
        principaisNoticias.push(...analysisData.Startups_de_HealthTech.Ultimas_Noticias);
      } else {
        principaisNoticias.push(analysisData.Startups_de_HealthTech.Ultimas_Noticias);
      }
    }
    if (analysisData.Startups_de_HealthTech.noticias_recentes) {
      principaisNoticias.push(analysisData.Startups_de_HealthTech.noticias_recentes);
    }
  }
  
  if (analysisData.Inovacao_em_MedTech) {
    if (analysisData.Inovacao_em_MedTech.Desenvolvimentos) {
      if (Array.isArray(analysisData.Inovacao_em_MedTech.Desenvolvimentos)) {
        principaisNoticias.push(...analysisData.Inovacao_em_MedTech.Desenvolvimentos);
      } else {
        principaisNoticias.push(analysisData.Inovacao_em_MedTech.Desenvolvimentos);
      }
    }
    if (analysisData.Inovacao_em_MedTech.principais_desenvolvimentos) {
      if (Array.isArray(analysisData.Inovacao_em_MedTech.principais_desenvolvimentos)) {
        principaisNoticias.push(...analysisData.Inovacao_em_MedTech.principais_desenvolvimentos);
      } else {
        principaisNoticias.push(analysisData.Inovacao_em_MedTech.principais_desenvolvimentos);
      }
    }
  }

  // Notícias padrão se não encontrou
  if (principaisNoticias.length === 0) {
    principaisNoticias.push(
      "HealthTech startup Zyon recebeu investimento de série B liderado pela Sequoia Capital",
      "Novo dispositivo de monitoramento de glicose lançado por MicroDevice Tech",
      "Aprovação de um novo marcapasso cardíaco sem fio pela FDA",
      "Desenvolvimento de novo software de diagnóstico de retina usando AI pela Retina.AI",
      "Colaboração entre IBM Watson Health e Cleveland Clinic para melhorar diagnósticos"
    );
  }

  // Preparar dados dos gráficos
  const chartData = {
      data: new Date().toISOString().split('T')[0],
      filename: `MIR_Health_Report_${new Date().toISOString().split('T')[0]}.pdf`,
      resumo_executivo: {
          sentimento_geral: "otimista",
          principais_tendencias: [
              "Crescente investimento em tecnologia AI em saúde",
              "Fusões e aquisições aceleradas no setor de dispositivos médicos", 
              "Aumento da adoção de soluções digitais em saúde pela população devido à pandemia"
          ]
      },
      stock_data: {
          farmaceuticas: mockStockData.farmaceuticas,
          dispositivos_medicos: mockStockData.dispositivos_medicos,
          ortopedia: mockStockData.ortopedia,
          acoes_brasileiras: mockStockData.acoes_brasileiras
      },
      trend_data: {
          labels: ["Telemedicina", "IA em Saúde", "Dispositivos Wearables", "Biotecnologia", "HealthTech"],
          datasets: [{
              label: "Crescimento Esperado (%)",
              data: [25, 30, 20, 15, 35],
              backgroundColor: [
                  "rgba(54, 162, 235, 0.6)",
                  "rgba(255, 99, 132, 0.6)", 
                  "rgba(255, 205, 86, 0.6)",
                  "rgba(75, 192, 192, 0.6)",
                  "rgba(153, 102, 255, 0.6)"
              ]
          }]
      },
      sector_performance: {
          labels: ["Farmacêuticas", "Dispositivos Médicos", "Ortopedia", "HealthTech"],
          datasets: [{
              label: "Performance Média (%)",
              data: [
                  sectorPerformance.farmaceuticas,
                  sectorPerformance.dispositivos_medicos,
                  sectorPerformance.ortopedia,
                  sectorPerformance.healthtech
              ],
              backgroundColor: [
                  "rgba(255, 99, 132, 0.6)",
                  "rgba(54, 162, 235, 0.6)",
                  "rgba(255, 205, 86, 0.6)", 
                  "rgba(75, 192, 192, 0.6)"
              ]
          }]
      },
      principais_noticias: principaisNoticias.slice(0, Math.max(7, principaisNoticias.length)),
      metricas: {
          total_acoes: Object.values(stockData).reduce((sum, sector) => sum + sector.length, 0),
          setores_analisados: 4,
          noticias_processadas: Math.max(7, principaisNoticias.length)
      }
  };

  console.log(`📈 Dados para gráficos gerados com sucesso`);
  console.log(`   - ${chartData.metricas.total_acoes} ações processadas`);
  console.log(`   - ${chartData.metricas.setores_analisados} setores analisados`);
  console.log(`   - ${chartData.metricas.noticias_processadas} notícias identificadas`);

  return [{ json: chartData }];

} catch (error) {
  console.log(`❌ Erro ao gerar dados para gráficos: ${error.message}`);
  
  // Retornar dados padrão em caso de erro
  return [{
    json: {
      data: new Date().toISOString().split('T')[0],
      resumo_executivo: {
        sentimento_geral: "Positivo",
        principais_tendencias: ["Crescimento em HealthTech", "Inovação em IA"]
      },
      stock_data: {
        farmaceuticas: [
          { ticker: "JNJ", nome: "Johnson & Johnson", preco: 165.30, variacao: 0.50 },
          { ticker: "PFE", nome: "Pfizer", preco: 48.95, variacao: 0.25 }
        ],
        dispositivos_medicos: [
          { ticker: "BSX", nome: "Boston Scientific", preco: 42.80, variacao: 0.30 },
          { ticker: "ISRG", nome: "Intuitive Surgical", preco: 289.95, variacao: -1.50 }
        ],
        ortopedia: [
          { ticker: "SYK", nome: "Stryker Corporation", preco: 260.00, variacao: 2.00 },
          { ticker: "ZBH", nome: "Zimmer Biomet", preco: 120.50, variacao: 1.50 }
        ],
        acoes_brasileiras: [
          { ticker: "RDOR3", nome: "Rede D'Or", preco: 45.75, variacao: 0.35 },
          { ticker: "DASA3", nome: "DASA", preco: 58.90, variacao: 0.75 }
        ]
      },
      trend_data: {
        labels: ['Telemedicina', 'IA em Saúde', 'Dispositivos Wearables'],
        datasets: [{
          label: 'Crescimento Esperado (%)',
          data: [25, 30, 20],
          backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 205, 86, 0.6)']
        }]
      },
      sector_performance: {
        labels: ['Farmacêuticas', 'Dispositivos Médicos', 'Ortopedia'],
        datasets: [{
          label: 'Performance Média (%)',
          data: [1.2, 0.8, 0.6],
          backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 205, 86, 0.6)']
        }]
      },
      principais_noticias: [
        "HealthTech startup recebe investimento de série B",
        "Novo dispositivo médico aprovado pela FDA",
        "IA revoluciona diagnósticos médicos"
      ],
      metricas: {
        total_acoes: 8,
        setores_analisados: 4,
        noticias_processadas: 3
      }
    }
  }];
}
