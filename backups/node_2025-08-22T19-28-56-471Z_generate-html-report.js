// Generate HTML Report - Gerar relatório HTML com gráficos
const chartData = $input.first();

console.log(`📄 Gerando relatório HTML`);

try {
  const data = chartData.json;
  
  // Função para escapar caracteres especiais
  function escapeHtml(text) {
    if (typeof text !== 'string') return text;
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
  
  // Função para gerar tabela de ações
  function generateStockTable(stocks, sectorName) {
    if (!stocks || stocks.length === 0) return '';
    
    const rows = stocks.map(stock => `
      <tr>
        <td>${escapeHtml(stock.ticker)}</td>
        <td>${escapeHtml(stock.nome)}</td>
        <td>$${parseFloat(stock.preco || 0).toFixed(2)}</td>
        <td class="${parseFloat(stock.variacao || 0) >= 0 ? 'positive' : 'negative'}">
          ${parseFloat(stock.variacao || 0) >= 0 ? '+' : ''}${parseFloat(stock.variacao || 0).toFixed(2)}%
        </td>
      </tr>
    `).join('');
    
    return `
      <div class="sector-table">
        <h3>${escapeHtml(sectorName)}</h3>
        <table>
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Empresa</th>
              <th>Preço</th>
              <th>Variação</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    `;
  }

  // Função para gerar gráfico Chart.js
  function generateChart(chartId, chartData, chartType = 'bar') {
    const safeChartData = JSON.stringify(chartData).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
    return `
      <canvas id="${chartId}" width="400" height="200"></canvas>
      <script>
        document.addEventListener('DOMContentLoaded', function() {
          const ctx${chartId} = document.getElementById('${chartId}');
          if (ctx${chartId}) {
            new Chart(ctx${chartId}, {
              type: '${chartType}',
              data: ${safeChartData},
              options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: '${chartId.replace(/([A-Z])/g, ' $1').trim()}'
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }
            });
          }
        });
      </script>
    `;
  }

  // Gerar seção de notícias
  function generateNewsSection(news) {
    if (!news || news.length === 0) {
      return '<p>Nenhuma notícia disponível no momento.</p>';
    }
    
    // Garantir pelo menos 7 notícias ou todas disponíveis
    const newsToShow = news.slice(0, Math.max(7, news.length));
    
    return newsToShow.map((item, index) => {
      const newsText = typeof item === 'string' ? item : JSON.stringify(item);
      return `
        <div class="news-item">
          <h4>📰 Notícia ${index + 1}</h4>
          <p>${escapeHtml(newsText)}</p>
          <div class="news-meta">
            <span class="news-source">Fonte: Análise de IA</span>
            <span class="news-time">${new Date().toLocaleDateString('pt-BR')}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  // Gerar HTML completo
  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MIR Health - Market Insight Report on Health</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8f9fa;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: white;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }
        
        .header {
            text-align: center;
            padding: 30px 0;
            background: linear-gradient(135deg, #1a4d4d 0%, #2d7a7a 100%);
            color: white;
            border-radius: 10px;
            margin-bottom: 30px;
        }
        
        .header-content {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 20px;
            margin-bottom: 15px;
        }
        
        .logo {
            width: 80px;
            height: 80px;
            flex-shrink: 0;
        }
        
        .header-text {
            text-align: left;
        }
        
        .header h1 {
            font-size: 2.5em;
            margin-bottom: 5px;
            font-weight: bold;
            color: #ffffff;
        }
        
        .header .subtitle {
            font-size: 1.1em;
            opacity: 0.9;
            margin-bottom: 10px;
            font-weight: 300;
            color: #ffffff;
        }
        
        .header .date {
            font-size: 1.2em;
            opacity: 0.9;
            font-weight: 500;
        }
        
        .summary {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 30px;
            border-left: 5px solid #1a4d4d;
        }
        
        .summary h2 {
            color: #1a4d4d;
            margin-bottom: 15px;
        }
        
        .trends {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 15px;
        }
        
        .trend-tag {
            background-color: #1a4d4d;
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.9em;
        }
        
        .charts-section {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-bottom: 30px;
        }
        
        .chart-container {
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            min-height: 300px;
            max-height: 400px;
        }
        
        .chart-container canvas {
            max-height: 300px !important;
            width: 100% !important;
        }
        
        .chart-container h3 {
            color: #1a4d4d;
            margin-bottom: 15px;
            text-align: center;
        }
        
        .stocks-section {
            margin-bottom: 30px;
        }
        
        .stocks-section h2 {
            color: #1a4d4d;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .sector-tables {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        
        .sector-table {
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .sector-table h3 {
            color: #1a4d4d;
            margin-bottom: 15px;
            text-align: center;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }
        
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        
        th {
            background-color: #1a4d4d;
            color: white;
            font-weight: 600;
        }
        
        .positive {
            color: #28a745;
            font-weight: bold;
        }
        
        .negative {
            color: #dc3545;
            font-weight: bold;
        }
        
        .news-section {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 30px;
        }
        
        .news-section h2 {
            color: #1a4d4d;
            margin-bottom: 20px;
        }
        
        .news-item {
            background-color: white;
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 8px;
            border-left: 4px solid #1a4d4d;
        }
        
        .metrics {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .metric-card {
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .metric-number {
            font-size: 2em;
            font-weight: bold;
            color: #1a4d4d;
        }
        
        .metric-label {
            color: #666;
            margin-top: 5px;
        }
        
        .footer {
            text-align: center;
            padding: 20px;
            background-color: #f8f9fa;
            border-radius: 10px;
            color: #666;
        }
        
        .footer .copyright {
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid #ddd;
            font-size: 0.9em;
            color: #888;
        }
        
        .news-meta {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            font-size: 0.85em;
            color: #666;
        }
        
        .news-source {
            font-weight: 500;
            color: #1a4d4d;
        }
        
        .news-time {
            font-style: italic;
        }
        
        @media (max-width: 768px) {
            .charts-section,
            .sector-tables {
                grid-template-columns: 1fr;
            }
            
            .header h1 {
                font-size: 2em;
            }
            
            .header-content {
                flex-direction: column;
                gap: 15px;
            }
            
            .logo {
                width: 60px;
                height: 60px;
            }
            
            .header-text {
                text-align: center;
            }
            
            .header .date {
                font-size: 1em;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="header-content">
                <div class="logo">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="80" height="80" zoomAndPan="magnify" viewBox="0 0 336 153.000002" preserveAspectRatio="xMidYMid meet" version="1.2">
                        <defs>
                            <clipPath id="42ba0e0795">
                                <path d="M 1.089844 18.179688 L 112.859375 18.179688 L 112.859375 129.949219 L 1.089844 129.949219 Z M 1.089844 18.179688 "/>
                            </clipPath>
                            <clipPath id="e391255e19">
                                <path d="M 56.976562 18.179688 C 26.113281 18.179688 1.089844 43.199219 1.089844 74.0625 C 1.089844 104.929688 26.113281 129.949219 56.976562 129.949219 C 87.839844 129.949219 112.859375 104.929688 112.859375 74.0625 C 112.859375 43.199219 87.839844 18.179688 56.976562 18.179688 Z M 56.976562 18.179688 "/>
                            </clipPath>
                            <clipPath id="4e1245ae2a">
                                <path d="M 0.0898438 0.179688 L 111.859375 0.179688 L 111.859375 111.949219 L 0.0898438 111.949219 Z M 0.0898438 0.179688 "/>
                            </clipPath>
                            <clipPath id="059a6456e2">
                                <path d="M 55.976562 0.179688 C 25.113281 0.179688 0.0898438 25.199219 0.0898438 56.0625 C 0.0898438 86.929688 25.113281 111.949219 55.976562 111.949219 C 86.839844 111.949219 111.859375 86.929688 111.859375 56.0625 C 111.859375 25.199219 86.839844 0.179688 55.976562 0.179688 Z M 55.976562 0.179688 "/>
                            </clipPath>
                            <clipPath id="9147518674">
                                <rect x="0" width="112" y="0" height="112"/>
                            </clipPath>
                            <clipPath id="c19f60a6f2">
                                <path d="M 3.648438 21 L 110.203125 21 L 110.203125 128 L 3.648438 128 Z M 3.648438 21 "/>
                            </clipPath>
                            <clipPath id="e50e569429">
                                <path d="M 17 79 L 44 79 L 44 151.007812 L 17 151.007812 Z M 17 79 "/>
                            </clipPath>
                            <clipPath id="3ee946d0fb">
                                <path d="M 51 7.941406 L 95 7.941406 L 95 121 L 51 121 Z M 51 7.941406 "/>
                            </clipPath>
                            <clipPath id="53ff8dd2c6">
                                <rect x="0" width="192" y="0" height="66"/>
                            </clipPath>
                            <clipPath id="2371f5517e">
                                <rect x="0" width="191" y="0" height="34"/>
                            </clipPath>
                        </defs>
                        <g id="731c4ef5ae">
                            <g clip-rule="nonzero" clip-path="url(#42ba0e0795)">
                                <g clip-rule="nonzero" clip-path="url(#e391255e19)">
                                    <g transform="matrix(1,0,0,1,1,18)">
                                        <g clip-path="url(#9147518674)">
                                            <g clip-rule="nonzero" clip-path="url(#4e1245ae2a)">
                                                <g clip-rule="nonzero" clip-path="url(#059a6456e2)">
                                                    <path style=" stroke:none;fill-rule:nonzero;fill:#f3f0e6;fill-opacity:1;" d="M 0.0898438 0.179688 L 111.859375 0.179688 L 111.859375 111.949219 L 0.0898438 111.949219 Z M 0.0898438 0.179688 "/>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                            <g clip-rule="nonzero" clip-path="url(#c19f60a6f2)">
                                <path style=" stroke:none;fill-rule:nonzero;fill:#2f3e38;fill-opacity:1;" d="M 30.269531 28.53125 C 37.804688 24.152344 46.371094 21.695312 55.101562 21.390625 L 55.101562 24.011719 C 46.816406 24.320312 38.726562 26.636719 31.582031 30.792969 C 30.96875 31.15625 30.160156 30.933594 29.796875 30.316406 C 29.433594 29.675781 29.65625 28.894531 30.269531 28.53125 Z M 56.886719 21.363281 L 56.886719 23.984375 L 56.972656 23.984375 C 60.792969 23.984375 64.503906 24.402344 68.074219 25.210938 L 68.074219 22.535156 C 64.503906 21.78125 60.765625 21.363281 56.972656 21.363281 Z M 77.921875 28.503906 C 80.433594 29.648438 82.804688 30.988281 85.09375 32.492188 L 85.09375 29.398438 C 82.804688 27.972656 80.433594 26.71875 77.921875 25.660156 Z M 94.914062 37.292969 L 94.914062 40.363281 C 94.914062 40.585938 94.859375 40.78125 94.773438 40.949219 C 102.753906 49.902344 107.582031 61.675781 107.582031 74.566406 C 107.582031 89.742188 100.855469 103.972656 89.167969 113.625 C 88.609375 114.070312 88.523438 114.910156 89 115.464844 C 89.25 115.773438 89.640625 115.941406 90.003906 115.941406 C 90.3125 115.941406 90.589844 115.828125 90.839844 115.632812 C 103.144531 105.480469 110.203125 90.496094 110.203125 74.539062 C 110.203125 60.085938 104.371094 46.917969 94.914062 37.292969 Z M 21.121094 35.257812 C 10.070312 45.328125 3.738281 59.667969 3.738281 74.59375 C 3.738281 88.070312 8.789062 100.402344 17.074219 109.773438 L 17.074219 105.703125 C 10.351562 97.109375 6.363281 86.3125 6.363281 74.59375 C 6.363281 60.394531 12.386719 46.777344 22.878906 37.179688 C 23.40625 36.707031 23.4375 35.871094 22.960938 35.339844 C 22.460938 34.808594 21.652344 34.78125 21.121094 35.257812 Z M 26.921875 115.300781 L 26.921875 118.507812 C 29.183594 120.070312 31.582031 121.4375 34.09375 122.636719 L 34.09375 119.734375 C 31.554688 118.453125 29.15625 116.972656 26.921875 115.300781 Z M 76.445312 122.777344 C 76.195312 122.105469 75.441406 121.742188 74.769531 122.023438 C 69.078125 124.144531 63.109375 125.230469 56.972656 125.230469 C 52.453125 125.230469 48.070312 124.644531 43.914062 123.53125 L 43.914062 126.234375 C 48.097656 127.296875 52.480469 127.855469 56.972656 127.855469 C 63.414062 127.855469 69.722656 126.710938 75.691406 124.476562 C 76.359375 124.199219 76.695312 123.445312 76.445312 122.777344 Z M 76.445312 122.777344 "/>
                            </g>
                            <g clip-rule="nonzero" clip-path="url(#e50e569429)">
                                <path style=" stroke:none;fill-rule:nonzero;fill:#e5221c;fill-opacity:1;" d="M 26.921875 100.316406 L 26.921875 118.675781 C 26.921875 119.429688 26.308594 120.015625 25.585938 120.015625 L 22.90625 120.015625 L 22.90625 130.921875 C 22.90625 131.175781 22.710938 131.371094 22.460938 131.371094 L 21.566406 131.371094 C 21.316406 131.371094 21.121094 131.175781 21.121094 130.921875 L 21.121094 120.015625 L 18.441406 120.015625 C 17.6875 120.015625 17.101562 119.402344 17.101562 118.675781 L 17.101562 100.316406 C 17.101562 99.5625 17.714844 98.976562 18.441406 98.976562 L 25.613281 98.976562 C 26.308594 98.976562 26.921875 99.59375 26.921875 100.316406 Z M 42.574219 104.363281 L 39.898438 104.363281 L 39.898438 80.621094 C 39.898438 80.203125 39.703125 79.894531 39.449219 79.894531 L 38.558594 79.894531 C 38.304688 79.894531 38.109375 80.230469 38.109375 80.621094 L 38.109375 104.363281 L 35.433594 104.363281 C 34.679688 104.363281 34.09375 104.976562 34.09375 105.703125 L 34.09375 150.007812 C 34.09375 150.757812 34.707031 151.34375 35.433594 151.34375 L 42.601562 151.34375 C 43.355469 151.34375 43.941406 150.730469 43.941406 150.007812 L 43.941406 105.703125 C 43.914062 104.949219 43.300781 104.363281 42.574219 104.363281 Z M 42.574219 104.363281 "/>
                            </g>
                            <g clip-rule="nonzero" clip-path="url(#3ee946d0fb)">
                                <path style=" stroke:none;fill-rule:nonzero;fill:#2fa82f;fill-opacity:1;" d="M 60.933594 38.101562 L 60.933594 118.730469 C 60.933594 119.457031 60.347656 120.042969 59.621094 120.042969 L 52.394531 120.042969 C 51.671875 120.042969 51.085938 119.457031 51.085938 118.730469 L 51.085938 38.101562 C 51.085938 37.375 51.671875 36.789062 52.394531 36.789062 L 55.101562 36.789062 L 55.101562 13.96875 C 55.101562 13.71875 55.296875 13.523438 55.546875 13.523438 L 56.441406 13.523438 C 56.691406 13.523438 56.886719 13.71875 56.886719 13.96875 L 56.886719 36.789062 L 59.59375 36.789062 C 60.320312 36.789062 60.933594 37.375 60.933594 38.101562 Z M 76.585938 7.941406 L 69.414062 7.941406 C 68.660156 7.941406 68.074219 8.554688 68.074219 9.28125 L 68.074219 69.238281 C 68.074219 69.992188 68.6875 70.578125 69.414062 70.578125 L 72.09375 70.578125 L 72.09375 75.179688 C 72.09375 75.429688 72.289062 75.625 72.539062 75.625 L 73.429688 75.625 C 73.683594 75.625 73.878906 75.429688 73.878906 75.179688 L 73.878906 70.578125 L 76.554688 70.578125 C 77.308594 70.578125 77.894531 69.960938 77.894531 69.238281 L 77.894531 9.28125 C 77.921875 8.554688 77.308594 7.941406 76.585938 7.941406 Z M 93.574219 20.691406 L 90.898438 20.691406 L 90.898438 15.222656 C 90.898438 14.972656 90.703125 14.777344 90.449219 14.777344 L 89.53125 14.777344 C 89.277344 14.777344 89.082031 14.972656 89.082031 15.222656 L 89.082031 20.664062 L 86.40625 20.664062 C 85.652344 20.664062 85.066406 21.277344 85.066406 22.003906 L 85.066406 40.363281 C 85.066406 41.113281 85.679688 41.699219 86.40625 41.699219 L 89.082031 41.699219 L 89.082031 43.402344 C 89.082031 43.652344 89.277344 43.847656 89.53125 43.847656 L 90.449219 43.847656 C 90.703125 43.847656 90.898438 43.652344 90.898438 43.402344 L 90.898438 41.699219 L 93.574219 41.699219 C 94.105469 41.699219 94.550781 41.394531 94.773438 40.949219 C 94.859375 40.78125 94.914062 40.558594 94.914062 40.363281 L 94.914062 22.03125 C 94.914062 21.277344 94.328125 20.691406 93.574219 20.691406 Z M 93.574219 20.691406 "/>
                            </g>
                            <g transform="matrix(1,0,0,1,124,24)">
                                <g clip-path="url(#53ff8dd2c6)">
                                    <g style="fill:#f3f0e6;fill-opacity:1;">
                                        <g transform="translate(0.805549, 51.896658)">
                                            <path style="stroke:none" d="M 88.734375 0 L 70.234375 0 L 70.234375 -28.109375 L 53.703125 0 L 39.90625 0 L 23.40625 -28.109375 L 23.40625 0 L 4.921875 0 L 4.921875 -44.09375 L 26.890625 -44.09375 L 46.828125 -12.59375 L 66.734375 -44.09375 L 88.734375 -44.09375 Z M 88.734375 0 "/>
                                        </g>
                                    </g>
                                    <g style="fill:#f3f0e6;fill-opacity:1;">
                                        <g transform="translate(94.449913, 51.896658)">
                                            <path style="stroke:none" d="M 23.40625 0 L 4.921875 0 L 4.921875 -44.09375 L 23.40625 -44.09375 Z M 23.40625 0 "/>
                                        </g>
                                    </g>
                                    <g style="fill:#f3f0e6;fill-opacity:1;">
                                        <g transform="translate(122.776719, 51.896658)">
                                            <path style="stroke:none" d="M 65.109375 0 L 47.625 0 C 46.820312 -1.101562 46.257812 -2.515625 45.9375 -4.234375 C 45.644531 -5.566406 45.210938 -6.875 44.640625 -8.15625 C 44.066406 -9.4375 43.078125 -10.5 41.671875 -11.34375 C 40.273438 -12.195312 38.191406 -12.65625 35.421875 -12.71875 L 23.40625 -12.71875 L 23.40625 0 L 4.921875 0 L 4.921875 -44.09375 L 35 -44.09375 C 42.1875 -44.09375 47.984375 -43.550781 52.390625 -42.46875 C 56.804688 -41.394531 60.03125 -39.707031 62.0625 -37.40625 C 64.09375 -35.101562 65.109375 -32.097656 65.109375 -28.390625 C 65.109375 -25.296875 64.40625 -22.691406 63 -20.578125 C 61.59375 -18.472656 59.375 -16.804688 56.34375 -15.578125 C 59.269531 -14.367188 61.171875 -12.914062 62.046875 -11.21875 C 62.921875 -9.53125 63.457031 -7.675781 63.65625 -5.65625 C 63.863281 -3.851562 64.347656 -1.96875 65.109375 0 Z M 23.40625 -23.59375 L 33.984375 -23.625 C 36.929688 -23.625 39.253906 -23.753906 40.953125 -24.015625 C 42.648438 -24.285156 43.90625 -24.648438 44.71875 -25.109375 C 45.53125 -25.578125 46.046875 -26.09375 46.265625 -26.65625 C 46.492188 -27.21875 46.609375 -27.796875 46.609375 -28.390625 C 46.609375 -28.984375 46.492188 -29.566406 46.265625 -30.140625 C 46.046875 -30.710938 45.53125 -31.226562 44.71875 -31.6875 C 43.90625 -32.144531 42.648438 -32.507812 40.953125 -32.78125 C 39.253906 -33.050781 36.929688 -33.1875 33.984375 -33.1875 L 23.40625 -33.1875 Z M 23.40625 -23.59375 "/>
                                        </g>
                                    </g>
                                </g>
                            </g>
                            <g transform="matrix(1,0,0,1,124,93)">
                                <g clip-path="url(#2371f5517e)">
                                    <g style="fill:#f3f0e6;fill-opacity:1;">
                                        <g transform="translate(1.330246, 26.581787)">
                                            <path style="stroke:none" d="M 32.5625 0 L 23.3125 0 L 23.3125 -8.890625 L 11.703125 -8.890625 L 11.703125 0 L 2.453125 0 L 2.453125 -22.03125 L 11.703125 -22.03125 L 11.703125 -13.125 L 23.3125 -13.125 L 23.3125 -22.03125 L 32.5625 -22.03125 Z M 32.5625 0 "/>
                                        </g>
                                    </g>
                                    <g style="fill:#f3f0e6;fill-opacity:1;">
                                        <g transform="translate(36.346819, 26.581787)">
                                            <path style="stroke:none" d="M 29 0 L 2.453125 0 L 2.453125 -22.03125 L 27.78125 -22.03125 L 27.78125 -16.59375 L 11.703125 -16.59375 L 11.703125 -13.125 L 25.296875 -13.125 L 25.296875 -8.890625 L 11.703125 -8.890625 L 11.703125 -5.453125 L 29 -5.453125 Z M 29 0 "/>
                                        </g>
                                    </g>
                                    <g style="fill:#f3f0e6;fill-opacity:1;">
                                        <g transform="translate(66.57165, 26.581787)">
                                            <path style="stroke:none" d="M 37.015625 0 L 27.640625 0 L 25.578125 -3.609375 L 11.671875 -3.609375 L 9.59375 0 L 0.234375 0 L 14.328125 -22.015625 L 22.921875 -22.015625 Z M 22.453125 -9.0625 L 18.625 -15.734375 L 14.796875 -9.0625 Z M 22.453125 -9.0625 "/>
                                        </g>
                                    </g>
                                    <g style="fill:#f3f0e6;fill-opacity:1;">
                                        <g transform="translate(103.815154, 26.581787)">
                                            <path style="stroke:none" d="M 28.1875 0 L 2.453125 0 L 2.453125 -22.03125 L 11.703125 -22.03125 L 11.703125 -5.453125 L 28.1875 -5.453125 Z M 28.1875 0 "/>
                                        </g>
                                    </g>
                                    <g style="fill:#f3f0e6;fill-opacity:1;">
                                        <g transform="translate(126.467755, 26.581787)">
                                            <path style="stroke:none" d="M 18.796875 0 L 9.546875 0 L 9.546875 -16.59375 L 0.921875 -16.59375 L 0.921875 -22.03125 L 27.421875 -22.03125 L 27.421875 -16.59375 L 18.796875 -16.59375 Z M 18.796875 0 "/>
                                        </g>
                                    </g>
                                    <g style="fill:#f3f0e6;fill-opacity:1;">
                                        <g transform="translate(154.818893, 26.581787)">
                                            <path style="stroke:none" d="M 32.5625 0 L 23.3125 0 L 23.3125 -8.890625 L 11.703125 -8.890625 L 11.703125 0 L 2.453125 0 L 2.453125 -22.03125 L 11.703125 -22.03125 L 11.703125 -13.125 L 23.3125 -13.125 L 23.3125 -22.03125 L 32.5625 -22.03125 Z M 32.5625 0 "/>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                </div>
                <div class="header-text">
                    <h1>MIR</h1>
                    <div class="subtitle">HEALTH</div>
                </div>
            </div>
            <div class="date">Market Insight Report on Health - ${escapeHtml(data.data || new Date().toLocaleDateString('pt-BR'))}</div>
        </div>
        
        <div class="summary">
            <h2>📈 Resumo Executivo</h2>
            <p><strong>Sentimento Geral:</strong> ${escapeHtml(data.resumo_executivo?.sentimento_geral || 'Positivo')}</p>
            <div class="trends">
                ${(data.resumo_executivo?.principais_tendencias || []).map(trend => 
                    `<span class="trend-tag">${escapeHtml(trend)}</span>`
                ).join('')}
            </div>
        </div>
        
        <div class="metrics">
            <div class="metric-card">
                <div class="metric-number">${data.metricas?.total_acoes || 0}</div>
                <div class="metric-label">Ações Analisadas</div>
            </div>
            <div class="metric-card">
                <div class="metric-number">${data.metricas?.setores_analisados || 0}</div>
                <div class="metric-label">Setores Cobertos</div>
            </div>
            <div class="metric-card">
                <div class="metric-number">${data.metricas?.noticias_processadas || 0}</div>
                <div class="metric-label">Notícias Processadas</div>
            </div>
        </div>
        
        <div class="charts-section">
            <div class="chart-container">
                <h3>📊 Tendências de Mercado</h3>
                ${generateChart('trendChart', data.trend_data || {}, 'bar')}
            </div>
            <div class="chart-container">
                <h3>📈 Performance por Setor</h3>
                ${generateChart('sectorChart', data.sector_performance || {}, 'doughnut')}
            </div>
        </div>
        
        <div class="stocks-section">
            <h2>💼 Análise de Ações</h2>
            <div class="sector-tables">
                ${generateStockTable(data.stock_data?.farmaceuticas || [], '🏥 Farmacêuticas')}
                ${generateStockTable(data.stock_data?.dispositivos_medicos || [], '🔬 Dispositivos Médicos')}
                ${generateStockTable(data.stock_data?.ortopedia || [], '🦴 Ortopedia')}
                ${generateStockTable(data.stock_data?.acoes_brasileiras || [], '🇧🇷 Ações Brasileiras')}
            </div>
        </div>
        
        <div class="news-section">
            <h2>📰 Principais Notícias</h2>
            ${generateNewsSection(data.principais_noticias || [])}
        </div>
        
        <div class="footer">
            <p><strong>MIR Health</strong> - Market Insight Report on Health</p>
            <p>Relatório gerado automaticamente pelo sistema de análise de mercado</p>
            <p>Dados baseados em análise de IA e fontes confiáveis do setor de saúde</p>
            <div class="copyright">
                © 2025 MIR Health®. Todos os direitos reservados.
            </div>
        </div>
    </div>
</body>
</html>`;

  console.log(`✅ Relatório HTML gerado com sucesso`);
  
  return [{ json: { html: html, data: data } }];

} catch (error) {
  console.log(`❌ Erro ao gerar relatório HTML: ${error.message}`);
  
  return [{
    json: {
      html: `<!DOCTYPE html>
<html>
<head>
    <title>Erro - Relatório de Mercado</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .error { color: red; background: #ffe6e6; padding: 20px; border-radius: 5px; }
    </style>
</head>
<body>
    <h1>Relatório Diário - Mercado de Saúde</h1>
    <div class="error">
        <h2>Erro ao gerar relatório</h2>
        <p>Ocorreu um erro durante a geração do relatório: ${error.message}</p>
        <p>Data: ${new Date().toISOString().split('T')[0]}</p>
    </div>
</body>
</html>`,
      data: { error: error.message }
    }
  }];
}
