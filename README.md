# 🏥 MIR Health - Market Insight Report on Health

Sistema automatizado de geração de relatórios diários de mercado de saúde usando n8n, OpenAI e análise de dados em tempo real.

## 📊 Sobre o Projeto

O **MIR Health** é uma solução completa para monitoramento e análise do mercado de saúde, gerando relatórios diários automatizados com:

- 📈 **Análise de ações** de empresas de saúde globais
- 📰 **Agregação de notícias** de fontes especializadas
- 🤖 **Análise de IA** com OpenAI GPT-4
- 📊 **Gráficos interativos** e visualizações
- 📄 **Relatórios em HTML/PDF** prontos para distribuição

## 🚀 Funcionalidades

### 📰 **Agregação de Notícias**
- **9 fontes especializadas** em saúde
- **Extração inteligente** com filtros de qualidade
- **Deduplicação automática** de notícias
- **Suporte a português e inglês**

### 📈 **Análise de Mercado**
- **23 ações** de empresas de saúde
- **4 setores** principais (Farmacêuticas, Dispositivos Médicos, Ortopedia, HealthTech)
- **Dados em tempo real** via APIs
- **Métricas de performance** por setor

### 🤖 **Inteligência Artificial**
- **Análise de sentimento** do mercado
- **Identificação de tendências** emergentes
- **Recomendações estratégicas**
- **Resumos executivos** automatizados

### 📊 **Visualização de Dados**
- **Gráficos interativos** com Chart.js
- **Tabelas responsivas** por setor
- **Métricas em tempo real**
- **Design profissional** com identidade MIR Health

## 📁 Estrutura do Projeto

```
market_news_daily/
├── n8n-nodes/           # Códigos dos nodes n8n
│   ├── extract-news-permissive.js
│   ├── generate-chart-data.js
│   ├── generate-html-report.js
│   ├── generate-html-file.js
│   └── consolidate-ai-analysis.js
├── assets/              # Recursos visuais
│   └── MIR Health Logo fundo escuro.svg
├── docs/                # Documentação
│   ├── Guia Completo_ Configuração de APIs e Credenciais para o Workflow N8N.md
│   └── Guia Completo_ Workflow N8N para Relatórios Diários de Mercado de Saúde - Versão Atualizada.md
├── HealthCare News.json # Workflow n8n completo
└── README.md
```

## 🛠️ Configuração

### **Pré-requisitos**
- [n8n](https://n8n.io/) instalado e configurado
- Conta OpenAI com API key
- APIs de dados financeiros (Yahoo Finance, Alpha Vantage, etc.)

### **Instalação**

1. **Clone o repositório:**
```bash
git clone https://github.com/seu-usuario/market_news_daily.git
cd market_news_daily
```

2. **Configure as APIs:**
   - Siga o guia em `docs/Guia Completo_ Configuração de APIs e Credenciais para o Workflow N8N.md`

3. **Importe o workflow:**
   - Abra o n8n
   - Importe o arquivo `HealthCare News.json`

4. **Configure os nodes:**
   - Cole os códigos dos nodes da pasta `n8n-nodes/`
   - Configure as variáveis de ambiente

## 📋 Workflow n8n

### **Fluxo Principal:**
```
Trigger Diário → Scrape Notícias → Extract News → AI Analysis → 
Generate Charts → HTML Report → PDF Conversion → Distribution
```

### **Nodes Principais:**

#### **1. Extract News Articles**
- **Arquivo:** `extract-news-permissive.js`
- **Função:** Extrai e filtra notícias de 9 fontes
- **Output:** 14 notícias únicas e relevantes

#### **2. Generate Chart Data**
- **Arquivo:** `generate-chart-data.js`
- **Função:** Prepara dados para gráficos
- **Output:** Dados estruturados para visualização

#### **3. Generate HTML Report**
- **Arquivo:** `generate-html-report.js`
- **Função:** Gera relatório HTML completo
- **Output:** HTML com gráficos e dados

#### **4. Generate HTML File**
- **Arquivo:** `generate-html-file.js`
- **Função:** Cria arquivo HTML standalone
- **Output:** Arquivo HTML pronto para acesso

## 🎨 Identidade Visual

### **Logo MIR Health**
- **Design:** Candlesticks + texto "MIR HEALTH"
- **Cores:** Verde escuro (#2f3e38), bege claro (#f3f0e6)
- **Arquivo:** `assets/MIR Health Logo fundo escuro.svg`

### **Paleta de Cores**
- **Primária:** #1a4d4d (verde escuro)
- **Secundária:** #2d7a7a (verde médio)
- **Acentos:** #e5221c (vermelho), #2fa82f (verde)

## 📰 Fontes de Notícias

### **Internacionais:**
- OrthoBuzz
- OrthoFeed
- MassDevice
- Economist HealthCare
- TechCrunch Health
- Healthcare Transformers
- MedCity News

### **Brasileiras:**
- Brazil Journal (Empresas de Saúde)
- Brazil Journal (Health Journal)

## 📊 Ações Monitoradas

### **Farmacêuticas:**
- JNJ, PFE, LLY, ABBV, NVS, AZN, MRK, NVO

### **Dispositivos Médicos:**
- BSX, ISRG, ABT

### **Ortopedia:**
- SYK, SNN, OFIX, ZBH, GMED, KIDS

### **Brasileiras:**
- RDOR3, RADL3, ONCO3, HAPV3, FLRY3, DASA3

## 🤖 Configuração OpenAI

### **Prompt Principal:**
```
Provide a concise yet insightful daily market overview covering:
- Global & Regional Financial Markets
- Cryptocurrency & DeFi
- Agribusiness & Agricultural Commodities
- Healthcare Sector (Orthopedics, Oncology, Medical Devices, HealthTech, Healthcare AI)
- Big Tech & Innovation

For each section include:
- Key Numbers
- Top 3 Headlines (with 1-2 sentences context)
- Expert Insight (short-term & long-term implications)
```

## 📈 Output do Sistema

### **Relatório Diário Inclui:**
- 📊 **Resumo Executivo** com sentimento do mercado
- 📈 **Gráficos de Tendências** por setor
- 💼 **Tabelas de Ações** com performance
- 📰 **Principais Notícias** (mínimo 7)
- 🎯 **Métricas e KPIs** do mercado

### **Formatos de Saída:**
- **HTML:** Relatório interativo com gráficos
- **PDF:** Versão para impressão/distribuição
- **JSON:** Dados estruturados para APIs

## 🔧 Personalização

### **Adicionar Novas Fontes:**
1. Adicione o scrape node no n8n
2. Atualize `extract-news-permissive.js`
3. Configure filtros e pontuação

### **Modificar Ações:**
1. Edite `generate-chart-data.js`
2. Atualize a lista de tickers
3. Ajuste os setores conforme necessário

### **Personalizar Design:**
1. Modifique cores em `generate-html-report.js`
2. Atualize logo em `assets/`
3. Ajuste layout CSS conforme necessário

## 📞 Suporte

### **Documentação:**
- **Configuração:** `docs/Guia Completo_ Configuração de APIs e Credenciais para o Workflow N8N.md`
- **Implementação:** `docs/Guia Completo_ Workflow N8N para Relatórios Diários de Mercado de Saúde - Versão Atualizada.md`

### **Issues:**
- Reporte bugs via GitHub Issues
- Sugestões de melhorias são bem-vindas

## 📄 Licença

© 2025 MIR Health®. Todos os direitos reservados.

---

**Desenvolvido com ❤️ para o mercado de saúde**
