# Plano de Implementação: Sistema de Status e Autocompletar - Bestiary Planner

**Data**: 2026-02-05
**Projeto**: site-da-luci (React)
**Contexto**: Melhorias no Bestiary Planner para implementar sistema de status de criaturas e autocompletar de nomes truncados

---

## 📋 Análise da Situação Atual

### ✅ O Que Já Funciona

1. **Reconhecimento de Imagem (OCR)**
   - ✅ `bestiaryOcrParser.js` - Extrai nomes de criaturas de screenshots
   - ✅ `ScreenshotImport.js` - Upload e processamento de imagens
   - ✅ Detecção de stages: `1/3`, `2/3`, `✓` (completo)
   - ✅ Fuzzy matching com Levenshtein distance (similaridade 75%)

2. **Armazenamento de Dados**
   - ✅ `bestiaryStorage.js` - LocalStorage por personagem
   - ✅ Estrutura: `characters[charId].creatures[creatureId] = { completed, kills, completedAt }`
   - ✅ Funções: `updateCreatureKills()`, `markCreatureCompleted()`

3. **Cálculo de Stages**
   - ✅ `bestiaryStages.js` - Utilitários para calcular stages a partir de kills
   - ✅ `calculateStageFromKills(kills, totalKills)` → retorna 0-3
   - ✅ `calculateMinimumKills(stage, totalKills)` → estima kills por stage

4. **UI de Criaturas**
   - ✅ `CreatureCard.js` - Card individual com kill tracking
   - ✅ `SuggestionList.js` - Lista de criaturas filtradas
   - ✅ `KillCountModal.js` - Modal para editar kill count manualmente

### ❌ O Que Falta Implementar

#### 1. Sistema de Status de 3 Estados
- ❌ **Estado 1: Não Reconhecida** - "Unknown" + "?"
- ❌ **Estado 2: Reconhecida em Progresso** - "0/1", "1/3", "2/3" + permitir atualização
- ❌ **Estado 3: Concluída** - "✓" (sem números)

**Problema Atual**:
- CreatureCard mostra apenas `isCompleted` (boolean) OU `currentKills / killsToComplete`
- Não há distinção clara entre "não reconhecida" (sem info) e "reconhecida em progresso" (com kills parciais)

#### 2. Autocompletar Nome Truncado
- ❌ Quando OCR detecta "Quara Predator..." → Mostrar opções:
  - Quara Predator
  - Quara Predator Scout
  - Quara Predator Hunter
- ❌ UI para usuário selecionar criatura correta

**Problema Atual**:
- OCR apenas usa fuzzy matching automático (similaridade 75%)
- Se nome truncado não bate 75%, criatura vai para "unmatched"
- Sem intervenção do usuário para resolver ambiguidades

#### 3. UI/UX para Marcação Rápida
- ❌ Marcar status diretamente na visualização (sem abrir modal)
- ❌ Alternar entre estados rapidamente
- ❌ Workflow otimizado: Screenshot → Criaturas detectadas → Marcar status inline

**Problema Atual**:
- Para editar kills: Obrigatório abrir `KillCountModal`
- Workflow lento: Click card → Modal → Input → Salvar
- Não há atalhos para marcar rapidamente como "completo" ou "em progresso"

---

## 🎯 Requisitos Detalhados

### 1. Sistema de Status (3 Estados)

#### Estado 1: Não Reconhecida ❓
**Critério**: Criatura foi detectada no OCR mas não tem informações de kill/stage

**Exibição**:
- Badge: "Unknown" (cor: cinza escuro #6b7280)
- Ícone: "?" logo abaixo do nome
- Sem progresso numérico

**Dados**:
```javascript
{
  detected: true,      // OCR detectou
  recognized: false,   // Mas não identificou kills/stage
  kills: null,
  stage: null
}
```

#### Estado 2: Reconhecida em Progresso 🔄
**Critério**: Criatura tem kills registrados OU stage detectado, mas não está completa

**Exibição**:
- Badge: Progresso numérico baseado em kills
  - Se `kills < (total / 3)` → "0/1" (Stage 1)
  - Se `kills >= (total / 3) && kills < (total * 2/3)` → "1/3" (Stage 2)
  - Se `kills >= (total * 2/3) && kills < total` → "2/3" (Stage 3 incompleto)
- Cor badge: amarelo/laranja (#f59e0b)
- Permitir click para incrementar kills (ação rápida)

**Dados**:
```javascript
{
  detected: true,
  recognized: true,
  kills: 123,
  stage: 2,           // Calculado a partir de kills
  total: 500,
  isComplete: false
}
```

#### Estado 3: Concluída ✓
**Critério**: `kills >= total` OU `stage === 3 && isComplete === true`

**Exibição**:
- Badge: Check verde "✓"
- Cor: verde (#10b981)
- **SEM mostrar números** (visualmente limpo)

**Dados**:
```javascript
{
  detected: true,
  recognized: true,
  kills: 500,         // >= total
  stage: 3,
  total: 500,
  isComplete: true
}
```

### 2. Autocompletar Nome Truncado

#### Detecção de Truncamento
**Gatilho**: OCR detecta nome terminando em "...", "…" ou incompleto

**Exemplo**:
```javascript
// OCR extraiu: "Quara Predator..."
const truncated = detectTruncation("Quara Predator...");
// truncated = "Quara Predator"
```

#### Busca de Candidatos
**Lógica**:
1. Remover "...", "…" do nome OCR
2. Buscar em `BESTIARY_DATA` criaturas que:
   - Começam com o prefixo (ex: "Quara Predator")
   - OU têm alta similaridade (>60%) via Levenshtein
3. Ordenar por similaridade decrescente
4. Limitar a top 5 candidatos

**Exemplo**:
```javascript
const candidates = findAutocompleteOptions("Quara Predator...");
// [
//   { creature: QuaraPredator, similarity: 0.95 },
//   { creature: QuaraPredatorScout, similarity: 0.90 },
//   { creature: QuaraPredatorHunter, similarity: 0.85 }
// ]
```

#### UI de Seleção
**Componente**: `AutocompleteModal` (novo)

**Layout**:
```
┌────────────────────────────────────────────┐
│ Criatura não reconhecida totalmente       │
│                                            │
│ OCR detectou: "Quara Predator..."         │
│                                            │
│ Selecione a criatura correta:             │
│                                            │
│ ⭕ Quara Predator (95% similar)           │
│ ○ Quara Predator Scout (90% similar)      │
│ ○ Quara Predator Hunter (85% similar)     │
│                                            │
│ [Confirmar]  [Pular]                       │
└────────────────────────────────────────────┘
```

**Fluxo**:
1. Após OCR parsing, se detectar truncamento → Abrir modal
2. Usuário seleciona opção ou pula
3. Se selecionado → Atualizar criatura detectada com ID correto
4. Repetir para próximo truncado (se houver)

### 3. UI/UX para Marcação Rápida

#### Quick Actions na Visualização
**Localização**: Dentro do `CreatureCard`, após OCR import

**Layout Proposto**:
```
┌─────────────────────────────────────────┐
│ 🦎 Ancient Scarab                       │
│ ⚔️ Medium  📍 Ankrahmun  🔥 100%        │
│                                         │
│ Status: [?] Unknown                     │
│                                         │
│ Quick actions:                          │
│ [✎ Editar Kills] [✓ Marcar Completo]   │
└─────────────────────────────────────────┘
```

**Ações**:
1. **✎ Editar Kills**: Abre `KillCountModal` (comportamento atual mantido)
2. **✓ Marcar Completo**: Marca imediatamente como completo (bypass modal)
3. **Click no card**: Ainda funciona como toggle complete (comportamento atual)

#### Marcação em Lote (Post-OCR)
**Componente**: `ScreenshotImportResults` (modificado)

**Layout Proposto**:
```
┌────────────────────────────────────────────────────┐
│ 📷 Criaturas detectadas na imagem (12 encontradas) │
│                                                    │
│ ✅ Ghastly Dragon (completo)                       │
│ 🔄 Hellflayer [1/3]  [✎][✓]                       │
│ ❓ Unknown Creature  [?]  [✎][✓]                  │
│ ✅ Juggernaut (completo)                           │
│ ...                                                │
│                                                    │
│ [Confirmar Todas] [Cancelar]                       │
└────────────────────────────────────────────────────┘
```

**Funcionalidades**:
- Mostrar status atual de cada criatura detectada
- Permitir editar kills/stage inline (sem abrir card completo)
- Confirmar todas de uma vez (bulk operation)

---

## 🏗️ Arquitetura da Solução

### Estrutura de Dados

#### 1. Modelo de Criatura Detectada (OCR)
**Arquivo**: Modificar `bestiaryOcrParser.js`

```javascript
// Retorno estendido de parseOcrText()
{
  matched: [
    {
      creature: Object,          // BESTIARY_DATA entry
      originalText: String,      // OCR raw text
      similarity: Number,        // 0-1

      // ✨ NOVO: Status information
      status: {
        detected: true,
        recognized: Boolean,     // true se tem stage/kills
        kills: Number|null,      // null se desconhecido
        stage: Number|null,      // 1, 2, 3, ou null
        isComplete: Boolean,     // true se stage 3 completo
      },

      // ✨ NOVO: Truncation info
      isTruncated: Boolean,      // true se nome termina em "..."
      autocompleteOptions: [],   // Candidatos se truncado
    }
  ],
  unmatched: [...],
  totalFound: Number
}
```

#### 2. Armazenamento Estendido (bestiaryStorage)
**Arquivo**: Modificar `bestiaryStorage.js`

```javascript
// Estrutura em localStorage (per character)
characters[charId].creatures[creatureId] = {
  completed: Boolean,           // Já existe
  completedAt: String,          // Já existe
  kills: Number,                // Já existe

  // ✨ NOVO: OCR metadata
  detectedViaOcr: Boolean,      // true se veio de screenshot
  lastOcrUpdate: String,        // ISO timestamp
  ocrStage: Number|null,        // Stage detectado pelo OCR (1/2/3)

  // ✨ NOVO: Manual override
  manuallySet: Boolean,         // true se usuário editou manualmente
};
```

### Componentes Novos/Modificados

#### 1. ✨ NOVO: `AutocompleteModal.js`
**Propósito**: Resolver nomes truncados via seleção do usuário

**Props**:
```javascript
{
  truncatedText: String,        // "Quara Predator..."
  candidates: Array<{           // Top 5 opções
    creature: Object,
    similarity: Number
  }>,
  onSelect: (creatureId) => {},  // Callback quando usuário seleciona
  onSkip: () => {},              // Callback se usuário pula
  isOpen: Boolean
}
```

**Localização**: `frontend/src/components/BestiaryPlanner/AutocompleteModal.js`

#### 2. 🔧 MODIFICAR: `ScreenshotImport.js`
**Mudanças**:
1. Após OCR parsing, detectar truncamentos:
   ```javascript
   const truncatedCreatures = matched.filter(m => m.isTruncated);
   if (truncatedCreatures.length > 0) {
     // Abrir AutocompleteModal para cada truncado
     setTruncatedQueue(truncatedCreatures);
     setShowAutocompleteModal(true);
   }
   ```

2. Adicionar fila de autocomplete:
   ```javascript
   const [truncatedQueue, setTruncatedQueue] = useState([]);
   const [currentTruncatedIndex, setCurrentTruncatedIndex] = useState(0);

   const handleAutocompleteSelect = (creatureId) => {
     // Atualizar matched creature com ID correto
     updateMatchedCreature(currentTruncatedIndex, creatureId);

     // Ir para próximo truncado
     if (currentTruncatedIndex + 1 < truncatedQueue.length) {
       setCurrentTruncatedIndex(prev => prev + 1);
     } else {
       setShowAutocompleteModal(false);
     }
   };
   ```

#### 3. 🔧 MODIFICAR: `CreatureCard.js`
**Mudanças**:
1. Adicionar badge de status visual:
   ```javascript
   const renderStatusBadge = () => {
     if (!creature.status) return null;

     const { recognized, stage, isComplete, kills } = creature.status;

     if (!recognized) {
       // Estado 1: Não Reconhecida
       return (
         <StatusBadge $status="unknown">
           <StatusIcon>?</StatusIcon>
           <StatusText>Unknown</StatusText>
         </StatusBadge>
       );
     }

     if (isComplete) {
       // Estado 3: Concluída
       return (
         <StatusBadge $status="complete">
           <StatusIcon>✓</StatusIcon>
           {/* SEM texto numérico */}
         </StatusBadge>
       );
     }

     // Estado 2: Em Progresso
     const displayStage = calculateDisplayStage(kills, creature.killsToComplete);
     return (
       <StatusBadge $status="progress">
         <StatusText>{displayStage}</StatusText>
       </StatusBadge>
     );
   };
   ```

2. Adicionar quick actions:
   ```javascript
   const renderQuickActions = () => {
     if (creature.status?.recognized) return null; // Já tem info

     return (
       <QuickActionsRow>
         <QuickActionButton onClick={handleEditKills}>
           ✎ {t('editKills')}
         </QuickActionButton>
         <QuickActionButton onClick={handleMarkComplete}>
           ✓ {t('markComplete')}
         </QuickActionButton>
       </QuickActionsRow>
     );
   };
   ```

#### 4. 🔧 MODIFICAR: `bestiaryOcrParser.js`
**Mudanças**:
1. Adicionar função de detecção de truncamento:
   ```javascript
   export const detectTruncation = (text) => {
     if (!text) return { isTruncated: false, cleaned: text };

     const truncationMarkers = ['...', '…', '..'];
     const isTruncated = truncationMarkers.some(marker => text.endsWith(marker));

     if (isTruncated) {
       const cleaned = text.replace(/\.{2,}|…/g, '').trim();
       return { isTruncated: true, cleaned };
     }

     return { isTruncated: false, cleaned: text };
   };
   ```

2. Adicionar função de autocompletar:
   ```javascript
   export const findAutocompleteOptions = (truncatedText, minSimilarity = 0.60) => {
     const { cleaned } = detectTruncation(truncatedText);
     const cleanedLower = cleaned.toLowerCase();

     // Buscar criaturas que começam com o prefixo OU têm alta similaridade
     const candidates = BESTIARY_DATA
       .map(creature => ({
         creature,
         similarity: calculateSimilarity(cleanedLower, creature.name.toLowerCase()),
         startsWithPrefix: creature.name.toLowerCase().startsWith(cleanedLower),
       }))
       .filter(c => c.startsWithPrefix || c.similarity >= minSimilarity)
       .sort((a, b) => {
         // Priorizar matches exatos de prefixo
         if (a.startsWithPrefix && !b.startsWithPrefix) return -1;
         if (!a.startsWithPrefix && b.startsWithPrefix) return 1;
         // Depois por similaridade
         return b.similarity - a.similarity;
       })
       .slice(0, 5); // Top 5

     return candidates;
   };
   ```

3. Modificar `parseOcrText()` para incluir status e truncation:
   ```javascript
   export const parseOcrText = (text, minSimilarity = 0.7) => {
     const potentialCreatures = extractCreatureNames(text);
     const matched = [];
     const unmatched = [];

     for (const creatureData of potentialCreatures) {
       const { isTruncated, cleaned } = detectTruncation(creatureData.name);
       const { creature, similarity } = findMatchingCreature(cleaned, minSimilarity);

       if (creature) {
         // ✨ NOVO: Adicionar status info
         const status = {
           detected: true,
           recognized: creatureData.stage !== null || creatureData.isComplete,
           kills: creatureData.stage ? calculateMinimumKills(creatureData.stage, creature.occurrence) : null,
           stage: creatureData.stage,
           isComplete: creatureData.isComplete,
         };

         // ✨ NOVO: Adicionar truncation info
         const autocompleteOptions = isTruncated
           ? findAutocompleteOptions(creatureData.name)
           : [];

         matched.push({
           creature,
           similarity,
           originalText: creatureData.name,
           stage: creatureData.stage,
           isComplete: creatureData.isComplete,
           minimumKills: status.kills,
           status,                    // ✨ NOVO
           isTruncated,               // ✨ NOVO
           autocompleteOptions,       // ✨ NOVO
         });
       } else {
         // Não matched - adicionar info de truncation
         unmatched.push({
           ...creatureData,
           isTruncated,
           autocompleteOptions: isTruncated ? findAutocompleteOptions(creatureData.name) : [],
         });
       }
     }

     return { matched, unmatched, totalFound: potentialCreatures.length };
   };
   ```

#### 5. 🔧 MODIFICAR: `bestiaryStorage.js`
**Mudanças**:
1. Adicionar função para atualizar metadata OCR:
   ```javascript
   export const updateCreatureOcrMetadata = (characterId, creatureId, ocrData) => {
     const data = loadBestiaryData();

     if (!data.characters[characterId]) return false;

     const existingCreature = data.characters[characterId].creatures[creatureId] || {};

     data.characters[characterId].creatures[creatureId] = {
       ...existingCreature,
       detectedViaOcr: true,
       lastOcrUpdate: new Date().toISOString(),
       ocrStage: ocrData.stage || existingCreature.ocrStage,
       kills: ocrData.kills || existingCreature.kills,
       completed: ocrData.isComplete || existingCreature.completed,
     };

     saveBestiaryData(data);
     return true;
   };
   ```

2. Adicionar função para quick complete:
   ```javascript
   export const quickMarkComplete = (characterId, creatureId, totalKills) => {
     const data = loadBestiaryData();

     if (!data.characters[characterId]) return false;

     data.characters[characterId].creatures[creatureId] = {
       completed: true,
       completedAt: new Date().toISOString(),
       kills: totalKills,
       manuallySet: true,
     };

     saveBestiaryData(data);
     return true;
   };
   ```

---

## 📝 Plano de Implementação (Etapas)

### Fase 1: Infraestrutura de Status (2-3h)
**Prioridade**: P0 (Foundation)

#### Tarefas:
1. ✅ **Modificar `bestiaryOcrParser.js`**
   - [ ] Adicionar `detectTruncation()`
   - [ ] Adicionar `findAutocompleteOptions()`
   - [ ] Modificar `parseOcrText()` para incluir `status` e `isTruncated`
   - [ ] Adicionar testes unitários

2. ✅ **Modificar `bestiaryStorage.js`**
   - [ ] Adicionar `updateCreatureOcrMetadata()`
   - [ ] Adicionar `quickMarkComplete()`
   - [ ] Atualizar schema de validação (Joi)

3. ✅ **Criar utilitário `bestiaryStatusUtils.js`**
   - [ ] `calculateDisplayStage(kills, total)` → "0/1", "1/3", "2/3"
   - [ ] `getStatusType(creature)` → "unknown" | "progress" | "complete"

**Arquivo**: `frontend/src/utils/bestiaryStatusUtils.js`
```javascript
/**
 * Bestiary Status Display Utilities
 */

/**
 * Calculate display stage from kills
 * @returns {string} - Display text: "0/1", "1/3", "2/3", "3/3"
 */
export const calculateDisplayStage = (kills, total) => {
  if (kills >= total) return "3/3";
  if (kills >= (total * 2) / 3) return "2/3";
  if (kills >= total / 3) return "1/3";
  return "0/1";
};

/**
 * Get status type for styling
 * @returns {"unknown" | "progress" | "complete"}
 */
export const getStatusType = (creature) => {
  if (!creature.status) return "unknown";

  const { recognized, isComplete } = creature.status;

  if (!recognized) return "unknown";
  if (isComplete) return "complete";
  return "progress";
};

export default {
  calculateDisplayStage,
  getStatusType,
};
```

### Fase 2: Componente de Autocompletar (2-3h)
**Prioridade**: P1 (Core Feature)

#### Tarefas:
1. ✅ **Criar `AutocompleteModal.js`**
   - [ ] Layout modal com lista de candidatos
   - [ ] Radio buttons para seleção
   - [ ] Mostrar similaridade percentual
   - [ ] Botões: Confirmar, Pular
   - [ ] Suportar navegação por teclado (Enter, Esc)

2. ✅ **Criar `AutocompleteModal.styles.js`**
   - [ ] Modal overlay com backdrop
   - [ ] Lista de candidatos estilizada
   - [ ] Hover states
   - [ ] Mobile-responsive

3. ✅ **Integrar com `ScreenshotImport.js`**
   - [ ] Detectar truncamentos após OCR
   - [ ] Gerenciar fila de truncamentos
   - [ ] Abrir modal sequencialmente
   - [ ] Atualizar criaturas matched ao selecionar

**Exemplo**: `AutocompleteModal.js`
```javascript
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  OriginalText,
  CandidatesList,
  CandidateItem,
  RadioButton,
  CreatureName,
  SimilarityBadge,
  ModalActions,
  ConfirmButton,
  SkipButton,
} from './AutocompleteModal.styles';

const AutocompleteModal = ({
  truncatedText,
  candidates,
  onSelect,
  onSkip,
  isOpen
}) => {
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState(candidates[0]?.creature.id || null);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (selectedId) {
      onSelect(selectedId);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleConfirm();
    if (e.key === 'Escape') onSkip();
  };

  return (
    <ModalOverlay onClick={onSkip}>
      <ModalContainer onClick={(e) => e.stopPropagation()} onKeyDown={handleKeyPress}>
        <ModalHeader>
          <ModalTitle>{t('bestiaryPlanner.autocomplete.title')}</ModalTitle>
          <OriginalText>
            {t('bestiaryPlanner.autocomplete.detected')}: "{truncatedText}"
          </OriginalText>
        </ModalHeader>

        <CandidatesList>
          {candidates.map(({ creature, similarity }) => (
            <CandidateItem
              key={creature.id}
              $selected={selectedId === creature.id}
              onClick={() => setSelectedId(creature.id)}
            >
              <RadioButton $checked={selectedId === creature.id} />
              <CreatureName>{creature.name}</CreatureName>
              <SimilarityBadge>{Math.round(similarity * 100)}%</SimilarityBadge>
            </CandidateItem>
          ))}
        </CandidatesList>

        <ModalActions>
          <ConfirmButton onClick={handleConfirm} disabled={!selectedId}>
            {t('bestiaryPlanner.autocomplete.confirm')}
          </ConfirmButton>
          <SkipButton onClick={onSkip}>
            {t('bestiaryPlanner.autocomplete.skip')}
          </SkipButton>
        </ModalActions>
      </ModalContainer>
    </ModalOverlay>
  );
};

AutocompleteModal.propTypes = {
  truncatedText: PropTypes.string.isRequired,
  candidates: PropTypes.arrayOf(
    PropTypes.shape({
      creature: PropTypes.object.isRequired,
      similarity: PropTypes.number.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  onSkip: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default AutocompleteModal;
```

### Fase 3: UI de Status Visual (2-3h)
**Prioridade**: P1 (Core Feature)

#### Tarefas:
1. ✅ **Modificar `CreatureCard.js`**
   - [ ] Adicionar `renderStatusBadge()` com 3 estados
   - [ ] Estilizar badges (cores por estado)
   - [ ] Adicionar `renderQuickActions()` para quick edit
   - [ ] Integrar com callbacks existentes

2. ✅ **Modificar `CreatureCard.styles.js`**
   - [ ] Adicionar `StatusBadge` styled component
   - [ ] Variações de cor: `$status="unknown"|"progress"|"complete"`
   - [ ] Adicionar `QuickActionsRow` e `QuickActionButton`

3. ✅ **Atualizar `ScreenshotImport.js` Results**
   - [ ] Mostrar status inline na lista de criaturas detectadas
   - [ ] Permitir edição quick (sem modal) para cada criatura
   - [ ] Adicionar bulk actions: "Marcar todas como completas"

**Exemplo de Badges**:
```javascript
// CreatureCard.styles.js
export const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;

  ${({ $status }) => {
    switch ($status) {
      case 'unknown':
        return css`
          background: #374151;
          color: #9ca3af;
        `;
      case 'progress':
        return css`
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
          border: 1px solid #f59e0b;
        `;
      case 'complete':
        return css`
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          border: 1px solid #10b981;
        `;
      default:
        return '';
    }
  }}
`;

export const StatusIcon = styled.span`
  font-size: 1rem;
`;

export const StatusText = styled.span`
  font-weight: 600;
`;
```

### Fase 4: Integração e Workflow (1-2h)
**Prioridade**: P1 (Polish)

#### Tarefas:
1. ✅ **Integrar workflow completo em `ScreenshotImport.js`**
   - [ ] Fluxo: Upload → OCR → Autocomplete (se truncado) → Review Status → Confirm
   - [ ] Mostrar preview de status antes de confirmar import
   - [ ] Permitir editar status inline antes de salvar

2. ✅ **Atualizar `BestiaryPlanner.js`**
   - [ ] Passar props de status para `SuggestionList`
   - [ ] Atualizar callbacks para suportar quick actions

3. ✅ **Adicionar i18n keys**
   - [ ] `bestiaryPlanner.status.unknown`
   - [ ] `bestiaryPlanner.status.progress`
   - [ ] `bestiaryPlanner.status.complete`
   - [ ] `bestiaryPlanner.autocomplete.*`
   - [ ] `bestiaryPlanner.quickActions.*`

**Arquivo**: `frontend/public/locales/pt-BR/translation.json`
```json
{
  "bestiaryPlanner": {
    "status": {
      "unknown": "Desconhecida",
      "progress": "Em Progresso",
      "complete": "Concluída"
    },
    "autocomplete": {
      "title": "Nome Incompleto Detectado",
      "detected": "OCR detectou",
      "selectCorrect": "Selecione a criatura correta:",
      "confirm": "Confirmar",
      "skip": "Pular"
    },
    "quickActions": {
      "editKills": "Editar Kills",
      "markComplete": "Marcar Completo"
    }
  }
}
```

### Fase 5: Testes e Refinamento (1-2h)
**Prioridade**: P2 (Quality Assurance)

#### Tarefas:
1. ✅ **Testes Unitários**
   - [ ] `bestiaryOcrParser.test.js`: Testar `detectTruncation()`, `findAutocompleteOptions()`
   - [ ] `bestiaryStatusUtils.test.js`: Testar `calculateDisplayStage()`, `getStatusType()`

2. ✅ **Testes de Integração**
   - [ ] Testar workflow completo: Upload → OCR → Autocomplete → Status
   - [ ] Testar edge cases: Nomes muito truncados, múltiplos candidatos, sem candidatos

3. ✅ **Ajustes de UI/UX**
   - [ ] Animações de transição entre estados
   - [ ] Loading states durante autocomplete
   - [ ] Error handling: Se OCR falha, se autocomplete sem candidatos

4. ✅ **Documentação**
   - [ ] Atualizar README com novo workflow
   - [ ] Adicionar exemplos de uso
   - [ ] Documentar estrutura de dados

---

## 🎨 Mocks de UI

### Mock 1: CreatureCard com Status Unknown
```
┌────────────────────────────────────────┐
│ 🐉 Ancient Dragon                      │
│ ⚔️ HARD  📍 Dragon Lair  ❤️ 5000 HP   │
│                                        │
│ ┌────────────────┐                     │
│ │ ? Unknown      │                     │
│ └────────────────┘                     │
│                                        │
│ Quick Actions:                         │
│ [✎ Editar Kills] [✓ Marcar Completo]  │
│                                        │
│ 📍 Dragon Lair, Ancient Ruins          │
└────────────────────────────────────────┘
```

### Mock 2: CreatureCard com Status em Progresso
```
┌────────────────────────────────────────┐
│ 🦂 Giant Spider                        │
│ ⚔️ EASY  📍 Venore  ❤️ 1200 HP        │
│                                        │
│ ┌─────────────┐                        │
│ │ 🔄 1/3      │  (250/500 kills)       │
│ └─────────────┘                        │
│                                        │
│ [✎ Editar Kills]                       │
│                                        │
│ 📍 Venore Swamp, Tiquanda              │
└────────────────────────────────────────┘
```

### Mock 3: CreatureCard Concluída
```
┌────────────────────────────────────────┐
│ 🦀 Hellflayer                          │
│ ⚔️ CHALLENGING  📍 Roshamuul           │
│                                        │
│ ┌────────────┐                         │
│ │ ✓          │  (500/500 kills)        │
│ └────────────┘                         │
│                                        │
│ [✅ Completado em 03/02/2026]          │
│                                        │
│ 📍 Roshamuul Prison, Nightmare Isles   │
└────────────────────────────────────────┘
```

### Mock 4: AutocompleteModal
```
┌────────────────────────────────────────────┐
│ Nome Incompleto Detectado                  │
│                                            │
│ OCR detectou: "Quara Predator..."         │
│                                            │
│ Selecione a criatura correta:             │
│                                            │
│ ┌────────────────────────────────────┐    │
│ │ ⦿ Quara Predator           (95%)  │    │
│ └────────────────────────────────────┘    │
│ ┌────────────────────────────────────┐    │
│ │ ○ Quara Predator Scout     (90%)  │    │
│ └────────────────────────────────────┘    │
│ ┌────────────────────────────────────┐    │
│ │ ○ Quara Predator Hunter    (85%)  │    │
│ └────────────────────────────────────┘    │
│                                            │
│ [Confirmar]  [Pular]                       │
└────────────────────────────────────────────┘
```

---

## 🧪 Cenários de Teste

### Teste 1: Nome Truncado com Match Exato
**Input**: OCR detecta "Quara Predator..."
**Expected**:
1. Autocomplete modal abre
2. Candidatos listados:
   - Quara Predator (95%)
   - Quara Predator Scout (90%)
3. Usuário seleciona "Quara Predator"
4. Criatura atualizada com ID correto
5. Status definido como "Unknown" (sem info de kills)

### Teste 2: Nome Truncado sem Candidatos Claros
**Input**: OCR detecta "Ancient Dr..."
**Expected**:
1. Autocomplete modal abre
2. Candidatos listados:
   - Ancient Dragon (80%)
   - Ancient Scarab (75%)
   - Dragon Lord (65%)
3. Usuário seleciona "Ancient Dragon"
4. Criatura atualizada

### Teste 3: OCR Detecta Stage Parcial
**Input**: OCR detecta "Hellflayer 1/3"
**Expected**:
1. Criatura matched: Hellflayer
2. Status: `{ recognized: true, stage: 1, kills: 0, isComplete: false }`
3. Card mostra badge: "🔄 1/3"
4. Quick actions disponíveis: [Editar Kills]

### Teste 4: OCR Detecta Criatura Completa
**Input**: OCR detecta "Ghastly Dragon ✓"
**Expected**:
1. Criatura matched: Ghastly Dragon
2. Status: `{ recognized: true, stage: 3, kills: 500, isComplete: true }`
3. Card mostra badge: "✓" (verde)
4. Sem quick actions (já completo)

### Teste 5: Quick Mark Complete
**Input**: Usuário clica "Marcar Completo" em criatura Unknown
**Expected**:
1. Abrir `KillCountModal` ou marcar imediatamente?
2. Criatura marcada como completa (kills = total)
3. Status atualizado: `{ recognized: true, stage: 3, isComplete: true, manuallySet: true }`
4. Card atualizado com badge verde "✓"

---

## 📊 Métricas de Sucesso

### Funcional
- [ ] ✅ 3 estados de status exibidos corretamente
- [ ] ✅ Autocompletar funciona para nomes truncados (top 5 candidatos)
- [ ] ✅ Quick actions permitem edição sem modal
- [ ] ✅ Workflow OCR completo: Upload → Autocomplete → Status → Confirm

### Performance
- [ ] ✅ Autocomplete modal abre em <500ms
- [ ] ✅ Status badges renderizam sem lag
- [ ] ✅ OCR parsing com truncation detection não adiciona >200ms

### UX
- [ ] ✅ Usuário entende claramente os 3 estados
- [ ] ✅ Workflow simplificado: 50% menos clicks para marcar status
- [ ] ✅ Autocompletar resolve 90%+ de nomes truncados

---

## 🚀 Rollout Plan

### Fase Alpha (Internal Testing)
- [ ] Implementar Fase 1-3
- [ ] Testar localmente com screenshots reais
- [ ] Validar fluxo completo

### Fase Beta (Limited Release)
- [ ] Implementar Fase 4-5
- [ ] Deploy para staging
- [ ] Coletar feedback de 3-5 usuários beta

### Fase Production
- [ ] Correções baseadas em feedback
- [ ] Deploy para produção
- [ ] Monitorar métricas de uso

---

## 🔗 Dependências

### Bibliotecas Atuais (Já Instaladas)
- ✅ `react-i18next` - Internacionalização
- ✅ `styled-components` - Estilos
- ✅ `joi` - Validação de dados

### Novas Dependências (Não Necessário)
- ❌ Nenhuma biblioteca nova necessária

---

## 📋 Checklist Final de Implementação

### Arquivos a Criar
- [ ] `frontend/src/components/BestiaryPlanner/AutocompleteModal.js`
- [ ] `frontend/src/components/BestiaryPlanner/AutocompleteModal.styles.js`
- [ ] `frontend/src/utils/bestiaryStatusUtils.js`
- [ ] `frontend/src/__tests__/utils/bestiaryStatusUtils.test.js`

### Arquivos a Modificar
- [ ] `frontend/src/utils/bestiaryOcrParser.js`
- [ ] `frontend/src/services/bestiaryStorage.js`
- [ ] `frontend/src/components/BestiaryPlanner/CreatureCard.js`
- [ ] `frontend/src/components/BestiaryPlanner/CreatureCard.styles.js`
- [ ] `frontend/src/components/BestiaryPlanner/ScreenshotImport.js`
- [ ] `frontend/src/components/BestiaryPlanner/BestiaryPlanner.js`
- [ ] `frontend/public/locales/pt-BR/translation.json`
- [ ] `frontend/public/locales/en/translation.json`

### Testes a Criar
- [ ] `frontend/src/__tests__/utils/bestiaryOcrParser.test.js` (adicionar truncation tests)
- [ ] `frontend/src/__tests__/components/AutocompleteModal.test.js`

---

## ⚠️ Riscos e Mitigações

### Risco 1: OCR não detecta truncamento corretamente
**Impacto**: Alto
**Mitigação**:
- Testar com múltiplos screenshots reais
- Ajustar regex de detecção de "..."
- Fallback: Usuário pode forçar autocomplete via botão manual

### Risco 2: Autocompletar retorna muitos falsos positivos
**Impacto**: Médio
**Mitigação**:
- Ajustar threshold de similaridade (atualmente 60%)
- Limitar a top 5 candidatos (já implementado)
- Ordenar por similaridade + prefix match

### Risco 3: Mudança na estrutura de dados quebra compatibilidade
**Impacto**: Alto
**Mitigação**:
- Manter backwards compatibility com dados antigos
- Validar schema com Joi antes de salvar
- Migration script se necessário

### Risco 4: Performance degradada com muitas criaturas
**Impacto**: Baixo
**Mitigação**:
- Lazy loading de autocomplete options (buscar sob demanda)
- Memoização de `calculateDisplayStage()`
- React.memo para `CreatureCard` (já implementado)

---

## 📚 Referências

### Documentação Interna
- `bestiary-cleanup-2026-02-05.md` - Remoção de 192 criaturas de baixo valor
- `session-bestiary-planner-ui-improvements-2026-02-04.md` - Melhorias anteriores de UI

### Arquivos-Chave
- `bestiaryOcrParser.js` - Lógica de OCR e fuzzy matching
- `bestiaryStages.js` - Cálculos de stage
- `bestiaryStorage.js` - Persistência em localStorage
- `CreatureCard.js` - Componente visual principal

---

**Estimativa Total**: 8-12 horas de desenvolvimento
**Complexidade**: Média (React intermediário + lógica de parsing)
**Prioridade**: P1 (Feature importante para UX)

**Próximos Passos**:
1. Revisar plano com usuário
2. Confirmar prioridades das fases
3. Iniciar implementação da Fase 1
