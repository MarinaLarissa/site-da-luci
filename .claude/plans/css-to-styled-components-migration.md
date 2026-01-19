# Migra CSS para Styled-Components - site-da-luci

**Data de criacao**: 2026-01-18
**Ultima atualizacao**: 2026-01-18
**Status**: FASE 3 - Execucao em Andamento (67% - 20/30 etapas completas)
**Progresso**: ✅ Setup + Core + LootSplit + HuntHistory | 🔄 SoloHuntAnalyzer

---

## FASE 1 - Analise (Somente Leitura)

### Resumo Executivo

| Metrica | Valor |
|---------|-------|
| Total de arquivos CSS | 27 |
| Total de linhas CSS | ~4,269 |
| Componentes afetados | 27 |
| styled-components instalado | NAO |
| utils.css em uso | NAO (orphan file) |

### Dependencia Faltante

O projeto **NAO possui styled-components** instalado. Sera necessario:
```bash
cd frontend && npm install styled-components
```

### Mapeamento Componentes x CSS

#### 1. Core (2 arquivos, 107 linhas)

| Componente | Arquivo CSS | Linhas | Import |
|------------|-------------|--------|--------|
| index.js | index.css | 83 | `import './index.css'` |
| App.js | App.css | 24 | `import './App.css'` |

#### 2. Common Components (4 arquivos, 204 linhas)

| Componente | Arquivo CSS | Linhas | Import |
|------------|-------------|--------|--------|
| Button.js | Button.css | 47 | `import './Button.css'` |
| ErrorMessage.js | ErrorMessage.css | 21 | `import './ErrorMessage.css'` |
| LoadingSpinner.js | LoadingSpinner.css | 30 | `import './LoadingSpinner.css'` |
| Tooltip.js | Tooltip.css | 106 | `import './Tooltip.css'` |

#### 3. Layout (1 arquivo, 100 linhas)

| Componente | Arquivo CSS | Linhas | Import |
|------------|-------------|--------|--------|
| Sidebar.js | Sidebar.css | 100 | `import './Sidebar.css'` |

#### 4. LanguageSelector (1 arquivo, 57 linhas)

| Componente | Arquivo CSS | Linhas | Import |
|------------|-------------|--------|--------|
| LanguageSelector.js | LanguageSelector.css | 57 | `import './LanguageSelector.css'` |

#### 5. LootSplitCalculator (9 arquivos, 597 linhas)

| Componente | Arquivo CSS | Linhas | Import |
|------------|-------------|--------|--------|
| LootSplitCalculator.js | LootSplitCalculator.css | 96 | `import './LootSplitCalculator.css'` |
| InputSection.js | InputSection.css | 60 | `import './InputSection.css'` |
| PlayerList.js | PlayerList.css | 16 | `import './PlayerList.css'` |
| PlayerCard.js | PlayerCard.css | 68 | `import './PlayerCard.css'` |
| PlayerStatsRow.js | PlayerStatsRow.css | 26 | `import './PlayerStatsRow.css'` |
| DamageHealingSection.js | DamageHealingSection.css | 32 | `import './DamageHealingSection.css'` |
| DamageHealingCard.js | DamageHealingCard.css | 73 | `import './DamageHealingCard.css'` |
| ResultsSection.js | ResultsSection.css | 77 | `import './ResultsSection.css'` |
| TransferList.js | TransferList.css | 149 | `import './TransferList.css'` |

#### 6. HuntHistory (3 arquivos, 577 linhas)

| Componente | Arquivo CSS | Linhas | Import |
|------------|-------------|--------|--------|
| HuntHistoryControls.js | HuntHistoryControls.css | 164 | `import './HuntHistoryControls.css'` |
| HuntHistoryItem.js | HuntHistoryItem.css | 235 | `import './HuntHistoryItem.css'` |
| HuntHistoryDrawer.js | HuntHistoryDrawer.css | 178 | `import './HuntHistoryDrawer.css'` |

#### 7. SoloHuntAnalyzer (6 arquivos, 1845 linhas)

| Componente | Arquivo CSS | Linhas | Import |
|------------|-------------|--------|--------|
| SoloHuntAnalyzer.js | SoloHuntAnalyzer.css | 154 | `import './SoloHuntAnalyzer.css'` |
| SessionDataInput.js | SessionDataInput.css | 104 | `import './SessionDataInput.css'` |
| ConfigurationManager.js | ConfigurationManager.css | 162 | `import './ConfigurationManager.css'` |
| HuntHistory.js | HuntHistory.css | 252 | `import './HuntHistory.css'` |
| ItemCostManager.js | ItemCostManager.css | 608 | `import './ItemCostManager.css'` |
| SoloHuntResults.js | SoloHuntResults.css | 565 | `import './SoloHuntResults.css'` |

#### 8. ImbuementCalculator (1 arquivo, 782 linhas)

| Componente | Arquivo CSS | Linhas | Import |
|------------|-------------|--------|--------|
| ImbuementCalculator.js | ImbuementCalculator.css | 782 | `import './ImbuementCalculator.css'` |

### Arquivos Orphan (nao importados)

| Arquivo | Linhas | Status |
|---------|--------|--------|
| utils.css | 434 | NAO IMPORTADO - Classes utilitarias globais |

**Decisao necessaria**: utils.css contem classes utilitarias (flexbox, spacing, etc). Opcoes:
1. Migrar para styled-components como theme/helpers
2. Manter como CSS global (importar em index.js)
3. Remover se nao estiver em uso real

### Classificacao por Complexidade

#### Alta Complexidade (>200 linhas) - 5 arquivos
- ImbuementCalculator.css (782 linhas)
- ItemCostManager.css (608 linhas)
- SoloHuntResults.css (565 linhas)
- HuntHistory.css (252 linhas)
- HuntHistoryItem.css (235 linhas)

#### Media Complexidade (100-200 linhas) - 8 arquivos
- HuntHistoryDrawer.css (178 linhas)
- HuntHistoryControls.css (164 linhas)
- ConfigurationManager.css (162 linhas)
- SoloHuntAnalyzer.css (154 linhas)
- TransferList.css (149 linhas)
- Tooltip.css (106 linhas)
- SessionDataInput.css (104 linhas)
- Sidebar.css (100 linhas)

#### Baixa Complexidade (<100 linhas) - 14 arquivos
- LootSplitCalculator.css (96 linhas)
- index.css (83 linhas)
- ResultsSection.css (77 linhas)
- DamageHealingCard.css (73 linhas)
- PlayerCard.css (68 linhas)
- InputSection.css (60 linhas)
- LanguageSelector.css (57 linhas)
- Button.css (47 linhas)
- DamageHealingSection.css (32 linhas)
- LoadingSpinner.css (30 linhas)
- PlayerStatsRow.css (26 linhas)
- App.css (24 linhas)
- ErrorMessage.css (21 linhas)
- PlayerList.css (16 linhas)

### Dependencias entre Componentes

```
App.js
├── Sidebar.js
├── LanguageSelector.js
├── LootSplitCalculator.js
│   ├── InputSection.js
│   ├── PlayerList.js
│   │   └── PlayerCard.js
│   │       └── PlayerStatsRow.js
│   ├── DamageHealingSection.js
│   │   └── DamageHealingCard.js
│   ├── ResultsSection.js
│   └── TransferList.js
├── SoloHuntAnalyzer.js
│   ├── SessionDataInput.js
│   ├── ConfigurationManager.js
│   ├── HuntHistory.js (interno)
│   ├── ItemCostManager.js
│   └── SoloHuntResults.js
├── ImbuementCalculator.js
└── HuntHistory/ (drawer)
    ├── HuntHistoryControls.js
    ├── HuntHistoryItem.js
    └── HuntHistoryDrawer.js
```

### Riscos Identificados

1. **index.css contem variaveis CSS globais** - Precisam virar theme do styled-components
2. **Media queries espalhadas** - Cada CSS tem suas proprias breakpoints
3. **Arquivos grandes (>500 linhas)** - Podem precisar ser divididos em multiplos styled-components
4. **utils.css orphan** - Decisao necessaria sobre destino
5. **Animacoes CSS** - LoadingSpinner usa @keyframes que precisam ser migrados

### Conclusao FASE 1

- **27 componentes** precisam ser migrados
- **~4,269 linhas CSS** total
- **Estrategia recomendada**: Comecar pelos componentes de baixa complexidade (common, layout) para estabelecer padroes, depois migrar features completas (LootSplit, SoloHunt, etc)
- **Estimativa de etapas**: ~30-35 commits (1 por componente + setup + cleanup)

---

## FASE 2 - Plano de Atuacao

### Resumo do Plano

| Metrica | Valor |
|---------|-------|
| Total de etapas | 30 |
| Commits planejados | 30 |
| Ordem de execucao | Setup -> Common -> Layout -> Features -> Cleanup |

---

### ETAPA 0 - Setup styled-components
**Commit**: `chore(deps): add styled-components`

**To-do**:
- [ ] Instalar styled-components no frontend
- [ ] Verificar instalacao bem-sucedida
- [ ] Criar arquivo de tema base

**Subetapas**:
1. Executar `npm install styled-components` no diretorio frontend
2. Verificar que styled-components aparece no package.json
3. Criar arquivo `frontend/src/styles/theme.js` com cores e espacamentos base
4. Criar arquivo `frontend/src/styles/GlobalStyles.js` vazio (placeholder)

---

### ETAPA 1 - Migrar index.css para GlobalStyles
**Commit**: `refactor(styles): migrate index.css to GlobalStyles`

**To-do**:
- [ ] Criar GlobalStyles com estilos globais
- [ ] Aplicar GlobalStyles no index.js
- [ ] Remover import do index.css

**Subetapas**:
1. Ler conteudo de index.css
2. Criar styled-component GlobalStyles com createGlobalStyle
3. Copiar reset/normalize styles para GlobalStyles
4. Copiar variaveis CSS para theme.js
5. Importar e aplicar GlobalStyles em index.js
6. Remover linha `import './index.css'` de index.js
7. Verificar renderizacao equivalente

---

### ETAPA 2 - Migrar App.css
**Commit**: `refactor(app): migrate App.css to styled-components`

**To-do**:
- [ ] Criar styled-components para App
- [ ] Substituir classNames no App.js
- [ ] Remover import do App.css

**Subetapas**:
1. Ler conteudo de App.css
2. Criar arquivo `frontend/src/App.styles.js`
3. Criar AppContainer styled-component
4. Criar MainContent styled-component (se aplicavel)
5. Substituir divs com className por styled-components em App.js
6. Remover linha `import './App.css'` de App.js
7. Verificar renderizacao equivalente

---

### ETAPA 3 - Migrar Button.css
**Commit**: `refactor(common): migrate Button to styled-components`

**To-do**:
- [ ] Criar styled-components para Button
- [ ] Substituir classNames no componente
- [ ] Remover import do CSS

**Subetapas**:
1. Ler conteudo de Button.css
2. Criar arquivo `Button.styles.js` na mesma pasta
3. Criar StyledButton com todos os estilos
4. Criar variantes (primary, secondary, etc) se existirem
5. Substituir className por styled-component em Button.js
6. Remover linha `import './Button.css'`
7. Verificar renderizacao equivalente

---

### ETAPA 4 - Migrar ErrorMessage.css
**Commit**: `refactor(common): migrate ErrorMessage to styled-components`

**To-do**:
- [ ] Criar styled-components para ErrorMessage
- [ ] Substituir classNames no componente
- [ ] Remover import do CSS

**Subetapas**:
1. Ler conteudo de ErrorMessage.css
2. Criar arquivo `ErrorMessage.styles.js`
3. Criar ErrorContainer styled-component
4. Criar ErrorText styled-component (se aplicavel)
5. Substituir className por styled-components em ErrorMessage.js
6. Remover linha `import './ErrorMessage.css'`
7. Verificar renderizacao equivalente

---

### ETAPA 5 - Migrar LoadingSpinner.css
**Commit**: `refactor(common): migrate LoadingSpinner to styled-components`

**To-do**:
- [ ] Criar styled-components com keyframes
- [ ] Substituir classNames no componente
- [ ] Remover import do CSS

**Subetapas**:
1. Ler conteudo de LoadingSpinner.css
2. Criar arquivo `LoadingSpinner.styles.js`
3. Criar keyframes para animacao de spin
4. Criar SpinnerContainer styled-component
5. Criar Spinner styled-component com animacao
6. Substituir className por styled-components em LoadingSpinner.js
7. Remover linha `import './LoadingSpinner.css'`
8. Verificar animacao funcionando corretamente

---

### ETAPA 6 - Migrar Tooltip.css
**Commit**: `refactor(common): migrate Tooltip to styled-components`

**To-do**:
- [ ] Criar styled-components para Tooltip
- [ ] Substituir classNames no componente
- [ ] Remover import do CSS

**Subetapas**:
1. Ler conteudo de Tooltip.css (106 linhas)
2. Criar arquivo `Tooltip.styles.js`
3. Criar TooltipWrapper styled-component
4. Criar TooltipContent styled-component
5. Criar TooltipArrow styled-component (se aplicavel)
6. Migrar posicionamento (top, bottom, left, right)
7. Substituir className por styled-components em Tooltip.js
8. Remover linha `import './Tooltip.css'`
9. Verificar todas as posicoes funcionando

---

### ETAPA 7 - Migrar Sidebar.css
**Commit**: `refactor(layout): migrate Sidebar to styled-components`

**To-do**:
- [ ] Criar styled-components para Sidebar
- [ ] Substituir classNames no componente
- [ ] Remover import do CSS

**Subetapas**:
1. Ler conteudo de Sidebar.css (100 linhas)
2. Criar arquivo `Sidebar.styles.js`
3. Criar SidebarContainer styled-component
4. Criar SidebarItem styled-component
5. Criar SidebarIcon styled-component (se aplicavel)
6. Migrar media queries para responsividade
7. Substituir className por styled-components em Sidebar.js
8. Remover linha `import './Sidebar.css'`
9. Verificar comportamento mobile/desktop

---

### ETAPA 8 - Migrar LanguageSelector.css
**Commit**: `refactor(i18n): migrate LanguageSelector to styled-components`

**To-do**:
- [ ] Criar styled-components para LanguageSelector
- [ ] Substituir classNames no componente
- [ ] Remover import do CSS

**Subetapas**:
1. Ler conteudo de LanguageSelector.css (57 linhas)
2. Criar arquivo `LanguageSelector.styles.js`
3. Criar SelectorContainer styled-component
4. Criar FlagButton styled-component
5. Criar DropdownMenu styled-component (se aplicavel)
6. Substituir className por styled-components em LanguageSelector.js
7. Remover linha `import './LanguageSelector.css'`
8. Verificar renderizacao equivalente

---

### ETAPA 9 - Migrar PlayerList.css (LootSplit)
**Commit**: `refactor(loot-split): migrate PlayerList to styled-components`

**To-do**:
- [ ] Criar styled-components para PlayerList
- [ ] Substituir classNames no componente
- [ ] Remover import do CSS

**Subetapas**:
1. Ler conteudo de PlayerList.css (16 linhas)
2. Criar arquivo `PlayerList.styles.js`
3. Criar PlayerListContainer styled-component
4. Substituir className por styled-components em PlayerList.js
5. Remover linha `import './PlayerList.css'`
6. Verificar renderizacao equivalente

---

### ETAPA 10 - Migrar PlayerStatsRow.css (LootSplit)
**Commit**: `refactor(loot-split): migrate PlayerStatsRow to styled-components`

**To-do**:
- [ ] Criar styled-components para PlayerStatsRow
- [ ] Substituir classNames no componente
- [ ] Remover import do CSS

**Subetapas**:
1. Ler conteudo de PlayerStatsRow.css (26 linhas)
2. Criar arquivo `PlayerStatsRow.styles.js`
3. Criar StatsRow styled-component
4. Criar StatLabel styled-component
5. Criar StatValue styled-component
6. Substituir className por styled-components em PlayerStatsRow.js
7. Remover linha `import './PlayerStatsRow.css'`
8. Verificar renderizacao equivalente

---

### ETAPA 11 - Migrar PlayerCard.css (LootSplit)
**Commit**: `refactor(loot-split): migrate PlayerCard to styled-components`

**To-do**:
- [ ] Criar styled-components para PlayerCard
- [ ] Substituir classNames no componente
- [ ] Remover import do CSS

**Subetapas**:
1. Ler conteudo de PlayerCard.css (68 linhas)
2. Criar arquivo `PlayerCard.styles.js`
3. Criar CardContainer styled-component
4. Criar CardHeader styled-component
5. Criar CardContent styled-component
6. Migrar estados (expanded, collapsed, etc)
7. Substituir className por styled-components em PlayerCard.js
8. Remover linha `import './PlayerCard.css'`
9. Verificar estados e transicoes

---

### ETAPA 12 - Migrar DamageHealingSection.css (LootSplit)
**Commit**: `refactor(loot-split): migrate DamageHealingSection to styled-components`

**To-do**:
- [ ] Criar styled-components para DamageHealingSection
- [ ] Substituir classNames no componente
- [ ] Remover import do CSS

**Subetapas**:
1. Ler conteudo de DamageHealingSection.css (32 linhas)
2. Criar arquivo `DamageHealingSection.styles.js`
3. Criar SectionContainer styled-component
4. Criar SectionTitle styled-component (se aplicavel)
5. Substituir className por styled-components em DamageHealingSection.js
6. Remover linha `import './DamageHealingSection.css'`
7. Verificar renderizacao equivalente

---

### ETAPA 13 - Migrar DamageHealingCard.css (LootSplit)
**Commit**: `refactor(loot-split): migrate DamageHealingCard to styled-components`

**To-do**:
- [ ] Criar styled-components para DamageHealingCard
- [ ] Substituir classNames no componente
- [ ] Remover import do CSS

**Subetapas**:
1. Ler conteudo de DamageHealingCard.css (73 linhas)
2. Criar arquivo `DamageHealingCard.styles.js`
3. Criar CardContainer styled-component
4. Criar StatRow styled-component
5. Criar ProgressBar styled-component (se aplicavel)
6. Migrar cores condicionais (damage=red, healing=green)
7. Substituir className por styled-components em DamageHealingCard.js
8. Remover linha `import './DamageHealingCard.css'`
9. Verificar cores e estilos condicionais

---

### ETAPA 14 - Migrar InputSection.css (LootSplit)
**Commit**: `refactor(loot-split): migrate InputSection to styled-components`

**To-do**:
- [ ] Criar styled-components para InputSection
- [ ] Substituir classNames no componente
- [ ] Remover import do CSS

**Subetapas**:
1. Ler conteudo de InputSection.css (60 linhas)
2. Criar arquivo `InputSection.styles.js`
3. Criar SectionContainer styled-component
4. Criar TextArea styled-component
5. Criar InputLabel styled-component (se aplicavel)
6. Substituir className por styled-components em InputSection.js
7. Remover linha `import './InputSection.css'`
8. Verificar renderizacao equivalente

---

### ETAPA 15 - Migrar ResultsSection.css (LootSplit)
**Commit**: `refactor(loot-split): migrate ResultsSection to styled-components`

**To-do**:
- [ ] Criar styled-components para ResultsSection
- [ ] Substituir classNames no componente
- [ ] Remover import do CSS

**Subetapas**:
1. Ler conteudo de ResultsSection.css (77 linhas)
2. Criar arquivo `ResultsSection.styles.js`
3. Criar ResultsContainer styled-component
4. Criar SummaryCard styled-component
5. Criar ValueHighlight styled-component
6. Migrar cores condicionais (profit=green, loss=red)
7. Substituir className por styled-components em ResultsSection.js
8. Remover linha `import './ResultsSection.css'`
9. Verificar estilos condicionais

---

### ETAPA 16 - Migrar TransferList.css (LootSplit)
**Commit**: `refactor(loot-split): migrate TransferList to styled-components`

**To-do**:
- [ ] Criar styled-components para TransferList
- [ ] Substituir classNames no componente
- [ ] Remover import do CSS

**Subetapas**:
1. Ler conteudo de TransferList.css (149 linhas)
2. Criar arquivo `TransferList.styles.js`
3. Criar ListContainer styled-component
4. Criar TransferItem styled-component
5. Criar TransferAmount styled-component
6. Criar CopyButton styled-component
7. Migrar estados (copied, hover)
8. Substituir className por styled-components em TransferList.js
9. Remover linha `import './TransferList.css'`
10. Verificar interacoes e estados

---

### ETAPA 17 - Migrar LootSplitCalculator.css
**Commit**: `refactor(loot-split): migrate LootSplitCalculator to styled-components`

**To-do**:
- [ ] Criar styled-components para LootSplitCalculator
- [ ] Substituir classNames no componente
- [ ] Remover import do CSS

**Subetapas**:
1. Ler conteudo de LootSplitCalculator.css (96 linhas)
2. Criar arquivo `LootSplitCalculator.styles.js`
3. Criar CalculatorContainer styled-component
4. Criar CalculatorHeader styled-component
5. Criar ContentGrid styled-component
6. Migrar media queries
7. Substituir className por styled-components em LootSplitCalculator.js
8. Remover linha `import './LootSplitCalculator.css'`
9. Verificar layout responsivo

---

### ETAPA 18 - Migrar HuntHistoryControls.css ✅
**Commit**: `refactor(hunt-history): migrate HuntHistoryControls to styled-components`
**Status**: ✅ COMPLETO

**To-do**:
- [x] Criar styled-components para HuntHistoryControls
- [x] Substituir classNames no componente
- [x] Remover import do CSS

**Subetapas**:
1. Ler conteudo de HuntHistoryControls.css (164 linhas)
2. Criar arquivo `HuntHistoryControls.styles.js`
3. Criar ControlsContainer styled-component
4. Criar FilterButton styled-component
5. Criar SortDropdown styled-component
6. Criar SearchInput styled-component
7. Migrar estados (active, disabled)
8. Substituir className por styled-components em HuntHistoryControls.js
9. Remover linha `import './HuntHistoryControls.css'`
10. Verificar interacoes

---

### ETAPA 19 - Migrar HuntHistoryItem.css ✅
**Commit**: `refactor(hunt-history): migrate HuntHistoryItem to styled-components`
**Status**: ✅ COMPLETO

**To-do**:
- [x] Criar styled-components para HuntHistoryItem
- [x] Substituir classNames no componente
- [x] Remover import do CSS

**Subetapas**:
1. Ler conteudo de HuntHistoryItem.css (235 linhas)
2. Criar arquivo `HuntHistoryItem.styles.js`
3. Criar ItemContainer styled-component
4. Criar ItemHeader styled-component
5. Criar ItemDetails styled-component
6. Criar ActionButtons styled-component
7. Migrar estados (expanded, selected)
8. Migrar cores condicionais
9. Substituir className por styled-components em HuntHistoryItem.js
10. Remover linha `import './HuntHistoryItem.css'`

---

### ETAPA 20 - Migrar HuntHistoryDrawer.css ✅
**Commit**: `refactor(hunt-history): migrate HuntHistoryDrawer to styled-components`
**Status**: ✅ COMPLETO

**To-do**:
- [x] Criar styled-components para HuntHistoryDrawer
- [x] Substituir classNames no componente
- [x] Remover import do CSS

**Subetapas**:
1. Ler conteudo de HuntHistoryDrawer.css (178 linhas)
2. Criar arquivo `HuntHistoryDrawer.styles.js`
3. Criar DrawerOverlay styled-component
4. Criar DrawerContainer styled-component
5. Criar DrawerHeader styled-component
6. Criar DrawerContent styled-component
7. Migrar animacoes de abertura/fechamento
8. Substituir className por styled-components em HuntHistoryDrawer.js
9. Remover linha `import './HuntHistoryDrawer.css'`
10. Verificar animacoes

---

### ETAPA 21 - Migrar SessionDataInput.css (SoloHunt)
**Commit**: `refactor(solo-hunt): migrate SessionDataInput to styled-components`

**To-do**:
- [ ] Criar styled-components para SessionDataInput
- [ ] Substituir classNames no componente
- [ ] Remover import do CSS

**Subetapas**:
1. Ler conteudo de SessionDataInput.css (104 linhas)
2. Criar arquivo `SessionDataInput.styles.js`
3. Criar InputContainer styled-component
4. Criar TextAreaStyled styled-component
5. Criar SubmitButton styled-component
6. Migrar media queries
7. Substituir className por styled-components em SessionDataInput.js
8. Remover linha `import './SessionDataInput.css'`
9. Verificar renderizacao responsiva

---

### ETAPA 22 - Migrar ConfigurationManager.css (SoloHunt)
**Commit**: `refactor(solo-hunt): migrate ConfigurationManager to styled-components`

**To-do**:
- [ ] Criar styled-components para ConfigurationManager
- [ ] Substituir classNames no componente
- [ ] Remover import do CSS

**Subetapas**:
1. Ler conteudo de ConfigurationManager.css (162 linhas)
2. Criar arquivo `ConfigurationManager.styles.js`
3. Criar ManagerContainer styled-component
4. Criar ConfigSection styled-component
5. Criar ConfigInput styled-component
6. Criar SaveButton styled-component
7. Migrar estados (editing, saved)
8. Substituir className por styled-components em ConfigurationManager.js
9. Remover linha `import './ConfigurationManager.css'`
10. Verificar interacoes de formulario

---

### ETAPA 23 - Migrar HuntHistory.css (SoloHunt interno)
**Commit**: `refactor(solo-hunt): migrate internal HuntHistory to styled-components`

**To-do**:
- [ ] Criar styled-components para HuntHistory
- [ ] Substituir classNames no componente
- [ ] Remover import do CSS

**Subetapas**:
1. Ler conteudo de HuntHistory.css (252 linhas)
2. Criar arquivo `HuntHistory.styles.js`
3. Criar HistoryContainer styled-component
4. Criar HistoryList styled-component
5. Criar HistoryItem styled-component
6. Criar EmptyState styled-component
7. Migrar animacoes de lista
8. Substituir className por styled-components em HuntHistory.js
9. Remover linha `import './HuntHistory.css'`
10. Verificar lista e estados

---

### ETAPA 24 - Migrar SoloHuntResults.css (ALTA COMPLEXIDADE)
**Commit**: `refactor(solo-hunt): migrate SoloHuntResults to styled-components`

**To-do**:
- [ ] Criar styled-components para SoloHuntResults
- [ ] Substituir classNames no componente
- [ ] Remover import do CSS

**Subetapas**:
1. Ler conteudo de SoloHuntResults.css (565 linhas)
2. Criar arquivo `SoloHuntResults.styles.js`
3. Criar ResultsContainer styled-component
4. Criar StatsGrid styled-component
5. Criar StatCard styled-component
6. Criar ProfitDisplay styled-component
7. Criar ExpenseBreakdown styled-component
8. Migrar cores condicionais
9. Migrar media queries responsivas
10. Substituir className e remover CSS import

---

### ETAPA 25 - Migrar ItemCostManager.css (ALTA COMPLEXIDADE)
**Commit**: `refactor(solo-hunt): migrate ItemCostManager to styled-components`

**To-do**:
- [ ] Criar styled-components para ItemCostManager
- [ ] Substituir classNames no componente
- [ ] Remover import do CSS

**Subetapas**:
1. Ler conteudo de ItemCostManager.css (608 linhas)
2. Criar arquivo `ItemCostManager.styles.js`
3. Criar ManagerContainer styled-component
4. Criar ItemGrid styled-component
5. Criar ItemCard styled-component
6. Criar PriceInput styled-component
7. Criar CategoryTabs styled-component
8. Migrar estados (selected, editing)
9. Migrar media queries
10. Substituir className e remover CSS import

---

### ETAPA 26 - Migrar SoloHuntAnalyzer.css
**Commit**: `refactor(solo-hunt): migrate SoloHuntAnalyzer container to styled-components`

**To-do**:
- [ ] Criar styled-components para SoloHuntAnalyzer
- [ ] Substituir classNames no componente
- [ ] Remover import do CSS

**Subetapas**:
1. Ler conteudo de SoloHuntAnalyzer.css (154 linhas)
2. Criar arquivo `SoloHuntAnalyzer.styles.js`
3. Criar AnalyzerContainer styled-component
4. Criar AnalyzerHeader styled-component
5. Criar ContentArea styled-component
6. Migrar media queries
7. Substituir className por styled-components em SoloHuntAnalyzer.js
8. Remover linha `import './SoloHuntAnalyzer.css'`
9. Verificar layout geral

---

### ETAPA 27 - Migrar ImbuementCalculator.css (MAIOR COMPLEXIDADE)
**Commit**: `refactor(imbuement): migrate ImbuementCalculator to styled-components`

**To-do**:
- [ ] Criar styled-components para ImbuementCalculator
- [ ] Substituir classNames no componente
- [ ] Remover import do CSS

**Subetapas**:
1. Ler conteudo de ImbuementCalculator.css (782 linhas)
2. Criar arquivo `ImbuementCalculator.styles.js`
3. Criar CalculatorContainer styled-component
4. Criar ImbuementGrid styled-component
5. Criar ImbuementCard styled-component
6. Criar CostDisplay styled-component
7. Criar MaterialList styled-component
8. Migrar cores e estados
9. Migrar media queries
10. Substituir className e remover CSS import

---

### ETAPA 28 - Decisao sobre utils.css
**Commit**: `refactor(styles): handle utility classes migration`

**To-do**:
- [ ] Decidir destino do utils.css
- [ ] Implementar solucao escolhida
- [ ] Documentar decisao

**Subetapas**:
1. Verificar se utils.css esta em uso em algum componente
2. Se NAO usado: Remover arquivo
3. Se USADO: Criar arquivo `utilities.js` com styled-components helpers
4. Exportar funcoes utilitarias (spacing, flexbox, etc)
5. Substituir usos de classes utilitarias por styled-components
6. Remover utils.css
7. Documentar decisao no plano

---

### ETAPA 29 - Limpeza de arquivos CSS
**Commit**: `chore(cleanup): remove migrated CSS files`

**To-do**:
- [ ] Verificar que todos os CSS foram migrados
- [ ] Remover arquivos CSS nao mais utilizados
- [ ] Atualizar estrutura de pastas

**Subetapas**:
1. Listar todos os arquivos .css restantes em src/
2. Verificar que nenhum tem import ativo
3. Remover cada arquivo CSS migrado
4. Verificar que build funciona sem erros
5. Verificar que aplicacao renderiza corretamente
6. Commitar remocao

---

### ETAPA 30 - Validacao Final
**Commit**: `docs(migration): complete CSS to styled-components migration`

**To-do**:
- [ ] Executar testes
- [ ] Validar visual em todos os componentes
- [ ] Documentar migracao completa

**Subetapas**:
1. Executar `npm run build` sem erros
2. Executar `npm test` sem falhas
3. Executar `npm run lint` sem erros
4. Verificar cada pagina/feature visualmente
5. Confirmar que nao existem mais imports de .css
6. Atualizar este documento com status COMPLETO

---

## REVISAO DO PLANO - Compliance com PDI.md

### Validacao de Requisitos do Projeto

| Requisito PDI | Status | Observacao |
|---------------|--------|------------|
| JavaScript (NOT TypeScript) | ✅ COMPLIANT | Todos os .styles.js serao JavaScript puro |
| Comments in English | ✅ COMPLIANT | Todos os comentarios devem ser em ingles |
| TDD Required | ⚠️ N/A | Migracao visual - testes existentes devem continuar passando |
| ESLint + Prettier | ✅ COMPLIANT | Codigo deve passar `npm run lint` |
| Commit messages in English | ✅ COMPLIANT | Todas as mensagens de commit estao em ingles |
| Create React App | ✅ COMPATIBLE | styled-components funciona com CRA sem eject |

### Regras de Implementacao (baseadas no PDI)

**1. Arquivos de Estilo**
- Extensao: `.styles.js` (JavaScript puro)
- Localizacao: Mesma pasta do componente
- Nomenclatura: `[ComponentName].styles.js`

**2. Comentarios no Codigo**
```javascript
// CORRECT - Comments in English
const Container = styled.div`
  display: flex;
  /* Main container for the component */
`;

// WRONG - Comments in Portuguese
const Container = styled.div`
  display: flex;
  /* Container principal do componente */
`;
```

**3. Exports**
- Usar named exports para styled-components
- Manter consistencia com padrao do projeto

```javascript
// Example structure for ComponentName.styles.js
import styled from 'styled-components';

export const Container = styled.div`
  /* styles here */
`;

export const Title = styled.h2`
  /* styles here */
`;
```

**4. Validacao Obrigatoria por Etapa**
Antes de commitar cada etapa:
- [ ] `npm run lint` passa sem erros
- [ ] `npm test` passa sem falhas
- [ ] Build funciona: `npm run build`
- [ ] Visual equivalente ao original

### Riscos e Mitigacoes

| Risco | Probabilidade | Impacto | Mitigacao |
|-------|--------------|---------|-----------|
| Testes existentes quebram | Baixa | Alto | Verificar testes a cada etapa |
| ESLint reporta erros em styled-components | Media | Baixo | Configurar eslint-plugin-styled-components se necessario |
| Build falha apos migracao | Baixa | Alto | Testar build a cada 5 etapas |
| Visual diferente do original | Media | Alto | Screenshot comparison antes/depois |
| Performance degradada | Baixa | Medio | Monitorar bundle size |

### Metricas de Sucesso

| Metrica | Alvo | Verificacao |
|---------|------|-------------|
| Testes passando | 100% | `npm test` |
| Lint errors | 0 | `npm run lint` |
| Build success | Yes | `npm run build` |
| Visual regression | 0 | Manual comparison |
| CSS files remaining | 0 | `find src -name "*.css"` |
| Bundle size increase | <5% | Compare before/after |

### Ordem de Execucao Recomendada

```
FASE 0: Setup (ETAPA 0)
    |
    v
FASE 1: Core + Common (ETAPAS 1-6)
    |
    v
FASE 2: Layout + i18n (ETAPAS 7-8)
    |
    v
FASE 3: LootSplitCalculator (ETAPAS 9-17) -- FEATURE COMPLETA
    |
    v
FASE 4: HuntHistory (ETAPAS 18-20) -- FEATURE COMPLETA
    |
    v
FASE 5: SoloHuntAnalyzer (ETAPAS 21-26) -- FEATURE COMPLETA
    |
    v
FASE 6: ImbuementCalculator (ETAPA 27) -- FEATURE COMPLETA
    |
    v
FASE 7: Cleanup + Validacao (ETAPAS 28-30)
```

### Pontos de Checkpoint (Build + Test)

Executar validacao completa apos:
- ETAPA 6 (Common components done)
- ETAPA 17 (LootSplitCalculator done)
- ETAPA 20 (HuntHistory done)
- ETAPA 26 (SoloHuntAnalyzer done)
- ETAPA 27 (ImbuementCalculator done)
- ETAPA 30 (Final validation)

### Decisao Pendente: utils.css

**Opcoes**:
1. **REMOVER** - Se nao esta em uso, apagar arquivo
2. **IMPORTAR GLOBALMENTE** - Se usado via classes inline, importar em index.js
3. **MIGRAR PARA HELPERS** - Criar funcoes utilitarias em styled-components

**Recomendacao**: Verificar uso real na ETAPA 28 antes de decidir

---

## Aprovacao

| Item | Status |
|------|--------|
| FASE 1 - Analise | ✅ Completa |
| FASE 2 - Plano | ✅ Completo |
| Revisao PDI | ✅ Completa |
| Aprovacao Usuario | ⏳ Pendente |

**Proximo Passo**: Aguardar aprovacao do usuario para iniciar FASE 3 (Execucao)

---

## FASE 3 - Execucao

*Aguardando aprovacao do plano*

---

## FASE 4 - Validacao

*Aguardando conclusao da execucao*
