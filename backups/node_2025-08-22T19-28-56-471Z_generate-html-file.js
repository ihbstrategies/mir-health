// Generate HTML File - Gerar arquivo HTML pronto para acesso
const inputData = $input.first();

console.log(`📄 Gerando arquivo HTML para acesso direto`);

try {
  const data = inputData.json;
  const htmlContent = data.html;
  
  if (!htmlContent) {
    throw new Error('Conteúdo HTML não encontrado');
  }
  
  // Gerar nome do arquivo com data
  const today = new Date();
  const dateString = today.toISOString().split('T')[0];
  const timeString = today.toTimeString().split(' ')[0].replace(/:/g, '-');
  
  const fileName = `MIR_Health_Report_${dateString}_${timeString}.html`;
  const filePath = `/tmp/${fileName}`; // n8n Cloud usa /tmp
  
  // Criar HTML completo com metadados
  const completeHTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MIR Health - Market Insight Report on Health</title>
    <meta name="description" content="Relatório diário de mercado de saúde - MIR Health">
    <meta name="author" content="MIR Health">
    <meta name="generated" content="${new Date().toISOString()}">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏥</text></svg>">
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
        
        .file-info {
            background-color: #e9ecef;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 20px;
            font-size: 0.9em;
            color: #666;
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
        <div class="file-info">
            <strong>📄 Arquivo:</strong> ${fileName} | 
            <strong>📅 Gerado em:</strong> ${today.toLocaleString('pt-BR')} | 
            <strong>🏥 MIR Health</strong> - Market Insight Report on Health
        </div>
        
        ${htmlContent}
    </div>
    
    <script>
        // Adicionar funcionalidade de impressão
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 'p') {
                e.preventDefault();
                window.print();
            }
        });
        
        // Adicionar botão de impressão
        const printButton = document.createElement('button');
        printButton.innerHTML = '🖨️ Imprimir Relatório';
        printButton.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #1a4d4d;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            z-index: 1000;
        `;
        printButton.onclick = () => window.print();
        document.body.appendChild(printButton);
        
        // Adicionar botão de download
        const downloadButton = document.createElement('button');
        downloadButton.innerHTML = '💾 Baixar HTML';
        downloadButton.style.cssText = `
            position: fixed;
            top: 60px;
            right: 20px;
            background: #2d7a7a;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            z-index: 1000;
        `;
        downloadButton.onclick = () => {
            const blob = new Blob([document.documentElement.outerHTML], {type: 'text/html'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = '${fileName}';
            a.click();
            URL.revokeObjectURL(url);
        };
        document.body.appendChild(downloadButton);
    </script>
</body>
</html>`;

  console.log(`✅ Arquivo HTML gerado: ${fileName}`);
  
  return [{
    json: {
      fileName: fileName,
      filePath: filePath,
      htmlContent: completeHTML,
      generatedAt: today.toISOString(),
      accessUrl: `file://${filePath}`,
      message: `Arquivo HTML gerado com sucesso: ${fileName}`,
      instructions: {
        localAccess: `Abra o arquivo: ${filePath}`,
        browserAccess: `Copie o conteúdo HTML e cole em um arquivo .html`,
        features: [
          'Relatório completo com gráficos interativos',
          'Botão de impressão (Ctrl+P)',
          'Botão de download do HTML',
          'Design responsivo',
          'Cores da marca MIR Health'
        ]
      }
    }
  }];

} catch (error) {
  console.log(`❌ Erro ao gerar arquivo HTML: ${error.message}`);
  
  return [{
    json: {
      error: error.message,
      fileName: 'error.html',
      message: 'Erro ao gerar arquivo HTML',
      timestamp: new Date().toISOString()
    }
  }];
}
