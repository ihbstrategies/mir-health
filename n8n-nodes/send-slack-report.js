// Send Slack Report - Enviar relatório HTML e PDF para Slack
const inputData = $input.all();

console.log(`📤 Enviando relatório para Slack`);

try {
  // Encontrar dados do HTML, PDF e setores
  const htmlData = inputData.find(item => item.json.html);
  const pdfData = inputData.find(item => item.json.pdfUrl || item.json.pdfContent);
  const sectorData = inputData.find(item => item.json.sectors);
  const publicUrlData = inputData.find(item => item.json.publicUrl);
  
  if (!sectorData) {
    throw new Error('Dados dos setores não encontrados');
  }

  const sectors = sectorData.json.sectors;
  const resumoExecutivo = sectorData.json.resumo_executivo;
  const publicUrl = publicUrlData?.json.publicUrl || 'https://hefestomedtech.github.io/market_news_daily/public/index.html';
  
  // Calcular estatísticas
  const totalNoticias = Object.values(sectors).reduce((total, sector) => total + (sector.news?.length || 0), 0);
  const totalSetores = Object.keys(sectors).length;
  
  // Criar resumo por setor
  const resumoSetores = Object.entries(sectors).map(([key, sector]) => 
    `${sector.icon} **${sector.name}**: ${sector.count} notícias`
  ).join('\n');

  // Construir mensagem do Slack
  const slackMessage = {
    text: `📊 *IHB Strategies - Relatório Diário de Mercado*`,
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "🏥 IHB Strategies - Market Insight Report",
          emoji: true
        }
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*📅 Data:*\n${new Date().toLocaleDateString('pt-BR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}`
          },
          {
            type: "mrkdwn",
            text: `*📊 Sentimento:*\n${resumoExecutivo?.sentimento_geral || 'Neutro'}`
          }
        ]
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*📰 Total de Notícias:*\n${totalNoticias}`
          },
          {
            type: "mrkdwn",
            text: `*🏢 Setores Analisados:*\n${totalSetores}`
          }
        ]
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*📈 Principais Tendências:*\n${resumoExecutivo?.principais_tendencias?.slice(0, 3).map(trend => `• ${trend}`).join('\n') || 'Não disponível'}`
        }
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*🏢 Resumo por Setor:*\n${resumoSetores}`
        }
      },
      {
        type: "divider"
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*📋 Acesse o Relatório Completo:*"
        }
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "🌐 Ver Relatório Online",
              emoji: true
            },
            style: "primary",
            url: publicUrl
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "📄 Baixar PDF",
              emoji: true
            },
            url: pdfData?.json.pdfUrl || "#"
          }
        ]
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: "📊 Relatório gerado automaticamente pelo sistema IHB Strategies"
          }
        ]
      }
    ]
  };

  return {
    slackMessage: slackMessage,
    publicUrl: publicUrl,
    totalNoticias: totalNoticias,
    totalSetores: totalSetores,
    sentimento: resumoExecutivo?.sentimento_geral || 'Neutro',
    data: sectorData.json
  };

} catch (error) {
  console.error('❌ Erro ao preparar mensagem do Slack:', error.message);
  return {
    error: error.message,
    slackMessage: {
      text: "❌ Erro ao gerar relatório",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Erro:* ${error.message}`
          }
        }
      ]
    },
    data: inputData[0]?.json || {}
  };
}
