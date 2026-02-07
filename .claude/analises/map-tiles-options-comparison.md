# OPÇÕES DE TILES PARA MAPA INTERATIVO - BESTIARY PLANNER
**Data:** 2026-02-06
**Objetivo:** Comparar opções de tiles para implementação do mapa de spawns

---

## 🗺️ OPÇÃO 1: OpenStreetMap (OSM)

### Descrição
Tiles do OpenStreetMap são mapas "reais" do mundo, mostrando ruas, cidades, geografia real.

### Prós
- ✅ **Grátis** e open-source
- ✅ **Fácil implementação** (1 linha de código)
- ✅ **Sem custos** de hosting de tiles
- ✅ **Bem documentado** (milhares de exemplos)

### Contras
- ❌ **Não temático** - mostra geografia real, não o mundo de Tibia
- ❌ **Confuso para usuários** - spawns de "Ghostlands" em cima de São Paulo?
- ❌ **Não imersivo** - quebra a temática do Tibia

### Código de Implementação
```javascript
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

<MapContainer center={[51.505, -0.09]} zoom={13}>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; OpenStreetMap contributors'
  />
  {/* Markers dos spawns */}
</MapContainer>
```

### Exemplo Visual (Conceitual)
```
┌──────────────────────────────────────────┐
│  [Zoom -] [Zoom +]                 [×]  │
├──────────────────────────────────────────┤
│                                          │
│     Real World Map (OSM)                 │
│     🌍 Europe shown                      │
│                                          │
│       📍 "Dragon spawn" marker          │
│       (placed on random location)        │
│                                          │
│     Streets, Cities, Rivers              │
│     Not Tibia-themed                     │
│                                          │
└──────────────────────────────────────────┘
```

### Avaliação
⭐⭐☆☆☆ (2/5) - Funcional mas não adequado tematicamente

---

## 🎨 OPÇÃO 2: Canvas Simples com Regiões

### Descrição
Criar um mapa minimalista usando HTML Canvas ou SVG, mostrando apenas as regiões do Tibia como "áreas coloridas".

### Prós
- ✅ **100% customizável** - controle total sobre visual
- ✅ **Leve** - sem tiles externos para carregar
- ✅ **Temático** - mostra regiões do Tibia (Venore, Thais, etc.)
- ✅ **Rápido** - renderização local, sem network

### Contras
- ❌ **Trabalhoso** - precisa desenhar manualmente
- ❌ **Sem detalhes** - não mostra dungeons, floors, terreno
- ❌ **Menos profissional** - visual simplificado

### Código de Implementação
```javascript
import { useRef, useEffect } from 'react';

const TibiaRegionsMap = ({ spawns }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Draw Tibia regions as colored areas
    drawRegion(ctx, 'Venore', { x: 100, y: 200, color: '#4CAF50' });
    drawRegion(ctx, 'Thais', { x: 300, y: 150, color: '#2196F3' });
    drawRegion(ctx, 'Carlin', { x: 200, y: 100, color: '#FF5722' });
    // ... more regions

    // Draw spawn markers
    spawns.forEach(spawn => {
      drawMarker(ctx, spawn.x, spawn.y, spawn.status);
    });
  }, [spawns]);

  return <canvas ref={canvasRef} width={800} height={600} />;
};

function drawRegion(ctx, name, { x, y, color }) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 150, 100);
  ctx.fillStyle = '#fff';
  ctx.font = '16px Arial';
  ctx.fillText(name, x + 10, y + 50);
}

function drawMarker(ctx, x, y, status) {
  ctx.fillStyle = status === 'complete' ? '#10b981' : '#ef4444';
  ctx.beginPath();
  ctx.arc(x, y, 8, 0, 2 * Math.PI);
  ctx.fill();
}
```

### Exemplo Visual (Conceitual)
```
┌──────────────────────────────────────────┐
│  Tibia Regions Map                  [×] │
├──────────────────────────────────────────┤
│                                          │
│   ┌─────────┐                            │
│   │ CARLIN  │  🔴🔴                      │
│   │  (red)  │                            │
│   └─────────┘                            │
│        ┌─────────┐                       │
│        │ VENORE  │  🟢🟡🔴               │
│        │ (green) │                       │
│        └─────────┘                       │
│   ┌─────────┐                            │
│   │  THAIS  │  🟡🟡                      │
│   │  (blue) │                            │
│   └─────────┘                            │
│                                          │
│  Legend: 🟢 Complete | 🟡 In Progress | 🔴 Not Started
└──────────────────────────────────────────┘
```

### Avaliação
⭐⭐⭐☆☆ (3/5) - Simples e temático, mas sem detalhes

---

## 🎮 OPÇÃO 3: Tiles Customizados do Tibia (Estilo TibiaMaps.io)

### Descrição
Criar ou usar tiles reais do mapa de Tibia, mostrando terreno, dungeons, floors exatamente como no jogo.

### Prós
- ✅ **Máxima imersão** - visual autêntico do Tibia
- ✅ **Detalhes precisos** - mostra dungeons, floors, NPCs
- ✅ **Profissional** - igual ao TibiaRoute/TibiaMaps
- ✅ **Coordenadas reais** - matching exato com o jogo

### Contras
- ❌ **Complexo** - precisa obter/gerar tiles
- ❌ **Copyright?** - tiles do Tibia são propriedade CipSoft
- ❌ **Tamanho** - muitos tiles para hospedar
- ❌ **Manutenção** - updates do jogo requerem novos tiles

### Fontes de Tiles Possíveis
1. **TibiaMaps.io** - talvez tenha API?
2. **Gerar do game client** - extrair usando ferramentas de modding
3. **Comunidade** - tiles públicos (verificar licença)
4. **Simplificado** - criar tiles "inspired by" Tibia (não cópias exatas)

### Código de Implementação
```javascript
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

<MapContainer
  center={[32400, 32100]} // Tibia coordinates (convert to lat/lng)
  zoom={3}
  minZoom={0}
  maxZoom={6}
  crs={L.CRS.Simple} // Important: use Simple CRS for game maps
>
  <TileLayer
    url="https://your-cdn.com/tibia-tiles/{z}/{x}/{y}.png"
    // OR use TibiaMaps.io API if available
    // url="https://tibiamaps.io/tiles/{z}/{x}/{y}.png"
    attribution='© Tibia Maps'
    tileSize={256}
    noWrap={true}
  />

  {/* Spawn markers */}
  <Marker position={convertTibiaToLatLng(spawn.x, spawn.y)}>
    <Popup>{spawn.name}</Popup>
  </Marker>
</MapContainer>
```

### Exemplo Visual (Conceitual)
```
┌──────────────────────────────────────────┐
│  Tibia World Map                    [×] │
├──────────────────────────────────────────┤
│                                          │
│   🏰 Thais (rendered terrain)           │
│   ┌─────────────────────┐               │
│   │ ▓▓▓▓░░░░🌳🌳        │               │
│   │ ▓▓▓▓░░░░🌳🌳  🐉   │  ← Dragon    │
│   │ ░░░░░░░░            │     spawn     │
│   │     🏠🏠            │               │
│   │   🏛️ Temple         │               │
│   │ ░░░░🌊🌊🌊         │               │
│   └─────────────────────┘               │
│                                          │
│   Floors: [-8] [-7] ... [0] [+1] [+2]  │
│                     ↑ Current            │
└──────────────────────────────────────────┘
```

### Avaliação
⭐⭐⭐⭐⭐ (5/5) - Ideal, mas requer mais trabalho

---

## 🎯 OPÇÃO 4: HÍBRIDA (Recomendada para MVP)

### Descrição
Começar com **Canvas Simples** (Opção 2) e evoluir para **Tiles Customizados** (Opção 3) depois.

### Fase 1: MVP (Canvas)
```javascript
// Mapa minimalista com regiões coloridas
<RegionsMap>
  {spawns.map(spawn => (
    <SpawnMarker
      region={spawn.region}
      creature={spawn.creature}
      status={spawn.status}
    />
  ))}
</RegionsMap>
```

### Fase 2: Enhanced (Leaflet + OSM temporário)
```javascript
// Leaflet com OSM enquanto prepara tiles customizados
<MapContainer>
  <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
  <SpawnMarkers />
</MapContainer>
```

### Fase 3: Final (Tiles Tibia)
```javascript
// Leaflet com tiles do Tibia
<MapContainer crs={L.CRS.Simple}>
  <TileLayer url="/tiles/tibia/{z}/{x}/{y}.png" />
  <SpawnMarkers />
  <FloorSelector />
  <RouteOptimizer />
</MapContainer>
```

### Avaliação
⭐⭐⭐⭐☆ (4/5) - Pragmática, entrega valor incremental

---

## 📊 COMPARAÇÃO LADO-A-LADO

| Critério | OSM | Canvas | Tibia Tiles | Híbrida |
|----------|-----|--------|-------------|---------|
| **Facilidade** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |
| **Custo** | Grátis | Grátis | ? | Grátis |
| **Imersão** | ⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Performance** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Manutenção** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| **Detalhes** | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

---

## 🚀 RECOMENDAÇÃO FINAL

### Para COMEÇAR (Sprint 1):
**Opção 2: Canvas Simples com Regiões**
- Quick win (2-3 dias)
- Entrega valor imediatamente
- Feedback rápido dos usuários
- Fácil iterar

### Para FUTURO (Sprint 3):
**Opção 3: Tiles Customizados do Tibia**
- Investir tempo pesquisando tiles
- Verificar legalidade/licensing
- Implementar se viável

### Abordagem Pragmática:
```
Week 1-2: Canvas básico com regiões principais
Week 3-4: Adicionar markers, clustering, interactions
Week 5-6: Pesquisar tiles do Tibia
Week 7+:   Migrar para tiles se disponíveis
```

---

## 🔍 PESQUISA NECESSÁRIA: Tiles do Tibia

### Perguntas a Investigar:
1. **TibiaMaps.io tem API pública?**
   - Verificar docs
   - Contatar desenvolvedores?

2. **Existe tile server open-source?**
   - Procurar no GitHub: "tibia map tiles"
   - Verificar OTServ community tools

3. **Legal extrair tiles do client?**
   - Terms of Service CipSoft
   - Fair use para fansites?

4. **Alternativa: gerar tiles "inspired by"?**
   - Criar estilo visual similar mas não idêntico
   - Evitar copyright issues

---

## 📝 PRÓXIMOS PASSOS

1. ✅ **Decisão do usuário:** Qual opção prefere?
2. ⏳ **Se Canvas:** Começar implementação MVP
3. ⏳ **Se Tibia Tiles:** Pesquisar fontes de tiles primeiro
4. ⏳ **Se Híbrida:** Canvas MVP + tiles research em paralelo

---

**Arquivo gerado:** Comparação de opções de tiles para mapa
**Autor:** Claude Sonnet 4.5
**Data:** 2026-02-06
