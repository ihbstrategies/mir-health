# 🔄 Sincronização Automática com n8n Cloud

Sistema automatizado para sincronizar seu código local com o n8n Cloud, eliminando a necessidade de copiar e colar código manualmente.

## ⚡ Quick Start

### 1. Configuração Inicial
```bash
# Instalar dependências
npm install

# Configurar API key (interativo)
npm run setup
```

### 2. Desenvolvimento
```bash
# Modo desenvolvimento com sincronização automática
npm run dev

# Ou sincronização manual
npm run sync:full
```

## 🎯 Comandos Principais

| Comando | Descrição |
|---------|-----------|
| `npm run setup` | Configuração inicial interativa |
| `npm run dev` | Modo desenvolvimento com hot reload |
| `npm run sync:test` | Testa conexão com n8n Cloud |
| `npm run sync:full` | Sincroniza tudo (workflow + nós) |
| `npm run sync:workflow` | Sincroniza apenas o workflow |
| `npm run sync:nodes` | Sincroniza apenas os nós customizados |
| `npm run watch` | Monitora mudanças e sincroniza automaticamente |

## 📁 Arquivos Sincronizados

### Workflow Principal
- `HealthCare News.json` → Workflow no n8n Cloud

### Nós Customizados
- `n8n-nodes/extract-news-permissive.js`
- `n8n-nodes/generate-chart-data.js`
- `n8n-nodes/generate-html-report.js`
- `n8n-nodes/generate-html-file.js`
- `n8n-nodes/consolidate-ai-analysis.js`

## 🔧 Configuração

### Variáveis de Ambiente (.env)
```env
N8N_CLOUD_URL=https://app.n8n.cloud
N8N_API_KEY=sua_api_key_aqui
N8N_WORKFLOW_ID=id_do_workflow_aqui
```

### Obter API Key
1. Acesse: https://app.n8n.cloud
2. Settings → API Keys
3. Create API Key
4. Copie a chave gerada

## 🚀 Fluxo de Trabalho

### Desenvolvimento Diário
1. **Edite os arquivos** localmente
2. **Execute `npm run dev`** para sincronização automática
3. **As mudanças são refletidas** instantaneamente no n8n Cloud

### Teste de Mudanças
1. **Teste a conexão:** `npm run sync:test`
2. **Sincronize seletivamente:**
   - `npm run sync:workflow` (apenas workflow)
   - `npm run sync:nodes` (apenas nós)

## 🛠️ Funcionalidades

### ✅ Sincronização Inteligente
- Detecta workflows existentes pelo nome
- Cria novos workflows automaticamente
- Atualiza nós customizados
- Preserva configurações existentes

### ✅ Tratamento de Erros
- Validação de credenciais
- Mensagens de erro claras
- Fallback para criação de recursos

### ✅ Logs Detalhados
- Progresso em tempo real
- Confirmação de operações
- Identificação de problemas

## 🔒 Segurança

- **Arquivo .env** não é versionado
- **API Keys** são armazenadas localmente
- **Credenciais** nunca são expostas

## 📈 Benefícios

- ⚡ **Produtividade:** Elimina copy/paste manual
- 🔄 **Automatização:** Sincronização instantânea
- 🎯 **Precisão:** Reduz erros de digitação
- 📊 **Versionamento:** Histórico de mudanças
- 👥 **Colaboração:** Código centralizado

## 🚨 Troubleshooting

### Erro: "N8N_API_KEY não configurada"
```bash
npm run setup
```

### Erro: "401 Unauthorized"
1. Verifique se a API key está correta
2. Regenerar a API key no n8n Cloud
3. Atualizar o arquivo `.env`

### Erro: "Workflow não encontrado"
1. Verifique se o workflow existe no n8n Cloud
2. Confirme o nome é "HealthCare News"
3. Ou adicione o ID correto no `.env`

## 📚 Documentação Completa

Para informações detalhadas, consulte:
- [GUIA_SINCRONIZACAO_N8N.md](./GUIA_SINCRONIZACAO_N8N.md)

---

**🎉 Agora você pode desenvolver localmente e sincronizar automaticamente com o n8n Cloud!**
