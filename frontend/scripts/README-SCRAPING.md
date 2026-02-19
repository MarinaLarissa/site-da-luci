# Scripts do Bestiary

Scripts utilitários para manutenção dos dados do Bestiary Planner.

## Scripts Disponíveis

### `scrape-tibiawiki.js`

Extrai dados de criaturas do TibiaWiki (dificuldade, kills, resistências).

**Criatura única (consulta apenas, não atualiza arquivo):**
```bash
node scrape-tibiawiki.js "Dragon"
```

**Atualizar todas as criaturas no bestiary.js:**
```bash
node scrape-tibiawiki.js --update-all
```
> ⚠️ `--update-all` faz 1 request por criatura com delay de 1s. Pode levar 15–30 min.

---

### `download-missing-images.js`

Baixa imagens de criaturas faltantes do TibiaWiki.

```bash
node download-missing-images.js
```

---

### `count_creatures.js`

Conta criaturas por dificuldade/raridade no bestiary.js.

```bash
node count_creatures.js
```

---

### `validate-i18n.js`

Valida traduções i18n (usado via `npm run validate-i18n`).

```bash
node validate-i18n.js
```

---

### `validate-image-urls.js`

Verifica imagens referenciadas no bestiary.js.

```bash
node validate-image-urls.js
```

---

### `extract-css-variables.js`

Extrai variáveis CSS do projeto para análise.

```bash
node extract-css-variables.js
```

---

## Estrutura de dados — bestiary.js

```javascript
{
  "id": "dragon",
  "name": "Dragon",
  "imageUrl": "/images/creatures/Dragon.gif",
  "charmPoints": 15,
  "officialDifficulty": "MEDIUM",   // HARMLESS | TRIVIAL | EASY | MEDIUM | HARD | CHALLENGING
  "creatureCategory": "normal",      // normal | rare
  "locations": ["Fibula", "Thais"],
  "region": "Mainland",
  "elementalResistances": {
    "physical": 100, "fire": 110, "ice": 80,
    "energy": 100, "earth": 100, "holy": 100, "death": 100
  },
  "killsToComplete": 500,
  "hitpoints": 1000
}
```

## Charm Points por dificuldade

| Dificuldade  | Normal CP | Rare CP | Kills  |
|--------------|-----------|---------|--------|
| HARMLESS     | 1         | 5       | 250    |
| TRIVIAL      | 5         | 10      | 500    |
| EASY         | 15        | 30      | 1000   |
| MEDIUM       | 25        | 50      | 1000   |
| HARD         | 50        | 100     | 2500   |
| CHALLENGING  | 100       | 200     | 5000   |
