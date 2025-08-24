# 🔄 Guia de Sincronização Automática com n8n Cloud

Este guia te ajudará a configurar a sincronização automática entre seu código local e o n8n Cloud, eliminando a necessidade de copiar e colar código manualmente.

## 🚀 Configuração Inicial

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar API Key do n8n Cloud

#### Opção A: Usando o script de configuração (Recomendado)
```bash
node setup-n8n-api.js
```

#### Opção B: Configuração manual
1. Crie um arquivo `.env` na raiz do projeto
2. Adicione suas credenciais:

```env
# Configurações do n8n Cloud
N8N_CLOUD_URL=https://app.n8n.cloud
N8N_API_KEY=sua_api_key_aqui
N8N_WORKFLOW_ID=id_do_workflow_aqui
```

### 3. Obter API Key do n8n Cloud

1. **Acesse:** https://app.n8n.cloud
2. **Faça login** na sua conta
3. **Vá em:** Settings → API Keys
4. **Clique em:** "Create API Key"
5. **Dê um nome** para a chave (ex: "Sync Script")
6. **Copie a chave** gerada
7. **Cole no arquivo `.env`**

### 4. Obter ID do Workflow (Opcional)

1. **Abra seu workflow** "HealthCare News" no n8n Cloud
2. **Copie o ID** da URL:
   - Exemplo: `https://app.n8n.cloud/workflow/123456`
   - O ID é: `123456`
3. **Adicione ao `.env`** como `N8N_WORKFLOW_ID=123456`

## 🔧 Comandos Disponíveis

### Testar Conexão
```bash
npm run sync:test
```
Verifica se a API key está funcionando corretamente.

### Sincronizar Apenas Workflow
```bash
npm run sync:workflow
```
Atualiza apenas o arquivo `HealthCare News.json` no n8n Cloud.

### Sincronizar Apenas Nós Customizados
```bash
npm run sync:nodes
```
Atualiza apenas os arquivos da pasta `n8n-nodes/` no n8n Cloud.

### Sincronização Completa
```bash
npm run sync:full
```
Sincroniza workflow e todos os nós customizados.

### Modo Watch (Automático)
```bash
npm run watch
```
Monitora mudanças nos arquivos e sincroniza automaticamente.

## 📁 Estrutura de Arquivos

```
market_news_daily/
├── n8n-sync.js              # Script principal de sincronização
├── setup-n8n-api.js         # Script de configuração inicial
├── package.json             # Dependências do projeto
├── .env                     # Credenciais (não versionado)
├── env.example              # Exemplo de configuração
├── HealthCare News.json     # Workflow principal
├── n8n-nodes/               # Nós customizados
│   ├── extract-news-permissive.js
│   ├── generate-chart-data.js
│   ├── generate-html-report.js
│   ├── generate-html-file.js
│   └── consolidate-ai-analysis.js
└── GUIA_SINCRONIZACAO_N8N.md # Este arquivo
```

## 🔄 Fluxo de Trabalho Recomendado

### Desenvolvimento Diário

1. **Edite os arquivos** localmente:
   - `HealthCare News.json` (workflow)
   - `n8n-nodes/*.js` (nós customizados)

2. **Sincronize automaticamente:**
   ```bash
   npm run watch
   ```

3. **Ou sincronize manualmente:**
   ```bash
   npm run sync:full
   ```

### Teste de Mudanças

1. **Teste a conexão:**
   ```bash
   npm run sync:test
   ```

2. **Sincronize apenas o que mudou:**
   ```bash
   # Se mudou apenas o workflow
   npm run sync:workflow
   
   # Se mudou apenas os nós
   npm run sync:nodes
   ```

## 🛠️ Funcionalidades do Script

### Sincronização Inteligente
- **Detecta workflows existentes** pelo nome
- **Cria novos workflows** se não existirem
- **Atualiza nós customizados** automaticamente
- **Preserva configurações** existentes

### Tratamento de Erros
- **Validação de credenciais** antes da sincronização
- **Mensagens de erro** claras e informativas
- **Fallback** para criação de novos recursos

### Logs Detalhados
- **Progresso em tempo real** da sincronização
- **Confirmação** de cada operação
- **Identificação** de problemas

## 🚨 Troubleshooting

### Erro: "N8N_API_KEY não configurada"
**Solução:** Verifique se o arquivo `.env` existe e contém a API key.

### Erro: "401 Unauthorized"
**Solução:** 
1. Verifique se a API key está correta
2. Regenerar a API key no n8n Cloud
3. Atualizar o arquivo `.env`

### Erro: "Workflow não encontrado"
**Solução:**
1. Verifique se o workflow existe no n8n Cloud
2. Confirme o nome do workflow é "HealthCare News"
3. Ou adicione o ID correto no `.env`

### Erro: "Custom node não encontrado"
**Solução:**
1. Verifique se os arquivos `.js` estão na pasta `n8n-nodes/`
2. Confirme que os nomes dos arquivos correspondem aos nós

## 🔒 Segurança

### Arquivo .env
- **Nunca commite** o arquivo `.env` no Git
- **Adicione ao .gitignore** se não estiver
- **Mantenha backup** das credenciais em local seguro

### API Keys
- **Use chaves específicas** para cada ambiente
- **Revogue chaves** não utilizadas
- **Monitore o uso** das chaves no n8n Cloud

## 📈 Benefícios

### Produtividade
- **Elimina copy/paste** manual
- **Sincronização instantânea** de mudanças
- **Desenvolvimento mais rápido**

### Qualidade
- **Reduz erros** de digitação
- **Versionamento** automático
- **Backup** automático no n8n Cloud

### Colaboração
- **Código centralizado** no repositório
- **Sincronização** para toda a equipe
- **Histórico** de mudanças

## 🎯 Próximos Passos

1. **Configure a sincronização** seguindo este guia
2. **Teste com mudanças pequenas** primeiro
3. **Use o modo watch** para desenvolvimento
4. **Monitore os logs** para identificar problemas
5. **Compartilhe** este guia com sua equipe

## 📞 Suporte

Se encontrar problemas:

1. **Verifique os logs** do script
2. **Teste a conexão** com `npm run sync:test`
3. **Confirme as credenciais** no arquivo `.env`
4. **Verifique a documentação** do n8n Cloud API

---

**🎉 Agora você pode desenvolver localmente e sincronizar automaticamente com o n8n Cloud!**
