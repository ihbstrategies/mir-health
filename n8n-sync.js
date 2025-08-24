#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente
dotenv.config();

class N8NSync {
  constructor() {
    this.baseURL = process.env.N8N_CLOUD_URL || 'https://app.n8n.cloud';
    this.apiKey = process.env.N8N_API_KEY;
    this.workflowId = process.env.N8N_WORKFLOW_ID;
    
    if (!this.apiKey) {
      throw new Error('N8N_API_KEY não configurada no arquivo .env');
    }
    
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async testConnection() {
    try {
      console.log('🔗 Testando conexão com n8n Cloud...');
      const response = await this.client.get('/api/v1/me');
      console.log('✅ Conexão estabelecida com sucesso!');
      console.log(`👤 Usuário: ${response.data.data.email}`);
      return true;
    } catch (error) {
      console.error('❌ Erro ao conectar com n8n Cloud:', error.response?.data || error.message);
      return false;
    }
  }

  async getWorkflows() {
    try {
      console.log('📋 Buscando workflows...');
      const response = await this.client.get('/api/v1/workflows');
      return response.data.data;
    } catch (error) {
      console.error('❌ Erro ao buscar workflows:', error.response?.data || error.message);
      return [];
    }
  }

  async updateWorkflow(workflowId, workflowData) {
    try {
      console.log(`🔄 Atualizando workflow ${workflowId}...`);
      const response = await this.client.put(`/api/v1/workflows/${workflowId}`, workflowData);
      console.log('✅ Workflow atualizado com sucesso!');
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao atualizar workflow:', error.response?.data || error.message);
      throw error;
    }
  }

  async createWorkflow(workflowData) {
    try {
      console.log('🆕 Criando novo workflow...');
      const response = await this.client.post('/api/v1/workflows', workflowData);
      console.log('✅ Workflow criado com sucesso!');
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao criar workflow:', error.response?.data || error.message);
      throw error;
    }
  }

  async updateCustomNode(nodeName, nodeCode) {
    try {
      console.log(`🔧 Atualizando nó customizado: ${nodeName}`);
      
      // Buscar o nó existente
      const nodesResponse = await this.client.get('/api/v1/custom-nodes');
      const existingNode = nodesResponse.data.data.find(node => node.name === nodeName);
      
      if (existingNode) {
        // Atualizar nó existente
        const response = await this.client.put(`/api/v1/custom-nodes/${existingNode.id}`, {
          name: nodeName,
          code: nodeCode
        });
        console.log(`✅ Nó ${nodeName} atualizado com sucesso!`);
        return response.data;
      } else {
        // Criar novo nó
        const response = await this.client.post('/api/v1/custom-nodes', {
          name: nodeName,
          code: nodeCode
        });
        console.log(`✅ Nó ${nodeName} criado com sucesso!`);
        return response.data;
      }
    } catch (error) {
      console.error(`❌ Erro ao atualizar nó ${nodeName}:`, error.response?.data || error.message);
      throw error;
    }
  }

  async syncWorkflow() {
    try {
      console.log('📁 Lendo arquivo do workflow...');
      const workflowPath = path.join(__dirname, 'HealthCare News.json');
      
      if (!fs.existsSync(workflowPath)) {
        throw new Error('Arquivo HealthCare News.json não encontrado!');
      }
      
      const workflowData = JSON.parse(fs.readFileSync(workflowPath, 'utf8'));
      
      // Se temos um workflowId específico, atualizar
      if (this.workflowId) {
        await this.updateWorkflow(this.workflowId, workflowData);
      } else {
        // Buscar workflow pelo nome
        const workflows = await this.getWorkflows();
        const existingWorkflow = workflows.find(w => w.name === 'HealthCare News');
        
        if (existingWorkflow) {
          await this.updateWorkflow(existingWorkflow.id, workflowData);
        } else {
          const newWorkflow = await this.createWorkflow(workflowData);
          console.log(`🆔 Novo workflow criado com ID: ${newWorkflow.id}`);
          console.log('💡 Adicione N8N_WORKFLOW_ID=' + newWorkflow.id + ' ao seu .env para futuras atualizações');
        }
      }
      
      console.log('✅ Sincronização do workflow concluída!');
    } catch (error) {
      console.error('❌ Erro na sincronização do workflow:', error.message);
    }
  }

  async syncCustomNodes() {
    try {
      console.log('📁 Sincronizando nós customizados...');
      const nodesDir = path.join(__dirname, 'n8n-nodes');
      
      if (!fs.existsSync(nodesDir)) {
        console.log('⚠️ Pasta n8n-nodes não encontrada');
        return;
      }
      
      const nodeFiles = fs.readdirSync(nodesDir).filter(file => file.endsWith('.js'));
      
      for (const file of nodeFiles) {
        const nodePath = path.join(nodesDir, file);
        const nodeCode = fs.readFileSync(nodePath, 'utf8');
        const nodeName = path.basename(file, '.js');
        
        await this.updateCustomNode(nodeName, nodeCode);
      }
      
      console.log('✅ Sincronização dos nós customizados concluída!');
    } catch (error) {
      console.error('❌ Erro na sincronização dos nós customizados:', error.message);
    }
  }

  async fullSync() {
    console.log('🚀 Iniciando sincronização completa...\n');
    
    // Testar conexão
    const connected = await this.testConnection();
    if (!connected) {
      console.log('❌ Falha na conexão. Verifique suas credenciais.');
      return;
    }
    
    console.log('');
    
    // Sincronizar workflow
    await this.syncWorkflow();
    
    console.log('');
    
    // Sincronizar nós customizados
    await this.syncCustomNodes();
    
    console.log('\n🎉 Sincronização completa finalizada!');
  }
}

// Função principal
async function main() {
  try {
    const sync = new N8NSync();
    
    const command = process.argv[2];
    
    switch (command) {
      case 'test':
        await sync.testConnection();
        break;
      case 'workflow':
        await sync.syncWorkflow();
        break;
      case 'nodes':
        await sync.syncCustomNodes();
        break;
      case 'full':
      default:
        await sync.fullSync();
        break;
    }
  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = N8NSync;
