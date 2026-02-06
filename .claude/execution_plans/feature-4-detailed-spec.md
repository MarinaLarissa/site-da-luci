# Feature 4 - Progress History - Especificação Detalhada

**Data**: 2026-02-05
**Status**: Em Implementação
**Última Feature do Plano**: SIM

---

## 📋 Visão Geral

Implementar sistema completo de visualização de progresso do Bestiary ao longo do tempo com:
- Gráficos de charm points (SVG puro, zero-dependency)
- Timeline de completions agrupada por data
- Estatísticas agregadas (média diária, streaks, projeções)
- Export para CSV e JSON

---

## 🏗️ Arquitetura da Feature

### Camadas

```
Components (UI)
    ├── ProgressHistory.js (Orquestrador com Tabs)
    ├── ProgressChart.js (Gráficos)
    ├── ProgressTimeline.js (Timeline vertical)
    ├── ProgressStatistics.js (Cards de estatísticas)
    ├── ProgressExport.js (Export UI)
    └── SimpleChart.js (Componente SVG reutilizável)

Hooks (Data Logic)
    └── useProgressData.js (Consome progressHistoryStorage, cache)

Services (Storage)
    ├── progressHistoryStorage.js (Histórico longo prazo)
    ├── dailyProgressStorage.js (MODIFICAR - histórico > 7 dias)
    └── bestiaryStorage.js (MODIFICAR - salvar no progressHistoryStorage)

Utils (Pure Functions)
    ├── chartDataUtils.js (aggregateByDay, calculateTrend, fillMissingDates)
    └── exportUtils.js (generateCSV, downloadFile, formatDataForExport)
```

---

## 📦 Novos Arquivos (12 arquivos)

### 1. progressHistoryStorage.js
**Path**: `frontend/src/services/progressHistoryStorage.js`

**Responsabilidade**: Armazenar histórico de completions > 7 dias (até 1 ano)

**Estrutura de Dados**:
```javascript
// localStorage key: `progress_history_{characterId}`
{
  version: "1.0",
  characterId: "uuid",
  history: {
    "2026-02-05": [
      {
        id: "dragon",
        name: "Dragon",
        charmPoints: 25,
        completedAt: "2026-02-05T14:30:00.000Z"
      }
    ],
    "2026-02-04": [ /* completions */ ]
  },
  lastUpdated: "2026-02-05T14:30:00.000Z"
}
```

**Funções Exportadas**:
```javascript
// Salvar completion
export const saveCompletion = (characterId, creatureData) => {
  // Adiciona completion no dia correto
  // Chama cleanOldHistory (> 1 ano)
};

// Buscar completions por período
export const getCompletionsByPeriod = (characterId, startDate, endDate) => {
  // Retorna array de completions filtradas por período
};

// Calcular streak consecutivo
export const calculateStreak = (characterId) => {
  // Retorna { current: 5, max: 12 }
};

// Estatísticas gerais
export const getStatistics = (characterId, days = 30) => {
  // Retorna {
  //   dailyAverage: 3.2,
  //   totalCompletions: 96,
  //   totalCharmPoints: 2400,
  //   mostProductiveDay: { date: "2026-01-15", count: 8 },
  //   streak: { current: 5, max: 12 }
  // }
};

// Histórico completo
export const getHistoricalData = (characterId, days = 365) => {
  // Retorna array de todos os dias com completions
};

// Limpar histórico antigo (> 1 ano)
const cleanOldHistory = (characterId) => {
  // Remove entries > 365 dias
};
```

**Considerações**:
- **Limite**: Manter apenas 1 ano de histórico
- **Indexação**: Por data (YYYY-MM-DD) para queries rápidas
- **Limpeza**: Automática ao salvar novo completion

---

### 2. chartDataUtils.js
**Path**: `frontend/src/utils/chartDataUtils.js`

**Responsabilidade**: Transformar dados brutos em formato para gráficos

**Funções Exportadas**:
```javascript
// Agregar completions por dia
export const aggregateByDay = (completions) => {
  // Input: array de completions
  // Output: [{ date: "2026-02-05", count: 3, charmPoints: 75 }]
};

// Preencher datas faltantes (para gráfico contínuo)
export const fillMissingDates = (data, startDate, endDate) => {
  // Input: array de dias com dados
  // Output: array incluindo dias sem completions (count: 0)
};

// Calcular trend line (regressão linear simples)
export const calculateTrend = (data) => {
  // Input: array de { date, value }
  // Output: { slope, intercept, points: [{ date, value }] }
};

// Calcular média móvel
export const calculateMovingAverage = (data, windowSize = 7) => {
  // Input: array de valores
  // Output: array de médias móveis
};
```

---

### 3. exportUtils.js
**Path**: `frontend/src/utils/exportUtils.js`

**Responsabilidade**: Gerar exports CSV/JSON e download

**Funções Exportadas**:
```javascript
// Gerar CSV com UTF-8 BOM (Excel compatível)
export const generateCSV = (data, columns) => {
  // Input: array de objetos, array de colunas
  // Output: string CSV com BOM
  // Exemplo: "\uFEFF" + csvContent
};

// Formatar dados para export
export const formatDataForExport = (completions, format = 'csv') => {
  // Input: array de completions, formato
  // Output: string formatada (CSV ou JSON)
};

// Download de arquivo
export const downloadFile = (content, filename, mimeType) => {
  // Cria Blob e trigger download
  // Exemplo: downloadFile(csvContent, 'bestiary-history.csv', 'text/csv')
};

// Gerar nome de arquivo com timestamp
export const generateFilename = (prefix, extension) => {
  // Exemplo: "bestiary-history-2026-02-05.csv"
};
```

---

### 4. useProgressData.js
**Path**: `frontend/src/hooks/useProgressData.js`

**Responsabilidade**: Hook para consumir dados de progressHistoryStorage com cache

**Interface**:
```javascript
const {
  chartData,        // Array de { date, count, charmPoints } para gráfico
  statistics,       // Objeto com estatísticas agregadas
  timeline,         // Array de completions agrupadas por data
  isLoading,        // Boolean
  error,            // Error | null
  refetch,          // Função para forçar reload
} = useProgressData(characterId, period); // period: '7d', '30d', '3m', 'all'
```

**Implementação**:
- Use `useMemo` para cache de transformações pesadas
- Use `useEffect` para carregar dados ao montar/mudar characterId
- Transforme dados brutos em formato consumível pelos componentes

---

### 5. SimpleChart.js + SimpleChart.styles.js
**Path**: `frontend/src/components/BestiaryPlanner/SimpleChart.js`

**Responsabilidade**: Componente SVG puro (zero-dependency) para gráficos

**Props**:
```javascript
<SimpleChart
  data={[
    { label: "2026-02-01", value: 50 },
    { label: "2026-02-02", value: 75 },
  ]}
  type="line"           // 'line', 'area', 'bar'
  width={600}           // Default width
  height={300}          // Default height
  color="#667eea"       // Primary color
  showGrid={true}       // Show grid lines
  showAxes={true}       // Show X/Y axes
  showTooltip={true}    // Show tooltip on hover
  responsive={true}     // Auto-resize
/>
```

**Features**:
- SVG puro (sem bibliotecas externas)
- Responsive (viewBox dinâmico)
- Tooltip on hover
- Grid lines opcionais
- Gradiente para gráfico de área
- Animação suave (CSS transitions)

**Exemplo de Estrutura SVG**:
```jsx
<ChartContainer>
  <svg viewBox="0 0 600 300" preserveAspectRatio="xMidYMid meet">
    {/* Grid lines */}
    <g className="grid">
      <line x1={0} y1={y} x2={600} y2={y} />
    </g>

    {/* Axes */}
    <g className="axes">
      <line x1={0} y1={300} x2={600} y2={300} /> {/* X axis */}
      <line x1={0} y1={0} x2={0} y2={300} />     {/* Y axis */}
    </g>

    {/* Data visualization */}
    {type === 'line' && (
      <polyline points={pointsString} fill="none" stroke={color} strokeWidth="2" />
    )}

    {type === 'area' && (
      <>
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <polygon points={areaPointsString} fill="url(#areaGradient)" />
        <polyline points={pointsString} fill="none" stroke={color} strokeWidth="2" />
      </>
    )}

    {type === 'bar' && (
      data.map((d, i) => (
        <rect key={i} x={x(i)} y={y(d.value)} width={barWidth} height={height - y(d.value)} fill={color} />
      ))
    )}

    {/* Data points (dots) */}
    {data.map((d, i) => (
      <circle key={i} cx={x(i)} cy={y(d.value)} r={4} fill={color} onMouseEnter={() => showTooltip(d)} />
    ))}
  </svg>

  {/* Tooltip */}
  {tooltip && (
    <Tooltip style={{ left: tooltip.x, top: tooltip.y }}>
      <div>{tooltip.label}</div>
      <div>{tooltip.value} CP</div>
    </Tooltip>
  )}
</ChartContainer>
```

**Styled Components**:
```javascript
export const ChartContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;

  svg {
    width: 100%;
    height: 100%;
  }

  .grid line {
    stroke: #e5e7eb;
    stroke-width: 1;
    stroke-dasharray: 4 4;
  }

  .axes line {
    stroke: #9ca3af;
    stroke-width: 2;
  }

  polyline, polygon {
    transition: all 0.3s ease;
  }

  circle {
    cursor: pointer;
    transition: r 0.2s ease;

    &:hover {
      r: 6;
    }
  }
`;

export const Tooltip = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  pointer-events: none;
  z-index: 1000;
  transform: translate(-50%, -120%);
  white-space: nowrap;
`;
```

---

### 6. ProgressChart.js + ProgressChart.styles.js
**Path**: `frontend/src/components/BestiaryPlanner/ProgressChart.js`

**Responsabilidade**: Gráfico de charm points ao longo do tempo

**Props**:
```javascript
<ProgressChart
  characterId="uuid"
  period="30d"  // '7d', '30d', '3m', 'all'
  onPeriodChange={(newPeriod) => {}}
/>
```

**Features**:
- Tabs de período: 7 dias, 30 dias, 3 meses, Todos
- Gráfico de linha com área (gradient)
- Tooltip com detalhes (data, completions, charm points)
- Trend line opcional
- Loading state

**Estrutura**:
```jsx
<ChartContainer>
  <ChartHeader>
    <ChartTitle>Charm Points ao Longo do Tempo</ChartTitle>
    <PeriodTabs>
      <PeriodTab active={period === '7d'} onClick={() => setPeriod('7d')}>
        7 Dias
      </PeriodTab>
      <PeriodTab active={period === '30d'} onClick={() => setPeriod('30d')}>
        30 Dias
      </PeriodTab>
      <PeriodTab active={period === '3m'} onClick={() => setPeriod('3m')}>
        3 Meses
      </PeriodTab>
      <PeriodTab active={period === 'all'} onClick={() => setPeriod('all')}>
        Todos
      </PeriodTab>
    </PeriodTabs>
  </ChartHeader>

  {isLoading ? (
    <LoadingSpinner />
  ) : (
    <SimpleChart
      data={chartData}
      type="area"
      color="#667eea"
      showGrid={true}
      showTooltip={true}
      responsive={true}
    />
  )}

  <ChartFooter>
    <Stat>
      <StatLabel>Total</StatLabel>
      <StatValue>{totalCharmPoints} CP</StatValue>
    </Stat>
    <Stat>
      <StatLabel>Média Diária</StatLabel>
      <StatValue>{dailyAverage} CP</StatValue>
    </Stat>
  </ChartFooter>
</ChartContainer>
```

---

### 7. ProgressTimeline.js + ProgressTimeline.styles.js
**Path**: `frontend/src/components/BestiaryPlanner/ProgressTimeline.js`

**Responsabilidade**: Timeline vertical de completions agrupada por data

**Props**:
```javascript
<ProgressTimeline characterId="uuid" limit={50} />
```

**Features**:
- Agrupamento por data (hoje, ontem, esta semana, mês passado)
- Infinite scroll (carregar mais ao scrollar)
- Mostrar criatura + charm points + horário
- Badges de milestone (100º completion, 500º, etc.)

**Estrutura**:
```jsx
<TimelineContainer>
  <TimelineHeader>
    <Title>Timeline de Completions</Title>
  </TimelineHeader>

  <TimelineList>
    {groupedByDate.map(({ date, completions }) => (
      <DateGroup key={date}>
        <DateHeader>
          <DateLabel>{formatDate(date)}</DateLabel>
          <DateStats>{completions.length} completions</DateStats>
        </DateHeader>

        <CompletionsList>
          {completions.map((completion) => (
            <CompletionItem key={completion.id + completion.completedAt}>
              <CompletionDot />
              <CompletionContent>
                <CreatureName>{completion.name}</CreatureName>
                <CompletionMeta>
                  {completion.charmPoints} CP · {formatTime(completion.completedAt)}
                </CompletionMeta>
              </CompletionContent>
              <CharmPointsBadge>{completion.charmPoints}</CharmPointsBadge>
            </CompletionItem>
          ))}
        </CompletionsList>
      </DateGroup>
    ))}
  </TimelineList>

  {hasMore && (
    <LoadMoreButton onClick={loadMore}>
      Carregar Mais
    </LoadMoreButton>
  )}
</TimelineContainer>
```

**Agrupamento de Datas**:
```javascript
const groupByDate = (completions) => {
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  // Agrupar por data
  const grouped = completions.reduce((acc, c) => {
    const date = new Date(c.completedAt).toDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(c);
    return acc;
  }, {});

  // Transformar em array com labels amigáveis
  return Object.entries(grouped).map(([date, items]) => ({
    date,
    label: date === today ? 'Hoje' : date === yesterday ? 'Ontem' : formatDate(date),
    completions: items,
  }));
};
```

---

### 8. ProgressStatistics.js + ProgressStatistics.styles.js
**Path**: `frontend/src/components/BestiaryPlanner/ProgressStatistics.js`

**Responsabilidade**: Cards de estatísticas agregadas

**Props**:
```javascript
<ProgressStatistics characterId="uuid" />
```

**Estatísticas**:
1. **Média Diária de Completions** (últimos 30 dias)
2. **Maior Streak Consecutivo** (dias seguidos com completions)
3. **Dia Mais Produtivo** (data + número de completions)
4. **Projeção de Conclusão** (baseado em média dos últimos 30 dias)
5. **Total de Charm Points** (histórico completo)
6. **Comparação de Períodos** (esta semana vs semana passada)

**Estrutura**:
```jsx
<StatisticsContainer>
  <StatisticsHeader>
    <Title>Estatísticas</Title>
    <Subtitle>Baseado nos últimos 30 dias</Subtitle>
  </StatisticsHeader>

  <StatisticsGrid>
    <StatCard>
      <StatIcon>📊</StatIcon>
      <StatLabel>Média Diária</StatLabel>
      <StatValue>{statistics.dailyAverage}</StatValue>
      <StatUnit>completions/dia</StatUnit>
    </StatCard>

    <StatCard>
      <StatIcon>🔥</StatIcon>
      <StatLabel>Maior Streak</StatLabel>
      <StatValue>{statistics.streak.max}</StatValue>
      <StatUnit>dias consecutivos</StatUnit>
    </StatCard>

    <StatCard>
      <StatIcon>⭐</StatIcon>
      <StatLabel>Dia Mais Produtivo</StatLabel>
      <StatValue>{statistics.mostProductiveDay.count}</StatValue>
      <StatUnit>{formatDate(statistics.mostProductiveDay.date)}</StatUnit>
    </StatCard>

    <StatCard>
      <StatIcon>🎯</StatIcon>
      <StatLabel>Projeção de Conclusão</StatLabel>
      <StatValue>{statistics.projection.daysRemaining}</StatValue>
      <StatUnit>dias (baseado em média de 30d)</StatUnit>
    </StatCard>

    <StatCard>
      <StatIcon>💎</StatIcon>
      <StatLabel>Total de Charm Points</StatLabel>
      <StatValue>{statistics.totalCharmPoints}</StatValue>
      <StatUnit>CP acumulados</StatUnit>
    </StatCard>

    <StatCard>
      <StatIcon>📈</StatIcon>
      <StatLabel>Comparação Semanal</StatLabel>
      <StatValue trend={statistics.weeklyComparison.trend}>
        {statistics.weeklyComparison.percentageChange > 0 ? '+' : ''}
        {statistics.weeklyComparison.percentageChange}%
      </StatValue>
      <StatUnit>vs semana passada</StatUnit>
    </StatCard>
  </StatisticsGrid>
</StatisticsContainer>
```

**Cálculo de Projeção**:
```javascript
const calculateProjection = (dailyAverage, remainingCreatures) => {
  if (dailyAverage === 0) return { daysRemaining: Infinity, estimatedDate: null };

  const daysRemaining = Math.ceil(remainingCreatures / dailyAverage);
  const estimatedDate = new Date(Date.now() + daysRemaining * 86400000);

  return { daysRemaining, estimatedDate };
};
```

---

### 9. ProgressExport.js + ProgressExport.styles.js
**Path**: `frontend/src/components/BestiaryPlanner/ProgressExport.js`

**Responsabilidade**: UI de export para CSV e JSON

**Props**:
```javascript
<ProgressExport characterId="uuid" />
```

**Features**:
- Seletor de período (últimos 7 dias, 30 dias, 3 meses, todos)
- Seletor de formato (CSV, JSON)
- Preview de dados (primeiras 5 linhas)
- Botão de download

**Estrutura**:
```jsx
<ExportContainer>
  <ExportHeader>
    <Title>Exportar Histórico</Title>
    <Subtitle>Faça backup dos seus dados de progresso</Subtitle>
  </ExportHeader>

  <ExportOptions>
    <OptionGroup>
      <OptionLabel>Período</OptionLabel>
      <Select value={period} onChange={(e) => setPeriod(e.target.value)}>
        <option value="7d">Últimos 7 dias</option>
        <option value="30d">Últimos 30 dias</option>
        <option value="3m">Últimos 3 meses</option>
        <option value="all">Todos</option>
      </Select>
    </OptionGroup>

    <OptionGroup>
      <OptionLabel>Formato</OptionLabel>
      <FormatButtons>
        <FormatButton active={format === 'csv'} onClick={() => setFormat('csv')}>
          CSV
        </FormatButton>
        <FormatButton active={format === 'json'} onClick={() => setFormat('json')}>
          JSON
        </FormatButton>
      </FormatButtons>
    </OptionGroup>
  </ExportOptions>

  <PreviewSection>
    <PreviewLabel>Preview (primeiras 5 linhas)</PreviewLabel>
    <PreviewBox>
      {format === 'csv' ? (
        <pre>{csvPreview}</pre>
      ) : (
        <pre>{jsonPreview}</pre>
      )}
    </PreviewBox>
  </PreviewSection>

  <ExportActions>
    <ExportButton onClick={handleExport}>
      📥 Exportar ({dataCount} completions)
    </ExportButton>
  </ExportActions>
</ExportContainer>
```

**CSV Format**:
```csv
Date,Creature Name,Charm Points,Completed At
2026-02-05,Dragon,25,2026-02-05 14:30:00
2026-02-05,Demon,50,2026-02-05 15:45:00
```

**JSON Format**:
```json
{
  "characterId": "uuid",
  "exportedAt": "2026-02-05T16:00:00.000Z",
  "period": "30d",
  "completions": [
    {
      "date": "2026-02-05",
      "creature": { "id": "dragon", "name": "Dragon", "charmPoints": 25 },
      "completedAt": "2026-02-05T14:30:00.000Z"
    }
  ]
}
```

---

### 10. ProgressHistory.js + ProgressHistory.styles.js
**Path**: `frontend/src/components/BestiaryPlanner/ProgressHistory.js`

**Responsabilidade**: Componente orquestrador com tabs

**Props**:
```javascript
<ProgressHistory
  isOpen={true}
  onClose={() => {}}
  characterId="uuid"
/>
```

**Features**:
- Modal/Drawer responsivo (fullscreen em mobile)
- Tabs: Charts, Timeline, Statistics, Export
- Lazy loading de tabs (só carrega ao clicar)
- Close button

**Estrutura**:
```jsx
<HistoryModal isOpen={isOpen} onClose={onClose}>
  <ModalHeader>
    <ModalTitle>Histórico de Progresso</ModalTitle>
    <CloseButton onClick={onClose}>✕</CloseButton>
  </ModalHeader>

  <TabsContainer>
    <TabsList>
      <Tab active={activeTab === 'charts'} onClick={() => setActiveTab('charts')}>
        📊 Gráficos
      </Tab>
      <Tab active={activeTab === 'timeline'} onClick={() => setActiveTab('timeline')}>
        📅 Timeline
      </Tab>
      <Tab active={activeTab === 'statistics'} onClick={() => setActiveTab('statistics')}>
        📈 Estatísticas
      </Tab>
      <Tab active={activeTab === 'export'} onClick={() => setActiveTab('export')}>
        📥 Exportar
      </Tab>
    </TabsList>

    <TabContent>
      {activeTab === 'charts' && (
        <ProgressChart characterId={characterId} />
      )}

      {activeTab === 'timeline' && (
        <ProgressTimeline characterId={characterId} />
      )}

      {activeTab === 'statistics' && (
        <ProgressStatistics characterId={characterId} />
      )}

      {activeTab === 'export' && (
        <ProgressExport characterId={characterId} />
      )}
    </TabContent>
  </TabsContainer>
</HistoryModal>
```

**Styled Components**:
```javascript
export const HistoryModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

export const ModalContent = styled.div`
  background: #1f2937;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 1200px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    max-width: 100%;
    max-height: 100vh;
    border-radius: 0;
  }
`;

export const TabsList = styled.div`
  display: flex;
  gap: 0.5rem;
  border-bottom: 1px solid #374151;
  padding: 1rem;
  overflow-x: auto;

  @media (max-width: 768px) {
    gap: 0.25rem;
    padding: 0.5rem;
  }
`;

export const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${props => props.active ? '#667eea' : 'transparent'};
  color: ${props => props.active ? 'white' : '#9ca3af'};
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.active ? '#5568d3' : '#374151'};
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
  }
`;

export const TabContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;
```

---

## 🔧 Arquivos Modificados (4 arquivos)

### 1. BestiaryPlanner.js
**Path**: `frontend/src/components/BestiaryPlanner/BestiaryPlanner.js`

**Modificações**:

1. **Importar ProgressHistory**:
```javascript
import ProgressHistory from './ProgressHistory';
```

2. **Adicionar state para modal**:
```javascript
const [isProgressHistoryOpen, setIsProgressHistoryOpen] = useState(false);
```

3. **Adicionar botão no header** (ao lado do botão de personagem):
```jsx
<HeaderContent>
  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
    <Title>{t('bestiaryPlanner.title')}</Title>

    {character && (
      <>
        {/* Botão de personagem (já existe) */}
        <button onClick={() => setIsCharacterDrawerOpen(true)}>
          👤 {character.name}
        </button>

        {/* NOVO: Botão de Progress History */}
        <button
          onClick={() => setIsProgressHistoryOpen(true)}
          style={{
            padding: '0.5rem 1rem',
            background: 'transparent',
            border: '1px solid #374151',
            borderRadius: '0.375rem',
            color: '#9ca3af',
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = '#667eea';
            e.target.style.color = '#667eea';
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = '#374151';
            e.target.style.color = '#9ca3af';
          }}
        >
          📊 {t('bestiaryPlanner.progressHistory.button')}
        </button>
      </>
    )}
  </div>
  <Subtitle>{t('bestiaryPlanner.subtitle')}</Subtitle>
  <SyncStatus />
</HeaderContent>
```

4. **Adicionar modal no final do componente** (antes do closing tag):
```jsx
{/* Progress History Modal */}
{character && (
  <ProgressHistory
    isOpen={isProgressHistoryOpen}
    onClose={() => setIsProgressHistoryOpen(false)}
    characterId={character.id}
  />
)}
```

---

### 2. dailyProgressStorage.js
**Path**: `frontend/src/services/dailyProgressStorage.js`

**Modificações**:

1. **Modificar cleanOldData** para manter > 7 dias (até 1 ano):
```javascript
/**
 * Clean old data (keep only last 1 year instead of 7 days)
 * MODIFIED for Feature 4: Progress History
 */
const cleanOldData = (characterId) => {
  try {
    const key = getStorageKey(characterId);
    const data = localStorage.getItem(key);

    if (!data) return;

    const parsed = JSON.parse(data);
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    // Filter out old entries (> 1 year)
    const filtered = {};
    Object.keys(parsed).forEach((dateKey) => {
      const date = new Date(dateKey);
      if (date >= oneYearAgo) {
        filtered[dateKey] = parsed[dateKey];
      }
    });

    localStorage.setItem(key, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error cleaning old data:', error);
  }
};
```

2. **Adicionar nova função getHistoricalData**:
```javascript
/**
 * Get historical data for specified number of days
 * ADDED for Feature 4: Progress History
 */
export const getHistoricalData = (characterId, days = 365) => {
  try {
    const key = getStorageKey(characterId);
    const data = localStorage.getItem(key);

    if (!data) {
      return [];
    }

    const parsed = JSON.parse(data);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    // Filter entries within specified days
    const filtered = Object.entries(parsed)
      .filter(([dateKey]) => {
        const date = new Date(dateKey);
        return date >= cutoffDate;
      })
      .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA)); // Sort descending

    return filtered.map(([date, completions]) => ({
      date,
      completions,
    }));
  } catch (error) {
    console.error('Error reading historical data:', error);
    return [];
  }
};
```

3. **Atualizar comentário no topo do arquivo**:
```javascript
/**
 * Daily Progress Storage Service
 * Tracks bestiary completions per day for progress statistics
 *
 * Feature 4 Update (Progress History):
 * - Extended retention from 7 days to 1 year
 * - Added getHistoricalData() for long-term queries
 */
```

---

### 3. bestiaryStorage.js
**Path**: `frontend/src/services/bestiaryStorage.js`

**Modificações**:

1. **Importar progressHistoryStorage**:
```javascript
import { saveCompletion } from './progressHistoryStorage';
```

2. **Modificar markCreaturesCompleted** para salvar no progressHistoryStorage:
```javascript
/**
 * Mark multiple creatures as completed (consolidated with single version)
 * MODIFIED for Feature 4: Also save to progressHistoryStorage
 */
export const markCreaturesCompleted = (characterId, creatureIds, completed = true) => {
  const data = loadBestiaryData();

  if (!data.characters[characterId]) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Character not found:', characterId);
    }
    return false;
  }

  // Convert single ID to array for uniform processing
  const idsArray = Array.isArray(creatureIds) ? creatureIds : [creatureIds];

  idsArray.forEach((creatureId) => {
    data.characters[characterId].creatures[creatureId] = {
      completed,
      ...(completed && { completedAt: new Date().toISOString() }),
    };

    // ADDED for Feature 4: Save to progressHistoryStorage
    if (completed) {
      // NOTE: We need creature data (name, charmPoints) to save
      // This will be passed from the calling function (BestiaryPlanner)
      // For now, we'll just mark this as a TODO for the caller to handle
      // The caller should call saveCompletion separately
    }
  });

  saveBestiaryData(data);
  return true;
};
```

**IMPORTANTE**: A integração completa com `progressHistoryStorage` deve ser feita no `BestiaryPlanner.js` ao chamar `toggleCreatureCompletion` (já existe lá, só adicionar uma linha após `addTodayCompletion`):

```javascript
// In BestiaryPlanner.js - handleCompleteCreature function
if (!wasCompleted) {
  // Add to today's completions (já existe)
  addTodayCompletion(character.id, creature);

  // ADICIONAR: Save to progressHistoryStorage (Feature 4)
  import { saveCompletion } from '../../services/progressHistoryStorage';
  saveCompletion(character.id, creature);
}
```

3. **Atualizar comentário no topo do arquivo**:
```javascript
/**
 * Bestiary Storage Service
 * Handles localStorage persistence for bestiary progress per character
 *
 * Feature 4 Update (Progress History):
 * - Integrated with progressHistoryStorage for long-term tracking
 */
```

---

### 4. Traduções (pt-BR e en)
**Paths**:
- `frontend/src/locales/pt-BR/translation.json`
- `frontend/src/locales/en/translation.json`

**Chaves a Adicionar**:

#### pt-BR:
```json
"bestiaryPlanner": {
  ...existing keys...,

  "progressHistory": {
    "button": "Histórico de Progresso",
    "title": "Histórico de Progresso",
    "tabs": {
      "charts": "Gráficos",
      "timeline": "Timeline",
      "statistics": "Estatísticas",
      "export": "Exportar"
    },
    "chart": {
      "title": "Charm Points ao Longo do Tempo",
      "periods": {
        "7d": "7 Dias",
        "30d": "30 Dias",
        "3m": "3 Meses",
        "all": "Todos"
      },
      "total": "Total",
      "dailyAverage": "Média Diária",
      "loading": "Carregando gráfico...",
      "noData": "Nenhum dado disponível para este período"
    },
    "timeline": {
      "title": "Timeline de Completions",
      "today": "Hoje",
      "yesterday": "Ontem",
      "loadMore": "Carregar Mais",
      "noData": "Nenhuma completion registrada ainda",
      "completions": "completions"
    },
    "statistics": {
      "title": "Estatísticas",
      "subtitle": "Baseado nos últimos 30 dias",
      "dailyAverage": "Média Diária",
      "dailyAverageUnit": "completions/dia",
      "maxStreak": "Maior Streak",
      "maxStreakUnit": "dias consecutivos",
      "currentStreak": "Streak Atual",
      "mostProductiveDay": "Dia Mais Produtivo",
      "projection": "Projeção de Conclusão",
      "projectionUnit": "dias restantes",
      "totalCharmPoints": "Total de Charm Points",
      "totalCharmPointsUnit": "CP acumulados",
      "weeklyComparison": "Comparação Semanal",
      "weeklyComparisonUnit": "vs semana passada",
      "noData": "Dados insuficientes para estatísticas"
    },
    "export": {
      "title": "Exportar Histórico",
      "subtitle": "Faça backup dos seus dados de progresso",
      "period": "Período",
      "format": "Formato",
      "preview": "Preview (primeiras 5 linhas)",
      "exportButton": "Exportar ({{count}} completions)",
      "periods": {
        "7d": "Últimos 7 dias",
        "30d": "Últimos 30 dias",
        "3m": "Últimos 3 meses",
        "all": "Todos"
      },
      "formats": {
        "csv": "CSV",
        "json": "JSON"
      },
      "success": "Arquivo exportado com sucesso!",
      "error": "Erro ao exportar arquivo"
    }
  }
}
```

#### en (English):
```json
"bestiaryPlanner": {
  ...existing keys...,

  "progressHistory": {
    "button": "Progress History",
    "title": "Progress History",
    "tabs": {
      "charts": "Charts",
      "timeline": "Timeline",
      "statistics": "Statistics",
      "export": "Export"
    },
    "chart": {
      "title": "Charm Points Over Time",
      "periods": {
        "7d": "7 Days",
        "30d": "30 Days",
        "3m": "3 Months",
        "all": "All"
      },
      "total": "Total",
      "dailyAverage": "Daily Average",
      "loading": "Loading chart...",
      "noData": "No data available for this period"
    },
    "timeline": {
      "title": "Completions Timeline",
      "today": "Today",
      "yesterday": "Yesterday",
      "loadMore": "Load More",
      "noData": "No completions recorded yet",
      "completions": "completions"
    },
    "statistics": {
      "title": "Statistics",
      "subtitle": "Based on last 30 days",
      "dailyAverage": "Daily Average",
      "dailyAverageUnit": "completions/day",
      "maxStreak": "Max Streak",
      "maxStreakUnit": "consecutive days",
      "currentStreak": "Current Streak",
      "mostProductiveDay": "Most Productive Day",
      "projection": "Completion Projection",
      "projectionUnit": "days remaining",
      "totalCharmPoints": "Total Charm Points",
      "totalCharmPointsUnit": "CP accumulated",
      "weeklyComparison": "Weekly Comparison",
      "weeklyComparisonUnit": "vs last week",
      "noData": "Insufficient data for statistics"
    },
    "export": {
      "title": "Export History",
      "subtitle": "Backup your progress data",
      "period": "Period",
      "format": "Format",
      "preview": "Preview (first 5 lines)",
      "exportButton": "Export ({{count}} completions)",
      "periods": {
        "7d": "Last 7 days",
        "30d": "Last 30 days",
        "3m": "Last 3 months",
        "all": "All"
      },
      "formats": {
        "csv": "CSV",
        "json": "JSON"
      },
      "success": "File exported successfully!",
      "error": "Error exporting file"
    }
  }
}
```

---

## 🎯 Considerações de Performance

### 1. Lazy Loading
- Tabs só carregam ao serem clicadas (não carregar todos de uma vez)
- Timeline com infinite scroll (carregar 50 de cada vez)

### 2. Memoização
```javascript
// Em useProgressData.js
const chartData = useMemo(() => {
  const raw = getHistoricalData(characterId, periodDays);
  return aggregateByDay(raw);
}, [characterId, periodDays]);

const statistics = useMemo(() => {
  return getStatistics(characterId, 30);
}, [characterId]);
```

### 3. Cache
```javascript
// Em useProgressData.js
const [cache, setCache] = useState({});

useEffect(() => {
  const cacheKey = `${characterId}-${period}`;
  if (cache[cacheKey]) {
    setData(cache[cacheKey]);
    return;
  }

  // Load data...
  const newData = loadData();
  setCache(prev => ({ ...prev, [cacheKey]: newData }));
  setData(newData);
}, [characterId, period]);
```

### 4. SVG Performance
- Use `viewBox` para responsividade (não recalcular pontos)
- Limitar número de pontos em gráficos grandes (downsampling)
- CSS transitions em vez de JS animations

---

## 🧪 Testes Recomendados

### 1. Dados de Teste
Criar função para popular histórico com dados fictícios:
```javascript
// src/utils/testDataGenerator.js
export const generateTestHistory = (characterId, days = 90) => {
  const history = [];
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const completionsCount = Math.floor(Math.random() * 8); // 0-7 completions por dia
    for (let j = 0; j < completionsCount; j++) {
      history.push({
        date: date.toISOString().split('T')[0],
        id: `creature-${i}-${j}`,
        name: `Creature ${i}-${j}`,
        charmPoints: [25, 50, 100][Math.floor(Math.random() * 3)],
        completedAt: date.toISOString(),
      });
    }
  }
  return history;
};
```

### 2. Casos de Teste
- **Empty State**: Nenhum histórico (usuário novo)
- **Sparse Data**: Poucos completions (1-2 por semana)
- **Dense Data**: Muitos completions (5-10 por dia)
- **Large Dataset**: 1 ano completo de histórico
- **Mobile**: Responsividade em telas pequenas

---

## 📱 Responsividade

### Breakpoints
```javascript
// Mobile: < 768px
// Tablet: 768px - 1024px
// Desktop: > 1024px
```

### Ajustes Mobile
- Modal fullscreen
- Tabs menores (ícones + texto reduzido)
- Gráficos com height menor (200px vs 300px)
- Timeline com espaçamento reduzido
- Export com preview menor

---

## 🚀 Ordem de Implementação Sugerida

1. ✅ **Services** (base de dados)
   - progressHistoryStorage.js
   - Modificar dailyProgressStorage.js
   - Modificar bestiaryStorage.js

2. ✅ **Utils** (funções puras)
   - chartDataUtils.js
   - exportUtils.js

3. ✅ **Hooks** (data fetching)
   - useProgressData.js

4. ✅ **SimpleChart** (componente reutilizável)
   - SimpleChart.js + styles

5. ✅ **Sub-Components** (visualizações)
   - ProgressChart.js + styles
   - ProgressTimeline.js + styles
   - ProgressStatistics.js + styles
   - ProgressExport.js + styles

6. ✅ **Main Component** (orquestrador)
   - ProgressHistory.js + styles

7. ✅ **Integration** (conectar ao BestiaryPlanner)
   - Modificar BestiaryPlanner.js
   - Adicionar traduções

8. ✅ **Build & Test**
   - `npm run build`
   - Testar fluxo completo

---

## ✅ Definition of Done

- [ ] Todos os 12 novos arquivos criados e funcionando
- [ ] 4 arquivos modificados com integrações completas
- [ ] Traduções pt-BR e en adicionadas
- [ ] Gráficos SVG renderizando corretamente
- [ ] Estatísticas calculadas com precisão
- [ ] Export CSV com UTF-8 BOM funcionando
- [ ] Export JSON com estrutura correta
- [ ] Timeline com infinite scroll funcionando
- [ ] Modal responsivo (desktop e mobile)
- [ ] Build sem erros
- [ ] Histórico limitado a 1 ano (cleanup automático)
- [ ] Performance otimizada (lazy load, memoização)

---

**FIM DA ESPECIFICAÇÃO**

Esta é a **última feature** do plano de melhorias do Bestiary Planner. Capriche na implementação! 🎉
