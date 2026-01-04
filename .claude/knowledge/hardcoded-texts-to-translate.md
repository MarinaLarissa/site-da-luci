# Textos Hardcoded para Traduzir - Solo Hunt Analyzer

## Data: 2025-12-31

## Problema Identificado

Múltiplos textos em português estão hardcoded no código ao invés de usar i18n (react-i18next).

## Textos Hardcoded Encontrados

### ItemCostManager.js

**Imbuement Modal (linhas 594-745)**:
- ❌ Linha 600: `aria-label="Fechar modal"` → ✅ Deveria usar: `t('soloHuntAnalyzer.itemCostManager.addImbuementModal.closeModal')`
- ❌ Linha 612: `<label>Categoria:</label>` → ✅ Deveria usar: `t('soloHuntAnalyzer.itemCostManager.addImbuementModal.categoryLabel')`
- ❌ Linha 620: `Selecione uma categoria` → ✅ Deveria usar: `t('soloHuntAnalyzer.itemCostManager.addImbuementModal.selectCategory')`
- ❌ Linha 629: `<label>Imbuement:</label>` → ✅ Deveria usar: `t('soloHuntAnalyzer.itemCostManager.addImbuementModal.imbuementLabel')`
- ❌ Linha 634: `Selecione um imbuement` → ✅ Deveria usar: `t('soloHuntAnalyzer.itemCostManager.addImbuementModal.selectImbuement')`
- ❌ Linha 646: `<label>Tier:</label>` → ✅ Deveria usar: `t('soloHuntAnalyzer.itemCostManager.addImbuementModal.tierLabel')`
- ❌ Linha 654-656: Options "Basic", "Intricate", "Powerful" → ✅ Deveria usar: `t('soloHuntAnalyzer.itemCostManager.addImbuementModal.tiers.basic')` etc.
- ❌ Linha 663: `Pagar com Gold Token (GT):` → PRECISA ADICIONAR CHAVE DE TRADUÇÃO
- ❌ Linha 668-677: Options de GT payment → PRECISAM ADICIONAR CHAVES DE TRADUÇÃO
- ❌ Linha 684: `Itens necessários:` → ✅ Deveria usar: `t('soloHuntAnalyzer.itemCostManager.addImbuementModal.itemsPreviewTitle')`
- ❌ Linha 702: `pagamento do imbuement` → PRECISA ADICIONAR CHAVE DE TRADUÇÃO
- ❌ Linha 718: `coberto por GT` → PRECISA ADICIONAR CHAVE DE TRADUÇÃO
- ❌ Linha 734: `Adicionar` → ✅ Deveria usar: `t('soloHuntAnalyzer.itemCostManager.addImbuementModal.addButton')`
- ❌ Linha 740: `Cancelar` → ✅ Deveria usar: `t('soloHuntAnalyzer.itemCostManager.addImbuementModal.cancelButton')`

**Custom Item Modal (linhas 747-820)**:
- ❌ Linha 753: `aria-label="Fechar modal"` → ✅ Deveria usar: `t('soloHuntAnalyzer.itemCostManager.addCustomItemModal.closeModal')`
- ❌ Linha 762: `Adicionar Item Custom` → ✅ Deveria usar: `t('soloHuntAnalyzer.itemCostManager.addCustomItemModal.title')`
- ❌ Linha 765: `Nome do Item:` → ✅ Deveria usar: `t('soloHuntAnalyzer.itemCostManager.addCustomItemModal.itemNameLabel')`
- ❌ Linha 770: `placeholder="Ex: Exercise Rod"` → ✅ Deveria usar: `t('soloHuntAnalyzer.itemCostManager.addCustomItemModal.itemNamePlaceholder')`
- ❌ Linha 775: `Quantidade:` → ✅ Deveria usar: `t('soloHuntAnalyzer.itemCostManager.addCustomItemModal.quantityLabel')`
- ❌ Linha 785: `Preço Unitário:` → ✅ Deveria usar: `t('soloHuntAnalyzer.itemCostManager.addCustomItemModal.unitPriceLabel')`
- ❌ Linha 795: `Tipo de Moeda:` → ✅ Deveria usar: `t('soloHuntAnalyzer.itemCostManager.addCustomItemModal.priceTypeLabel')`
- ❌ Linha 800-802: `GP (Gold Pieces)`, `GT (Gold Token)`, `ST (Silver Token)` → ✅ Deveria usar: `t('soloHuntAnalyzer.itemCostManager.addCustomItemModal.priceTypes.gp')` etc.
- ❌ Linha 812: `Adicionar` → ✅ Deveria usar: `t('soloHuntAnalyzer.itemCostManager.addCustomItemModal.addButton')`
- ❌ Linha 818: `Cancelar` → ✅ Deveria usar: `t('soloHuntAnalyzer.itemCostManager.addCustomItemModal.cancelButton')`

**Items List (linhas ~431, 442)**:
- ❌ Linha 431: `title={isCollapsed ? 'Clique para expandir e editar preços dos itens' : 'Recolher itens'}` → ✅ Deveria usar: `t('soloHuntAnalyzer.itemCostManager.itemsList.expandToEdit')` e `t('soloHuntAnalyzer.itemCostManager.itemsList.collapseItems')`
- ❌ Linha 442: `title="Clique para expandir e editar preços dos itens"` → ✅ Deveria usar: `t('soloHuntAnalyzer.itemCostManager.itemsList.expandToEdit')`

## Ações Necessárias

### Fase 1: Adicionar Chaves Faltantes
Adicionar estas chaves em `pt-BR/translation.json` e `en/translation.json`:

```json
"addImbuementModal": {
  // ... chaves existentes ...
  "gtPaymentLabel": "Pagar com Gold Token (GT):",
  "gtPaymentOptions": {
    "none": "0 GT (todos os itens em GP)",
    "basic": "2 GT (cobre tier basic)",
    "basicIntricate": "4 GT (cobre basic + intricate)",
    "all": "6 GT (cobre todos os itens)"
  },
  "itemsPreviewPayment": "pagamento do imbuement",
  "coveredByGT": "coberto por GT"
}
```

### Fase 2: Substituir Todos os Textos Hardcoded
Usar find & replace ou edição manual sistemática para substituir todos os 30+ textos hardcoded por chamadas `t()`.

### Fase 3: Verificar Outros Arquivos
Verificar se há textos hardcoded em:
- ConfigurationManager.js
- HuntHistory.js
- Outros componentes

## Como Evitar Problemas Futuros

### Regra P0: NUNCA Adicionar Texto Hardcoded
✅ **CORRETO**:
```jsx
<label>{t('soloHuntAnalyzer.section.label')}</label>
<option>{t('soloHuntAnalyzer.section.option')}</option>
<button>{t('soloHuntAnalyzer.section.button')}</button>
aria-label={t('soloHuntAnalyzer.section.ariaLabel')}
title={t('soloHuntAnalyzer.section.tooltip')}
placeholder={t('soloHuntAnalyzer.section.placeholder')}
```

❌ **ERRADO**:
```jsx
<label>Categoria:</label>
<option>Selecione uma categoria</option>
<button>Adicionar</button>
aria-label="Fechar modal"
title="Clique para expandir"
placeholder="Ex: Exercise Rod"
```

### Checklist de Code Review
Antes de fazer commit, verificar:
- [ ] Todos os textos visíveis ao usuário usam `t()`?
- [ ] Todos os placeholders usam `t()`?
- [ ] Todos os aria-labels usam `t()`?
- [ ] Todos os tooltips (title) usam `t()`?
- [ ] As chaves existem em AMBOS os arquivos (pt-BR e en)?
- [ ] As traduções em inglês fazem sentido?

### Ferramentas de Detecção
```bash
# Buscar textos hardcoded em português
grep -r ">(Adicionar|Cancelar|Selecione|Categoria|Tier|Nome|Quantidade|Preço|Tipo)" src/components/

# Buscar aria-labels hardcoded
grep -r 'aria-label="[^{]' src/components/

# Buscar titles hardcoded
grep -r 'title="[^{]' src/components/

# Buscar placeholders hardcoded
grep -r 'placeholder="[^{]' src/components/
```

## Prioridade
**P1 - Importante**: Corrigir em próxima sessão de trabalho

## Root Cause
Implementação apressada sem seguir padrões i18n. Falta de checklist de code review.

## Lesson Learned
**SEMPRE** usar `t()` para TODOS os textos, sem exceção. Incluir checklist i18n no processo de code review.

---

**Encoding**: UTF-8 | **Model**: Sonnet | **Created**: 2025-12-31
