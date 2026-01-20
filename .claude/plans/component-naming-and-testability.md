# Refatoração: Nomenclatura de Styled-Components e Atributos data-cy - site-da-luci

**Data de criação**: 2026-01-19
**Última atualização**: 2026-01-19
**Status**: ⏸️ PLANEJAMENTO
**Dependência**: FASE 3 completa (CSS → styled-components migration 100%)
**Objetivo**: Melhorar identificação de componentes e cobertura de testes Cypress

---

## FASE 1 - Análise (Somente Leitura)

### Resumo Executivo

| Métrica | Valor |
|---------|-------|
| Total de arquivos .styles.js | 26 |
| Total de styled-components | ~150-180 |
| Data-cy existentes | 20 (~10-15% cobertura) |
| Componentes sem data-cy | ~22 componentes |
| Nomes genéricos (Container, Title, etc) | ~60-80 (40-50%) |
| Campos interagíveis sem data-cy | ~50-70 |
| Valores calculados sem data-cy | ~30-40 |

### Problemas Identificados

#### 1. Nomenclatura Genérica de Styled-Components (ALTA PRIORIDADE)

**Problema**: Nomes genéricos dificultam debug e manutenção

**Exemplos encontrados**:
```javascript
// ❌ Genérico - qual CardContainer está com problema no DevTools?
export const CardContainer = styled.div`  /* PlayerCard.styles.js */
export const CardContainer = styled.div`  /* DamageHealingCard.styles.js */
export const CardContainer = styled.div`  /* ResultsSection.styles.js */

// ❌ Genérico - múltiplos componentes têm SectionContainer
export const SectionContainer = styled.div`  /* InputSection.styles.js */
export const SectionContainer = styled.div`  /* DamageHealingSection.styles.js */
export const SectionContainer = styled.div`  /* ResultsSection.styles.js */

// ❌ Genérico - impossível identificar origem
export const Container = styled.div`
export const Title = styled.h2`
export const Header = styled.div`
export const Button = styled.button`
```

**Impacto**:
- **Debug difícil**: DevTools mostra "CardContainer" sem indicar qual componente
- **Code navigation confuso**: IDE mostra múltiplos CardContainer na busca
- **Refatoração arriscada**: Difícil identificar dependências
- **Code review complexo**: Reviewer não entende contexto apenas pelo nome

**Solução Proposta**:
- Adicionar **prefixo do componente** aos styled-components
- Exemplo: `PlayerCardContainer`, `DamageHealingCardContainer`, `ResultsSectionContainer`
- Manter sufixo descritivo quando necessário

---

#### 2. Cobertura Incompleta de data-cy (ALTA PRIORIDADE)

**Problema**: Apenas ~20 data-cy para ~150-180 elementos interagíveis/testáveis

**Análise de Cobertura**:

| Categoria | Total Estimado | Com data-cy | Faltando | Cobertura |
|-----------|----------------|-------------|----------|-----------|
| Botões | 40-50 | 8 | 32-42 | 16-20% |
| Inputs/Textareas | 20-30 | 5 | 15-25 | 17-25% |
| Campos calculados | 30-40 | 2 | 28-38 | 5-7% |
| Dropdowns/Selects | 5-10 | 1 | 4-9 | 10-20% |
| Modals/Drawers | 3-5 | 1 | 2-4 | 20-33% |
| **TOTAL** | **~100-135** | **~20** | **~80-115** | **~15%** |

**Elementos SEM data-cy encontrados**:

**Botões**:
- Button.js (componente genérico) - NÃO tem data-cy prop
- Botões de ação secundários (clear, reset, etc)
- Botões de navegação (tabs, sidebar)
- Botões de controle (expand/collapse, show/hide)

**Campos Interagíveis**:
- Inputs de configuração (SoloHuntAnalyzer/ConfigurationManager)
- Textareas de input (LootSplitCalculator)
- Checkboxes/toggles (se houver)
- Dropdowns de filtro (HuntHistory)

**Valores Calculados**:
- Profit/Loss displays (ResultsSection)
- Damage/Healing totals (DamageHealingCard)
- Transfer amounts (TransferList)
- Session statistics (SoloHuntResults)
- Player stats (PlayerCard, PlayerStatsRow)
- Imbuement costs (ImbuementCalculator)

**Impacto**:
- **Testes E2E limitados**: Impossível testar fluxos completos sem seletores
- **Testes frágeis**: Dependência de classes CSS ou estrutura HTML
- **Debug difícil**: Sem identificação clara dos elementos no Cypress
- **Cobertura baixa**: ~85% dos elementos não são testáveis via Cypress

**Solução Proposta**:
- Adicionar data-cy em **todos** botões, inputs, valores calculados
- Padrão de nomenclatura: `[feature]-[element-type]-[action/description]`
- Exemplos: `loot-calculator-button-calculate`, `solo-hunt-result-profit`

---

### Padrão Atual de data-cy (Existente)

**Formato identificado**: `[feature]-[element-type]-[action/description]`

**Exemplos existentes**:
```javascript
// ✅ Bom - identifica feature, tipo e ação
data-cy="loot-calculator-button-calculate"
data-cy="solo-hunt-input-gt-price"
data-cy="hunt-history-button-open"

// ✅ Bom - identifica feature e container
data-cy="loot-calculator-results"
data-cy="transfer-list"

// ✅ Bom - identifica elemento de toggle
data-cy="language-toggle-button"
```

**Componentes COM data-cy (20 total)**:
1. LanguageSelector: 1 data-cy (language-toggle-button)
2. LootSplitCalculator: 5 data-cy (input, button, results, transfer-list)
3. SoloHuntAnalyzer: 14 data-cy (inputs, buttons)

**Componentes SEM data-cy (22 total)**:
- Button.js (comum - usado em 40+ lugares)
- ErrorMessage.js
- LoadingSpinner.js (N/A - visual feedback)
- Tooltip.js (N/A - hover UI)
- Sidebar.js
- HuntHistoryControls.js
- HuntHistoryDrawer.js
- HuntHistoryItem.js
- ImbuementCalculator.js
- ImbuementBlock.js
- PlayerCard.js
- PlayerStatsRow.js
- DamageHealingCard.js
- DamageHealingSection.js
- InputSection.js (parcial - 1 de 5+ elementos)
- ResultsSection.js (parcial - 1 de 10+ elementos)
- TransferList.js (parcial - 1 de 5+ elementos)
- ConfigurationManager.js
- HuntHistory.js (interno)
- ItemCostManager.js (parcial - 7 de 30+ elementos)
- SessionDataInput.js
- SoloHuntResults.js

---

### Mapeamento de Componentes x Styled-Components Genéricos

#### Componentes com Nomes Genéricos (Prioridade de Refatoração)

**Alta Prioridade** (nome usado 3+ vezes):
- `Container` → usado em ~15 componentes
- `CardContainer` → usado em ~5 componentes
- `SectionContainer` → usado em ~4 componentes
- `Title` / `SectionTitle` → usado em ~8 componentes
- `Header` → usado em ~6 componentes

**Média Prioridade** (nome usado 2 vezes):
- `CalculatorContainer` → 2 componentes (LootSplit, Imbuement)
- `ResultsContainer` → 2 componentes (LootSplit, SoloHunt)
- `Button` → 2 componentes (não confundir com Button.js)
- `ListContainer` → 2 componentes

**Baixa Prioridade** (nome único mas genérico):
- `Wrapper`, `Content`, `Section`, `Item`, `Row`, `Grid`

---

### Classificação por Complexidade

#### Alta Complexidade (10+ styled-components + 10+ data-cy needed)
- SoloHuntAnalyzer.js + children (30+ styled-components, 20+ data-cy)
- ImbuementCalculator.js (25+ styled-components, 15+ data-cy)
- LootSplitCalculator.js + children (40+ styled-components, 25+ data-cy)

#### Média Complexidade (5-10 styled-components + 5-10 data-cy)
- HuntHistory components (15+ styled-components, 10+ data-cy)
- PlayerCard + PlayerStatsRow (8+ styled-components, 5+ data-cy)
- ConfigurationManager (10+ styled-components, 8+ data-cy)

#### Baixa Complexidade (<5 styled-components + <5 data-cy)
- Button.js (1 styled-component, prop data-cy)
- ErrorMessage.js (2 styled-components, 1 data-cy)
- Sidebar.js (5+ styled-components, 5+ data-cy)
- LanguageSelector.js (3 styled-components, 1 data-cy existente)

---

### Convenções Propostas

#### Para Styled-Components

**Padrão de Nomenclatura**:
```
[ComponentName][ElementDescription][ElementType]
```

**Exemplos**:
```javascript
// ✅ CORRETO - PlayerCard.styles.js
export const PlayerCardContainer = styled.div`
export const PlayerCardHeader = styled.div`
export const PlayerCardName = styled.h3`
export const PlayerCardStats = styled.div`
export const PlayerCardExpandButton = styled.button`

// ✅ CORRETO - DamageHealingCard.styles.js
export const DamageHealingCardContainer = styled.div`
export const DamageHealingCardTitle = styled.h4`
export const DamageHealingCardValue = styled.span`
export const DamageHealingCardProgressBar = styled.div`

// ✅ CORRETO - InputSection.styles.js
export const InputSectionContainer = styled.div`
export const InputSectionTitle = styled.h3`
export const InputSectionTextarea = styled.textarea`
export const InputSectionButtonGroup = styled.div`
export const InputSectionButton = styled.button`

// ❌ ERRADO - Genérico demais
export const Container = styled.div`
export const Title = styled.h3`
export const Textarea = styled.textarea`
export const Button = styled.button`
```

**Exceções permitidas**:
- Componentes em `common/styled/` podem ter nomes genéricos (são reusáveis)
  - Exemplo: `Textarea`, `Card`, `Modal` (em common/styled/)
- Theme tokens (`theme.js`) mantém nomes genéricos
- GlobalStyles mantém nome atual

---

#### Para data-cy

**Padrão de Nomenclatura**:
```
[feature]-[element-type]-[action/description]
```

**Features**:
- `loot-calculator` - LootSplitCalculator
- `solo-hunt` - SoloHuntAnalyzer
- `imbuement-calc` - ImbuementCalculator
- `hunt-history` - HuntHistory
- `sidebar` - Sidebar
- `language` - LanguageSelector

**Element Types**:
- `button` - Botões
- `input` - Campos de texto/número
- `textarea` - Áreas de texto
- `dropdown` - Selects/Dropdowns
- `checkbox` - Checkboxes
- `toggle` - Toggles
- `modal` - Modals
- `drawer` - Drawers
- `result` - Campos de resultado
- `value` - Valores calculados
- `stat` - Estatísticas
- `card` - Cards clicáveis
- `item` - Itens de lista
- `container` - Containers principais

**Exemplos**:
```javascript
// ✅ Botões
data-cy="loot-calculator-button-calculate"
data-cy="loot-calculator-button-clear"
data-cy="solo-hunt-button-analyze"
data-cy="imbuement-calc-button-compare"
data-cy="hunt-history-button-open"
data-cy="hunt-history-button-close"

// ✅ Inputs
data-cy="solo-hunt-input-gt-price"
data-cy="solo-hunt-input-session-time"
data-cy="imbuement-calc-input-gt-price"

// ✅ Textareas
data-cy="loot-calculator-textarea-session-data"
data-cy="solo-hunt-textarea-loot-data"

// ✅ Valores Calculados
data-cy="loot-calculator-result-profit"
data-cy="loot-calculator-result-total-loot"
data-cy="solo-hunt-result-balance"
data-cy="solo-hunt-result-waste"
data-cy="imbuement-calc-result-total-cost"

// ✅ Stats
data-cy="player-card-stat-damage"
data-cy="player-card-stat-healing"
data-cy="player-card-stat-loot"

// ✅ Containers principais
data-cy="loot-calculator-container"
data-cy="solo-hunt-results-container"
data-cy="transfer-list-container"

// ❌ ERRADO - Genérico demais
data-cy="button"
data-cy="input1"
data-cy="result"
```

---

### Riscos Identificados

1. **Refatoração massiva**: ~150-180 styled-components para renomear
2. **Imports quebrados**: Cada renomeação requer atualizar imports
3. **Testes existentes**: Se houver testes que dependem de classes CSS
4. **Visual regression**: Risco baixo (apenas nomenclatura, não estilos)
5. **Tempo de execução**: ~8-12h para completar todas as etapas

---

### Conclusão FASE 1

- **150-180 styled-components** precisam ser renomeados
- **~100-135 elementos** precisam receber data-cy
- **Estratégia recomendada**:
  1. Começar por componentes comuns (Button, ErrorMessage) para estabelecer padrão
  2. Migrar features por prioridade (LootSplit > SoloHunt > Imbuement)
  3. Validar visualmente a cada etapa
- **Estimativa de etapas**: ~26-30 commits (1 por componente)

---

## FASE 2 - Plano de Atuação

### Resumo do Plano

| Métrica | Valor |
|---------|-------|
| Total de etapas | 30 |
| Commits planejados | 30 |
| Ordem de execução | Common → Layout → Features (LootSplit → HuntHistory → SoloHunt → Imbuement) |
| Estimativa de tempo | 8-12 horas |

---

### ETAPA 1 - Criar Guia de Nomenclatura
**Commit**: `docs(standards): add naming conventions for styled-components and data-cy`

**To-do**:
- [ ] Criar documento de convenções
- [ ] Definir padrões de nomenclatura
- [ ] Exemplos de CORRETO vs ERRADO
- [ ] Guidelines para data-cy

**Subetapas**:
1. Criar arquivo `frontend/docs/NAMING_CONVENTIONS.md`
2. Documentar padrão para styled-components
3. Documentar padrão para data-cy
4. Adicionar exemplos de cada feature
5. Incluir exceções permitidas

---

### ETAPA 2 - Refatorar Button.js (COMUM)
**Commit**: `refactor(common): improve Button naming and add data-cy prop`

**To-do**:
- [ ] Renomear StyledButton para mais específico (se necessário)
- [ ] Adicionar prop data-cy ao Button
- [ ] Atualizar todos os usos de Button para incluir data-cy
- [ ] Validar que todos botões têm data-cy

**Subetapas**:
1. Ler Button.js e Button.styles.js
2. Adicionar prop `dataCy` ao componente Button
3. Passar `data-cy={dataCy}` para StyledButton
4. Buscar todos os usos de `<Button` no projeto
5. Adicionar data-cy em cada uso (ex: `<Button dataCy="loot-calculator-button-calculate">`)
6. Validar que todos botões críticos têm data-cy

**Exemplo**:
```javascript
// Button.js
export default function Button({ children, dataCy, ...props }) {
  return (
    <StyledButton data-cy={dataCy} {...props}>
      {children}
    </StyledButton>
  );
}

// Uso
<Button dataCy="loot-calculator-button-calculate" onClick={onCalculate}>
  {t('calculate')}
</Button>
```

---

### ETAPA 3 - Refatorar ErrorMessage.js
**Commit**: `refactor(common): rename ErrorMessage styled-components and add data-cy`

**To-do**:
- [ ] Renomear `ErrorContainer` → `ErrorMessageContainer`
- [ ] Renomear `ErrorIcon` → `ErrorMessageIcon`
- [ ] Adicionar data-cy="error-message"
- [ ] Atualizar imports

**Subetapas**:
1. Ler ErrorMessage.styles.js
2. Renomear exports:
   - `ErrorContainer` → `ErrorMessageContainer`
   - `ErrorIcon` → `ErrorMessageIcon`
3. Atualizar imports em ErrorMessage.js
4. Adicionar `data-cy="error-message"` ao container
5. Verificar renderização equivalente

---

### ETAPA 4 - Refatorar Tooltip.js
**Commit**: `refactor(common): rename Tooltip styled-components and add data-cy`

**To-do**:
- [ ] Renomear styled-components genéricos
- [ ] Adicionar data-cy para testabilidade
- [ ] Atualizar imports

**Subetapas**:
1. Ler Tooltip.styles.js
2. Renomear exports:
   - `TooltipContainer` → `TooltipWrapper`
   - `TooltipContent` → `TooltipContentBox`
   - (manter específico ao contexto)
3. Adicionar `data-cy="tooltip"` ao wrapper
4. Atualizar imports em Tooltip.js
5. Verificar funcionamento do tooltip

---

### ETAPA 5 - Refatorar Sidebar.js
**Commit**: `refactor(layout): rename Sidebar styled-components and add data-cy`

**To-do**:
- [ ] Renomear `SidebarContainer` → `SidebarNav`
- [ ] Renomear outros elementos genéricos
- [ ] Adicionar data-cy em links/botões
- [ ] Atualizar imports

**Subetapas**:
1. Ler Sidebar.styles.js
2. Identificar styled-components genéricos
3. Renomear com prefixo `Sidebar`:
   - `SidebarContainer` → `SidebarNav`
   - `SidebarItem` → `SidebarNavItem`
   - `SidebarIcon` → `SidebarNavIcon`
4. Adicionar data-cy nos elementos:
   - `data-cy="sidebar-nav-loot-calculator"`
   - `data-cy="sidebar-nav-solo-hunt"`
   - `data-cy="sidebar-nav-imbuement"`
5. Atualizar imports em Sidebar.js
6. Verificar navegação funcionando

---

### ETAPA 6 - Refatorar LanguageSelector.js
**Commit**: `refactor(i18n): rename LanguageSelector styled-components`

**To-do**:
- [ ] Renomear `SelectorButton` → `LanguageSelectorButton`
- [ ] Renomear outros elementos genéricos
- [ ] Manter data-cy existente
- [ ] Atualizar imports

**Subetapas**:
1. Ler LanguageSelector.styles.js
2. Renomear com prefixo `LanguageSelector`:
   - `SelectorButton` → `LanguageSelectorButton`
   - etc
3. Atualizar imports em LanguageSelector.js
4. Verificar troca de idioma funcionando

---

### ETAPA 7 - Refatorar PlayerList.js (LootSplit)
**Commit**: `refactor(loot-split): rename PlayerList styled-components and add data-cy`

**To-do**:
- [ ] Renomear `PlayerListContainer` → `LootSplitPlayerListContainer`
- [ ] Adicionar data-cy="loot-calculator-player-list"
- [ ] Atualizar imports

**Subetapas**:
1. Ler PlayerList.styles.js
2. Renomear exports
3. Adicionar data-cy ao container
4. Atualizar imports em PlayerList.js
5. Verificar renderização de players

---

### ETAPA 8 - Refatorar PlayerStatsRow.js (LootSplit)
**Commit**: `refactor(loot-split): rename PlayerStatsRow styled-components and add data-cy`

**To-do**:
- [ ] Renomear `StatsRowContainer` → `PlayerStatsRowContainer`
- [ ] Renomear `StatLabel` → `PlayerStatsLabel`
- [ ] Renomear `StatValue` → `PlayerStatsValue`
- [ ] Adicionar data-cy nos valores

**Subetapas**:
1. Ler PlayerStatsRow.styles.js
2. Renomear todos os exports com prefixo `PlayerStats`
3. Adicionar data-cy nos valores:
   - `data-cy="player-stat-damage"`
   - `data-cy="player-stat-healing"`
   - `data-cy="player-stat-loot"`
4. Atualizar imports em PlayerStatsRow.js
5. Verificar stats renderizando

---

### ETAPA 9 - Refatorar PlayerCard.js (LootSplit)
**Commit**: `refactor(loot-split): rename PlayerCard styled-components and add data-cy`

**To-do**:
- [ ] Renomear `CardContainer` → `PlayerCardContainer`
- [ ] Renomear `CardHeader` → `PlayerCardHeader`
- [ ] Renomear `CardContent` → `PlayerCardContent`
- [ ] Adicionar data-cy nos elementos interagíveis

**Subetapas**:
1. Ler PlayerCard.styles.js
2. Renomear todos os exports com prefixo `PlayerCard`
3. Adicionar data-cy:
   - `data-cy="player-card"` no container
   - `data-cy="player-card-expand-button"`
4. Atualizar imports em PlayerCard.js
5. Verificar expand/collapse funcionando

---

### ETAPA 10 - Refatorar DamageHealingSection.js (LootSplit)
**Commit**: `refactor(loot-split): rename DamageHealingSection and add data-cy`

**To-do**:
- [ ] Renomear `SectionContainer` → `DamageHealingSectionContainer`
- [ ] Renomear `SectionTitle` → `DamageHealingSectionTitle`
- [ ] Adicionar data-cy

**Subetapas**:
1. Ler DamageHealingSection.styles.js
2. Renomear exports com prefixo `DamageHealingSection`
3. Adicionar data-cy="loot-calculator-damage-healing-section"
4. Atualizar imports
5. Verificar renderização

---

### ETAPA 11 - Refatorar DamageHealingCard.js (LootSplit)
**Commit**: `refactor(loot-split): rename DamageHealingCard and add data-cy`

**To-do**:
- [ ] Renomear `CardContainer` → `DamageHealingCardContainer`
- [ ] Renomear `StatRow` → `DamageHealingStatRow`
- [ ] Adicionar data-cy nos valores

**Subetapas**:
1. Ler DamageHealingCard.styles.js
2. Renomear com prefixo `DamageHealingCard`
3. Adicionar data-cy:
   - `data-cy="damage-healing-card-damage-value"`
   - `data-cy="damage-healing-card-healing-value"`
4. Atualizar imports
5. Verificar valores renderizando

---

### ETAPA 12 - Refatorar InputSection.js (LootSplit)
**Commit**: `refactor(loot-split): rename InputSection and add data-cy`

**To-do**:
- [ ] Renomear `SectionContainer` → `InputSectionContainer`
- [ ] Renomear `TextAreaStyled` → `InputSectionTextarea`
- [ ] Adicionar data-cy em inputs faltantes

**Subetapas**:
1. Ler InputSection.styles.js
2. Renomear com prefixo `InputSection`
3. Adicionar data-cy em todos inputs
4. Atualizar imports
5. Verificar input de sessão funcionando

---

### ETAPA 13 - Refatorar ResultsSection.js (LootSplit)
**Commit**: `refactor(loot-split): rename ResultsSection and add data-cy`

**To-do**:
- [ ] Renomear `ResultsContainer` → `LootSplitResultsContainer`
- [ ] Renomear `SummaryCard` → `LootSplitSummaryCard`
- [ ] Adicionar data-cy em valores calculados

**Subetapas**:
1. Ler ResultsSection.styles.js
2. Renomear com prefixo `LootSplitResults`
3. Adicionar data-cy em TODOS valores:
   - `data-cy="loot-calculator-result-total-loot"`
   - `data-cy="loot-calculator-result-balance"`
   - `data-cy="loot-calculator-result-profit"`
   - etc
4. Atualizar imports
5. Verificar cálculos renderizando

---

### ETAPA 14 - Refatorar TransferList.js (LootSplit)
**Commit**: `refactor(loot-split): rename TransferList and add data-cy`

**To-do**:
- [ ] Renomear `ListContainer` → `TransferListContainer`
- [ ] Renomear `TransferItem` → `TransferListItem`
- [ ] Adicionar data-cy em itens e valores

**Subetapas**:
1. Ler TransferList.styles.js
2. Renomear com prefixo `TransferList`
3. Adicionar data-cy:
   - `data-cy="transfer-list-item"` em cada item
   - `data-cy="transfer-list-value"` nos valores
   - `data-cy="transfer-list-copy-button"` nos botões
4. Atualizar imports
5. Verificar lista de transferências

---

### ETAPA 15 - Refatorar LootSplitCalculator.js
**Commit**: `refactor(loot-split): rename LootSplitCalculator and add data-cy`

**To-do**:
- [ ] Renomear `CalculatorContainer` → `LootSplitCalculatorContainer`
- [ ] Renomear `CalculatorHeader` → `LootSplitCalculatorHeader`
- [ ] Adicionar data-cy no container principal

**Subetapas**:
1. Ler LootSplitCalculator.styles.js
2. Renomear com prefixo `LootSplitCalculator`
3. Adicionar data-cy="loot-calculator-container"
4. Atualizar imports
5. Verificar layout geral

---

### ETAPA 16 - Refatorar HuntHistoryControls.js
**Commit**: `refactor(hunt-history): rename HuntHistoryControls and add data-cy`

**To-do**:
- [ ] Renomear `ControlsContainer` → `HuntHistoryControlsContainer`
- [ ] Renomear `FilterButton` → `HuntHistoryFilterButton`
- [ ] Adicionar data-cy em filtros e controles

**Subetapas**:
1. Ler HuntHistoryControls.styles.js
2. Renomear com prefixo `HuntHistoryControls`
3. Adicionar data-cy:
   - `data-cy="hunt-history-filter-button"`
   - `data-cy="hunt-history-sort-dropdown"`
   - `data-cy="hunt-history-search-input"`
4. Atualizar imports
5. Verificar controles funcionando

---

### ETAPA 17 - Refatorar HuntHistoryItem.js
**Commit**: `refactor(hunt-history): rename HuntHistoryItem and add data-cy`

**To-do**:
- [ ] Renomear `ItemContainer` → `HuntHistoryItemContainer`
- [ ] Renomear `ItemHeader` → `HuntHistoryItemHeader`
- [ ] Adicionar data-cy em items e ações

**Subetapas**:
1. Ler HuntHistoryItem.styles.js
2. Renomear com prefixo `HuntHistoryItem`
3. Adicionar data-cy:
   - `data-cy="hunt-history-item"` no container
   - `data-cy="hunt-history-item-delete-button"`
   - `data-cy="hunt-history-item-restore-button"`
4. Atualizar imports
5. Verificar items de histórico

---

### ETAPA 18 - Refatorar HuntHistoryDrawer.js
**Commit**: `refactor(hunt-history): rename HuntHistoryDrawer and add data-cy`

**To-do**:
- [ ] Manter nomes atuais (já específicos: DrawerOverlay, DrawerContainer)
- [ ] Adicionar data-cy no drawer e overlay

**Subetapas**:
1. Ler HuntHistoryDrawer.styles.js
2. Verificar nomenclatura (DrawerOverlay, DrawerContainer já são específicos)
3. Adicionar data-cy:
   - `data-cy="hunt-history-drawer"`
   - `data-cy="hunt-history-drawer-overlay"`
   - `data-cy="hunt-history-drawer-close-button"`
4. Atualizar imports
5. Verificar drawer abrindo/fechando

---

### ETAPA 19 - Refatorar SessionDataInput.js (SoloHunt)
**Commit**: `refactor(solo-hunt): rename SessionDataInput and add data-cy`

**To-do**:
- [ ] Renomear `InputContainer` → `SessionDataInputContainer`
- [ ] Renomear `TextAreaStyled` → `SessionDataTextarea`
- [ ] Adicionar data-cy em textarea e botões

**Subetapas**:
1. Ler SessionDataInput.styles.js
2. Renomear com prefixo `SessionDataInput`
3. Adicionar data-cy:
   - `data-cy="solo-hunt-textarea-session-data"`
   - `data-cy="solo-hunt-button-analyze"`
   - `data-cy="solo-hunt-button-clear"`
4. Atualizar imports
5. Verificar input de sessão

---

### ETAPA 20 - Refatorar ConfigurationManager.js (SoloHunt)
**Commit**: `refactor(solo-hunt): rename ConfigurationManager and add data-cy`

**To-do**:
- [ ] Renomear `ManagerContainer` → `ConfigurationManagerContainer`
- [ ] Renomear `ConfigSection` → `ConfigurationManagerSection`
- [ ] Adicionar data-cy em inputs de config

**Subetapas**:
1. Ler ConfigurationManager.styles.js
2. Renomear com prefixo `ConfigurationManager`
3. Adicionar data-cy em TODOS inputs de configuração:
   - `data-cy="solo-hunt-config-input-waste-percentage"`
   - `data-cy="solo-hunt-config-input-charm-points"`
   - etc
4. Atualizar imports
5. Verificar configurações salvando

---

### ETAPA 21 - Refatorar HuntHistory.js interno (SoloHunt)
**Commit**: `refactor(solo-hunt): rename internal HuntHistory and add data-cy`

**To-do**:
- [ ] Renomear `HistoryContainer` → `SoloHuntHistoryContainer`
- [ ] Renomear `HistoryList` → `SoloHuntHistoryList`
- [ ] Adicionar data-cy

**Subetapas**:
1. Ler HuntHistory.styles.js (interno SoloHunt)
2. Renomear com prefixo `SoloHuntHistory` (evitar conflito com HuntHistory drawer)
3. Adicionar data-cy:
   - `data-cy="solo-hunt-history-list"`
   - `data-cy="solo-hunt-history-item"`
4. Atualizar imports
5. Verificar histórico interno

---

### ETAPA 22 - Refatorar SoloHuntResults.js (ALTA COMPLEXIDADE)
**Commit**: `refactor(solo-hunt): rename SoloHuntResults and add data-cy`

**To-do**:
- [ ] Renomear `ResultsContainer` → `SoloHuntResultsContainer`
- [ ] Renomear `StatsGrid` → `SoloHuntStatsGrid`
- [ ] Adicionar data-cy em TODOS valores calculados

**Subetapas**:
1. Ler SoloHuntResults.styles.js (565 linhas)
2. Renomear todos styled-components com prefixo `SoloHuntResults`
3. Adicionar data-cy em TODOS resultados:
   - `data-cy="solo-hunt-result-balance"`
   - `data-cy="solo-hunt-result-profit"`
   - `data-cy="solo-hunt-result-waste"`
   - `data-cy="solo-hunt-result-loot"`
   - `data-cy="solo-hunt-result-supplies"`
   - etc (~20-30 data-cy)
4. Atualizar imports
5. Verificar todos resultados renderizando

---

### ETAPA 23 - Refatorar ItemCostManager.js (ALTA COMPLEXIDADE)
**Commit**: `refactor(solo-hunt): rename ItemCostManager and add data-cy`

**To-do**:
- [ ] Renomear `ManagerContainer` → `ItemCostManagerContainer`
- [ ] Renomear `ItemGrid` → `ItemCostGrid`
- [ ] Adicionar data-cy em todos inputs e botões

**Subetapas**:
1. Ler ItemCostManager.styles.js (608 linhas)
2. Renomear com prefixo `ItemCost` ou `ItemCostManager`
3. Adicionar data-cy em TODOS elementos:
   - Inputs de preço: `data-cy="solo-hunt-input-[item-name]-price"`
   - Botões: `data-cy="solo-hunt-button-add-[item-type]"`
   - Cards: `data-cy="solo-hunt-item-card-[item-name]"`
   - (~30-40 data-cy)
4. Atualizar imports
5. Verificar gerenciamento de custos

---

### ETAPA 24 - Refatorar SoloHuntAnalyzer.js
**Commit**: `refactor(solo-hunt): rename SoloHuntAnalyzer container and add data-cy`

**To-do**:
- [ ] Renomear `AnalyzerContainer` → `SoloHuntAnalyzerContainer`
- [ ] Renomear `CalculatorHeader` → `SoloHuntAnalyzerHeader`
- [ ] Adicionar data-cy no container principal

**Subetapas**:
1. Ler SoloHuntAnalyzer.styles.js
2. Renomear com prefixo `SoloHuntAnalyzer`
3. Adicionar data-cy="solo-hunt-analyzer-container"
4. Atualizar imports
5. Verificar layout geral

---

### ETAPA 25 - Refatorar ImbuementBlock.js
**Commit**: `refactor(imbuement): rename ImbuementBlock and add data-cy`

**To-do**:
- [ ] Renomear `ImbuementBlockContainer` → manter ou ajustar
- [ ] Adicionar data-cy em elementos interagíveis

**Subetapas**:
1. Ler ImbuementBlock.styles.js
2. Verificar nomenclatura (ImbuementBlock já é específico)
3. Adicionar data-cy:
   - `data-cy="imbuement-block-[slot]"` (ex: imbuement-block-helmet)
   - `data-cy="imbuement-block-select-tier"`
   - `data-cy="imbuement-block-value-cost"`
4. Atualizar imports
5. Verificar blocos de imbuement

---

### ETAPA 26 - Refatorar ImbuementCalculator.js (MAIOR COMPLEXIDADE)
**Commit**: `refactor(imbuement): rename ImbuementCalculator and add data-cy`

**To-do**:
- [ ] Renomear `CalculatorContainer` → `ImbuementCalculatorContainer`
- [ ] Renomear outros elementos genéricos
- [ ] Adicionar data-cy em inputs, botões, modals e resultados

**Subetapas**:
1. Ler ImbuementCalculator.styles.js (782 linhas)
2. Renomear todos styled-components com prefixo `ImbuementCalculator`
3. Adicionar data-cy em TODOS elementos:
   - Input GT price: `data-cy="imbuement-calc-input-gt-price"`
   - Botões: `data-cy="imbuement-calc-button-calculate"`
   - Modal: `data-cy="imbuement-calc-modal"`
   - Resultados: `data-cy="imbuement-calc-result-total-cost"`
   - (~20-30 data-cy)
4. Atualizar imports
5. Verificar calculadora completa

---

### ETAPA 27 - Auditoria de Nomenclatura
**Commit**: `test(naming): audit styled-component names consistency`

**To-do**:
- [ ] Verificar que NÃO existem nomes genéricos restantes
- [ ] Verificar que todos seguem convenção `[Component][Element][Type]`
- [ ] Gerar relatório de compliance

**Subetapas**:
1. Buscar styled-components genéricos restantes:
   ```bash
   grep -r "export const Container " frontend/src/components
   grep -r "export const Title " frontend/src/components
   grep -r "export const Header " frontend/src/components
   ```
2. Verificar que ZERO resultados aparecem (exceto common/styled/)
3. Gerar lista de todos styled-components renomeados
4. Documentar em relatório

---

### ETAPA 28 - Auditoria de data-cy
**Commit**: `test(data-cy): audit test coverage completeness`

**To-do**:
- [ ] Verificar que TODOS botões têm data-cy
- [ ] Verificar que TODOS inputs têm data-cy
- [ ] Verificar que TODOS valores calculados têm data-cy
- [ ] Gerar relatório de cobertura

**Subetapas**:
1. Buscar botões sem data-cy:
   ```bash
   grep -r "<Button " frontend/src/components | grep -v "data-cy"
   grep -r "button>" frontend/src/components | grep -v "data-cy"
   ```
2. Buscar inputs sem data-cy:
   ```bash
   grep -r "<input " frontend/src/components | grep -v "data-cy"
   grep -r "<textarea " frontend/src/components | grep -v "data-cy"
   ```
3. Verificar valores calculados têm data-cy
4. Documentar elementos faltantes (se houver)
5. Gerar relatório de cobertura:
   - Total de elementos testáveis
   - Total com data-cy
   - Percentual de cobertura

---

### ETAPA 29 - Validação Build e Lint
**Commit**: N/A (validação apenas)

**To-do**:
- [ ] Executar `npm run build` sem erros
- [ ] Executar `npm run lint` sem erros
- [ ] Verificar bundle size não aumentou
- [ ] Verificar DevTools mostra nomes descritivos

**Subetapas**:
1. Executar build: `cd frontend && npm run build`
2. Verificar que build passou
3. Comparar bundle size (deve ser igual ou menor)
4. Executar lint: `npm run lint`
5. Verificar 0 erros
6. Abrir app no browser
7. Inspecionar DevTools (Elements)
8. Verificar que styled-components têm nomes descritivos

---

### ETAPA 30 - Validação Final e Documentação
**Commit**: `docs(refactor): complete naming and testability refactor`

**To-do**:
- [ ] Validar visualmente TODOS componentes
- [ ] Atualizar este documento com status COMPLETO
- [ ] Gerar relatório final de métricas
- [ ] Criar checklist para futuras implementações

**Subetapas**:
1. Testar manualmente cada feature:
   - LootSplitCalculator
   - SoloHuntAnalyzer
   - ImbuementCalculator
   - HuntHistory
   - Sidebar
   - LanguageSelector
2. Verificar que NADA quebrou visualmente
3. Gerar relatório final:
   - Styled-components renomeados: X
   - Data-cy adicionados: X
   - Cobertura de testabilidade: X%
   - Tempo total gasto: X horas
4. Atualizar `NAMING_CONVENTIONS.md` com padrões finais
5. Marcar este plano como COMPLETO

---

## Revisão do Plano - Compliance com PDI.md

### Validação de Requisitos do Projeto

| Requisito PDI | Status | Observação |
|---------------|--------|------------|
| JavaScript (NOT TypeScript) | ✅ COMPLIANT | Apenas renomeações, sem mudança de linguagem |
| Comments in English | ✅ COMPLIANT | Manter comentários existentes |
| TDD Required | ⚠️ N/A | Refatoração de nomes - testes devem continuar passando |
| ESLint + Prettier | ✅ COMPLIANT | Código deve passar `npm run lint` |
| Commit messages in English | ✅ COMPLIANT | Todas as mensagens de commit estão em inglês |
| data-cy for testing | ✅ OBJECTIVE | Este plano implementa data-cy completo |

### Regras de Implementação

**1. Nomenclatura**
- Seguir convenção `[Component][Element][Type]`
- Nunca usar nomes genéricos (Container, Title, Header) sem prefixo
- Exceção: componentes em `common/styled/` (reusáveis)

**2. Data-cy**
- Seguir padrão `[feature]-[element-type]-[action/description]`
- TODOS botões, inputs, valores calculados devem ter data-cy
- Sem exceções (exceto LoadingSpinner, Tooltip puramente visuais)

**3. Validação Obrigatória por Etapa**
Antes de commitar cada etapa:
- [ ] `npm run lint` passa sem erros
- [ ] `npm run build` passa sem erros
- [ ] Visual equivalente ao original
- [ ] DevTools mostra nome descritivo

---

### Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| Imports quebrados | Média | Alto | Usar Find & Replace cuidadosamente |
| Testes existentes quebram | Baixa | Médio | Validar testes a cada 5 etapas |
| Visual quebra | Baixa | Alto | Validar visualmente a cada etapa |
| Tempo maior que estimado | Média | Baixo | Priorizar features principais (LootSplit, SoloHunt) |
| ESLint reporta erros | Baixa | Baixo | Executar lint a cada 3-5 etapas |

---

### Métricas de Sucesso

| Métrica | Antes | Meta | Verificação |
|---------|-------|------|-------------|
| Styled-components genéricos | ~60-80 | 0 | `grep -r "export const Container "` = 0 results |
| Data-cy cobertura | ~15% | 90%+ | Contagem manual + grep |
| Botões sem data-cy | ~32-42 | 0 | `grep "<Button" | grep -v "data-cy"` = 0 |
| Inputs sem data-cy | ~15-25 | 0 | `grep "<input" | grep -v "data-cy"` = 0 |
| Valores sem data-cy | ~28-38 | <5 | Auditoria manual |
| Build errors | 0 | 0 | `npm run build` |
| Lint errors | 0 | 0 | `npm run lint` |
| Visual regressions | 0 | 0 | Manual testing |

---

### Ordem de Execução Recomendada

```
FASE 0: Setup (ETAPA 1 - Documentação)
    |
    v
FASE 1: Common Components (ETAPAS 2-4)
    |
    v
FASE 2: Layout + i18n (ETAPAS 5-6)
    |
    v
FASE 3: LootSplitCalculator (ETAPAS 7-15) -- FEATURE COMPLETA
    |
    v
FASE 4: HuntHistory (ETAPAS 16-18) -- FEATURE COMPLETA
    |
    v
FASE 5: SoloHuntAnalyzer (ETAPAS 19-24) -- FEATURE COMPLETA
    |
    v
FASE 6: ImbuementCalculator (ETAPAS 25-26) -- FEATURE COMPLETA
    |
    v
FASE 7: Auditoria + Validação (ETAPAS 27-30)
```

---

### Pontos de Checkpoint (Build + Lint + Visual)

Executar validação completa após:
- ETAPA 4 (Common components done)
- ETAPA 15 (LootSplitCalculator done)
- ETAPA 18 (HuntHistory done)
- ETAPA 24 (SoloHuntAnalyzer done)
- ETAPA 26 (ImbuementCalculator done)
- ETAPA 30 (Final validation)

---

## Aprovação

| Item | Status |
|------|--------|
| FASE 1 - Análise | ✅ Completa |
| FASE 2 - Plano | ✅ Completo |
| Revisão PDI | ✅ Completa |
| Aprovação Usuário | ⏳ Pendente |

**Próximo Passo**: Aguardar aprovação do usuário para iniciar FASE 3 (Execução)

---

## FASE 3 - Execução

*Aguardando aprovação do plano*

---

## FASE 4 - Validação

*Aguardando conclusão da execução*

---

**Encoding**: UTF-8 | **Line Endings**: LF | **Estimativa Total**: 8-12 horas
