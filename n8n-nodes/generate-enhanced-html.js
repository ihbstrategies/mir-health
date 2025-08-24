// Generate Enhanced HTML - Gerar relatório HTML com design moderno e setores
const inputData = $input.first();

console.log(`🎨 Gerando relatório HTML aprimorado`);

try {
  const data = inputData.json;
  
  // Verificar se temos dados necessários
  if (!data.sectors || !data.resumo_executivo) {
    throw new Error('Dados de setores ou resumo executivo não encontrados');
  }

  // Função para formatar data
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return new Date().toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  };

  // Função para extrair domínio da URL
  const extractDomain = (url) => {
    try {
      const domain = new URL(url).hostname.replace('www.', '');
      return domain;
    } catch (error) {
      return 'Fonte';
    }
  };

  // Gerar HTML
  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MIR Health - Market Insight Report on Health</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            min-height: 100vh;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            background: linear-gradient(135deg, #1a4d4d 0%, #2d7a7a 100%);
            color: white;
            border-radius: 15px;
            padding: 40px;
            margin-bottom: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        
        .header-content {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 30px;
            margin-bottom: 20px;
        }
        
        .logo {
            width: 100px;
            height: 100px;
            background: rgba(255,255,255,0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3em;
        }
        
        .header-text h1 {
            font-size: 3em;
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .header-text .subtitle {
            font-size: 1.3em;
            opacity: 0.9;
        }
        
        .header .date {
            text-align: center;
            font-size: 1.2em;
            opacity: 0.9;
        }
        
        .executive-summary {
            background: white;
            border-radius: 15px;
            padding: 30px;
            margin-bottom: 30px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
            border-left: 5px solid #1a4d4d;
        }
        
        .executive-summary h2 {
            color: #1a4d4d;
            font-size: 2em;
            margin-bottom: 20px;
        }
        
        .sentiment-indicator {
            display: inline-block;
            padding: 10px 20px;
            background: #28a745;
            color: white;
            border-radius: 25px;
            font-weight: bold;
            margin-bottom: 20px;
        }
        
        .trends-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }
        
        .trend-item {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 10px;
            border-left: 4px solid #1a4d4d;
        }
        
        .sectors-container {
            display: grid;
            gap: 30px;
        }
        
        .sector-section {
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
        }
        
        .sector-section:hover {
            transform: translateY(-5px);
        }
        
        .sector-header {
            display: flex;
            align-items: center;
            gap: 20px;
            margin-bottom: 25px;
            padding-bottom: 20px;
            border-bottom: 2px solid #f0f0f0;
        }
        
        .sector-icon {
            font-size: 3em;
            width: 80px;
            text-align: center;
        }
        
        .sector-info h2 {
            color: #1a4d4d;
            font-size: 1.8em;
            margin-bottom: 5px;
        }
        
        .sector-description {
            color: #666;
            font-size: 1.1em;
        }
        
        .sector-count {
            margin-left: auto;
            background: #1a4d4d;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: bold;
        }
        
        .news-grid {
            display: grid;
            gap: 20px;
        }
        
        .news-item {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 20px;
            border-left: 4px solid #1a4d4d;
            transition: all 0.3s ease;
        }
        
        .news-item:hover {
            background: #e9ecef;
            transform: translateX(5px);
        }
        
        .news-header {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 15px;
        }
        
        .news-number {
            background: #1a4d4d;
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 0.9em;
        }
        
        .news-title {
            color: #1a4d4d;
            font-size: 1.1em;
            font-weight: 600;
            flex: 1;
        }
        
        .news-link {
            display: inline-block;
            color: #2d7a7a;
            text-decoration: none;
            font-weight: 500;
            margin-bottom: 10px;
            transition: color 0.3s ease;
        }
        
        .news-link:hover {
            color: #1a4d4d;
            text-decoration: underline;
        }
        
        .news-meta {
            display: flex;
            justify-content: space-between;
            font-size: 0.9em;
            color: #666;
        }
        
        .footer {
            text-align: center;
            padding: 40px;
            background: white;
            border-radius: 15px;
            margin-top: 30px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        }
        
        .footer h3 {
            color: #1a4d4d;
            margin-bottom: 15px;
        }
        
        .footer .copyright {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #888;
        }
        
        @media (max-width: 768px) {
            .header-content { flex-direction: column; text-align: center; }
            .header-text h1 { font-size: 2em; }
            .sector-header { flex-direction: column; text-align: center; }
            .sector-count { margin-left: 0; }
            .news-header { flex-direction: column; align-items: flex-start; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="header-content">
                <div class="logo">🏥</div>
                <div class="header-text">
                    <h1>MIR HEALTH</h1>
                    <div class="subtitle">Market Insight Report on Health</div>
                </div>
            </div>
            <div class="date">${formatDate(data.data || new Date())}</div>
        </div>
        
        <div class="executive-summary">
            <h2>📊 Resumo Executivo</h2>
            <div class="sentiment-indicator">
                Sentimento: ${data.resumo_executivo.sentimento_geral || 'Neutro'}
            </div>
            <p>Análise abrangente do mercado de saúde com foco em tendências globais, inovação tecnológica e desenvolvimentos setoriais.</p>
            
            ${data.resumo_executivo.principais_tendencias ? `
            <div class="trends-grid">
                ${data.resumo_executivo.principais_tendencias.map(trend => `
                    <div class="trend-item">
                        <strong>📈</strong> ${trend}
                    </div>
                `).join('')}
            </div>
            ` : ''}
        </div>
        
        <div class="sectors-container">
            ${Object.entries(data.sectors).map(([sectorKey, sector]) => `
                <div class="sector-section" id="sector-${sectorKey}">
                    <div class="sector-header">
                        <div class="sector-icon">${sector.icon || '📊'}</div>
                        <div class="sector-info">
                            <h2>${sector.name || 'Setor'}</h2>
                            <p class="sector-description">${sector.description || 'Principais desenvolvimentos do setor'}</p>
                        </div>
                        <div class="sector-count">${sector.count || 0} notícias</div>
                    </div>
                    <div class="news-grid">
                        ${sector.news ? sector.news.map((news, index) => `
                            <div class="news-item">
                                <div class="news-header">
                                    <span class="news-number">${index + 1}</span>
                                    <h4 class="news-title">${news.titulo || 'Título não disponível'}</h4>
                                </div>
                                <p>${news.resumo || 'Resumo não disponível'}</p>
                                <a href="${news.link || '#'}" target="_blank" class="news-link">🔗 Ler notícia completa</a>
                                <div class="news-meta">
                                    <span class="news-source">${extractDomain(news.link || '')}</span>
                                    <span class="news-time">${formatDate(new Date())}</span>
                                </div>
                            </div>
                        `).join('') : '<p>Nenhuma notícia disponível para este setor.</p>'}
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="footer">
            <h3>MIR Health - Market Insight Report on Health</h3>
            <p>Relatório gerado automaticamente pelo sistema de análise de mercado</p>
            <p>Dados baseados em análise de IA e fontes confiáveis do setor de saúde</p>
            <div class="copyright">
                © 2025 MIR Health®. Todos os direitos reservados.
            </div>
        </div>
    </div>
</body>
</html>`;

  return {
    html: html,
    data: data
  };

} catch (error) {
  console.error('❌ Erro ao gerar HTML:', error.message);
  return {
    error: error.message,
    html: '<p>Erro ao gerar relatório HTML</p>',
    data: inputData.json
  };
}
