# Data-cy Naming Conventions

**Version**: 1.0
**Last Updated**: 2026-01-29
**Purpose**: Padronização de nomenclatura para atributos `data-cy` no site-da-luci

---

## 📋 Table of Contents

1. [Padrão Principal](#padrão-principal)
2. [Prefixos por Componente](#prefixos-por-componente)
3. [Sufixos por Tipo de Elemento](#sufixos-por-tipo-de-elemento)
4. [Regra CRÍTICA](#regra-crítica)
5. [Exemplos Práticos](#exemplos-práticos)
6. [Anti-patterns](#anti-patterns)
7. [Checklist de Validação](#checklist-de-validação)

---

## Padrão Principal

```
data-cy="{component}-{element}-{context}"
```

### Estrutura
- **component**: Identificador do componente React (kebab-case)
- **element**: Tipo de elemento UI (input, button, value, container)
- **context**: Contexto específico ou identificador único (opcional, mas recomendado)

### Exemplo
```jsx
<input
  data-cy="solo-hunt-balance-input"
  //       └─┬──┘ └──┬──┘ └──┬───┘
  //      component element context
/>
```

---

## Prefixos por Componente

Baseado nos componentes implementados no projeto:

| Prefixo | Componente | Localização |
|---------|-----------|-------------|
| `solo-hunt-*` | SoloHuntAnalyzer | `src/components/SoloHuntAnalyzer/` |
| `imbuement-*` | ImbuementCalculator | `src/components/ImbuementCalculator/` |
| `loot-split-*` | LootSplitCalculator | `src/components/LootSplitCalculator/` |
| `damage-healing-*` | DamageHealingCard | `src/components/LootSplitCalculator/DamageHealingCard.js` |
| `player-card-*` | PlayerCard | `src/components/LootSplitCalculator/PlayerCard.js` |
| `hunt-history-*` | HuntHistory | `src/components/SoloHuntAnalyzer/HuntHistory.js` |

### Regras de Prefixo

1. **Use o nome do componente principal**
   - ✅ `solo-hunt-balance-input` (dentro de SoloHuntAnalyzer)
   - ❌ `analyzer-balance-input`

2. **Mantenha consistência hierárquica**
   - Subcomponentes herdam o prefixo do pai
   - Exemplo: `PlayerCard` dentro de `LootSplitCalculator` usa `player-card-*`

3. **Kebab-case obrigatório**
   - ✅ `solo-hunt-session-duration`
   - ❌ `soloHuntSessionDuration`
   - ❌ `solo_hunt_session_duration`

---

## Sufixos por Tipo de Elemento

### Inputs (Campos de Entrada)

```jsx
data-cy="{component}-{field}-input"
```

**Exemplos**:
- `solo-hunt-balance-input`
- `imbuement-gold-cost-input`
- `loot-split-total-waste-input`
- `damage-healing-damage-dealt-input`

### Buttons (Botões de Ação)

```jsx
data-cy="{component}-{action}-button"
```

**Exemplos**:
- `solo-hunt-reset-button`
- `solo-hunt-save-hunt-button`
- `imbuement-calculate-button`
- `hunt-history-delete-button`

### Values (Valores Calculados/Exibidos)

```jsx
data-cy="{component}-{metric}-value"
data-cy="{component}-{metric}-cost"
data-cy="{component}-{metric}-percent"
```

**Exemplos**:
- `solo-hunt-balance-final` (valor final)
- `solo-hunt-profit-percent` (porcentagem)
- `imbuement-powerful-gt-cost` (custo específico)
- `loot-split-balance-value` (valor calculado)

### Containers (Agrupadores)

```jsx
data-cy="{component}-{section}-container"
data-cy="{component}-{section}-wrapper"
```

**Exemplos**:
- `solo-hunt-result-container`
- `imbuement-options-wrapper`
- `player-card-container`

---

## Regra CRÍTICA

> ⚠️ **ATENÇÃO OBRIGATÓRIA**
>
> **TODO valor calculado dinamicamente DEVE ter data-cy**
>
> Se um elemento exibe o resultado de um cálculo JavaScript (lucro, porcentagem, custo, balance), ele PRECISA de `data-cy` para testes Cypress validarem a lógica.

### Por quê?

Valores calculados são a **regra de negócio em ação**. Sem `data-cy`:
- ❌ Impossível testar cálculos end-to-end
- ❌ Bugs em fórmulas passam despercebidos
- ❌ Refatorações quebram testes silenciosamente

### Exemplos de Valores Calculados

```jsx
// ✅ CORRETO - Valor calculado com data-cy
<p data-cy="solo-hunt-balance-final">
  {calculatedBalance}
</p>

// ✅ CORRETO - Porcentagem calculada com data-cy
<p data-cy="solo-hunt-profit-percent">
  {profitPercent.toFixed(2)}%
</p>

// ❌ ERRADO - Valor calculado SEM data-cy
<p>{calculatedBalance}</p>
```

---

## Exemplos Práticos

### 1. SoloHuntAnalyzer

```jsx
// Inputs
<input data-cy="solo-hunt-balance-input" />
<input data-cy="solo-hunt-loot-input" />

// Valores Calculados
<p data-cy="solo-hunt-balance-final">{finalBalance}</p>
<p data-cy="solo-hunt-profit-percent">{profitPercent}%</p>
<p data-cy="solo-hunt-session-duration">{duration}</p>

// Botões
<button data-cy="solo-hunt-reset-button">Reset</button>
<button data-cy="solo-hunt-save-hunt-button">Salvar Hunt</button>
```

### 2. ImbuementCalculator

```jsx
// Inputs
<input data-cy="imbuement-gold-cost-input" />

// Valores Calculados (Custos)
<p data-cy="imbuement-powerful-gt-cost">{powerfulCost}</p>
<p data-cy="imbuement-intricate-gt-cost">{intricateCost}</p>
<p data-cy="imbuement-powerful-npc-cost">{npcCost}</p>

// Valores Calculados (Comparação)
<p data-cy="imbuement-best-option-value">{bestOption}</p>
```

### 3. LootSplitCalculator

```jsx
// Inputs (DamageHealingCard)
<input data-cy="damage-healing-damage-dealt-input" />
<input data-cy="damage-healing-healing-done-input" />

// Valores Calculados
<p data-cy="loot-split-damage-percent">{damagePercent}%</p>
<p data-cy="loot-split-healing-percent">{healingPercent}%</p>
<p data-cy="loot-split-balance-value">{balance}</p>
<p data-cy="loot-split-total-waste">{totalWaste}</p>
```

### 4. PlayerCard

```jsx
// Inputs
<input data-cy="player-card-player-name-input" />
<input data-cy="player-card-loot-amount-input" />

// Valores Calculados
<p data-cy="player-card-balance-value">{balance}</p>
<p data-cy="player-card-contribution-percent">{contribution}%</p>

// Botões
<button data-cy="player-card-remove-button">Remover</button>
```

### 5. HuntHistory

```jsx
// Containers
<div data-cy="hunt-history-container">
  <div data-cy="hunt-history-entry-0">
    <p data-cy="hunt-history-balance-0">{balance}</p>
    <p data-cy="hunt-history-duration-0">{duration}</p>
    <button data-cy="hunt-history-delete-0">Deletar</button>
  </div>
</div>
```

### 6. Exemplos com Listas/Índices

Quando há múltiplos elementos do mesmo tipo, usar índice numérico:

```jsx
{players.map((player, index) => (
  <div key={index} data-cy={`player-card-${index}`}>
    <input data-cy={`player-card-name-input-${index}`} />
    <p data-cy={`player-card-balance-${index}`}>{player.balance}</p>
  </div>
))}
```

---

## Anti-patterns

### ❌ O Que NÃO Fazer

#### 1. Nomes Genéricos Demais
```jsx
// ❌ ERRADO
<input data-cy="input1" />
<div data-cy="container" />
<p data-cy="value" />

// ✅ CORRETO
<input data-cy="solo-hunt-balance-input" />
<div data-cy="solo-hunt-result-container" />
<p data-cy="solo-hunt-profit-value" />
```

#### 2. Omitir data-cy em Valores Calculados
```jsx
// ❌ ERRADO - Valor calculado sem data-cy
<p>{calculatedProfit}</p>

// ✅ CORRETO
<p data-cy="solo-hunt-profit-value">{calculatedProfit}</p>
```

#### 3. Usar camelCase ou snake_case
```jsx
// ❌ ERRADO
<input data-cy="soloHuntBalanceInput" />
<input data-cy="solo_hunt_balance_input" />

// ✅ CORRETO
<input data-cy="solo-hunt-balance-input" />
```

#### 4. Prefixo Inconsistente
```jsx
// ❌ ERRADO - Componente SoloHuntAnalyzer mas prefixo diferente
<input data-cy="hunt-balance-input" />
<input data-cy="solo-balance-input" />

// ✅ CORRETO
<input data-cy="solo-hunt-balance-input" />
<input data-cy="solo-hunt-loot-input" />
```

#### 5. Duplicação de data-cy
```jsx
// ❌ ERRADO - Dois elementos com mesmo data-cy
<input data-cy="balance-input" /> {/* Player 1 */}
<input data-cy="balance-input" /> {/* Player 2 */}

// ✅ CORRETO
<input data-cy="player-card-balance-input-0" />
<input data-cy="player-card-balance-input-1" />
```

---

## Checklist de Validação

Ao adicionar `data-cy` a um componente, validar:

- [ ] **Padrão Correto**: Segue `{component}-{element}-{context}`?
- [ ] **Kebab-case**: Usa hífens (não camelCase ou snake_case)?
- [ ] **Prefixo Consistente**: Usa o prefixo do componente pai?
- [ ] **Valores Calculados**: TODOS os valores calculados têm data-cy?
- [ ] **Unicidade**: Nenhum data-cy duplicado no mesmo componente?
- [ ] **Descritivo**: Nome é descritivo o suficiente para entender o elemento?
- [ ] **Testável**: É possível escrever teste Cypress assertivo com este data-cy?

---

## Quando Adicionar data-cy

### Prioridade 1 (OBRIGATÓRIO)

- ✅ Inputs de formulário
- ✅ Valores calculados (balance, profit, percent, cost)
- ✅ Botões de ação
- ✅ Elementos que mudam dinamicamente

### Prioridade 2 (RECOMENDADO)

- ✅ Containers principais de seção
- ✅ Listas/Cards repetidos (com índice)
- ✅ Mensagens de erro/validação
- ✅ Modals/Dialogs

### Prioridade 3 (OPCIONAL)

- Labels estáticos (raramente testados)
- Elementos puramente decorativos
- Containers de layout genéricos

---

## Exemplos de Testes Cypress

Com `data-cy` bem nomeado, testes ficam legíveis:

```javascript
// Teste de cálculo de balance
cy.get('[data-cy="solo-hunt-balance-input"]').type('10000');
cy.get('[data-cy="solo-hunt-loot-input"]').type('15000');
cy.get('[data-cy="solo-hunt-balance-final"]').should('contain', '5000');

// Teste de comparação de imbuement
cy.get('[data-cy="imbuement-gold-cost-input"]').type('50000');
cy.get('[data-cy="imbuement-powerful-gt-cost"]').should('contain', '12500');
cy.get('[data-cy="imbuement-best-option-value"]').should('contain', 'GT Powerful');

// Teste de loot split
cy.get('[data-cy="damage-healing-damage-dealt-input"]').type('100000');
cy.get('[data-cy="loot-split-damage-percent"]').should('contain', '66.67%');
```

---

## Manutenção do Guia

Este guia deve ser atualizado quando:

1. **Novos componentes** são criados → Adicionar prefixo à tabela
2. **Novos tipos de elemento** surgem → Adicionar sufixo à lista
3. **Padrões mudam** → Atualizar exemplos práticos
4. **Anti-patterns encontrados** → Adicionar à seção de erros comuns

**Responsável**: documentation-agent via Architect (workflow automático)

---

**Encoding**: UTF-8
**Line Endings**: LF
**Model**: Sonnet
**Priority**: P1 (Testing)
