# BACKLOG - site-da-luci

> Propostas de melhoria identificadas por agentes ou sessoes de desenvolvimento.
> Qualquer agente ou sessao pode adicionar itens aqui. Qualquer agente ou sessao pode implementa-los.

## Como Adicionar um Item

Copie o template abaixo e preencha:

```markdown
### [B-NNN] Titulo curto e descritivo
- **Prioridade**: P0/P1/P2/P3
- **Tipo**: Bug Fix | Feature | Optimization | Cleanup | Security
- **Origem**: [sessao/agente que identificou, data]
- **Contexto**: [1-2 frases explicando o problema ou oportunidade]
- **Implementacao**: [passos concretos para resolver]
- **Arquivos**: [lista de arquivos afetados]
- **Status**: Pendente | Em Andamento | Concluido | Rejeitado
```

**Regras**:
1. IDs sequenciais (B-001, B-002, ...)
2. Contexto suficiente para implementar SEM ler outros logs
3. Se concluido, marque como `Concluido` com data e mantenha por 1 semana antes de remover

---

## Itens Pendentes

### [B-001] Corrigir 60 testes falhando (ThemeProvider + Supabase mocks)
- **Prioridade**: P1
- **Tipo**: Bug Fix
- **Origem**: Meta-Improver, 2026-02-06 (atualizado apos execucao real)
- **Contexto**: 60 de 176 testes falham. A causa principal e que testes de componentes styled-components nao incluem `ThemeProvider` no wrapper de render. Supabase mocks tambem estao incompletos. Status real: 8 suites falhando, 60 testes falhando.
- **Implementacao**:
  1. **Criar test utility compartilhado** em `frontend/src/__tests__/utils/renderWithProviders.js`:
     - Wrapper com ThemeProvider (importar theme de `styles/theme.js`)
     - Wrapper com I18nextProvider
     - Wrapper com MemoryRouter (para componentes com routing)
     - Wrapper com AuthProvider (mock)
  2. **TransferList.test.js** (10 tests): Adicionar ThemeProvider wrapper
  3. **BestiaryPlanner.test.js**: Adicionar ThemeProvider + corrigir Supabase auth mock
  4. **PageComponents.test.js**: Usar renderWithProviders utilitario
  5. **DataPersistence.test.js**: Corrigir mock chain: `from()` retorna obj com metodos `upsert()`, `select()`, `eq()`, `in()`, `single()` encadeados
  6. **AuthContext.test.js**: Ajustar timing mocks (getSession resolve sync)
  7. Rodar `cd frontend && npm test -- --watchAll=false` para validar
- **Arquivos**: Todos os arquivos em `frontend/src/__tests__/`, novo `frontend/src/__tests__/utils/renderWithProviders.js`
- **Status**: Pendente

### [B-002] Adicionar ESLint rule para prevenir hooks condicionais
- **Prioridade**: P3
- **Tipo**: Optimization
- **Origem**: Meta-Improver, 2026-02-06
- **Contexto**: ESLint hook violations apareceram em pelo menos 2 sessoes (SimpleChart.js, BestiaryPlanner.js). A regra `react-hooks/rules-of-hooks` ja existe no CRA mas os erros passaram no build (apenas warnings). Considerar tornar essa regra um error ao inves de warning.
- **Implementacao**:
  1. Verificar config eslint em `package.json` (eslintConfig section)
  2. Adicionar `"react-hooks/rules-of-hooks": "error"` se nao estiver como error
  3. Rodar `npm run lint` para verificar violacoes existentes
  4. Corrigir violacoes encontradas
- **Arquivos**: `frontend/package.json`
- **Status**: Pendente

### [B-003] Implementar rate limiting e cache local para OCR.space
- **Prioridade**: P3
- **Tipo**: Feature
- **Origem**: Session logs 2026-02-05
- **Contexto**: OCR.space free tier tem limite de 25k requests/mes. Nao ha cache local nem alerta quando proximo do limite. Reprocessar a mesma imagem gasta uma request desnecessaria.
- **Implementacao**:
  1. Adicionar hash da imagem (canvas.toDataURL checksum) antes de enviar
  2. Armazenar resultado em localStorage com key = hash
  3. Se hash ja existe, retornar resultado do cache
  4. Opcional: contador de requests no localStorage com reset mensal
- **Arquivos**: `frontend/src/services/ocrService.js`
- **Status**: Pendente

### [B-004] Wheel of Destiny Planner
- **Prioridade**: P1
- **Tipo**: Feature
- **Origem**: Sessao 2026-02-12, solicitacao do usuario
- **Contexto**: Nova pagina para planejar Wheel of Destiny. Funcionalidades: import de configuracao, copy to clipboard, salvar ate 10 modelos nomeados de wheel, adicionar gemas especificas. Usar como referencia sites que ja implementam essa funcionalidade.
- **Implementacao**:
  1. Pesquisar sites de referencia (TibiaWiki, TibiaPal, etc.)
  2. Criar pagina/componente WheelOfDestinyPlanner
  3. Implementar visualizacao da wheel
  4. Implementar sistema de drag & drop para gemas
  5. Implementar import/export (JSON ou texto)
  6. Implementar copy to clipboard
  7. Implementar salvamento de ate 10 modelos nomeados (localStorage/Supabase)
- **Arquivos**: Novos componentes em `frontend/src/components/WheelPlanner/`
- **Status**: Pendente

### [B-005] Character Set Builder (drag & drop)
- **Prioridade**: P1
- **Tipo**: Feature
- **Origem**: Sessao 2026-02-12, solicitacao do usuario
- **Contexto**: Pagina para montar o character com set de equipamentos via drag and drop. Substituira o "Statistics (Coming soon)" na navegacao.
- **Implementacao**:
  1. Criar componente CharacterSetBuilder
  2. Implementar grid de slots de equipamento (helmet, armor, legs, boots, etc.)
  3. Implementar drag & drop de itens para slots
  4. Calcular e exibir stats totais do set
  5. Integrar com dados de items do Tibia
- **Arquivos**: Novos componentes em `frontend/src/components/CharacterBuilder/`
- **Status**: Pendente

### [B-006] Mapa Interativo de Spawns (Tiles Tibia)
- **Prioridade**: P1
- **Tipo**: Feature
- **Origem**: Analise comparativa TibiaRoute vs Bestiary Planner, 2026-02-06. Aprovado pelo usuario.
- **Contexto**: Mapa interativo com tiles reais do Tibia (estilo TibiaMaps.io) mostrando spawns de criaturas. Licensing verificado: CipSoft permite uso em fansites com atribuicao. Decisao do usuario: usar Tiles Tibia customizados (nao OSM nem Canvas simples).
- **Implementacao**:
  1. Pesquisar fonte de tiles (TibiaMaps.io API, comunidade OTServ, game client)
  2. Instalar react-leaflet + leaflet.markercluster
  3. Implementar mapa com CRS.Simple e tiles customizados
  4. Enriquecer BESTIARY_DATA com coordenadas (x, y, z) por spawn
  5. Markers coloridos por status (completed/in-progress/not-started)
  6. Clustering automatico de spawns proximos
  7. Floor selector (-8 a +15)
  8. Click no marker: popup com info da criatura + "Add to Plan"
  9. Integrar como tab "Map View" no BestiaryPlanner
  10. Route Optimizer: shortest path entre spawns selecionados
- **Arquivos**: Novos componentes em `frontend/src/components/MapView/`, `frontend/src/data/bestiary.js` (coordenadas)
- **Referencia**: `.claude/analises/map-tiles-options-comparison.md`, `.claude/analises/plano-melhorias-bestiary-revisado-2026-02-06.md`
- **Status**: Pendente

### [B-007] Voice Input para Bestiary (Web Speech API)
- **Prioridade**: P2
- **Tipo**: Feature
- **Origem**: Analise comparativa 2026-02-06. Aprovado pelo usuario como feature inovadora.
- **Contexto**: Permitir gravar audio falando nomes de criaturas para preencher progresso. Ex: "Completei dragon, dragon lord, wyrm" marca como completas. Usa Web Speech API nativa (gratis, Chrome/Edge).
- **Implementacao**:
  1. Criar componente VoiceInput.js com Web Speech API (SpeechRecognition)
  2. Suporte pt-BR e en-US
  3. Parsing de patterns: "completei X, Y, Z" e "X N kills"
  4. Fuzzy matching contra BESTIARY_DATA (Levenshtein distance)
  5. Modal de confirmacao com confidence % antes de aplicar
  6. Integrar botao ao lado do ScreenshotImport no BestiaryPlanner
  7. Fallback: mensagem "Upgrade browser" para navegadores sem suporte
- **Arquivos**: Novo `frontend/src/components/BestiaryPlanner/VoiceInput.js`
- **Referencia**: `.claude/analises/plano-melhorias-bestiary-revisado-2026-02-06.md`
- **Status**: Pendente

### [B-008] Comparacao Lado-a-Lado de Criaturas
- **Prioridade**: P2
- **Tipo**: Feature
- **Origem**: Analise comparativa TibiaRoute, 2026-02-06
- **Contexto**: Permitir comparar ate 5 criaturas simultaneamente em tabela. Mostra HP, Charm Points, kills necessarios, resistencias (color-coded), locations (overlaps destacados) e efficiency score. Ajuda a decidir qual criatura completar primeiro.
- **Implementacao**:
  1. Adicionar botao "Compare" no CreatureCard (selection mode)
  2. Criar CreatureComparisonModal com tabela comparativa
  3. Exibir: HP, CP, difficulty, kills, resistencias, locations, efficiency
  4. Destacar overlaps de locations entre criaturas selecionadas
  5. Limitar a 2-5 criaturas por comparacao
- **Arquivos**: Novo `frontend/src/components/BestiaryPlanner/CreatureComparisonModal.js`
- **Referencia**: `.claude/analises/tibia-route-vs-bestiary-planner-2026-02-06.md`
- **Status**: Pendente

---

## Itens Concluidos

_Nenhum item concluido ainda._
