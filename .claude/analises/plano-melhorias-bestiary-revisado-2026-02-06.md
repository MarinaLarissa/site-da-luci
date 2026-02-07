# PLANO DE MELHORIAS BESTIARY PLANNER (REVISADO)
**Data:** 2026-02-06
**Base:** Análise TibiaRoute vs Bestiary Planner

---

## 🎯 PRIORIDADES AJUSTADAS (Feedback do Cliente)

### ❌ Descartadas
- **Filtro Free vs Premium** - não necessário
- **Dark Mode** - site já usa paleta dark
- **Discord Bot** - escopo desnecessário

### ✅ Aprovadas com Entusiasmo
1. **Mapa Interativo de Spawns** (estilo TibiaRoute Task Map) - PRIORIDADE MÁXIMA
2. **Voice Input para OCR** - FEATURE INOVADORA
3. **Calculadora de Tempo HP** - MELHORIA INCREMENTAL

---

## 🗺️ FEATURE #1: MAPA INTERATIVO DE SPAWNS (ALTA PRIORIDADE)

### O que o TibiaRoute faz (e queremos replicar):

#### 🔍 Busca e Filtros
- **Campo de busca** com autocomplete de criaturas
- **Seleção múltipla** de criaturas (ver spawns de várias ao mesmo tempo)
- **Filtros por:**
  - Floor/andar específico
  - Vocação (opcional)
  - Dificuldade
  - "Best farmable" (maior densidade)

#### 🎨 Visualização no Mapa
- **Markers coloridos** indicando:
  - Status: 🟢 Completed | 🟡 In Progress | 🔴 Not Started
  - Densidade de spawn (tamanho do marker?)
- **Clusters automáticos**: agrupam spawns próximos, desagrupam no zoom
- **Contagem de mobs**: mostra quantidade de criaturas em cada spawn
- **Multi-floor**: seletor de andar (-X a +X floors)

#### 💡 Interações
- **Click no marker** → popup com:
  - Nome da criatura + imagem
  - Quantidade de mobs no spawn
  - Seu progresso (kills atuais / necessários)
  - Botão "Add to Plan"
  - Botão "Complete"
  - Informações de HP, exp, resistências
- **Hover**: preview rápido (nome + quantidade)
- **Filtrar por região**: click em área do mapa filtra criaturas daquela região

#### 🚀 Diferenciais para Implementar
- **Route Optimizer**:
  - Selecionar múltiplos spawns
  - Calcular rota otimizada (shortest path)
  - Exibir linha conectando os pontos
  - Tempo estimado total da rota

- **Heatmap de Eficiência**:
  - Overlay no mapa mostrando "hot zones"
  - Baseado no efficiency score atual
  - Criaturas não completadas com alto CP/hora

- **Session Mode**:
  - "Start Hunt" mode: marca spawns visitados
  - Timer de session
  - Completion tracker em tempo real

---

### 📐 Implementação Técnica

#### Stack Recomendada
```javascript
// Map Library
- react-leaflet (base)
- leaflet.markercluster (clustering automático)
- leaflet-routing-machine (route optimization)

// Tiles
- OpenStreetMap base OU
- Custom Tibia tiles (se disponível) OU
- Canvas overlay com mapa simplificado do Tibia
```

#### Data Requirements
```javascript
// Enriquecer BESTIARY_DATA com coordenadas
{
  id: "dragon",
  name: "Dragon",
  spawns: [
    {
      location: "Fibula Dungeon",
      region: "Fibula",
      coordinates: { x: 32483, y: 31986, z: 10 },
      floor: -1,
      quantity: "~15-20 mobs",  // estimativa
      respawnTime: 60,  // segundos
      accessibility: "easy"  // easy, medium, hard
    },
    // ... mais spawns
  ]
}
```

#### Componentes
```
MapView/
├── InteractiveMap.js              // Root component
├── SpawnMarker.js                 // Marker individual
├── SpawnCluster.js                // Cluster de markers
├── SpawnPopup.js                  // Popup ao clicar
├── MapControls.js                 // Zoom, layers, filters
├── FloorSelector.js               // Seletor de andar
├── RouteOptimizer.js              // Calculador de rotas
├── SessionTracker.js              // Hunt session mode
└── MapLegend.js                   // Legenda de cores/status
```

#### Integração com Bestiary Planner
```javascript
// No BestiaryPlanner.js
<Tabs>
  <Tab label="Grid View" />
  <Tab label="Map View" />  ← NOVO!
  <Tab label="Session Plan" />
</Tabs>

// State compartilhado
- Filtros aplicam tanto no grid quanto no mapa
- Click em criatura no mapa ↔ destaque no grid
- Session plan sync entre visualizações
```

---

### 🎯 MVP vs Full Feature

#### Phase 1: MVP (5 dias)
- ✅ Mapa básico com Leaflet
- ✅ Markers simples (sem clustering)
- ✅ Popup com info básica
- ✅ Busca por criatura (1 por vez)
- ✅ Filtro por completed/not completed
- ✅ Data manual para ~50 criaturas populares

#### Phase 2: Enhanced (7 dias)
- ✅ Marker clustering
- ✅ Multi-select de criaturas
- ✅ Floor selector
- ✅ Data completa (408 criaturas)
- ✅ Status colors (🟢🟡🔴)
- ✅ Quantidade de mobs por spawn

#### Phase 3: Advanced (10 dias)
- ✅ Route optimizer
- ✅ Heatmap de eficiência
- ✅ Session tracker mode
- ✅ Compartilhamento de rotas
- ✅ Export para GPS/print

**Recomendação:** Começar com MVP, validar com usuários, iterar.

---

## 🎤 FEATURE #2: VOICE INPUT PARA OCR (ALTA PRIORIDADE)

### Conceito
Além do screenshot OCR atual, adicionar opção de **gravar áudio** falando os nomes das criaturas para preencher progresso automaticamente.

### Use Cases

#### Caso 1: Completions Rápidas Durante Hunt
```
Usuário caça várias criaturas e completa várias entries.
Em vez de tirar 10 screenshots ou digitar manualmente:

1. Click "Voice Input" button
2. Fala: "Completei dragon, dragon lord, wyrm"
3. Sistema reconhece e marca como completas
4. Confirmação visual + undo option
```

#### Caso 2: Atualização de Progresso Parcial
```
Usuário quer atualizar kills sem completar:

1. Click "Voice Input" button
2. Fala: "Dragon 250 kills, Dragon Lord 180 kills"
3. Sistema extrai criatura + número
4. Atualiza kill count
```

### 🛠️ Implementação Técnica

#### Stack
```javascript
// Web Speech API (nativo, grátis!)
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// Fallback para navegadores sem suporte:
- Exibir mensagem sugerindo Chrome/Edge
- Ou integrar com serviço externo (Google Cloud Speech-to-Text)
```

#### Componente
```javascript
// VoiceInput.js
import { useState, useEffect } from 'react';

function VoiceInput({ onRecognized }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const recognition = new SpeechRecognition();
  recognition.lang = 'pt-BR';  // ou 'en-US'
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onresult = (event) => {
    const current = event.results[event.results.length - 1];
    const transcript = current[0].transcript;
    setTranscript(transcript);

    if (current.isFinal) {
      parseAndMatch(transcript);
    }
  };

  const parseAndMatch = (text) => {
    // Normalizar: lowercase, remover acentos
    const normalized = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Patterns para detectar:
    // 1. "completei X, Y, Z"
    // 2. "X 250 kills"
    // 3. "finalizar dragon lord"

    const completionPattern = /completei|finaliz(ei|ar)|complete(i|d)/;
    const killPattern = /(\d+)\s*(kills?|mortes?)/;

    if (completionPattern.test(normalized)) {
      // Extrair nomes de criaturas
      const creatures = extractCreatureNames(normalized);
      onRecognized({ action: 'complete', creatures });
    } else {
      // Extrair criatura + kill count
      const parsed = extractKillCounts(normalized);
      onRecognized({ action: 'updateKills', data: parsed });
    }
  };

  const extractCreatureNames = (text) => {
    // Fuzzy matching contra BESTIARY_DATA
    const words = text.split(/\s+|,\s*/);
    const matches = [];

    words.forEach(word => {
      const match = findBestMatch(word, BESTIARY_DATA);
      if (match && match.confidence > 0.75) {
        matches.push(match.creature);
      }
    });

    return matches;
  };

  return (
    <VoiceInputContainer>
      <MicButton
        onClick={() => setIsListening(!isListening)}
        isActive={isListening}
      >
        🎤 {isListening ? 'Ouvindo...' : 'Falar'}
      </MicButton>

      {transcript && (
        <TranscriptPreview>{transcript}</TranscriptPreview>
      )}
    </VoiceInputContainer>
  );
}
```

#### Fuzzy Matching Melhorado
```javascript
// Usar a mesma lógica do OCR, mas adaptar para voice:
import Levenshtein from 'levenshtein';

function findBestMatch(spokenWord, bestiaryData) {
  const candidates = bestiaryData.map(creature => {
    // Normalizar nome da criatura
    const normalized = creature.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Calcular distância
    const distance = new Levenshtein(spokenWord, normalized).distance;
    const similarity = 1 - (distance / Math.max(spokenWord.length, normalized.length));

    return { creature, confidence: similarity };
  });

  // Ordenar por confidence
  candidates.sort((a, b) => b.confidence - a.confidence);

  return candidates[0];
}
```

#### UX Flow
```
┌─────────────────────────────────────────┐
│  Voice Input                       [×] │
├─────────────────────────────────────────┤
│                                         │
│  [🎤 Ouvindo...]                       │
│                                         │
│  "Completei dragon, dragon lord..."    │
│   ↑ transcript em tempo real           │
│                                         │
│  ✓ Reconheci:                          │
│    • Dragon (95% confiança)            │
│    • Dragon Lord (92% confiança)       │
│                                         │
│  ❌ Não reconheci:                     │
│    • "dragonlór" → Dragon Lord?        │
│      [✓ Sim] [✗ Não] [Editar]         │
│                                         │
│  [Confirmar]  [Tentar Novamente]       │
└─────────────────────────────────────────┘
```

---

### 🎯 MVP vs Full Feature

#### Phase 1: MVP (3 dias)
- ✅ Botão "Voice Input" no BestiaryPlanner
- ✅ Reconhecimento de voz (pt-BR apenas)
- ✅ Pattern: "completei X, Y, Z"
- ✅ Fuzzy matching básico
- ✅ Confirmação modal antes de aplicar

#### Phase 2: Enhanced (2 dias)
- ✅ Multi-idioma (pt-BR, en-US, es-ES)
- ✅ Pattern: "X N kills" para update parcial
- ✅ Confidence score visual
- ✅ Sugestões alternativas para low-confidence matches

#### Phase 3: Advanced (3 dias)
- ✅ Histórico de comandos de voz
- ✅ "Aprender" pronúncias customizadas
- ✅ Integração com session tracker
- ✅ Voice commands: "mostrar progresso", "qual criatura falta?"

**Total:** 8 dias (todas as phases)

---

## 🧮 FEATURE #3: CALCULADORA DE TEMPO HP (MÉDIA PRIORIDADE)

### Conceito
Melhorar a precisão das estimativas de tempo usando a fórmula baseada em HP do TibiaRoute.

### Fórmula Atual vs Nova

#### Atual (Genérica)
```javascript
// bestiaryStages.js
const KILLS_REQUIRED = {
  EASY: 500,
  MEDIUM: 1000,
  HARD: 2500
};

// Estimativa: assume ~10 kills/min para tudo
estimatedHours = killsRemaining / (10 * 60);
```

#### Nova (Baseada em HP)
```javascript
function estimateTimeToComplete(creature, currentKills) {
  const killsRemaining = KILLS_REQUIRED[creature.difficulty] - currentKills;

  // Fórmula TibiaRoute: ~15/sqrt(HP/100) kills/min
  const killsPerMin = 15 / Math.sqrt(creature.hitpoints / 100);

  const minutesRemaining = killsRemaining / killsPerMin;
  const hoursRemaining = minutesRemaining / 60;

  return {
    minutes: Math.round(minutesRemaining),
    hours: hoursRemaining.toFixed(1),
    formatted: formatDuration(minutesRemaining),
    killsPerMin: killsPerMin.toFixed(1)
  };
}

// Exemplos:
Dragon (1000 HP):
  killsPerMin = 15 / sqrt(10) = 4.74
  500 kills = ~105 min = 1.8h

Dragon Lord (2100 HP):
  killsPerMin = 15 / sqrt(21) = 3.27
  500 kills = ~153 min = 2.6h

Rat (20 HP):
  killsPerMin = 15 / sqrt(0.2) = 33.5
  500 kills = ~15 min = 0.2h
```

### Visualização

#### CreatureCard
```javascript
<TimeEstimate>
  ⏱️ Est: 1.8h (~4.7 kills/min)
</TimeEstimate>
```

#### Session Planner
```javascript
<SessionSummary>
  Total creatures: 5
  Total CP: 25
  Total time: ~8.5h  ← soma dos tempos individuais

  Breakdown:
  • Dragon: 1.8h
  • Dragon Lord: 2.6h
  • Wyrm: 2.1h
  • ...
</SessionSummary>
```

### Implementação (1 dia)

```javascript
// 1. Adicionar campo hitpoints em BESTIARY_DATA (já existe?)
// 2. Criar utils/timeEstimator.js
// 3. Atualizar CreatureCard para usar nova fórmula
// 4. Atualizar SessionPlanner totals
// 5. Adicionar tooltip explicando a fórmula
```

---

## 📊 ROADMAP FINAL REVISADO

### Sprint 1: Foundation (2 semanas)
**Semana 1:**
- ✅ Calculadora de Tempo HP (1 dia)
- ✅ Voice Input MVP (3 dias)

**Semana 2:**
- ✅ Mapa Interativo MVP (5 dias)

**Deliverables:**
- Estimativas de tempo precisas
- Voice input para completions rápidas
- Mapa básico mostrando spawns

---

### Sprint 2: Enhancement (3 semanas)
**Semana 1:**
- ✅ Voice Input Enhanced (2 dias)
- ✅ Mapa Enhanced - clustering + multi-select (3 dias)

**Semana 2:**
- ✅ Data enrichment: coordenadas para todas as criaturas (4 dias)
- ✅ Floor selector + quantidade de mobs (1 dia)

**Semana 3:**
- ✅ Integration testing (2 dias)
- ✅ UX polish + feedback incorporation (3 dias)

**Deliverables:**
- Voice input com múltiplos idiomas
- Mapa completo com todas as criaturas
- Floor selector funcional

---

### Sprint 3: Advanced Features (4 semanas)
**Semana 1-2:**
- ✅ Route Optimizer (5 dias)
- ✅ Heatmap de eficiência (3 dias)
- ✅ Session Tracker mode (2 dias)

**Semana 3:**
- ✅ Voice commands avançados (3 dias)
- ✅ Compartilhamento de rotas (2 dias)

**Semana 4:**
- ✅ Polish & optimization (3 dias)
- ✅ Documentation (2 dias)

**Deliverables:**
- Route optimizer completo
- Session tracker integrado
- Sistema de compartilhamento

---

## 🎯 MÉTRICAS DE SUCESSO

### Mapa Interativo
- **Adoção:** 70%+ usuários exploram o mapa na primeira semana
- **Engagement:** Média de 5+ interações por sessão
- **Performance:** Load time < 2s, smooth 60fps zoom/pan
- **Feedback:** "Isso facilita MUITO encontrar os spawns" (NPS ≥ 9)

### Voice Input
- **Adoção:** 30%+ usuários tentam ao menos 1x
- **Accuracy:** 85%+ de reconhecimento correto
- **Satisfação:** 80%+ acham mais rápido que screenshot
- **Retention:** 60%+ voltam a usar após primeira tentativa

### Calculadora Tempo HP
- **Visibilidade:** 100% dos usuários veem as estimativas
- **Confiança:** 70%+ consideram estimativas "precisas"
- **Impacto:** Melhora planejamento de sessions (métrica qualitativa)

---

## 💡 EXTRAS E IDEIAS FUTURAS

### Após Sprint 3 (Backlog)
1. **PWA Offline Mode para Mapa**
   - Cache de tiles
   - Offline route planning

2. **Integração com TibiaWiki API**
   - Auto-update de creature data
   - Verificar mudanças em patches

3. **Social Features**
   - Compartilhar rotas com guild
   - "Hunt parties" - planejar em grupo

4. **Gamification**
   - Badges por completions
   - Leaderboards
   - Achievements

5. **Mobile App**
   - React Native version
   - Push notifications para milestones

---

## 🚀 PRÓXIMOS PASSOS IMEDIATOS

### 1. Definir Escopo Inicial
- [ ] Cliente aprova features e prioridades
- [ ] Decidir: começar por qual feature?
  - Opção A: Mapa MVP (mais impactante)
  - Opção B: Voice Input MVP (mais rápido)
  - Opção C: Ambos em paralelo

### 2. Data Collection
- [ ] Mapear spawns e coordenadas
  - Fonte: TibiaWiki, TibiaMaps.io, scraping?
  - Formato: JSON enriquecendo BESTIARY_DATA
  - Priorizar top 100 criaturas first

### 3. Design
- [ ] Mockups detalhados (Figma?)
- [ ] Color scheme para status markers
- [ ] Voice input UI flow

### 4. Setup Técnico
- [ ] Install dependencies (react-leaflet, etc)
- [ ] Criar estrutura de componentes
- [ ] Setup de testes

---

## 📝 DECISÕES PENDENTES

### Mapa Interativo
1. **Tiles do mapa:**
   - Usar OpenStreetMap genérico? (rápido, mas não temático)
   - Criar tiles customizados do Tibia? (bonito, mas trabalhoso)
   - Canvas simples com regiões? (minimalista)

2. **Data source para coordenadas:**
   - Manual (trabalhoso, 408 criaturas)
   - Scraping TibiaWiki (automatizado, pode ter erros)
   - Crowd-sourced (usuários contribuem)

3. **Mobile responsiveness:**
   - Mobile-first design?
   - Separate mobile view vs adaptive?

### Voice Input
1. **Idiomas suportados:**
   - Apenas pt-BR no MVP?
   - pt-BR + en-US desde início?

2. **Fallback para navegadores sem suporte:**
   - Esconder feature completamente?
   - Mostrar com mensagem "Upgrade browser"?
   - Integrar serviço pago (Google STT)?

---

**Arquivo gerado:** Plano de Melhorias Revisado - Bestiary Planner
**Autor:** Claude Sonnet 4.5
**Data:** 2026-02-06
**Status:** Aguardando aprovação do cliente
