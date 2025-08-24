#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

console.log('🚀 Iniciando modo de desenvolvimento com sincronização automática...\n');

// Verificar se o arquivo .env existe
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('❌ Arquivo .env não encontrado!');
  console.log('💡 Execute primeiro: node setup-n8n-api.js');
  process.exit(1);
}

// Função para executar comando
function runCommand(command, args = []) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: true
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Comando falhou com código ${code}`));
      }
    });

    child.on('error', (error) => {
      reject(error);
    });
  });
}

// Função principal
async function startDevMode() {
  try {
    // Testar conexão primeiro
    console.log('🔗 Testando conexão com n8n Cloud...');
    await runCommand('npm', ['run', 'sync:test']);
    
    console.log('\n✅ Conexão estabelecida!');
    console.log('🔄 Iniciando modo watch...\n');
    
    // Iniciar modo watch
    await runCommand('npm', ['run', 'watch']);
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
    console.log('\n💡 Verifique:');
    console.log('1. Se o arquivo .env está configurado corretamente');
    console.log('2. Se a API key do n8n Cloud está válida');
    console.log('3. Se você tem acesso à internet');
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  startDevMode();
}

module.exports = { startDevMode };
