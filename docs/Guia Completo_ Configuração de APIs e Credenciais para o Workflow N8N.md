# Guia Completo: Configuração de APIs e Credenciais para o Workflow N8N

## 📋 Credenciais Necessárias (Checklist)

- ✅ **OpenAI API** - Você já tem
- ⏳ **Google Drive OAuth2** - Para salvar PDFs
- ⏳ **Gmail OAuth2** - Para enviar emails (usa mesma config do Drive)
- ⏳ **PDF Generation API** - Para converter HTML em PDF

---

## 🔧 1. Google Drive + Gmail OAuth2 (Mesmo Projeto)

### Passo 1: Criar Projeto no Google Cloud Console

1. **Acesse:** https://console.cloud.google.com/
2. **Faça login** com sua conta Google (recomendo usar conta corporativa)
3. **Clique em "Selecionar projeto"** no topo da página
4. **Clique em "NOVO PROJETO"**
5. **Configure:**
   - **Nome do projeto:** `N8N Healthcare Reports`
   - **Organização:** Deixe como está
   - **Localização:** Deixe como está
6. **Clique em "CRIAR"**
7. **Aguarde** a criação (1-2 minutos)
8. **Selecione o projeto** criado

### Passo 2: Habilitar APIs Necessárias

#### Google Drive API:
1. **No menu lateral:** APIs e serviços → Biblioteca
2. **Pesquise:** "Google Drive API"
3. **Clique** na Google Drive API
4. **Clique em "ATIVAR"**

#### Gmail API:
1. **Na mesma tela de Biblioteca**
2. **Pesquise:** "Gmail API"
3. **Clique** na Gmail API
4. **Clique em "ATIVAR"**

### Passo 3: Configurar Tela de Consentimento OAuth

1. **Menu lateral:** APIs e serviços → Tela de consentimento OAuth
2. **Selecione:** "Externo" (a menos que tenha Google Workspace)
3. **Clique em "CRIAR"**
4. **Preencha os campos obrigatórios:**
   - **Nome do app:** `Healthcare Market Reports`
   - **Email de suporte do usuário:** Seu email
   - **Domínio da página inicial do app:** Deixe em branco
   - **Domínios autorizados:** Deixe em branco
   - **Email de contato do desenvolvedor:** Seu email
5. **Clique em "SALVAR E CONTINUAR"**
6. **Na tela "Escopos":** Clique em "SALVAR E CONTINUAR" (sem adicionar nada)
7. **Na tela "Usuários de teste":** 
   - Clique em "ADICIONAR USUÁRIOS"
   - Adicione seu email
   - Clique em "SALVAR E CONTINUAR"
8. **Clique em "VOLTAR AO PAINEL"**

### Passo 4: Criar Credenciais OAuth2

1. **Menu lateral:** APIs e serviços → Credenciais
2. **Clique em "+ CRIAR CREDENCIAIS"**
3. **Selecione:** "ID do cliente OAuth"
4. **Tipo de aplicativo:** "Aplicativo da Web"
5. **Nome:** `N8N Healthcare Workflow`
6. **URIs de redirecionamento autorizados:**
   - Clique em "ADICIONAR URI"
   - Cole: `https://app.n8n.cloud/`
7. **Clique em "CRIAR"**
8. **IMPORTANTE:** Anote o **Client ID** e **Client Secret** que aparecem

### Passo 5: Configurar no N8N

#### Para Google Drive:
1. **No N8N:** Vá em Credenciais → Add Credential
2. **Selecione:** "Google Drive OAuth2 API"
3. **Preencha:**
   - **Client ID:** Cole o Client ID do Google
   - **Client Secret:** Cole o Client Secret do Google
4. **Clique em "Connect my account"**
5. **Autorize** no Google (vai abrir nova aba)
6. **Salve** a credencial

#### Para Gmail:
1. **No N8N:** Add Credential → "Gmail OAuth2"
2. **Use os mesmos** Client ID e Client Secret
3. **Autorize** novamente
4. **Salve** a credencial

---

## 📄 2. PDF Generation API

### Opção A: HTML/CSS to PDF API (Recomendada)

1. **Acesse:** https://htmlcsstoimage.com/
2. **Clique em "Get API Key"**
3. **Crie conta gratuita** (500 conversões/mês grátis)
4. **Após login:** Vá em Dashboard → API
5. **Copie sua API Key**

#### Configurar no N8N:
1. **Add Credential:** "HTTP Header Auth"
2. **Name:** `PDF API Credentials`
3. **Header Name:** `Authorization`
4. **Header Value:** `Bearer SUA_API_KEY_AQUI`

### Opção B: PDFShift (Alternativa)

1. **Acesse:** https://pdfshift.io/
2. **Crie conta gratuita** (250 conversões/mês)
3. **Pegue sua API Key** no dashboard
4. **Configure igual à Opção A**

### Opção C: Puppeteer API (Mais técnica)

1. **Acesse:** https://rapidapi.com/
2. **Pesquise:** "HTML to PDF"
3. **Escolha um serviço** (muitos têm planos gratuitos)
4. **Configure conforme documentação**

---

## 🔧 3. Configurações Específicas no Workflow

### Ajustar URLs no Workflow:

Se usar **HTML/CSS to PDF API**, altere no node "Convert to PDF":
```json
{
  "url": "https://hcti.io/v1/image",
  "method": "POST",
  "headers": {
    "Authorization": "Bearer SUA_API_KEY"
  },
  "body": {
    "html": "={{ $json.htmlContent }}",
    "format": "pdf"
  }
}
```

### Configurar Email de Destino:

No node "Send Email Report":
- **sendTo:** Substitua `user@example.com` pelo seu email

### Configurar Pasta do Google Drive:

1. **Crie uma pasta** no seu Google Drive chamada "Healthcare Reports"
2. **Copie o ID da pasta** da URL (parte após `/folders/`)
3. **No node "Save to Google Drive":** Cole o ID no campo `folderId`

---

## 🧪 4. Teste das Configurações

### Teste Individual de Cada Credencial:

#### Google Drive:
1. **Crie um workflow simples** só com Google Drive
2. **Teste upload** de um arquivo
3. **Verifique** se aparece na pasta correta

#### Gmail:
1. **Teste envio** de email simples
2. **Verifique** se chegou na caixa de entrada

#### PDF API:
1. **Teste conversão** de HTML simples
2. **Verifique** se o PDF é gerado corretamente

---

## 🚨 Troubleshooting Comum

### Google APIs:
- **Erro "access_denied":** Verifique se adicionou seu email nos usuários de teste
- **Erro "redirect_uri_mismatch":** Confirme a URL de callback no Google Console
- **Quota exceeded:** APIs do Google têm limites diários

### PDF API:
- **Erro 401:** Verifique se a API Key está correta
- **Erro 429:** Limite de conversões atingido
- **PDF mal formatado:** Teste o HTML em navegador primeiro

### N8N:
- **Credencial não salva:** Limpe cache do navegador
- **Workflow não executa:** Verifique se está ativado
- **Erros de conexão:** Verifique status das APIs externas

---

## 💰 Custos Estimados (Uso Diário)

### Gratuito:
- **Google APIs:** Gratuitas para uso pessoal
- **HTML/CSS to PDF:** 500 conversões/mês grátis
- **N8N Cloud:** Plano gratuito disponível

### Pago (se necessário):
- **N8N Cloud Pro:** ~$20/mês para uso profissional
- **PDF API Premium:** ~$9/mês para uso ilimitado
- **Google Workspace:** Opcional, só se quiser domínio próprio

---

## 📞 Suporte

Se tiver dificuldades:

1. **Google Cloud:** https://cloud.google.com/support
2. **N8N:** https://community.n8n.io/
3. **PDF APIs:** Cada serviço tem sua documentação
4. **Este projeto:** Posso ajudar com dúvidas específicas

---

## ✅ Checklist Final

Antes de executar o workflow:

- [ ] Google Cloud Project criado
- [ ] Google Drive API habilitada
- [ ] Gmail API habilitada
- [ ] OAuth2 configurado
- [ ] Credenciais do Google no N8N
- [ ] PDF API configurada
- [ ] Email de destino configurado
- [ ] Pasta do Google Drive criada
- [ ] Teste individual de cada API
- [ ] Workflow importado no N8N
- [ ] Todas as credenciais vinculadas aos nodes

**Tempo estimado de configuração:** 30-45 minutos

