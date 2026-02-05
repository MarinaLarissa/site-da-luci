# Plano de Implementação - Melhorias do Bestiary Planner

**Data:** 2026-02-05
**Projeto:** Site da Luci - Bestiary Planner
**Objetivo:** Implementar 4 melhorias principais no sistema de Bestiary Planner

---

## 📋 Resumo Executivo

Este plano detalha a implementação de 4 melhorias principais no Bestiary Planner:

1. **Melhorias no OCR** - Validação de qualidade, retry automático, preview de crop
2. **Quick Actions Inline** - Botões de ação explícitos, undo, atalhos de teclado
3. **Bulk Actions** - Seleção múltipla, ações em massa, confirmação
4. **Histórico de Progresso** - Gráficos, estatísticas, timeline, exportação

**Estimativa Total:** 9-12 dias de desenvolvimento
**Novos Arquivos:** ~40 arquivos
**Arquivos Modificados:** ~19 arquivos
**Dependências Adicionais:** Nenhuma (zero-dependency approach)

---

## 🏗️ Arquitetura Atual

**Stack Técnico:**
- React 19.2.3 com hooks
- styled-components 6.3.8
- i18next (pt-BR e en)
- localStorage para persistência
- OCR.space API

**Componentes Principais:**
- `BestiaryPlanner.js` (516 linhas) - Orquestração principal
- `CreatureCard.js` (294 linhas) - Card memoizado de criatura
- `ScreenshotImport.js` (430 linhas) - Upload e OCR
- `ocrService.js` - Serviço OCR com crop inteligente

---

## 🎯 MELHORIA 1: Melhorias no OCR

### Objetivo
Melhorar experiência, precisão e confiabilidade do processo de OCR com feedback visual detalhado e recuperação de erros.

### Novos Arquivos (6 arquivos)

1. **`ImageQualityValidator.js`** + styles
   - Validação de qualidade antes do OCR
   - Verifica: resolução, brilho, contraste, desfoque
   - Feedback visual com sugestões

2. **`CropPreviewModal.js`** + styles
   - Preview detalhado da área processada
   - Ajuste manual de crop
   - Sobreposição da área detectada

3. **`imageQualityUtils.js`**
   - Funções de análise de qualidade
   - `checkResolution`, `checkBrightness`, `checkContrast`, `checkBlur`
   - Retorna score e sugestões

4. **`useOcrWithRetry.js`**
   - Hook com retry automático
   - Exponential backoff: 1s, 2s, 4s
   - Props: `maxRetries`, `onProgress`, `onError`

### Arquivos Modificados (3 arquivos)

1. **`ScreenshotImport.js`**
   - Integrar validação de qualidade
   - Adicionar preview de crop
   - Usar `useOcrWithRetry`
   - Melhor feedback visual

2. **`ocrService.js`**
   - Adicionar `preprocessWithQualityCheck`
   - Exportar constantes de qualidade
   - Logging detalhado de erros

3. **Traduções** (pt-BR e en)
   - Chaves: `qualityCheck`, `cropPreview`, `retry`

### Fluxo de Implementação

1. Criar utilitários de validação
2. Criar hook de retry
3. Criar componentes de validação e preview
4. Integrar no ScreenshotImport
5. Adicionar traduções
6. Testar fluxo completo

### Considerações Técnicas
- Retry com exponential backoff
- Mobile: preview reduzido
- Validação não deve bloquear o fluxo (opcional)

---

## ⚡ MELHORIA 2: Quick Actions Inline

### Objetivo
Tornar ações mais explícitas e acessíveis, sem depender do click no card inteiro.

### Novos Arquivos (6 arquivos)

1. **`CreatureCardActions.js`** + styles
   - Botões de ação claramente visíveis
   - Ações: Complete (✓), Add to Plan (+), Edit Kills (✎), Undo (↶)
   - Tooltips e ripple effect

2. **`useUndoAction.js`**
   - Gerencia stack de ações (últimas 5)
   - Timeout automático de 10 segundos
   - Retorna: `{ undoStack, performAction, undo, canUndo }`

3. **`UndoToast.js`** + styles
   - Toast com botão de undo
   - Auto-hide após 10 segundos

4. **`useKeyboardShortcuts.js`**
   - Atalhos: Ctrl+Z (undo), Enter (complete), E (edit), P (plan)
   - Só funciona quando card está em foco

### Arquivos Modificados (5 arquivos)

1. **`CreatureCard.js`**
   - REMOVER click handler do card principal
   - Integrar `CreatureCardActions`
   - Adicionar focus states
   - Usar `useKeyboardShortcuts`

2. **`BestiaryPlanner.js`**
   - Integrar `useUndoAction`
   - Substituir Toast por UndoToast

3. **`SuggestionList.js`**
   - Passar novas props
   - Tooltip de keyboard shortcuts

4. **Traduções**
   - Chaves: `actions`, `undo`, `shortcuts`

### Fluxo de Implementação

1. Criar hooks (undo e shortcuts)
2. Criar componente de ações
3. Criar UndoToast
4. Modificar CreatureCard
5. Atualizar BestiaryPlanner
6. Testar acessibilidade

### Considerações Técnicas
- Botões com 44x44px mínimo (mobile)
- Undo stack por character (localStorage)
- ARIA labels em todos os botões
- Performance: sem re-render da lista inteira

---

## ✅ MELHORIA 3: Bulk Actions

### Objetivo
Seleção e ações em múltiplas criaturas simultaneamente.

### Novos Arquivos (7 arquivos)

1. **`useBulkSelection.js`**
   - Gerencia seleção múltipla
   - State: `selectedIds` (Set), `selectionMode`
   - Funções: `toggleSelection`, `selectAll`, `selectNone`, `selectFiltered`

2. **`BulkActionsBar.js`** + styles
   - Barra flutuante/sticky no bottom
   - Mostra: contador, ações, cancelar
   - Ações: Mark Complete, Add to Plan, Remove, Export
   - Animação slide-up

3. **`SelectionCheckbox.js`** + styles
   - Checkbox customizado
   - Smooth transitions, ripple effect

4. **`BulkConfirmationModal.js`** + styles
   - Confirmação para ações em massa
   - Preview de criaturas afetadas

### Arquivos Modificados (6 arquivos)

1. **`BestiaryPlanner.js`**
   - Integrar `useBulkSelection`
   - Adicionar `BulkActionsBar`
   - Handlers: `handleBulkComplete`, `handleBulkAddToPlan`

2. **`CreatureCard.js`**
   - Adicionar props: `selectionMode`, `isSelected`, `onToggleSelection`
   - Mostrar checkbox quando em modo seleção
   - Estilo diferente quando selecionado

3. **`FilterPanel.js`**
   - Botão "Select All Filtered"

4. **`SuggestionList.js`**
   - Header com "Select All" / "Select None"

5. **`useBestiaryPlanner.js`**
   - Otimizar `markMultipleCompleted`

6. **Traduções**
   - Chaves: `bulkActions`, `selection`

### Fluxo de Implementação

1. Criar hook de bulk selection
2. Criar checkbox e barra de ações
3. Modificar CreatureCard
4. Integrar no BestiaryPlanner
5. Adicionar modal de confirmação
6. Otimizar performance
7. Testar com 100+ criaturas

### Considerações Técnicas
- Usar Set() para selectedIds (performance)
- Limite máximo: 100 criaturas
- Long-press em mobile entra em modo seleção
- Checkbox acessível (ARIA)

---

## 📊 MELHORIA 4: Histórico de Progresso

### Objetivo
Visualizar progresso ao longo do tempo com gráficos, estatísticas e exportação.

### Novos Arquivos (12 arquivos)

1. **`ProgressHistory.js`** + styles
   - Componente principal
   - Tabs: Charts, Timeline, Statistics, Export

2. **`ProgressChart.js`** + styles
   - Gráfico de charm points ao longo do tempo
   - Períodos: 7 dias, 30 dias, 3 meses, todos
   - Gráfico de linha/área com gradiente

3. **`ProgressTimeline.js`** + styles
   - Timeline vertical de completions
   - Agrupado por data
   - Infinite scroll

4. **`ProgressStatistics.js`** + styles
   - Média diária de completions
   - Maior streak consecutivo
   - Dia mais produtivo
   - Projeção de conclusão
   - Comparação de períodos

5. **`ProgressExport.js`** + styles
   - Export para CSV e JSON
   - Seletor de período
   - Download automático

6. **`progressHistoryStorage.js`**
   - Serviço de histórico longo prazo
   - Funções: `saveCompletion`, `getCompletionsByPeriod`, `calculateStreak`, `getStatistics`
   - Indexação por data

7. **`useProgressData.js`**
   - Hook para consumir dados
   - Cache de resultados
   - Retorna: `{ chartData, statistics, isLoading }`

8. **`chartDataUtils.js`**
   - Funções para transformar dados
   - `aggregateByDay`, `calculateTrend`, `fillMissingDates`

9. **`exportUtils.js`**
   - `generateCSV`, `downloadFile`, `formatDataForExport`

10. **`SimpleChart.js`** + styles
    - Componente SVG puro (zero-dependency)
    - Suporta: linha, área, barra
    - Responsivo

### Arquivos Modificados (4 arquivos)

1. **`BestiaryPlanner.js`**
   - Botão "Progress History" no header
   - Modal/drawer de ProgressHistory

2. **`dailyProgressStorage.js`**
   - Expandir para guardar histórico > 7 dias
   - Nova função `getHistoricalData(characterId, days)`
   - Limpeza automática apenas > 1 ano

3. **`bestiaryStorage.js`**
   - Salvar no progressHistoryStorage quando completar
   - Adicionar timestamp

4. **Traduções**
   - Chaves: `progressHistory`, `statistics`, `export`, `chart`

### Fluxo de Implementação

1. Criar serviço de histórico
2. Modificar dailyProgressStorage
3. Criar utilitários (chart, export)
4. Criar hook useProgressData
5. Criar SimpleChart (SVG)
6. Criar componentes de visualização
7. Criar ProgressHistory principal
8. Integrar no BestiaryPlanner
9. Testar com dados de meses

### Considerações Técnicas
- **Gráficos**: SVG puro (zero-dependency)
- **Histórico**: Limitar a 1 ano
- **Performance**: Lazy load, memoização
- **Export**: CSV com UTF-8 BOM (Excel)
- **Projeção**: Média dos últimos 30 dias
- **Mobile**: Charts responsivos

---

## 📦 Quebra em Pull Requests

### PR 1: OCR Improvements
- Melhoria 1 completa
- ~6 arquivos novos, ~3 modificados
- **Estimativa: 2-3 dias**

### PR 2: Quick Actions & Undo
- Melhoria 2 completa
- ~6 arquivos novos, ~5 modificados
- **Estimativa: 2 dias**

### PR 3: Bulk Selection
- Melhoria 3 completa
- ~7 arquivos novos, ~6 modificados
- **Estimativa: 2-3 dias**

### PR 4: Progress History & Charts
- Melhoria 4 completa (mais complexa)
- ~12 arquivos novos, ~4 modificados
- **Estimativa: 3-4 dias**

**Total: 9-12 dias de desenvolvimento**

---

## 🧪 Estratégia de Testes

### Unit Tests (Jest + React Testing Library)
- Hooks customizados
- Funções utilitárias
- Componentes isolados

### Integration Tests
- Fluxo completo de OCR
- Seleção múltipla e ações
- Cálculo de estatísticas

### E2E Tests (Cypress)
- Fluxo de importação
- Ações em massa
- Visualização de progresso

### Accessibility Tests
- Navegação por teclado
- Screen reader support
- ARIA labels

---

## ⚡ Otimizações de Performance

1. **Memoization**
   - Componentes de card (já existe)
   - Cálculos de estatísticas
   - Transformação de dados

2. **Virtualization**
   - Lista se > 100 items (react-window já instalado)
   - Timeline de progresso

3. **Debouncing/Throttling**
   - Validação de qualidade
   - Search/filter inputs
   - Bulk selection updates

4. **Lazy Loading**
   - Histórico antigo
   - Modals/Drawers

5. **LocalStorage**
   - Compressão de dados
   - Limpeza automática
   - Indexação para queries

---

## ♿ Acessibilidade (A11y)

### Keyboard Navigation
- Tab order lógico
- Atalhos documentados
- Focus visível

### Screen Readers
- ARIA labels em botões
- ARIA live regions para toasts
- Semantic HTML

### Visual
- Contraste WCAG AA
- Texto alternativo
- Indicadores além de cor

### Mobile
- Touch targets 44x44px
- Gestures alternativos
- Responsive layout

---

## 📚 Dependências

**Nenhuma dependência adicional necessária!**

Todas as melhorias usam apenas:
- React hooks (já disponível)
- styled-components (já instalado)
- localStorage API nativo
- SVG para gráficos (nativo)

Mantém bundle size pequeno e evita problemas de compatibilidade.

---

## 🎯 Arquivos Críticos por Feature

### Feature 1 - OCR
- [ScreenshotImport.js](c:\Users\NEXLAB\Documents\Projetos\site-da-luci\frontend\src\components\BestiaryPlanner\ScreenshotImport.js) - Core OCR flow
- [ocrService.js](c:\Users\NEXLAB\Documents\Projetos\site-da-luci\frontend\src\services\ocrService.js) - OCR logic
- `useOcrWithRetry.js` (novo) - Retry pattern

### Feature 2 - Quick Actions
- [CreatureCard.js](c:\Users\NEXLAB\Documents\Projetos\site-da-luci\frontend\src\components\BestiaryPlanner\CreatureCard.js) - Refatorar para actions inline
- `useUndoAction.js` (novo) - Undo pattern
- [BestiaryPlanner.js](c:\Users\NEXLAB\Documents\Projetos\site-da-luci\frontend\src\components\BestiaryPlanner\BestiaryPlanner.js) - Orquestração

### Feature 3 - Bulk Actions
- `useBulkSelection.js` (novo) - Selection state
- [BestiaryPlanner.js](c:\Users\NEXLAB\Documents\Projetos\site-da-luci\frontend\src\components\BestiaryPlanner\BestiaryPlanner.js) - Integration point
- [bestiaryStorage.js](c:\Users\NEXLAB\Documents\Projetos\site-da-luci\frontend\src\services\bestiaryStorage.js) - Bulk operations

### Feature 4 - Progress History
- [dailyProgressStorage.js](c:\Users\NEXLAB\Documents\Projetos\site-da-luci\frontend\src\services\dailyProgressStorage.js) - Storage layer
- `SimpleChart.js` (novo) - SVG charts
- `useProgressData.js` (novo) - Data aggregation

---

## 📝 Próximos Passos

1. **Revisar e aprovar plano** com o time
2. **Priorizar features** (se necessário implementar em fases)
3. **Criar issues** no GitHub para cada PR
4. **Começar implementação** pela Feature 1 (OCR)
5. **Code review** e testes em cada PR
6. **Deploy gradual** com feature flags (opcional)

---

**Fim do Plano de Implementação**

Para retomar o trabalho deste plano com o agente, use:
- Agent ID: `a63d58d`
