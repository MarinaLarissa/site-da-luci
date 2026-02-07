# ANÁLISE COMPARATIVA: TibiaRoute vs Bestiary Planner
**Data:** 2026-02-06
**Objetivo:** Identificar funcionalidades do TibiaRoute interessantes para o Bestiary Planner e propor melhorias

---

## 📊 VISÃO GERAL DA ANÁLISE

### TibiaRoute - Principais Destaques
- **Foco:** Ferramenta multi-propósito com forte componente de mapeamento e localização
- **Integração:** Discord Bot, Twitch/Kick Chat Bot
- **Status:** Promoted Fansite oficial CipSoft
- **Diferenciais:** Mapa interativo fiendish, comparação de criaturas lado-a-lado

### Bestiary Planner - Principais Destaques
- **Foco:** Ferramenta especializada em progresso de Bestiary
- **Integração:** Supabase sync, OCR screenshot import
- **Diferenciais:** Session planning, undo/redo, bulk operations, offline-first

---

## 🎯 FUNCIONALIDADES DO TIBIA ROUTE INTERESSANTES PARA O BESTIARY PLANNER

### ⭐ PRIORIDADE ALTA (Quick Wins com Alto Impacto)

#### 1. **Comparação Lado-a-Lado de Criaturas (Multi-Select Comparison)**
**O que o TibiaRoute faz:**
- Permite comparar até 5 criaturas simultaneamente
- Visualização lado-a-lado de atributos, resistências, HP, exp, loot
- Calculadora de tempo: "~15/sqrt(HP/100) kills/min"

**Por que seria útil no Bestiary Planner:**
- Usuários poderiam comparar criaturas candidatas para decidir qual completar primeiro
- Auxiliaria no planejamento de session (qual spawn é mais eficiente)
- Complementaria o efficiency score atual com comparação visual

**Implementação Sugerida:**
```javascript
// Componente: CreatureComparisonModal.js
- Adicionar botão "Compare" no CreatureCard (selection mode)
- Permitir selecionar 2-5 criaturas para comparação
- Exibir tabela comparativa:
  * HP, Exp, Charm Points
  * Kills necessários (por stage)
  * Tempo estimado (usando fórmula ~15/sqrt(HP/100))
  * Resistências (color-coded)
  * Locations (overlaps destacados)
  * Efficiency score (já calculado)
```

**Esforço:** Médio (2-3 dias)
**Impacto:** Alto (melhora decisão de planejamento)

---

#### 2. **Mapa Interativo de Locations**
**O que o TibiaRoute faz:**
- Mapa interativo com spawns marcados
- Click no mapa → filtra criaturas daquela região
- Compartilhamento de URL com coordenadas
- Sistema de clusters (agrupamento de spawns)

**Por que seria útil no Bestiary Planner:**
- Atualmente só mostra lista de locations como texto
- Mapa visual ajudaria a identificar proximidade de spawns
- Poderia mostrar "route optimization" para completar múltiplas criaturas em uma área

**Implementação Sugerida:**
```javascript
// Componente: InteractiveMapModal.js
- Integrar biblioteca de mapas (Leaflet ou similar)
- Adicionar tile layers do Tibia (ou criar próprios)
- Marcar spawns das criaturas filtradas
- Colorir por difficulty ou stage completion
- Click no marker → CreatureCard preview
- Route optimizer: calcular rota otimizada para session plan

// Data enrichment necessária:
- Adicionar coordinates em BESTIARY_DATA (x,y,floor)
- Mapear regions para coordenadas de mapa
```

**Esforço:** Alto (5-7 dias, requer data enrichment)
**Impacto:** Muito Alto (feature visualmente impactante)

---

#### 3. **Discord Bot Integration**
**O que o TibiaRoute faz:**
- Bot que responde comandos no Discord
- Exemplos: `/hunt <level>` retorna spots recomendados
- Compartilha dados da Bestiary

**Por que seria útil no Bestiary Planner:**
- Usuários poderiam consultar progresso sem abrir o site
- Notificações de milestones (100 completed, 50% progress)
- Compartilhamento de session results com guild

**Implementação Sugerida:**
```javascript
// Backend: Discord Bot (Node.js + discord.js)
Comandos:
- /bestiary progress → retorna % completo + CP earned
- /bestiary suggest <level> → top 5 suggestions por efficiency
- /bestiary session → mostra session plan atual
- /bestiary completed → lista completions de hoje

// Integration:
- Usar Supabase API para buscar dados do usuário
- Autenticação via Discord OAuth → link conta Tibia
```

**Esforço:** Alto (7-10 dias, requer backend separado)
**Impacto:** Médio (nice-to-have, não core feature)

---

### ⭐ PRIORIDADE MÉDIA (Melhorias Incrementais)

#### 4. **Calculadora de Tempo Baseada em HP**
**O que o TibiaRoute faz:**
- Fórmula: `~15/sqrt(HP/100) kills/min`
- Calcula tempo estimado para completar bestiary entry

**Por que seria útil no Bestiary Planner:**
- Bestiary Planner já tem "estimated time" mas usa fórmula genérica
- Fórmula do TibiaRoute é mais precisa (baseada em HP)

**Implementação Sugerida:**
```javascript
// bestiaryStages.js - melhorar getKillsToComplete()
function estimateTimeToComplete(creature, currentKills) {
  const killsRemaining = getKillsToComplete(creature.difficulty) - currentKills;
  const killsPerMin = 15 / Math.sqrt(creature.hitpoints / 100);
  const minutesRemaining = killsRemaining / killsPerMin;

  return {
    minutes: minutesRemaining,
    hours: (minutesRemaining / 60).toFixed(1),
    formatted: formatDuration(minutesRemaining)
  };
}

// Exibir em CreatureCard e Session Planner
```

**Esforço:** Baixo (1 dia)
**Impacto:** Médio (melhora accuracy de estimativas)

---

#### 5. **Filtro por Account Type (Free vs Premium)**
**O que o TibiaRoute faz:**
- Filtra criaturas disponíveis para Free Account vs Premium

**Por que seria útil no Bestiary Planner:**
- Muitos jogadores usam Free Account
- Evita frustração de planejar criaturas inacessíveis

**Implementação Sugerida:**
```javascript
// BESTIARY_DATA - adicionar campo "accountType"
{
  id: "amazon",
  name: "Amazon",
  accountType: "premium", // ou "free" ou "both"
  // ...
}

// FilterPanel - adicionar toggle "Account Type"
<FilterGroup>
  <Label>Account Type</Label>
  <ChipGroup>
    <Chip selected={filters.accountType.includes('free')}>Free</Chip>
    <Chip selected={filters.accountType.includes('premium')}>Premium</Chip>
  </ChipGroup>
</FilterGroup>

// useBestiaryPlanner - adicionar filtro
const filteredCreatures = VALID_BESTIARY_DATA.filter(creature => {
  // ...existing filters
  if (filters.accountType.length > 0 && !filters.accountType.includes(creature.accountType)) {
    return false;
  }
  return true;
});
```

**Esforço:** Baixo (2 dias, incluindo data enrichment)
**Impacto:** Médio (útil para free players)

---

#### 6. **Relatório de Bugs Contextual**
**O que o TibiaRoute faz:**
- Formulário para reportar bugs e sugestões
- Menu de contexto no mapa para reportar problemas específicos

**Por que seria útil no Bestiary Planner:**
- Atualmente não há forma de usuários reportarem bugs in-app
- Feedback contextual melhoraria qualidade de dados (ex: location incorreta)

**Implementação Sugerida:**
```javascript
// Componente: FeedbackModal.js
- Botão "Report Issue" em CreatureCard (menu dropdown)
- Campos: Issue type (wrong data, missing location, bug), description
- Context auto-capturado: creature ID, user character, timestamp
- Submit para Supabase table "feedback" ou GitHub Issues API

// CreatureCard - adicionar action menu
<DropdownMenu>
  <MenuItem onClick={handleComplete}>Complete</MenuItem>
  <MenuItem onClick={handleEditKills}>Edit Kills</MenuItem>
  <MenuItem onClick={handleAddToPlan}>Add to Plan</MenuItem>
  <Divider />
  <MenuItem onClick={handleReportIssue}>Report Issue</MenuItem>
</DropdownMenu>
```

**Esforço:** Médio (3 dias)
**Impacto:** Baixo (qualidade de vida)

---

### ⭐ PRIORIDADE BAIXA (Long-term / Nice-to-have)

#### 7. **Twitch/Kick Chat Bot**
**O que o TibiaRoute faz:**
- Bot para streamers integrarem dados no chat
- Viewers podem consultar informações via commands

**Por que seria útil no Bestiary Planner:**
- Nicho específico (streamers)
- Baixo volume de usuários

**Esforço:** Alto (5+ dias)
**Impacto:** Baixo (público limitado)

---

#### 8. **Exaltation Forge Tracker**
**O que o TibiaRoute faz:**
- Rastreamento de dust e slivers para Exaltation Forge

**Por que seria útil no Bestiary Planner:**
- Completamente fora do escopo de Bestiary
- Seria uma feature separada

**Esforço:** Alto (nova feature isolada)
**Impacto:** Baixo (escopo diferente)

---

## 🔧 MELHORIAS GERAIS PROPOSTAS (Independentes do TibiaRoute)

### 1. **Dark Mode** ✨
**Status:** CSS tokens prontos, falta toggle UI
**Esforço:** Baixo (1 dia)
**Impacto:** Alto (UX improvement)

### 2. **Voice Input para Search**
**Tecnologia:** Web Speech API
**Esforço:** Médio (2-3 dias)
**Impacto:** Médio (accessibility + cool factor)

### 3. **Analytics Dashboard**
**Métricas:**
- Tempo médio para completar por difficulty
- Criaturas mais rápidas/lentas
- Streaks de completions
- Projeção para 100% (machine learning?)

**Esforço:** Alto (5 dias)
**Impacto:** Médio (engagement)

### 4. **Refatoração de BESTIARY_DATA**
**Problema:** 305KB inline JSON
**Solução:** Split em chunks, lazy-load por region ou letra
**Esforço:** Médio (3 dias)
**Impacto:** Alto (performance)

### 5. **Service Worker para Offline OCR**
**Problema:** OCR requer internet
**Solução:** Cache de imagens processadas, retry quando voltar online
**Esforço:** Alto (4 dias)
**Impacto:** Médio (offline-first improvement)

### 6. **Undo Timeout Configurável**
**Problema:** 10s fixo é curto
**Solução:** Setting para customizar (10s, 30s, 60s, never)
**Esforço:** Baixo (1 dia)
**Impacto:** Médio (UX)

### 7. **Autocomplete com Sugestões Inteligentes**
**Problema:** OCR falha, usuário precisa digitar nome exato
**Solução:**
- Sugestões baseadas em location atual (se detectável)
- Sugestões baseadas em level do character
- "Frequently searched" cache

**Esforço:** Médio (2 dias)
**Impacto:** Médio (melhora flow de OCR)

---

## 📋 ROADMAP SUGERIDO

### Sprint 1 (Quick Wins - 2 semanas)
1. ✅ Calculadora de tempo baseada em HP (1 dia)
2. ✅ Filtro por Account Type (2 dias)
3. ✅ Dark Mode toggle (1 dia)
4. ✅ Undo timeout configurável (1 dia)
5. ✅ Comparação lado-a-lado (3 dias)

**Total:** 8 dias úteis
**Impacto:** Melhorias visíveis, feedback imediato de usuários

### Sprint 2 (Core Improvements - 3 semanas)
1. ✅ Refatoração BESTIARY_DATA (3 dias)
2. ✅ Mapa interativo básico (5 dias)
3. ✅ Analytics dashboard v1 (3 dias)
4. ✅ Relatório de bugs contextual (2 dias)

**Total:** 13 dias úteis
**Impacto:** Features estruturais, melhora arquitetura

### Sprint 3 (Advanced Features - 4 semanas)
1. ✅ Mapa interativo com route optimizer (5 dias)
2. ✅ Discord Bot MVP (7 dias)
3. ✅ Voice input (3 dias)
4. ✅ Service Worker offline OCR (4 dias)

**Total:** 19 dias úteis
**Impacto:** Features avançadas, diferenciação competitiva

---

## 🏆 MATRIZ DE PRIORIZAÇÃO (Esforço vs Impacto)

```
         IMPACTO
         ┌─────────────────────────────┐
    ALTO │ ⭐ Comparação Lado-a-Lado  │ ⭐ Mapa Interativo
         │ ⭐ Dark Mode               │
         │ ⭐ BESTIARY_DATA Refactor  │
         ├─────────────────────────────┤
   MÉDIO │ ⭐ Calculadora Tempo HP    │ ⭐ Discord Bot
         │ ⭐ Filtro Account Type     │ ⭐ Service Worker
         │ ⭐ Undo Timeout            │ ⭐ Analytics Dashboard
         │ ⭐ Voice Input             │
         ├─────────────────────────────┤
   BAIXO │ ⭐ Relatório de Bugs       │ ⭐ Twitch Bot
         │                            │ ⭐ Exaltation Forge
         └─────────────────────────────┘
           BAIXO      MÉDIO      ALTO
                  ESFORÇO
```

**Recomendação:** Focar em Quick Wins (alto impacto, baixo esforço) primeiro!

---

## 🎨 MOCKUPS E WIREFRAMES SUGERIDOS

### Feature: Comparação Lado-a-Lado
```
┌─────────────────────────────────────────────────────────────────┐
│ Compare Creatures                                          [×]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [Dragon]      [Dragon Lord]    [Wyrm]         [+ Add]        │
│   🐉            🐲              🐲                              │
│                                                                 │
│  HP:          1000 | 2100 | 1550                               │
│  Exp:          700 | 900  | 1550                               │
│  CP:             5 |    5 |   10                               │
│  Difficulty:  EASY | MED  | MED                                │
│  Time Est:    15m  | 22m  | 18m    ← NEW!                      │
│                                                                 │
│  Resistances:                                                   │
│  🔥 Fire:     -20% | +20% |  0%                                │
│  ❄️ Ice:      +20% | -20% | +20%                               │
│  ⚡ Energy:     0%  |  0%  | -20%                               │
│                                                                 │
│  Locations:                                                     │
│  • Fibula        • Edron      • Okolnir                        │
│  • Ghostlands    • Ghostlands • Ghostlands  ← OVERLAP!         │
│                                                                 │
│  Efficiency:   ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐                           │
│                                                                 │
│  [Complete All]  [Plan All]  [Optimize Route]                  │
└─────────────────────────────────────────────────────────────────┘
```

### Feature: Mapa Interativo
```
┌─────────────────────────────────────────────────────────────────┐
│ Hunt Route Optimizer                                      [×]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  🗺️ Interactive Map                       📋 Session Plan      │
│  ┌───────────────────────────┐            ┌─────────────────┐  │
│  │         🏔️ Fibula         │            │ 1. Dragon       │  │
│  │                           │            │ 2. Dragon Lord  │  │
│  │   🐉 ←─── 📍 Start       │            │ 3. Wyrm         │  │
│  │    ↓                      │            │                 │  │
│  │   🐲 ←───┐               │            │ Total: 20 CP    │  │
│  │    ↓     │               │            │ Est: 55 min     │  │
│  │   🐲 ────┘               │            │                 │  │
│  │                           │            │ [Start Hunt]    │  │
│  │  Legend:                  │            └─────────────────┘  │
│  │  🟢 Completed             │                                 │
│  │  🔴 Not Started           │                                 │
│  │  🟡 In Progress           │                                 │
│  └───────────────────────────┘                                 │
│                                                                 │
│  Route Optimization: SHORTEST PATH ✓                           │
│  [Recalculate]  [Export to GPS]  [Share Route]                │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📊 MÉTRICAS DE SUCESSO

### KPIs para Features Propostas

#### Comparação Lado-a-Lado
- **Adoção:** 40%+ de usuários ativos usam ao menos 1x/semana
- **Engagement:** Média de 3 comparações por sessão
- **Feedback:** NPS ≥ 8/10

#### Mapa Interativo
- **Adoção:** 60%+ de usuários exploram o mapa
- **Route Optimizer:** 30%+ usam para planejar sessions
- **Performance:** Load time < 2s

#### Discord Bot
- **Servidores:** 50+ servidores integrados em 3 meses
- **Comandos:** 100+ comandos/dia
- **Retenção:** 70%+ de servidores ativos após 1 mês

#### Dark Mode
- **Adoção:** 50%+ de usuários preferem dark mode
- **Acessibilidade:** WCAG 2.1 AA compliance

---

## 🚀 CONCLUSÃO E RECOMENDAÇÕES

### Top 3 Features para Implementar AGORA
1. **Comparação Lado-a-Lado** (esforço médio, impacto alto)
2. **Calculadora de Tempo HP** (esforço baixo, impacto médio)
3. **Dark Mode** (esforço baixo, impacto alto)

### Features para Q2 2026
1. **Mapa Interativo** (feature killer, alta diferenciação)
2. **Refatoração BESTIARY_DATA** (melhora performance)

### Features para Avaliar com Usuários
1. **Discord Bot** (validar demanda antes de investir)
2. **Analytics Dashboard** (survey: quais métricas interessam?)

### Features para Descartar (por ora)
1. **Twitch/Kick Bot** (nicho muito específico)
2. **Exaltation Forge** (fora do escopo)

---

## 📝 PRÓXIMOS PASSOS

1. ✅ Validar análise com stakeholder/usuários
2. ✅ Priorizar Sprint 1 (Quick Wins)
3. ✅ Criar issues no GitHub para cada feature
4. ✅ Design mockups detalhados (Figma)
5. ✅ Implementar feature flags para rollout gradual
6. ✅ Setup analytics (Mixpanel ou similar) para medir adoção

---

**Arquivo gerado:** Análise comparativa TibiaRoute vs Bestiary Planner
**Autor:** Claude Sonnet 4.5 (Architect Agent)
**Data:** 2026-02-06
**Versão:** 1.0
