# Deployment Guide - Site da Luci

A aplicação é 100% frontend — não há backend para deployar. Todo o deploy é via GitHub Pages.

---

## Deploy no GitHub Pages

### Pré-requisitos

- Node.js 20+
- Repositório no GitHub sincronizado

### Fazer deploy

```bash
cd frontend
npm run deploy
```

Este comando:
1. Faz build da aplicação (`npm run build`)
2. Publica o build na branch `gh-pages`

### Configurar GitHub Pages (primeira vez)

1. Acesse `https://github.com/marinalarissa/site-da-luci/settings/pages`
2. Em **Source**, selecione branch `gh-pages`, pasta `/ (root)`
3. Clique em **Save**

A aplicação ficará disponível em:
```
https://marinalarissa.github.io/site-da-luci
```

---

## Variáveis de ambiente

Copie `frontend/.env.example` para `frontend/.env.local` e preencha:

```env
REACT_APP_OCR_SPACE_API_KEY=   # OCR.space — get at https://ocr.space/ocrapi
REACT_APP_AUTH_REDIRECT_URL=https://marinalarissa.github.io/site-da-luci
REACT_APP_SUPABASE_URL=        # Supabase project URL
REACT_APP_SUPABASE_ANON_KEY=   # Supabase anon key
```

Para produção, as variáveis `REACT_APP_AUTH_REDIRECT_URL` e `REACT_APP_OCR_SPACE_API_KEY`
já estão definidas em `frontend/.env.production`.

---

## Troubleshooting

### Página em branco

Verifique se `homepage` em `frontend/package.json` está correto:
```json
"homepage": "https://marinalarissa.github.io/site-da-luci"
```

### OCR não funciona

Verifique se `REACT_APP_OCR_SPACE_API_KEY` está definida. A chave free tier
suporta 25k requests/mês; o uso mensal é rastreado no localStorage do browser.
