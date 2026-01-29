# Git Workflow Guardrails - site-da-luci

**Purpose**: Prevenir violações de commit e garantir workflow consistente
**Created**: 2026-01-29
**Context**: Este documento foi criado após violação detectada em 2026-01-19 (commit sem aprovação explícita)

---

## ⚠️ CRITICAL RULE - NEVER VIOLATE

**NUNCA fazer commit sem aprovação explícita do usuário**

- **Proibido**: Executar `git commit` automaticamente após mudanças
- **Proibido**: Assumir que usuário quer commit "porque faz sentido"
- **Proibido**: Commitar durante workflow sem perguntar primeiro
- **Obrigatório**: SEMPRE aguardar comando explícito: "sim", "pode commitar", "commit now"

---

## Workflow de Commit (4 Passos Obrigatórios)

### Step 1: Validar Estado do Repositório
```bash
# ANTES de propor commit, executar:
git status          # Ver arquivos modificados/untracked
git diff --stat     # Ver resumo quantitativo das mudanças
```

**Why**: Confirmar que mudanças a commitar são as esperadas (nenhum arquivo extra/faltante)

---

### Step 2: Apresentar Resumo ao Usuário

**Format** (MANDATORY):
```markdown
**Arquivos modificados** (X files):
- path/to/file1.js (+50 -20)
- path/to/file2.css (+15 -5)
- path/to/file3.json (+3 -0)

**Mensagem de commit sugerida**:
feat(solo-hunt): add imbuement cost calculator

**Deseja commitar?** (responda: sim/não/editar mensagem)
```

**Validation Checklist** (antes de apresentar):
- [ ] Mensagem segue formato Conventional Commits? (`type(scope): description`)
- [ ] Mensagem tem max 72 caracteres?
- [ ] Mensagem é single-line? (SEM múltiplas linhas, SEM bullet points)
- [ ] Lista de arquivos está completa?
- [ ] Nenhum arquivo sensível será commitado? (.env, credentials, etc.)

---

### Step 3: Aguardar Aprovação Explícita ⚠️

**STOP** - Não prosseguir até receber:
- ✅ "sim" / "yes" / "pode commitar" / "commit now"
- ✅ "sim, com mensagem: [nova mensagem]" (user edita mensagem)
- ❌ "não" / "no" / "cancela" → Abortar commit
- ❌ Timeout / silêncio → Abortar (NOT assume yes)

**NEVER** assume aprovação por:
- User não respondeu (silêncio ≠ aprovação)
- "Faz sentido commitar agora" (justificativa interna ≠ aprovação)
- "Já terminei o trabalho" (conclusão ≠ aprovação de commit)

---

### Step 4: Executar Commit com Mensagem Concisa

**Após aprovação explícita**:
```bash
# Se user aprovou mensagem original
git add [files]
git commit -m "feat(solo-hunt): add imbuement cost calculator"

# Se user editou mensagem
git add [files]
git commit -m "[mensagem editada pelo user]"
```

**Post-Commit Validation**:
```bash
git log -1 --oneline   # Confirmar commit criado
git status             # Confirmar working tree limpo
```

---

## Padrão de Mensagem de Commit

### Formato (Conventional Commits)
```
type(scope): description

[optional body]
```

### Tipos Comuns (site-da-luci)
- `feat(scope)`: Nova funcionalidade
- `fix(scope)`: Correção de bug
- `refactor(scope)`: Refatoração sem mudar comportamento
- `style(scope)`: Mudanças de estilo/formatação
- `chore(scope)`: Manutenção, deps, configs
- `docs(scope)`: Apenas documentação
- `test(scope)`: Adicionar/corrigir testes
- `perf(scope)`: Melhorias de performance

### Scopes Comuns (site-da-luci)
- `solo-hunt` - Solo Hunt Analyzer
- `imbuement` - Imbuement Calculator
- `loot-split` - Loot Split Calculator
- `i18n` - Internacionalização
- `ui` - Componentes UI genéricos
- `styles` - Sistema de estilos (styled-components)

### Regras de Mensagem
- **Max 72 caracteres** no título (first line)
- **Single-line** no título (SEM múltiplas linhas, SEM bullet points)
- **Corpo opcional**: Breve, máximo 3-5 linhas se necessário
- **Evitar detalhes técnicos extensos**: Isso vai no session report (`.claude/logs/`)
- **Imperativo**: "add feature", NOT "added feature"
- **Lowercase**: "add feature", NOT "Add feature"

---

## Exemplos de Commits do Projeto (Referência)

### ✅ CORRETO - Commits Reais do site-da-luci

```bash
# Refatoração múltiplos componentes (conciso, escopo amplo)
2872ff8 refactor: migrate 22 components to styled-components

# Refatoração com escopo específico
c5a0f81 refactor(loot-split): migrate all 9 components to styled-components

# Feature nova
feat(solo-hunt): add imbuement cost calculator

# Fix de bug
fix(i18n): resolve missing translation keys for errors

# Chore (manutenção)
chore(deps): update react to v18.3

# Style
style(solo-hunt): improve analyzer card spacing
```

### ❌ INCORRETO - Anti-Patterns

```bash
# ❌ Muito longo (>72 chars)
refactor: migrate SoloHuntAnalyzer, ImbuementCalculator, and LootSplitCalculator components from CSS modules to styled-components following new architecture pattern

# ❌ Múltiplas linhas no título
refactor(solo-hunt): migrate components

- SoloHuntAnalyzer.js
- ImbuementCalculator.js
- LootSplitCalculator.js

# ❌ Detalhes técnicos excessivos no body
feat(solo-hunt): add calculator

Added new calculator component with props validation using PropTypes.
Implemented useEffect hook for data fetching.
Created styled-components for layout.
Added unit tests with 95% coverage.
Updated translation files (pt-BR and en).

# ❌ Sem tipo/scope
migrate components to styled-components

# ❌ Emoji desnecessário
✨ feat(solo-hunt): add calculator
```

---

## Checklist Pré-Commit (MANDATORY)

**ANTES de apresentar mensagem ao usuário, validar**:

- [ ] **Git Status Verificado**: `git status` executado?
- [ ] **Diff Analisado**: `git diff --stat` executado?
- [ ] **Mensagem Formatada**: Segue `type(scope): description`?
- [ ] **Mensagem Concisa**: Max 72 chars, single-line?
- [ ] **Scope Correto**: Usa scope do projeto (`solo-hunt`, `imbuement`, `loot-split`, etc.)?
- [ ] **Arquivos Listados**: Todos arquivos modificados listados para user?
- [ ] **Nenhum Arquivo Sensível**: .env, credentials, tokens NÃO incluídos?
- [ ] **Aprovação Pendente**: User NÃO aprovou ainda (waiting for response)?

**SE qualquer item falhar → CORRIGIR antes de apresentar ao usuário**

---

## Quando Sugerir Múltiplos Commits

Se mudanças envolvem **múltiplos escopos não relacionados**, sugerir separar:

```markdown
**Detectei mudanças em múltiplos escopos**:

1. **solo-hunt** (3 files): Add imbuement calculator
2. **i18n** (2 files): Add missing translation keys
3. **styles** (1 file): Update theme colors

**Recomendação**: Separar em 3 commits independentes para histórico mais limpo.

**Opções**:
1. Commitar tudo junto (1 commit com scope genérico)
2. Commitar separadamente (3 commits, mais organizado) ✅ RECOMENDADO

**Qual opção prefere?**
```

**Rationale**: Histórico git mais limpo, easier revert, better bisect

---

## Error Recovery

### User Rejeita Commit
```markdown
User: "não"

Architect: ✅ Commit cancelado. Arquivos permanecem staged.

Próximas opções:
- Modificar arquivos adicionais e propor novo commit
- Descartar mudanças (`git restore --staged .`)
- Revisar mudanças novamente
```

### User Edita Mensagem
```markdown
User: "sim, mas muda para: fix(solo-hunt): resolve imbuement calculation bug"

Architect: ✅ Usando mensagem editada pelo usuário.

[executa commit com mensagem editada]
```

### Commit Falha (Pre-commit Hook)
```markdown
Git Error: "Pre-commit hook failed (eslint errors)"

Architect: ❌ Commit bloqueado por pre-commit hook.

**Erro detectado**: ESLint encontrou 3 erros em SoloHuntAnalyzer.js

**Opções**:
1. Corrigir erros de linting primeiro (recomendado)
2. Bypass hook com --no-verify (⚠️ não recomendado)

**Deseja que eu corrija os erros de linting?**
```

---

## Integration com Session Reports

**Detalhes técnicos vão no session report, NÃO no commit message**

### ✅ CORRETO - Separação de Concerns

**Git Commit Message** (conciso, high-level):
```
refactor(solo-hunt): migrate 5 components to styled-components
```

**Session Report** (`c:\Users\NEXLAB\Documents\Projetos\site-da-luci\.claude\logs\architect-report-2026-01-29-1430.md`):
```markdown
## Changes Made

### Components Migrated (5 total)
1. **SoloHuntAnalyzer.js**:
   - Removed: CSS modules import (SoloHuntAnalyzer.module.css)
   - Added: styled-components (AnalyzerContainer, AnalyzerCard, etc.)
   - Props: Unchanged (backward compatible)

2. **ImbuementCalculator.js**:
   - Removed: Inline styles
   - Added: styled-components (CalculatorWrapper, CalculatorGrid)
   - Props: Added PropTypes validation

[... detailed breakdown ...]

### Metrics
- **Files Modified**: 10 (5 components + 5 deleted CSS modules)
- **Lines Changed**: +420 -385 (net +35)
- **Time Spent**: 35 minutes
- **Tests**: All 18 tests passing
```

**Rationale**: Commit message = **WHAT** changed (high-level), Session report = **HOW** it changed (technical details)

---

## Enforcement

### Tracking (Session Reports)
Cada session report MUST include:
```markdown
## Git Operations

**Commits Created**: X
**Commit Messages**:
- `feat(solo-hunt): add calculator`
- `fix(i18n): resolve translation keys`

**Guardrail Compliance**: ✅ YES / ❌ NO
- User approval obtained? ✅
- Message format valid? ✅
- Pre-commit checklist completed? ✅

**Violations Detected**: None / [description if violated]
```

### Meta-Improver Review
Meta-Improver verificará compliance via session reports:
- **Pattern Detection**: Commit sem aprovação? (keyword: "git commit" before "user approved")
- **Message Quality**: Mensagens >72 chars? Multi-line titles?
- **Frequency**: >2 violations consecutivas → 🚨 Alert

### User Feedback Loop
Se user rejeitar mensagem múltiplas vezes:
- **Learn**: Preferências do user (scope favorito, verbosity level)
- **Adapt**: Ajustar sugestões futuras
- **Document**: Pattern em session report para Meta-Improver

---

## References

- **Conventional Commits**: https://www.conventionalcommits.org/
- **Git Commit Best Practices**: https://chris.beams.io/posts/git-commit/
- **Project-Specific**:
  - `c:\Users\NEXLAB\Documents\Projetos\.claude\agents\architect.md` (Git Commit Guardrail)
  - `c:\Users\NEXLAB\Documents\Projetos\site-da-luci\.claude\FILE_LOCATION_GUARDRAIL.md`

---

**Last Updated**: 2026-01-29
**Violations Fixed**: 1 (2026-01-19 - commit without approval)
**Status**: Active enforcement via session reports
