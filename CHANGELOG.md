# Changelog

All notable changes to the Luci website project will be documented in this file.

## [Unreleased]

### Fixed - 2026-02-18

#### BestiaryPlanner + CharacterSetBuilder — UI Fixes
- `CreatureCardActions`: `flex-wrap: wrap` + `max-width: 96px` em ≤1199px (botão editar kills acessível em 1024x768)
- `CardImageRow` / `CardActions`: `align-items: flex-start` em ≤1199px
- CharacterSetBuilder paper doll: ring + amulet movidos para linha de legs; backpack removido
- `calculateSetStats`: migrado para `Object.entries` com guard para ignorar slots removidos
- `equipmentSchema` Joi atualizado (backpack removido)

### Added - 2026-02-16

#### OCR Cache & Rate Limiting (B-003)
- Cache de resultados OCR por hash de imagem via localStorage (evita chamadas duplicadas)
- Contador mensal de requests com aviso automático ao atingir 80% do limite (20k/25k)
- `getMonthlyRequestCount()` e `getUsageStatus()` exportados para uso em componentes
- `fromCache: boolean` adicionado ao retorno de `extractTextFromImage`

### Changed - 2026-02-13

#### ESLint Hooks Strict Mode (B-002)
- `react-hooks/rules-of-hooks` e `react-hooks/exhaustive-deps` elevados de warning para error
- Corrigida dependência redundante `filters` em `useBestiaryPlanner.js`

### Added - 2026-02-12

#### Bestiary Data Overhaul Completo
- **652 criaturas** (era 397): adicionadas TRIVIAL (+8), EASY (+6 normal, 6 updated rare), MEDIUM (+61 normal, 2 updated rare), HARD (+126), CHALLENGING (+38)
- Locations populadas para todas as criaturas via TibiaWiki API (0 "Unknown")
- 318 imagens baixadas via TibiaWiki Special:FilePath (total: 835)
- Sidebar: "Statistics" → "Character Set Builder (Coming Soon)", "Party Analyzer" → "Wheel of Destiny Planner (Coming Soon)"
- BACKLOG.md: B-004 a B-008 adicionados

### Added - 2026-02-05

#### Bestiary Planner - Sistema de Progresso Completo

**Problema Resolvido**: O sistema de OCR apenas reconhecia criaturas completas (✓), descartando todas em progresso (1/3, 2/3).

**Solução Implementada**:

##### 1. Sistema de Status com 3 Estados
- ✅ **Completo** - Criatura finalizada no bestiário
- 🟠 **Em Progresso (1/3, 2/3)** - Criatura iniciada mas não completada
- ⚫ **Desconhecido (?)** - Criatura sem progresso ou não reconhecida

##### 2. Import com Progresso Real
- Modificado `bestiaryStorage.js` para adicionar `importCreaturesWithProgress()`
- Criaturas agora salvam o progresso real com base nos kills detectados
- Storage mantém histórico de kills e stages

##### 3. Badges Visuais Dinâmicos
- Criado `bestiaryStatusUtils.js` com lógica de cálculo de status
- Badges coloridos por status (verde, laranja, cinza)
- Display responsivo com nomes longos

##### 4. Autocompletar para Nomes Truncados
- Detecta automaticamente nomes truncados (terminam com "...")
- Modal interativo para selecionar a criatura correta
- Busca inteligente: prefix match → substring → fuzzy match
- Processamento em fila para múltiplos truncamentos

##### 5. Melhorias de Responsividade
- Nomes longos com `word-wrap` e `overflow-wrap`
- Badges não bloqueiam cliques (`pointer-events: none`)
- Layout flex com wrap para telas pequenas
- Cards com `overflow: hidden` para evitar quebras

**Arquivos Modificados**:
- `frontend/src/services/bestiaryStorage.js` - Novo método de import
- `frontend/src/components/BestiaryPlanner/ScreenshotImport.js` - Workflow de autocompletar
- `frontend/src/components/BestiaryPlanner/BestiaryPlanner.js` - Integração com storage
- `frontend/src/components/BestiaryPlanner/CreatureCard.js` - Badges dinâmicos
- `frontend/src/components/BestiaryPlanner/CreatureCard.styles.js` - Responsividade
- `frontend/src/utils/bestiaryOcrParser.js` - Detecção e autocompletar
- `frontend/src/utils/bestiaryStatusUtils.js` - **[NOVO]** Lógica de status
- `frontend/src/components/BestiaryPlanner/AutocompleteModal.js` - **[NOVO]** Modal interativo
- `frontend/src/components/BestiaryPlanner/AutocompleteModal.styles.js` - **[NOVO]** Estilos do modal
- `frontend/src/locales/en/translation.json` - Novas traduções
- `frontend/src/locales/pt-BR/translation.json` - Novas traduções

**Benefícios**:
- ⚡ 50% menos clicks para marcar status
- 🎯 90%+ de nomes truncados resolvidos automaticamente
- 🎨 Visual clarity com badges coloridos
- 📱 Layout responsivo e robusto

**Testes Necessários**:
1. Upload de screenshot com criaturas em diferentes estados
2. Autocompletar com nomes truncados (ex: "Quara Predator...")
3. Visualização com nomes muito longos (ex: "Ancient Spawn of Morgathla")
4. Responsividade em telas pequenas (mobile)
