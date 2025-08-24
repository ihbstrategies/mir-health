# 🔄 Guia de Sincronização Manual para n8n Cloud (Free Trial)

Este guia é específico para usuários da versão free trial do n8n Cloud, que não têm acesso à API. Aqui você encontrará ferramentas para facilitar o processo manual de sincronização.

## 🚀 Quick Start

### 1. Detectar Mudanças
```bash
npm run manual-sync
```

### 2. Copiar Código dos Nós
```bash
# Listar nós disponíveis
npm run copy-nodes

# Copiar código de um nó específico
npm run copy-node extract-news-permissive

# Ver todas as mudanças
npm run copy-all-nodes
```

## 🛠️ Ferramentas Disponíveis

### 📋 Detecção de Mudanças
O script `manual-sync.js` detecta automaticamente:
- **Mudanças no workflow** (`HealthCare News.json`)
- **Mudanças nos nós customizados** (pasta `n8n-nodes/`)
- **Cria backups automáticos** de cada versão
- **Gera instruções detalhadas** para sincronização

### 📋 Cópia de Código
O script `copy-nodes.js` facilita:
- **Cópia automática** para área de transferência (macOS/Windows/Linux)
- **Listagem** de todos os nós disponíveis
- **Cópia individual** ou em lote
- **Comparação** com versões anteriores

## 🔄 Fluxo de Trabalho Recomendado

### Desenvolvimento Diário

1. **Edite os arquivos** localmente:
   ```bash
   # Editar workflow
   code "HealthCare News.json"
   
   # Editar nós customizados
   code n8n-nodes/
   ```

2. **Detectar mudanças:**
   ```bash
   npm run manual-sync
   ```

3. **Sincronizar no n8n Cloud:**
   - Siga as instruções geradas automaticamente
   - Use os comandos de cópia para facilitar

### Sincronização de Workflow

1. **Detectar mudanças:**
   ```bash
   npm run manual-sync
   ```

2. **Se o workflow foi modificado:**
   - Exporte o workflow atual do n8n Cloud (backup)
   - Importe o arquivo `HealthCare News.json` atualizado
   - Verifique as configurações (credenciais, schedule, etc.)

### Sincronização de Nós Customizados

1. **Ver quais nós mudaram:**
   ```bash
   npm run manual-sync
   ```

2. **Copiar código de cada nó:**
   ```bash
   # Para cada nó que mudou
   npm run copy-node nome-do-no
   ```

3. **No n8n Cloud:**
   - Abra o workflow "HealthCare News"
   - Encontre o nó correspondente
   - Clique no nó → "Code"
   - Cole o código copiado
   - Clique em "Save"

## 📁 Estrutura de Arquivos

```
market_news_daily/
├── manual-sync.js              # Detecção de mudanças
├── copy-nodes.js               # Cópia de código
├── backups/                    # Backups automáticos
│   ├── workflow_*.json         # Backups do workflow
│   ├── node_*.js               # Backups dos nós
│   └── *_hash.txt              # Hashes para detecção
├── sync-changes.txt            # Instruções geradas
├── HealthCare News.json        # Workflow principal
├── n8n-nodes/                  # Nós customizados
│   ├── extract-news-permissive.js
│   ├── generate-chart-data.js
│   ├── generate-html-report.js
│   ├── generate-html-file.js
│   └── consolidate-ai-analysis.js
└── GUIA_SINCRONIZACAO_MANUAL.md # Este arquivo
```

## 🎯 Comandos Principais

### Detecção e Backup
| Comando | Descrição |
|---------|-----------|
| `npm run manual-sync` | Detecta mudanças e gera instruções |
| `npm run manual-history` | Mostra histórico de backups |
| `npm run manual-restore` | Restaura arquivo de backup |

### Cópia de Código
| Comando | Descrição |
|---------|-----------|
| `npm run copy-nodes` | Lista nós disponíveis |
| `npm run copy-node <nome>` | Copia código de um nó |
| `npm run copy-all-nodes` | Mostra código de todos os nós |
| `npm run diff-node <nome>` | Compara com versão anterior |

## 📋 Exemplo de Uso

### Cenário: Modificar um nó customizado

1. **Editar o nó:**
   ```bash
   code n8n-nodes/extract-news-permissive.js
   ```

2. **Detectar mudanças:**
   ```bash
   npm run manual-sync
   ```
   ```
   🔍 Detectando mudanças...

   🔧 1 nós customizados modificados:
      - extract-news-permissive.js

   📝 Gerando instruções de sincronização...

   ## 🔧 Nós Customizados

   ### Nós que precisam ser atualizados:
   - extract-news-permissive.js

   ### Instruções para cada nó:

   #### extract-news-permissive
   1. No n8n Cloud, abra o workflow "HealthCare News"
   2. Encontre o nó correspondente
   3. Clique no nó e vá em "Code"
   4. Substitua todo o código pelo seguinte:

   ```javascript
   // código atualizado aqui...
   ```

   5. Clique em "Save"
   ```

3. **Copiar código:**
   ```bash
   npm run copy-node extract-news-permissive
   ```
   ```
   🔧 Copiando código do nó: extract-news-permissive

   📋 Instruções:
   1. No n8n Cloud, abra o workflow "HealthCare News"
   2. Encontre o nó correspondente
   3. Clique no nó e vá em "Code"
   4. Substitua todo o código pelo código copiado
   5. Clique em "Save"

   ✅ Código copiado para área de transferência!
   📋 Cole no n8n Cloud
   ```

4. **Sincronizar no n8n Cloud:**
   - Abra o workflow no n8n Cloud
   - Encontre o nó "Extract News Articles"
   - Clique no nó → "Code"
   - Cole o código (Ctrl+V / Cmd+V)
   - Clique em "Save"

## 🔍 Histórico e Backup

### Ver Histórico de Mudanças
```bash
npm run manual-history
```

### Restaurar Versão Anterior
```bash
# Listar backups disponíveis
npm run manual-history

# Restaurar workflow
npm run manual-restore workflow_2024-01-15T10-30-00-000Z_HealthCare News.json

# Restaurar nó
npm run manual-restore node_2024-01-15T10-30-00-000Z_extract-news-permissive.js
```

## 🚨 Troubleshooting

### Erro: "Nó não encontrado"
```bash
# Verificar nós disponíveis
npm run copy-nodes

# Usar nome correto
npm run copy-node nome-correto-do-no
```

### Erro: "Backup não encontrado"
```bash
# Verificar backups disponíveis
npm run manual-history

# Usar nome completo do arquivo
npm run manual-restore nome-completo-do-backup
```

### Código não copiado para área de transferência
- **macOS:** Verifique se o `pbcopy` está disponível
- **Windows:** Verifique se o `clip` está disponível
- **Linux:** Instale `xclip`: `sudo apt-get install xclip`

## 📈 Benefícios

### ✅ Organização
- **Backups automáticos** de cada versão
- **Detecção inteligente** de mudanças
- **Histórico completo** de modificações

### ✅ Produtividade
- **Cópia automática** para área de transferência
- **Instruções detalhadas** geradas automaticamente
- **Comandos simples** e intuitivos

### ✅ Segurança
- **Backup antes** de cada modificação
- **Restauração fácil** de versões anteriores
- **Detecção de mudanças** por hash MD5

## 🎯 Próximos Passos

1. **Configure o ambiente** seguindo este guia
2. **Teste com mudanças pequenas** primeiro
3. **Use os comandos** para facilitar o trabalho
4. **Mantenha backups** organizados
5. **Compartilhe** este guia com sua equipe

## 📞 Suporte

Se encontrar problemas:

1. **Verifique os logs** dos scripts
2. **Confirme os nomes** dos arquivos
3. **Teste com um nó** simples primeiro
4. **Verifique permissões** dos arquivos

---

**🎉 Agora você pode sincronizar manualmente de forma organizada e eficiente!**
