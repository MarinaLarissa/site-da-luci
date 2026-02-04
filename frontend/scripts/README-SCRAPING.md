# Scripts de Scraping do Bestiary

Este diretório contém scripts para extrair dados do Bestiary do Tibia de fontes online.

## Scripts Disponíveis

### 1. `scrape-tibiawiki.js` ⭐ (NOVO)

Extrai dados completos do **TibiaWiki** (fonte oficial):
- ✅ Dificuldade oficial (HARMLESS, TRIVIAL, EASY, MEDIUM, HARD, CHALLENGING)
- ✅ Resistências elementais (Physical, Fire, Ice, Energy, Earth, Holy, Death)
- ✅ Kills necessárias para completar bestiary
- ✅ Atualiza arquivo `bestiary.js` preservando dados existentes

**Uso - Criatura única:**
```bash
node scrape-tibiawiki.js "Dragon"
```

**Uso - Atualizar todas as criaturas:**
```bash
node scrape-tibiawiki.js --update-all
```

⚠️ **Atenção**: `--update-all` faz requisição para TODAS as criaturas no `bestiary.js`, com delay de 1 segundo entre cada requisição para evitar rate limiting. Pode levar ~15-30 minutos para completar.

---

### 2. `scrape-tibiapal.js` (LEGADO)

Script original que extrai dados básicos do **TibiaPal**:
- Nome da criatura
- Charm Points
- Dificuldade (apenas EASY/MEDIUM/HARD)
- Localização sugerida
- Gera novo arquivo `bestiary.js` do zero

**Uso:**
```bash
node scrape-tibiapal.js
```

⚠️ **Nota**: Este script **substitui completamente** o arquivo `bestiary.js`. Use apenas se quiser recriar a lista do zero.

---

### 3. `download-creature-images-batch.js`

Baixa imagens de criaturas em lotes de 50 do TibiaWiki.

**Uso:**
```bash
node download-creature-images-batch.js
```

---

## Fluxo Recomendado (Atualização de Dados)

### Primeira vez (criar bestiary completo):
```bash
# 1. Gerar lista básica de criaturas
node scrape-tibiapal.js

# 2. Enriquecer com dados completos do TibiaWiki
node scrape-tibiawiki.js --update-all

# 3. Baixar imagens
node download-creature-images-batch.js
```

### Atualizar dados de uma criatura específica:
```bash
# Apenas extrair dados (não atualiza arquivo)
node scrape-tibiawiki.js "Dragon"

# Para atualizar o arquivo, use --update-all e edite manualmente
# OU adicione suporte para update de criatura única no script
```

---

## Estrutura de Dados Esperada (bestiary.js)

```javascript
{
  "id": "dragon",
  "name": "Dragon",
  "imageUrl": "/images/creatures/Dragon.gif",
  "charmPoints": 15,

  // Campos legados (não mostrar no UI)
  "difficulty": "MEDIUM",           // Removido do visual
  "estimatedHours": 3,              // Removido do visual
  "recommendedLevel": 100,          // Removido do visual
  "respawnCategory": "normal",

  // Novos campos (mostrar no UI)
  "officialDifficulty": "MEDIUM",   // TibiaWiki: HARMLESS até CHALLENGING
  "locations": ["Fibula", "Thais"], // Mostrar todas as áreas
  "region": "Mainland",

  "elementalResistances": {         // Mostrar ícone + % no card
    "physical": 100,
    "fire": 110,                    // >100 = fraco ao elemento (10% mais dano)
    "ice": 80,                      // <100 = resistente (20% menos dano)
    "energy": 100,
    "earth": 100,
    "holy": 100,
    "death": 100
  },

  "killsToComplete": 500,           // Kills necessárias
  "currentKills": 250               // Progresso do usuário (opcional)
}
```

---

## Como os Cards Exibem os Dados

### ✅ Campos Exibidos:
1. **Charm Points (CP)**: Badge azul no header
2. **Dificuldade Oficial**: Badge colorido (HARMLESS até CHALLENGING)
3. **Região**: Badge de localização
4. **Resistências Elementais**: Até 4 resistências com ícone + % (apenas se ≠100%)
5. **Kills Atuais/Total**: "250 / 500 kills" OU "500 kills para completar"
6. **Localizações**: Lista de áreas (max 3 visíveis + "+X")

### ❌ Campos Removidos do Visual:
- ~~estimatedHours~~ (impreciso)
- ~~recommendedLevel~~ (impreciso)

---

## Troubleshooting

### Erro: "Page not found"
- Verifique o nome exato da criatura no TibiaWiki
- Use o nome em inglês (ex: "Dragon", não "Dragão")
- Capitalize corretamente (ex: "Ancient Scarab", não "ancient scarab")

### Erro: Rate limiting (429)
- O script já inclui delay de 1s entre requisições
- Se persistir, aumente o delay em `scrape-tibiawiki.js` (linha do setTimeout)

### Resistências não aparecem no card
- Verifique se `elementalResistances` existe no `bestiary.js`
- Apenas resistências ≠100% são exibidas (design para evitar poluição visual)

---

## Próximos Passos

### Melhorias Futuras:
- [ ] Adicionar scraping de localizações completas (múltiplas áreas)
- [ ] Mapear occurrence → killsToComplete com mais precisão
- [ ] Adicionar scraping de imagens diretamente do TibiaWiki (atualmente manual)
- [ ] Implementar update de criatura única sem reprocessar todas

### Manutenção:
- Scripts testados em **2025-02** - verifique se estrutura do TibiaWiki mudou
- Backup de `bestiary.js` é criado automaticamente antes de cada update
