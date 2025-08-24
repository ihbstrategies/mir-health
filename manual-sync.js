#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class ManualSync {
  constructor() {
    this.workflowFile = 'HealthCare News.json';
    this.nodesDir = 'n8n-nodes';
    this.backupDir = 'backups';
    this.changesFile = 'sync-changes.txt';
    
    // Criar diretório de backup se não existir
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir);
    }
  }

  // Gerar hash do arquivo para detectar mudanças
  generateFileHash(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    return crypto.createHash('md5').update(content).digest('hex');
  }

  // Criar backup do arquivo
  createBackup(filePath, type) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = path.basename(filePath);
    const backupPath = path.join(this.backupDir, `${type}_${timestamp}_${fileName}`);
    
    fs.copyFileSync(filePath, backupPath);
    return backupPath;
  }

  // Detectar mudanças nos arquivos
  detectChanges() {
    const changes = {
      workflow: false,
      nodes: []
    };

    // Verificar workflow
    if (fs.existsSync(this.workflowFile)) {
      const currentHash = this.generateFileHash(this.workflowFile);
      const hashFile = path.join(this.backupDir, 'workflow_hash.txt');
      
      if (fs.existsSync(hashFile)) {
        const previousHash = fs.readFileSync(hashFile, 'utf8').trim();
        changes.workflow = currentHash !== previousHash;
      } else {
        changes.workflow = true; // Primeira execução
      }
      
      // Salvar hash atual
      fs.writeFileSync(hashFile, currentHash);
    }

    // Verificar nós customizados
    if (fs.existsSync(this.nodesDir)) {
      const nodeFiles = fs.readdirSync(this.nodesDir).filter(file => file.endsWith('.js'));
      
      nodeFiles.forEach(file => {
        const filePath = path.join(this.nodesDir, file);
        const currentHash = this.generateFileHash(filePath);
        const hashFile = path.join(this.backupDir, `${file}_hash.txt`);
        
        if (fs.existsSync(hashFile)) {
          const previousHash = fs.readFileSync(hashFile, 'utf8').trim();
          if (currentHash !== previousHash) {
            changes.nodes.push(file);
          }
        } else {
          changes.nodes.push(file); // Primeira execução
        }
        
        // Salvar hash atual
        fs.writeFileSync(hashFile, currentHash);
      });
    }

    return changes;
  }

  // Gerar instruções de sincronização manual
  generateManualSyncInstructions(changes) {
    const timestamp = new Date().toISOString();
    let instructions = `# 🔄 Instruções de Sincronização Manual - ${timestamp}\n\n`;

    if (changes.workflow) {
      instructions += this.generateWorkflowInstructions();
    }

    if (changes.nodes.length > 0) {
      instructions += this.generateNodesInstructions(changes.nodes);
    }

    if (!changes.workflow && changes.nodes.length === 0) {
      instructions += '✅ Nenhuma mudança detectada!\n';
    }

    return instructions;
  }

  // Gerar instruções para o workflow
  generateWorkflowInstructions() {
    let instructions = '## 📋 Workflow Principal\n\n';
    
    instructions += '### 1. Exportar Workflow Atual do n8n Cloud\n';
    instructions += '1. Acesse: https://app.n8n.cloud\n';
    instructions += '2. Abra o workflow "HealthCare News"\n';
    instructions += '3. Clique em "Export" (ícone de download)\n';
    instructions += '4. Salve o arquivo como backup\n\n';
    
    instructions += '### 2. Importar Workflow Atualizado\n';
    instructions += '1. No n8n Cloud, clique em "Import"\n';
    instructions += '2. Selecione o arquivo: `HealthCare News.json`\n';
    instructions += '3. Confirme a importação\n';
    instructions += '4. Ative o workflow se necessário\n\n';
    
    instructions += '### 3. Verificar Configurações\n';
    instructions += '- ✅ Credenciais dos nós\n';
    instructions += '- ✅ Configurações de email/Slack\n';
    instructions += '- ✅ Schedule do trigger\n\n';
    
    return instructions;
  }

  // Gerar instruções para os nós customizados
  generateNodesInstructions(changedNodes) {
    let instructions = '## 🔧 Nós Customizados\n\n';
    
    instructions += '### Nós que precisam ser atualizados:\n';
    changedNodes.forEach(node => {
      instructions += `- ${node}\n`;
    });
    instructions += '\n';
    
    instructions += '### Instruções para cada nó:\n\n';
    
    changedNodes.forEach(node => {
      const nodeCode = fs.readFileSync(path.join(this.nodesDir, node), 'utf8');
      const nodeName = path.basename(node, '.js');
      
      instructions += `#### ${nodeName}\n`;
      instructions += '1. No n8n Cloud, abra o workflow "HealthCare News"\n';
      instructions += '2. Encontre o nó correspondente\n';
      instructions += '3. Clique no nó e vá em "Code"\n';
      instructions += '4. Substitua todo o código pelo seguinte:\n\n';
      instructions += '```javascript\n';
      instructions += nodeCode;
      instructions += '\n```\n\n';
      instructions += '5. Clique em "Save"\n\n';
    });
    
    return instructions;
  }

  // Criar backup e gerar instruções
  async sync() {
    console.log('🔍 Detectando mudanças...\n');
    
    const changes = this.detectChanges();
    
    if (changes.workflow) {
      console.log('📋 Workflow principal modificado');
      this.createBackup(this.workflowFile, 'workflow');
    }
    
    if (changes.nodes.length > 0) {
      console.log(`🔧 ${changes.nodes.length} nós customizados modificados:`);
      changes.nodes.forEach(node => {
        console.log(`   - ${node}`);
        this.createBackup(path.join(this.nodesDir, node), 'node');
      });
    }
    
    if (!changes.workflow && changes.nodes.length === 0) {
      console.log('✅ Nenhuma mudança detectada!');
      return;
    }
    
    console.log('\n📝 Gerando instruções de sincronização...\n');
    
    const instructions = this.generateManualSyncInstructions(changes);
    
    // Salvar instruções em arquivo
    fs.writeFileSync(this.changesFile, instructions);
    
    // Mostrar instruções no console
    console.log(instructions);
    
    console.log('💡 Instruções salvas em: sync-changes.txt');
    console.log('📁 Backups salvos em: backups/');
  }

  // Mostrar histórico de mudanças
  showHistory() {
    console.log('📊 Histórico de Mudanças\n');
    
    if (!fs.existsSync(this.backupDir)) {
      console.log('Nenhum backup encontrado.');
      return;
    }
    
    const backups = fs.readdirSync(this.backupDir)
      .filter(file => file.endsWith('.json') || file.endsWith('.js'))
      .sort()
      .reverse();
    
    if (backups.length === 0) {
      console.log('Nenhum backup encontrado.');
      return;
    }
    
    backups.forEach(backup => {
      const stats = fs.statSync(path.join(this.backupDir, backup));
      console.log(`${backup} - ${stats.mtime.toLocaleString()}`);
    });
  }

  // Restaurar arquivo de backup
  restoreBackup(backupFile) {
    const backupPath = path.join(this.backupDir, backupFile);
    
    if (!fs.existsSync(backupPath)) {
      console.log('❌ Backup não encontrado!');
      return;
    }
    
    if (backupFile.startsWith('workflow_')) {
      fs.copyFileSync(backupPath, this.workflowFile);
      console.log(`✅ Workflow restaurado de: ${backupFile}`);
    } else if (backupFile.startsWith('node_')) {
      const nodeName = backupFile.split('_').slice(2).join('_');
      fs.copyFileSync(backupPath, path.join(this.nodesDir, nodeName));
      console.log(`✅ Nó restaurado: ${nodeName}`);
    }
  }
}

// Função principal
async function main() {
  const sync = new ManualSync();
  
  const command = process.argv[2];
  
  switch (command) {
    case 'sync':
      await sync.sync();
      break;
    case 'history':
      sync.showHistory();
      break;
    case 'restore':
      const backupFile = process.argv[3];
      if (!backupFile) {
        console.log('❌ Especifique o arquivo de backup: node manual-sync.js restore <arquivo>');
        return;
      }
      sync.restoreBackup(backupFile);
      break;
    default:
      console.log('🔧 Manual Sync - Sincronização Manual para n8n Cloud\n');
      console.log('Comandos disponíveis:');
      console.log('  sync     - Detectar mudanças e gerar instruções');
      console.log('  history  - Mostrar histórico de backups');
      console.log('  restore  - Restaurar arquivo de backup');
      console.log('\nExemplo: node manual-sync.js sync');
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = ManualSync;
