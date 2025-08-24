# 🌐 Guia para Configurar GitHub Pages - Link Público do Relatório

## 📋 **Visão Geral**

Este guia explica como configurar o **GitHub Pages** para criar um link público do relatório HTML, permitindo que o Slack envie um link direto para o relatório online.

---

## 🎯 **Benefícios do Link Público**

### **✅ Vantagens:**
- **Link direto** no Slack (sem anexos)
- **Acesso instantâneo** ao relatório
- **Visualização responsiva** em qualquer dispositivo
- **Atualização automática** dos dados
- **Compartilhamento fácil** com stakeholders

### **📊 Funcionalidades:**
- **HTML dinâmico** que carrega dados do JSON
- **Design moderno** e responsivo
- **Links funcionais** para notícias
- **Estatísticas em tempo real**

---

## 🔧 **Configuração do GitHub Pages**

### **Passo 1: Habilitar GitHub Pages**

1. **Acesse seu repositório:** https://github.com/ihbstrategies/market-insights
2. **Vá em Settings** → Pages
3. **Source:** Selecione "Deploy from a branch"
4. **Branch:** Selecione "main" (ou "master")
5. **Folder:** Selecione "/ (root)"
6. **Clique em "Save"**

### **Passo 2: Configurar Estrutura de Arquivos**

```
market_news_daily/
├── public/
│   ├── index.html          # Página principal
│   └── report-data.json    # Dados do relatório
├── n8n-nodes/
│   ├── save-report-data.js # Salva dados como JSON
│   └── send-slack-report.js # Envia link no Slack
└── README.md
```

### **Passo 3: Verificar URL**

Após a configuração, sua URL será:
```
https://ihbstrategies.github.io/market-insights/public/index.html
```

---

## 🔄 **Fluxo de Trabalho Atualizado**

### **Nós Adicionais no n8n:**

#### **1. "Save Report Data" (Novo)**
- **Função:** Salva dados como JSON
- **Saída:** URL pública do relatório
- **Localização:** Após "Generate Enhanced HTML"

#### **2. "Send Slack Report" (Atualizado)**
- **Função:** Envia mensagem com link público
- **Inclui:** Botão "Ver Relatório Online"
- **Localização:** Antes do "Upload PDF to Slack"

### **Fluxo Completo:**
```
Generate Enhanced HTML → Save Report Data → Send Slack Report → Upload PDF to Slack
```

---

## 📱 **Resultado no Slack**

### **Mensagem Enviada:**
```
📊 MIR Health - Relatório Diário de Mercado

📅 Data: sábado, 23 de agosto de 2025
📊 Sentimento: Neutro

📰 Total de Notícias: 18
🏢 Setores Analisados: 8

📈 Principais Tendências:
• Aumento de investimentos em IA na saúde
• Crescimento do mercado de dispositivos médicos
• Regulamentação crescente de HealthTechs

🏢 Resumo por Setor:
🌍 Análise Global do Mercado: 2 notícias
💊 Big Pharma: 2 notícias
🤖 IA em Saúde: 2 notícias
...

📋 Acesse o Relatório Completo:

[🌐 Ver Relatório Online] [📄 Baixar PDF]
```

---

## 🛠️ **Configuração no n8n Cloud**

### **Nó "Save Report Data":**

**Nome:** `Save Report Data`

**Código:** Use o arquivo `n8n-nodes/save-report-data.js`

**Conexões:**
- **Entrada:** Generate Enhanced HTML
- **Saída:** Send Slack Report

### **Nó "Send Slack Report" (Atualizado):**

**Nome:** `Send Slack Report`

**Código:** Use o arquivo `n8n-nodes/send-slack-report.js`

**Conexões:**
- **Entrada:** Save Report Data
- **Saída:** Upload PDF to Slack

---

## 🎨 **Personalização do HTML**

### **Cores e Estilo:**
- **Cores principais:** #1a4d4d, #2d7a7a
- **Gradientes:** Verde-azulado
- **Responsivo:** Mobile-friendly
- **Fontes:** Segoe UI, Tahoma

### **Funcionalidades:**
- **Carregamento dinâmico** de dados
- **Links funcionais** para notícias
- **Estatísticas em tempo real**
- **Design moderno** e profissional

---

## 🔍 **Teste e Verificação**

### **1. Testar HTML Localmente:**
```bash
# Abrir o arquivo no navegador
open public/index.html
```

### **2. Verificar GitHub Pages:**
- Acesse: https://hefestomedtech.github.io/market_news_daily/public/index.html
- Verifique se carrega corretamente
- Teste os links das notícias

### **3. Testar no n8n:**
- Execute o workflow completo
- Verifique se o link é gerado
- Teste a mensagem no Slack

---

## 🚀 **Próximos Passos**

### **1. Configurar GitHub Pages**
Siga o Passo 1 acima

### **2. Adicionar Nós no n8n**
- "Save Report Data"
- Atualizar "Send Slack Report"

### **3. Testar Workflow**
Execute o pipeline completo

### **4. Personalizar Design**
Ajuste cores e estilo conforme necessário

---

## 📞 **Suporte**

Se encontrar problemas:
1. **Verifique** se o GitHub Pages está ativo
2. **Confirme** se os arquivos estão na pasta `public/`
3. **Teste** o HTML localmente primeiro
4. **Verifique** as URLs no código

**URL Base:** `https://ihbstrategies.github.io/market-insights`
