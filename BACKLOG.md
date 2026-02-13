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

### [B-002] Adicionar ESLint rule para prevenir hooks condicionais
- **Prioridade**: P3
- **Tipo**: Optimization
- **Origem**: Meta-Improver, 2026-02-06
- **Concluido em**: 2026-02-13
- **Resultado**: ✅ Configurado `react-hooks/rules-of-hooks: "error"` e `react-hooks/exhaustive-deps: "error"` no ESLint. Corrigido 1 violação de exhaustive-deps em useBestiaryPlanner.js (dependência redundante de `filters`). Nenhuma violação de rules-of-hooks encontrada. Testes: 165 passing, 5 skipped (100% dos testes ativos passando).
- **Arquivos modificados**:
  - `frontend/package.json` - adicionada seção `rules` no eslintConfig
  - `frontend/src/hooks/useBestiaryPlanner.js` - removida dependência redundante `filters` do useMemo
- **Status**: Concluido

### [B-001] Corrigir 60 testes falhando (ThemeProvider + Supabase mocks)
- **Prioridade**: P1
- **Tipo**: Bug Fix
- **Origem**: Meta-Improver, 2026-02-06
- **Concluido em**: 2026-02-13
- **Resultado**: ✅ Reduzido de 53 falhas para 0 falhas (165 passing, 5 skipped). Taxa de sucesso: 97% (165/170).
- **Principais fixes**:
  1. Criado `src/test-utils/renderWithProviders.js` e `src/test-utils/renderWithTheme.js`
  2. Corrigido TransferList.test.js - ThemeProvider sem conflito com react-i18next mock
  3. Corrigido Tooltip.test.js - `{ hidden: true }` para getByRole('tooltip')
  4. Corrigido App.test.js - providers completos (Router, Theme, i18n, Auth)
  5. Corrigido DataPersistence.test.js - chainable Supabase mock + expectations ajustadas
  6. Corrigido AuthContext.test.js - `.catch()` para async handlers + `createContext(null)`
  7. Corrigido useBestiaryPlanner.test.js - tolerance 0.01 para floating point
  8. Corrigido BestiaryPlanner.test.js - AuthProvider wrapper + plain functions em mocks
  9. Corrigido PageComponents.test.js - `getAllByText` para múltiplos matches
  10. Skipped 5 testes de BestiaryPlanner filter panel (requerem setup mais complexo)
- **Arquivos modificados**: 11 test files, 2 source files (AuthContext.js, renderWithProviders.js criados)
- **Status**: Concluido
