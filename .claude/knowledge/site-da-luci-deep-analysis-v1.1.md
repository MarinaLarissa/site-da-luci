# Site da Luci - Análise Profunda do Projeto (Deep Analysis)

> **Versão:** 1.1
> **Última Atualização:** 2026-01-23
> **Atualizado por:** Claude Code (Architect Agent + Meta-Improver Review)
> **Próxima Revisão:** Sob demanda ou quando houver mudanças significativas no projeto
> **Versão Anterior:** [v1.0 (2026-01-23)](./site-da-luci-deep-analysis-v1.0.md) - Análise inicial

---

## ⚠️ CORREÇÕES CRÍTICAS NESTA VERSÃO

**v1.1 corrige inconsistências críticas identificadas pelo Meta-Improver**:

1. 🔴 **CORREÇÃO**: Cypress version inconsistency
   - **Root package.json**: `^15.9.0` (instalado)
   - **Frontend package.json**: `^13.17.0` (declarado)
   - **Realidade**: Cypress **15.9.0 está instalado** (validado via `npx cypress --version`)
   - **Conflito**: Frontend esperaversão 13.x, mas root instalou 15.x (NPM workspaces)
   - **Ação Recomendada**: Alinhar ambos para 15.9.0 (ver seção "Decisões Pendentes")

2. 🔴 **CORREÇÃO**: Frontend version
   - **Anterior**: v1.0.0
   - **Correto**: **v0.1.0** (conforme frontend/package.json linha 3)

3. ⚠️ **ADICIONADO**: Disclaimers sobre métricas estimadas (ver seção "Assumptions & Limitations")

---

## 📋 ÍNDICE

1. [Visão Geral do Projeto](#visão-geral-do-projeto)
2. [Estrutura Técnica](#estrutura-técnica)
3. [Framework de Testes Atual](#framework-de-testes-atual)
4. [Análise de Complexidade](#análise-de-complexidade)
5. [CI/CD e Deploy](#cicd-e-deploy)
6. [Recomendações de Testes](#recomendações-de-testes)
7. [Gaps e Oportunidades](#gaps-e-oportunidades)
8. [Decisões Arquiteturais](#decisões-arquiteturais)
9. [⚠️ Assumptions & Limitations](#assumptions--limitations)
10. [🚨 Decisões Pendentes](#decisões-pendentes)

---

## 🎯 VISÃO GERAL DO PROJETO

### Tipo de Aplicação
- **Frontend**: React 19.2.3 SPA (Single Page Application)
- **Build Tool**: Create React App (react-scripts 5.0.1)
- **Backend**: Node.js 18+ com Express
- **Arquitetura Backend**: Clean Architecture (6-layer)
- **Monorepo**: NPM Workspaces

### Propósito
Calculadoras e ferramentas para jogadores de TIBIA MMORPG:
- Loot Split Calculator (divisão de hunt em party)
- Solo Hunt Analyzer (análise de hunts solo)
- Imbuement Calculator (cálculo de eficiência de imbuements)

### URLs de Produção
- **Frontend**: https://marinalarissa.github.io/site-da-luci
- **Backend**: https://site-da-luci-api.onrender.com

---

## 🏗️ ESTRUTURA TÉCNICA

### Dependências Principais

#### Frontend (v0.1.0) ✅ CORRIGIDO
```json
{
  "react": "^19.2.3",
  "react-dom": "^19.2.3",
  "react-scripts": "5.0.1",
  "styled-components": "^6.3.8",
  "axios": "^1.13.2",
  "i18next": "^25.7.3",
  "react-i18next": "^16.5.0",
  "i18next-browser-languagedetector": "^8.2.0"
}
```

#### Testes Frontend ⚠️ VERSÃO CYPRESS CONFLITANTE
```json
{
  "@testing-library/react": "^16.3.1",
  "@testing-library/jest-dom": "^6.9.1",
  "@testing-library/user-event": "^13.5.0",
  "cypress": "^13.17.0"  // ⚠️ Declarado, mas 15.9.0 instalado (root)
}
```

**🔴 ATENÇÃO**: Existe uma inconsistência de versão Cypress:
- **Root `package.json`**: `"cypress": "^15.9.0"` (linha 30)
- **Frontend `package.json`**: `"cypress": "^13.17.0"` (linha 66)
- **Instalado de fato**: **15.9.0** (validado via `npx cypress --version`)

**Impacto**: NPM workspaces instalou versão do root (15.9.0), ignorando frontend (13.17.0). Specs Cypress podem ter comportamento inesperado se usarem features de 15.x não compatíveis com 13.x.

**Decisão Pendente**: Ver seção "🚨 Decisões Pendentes" abaixo.

#### Backend (v1.0.0)
```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "helmet": "^8.1.0",
  "express-validator": "^7.3.1",
  "mongodb": "^6.3.0",
  "jest": "^29.7.0",
  "supertest": "^6.3.3",
  "nodemon": "^3.0.2"
}
```

### Estrutura de Pastas (Caminhos Absolutos)

```
c:\Users\NEXLAB\Documents\Projetos\site-da-luci\
├── .github\workflows\ci.yml              # CI/CD Pipeline
├── .husky\                                # Git Hooks (pre-commit)
├── backend\                               # Backend API (Node.js/Express)
│   ├── src\
│   │   ├── domain\entities\               # Player, LootSession, Transfer
│   │   ├── application\use-cases\         # Business logic
│   │   ├── infrastructure\parsers\        # TibiaLootParser
│   │   └── presentation\
│   │       ├── controllers\               # LootSplitController, SoloHuntController
│   │       ├── routes\                    # Express routes
│   │       ├── middlewares\               # Error handling, validation
│   │       └── utils\                     # Formatters
│   ├── tests\
│   │   ├── unit\                          # 6 test files
│   │   └── integration\                   # 1 test file
│   └── package.json
│
├── frontend\                              # Frontend React App
│   ├── public\
│   ├── src\
│   │   ├── components\                    # 61 arquivos JS/JSX
│   │   │   ├── common\                    # Button, ErrorMessage, LoadingSpinner, Tooltip
│   │   │   ├── HuntHistory\               # 6 componentes
│   │   │   ├── ImbuementCalculator\       # 4 componentes
│   │   │   ├── LanguageSelector\          # 1 componente + test
│   │   │   ├── Layout\                    # Sidebar
│   │   │   ├── LootSplitCalculator\       # 12 componentes
│   │   │   └── SoloHuntAnalyzer\          # 12 componentes
│   │   ├── hooks\                         # useLootSplit, useHuntHistory
│   │   ├── services\                      # api.js, huntHistory.js
│   │   ├── i18n\                          # i18n config
│   │   ├── locales\
│   │   │   ├── en\translation.json        # 413 linhas (198 keys)
│   │   │   └── pt-BR\translation.json     # 413 linhas (198 keys)
│   │   ├── styles\                        # GlobalStyles, theme
│   │   ├── utils\                         # clipboardUtils
│   │   └── App.js
│   └── package.json
│
├── cypress\                               # E2E Testing
│   ├── e2e\loot-split\
│   │   └── loot-split-calculator.cy.js    # 1 spec file (185 linhas)
│   ├── fixtures\                          # Test data
│   ├── support\                           # Custom commands
│   └── README.md
│
└── cypress.config.js                      # Configuração Cypress (root level)
```

### Componentes React (Total: ~29 componentes)

#### Por Feature:

**1. LootSplitCalculator (12 componentes)**
- `LootSplitCalculator.js` (Main)
- `InputSection.js`
- `ResultsSection.js`
- `PlayerList.js`, `PlayerCard.js`, `PlayerStatsRow.js`
- `TransferList.js`
- `DamageHealingSection.js`, `DamageHealingCard.js`

**2. SoloHuntAnalyzer (12 componentes)**
- `SoloHuntAnalyzer.js` (Main)
- `SessionDataInput.js`
- `ItemCostManager.js`
- `ConfigurationManager.js`
- `SoloHuntResults.js`
- `HuntHistory.js`

**3. ImbuementCalculator (4 componentes)**
- `ImbuementCalculator.js` (Main)
- `ImbuementBlock.js`

**4. Hunt History System (6 componentes)**
- `HuntHistoryDrawer.js`
- `HuntHistoryControls.js`
- `HuntHistoryItem.js`

**5. Layout & Common (8 componentes)**
- `Sidebar.js`
- `LanguageSelector.js`
- `Button`, `ErrorMessage`, `LoadingSpinner`, `Tooltip`
- Styled components: `Card`, `Modal`, `Textarea`, `Typography`, `ButtonGroup`

---

## 🧪 FRAMEWORK DE TESTES ATUAL

### Backend - Jest (✅ Bem Estruturado)

**Configuração**: `backend/package.json`
```json
{
  "jest": {
    "testEnvironment": "node",
    "coveragePathIgnorePatterns": ["/node_modules/"],
    "testMatch": ["**/tests/**/*.test.js"],
    "transform": {}
  }
}
```

**Estatísticas** (conforme README):
- **Total de Testes**: 64 testes passando
- **Test Suites**: 7 suites
- **Coverage**: 95.65%
- **Comando**: `npm run backend:test` ou `npm run backend:coverage`

**Breakdown dos Testes**:
```
tests/unit/domain/entities/
  ├── Player.test.js                      # 18 testes (Domain entities)
  ├── LootSession.test.js
  └── Transfer.test.js

tests/unit/infrastructure/parsers/
  └── TibiaLootParser.test.js             # 9 testes (Parser validation)

tests/unit/application/use-cases/loot-split/
  ├── CalculateLootSplitUseCase.test.js   # 22 testes (Business logic)
  └── ParseLootSessionUseCase.test.js

tests/integration/
  └── loot-split.api.test.js              # 15 testes (API integration)
```

### Frontend - Jest + React Testing Library (⚠️ Coverage Baixo)

**Testes Existentes** (4 arquivos):
```
frontend/src/App.test.js
frontend/src/components/common/Tooltip.test.js
frontend/src/components/LanguageSelector/LanguageSelector.test.js
frontend/src/components/LootSplitCalculator/TransferList.test.js
```

**Coverage Estimada**: <10% ⚠️ (4 de 79 arquivos JS/JSX - ver "Assumptions & Limitations")

**Comando**: `npm run frontend:test`

### E2E - Cypress 15.9.0 ⚠️ (Configurado, Coverage Parcial)

**⚠️ NOTA**: Análise assume comportamento de Cypress 13.17.0 (frontend package.json), mas **versão instalada é 15.9.0** (root package.json).

**Configuração**: `c:\Users\NEXLAB\Documents\Projetos\site-da-luci\cypress.config.js`
```javascript
{
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    video: false,
    screenshotOnRunFailure: true
  }
}
```

**Testes Implementados** (1 spec file - 185 linhas):

`cypress/e2e/loot-split/loot-split-calculator.cy.js`
- ✅ P0: Happy Path - Calculate split correctly for 3 players
- ✅ P0: Validation - Empty input handling, button states
- ✅ P1: Edge Cases - Load example data
- ✅ P1: I18n - PT-BR and EN translations
- ✅ P1: Hunt History Integration
- ✅ P2: Error Handling - Invalid data

**Custom Commands** (cypress/support/commands.js):
- `cy.setLanguage(language)` - Trocar idioma
- `cy.pasteLootData(lootData)` - Colar dados de sessão
- `cy.waitForCalculation()` - Aguardar cálculo

**Fixtures**:
- `cypress/fixtures/example-session.json` - Session de loot para testes

**Como Rodar**:
- Root: `npm run cypress:open` ou `npm run cypress:run`
- Frontend: `cd frontend && npm run cypress:open`

**Data-cy Attributes**: ⚠️ Mencionados no spec, não validados em todos componentes (ver "Assumptions & Limitations")

### ❌ Features SEM Testes E2E

1. **Solo Hunt Analyzer** (0 testes)
   - Input de session data
   - Item cost manager
   - Configuration manager
   - Results display

2. **Imbuement Calculator** (0 testes)
   - GT price input
   - Efficiency calculations
   - Imbuement blocks

3. **Hunt History CRUD** (parcialmente testado)
   - Salvar hunt (não testado)
   - Carregar hunt (não testado)
   - Deletar hunt (não testado)
   - Apenas botão de abertura testado

---

## 📊 ANÁLISE DE COMPLEXIDADE

### Métricas de Código

- **Total de arquivos JS/JSX**: 79 arquivos
- **Componentes React**: ~29 componentes funcionais
- **Styled Components**: 26 arquivos .styles.js
- **Hooks personalizados**: 2 (useLootSplit, useHuntHistory)
- **Arquitetura**: 100% Functional Components (0 class components)
- **useState/useEffect**: 91 ocorrências em 12 arquivos

### Features Complexas

#### ✅ Implementadas

1. **Forms & Validation**
   - Parsing de formato TIBIA específico (regex complexos)
   - Express-validator no backend
   - Client-side validation no frontend
   - Custom error messages

2. **State Management**
   - LOCAL STATE (useState, useEffect)
   - LocalStorage: Persistência de histórico de hunts, preços de tokens
   - Custom Hooks: useLootSplit, useHuntHistory
   - Props Drilling: Estado compartilhado via props
   - **NÃO USA**: Redux, Zustand, Context API global

3. **Complex Calculations**
   - Greedy two-pointer algorithm (loot split)
   - Fair share distribution
   - Balance calculations
   - Gold Token vs GP efficiency comparisons
   - Imbuement cost optimization

4. **Data Parsers**
   - TibiaLootParser (infrastructure layer)
   - Regex patterns complexos
   - Session metadata parsing
   - Player stats extraction
   - Error handling robusto

5. **Internacionalização (i18n)** ⭐ **COMPLETO**
   - i18next + react-i18next
   - **2 idiomas**: PT-BR e EN
   - **198 translation keys** (validadas via CI/CD)
   - **413 linhas** por arquivo de tradução
   - Language detector automático (localStorage + navigator)
   - LanguageSelector component
   - Validação automática de keys (script `validate-i18n.js`)

6. **File Operations**
   - Copy to clipboard (clipboard API)
   - Paste loot data (textarea)
   - LocalStorage export/import (hunt history)

#### ❌ NÃO Implementadas

1. **Authentication/Authorization** - Aplicação pública sem login
2. **Real-time Features** - Sem WebSockets, SSE ou polling
3. **Server-side Rendering (SSR)** - SPA puro

### APIs e Endpoints

**Backend Próprio (Express REST API):**
- **Base URL**: https://site-da-luci-api.onrender.com/api
- **Proxy Dev**: http://localhost:3001

**Endpoints Implementados**:
```javascript
// Loot Split Calculator
POST /api/loot-split/calculate
Body: { rawText: string }

// Solo Hunt Analyzer
POST /api/solo-hunt/calculate
Body: {
  parsedSession,
  customItems,
  goldTokenPrice,
  silverTokenPrice,
  ...
}

// Health Check
GET /api/health
```

**API Service Layer**: `frontend/src/services/api.js`
- Axios instance configurado
- Timeout: 10000ms
- Headers: application/json
- Environment-aware baseURL (production vs development)

---

## 🚀 CI/CD E DEPLOY

### GitHub Actions Pipeline

**Arquivo**: `c:\Users\NEXLAB\Documents\Projetos\site-da-luci\.github\workflows\ci.yml`

**Jobs**:

1. **frontend-validation**
   - Validates 198 translation keys (pt-BR vs en)
   - Runs ESLint
   - Builds frontend
   - Uploads build artifacts

2. **backend-tests**
   - Runs 64 tests with Jest
   - Generates coverage report (95.65%)
   - Uploads coverage artifacts

3. **deployment-check**
   - Validates deployment configuration
   - Checks package.json files

**Triggers**:
- Push to main/develop
- Pull requests to main/develop
- Manual workflow dispatch

### Ambientes de Produção

#### Frontend - GitHub Pages
- **URL**: https://marinalarissa.github.io/site-da-luci
- **Deploy**: `npm run deploy` (gh-pages package)
- **Branch**: gh-pages (auto-criada)
- **Homepage**: Configurado em frontend/package.json
- **Auto-deploy**: ❌ Manual (rodar `npm run deploy`)

#### Backend - Render
- **URL**: https://site-da-luci-api.onrender.com
- **Health Check**: https://site-da-luci-api.onrender.com/api/health
- **Auto-deploy**: ✅ Ativo (push to main)
- **Root Directory**: backend
- **Build Command**: npm install
- **Start Command**: npm start

**Environment Variables (Render)**:
```
NODE_ENV=production
PORT=3001 (overridden by Render)
FRONTEND_URL=https://marinalarissa.github.io/site-da-luci
```

### Pre-commit Hooks (Husky)

**Localização**: `c:\Users\NEXLAB\Documents\Projetos\site-da-luci\.husky\`

**Hooks Ativados**:
- Translation validation (validate-i18n)
- ESLint auto-fix on staged files
- Lint-staged integration

**Setup**: Automático via `npm run prepare`

### Scripts NPM

**Root** (`package.json`):
```json
{
  "scripts": {
    "prepare": "husky || true",
    "frontend:dev": "cd frontend && npm start",
    "frontend:build": "cd frontend && npm run build",
    "frontend:test": "cd frontend && npm test",
    "frontend:lint": "cd frontend && npm run lint",
    "frontend:validate-i18n": "cd frontend && npm run validate-i18n",
    "backend:dev": "cd backend && npm run dev",
    "backend:test": "cd backend && npm test",
    "backend:coverage": "cd backend && npm run test:coverage",
    "cypress:open": "npx cypress open",
    "cypress:run": "npx cypress run"
  }
}
```

---

## 🎯 RECOMENDAÇÕES DE TESTES

### Decisão: MANTER Cypress (Framework Atual)

**⚠️ NOTA**: Decisão baseada em comportamento de Cypress 13.17.0, mas versão instalada é 15.9.0. Ver "Decisões Pendentes" para resolver conflito.

#### ✅ Por que MANTER Cypress:

1. **Já configurado e funcionando** (cypress.config.js, custom commands, fixtures)
2. **1 spec file bem estruturado** (185 linhas, AAA pattern, boas práticas)
3. **Custom commands criados**: `pasteLootData`, `waitForCalculation`, `setLanguage`
4. **Data-cy attributes**: ⚠️ Mencionados no spec (validação completa pendente)
5. **Suporta E2E + Component Testing** (Cypress 10+)
6. **Debugging visual excelente** (time-travel, screenshots, videos)
7. **Curva de aprendizado menor** para time atual
8. **Documentação local** (cypress/README.md com guidelines)

#### ⚠️ Alternativa: Playwright

**Considerar migração APENAS SE**:
- Volume de testes E2E > 50 specs
- CI/CD time > 10-15 minutos ⚠️ (baseline não medido - ver "Assumptions & Limitations")
- Necessidade crítica de Safari/WebKit
- Team cresce significativamente (múltiplos devs rodando testes)

**Para análise detalhada Cypress vs Playwright**, consultar:
- `c:\Users\NEXLAB\Documents\Projetos\site-da-luci\.claude\docs\cypress-vs-playwright-decision-2026-01-23.md`

### Estratégia de Testes Recomendada

#### 🎯 Curto Prazo (1-2 meses)

**1. EXPANDIR Cypress E2E** (Alta Prioridade)

**Meta**: 6-8 spec files (~500-800 linhas)

**Specs a Criar**:

1. **Solo Hunt Analyzer** (2-3 specs)
   - `cypress/e2e/solo-hunt/solo-hunt-basic-flow.cy.js`
   - `cypress/e2e/solo-hunt/item-cost-manager.cy.js`
   - `cypress/e2e/solo-hunt/configuration-manager.cy.js`

2. **Imbuement Calculator** (1-2 specs)
   - `cypress/e2e/imbuement/imbuement-calculator.cy.js`

3. **Hunt History CRUD** (1 spec)
   - `cypress/e2e/hunt-history/hunt-history-crud.cy.js`

4. **Error Scenarios** (1 spec)
   - `cypress/e2e/errors/api-error-handling.cy.js`

5. **Cross-Component Workflows** (1 spec)
   - `cypress/e2e/workflows/end-to-end-user-journey.cy.js`

**2. ADICIONAR Component Testing com Cypress** (Média Prioridade)

**Meta**: 10-15 component tests

**Componentes a Testar**:
- `Button.cy.js`, `Tooltip.cy.js`, `PlayerCard.cy.js`
- `useLootSplit.cy.js`, `useHuntHistory.cy.js` (custom hooks)

**Setup**:
```bash
npm install --save-dev @cypress/react @cypress/webpack-dev-server
```

**3. MELHORAR Testes Unitários Frontend** (Média Prioridade)

**Meta**: Coverage > 50%

**Arquivos a Testar**:
- `src/hooks/useLootSplit.test.js`
- `src/hooks/useHuntHistory.test.js`
- `src/services/api.test.js`
- `src/utils/clipboardUtils.test.js`

**4. MANTER Testes Backend** (Baixa Prioridade)

**Status Atual**: ✅ Excelente (95.65% coverage, 64 testes)

#### 🎯 Longo Prazo (6+ meses)

**1. AVALIAR Migração para Playwright**
- Apenas se volume > 50 specs
- Ou CI/CD time > 10 min ⚠️ (medir baseline primeiro)
- Ou necessidade de WebKit

**2. ADICIONAR Visual Regression Testing**
- Percy, Chromatic, ou Cypress screenshots

**3. ADICIONAR Accessibility Testing** (Alto Impacto)
- `cypress-axe` (axe-core já está no node_modules)

**4. ADICIONAR Performance Testing** (Baixa Prioridade)
- Lighthouse CI para Core Web Vitals

### Coverage Goals

| Área | Atual | Meta Curto Prazo | Meta Longo Prazo |
|------|-------|------------------|------------------|
| Backend Unit | 95.65% | 95%+ | 95%+ |
| Frontend Unit | <10% ⚠️ | 50% | 70% |
| E2E (Features) | 33% (1/3) | 100% (3/3) | 100% + Workflows |
| Component | 0% | 30% | 50% |

---

## 🔍 GAPS E OPORTUNIDADES

### Coverage Gaps Identificados

#### Frontend Unit Tests
- **Atual**: 4 arquivos de teste para 79 arquivos JS/JSX
- **Coverage**: <10% ⚠️ (estimado - ver "Assumptions & Limitations")
- **Necessário**: Adicionar testes para hooks, services, utils

#### E2E Tests
- **Atual**: 1 spec file (Loot Split Calculator)
- **Coverage**: 33% (1 de 3 features principais)
- **Faltam**:
  - Solo Hunt Analyzer: 0 testes
  - Imbuement Calculator: 0 testes
  - Hunt History CRUD: Testes parciais

#### Integration Tests
- **Backend**: ✅ 15 testes de integração (bom)
- **Frontend-Backend**: ⚠️ Coberto via E2E (parcialmente)

### Oportunidades de Melhoria

**1. Expandir Cypress E2E** ⭐⭐⭐⭐⭐
- **Impacto**: Alto
- **Esforço**: Médio (2-4 semanas)
- **ROI**: Muito Alto

**2. Adicionar Component Testing** ⭐⭐⭐⭐
- **Impacto**: Médio-Alto
- **Esforço**: Médio (2-3 semanas)
- **ROI**: Alto

**3. Accessibility Testing** ⭐⭐⭐⭐
- **Impacto**: Alto (WCAG compliance)
- **Esforço**: Baixo (1 semana)
- **ROI**: Muito Alto

**4. Visual Regression Testing** ⭐⭐
- **Impacto**: Baixo-Médio
- **Esforço**: Alto (integração + manutenção)
- **ROI**: Médio

**5. Performance Testing** ⭐⭐
- **Impacto**: Baixo (app já é rápido)
- **Esforço**: Médio
- **ROI**: Baixo

**6. Migração para Playwright** ⭐
- **Impacto**: Baixo (no momento)
- **Esforço**: Alto (reescrever testes + CI/CD)
- **ROI**: Negativo (não vale a pena agora)

### Riscos Identificados

**1. Baixa Cobertura Frontend** 🔴
- **Risco**: Regressões não detectadas em componentes críticos
- **Mitigação**: Adicionar testes unitários para componentes common e hooks
- **Prioridade**: Alta

**2. Features sem E2E** 🔴
- **Risco**: Solo Hunt e Imbuement Calc podem quebrar sem detecção
- **Mitigação**: Adicionar specs Cypress para essas features
- **Prioridade**: Alta

**3. Versão Cypress inconsistente** 🔴
- **Risco**: Specs podem ter comportamento inesperado (15.9.0 vs 13.17.0)
- **Mitigação**: Alinhar versões (ver "Decisões Pendentes")
- **Prioridade**: Crítica (P0)

**4. Accessibility não testado** 🟡
- **Risco**: Barreiras de acessibilidade não detectadas
- **Mitigação**: Integrar cypress-axe
- **Prioridade**: Média

**5. Performance não monitorado** 🟡
- **Risco**: Degradação gradual de performance
- **Mitigação**: Lighthouse CI ou bundle size monitoring
- **Prioridade**: Baixa-Média

---

## 🏛️ DECISÕES ARQUITETURAIS

### ADR-001: Manter Cypress como Framework de E2E Testing

**Status**: ✅ ACEITO
**Data**: 2026-01-23
**Decisores**: Architect Agent + Meta-Improver Review

#### Contexto
O projeto site-da-luci precisa expandir cobertura de testes E2E. Cypress ⚠️ (versão inconsistente: 13.17.0 vs 15.9.0) está configurado com 1 spec file. Playwright é uma alternativa moderna e mais rápida.

#### Decisão
MANTER Cypress e expandir cobertura para 6-8 specs. Não migrar para Playwright no curto prazo.

#### Consequências

**Positivas**:
- ✅ Zero custo de migração
- ✅ Mantém conhecimento existente (custom commands, fixtures)
- ✅ Debugging visual superior (time-travel)
- ✅ Component Testing nativo (Cypress 10+)
- ✅ Menor curva de aprendizado

**Negativas**:
- ⚠️ Performance inferior ao Playwright (~30% mais lento)
- ⚠️ Cross-browser limitado (sem WebKit/Safari)

**Riscos Mitigados**:
- Reavaliar decisão se specs > 50 ou CI time > 10 min ⚠️ (baseline não medido)

#### Alternativas Consideradas
- **Playwright**: Descartado (alto custo de migração, baixo ROI)
- **TestCafe**: Descartado (menos popular que Cypress/Playwright)
- **Selenium**: Descartado (legado, complexo)

---

## ⚠️ ASSUMPTIONS & LIMITATIONS

**Esta seção lista premissas e limitações da análise. Métricas marcadas como "Estimado" devem ser validadas empiricamente antes de decisões críticas.**

### Métricas Estimadas (Não Medidas)

1. **CI/CD Time "~2 minutos"**
   - **Status**: ⚠️ ESTIMADO (não medido em pipeline real)
   - **Ação**: Rodar pipeline e cronometrar tempo total
   - **Impacto**: Critérios de reavaliação (10 min) dependem deste baseline

2. **Coverage Frontend "<10%"**
   - **Status**: ⚠️ ESTIMADO (4/79 files = 5%, mas % real não rodado)
   - **Ação**: Rodar `npm run frontend:test -- --coverage --watchAll=false`
   - **Impacto**: Meta de "50% coverage" pode ser mais fácil ou difícil que estimado

3. **Flaky Rate "0%"**
   - **Status**: ⚠️ NÃO RASTREADO (assumido com base em "sem problemas reportados")
   - **Ação**: Rastrear próximos 30 runs (data, spec, passou?, flaky?, motivo)
   - **Impacto**: Se flaky rate real > 5%, Playwright pode ser melhor opção

### Afirmações Não Validadas

1. **"Data-cy attributes implementados nos componentes principais"**
   - **Status**: ⚠️ NÃO VALIDADO (mencionado no spec, mas não grep'ado no código)
   - **Ação**: Rodar `git ls-files | grep -E "data-cy"` para confirmar
   - **Impacto**: Se poucos componentes têm data-cy, specs serão frágeis (usar cy.contains())

2. **"Custom commands criados (3 comandos)"**
   - **Status**: ⚠️ NÃO VALIDADO (mencionado, mas não lido `cypress/support/commands.js`)
   - **Ação**: Ler arquivo e contar comandos customizados
   - **Impacto**: Baixo (análise assume que existem)

3. **"Specs Cypress rodam em 15.9.0 sem problemas"**
   - **Status**: ⚠️ NÃO TESTADO (versão declarada é 13.17.0, instalada é 15.9.0)
   - **Ação**: Rodar `npm run cypress:run` e verificar se há avisos/erros
   - **Impacto**: Alto (breaking changes entre 13.x e 15.x podem existir)

### Limitações da Análise

1. **Análise baseada em arquivos, não em execução**
   - Não rodamos testes, apenas lemos configurações e specs
   - Métricas de performance (CI time, flaky rate) são estimativas

2. **Não validamos qualidade dos testes existentes**
   - 1 spec Cypress existe, mas não avaliamos se testa cenários críticos
   - 64 backend tests existem, mas não validamos edge cases

3. **Não analisamos código de produção em detalhes**
   - Contamos componentes, mas não avaliamos complexidade ciclomática
   - Identificamos hooks, mas não validamos se seguem boas práticas

### Recomendações para Próxima Análise

**Antes de v2.0, VALIDAR empiricamente:**
- [ ] Rodar pipeline CI/CD e medir tempo real
- [ ] Rodar coverage frontend (`npm test -- --coverage`)
- [ ] Verificar versão Cypress instalada (`npx cypress --version`) ✅ FEITO
- [ ] Grep data-cy attributes (`git ls-files | grep -E "data-cy"`)
- [ ] Ler `cypress/support/commands.js` e contar comandos
- [ ] Testar specs com Cypress 15.9.0 (`npm run cypress:run`)
- [ ] Rastrear flaky rate (30 runs, calcular %)

---

## 🚨 DECISÕES PENDENTES

**Esta seção lista decisões críticas que precisam ser tomadas antes de prosseguir com implementações.**

### ❗ P0: Resolver Conflito de Versão Cypress (CRÍTICO)

**Problema**:
- Root `package.json`: `"cypress": "^15.9.0"`
- Frontend `package.json`: `"cypress": "^13.17.0"`
- **Instalado de fato**: 15.9.0 (validado via `npx cypress --version`)

**Impacto**:
- Specs podem usar features de 15.x não existentes em 13.x (ou vice-versa)
- Deep Analysis e decisão Cypress vs Playwright baseados em 13.17.0
- Se atualizar para 15.x, podem haver breaking changes

**Opções**:

#### Opção A: Downgrade para 13.17.0 (RECOMENDADO - Mais Seguro)
```json
// Root package.json
"devDependencies": {
  "cypress": "^13.17.0"  // ✅ Downgrade
}

// Frontend package.json (sem mudança)
"devDependencies": {
  "cypress": "^13.17.0"
}
```

**Prós**:
- ✅ Mantém consistência com análise atual
- ✅ Menos risco de breaking changes
- ✅ Decisão Cypress vs Playwright permanece válida

**Contras**:
- ⚠️ Cypress 13.17.0 pode ter vulnerabilidades (15.9.0 é mais recente)
- ⚠️ Perde features de 14.x e 15.x

#### Opção B: Upgrade para 15.9.0 (Atualizar Análise)
```json
// Root package.json (sem mudança)
"devDependencies": {
  "cypress": "^15.9.0"
}

// Frontend package.json
"devDependencies": {
  "cypress": "^15.9.0"  // ✅ Upgrade
}
```

**Prós**:
- ✅ Versão mais recente (features, segurança)
- ✅ Alinha com o que já está instalado

**Contras**:
- ⚠️ Precisa testar specs (podem ter breaking changes)
- ⚠️ Precisa atualizar Deep Analysis (menciona 13.17.0 em vários lugares)
- ⚠️ Decisão Cypress vs Playwright pode mudar (se 15.x tiver novas features)

**Ações Necessárias**:

1. **DECIDIR** qual opção seguir (A ou B)
2. **SE Opção A**: Rodar `npm install cypress@^13.17.0` (root)
3. **SE Opção B**: Atualizar frontend/package.json e rodar `npm install`
4. **TESTAR**: Rodar `npm run cypress:run` e validar que specs passam
5. **ATUALIZAR**: Criar v1.2 do Deep Analysis se escolher Opção B
6. **COMMIT**: `fix: align Cypress versions (13.17.0)` ou `chore: upgrade Cypress to 15.9.0`

**Prazo**: ⚠️ URGENTE (antes de adicionar novos specs)

---

### ❗ P1: Validar Métricas de Performance

**Problema**:
- CI/CD time "~2 min" não foi medido
- Critérios de reavaliação (10 min) dependem deste baseline
- Se baseline estiver errado, decisões futuras podem ser incorretas

**Ações Necessárias**:

1. **Rodar pipeline CI/CD completo**:
   ```bash
   # Trigger CI via push ou manual workflow
   # Acessar GitHub Actions e cronometrar:
   # - frontend-validation (lint + build)
   # - backend-tests (jest)
   # - deployment-check
   ```

2. **Registrar tempos reais**:
   ```markdown
   ## CI/CD Baseline (Medido em 2026-01-24)

   - frontend-validation: ___ min
   - backend-tests: ___ min
   - deployment-check: ___ min
   - **Total**: ___ min
   ```

3. **Atualizar Deep Analysis v1.2** com tempos reais

**Prazo**: 📅 Esta Semana

---

### ❗ P2: Medir Coverage Frontend Real

**Problema**:
- Coverage "<10%" é estimativa (4/79 files)
- % real pode ser diferente (alguns files grandes, outros pequenos)

**Ações Necessárias**:

1. **Rodar coverage report**:
   ```bash
   cd frontend
   npm test -- --coverage --watchAll=false
   ```

2. **Registrar métricas reais**:
   ```markdown
   ## Frontend Coverage (Medido em 2026-01-24)

   - Statements: ___% (___/___)
   - Branches: ___% (___/___)
   - Functions: ___% (___/___)
   - Lines: ___% (___/___)
   ```

3. **Atualizar Deep Analysis v1.2**

**Prazo**: 📅 Esta Semana

---

## 📚 REFERÊNCIAS

### Arquivos Críticos

**Configuração de Testes**:
```
c:\Users\NEXLAB\Documents\Projetos\site-da-luci\cypress.config.js
c:\Users\NEXLAB\Documents\Projetos\site-da-luci\frontend\package.json
c:\Users\NEXLAB\Documents\Projetos\site-da-luci\backend\package.json
c:\Users\NEXLAB\Documents\Projetos\site-da-luci\package.json (root - Cypress 15.9.0)
```

**Testes Existentes**:
```
c:\Users\NEXLAB\Documents\Projetos\site-da-luci\cypress\e2e\loot-split\loot-split-calculator.cy.js
c:\Users\NEXLAB\Documents\Projetos\site-da-luci\backend\tests\
c:\Users\NEXLAB\Documents\Projetos\site-da-luci\frontend\src\App.test.js
```

**Componentes Principais**:
```
c:\Users\NEXLAB\Documents\Projetos\site-da-luci\frontend\src\components\LootSplitCalculator\LootSplitCalculator.js
c:\Users\NEXLAB\Documents\Projetos\site-da-luci\frontend\src\components\SoloHuntAnalyzer\SoloHuntAnalyzer.js
c:\Users\NEXLAB\Documents\Projetos\site-da-luci\frontend\src\components\ImbuementCalculator\ImbuementCalculator.js
```

**CI/CD**:
```
c:\Users\NEXLAB\Documents\Projetos\site-da-luci\.github\workflows\ci.yml
c:\Users\NEXLAB\Documents\Projetos\site-da-luci\.husky\
```

**Documentação**:
```
c:\Users\NEXLAB\Documents\Projetos\site-da-luci\README.md
c:\Users\NEXLAB\Documents\Projetos\site-da-luci\cypress\README.md
c:\Users\NEXLAB\Documents\Projetos\site-da-luci\DEPLOY.md
```

### Comandos Úteis

```bash
# Rodar testes backend
npm run backend:test
npm run backend:coverage

# Rodar testes frontend
npm run frontend:test
npm run frontend:test -- --coverage --watchAll=false  # Coverage report

# Rodar Cypress E2E
npm run cypress:open          # Interface gráfica
npm run cypress:run           # Headless (CI/CD)

# Validar traduções i18n
npm run frontend:validate-i18n

# Lint frontend
npm run frontend:lint
npm run frontend:lint:fix

# Deploy
cd frontend && npm run deploy  # Deploy to GitHub Pages

# Verificar versão Cypress instalada
npx cypress --version
```

---

## 🔄 HISTÓRICO DE ATUALIZAÇÕES

### v1.1 - 2026-01-23 (CORREÇÕES CRÍTICAS)

- 🔴 **CORREÇÃO CRÍTICA**: Cypress version inconsistency
  - Root package.json: ^15.9.0 (instalado de fato)
  - Frontend package.json: ^13.17.0 (declarado)
  - **Validado via**: `npx cypress --version` → 15.9.0
  - **Decisão Pendente**: Alinhar versões (ver "🚨 Decisões Pendentes")

- 🔴 **CORREÇÃO**: Frontend version
  - Anterior: v1.0.0
  - Correto: **v0.1.0** (conforme frontend/package.json linha 3)

- ⚠️ **ADICIONADO**: Seção "⚠️ Assumptions & Limitations"
  - CI/CD time (~2 min): Estimado, não medido
  - Coverage frontend (<10%): Estimado (4/79 files, não rodado coverage report)
  - Flaky rate (0%): Não rastreado
  - Data-cy attributes: Mencionados, não validados via grep
  - Custom commands (3): Mencionados, não lidos em commands.js

- ⚠️ **ADICIONADO**: Seção "🚨 Decisões Pendentes"
  - P0: Resolver conflito Cypress 13.17.0 vs 15.9.0 (crítico)
  - P1: Validar métricas de performance (CI/CD time)
  - P2: Medir coverage frontend real

- ✅ **VALIDADO**: Meta-Improver review completo
  - Score: 7.5/10 (Aprovado com ressalvas)
  - 3 padrões de degradação identificados e documentados
  - 5 propostas de melhoria implementadas

- 📊 **ADICIONADO**: Referências cruzadas
  - Link para v1.0 (versão anterior)
  - Link para decisão Cypress vs Playwright

### v1.0 - 2026-01-23 (ANÁLISE INICIAL)

- ✅ Análise profunda inicial do projeto site-da-luci
- ✅ Mapeamento completo de estrutura técnica
- ✅ Avaliação de frameworks de testes (Cypress vs Playwright)
- ✅ Recomendação: Manter Cypress e expandir cobertura
- ✅ Identificação de gaps e oportunidades
- ✅ Criação de ADR-001 (Manter Cypress)
- ✅ Definição de estratégia de testes (curto e longo prazo)

### Próximas Atualizações Esperadas

- [ ] v1.2: Resolver decisão Cypress version (P0)
- [ ] v1.2: Adicionar métricas reais (CI/CD time, coverage frontend)
- [ ] v1.2 ou v1.3: Atualizar após adicionar novos specs Cypress
- [ ] v2.0: Se migrar para Playwright (não esperado no curto prazo)
- [ ] v2.0: Se implementar Component Testing (esperado em 3-4 meses)

---

**FIM DO DOCUMENTO**

> **⚠️ ATENÇÃO**: Este documento contém correções críticas identificadas pelo Meta-Improver. Antes de tomar decisões arquiteturais, resolver "🚨 Decisões Pendentes" (especialmente P0: Cypress version).
>
> Este documento é mantido manualmente. Antes de fazer análises profundas do projeto site-da-luci, sempre consulte este arquivo primeiro e atualize-o se necessário (ver `DEEP_ANALYSIS_VALIDATION_PROTOCOL.md`).
