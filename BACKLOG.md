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

---

## Itens Concluidos

_Nenhum item concluido ainda._
