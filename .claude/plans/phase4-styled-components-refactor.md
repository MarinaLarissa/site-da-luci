# FASE 4 - Refatoração e Componentização de Styled-Components

**Data de criação**: 2026-01-19
**Status**: PLANEJAMENTO
**Dependência**: FASE 3 completa (CSS → styled-components migration 100%)
**Objetivo**: Reduzir duplicação, melhorar reuso e padronizar theme tokens

---

## Contexto

A migração CSS → styled-components foi concluída com sucesso (30/30 etapas). No entanto, durante a auditoria final (ETAPA 30), foram identificadas oportunidades significativas de refatoração para:

1. **Reduzir duplicação de código** (~500-800 linhas duplicadas)
2. **Padronizar theme tokens** (3 abordagens diferentes encontradas)
3. **Criar componentes compartilhados** (textareas, cards, modals)
4. **Melhorar manutenibilidade** e facilitar futuras alterações

---

## Problemas Identificados

### 1. Theme Inconsistency (CRÍTICO)

**Problema**: 3 abordagens diferentes de estilização coexistem:

| Componente | Abordagem | Exemplo |
|------------|-----------|---------|
| LootSplitCalculator | Theme tokens | `${({ theme }) => theme.colors.bg.primary}` |
| SoloHuntAnalyzer | Hardcoded colors | `#16213e`, `#c39bd3` |
| ImbuementCalculator | CSS variables | `const colors = { primaryLight: '#c39bd3' }` |

**Impacto**:
- Dificulta manutenção de cores
- Impossibilita theme switching futuro
- Código inconsistente

**Solução Proposta**:
- Consolidar em theme tokens único
- Migrar todos componentes para `theme.js`
- Remover hardcoded colors e CSS variables

---

### 2. Componentes Duplicados

#### 2.1 Textareas (2 implementações)

**Duplicação encontrada**:
```javascript
// SoloHuntAnalyzer/SessionDataInput.styles.js
export const SessionTextarea = styled.textarea`
  width: 100%;
  padding: 16px;
  background-color: #0f1620;
  border: 2px solid rgba(195, 155, 211, 0.3);
  color: #e0e0e0;
  font-family: 'Courier New', monospace;
  /* ... 15 linhas similares ... */
`;

// LootSplitCalculator/InputSection.styles.js
export const TextAreaStyled = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.bg.primary};
  border: 2px solid ${({ theme }) => theme.colors.accent.goldLight};
  /* ... 12 linhas similares ... */
`;
```

**Solução**: Criar `common/styled/Textarea.js` com props para customização

---

#### 2.2 SectionTitle (3+ implementações)

**Duplicação encontrada**:
- `SessionDataInput.styles.js`: `SectionTitle` (24px, #c39bd3)
- `InputSection.styles.js`: `SectionTitle` (24px, theme.colors.accent.gold)
- `ImbuementCalculator.styles.js`: `SectionTitle` (20px, colors.textPrimary)

**Solução**: Criar `common/styled/Typography.js` com componente `SectionTitle` customizável

---

#### 2.3 Card Containers (5+ implementações)

**Padrão comum**:
- Background color
- Border radius (8-12px)
- Padding (16-24px)
- Border (1px solid rgba)
- Box shadow (opcional)

**Solução**: Criar `common/styled/Card.js` com variantes

---

#### 2.4 Button Groups (2 implementações)

**Duplicação**:
- `SessionDataInput.styles.js`: `InputActions`
- `InputSection.styles.js`: `ButtonGroup`

**Solução**: Criar `common/styled/ButtonGroup.js`

---

#### 2.5 Modal Components (2 implementações)

**Duplicação**:
- `ImbuementCalculator.styles.js`: ModalOverlay, ModalContent
- Potencial reuso em futuras features

**Solução**: Criar `common/styled/Modal.js`

---

### 3. Oportunidades de Abstração

**Form Inputs** (4+ implementações):
- Input fields com focus states
- Labels com estilos consistentes
- Error states

**Icon Components**:
- `IconInline`, `IconSmall` aparecem em múltiplos lugares

**Grid Layouts**:
- Auto-fit grids com minmax aparecem 5+ vezes

---

## Plano de Execução - FASE 4

### ETAPA 31 - Consolidar Theme Tokens
**Estimativa**: 1-2h
**Prioridade**: ALTA (bloqueia outras etapas)

**Objetivos**:
1. Criar theme.js consolidado com todas as cores do projeto
2. Migrar ImbuementCalculator (CSS variables → theme)
3. Migrar SoloHuntAnalyzer (hardcoded → theme)
4. Garantir que LootSplitCalculator continua funcionando
5. Atualizar ThemeProvider no App.js se necessário

**Resultado Esperado**:
- 1 fonte única de verdade para cores/spacing
- 0 hardcoded colors nos .styles.js
- 0 CSS variables inline

---

### ETAPA 32 - Criar Shared Textarea Component
**Estimativa**: 30min
**Prioridade**: MÉDIA

**Objetivos**:
1. Criar `frontend/src/components/common/styled/Textarea.js`
2. Props: `monospace`, `minHeight`, `variant` (session/data)
3. Migrar SessionDataInput para usar Textarea compartilhado
4. Migrar InputSection para usar Textarea compartilhado

**Resultado Esperado**:
- ~20-30 linhas removidas
- 1 componente compartilhado

---

### ETAPA 33 - Criar Shared Typography Components
**Estimativa**: 45min
**Prioridade**: MÉDIA

**Objetivos**:
1. Criar `frontend/src/components/common/styled/Typography.js`
2. Componentes: SectionTitle, SectionDescription, PageTitle
3. Props: `size`, `color`, `weight`
4. Migrar 6+ componentes que usam títulos duplicados

**Resultado Esperado**:
- ~60-80 linhas removidas
- 3 componentes compartilhados

---

### ETAPA 34 - Criar Shared Card Component
**Estimativa**: 1h
**Prioridade**: MÉDIA

**Objetivos**:
1. Criar `frontend/src/components/common/styled/Card.js`
2. Variantes: default, elevated, outlined
3. Props: `padding`, `radius`, `shadow`
4. Migrar 5+ componentes que usam cards

**Resultado Esperado**:
- ~80-120 linhas removidas
- 1 componente compartilhado com variantes

---

### ETAPA 35 - Criar Shared ButtonGroup Component
**Estimativa**: 20min
**Prioridade**: BAIXA

**Objetivos**:
1. Criar `frontend/src/components/common/styled/ButtonGroup.js`
2. Props: `direction`, `gap`, `responsive`
3. Migrar InputActions e ButtonGroup duplicados

**Resultado Esperado**:
- ~30-40 linhas removidas
- 1 componente compartilhado

---

### ETAPA 36 - Criar Shared Modal Components
**Estimativa**: 1h
**Prioridade**: BAIXA

**Objetivos**:
1. Criar `frontend/src/components/common/styled/Modal.js`
2. Componentes: ModalOverlay, ModalContent, ModalHeader, ModalFooter
3. Props: `size`, `centered`, `closeOnOverlay`
4. Migrar modal do ImbuementCalculator

**Resultado Esperado**:
- ~50-70 linhas removidas
- 4 componentes compartilhados
- Preparado para futuras features com modals

---

### ETAPA 37 - Criar Shared Form Components
**Estimativa**: 1h
**Prioridade**: BAIXA

**Objetivos**:
1. Criar `frontend/src/components/common/styled/Form.js`
2. Componentes: FormInput, FormLabel, FormError
3. Props: `error`, `disabled`, `fullWidth`
4. Migrar inputs duplicados

**Resultado Esperado**:
- ~60-80 linhas removidas
- 3 componentes compartilhados

---

### ETAPA 38 - Criar Shared Icon Components
**Estimativa**: 20min
**Prioridade**: BAIXA

**Objetivos**:
1. Criar `frontend/src/components/common/styled/Icon.js`
2. Props: `size` (small, inline, medium, large)
3. Migrar IconInline, IconSmall duplicados

**Resultado Esperado**:
- ~20-30 linhas removidas
- 1 componente compartilhado

---

### ETAPA 39 - Documentar Padrões de Componentes
**Estimativa**: 1h
**Prioridade**: MÉDIA

**Objetivos**:
1. Criar `frontend/src/components/common/styled/README.md`
2. Documentar cada componente compartilhado
3. Exemplos de uso com props
4. Guidelines para quando criar novo componente shared

**Resultado Esperado**:
- Documentação completa
- Facilita onboarding de novos devs
- Previne duplicação futura

---

### ETAPA 40 - Validação Final e Auditoria FASE 4
**Estimativa**: 30min
**Prioridade**: ALTA

**Objetivos**:
1. Executar build e verificar tamanho do bundle
2. Executar lint sem erros
3. Verificar visualmente todos os componentes
4. Comparar linhas removidas vs adicionadas
5. Gerar relatório final

**Resultado Esperado**:
- Build passando
- Bundle size não aumentado significativamente
- Relatório de economia de linhas
- FASE 4 completa

---

## Métricas de Sucesso

| Métrica | Antes (FASE 3) | Meta (FASE 4) |
|---------|----------------|---------------|
| Linhas de código .styles.js | 4.052 | ~3.200-3.400 |
| Redução de código | - | 15-20% |
| Componentes compartilhados | 0 | 10-15 |
| Theme tokens consolidados | 3 abordagens | 1 abordagem |
| Hardcoded colors | ~150+ | 0 |
| Build time | Baseline | Não aumentar |
| Bundle size | 178.91 kB | <180 kB |

---

## Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Quebrar visual existente | Média | Alto | Validação visual em cada etapa |
| Aumentar bundle size | Baixa | Médio | Monitorar build size constantemente |
| Complexidade excessiva em shared | Média | Médio | Manter props simples, evitar over-engineering |
| Tempo maior que estimado | Média | Baixo | Priorizar ETAPAS 31-34, demais opcionais |

---

## Ordem de Execução Recomendada

**Prioridade ALTA** (fazer primeiro):
1. ETAPA 31 - Theme Tokens (bloqueia as demais)
2. ETAPA 40 - Validação Final

**Prioridade MÉDIA** (valor alto):
3. ETAPA 32 - Textarea
4. ETAPA 33 - Typography
5. ETAPA 34 - Card
6. ETAPA 39 - Documentação

**Prioridade BAIXA** (nice to have):
7. ETAPA 35 - ButtonGroup
8. ETAPA 36 - Modal
9. ETAPA 37 - Form
10. ETAPA 38 - Icon

---

## Decisão de Execução

A FASE 4 é **OPCIONAL** mas **ALTAMENTE RECOMENDADA**.

**Executar se**:
- Há tempo disponível (estimativa: 6-8h total)
- Equipe valoriza manutenibilidade de código
- Futuras features são planejadas (theme switching, novos componentes)

**Pular se**:
- Prazos apertados
- Projeto em manutenção mínima
- Prioridade em novas features vs refatoração

---

## Próximos Passos

Aguardando decisão do usuário:
1. **Executar FASE 4 completa** (todas as 10 etapas)
2. **Executar FASE 4 parcial** (apenas prioridade ALTA/MÉDIA)
3. **Pular FASE 4** (manter código atual como está)

---

**Status**: ⏸️ AGUARDANDO DECISÃO
