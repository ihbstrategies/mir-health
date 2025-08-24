#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function setupN8N() {
  console.log('🚀 Configuração da API do n8n Cloud\n');
  
  console.log('📋 Para obter sua API Key do n8n Cloud:');
  console.log('1. Acesse: https://app.n8n.cloud');
  console.log('2. Faça login na sua conta');
  console.log('3. Vá em Settings → API Keys');
  console.log('4. Clique em "Create API Key"');
  console.log('5. Copie a chave gerada\n');
  
  const apiKey = await question('🔑 Cole sua API Key aqui: ');
  
  if (!apiKey || apiKey.trim() === '') {
    console.log('❌ API Key é obrigatória!');
    rl.close();
    return;
  }
  
  console.log('\n📋 Para obter o ID do workflow:');
  console.log('1. Abra seu workflow "HealthCare News" no n8n Cloud');
  console.log('2. Copie o ID da URL (ex: https://app.n8n.cloud/workflow/123456)');
  console.log('3. O ID é o número no final da URL\n');
  
  const workflowId = await question('🆔 Cole o ID do workflow (opcional, pode deixar vazio): ');
  
  // Criar arquivo .env
  const envContent = `# Configurações do n8n Cloud
N8N_CLOUD_URL=https://app.n8n.cloud
N8N_API_KEY=${apiKey.trim()}
${workflowId.trim() ? `N8N_WORKFLOW_ID=${workflowId.trim()}` : '# N8N_WORKFLOW_ID=id_do_workflow_aqui'}

# Configurações opcionais
# N8N_INSTANCE_URL=https://sua-instancia-n8n.com (se usar n8n self-hosted)
`;
  
  const envPath = path.join(__dirname, '.env');
  
  try {
    fs.writeFileSync(envPath, envContent);
    console.log('\n✅ Arquivo .env criado com sucesso!');
    
    console.log('\n🔧 Próximos passos:');
    console.log('1. Instale as dependências: npm install');
    console.log('2. Teste a conexão: npm run sync:test');
    console.log('3. Sincronize tudo: npm run sync:full');
    console.log('4. Para sincronização automática: npm run watch');
    
  } catch (error) {
    console.error('❌ Erro ao criar arquivo .env:', error.message);
  }
  
  rl.close();
}

setupN8N().catch(console.error);
