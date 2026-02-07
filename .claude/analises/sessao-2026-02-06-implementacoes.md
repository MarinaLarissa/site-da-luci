# SESSÃO DE DESENVOLVIMENTO - 2026-02-06
**Objetivo:** Implementar melhorias no Bestiary Planner baseadas em análise do TibiaRoute

---

## ✅ IMPLEMENTAÇÕES CONCLUÍDAS

### 1. Calculadora de Tempo HP (IMPLEMENTADA E REMOVIDA)

**Status:** ✅ Implementado → ❌ Removido por decisão do cliente

**O que foi feito:**
- Criado `timeEstimator.js` com fórmula `killsPerMin = 15 / sqrt(HP / 100)`
- Adicionado display de tempo estimado no CreatureCard
- Atualizado `useBestiaryPlanner` para usar efficiency score HP-based

**Por que foi removido:**
- Cliente decidiu que não devemos deduzir tempo estimado
- Tempo depende muito da jogabilidade e equipamentos individuais
- Mantido apenas o display de HP

**Código Mantido:**
- ✅ `timeEstimator.js` (pode ser usado internamente)
- ✅ `creatureHitpoints.js` (50+ criaturas com HP)
- ✅ Display de HP no CreatureCard
- ❌ Display de tempo removido

**Arquivos Modificados:**
- `frontend/src/utils/timeEstimator.js` (criado)
- `frontend/src/data/creatureHitpoints.js` (criado)
- `frontend/src/components/BestiaryPlanner/CreatureCard.js` (modificado)
- `frontend/src/hooks/useBestiaryPlanner.js` (modificado)

---

## 📊 ANÁLISES REALIZADAS

### 2. Comparação com TibiaDraptor e TibiaPal

**TibiaDraptor Features:**
- Tracking de bestiary, bosstiary, achievements
- Pode rastrear até 50 criaturas simultaneamente
- Ranking de players
- Site events e challenges

**TibiaPal Features:**
- ✅ **Organização por respawn type** (1x, Rapid, Rare/Events)
- ✅ **Classificação por eficiência** (pontos vs tempo)
- ✅ **Contexto de level** (adverte que dificuldade varia)
- ✅ **Localizações descritivas** com sub-regiões específicas
- ❌ Não tem tracking automático (apenas checklist manual)

**Melhorias Identificadas para Nosso Planner:**
1. ✅ Já temos: Tracking visual com checkboxes ✓
2. ✅ Já temos: Filtros dinâmicos ✓
3. ❌ Falta: Notificações de eventos raros
4. ❌ Falta: Histórico de tempo real gasto
5. ❌ Falta: Comparação side-by-side de criaturas
6. ✅ Planejado: Mapa interativo com waypoints

---

### 3. Análise de Dados - BESTIARY_DATA

**Total de Criaturas:** 590
**Criaturas com Imagens:** 590 (100%)
**Criaturas sem Imagens:** 0 ✅

**HP Coverage Atual:**
- Criaturas com HP no `creatureHitpoints.js`: ~50 (8.5%)
- Criaturas faltando HP: ~540 (91.5%)

**Fonte de Dados HP:** TibiaWikiApi
- Endpoint: `https://tibiawiki.dev/api/creatures?expand=true`
- Formato: JSON
- Exemplo campo: `"hp":"20"` ou `"hp":"3940"`
- Alguns com valor desconhecido: `"hp":"?"`

---

### 4. Licensing de Tiles do Tibia

**Pesquisa Realizada:** CipSoft Fansite Agreement

**Conclusões:**

✅ **PERMITIDO:**
- Usar sprites/tiles do jogo Tibia
- Criar trackers de bestiary
- Usar screenshots e assets gráficos
- Mapas e dados do jogo

⚠️ **CONDIÇÕES:**
- Atribuir copyright à CipSoft claramente
- Incluir disclaimer: "Tibia is copyrighted by CipSoft GmbH"
- Não usar ferramentas de cheat
- Não permitir trading de itens/contas por dinheiro real
- Manter conteúdo adequado para menores

🎯 **RECOMENDAÇÃO:**
- **SIM, podemos usar tiles customizados do Tibia**
- Adicionar footer: "© CipSoft GmbH. Tibia is a registered trademark."
- Link para tibia.com
- Considerar aplicar para Supported Fansite no futuro

**Referências:**
- [Fansite Agreement](https://www.tibia.com/community/?subtopic=fansites&page=agreement)
- [TibiaMaps.io](https://tibiamaps.io) - exemplo de fansite usando tiles
- [TibiaRoute](https://tibiaroute.com) - Promoted Fansite desde 2026-01-12

---

## 🗺️ DECISÕES DE MAPA

### Opção Escolhida: Tiles Customizados Tibia

**Documento Criado:** `map-tiles-options-comparison.md`

**3 Opções Comparadas:**
1. OpenStreetMap (⭐⭐☆☆☆) - Não temático
2. Canvas Simples (⭐⭐⭐☆☆) - Rápido mas limitado
3. **Tiles Tibia (⭐⭐⭐⭐⭐)** ← ESCOLHIDA

**Por que Tiles Tibia:**
- Máxima imersão visual
- Coordenadas reais do jogo
- Profissional e detalhado
- Licensing permitido (ver acima)

**Próximos Passos:**
1. Pesquisar fonte de tiles:
   - TibiaMaps.io API?
   - Comunidade OTServ?
   - Gerar do game client?
2. Implementar com react-leaflet + CRS.Simple
3. Adicionar markers de spawns
4. Floor selector (-8 a +15)
5. Route optimizer

---

## 📋 PRÓXIMAS IMPLEMENTAÇÕES

### A. Expandir HP para Todas as Criaturas

**Plano:**
1. Script para fetch de TibiaWikiApi
2. Parse e merge com BESTIARY_DATA
3. Validar e revisar
4. Commit

**Código Sugerido:**
```javascript
// scripts/updateHitpoints.js
const fetch = require('node-fetch');
const fs = require('fs');

async function fetchCreaturesFromAPI() {
  const response = await fetch('https://tibiawiki.dev/api/creatures?expand=true');
  const creatures = await response.json();

  const hpMap = {};
  creatures.forEach(c => {
    if (c.hp && c.hp !== '?') {
      const id = c.name.toLowerCase().replace(/\s+/g, '-');
      hpMap[id] = parseInt(c.hp);
    }
  });

  return hpMap;
}

async function updateBestiaryData() {
  const hpMap = await fetchCreaturesFromAPI();

  // Read bestiary.js
  const bestiaryPath = './frontend/src/data/bestiary.js';
  let content = fs.readFileSync(bestiaryPath, 'utf8');

  // For each creature in hpMap, add hitpoints field
  // (Complex string manipulation or JSON parsing)

  fs.writeFileSync(bestiaryPath, content);
  console.log('✅ HP data updated!');
}

updateBestiaryData();
```

**Estimativa:** 2-3 horas

---

### B. Melhorar Display de Locations

**Requisito:** Click para expandir todos os locations (não apenas tooltip hover)

**Opção 1: Modal**
```javascript
const [showLocationsModal, setShowLocationsModal] = useState(false);

<LocationMore onClick={() => setShowLocationsModal(true)}>
  +{creature.locations.length - MAX_VISIBLE_LOCATIONS}
</LocationMore>

{showLocationsModal && (
  <Modal onClose={() => setShowLocationsModal(false)}>
    <h3>{creature.name} - Spawn Locations</h3>
    <ul>
      {creature.locations.map(loc => <li>{loc}</li>)}
    </ul>
  </Modal>
)}
```

**Opção 2: Expand Inline**
```javascript
const [showAllLocations, setShowAllLocations] = useState(false);

<LocationList>
  {(showAllLocations ? creature.locations : creature.locations.slice(0, 2))
    .map(loc => <LocationChip>{loc}</LocationChip>)}
</LocationList>

{creature.locations.length > 2 && (
  <ExpandButton onClick={() => setShowAllLocations(!showAllLocations)}>
    {showAllLocations ? 'Show Less' : `+${creature.locations.length - 2} more`}
  </ExpandButton>
)}
```

**Recomendação:** Opção 2 (expand inline) - mais simples e fluido

**Estimativa:** 1 hora

---

### C. Voice Input Implementation

**Objetivo:** Permitir gravação de áudio falando nomes de criaturas para auto-fill

**Features:**
1. Botão "🎤 Voice Input"
2. Reconhecimento de voz (Web Speech API)
3. Parsing: "completei dragon, wyrm, demon"
4. Fuzzy matching com BESTIARY_DATA
5. Confirmação modal antes de aplicar

**Stack:**
```javascript
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
```

**Componente Principal:**
```javascript
// VoiceInput.js
- Botão mic (recording state)
- Transcript display em tempo real
- Lista de criaturas reconhecidas (com confidence %)
- Confirmação/Retry

// Integration points:
- BestiaryPlanner.js (botão próximo a ScreenshotImport)
- Compartilha mesma lógica de fuzzy matching do OCR
```

**Documento Criado:** Detalhes em `plano-melhorias-bestiary-revisado-2026-02-06.md`

**Estimativa:** 3-5 dias
- Day 1: Componente básico + Web Speech API
- Day 2: Fuzzy matching + parsing
- Day 3: UI polish + confirmação
- Day 4-5: Multi-idioma + edge cases

---

## 🔧 ARQUIVOS CRIADOS/MODIFICADOS

### Criados:
1. `frontend/src/utils/timeEstimator.js` - Cálculos de tempo HP-based
2. `frontend/src/data/creatureHitpoints.js` - Dados de HP (50 criaturas)
3. `.claude/analises/tibia-route-vs-bestiary-planner-2026-02-06.md` - Análise comparativa
4. `.claude/analises/plano-melhorias-bestiary-revisado-2026-02-06.md` - Plano revisado
5. `.claude/analises/map-tiles-options-comparison.md` - Comparação tiles
6. `.claude/analises/sessao-2026-02-06-implementacoes.md` - Este arquivo

### Modificados:
1. `frontend/src/components/BestiaryPlanner/CreatureCard.js`
   - Adicionado import de timeEstimator (depois removido)
   - Adicionado display de HP
   - Removido display de tempo estimado

2. `frontend/src/hooks/useBestiaryPlanner.js`
   - Atualizado calculateEfficiencyScore para usar HP-based formula
   - Import de timeEstimator utils

---

## 📊 ESTATÍSTICAS DA SESSÃO

**Duração:** ~2.5 horas
**Tools Usados:** 45+
**Arquivos Lidos:** 8
**Arquivos Modificados:** 2
**Arquivos Criados:** 6
**Web Searches:** 8
**Web Fetches:** 10
**Análises Completas:** 4

**Progresso:**
- ✅ Calculadora HP (implementada)
- ✅ Display HP nos cards
- ✅ Análise TibiaDraptor/TibiaPal
- ✅ Pesquisa licensing tiles
- ✅ Verificação imagens
- ✅ Plano Voice Input
- ⏳ Expandir HP todas criaturas (planejado)
- ⏳ Melhorar locations display (planejado)
- ⏳ Voice Input (planejado - próximo sprint)

---

## 🎯 PRÓXIMA SESSÃO - RECOMENDAÇÕES

### Prioridade Alta (Sprint Atual):
1. **Script para expandir HP** (2-3h)
   - Usar TibiaWikiApi
   - Merge com bestiary.js

2. **Melhorar locations display** (1h)
   - Expand inline ao clicar
   - Mostrar todos os spawns

### Prioridade Média (Próximo Sprint):
3. **Voice Input MVP** (3-5 dias)
   - Componente básico
   - Web Speech API
   - Fuzzy matching

4. **Mapa Interativo Research** (2 dias)
   - Encontrar fonte de tiles
   - POC com react-leaflet
   - Validar performance

### Backlog:
5. Notificações de eventos raros
6. Histórico de tempo real
7. Comparação side-by-side
8. Aplicar para Supported Fansite

---

## 📝 NOTAS IMPORTANTES

### Feedback do Cliente:
- ❌ **NÃO deduzir tempo estimado** - removido
- ✅ **Informar HP em todas** - planejado
- ✅ **Validar licensing** - ✓ permitido
- ✅ **Tiles Tibia** - decisão confirmada
- ✅ **Voice Input** - próximo passo

### Decisões Técnicas:
- Usar TibiaWikiApi para dados
- react-leaflet para mapas
- Web Speech API para voice
- Manter efficiency score (sem exibir tempo)

### Riscos Identificados:
- ⚠️ TibiaWikiApi pode ter criaturas com HP="?"
- ⚠️ Tiles do Tibia - precisa encontrar fonte confiável
- ⚠️ Web Speech API - suporte apenas Chrome/Edge

---

## 🔗 LINKS ÚTEIS

**APIs:**
- [TibiaWikiApi](https://tibiawiki.dev)
- [TibiaData](https://tibiadata.com)
- [Creatures Endpoint](https://tibiawiki.dev/api/creatures?expand=true)

**Referências:**
- [TibiaRoute](https://tibiaroute.com)
- [TibiaDraptor](https://tibiadraptor.com/bestiary)
- [TibiaPal](https://tibiapal.com/bestiary)
- [TibiaMaps.io](https://tibiamaps.io)

**Licensing:**
- [Fansite Agreement](https://www.tibia.com/community/?subtopic=fansites&page=agreement)

**Documentação:**
- [React Leaflet](https://react-leaflet.js.org/)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

---

**Sessão finalizada em:** 2026-02-06
**Próxima sessão:** Voice Input Implementation
**Status geral:** ✅ Progresso excelente, roadmap claro
