#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

class NodeCopier {
  constructor() {
    this.nodesDir = 'n8n-nodes';
  }

  // Detectar sistema operacional
  getCopyCommand() {
    const platform = process.platform;
    
    switch (platform) {
      case 'darwin': // macOS
        return 'pbcopy';
      case 'win32': // Windows
        return 'clip';
      case 'linux': // Linux
        return 'xclip -selection clipboard';
      default:
        return null;
    }
  }

  // Copiar texto para área de transferência
  copyToClipboard(text) {
    const copyCommand = this.getCopyCommand();
    
    if (!copyCommand) {
      console.log('❌ Sistema operacional não suportado para cópia automática');
      console.log('📋 Copie manualmente o código abaixo:\n');
      console.log('─'.repeat(50));
      console.log(text);
      console.log('─'.repeat(50));
      return;
    }

    const child = exec(`echo '${text.replace(/'/g, "'\"'\"'")}' | ${copyCommand}`, (error) => {
      if (error) {
        console.log('❌ Erro ao copiar para área de transferência');
        console.log('📋 Copie manualmente o código abaixo:\n');
        console.log('─'.repeat(50));
        console.log(text);
        console.log('─'.repeat(50));
      } else {
        console.log('✅ Código copiado para área de transferência!');
        console.log('📋 Cole no n8n Cloud');
      }
    });
  }

  // Listar nós disponíveis
  listNodes() {
    if (!fs.existsSync(this.nodesDir)) {
      console.log('❌ Pasta n8n-nodes não encontrada!');
      return [];
    }

    const nodeFiles = fs.readdirSync(this.nodesDir)
      .filter(file => file.endsWith('.js'))
      .map(file => path.basename(file, '.js'));

    return nodeFiles;
  }

  // Copiar código de um nó específico
  copyNode(nodeName) {
    const nodeFile = path.join(this.nodesDir, `${nodeName}.js`);
    
    if (!fs.existsSync(nodeFile)) {
      console.log(`❌ Nó "${nodeName}" não encontrado!`);
      console.log('\n📋 Nós disponíveis:');
      this.listNodes().forEach(node => console.log(`   - ${node}`));
      return;
    }

    const nodeCode = fs.readFileSync(nodeFile, 'utf8');
    
    console.log(`🔧 Copiando código do nó: ${nodeName}\n`);
    console.log('📋 Instruções:');
    console.log('1. No n8n Cloud, abra o workflow "HealthCare News"');
    console.log('2. Encontre o nó correspondente');
    console.log('3. Clique no nó e vá em "Code"');
    console.log('4. Substitua todo o código pelo código copiado');
    console.log('5. Clique em "Save"\n');
    
    this.copyToClipboard(nodeCode);
  }

  // Copiar todos os nós
  copyAllNodes() {
    const nodes = this.listNodes();
    
    if (nodes.length === 0) {
      console.log('❌ Nenhum nó customizado encontrado!');
      return;
    }

    console.log('🔧 Copiando todos os nós customizados...\n');
    
    nodes.forEach((node, index) => {
      const nodeFile = path.join(this.nodesDir, `${node}.js`);
      const nodeCode = fs.readFileSync(nodeFile, 'utf8');
      
      console.log(`${index + 1}. ${node}`);
      console.log('─'.repeat(30));
      console.log(nodeCode);
      console.log('─'.repeat(30));
      console.log('');
    });

    console.log('📋 Instruções para cada nó:');
    console.log('1. No n8n Cloud, abra o workflow "HealthCare News"');
    console.log('2. Para cada nó listado acima:');
    console.log('   - Encontre o nó correspondente');
    console.log('   - Clique no nó e vá em "Code"');
    console.log('   - Substitua todo o código pelo código mostrado');
    console.log('   - Clique em "Save"');
  }

  // Mostrar diferenças entre versões
  showDiff(nodeName) {
    const nodeFile = path.join(this.nodesDir, `${nodeName}.js`);
    const backupDir = 'backups';
    
    if (!fs.existsSync(nodeFile)) {
      console.log(`❌ Nó "${nodeName}" não encontrado!`);
      return;
    }

    const currentCode = fs.readFileSync(nodeFile, 'utf8');
    
    // Encontrar backup mais recente
    if (!fs.existsSync(backupDir)) {
      console.log('❌ Nenhum backup encontrado para comparação');
      return;
    }

    const backups = fs.readdirSync(backupDir)
      .filter(file => file.startsWith('node_') && file.includes(`${nodeName}.js`))
      .sort()
      .reverse();

    if (backups.length === 0) {
      console.log('❌ Nenhum backup encontrado para este nó');
      return;
    }

    const latestBackup = path.join(backupDir, backups[0]);
    const backupCode = fs.readFileSync(latestBackup, 'utf8');

    console.log(`📊 Diferenças para o nó: ${nodeName}\n`);
    console.log('🆕 Código atual:');
    console.log('─'.repeat(30));
    console.log(currentCode);
    console.log('─'.repeat(30));
    console.log('\n📁 Código anterior:');
    console.log('─'.repeat(30));
    console.log(backupCode);
    console.log('─'.repeat(30));
  }
}

// Função principal
async function main() {
  const copier = new NodeCopier();
  
  const command = process.argv[2];
  const nodeName = process.argv[3];
  
  switch (command) {
    case 'list':
      console.log('📋 Nós customizados disponíveis:\n');
      const nodes = copier.listNodes();
      nodes.forEach(node => console.log(`- ${node}`));
      break;
      
    case 'copy':
      if (!nodeName) {
        console.log('❌ Especifique o nó: node copy-nodes.js copy <nome_do_no>');
        console.log('\n📋 Nós disponíveis:');
        copier.listNodes().forEach(node => console.log(`   - ${node}`));
        return;
      }
      copier.copyNode(nodeName);
      break;
      
    case 'copy-all':
      copier.copyAllNodes();
      break;
      
    case 'diff':
      if (!nodeName) {
        console.log('❌ Especifique o nó: node copy-nodes.js diff <nome_do_no>');
        return;
      }
      copier.showDiff(nodeName);
      break;
      
    default:
      console.log('🔧 Copy Nodes - Copiar Nós Customizados\n');
      console.log('Comandos disponíveis:');
      console.log('  list      - Listar nós disponíveis');
      console.log('  copy      - Copiar código de um nó específico');
      console.log('  copy-all  - Mostrar código de todos os nós');
      console.log('  diff      - Mostrar diferenças com backup');
      console.log('\nExemplos:');
      console.log('  node copy-nodes.js list');
      console.log('  node copy-nodes.js copy extract-news-permissive');
      console.log('  node copy-nodes.js copy-all');
      console.log('  node copy-nodes.js diff generate-html-report');
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = NodeCopier;
