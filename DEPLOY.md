# 🚀 Deployment Guide - Site da Luci

Este guia explica como fazer deploy da aplicação no **Render** (backend) e **GitHub Pages** (frontend).

---

## 📋 Pré-requisitos

- Conta no [Render](https://render.com) (gratuita)
- Repositório no GitHub já criado e sincronizado
- Node.js instalado localmente

---

## 🔧 Parte 1: Deploy do Backend no Render

### 1.1 Preparar o Repositório

Certifique-se de que o código está commitado e no GitHub:

```bash
git add .
git commit -m "feat: Add deployment configuration"
git push origin main
```

### 1.2 Criar Web Service no Render

1. Acesse [Render Dashboard](https://dashboard.render.com/)
2. Clique em **"New +"** → **"Web Service"**
3. Conecte seu repositório GitHub: `MarinaLarissa/site-da-luci`
4. Configure o serviço:

**Settings:**
- **Name**: `site-da-luci-api`
- **Region**: `Oregon (US West)`
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: `Free`

**Environment Variables:**
- `NODE_ENV` = `production`
- `PORT` = `3001` (Render will override this automatically)
- `FRONTEND_URL` = `https://marinalarissa.github.io/site-da-luci`

5. Clique em **"Create Web Service"**

### 1.3 Aguardar Deploy

O Render irá:
- Clonar o repositório
- Instalar dependências (`npm install`)
- Iniciar o servidor (`npm start`)
- Atribuir uma URL: `https://site-da-luci-api.onrender.com`

**⚠️ IMPORTANTE**: Anote a URL do backend para configurar no frontend!

### 1.4 Verificar Deploy

Acesse o health check:
```
https://site-da-luci-api.onrender.com/api/health
```

Você deve ver:
```json
{
  "success": true,
  "message": "Site da Luci API is running",
  "timestamp": "..."
}
```

---

## 🌐 Parte 2: Deploy do Frontend no GitHub Pages

### 2.1 Atualizar URL da API (se necessário)

Se a URL do Render for diferente de `https://site-da-luci-api.onrender.com`, atualize:

**`frontend/.env.production`**:
```env
REACT_APP_API_URL=https://sua-url-do-render.onrender.com/api
```

### 2.2 Build e Deploy

Execute o comando de deploy:

```bash
cd frontend
npm run deploy
```

Este comando irá:
1. Fazer build da aplicação (`npm run build`)
2. Criar branch `gh-pages` automaticamente
3. Fazer push do build para GitHub Pages

### 2.3 Configurar GitHub Pages

1. Acesse: `https://github.com/MarinaLarissa/site-da-luci/settings/pages`
2. Em **"Source"**, selecione:
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
3. Clique em **"Save"**

### 2.4 Aguardar Publicação

GitHub Pages leva ~2-5 minutos para publicar. Acesse:

```
https://marinalarissa.github.io/site-da-luci
```

---

## ✅ Verificar Aplicação Completa

### 1. Testar Frontend

1. Acesse: `https://marinalarissa.github.io/site-da-luci`
2. Clique em **"Load Example"**
3. Clique em **"Calculate Split"**
4. Verifique se os resultados aparecem corretamente

### 2. Verificar Integração

Se houver erro de CORS:
- Verifique se `FRONTEND_URL` está correto no Render
- Reinicie o serviço no Render

---

## 🔄 Atualizações Futuras

### Backend (Render)

O Render faz **auto-deploy** sempre que você faz push para `main`:

```bash
# Fazer mudanças no backend
git add backend/
git commit -m "feat: Update backend"
git push origin main
# Render detecta e faz deploy automaticamente
```

### Frontend (GitHub Pages)

Sempre que fizer mudanças no frontend, execute:

```bash
cd frontend
npm run deploy
# Faz build e publica automaticamente
```

---

## 🐛 Troubleshooting

### Erro: "Unable to connect to server"

**Causa**: Backend não está respondendo
**Solução**: Verifique os logs no Render Dashboard

### Erro: CORS

**Causa**: `FRONTEND_URL` incorreto no Render
**Solução**: Atualize a variável de ambiente no Render

### Página em branco no GitHub Pages

**Causa**: `homepage` incorreto no `package.json`
**Solução**: Verifique se está `https://marinalarissa.github.io/site-da-luci`

### Build falha no Render

**Causa**: Dependências faltando ou erro no código
**Solução**: Verifique os logs de build no Render, rode `npm test` localmente

---

## 📊 Monitoramento

### Render Dashboard
- Logs em tempo real
- Métricas de CPU/memória
- Status do serviço

### GitHub Actions (Futuro)
- CI/CD pipeline
- Testes automatizados antes do deploy

---

## 🎉 Deploy Completo!

Sua aplicação está online:
- **Frontend**: https://marinalarissa.github.io/site-da-luci
- **Backend**: https://site-da-luci-api.onrender.com
- **API Health**: https://site-da-luci-api.onrender.com/api/health

**Próximos passos:**
- Compartilhe com jogadores de TIBIA!
- Monitore erros e feedbacks
- Adicione novas features (histórico, múltiplos jogos, etc.)
