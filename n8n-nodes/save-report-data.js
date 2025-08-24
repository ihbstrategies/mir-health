// Save Report Data - Salvar dados do relatório como JSON para acesso público
const inputData = $input.first();

console.log(`💾 Salvando dados do relatório para acesso público`);

try {
  const data = inputData.json;
  
  // Verificar se temos dados necessários
  if (!data.sectors || !data.resumo_executivo) {
    throw new Error('Dados de setores ou resumo executivo não encontrados');
  }

  // Formatar data atual
  const currentDate = new Date().toISOString().split('T')[0];
  const timestamp = new Date().toISOString();
  
  // Criar nome do arquivo com timestamp
  const fileName = `report-${currentDate}.json`;
  
  // Preparar dados para salvar
  const reportData = {
    ...data,
    generated_at: timestamp,
    version: "1.0"
  };

  // URL base do GitHub Pages da IHB Strategies
  const baseUrl = "https://ihbstrategies.github.io/market-insights";
  const publicUrl = `${baseUrl}/public/index.html`;
  
  // URL do arquivo JSON
  const jsonUrl = `${baseUrl}/public/${fileName}`;

  return {
    fileName: fileName,
    reportData: reportData,
    publicUrl: publicUrl,
    jsonUrl: jsonUrl,
    message: `Relatório salvo como ${fileName}`,
    data: data
  };

} catch (error) {
  console.error('❌ Erro ao salvar dados do relatório:', error.message);
  return {
    error: error.message,
    fileName: null,
    publicUrl: null,
    data: inputData.json
  };
}
