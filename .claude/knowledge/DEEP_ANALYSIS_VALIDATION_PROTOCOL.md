# 🔍 Protocolo de Validação de Análise Profunda (Deep Analysis Validation Protocol)

> **Versão**: 1.0
> **Criado em**: 2026-01-23
> **Tipo**: Guardrail de Knowledge Base
> **Aplicável a**: Todos os agentes (Architect, Feature-Implementer, Reviewer, Meta-Improver, etc.)

---

## 📋 OBJETIVO

Este protocolo OBRIGA todos os agentes a consultarem o knowledge base existente ANTES de realizar análises profundas do projeto site-da-luci. Isso evita:
- ❌ Retrabalho (análises redundantes)
- ❌ Desperdício de tokens
- ❌ Recomendações contraditórias
- ❌ Perda de contexto histórico

---

## 🚨 REGRA OBRIGATÓRIA

### Quando Realizar uma Análise Profunda?

Se você (agente) receber uma solicitação que envolva:
- Análise profunda do projeto
- Avaliação de frameworks de testes (Cypress, Playwright, Jest, etc.)
- Recomendações arquiteturais
- Avaliação de coverage de testes
- Decisões técnicas sobre o site-da-luci
- Perguntas sobre "qual ferramenta usar" ou "como estruturar testes"

**VOCÊ DEVE SEGUIR ESTE PROTOCOLO:**

---

## 📖 PROTOCOLO DE 3 ETAPAS

### ETAPA 1: CONSULTAR KNOWLEDGE BASE EXISTENTE 🔍

**ANTES de iniciar qualquer análise, você DEVE:**

1. **Ler o arquivo de análise profunda mais recente:**
   ```
   c:\Users\NEXLAB\Documents\Projetos\site-da-luci\.claude\knowledge\site-da-luci-deep-analysis-v*.md
   ```

2. **Identificar a versão e data:**
   - Checar o campo "Última Atualização" no topo do documento
   - Verificar o campo "Versão" no nome do arquivo

3. **Avaliar se a análise está atualizada:**
   - ✅ **Atualizada**: Última atualização < 30 dias atrás
   - ⚠️ **Possivelmente desatualizada**: Última atualização > 30 dias atrás
   - 🔴 **Desatualizada**: Última atualização > 90 dias atrás

### ETAPA 2: VALIDAR INFORMAÇÕES E IDENTIFICAR GAPS 🧐

**Após ler o knowledge base, você DEVE:**

1. **Comparar com o estado atual do projeto:**
   - Verificar se arquivos mencionados ainda existem
   - Checar se versões de dependências mudaram (package.json)
   - Validar se estrutura de pastas ainda é a mesma
   - Confirmar se testes mencionados ainda existem

2. **Identificar gaps ou mudanças:**
   - Novos componentes adicionados
   - Novos testes implementados
   - Mudanças em configurações (cypress.config.js, jest.config.js)
   - Novos specs Cypress ou test files
   - Mudanças em CI/CD (.github/workflows/ci.yml)

3. **Decidir ação:**
   - ✅ **Knowledge base está atualizado**: Usar informações existentes
   - ⚠️ **Atualização parcial necessária**: Atualizar seções específicas
   - 🔴 **Atualização completa necessária**: Criar nova versão

### ETAPA 3: ATUALIZAR KNOWLEDGE BASE (SE NECESSÁRIO) ✏️

**SE você identificou mudanças significativas:**

#### 3.1. Determinar Tipo de Atualização

**Atualização Menor** (incrementar patch: v1.0 → v1.1):
- Novos testes adicionados
- Coverage atualizado
- Novos componentes (< 5 componentes)
- Pequenas mudanças em configurações

**Atualização Maior** (incrementar minor: v1.0 → v2.0):
- Mudança de framework de testes (Cypress → Playwright)
- Refatoração significativa de estrutura
- Novos componentes (> 5 componentes)
- Novas features principais
- Mudanças arquiteturais significativas

#### 3.2. Criar Nova Versão do Documento

**IMPORTANTE: NÃO sobrescrever o arquivo anterior. Criar novo arquivo versionado.**

**Formato do nome do arquivo:**
```
site-da-luci-deep-analysis-v{MAJOR}.{MINOR}.md
```

**Exemplos:**
- `site-da-luci-deep-analysis-v1.0.md` (versão inicial)
- `site-da-luci-deep-analysis-v1.1.md` (atualização menor)
- `site-da-luci-deep-analysis-v2.0.md` (atualização maior)

#### 3.3. Atualizar Cabeçalho do Documento

```markdown
# Site da Luci - Análise Profunda do Projeto (Deep Analysis)

> **Versão:** {NOVA_VERSÃO}
> **Última Atualização:** {DATA_ATUAL}
> **Atualizado por:** {NOME_DO_AGENTE}
> **Próxima Revisão:** Sob demanda ou quando houver mudanças significativas no projeto
> **Versão Anterior:** v{VERSÃO_ANTERIOR} ({DATA_VERSÃO_ANTERIOR})
```

#### 3.4. Adicionar Entrada no Histórico de Atualizações

No final do documento, adicionar nova entrada em **HISTÓRICO DE ATUALIZAÇÕES**:

```markdown
### v{NOVA_VERSÃO} - {DATA_ATUAL}
- ✅ {MUDANÇA_1}
- ✅ {MUDANÇA_2}
- ⚠️ {MUDANÇA_3} (atenção)
- 🔴 {MUDANÇA_4} (crítico)
- 📊 Atualizado coverage: {BACKEND_COVERAGE}% backend, {FRONTEND_COVERAGE}% frontend
- 🧪 Novos testes: {QUANTIDADE} specs Cypress, {QUANTIDADE} unit tests
```

#### 3.5. Manter Referência à Versão Anterior

No topo do novo documento, adicionar link para versão anterior:

```markdown
---
**📚 Versões Anteriores:**
- [v1.0 (2026-01-23)](./site-da-luci-deep-analysis-v1.0.md) - Análise inicial
---
```

---

## 🎯 CASOS DE USO

### Caso 1: Análise Profunda Solicitada (Primeira Vez Hoje)

**Solicitação do usuário:**
> "Faça uma análise profunda do site-da-luci e me diga se devo usar Cypress ou Playwright"

**Protocolo:**
1. ✅ Ler `site-da-luci-deep-analysis-v1.0.md`
2. ✅ Validar informações (checar package.json, cypress.config.js, specs existentes)
3. ✅ Responder ao usuário com base no knowledge base + validações
4. ⚠️ Atualizar apenas se houver mudanças significativas desde v1.0

**Resposta esperada:**
> "Consultei a análise profunda mais recente (v1.0, 2026-01-23) do site-da-luci. Validei as informações e elas estão atualizadas. **Recomendação: MANTER Cypress** pelos seguintes motivos [...]"

### Caso 2: Nova Feature Implementada (Atualização Necessária)

**Situação:**
- Você (agente) implementou 3 novos specs Cypress
- Solo Hunt Analyzer agora tem cobertura E2E completa

**Protocolo:**
1. ✅ Ler `site-da-luci-deep-analysis-v1.0.md`
2. ✅ Identificar gap: "Solo Hunt Analyzer: 0 testes" (seção 3 do doc)
3. ✅ Criar `site-da-luci-deep-analysis-v1.1.md` (atualização menor)
4. ✅ Atualizar seção "Framework de Testes Atual" com novos specs
5. ✅ Atualizar "Coverage Goals" (E2E Features: 33% → 66%)
6. ✅ Adicionar entrada no "HISTÓRICO DE ATUALIZAÇÕES"

**Entrada no histórico:**
```markdown
### v1.1 - 2026-01-24
- ✅ Adicionados 3 novos specs Cypress para Solo Hunt Analyzer
- 📊 Atualizado E2E coverage: 66% (2/3 features principais)
- 🧪 Novos testes: 3 specs (~400 linhas), cobrindo happy path, validation e item cost manager
- ⚠️ Imbuement Calculator ainda sem testes E2E (próxima prioridade)
```

### Caso 3: Mudança Arquitetural Significativa (Major Update)

**Situação:**
- Projeto migrou de Cypress para Playwright
- 15 specs reescritos
- CI/CD atualizado

**Protocolo:**
1. ✅ Ler `site-da-luci-deep-analysis-v1.1.md`
2. 🔴 Identificar mudança MAJOR: Framework de testes mudou completamente
3. ✅ Criar `site-da-luci-deep-analysis-v2.0.md` (atualização maior)
4. ✅ Reescrever seção "Framework de Testes Atual" completamente
5. ✅ Atualizar ADR-001 ou criar ADR-002 (migração para Playwright)
6. ✅ Adicionar link para v1.1 no topo do documento

**Entrada no histórico:**
```markdown
### v2.0 - 2026-02-15
- 🔴 **BREAKING CHANGE**: Migrado de Cypress para Playwright
- ✅ 15 specs reescritos em Playwright
- ✅ CI/CD atualizado (.github/workflows/ci.yml)
- ✅ Criado ADR-002: Migração para Playwright (justificativa)
- 📊 Coverage mantido: 100% E2E, 50% frontend unit
- ⚠️ Time-travel debugging removido (trade-off aceito)
```

### Caso 4: Validação Periódica (Sem Mudanças)

**Situação:**
- Usuário pediu análise profunda
- Última atualização foi há 5 dias
- Nenhuma mudança significativa no código

**Protocolo:**
1. ✅ Ler `site-da-luci-deep-analysis-v1.0.md`
2. ✅ Validar informações (checar timestamps de arquivos, git log)
3. ✅ Confirmar que análise está atualizada
4. ❌ NÃO criar nova versão (sem mudanças significativas)
5. ✅ Responder ao usuário com base no knowledge base existente

**Resposta esperada:**
> "Consultei a análise profunda mais recente (v1.0, 2026-01-23). Validei que não houve mudanças significativas desde então. A análise está atualizada. **Recomendação permanece: MANTER Cypress** [...]"

---

## 🔗 INTEGRAÇÃO COM OUTROS AGENTES

### Architect Agent
- **DEVE** consultar este protocolo antes de fazer recomendações arquiteturais
- **DEVE** atualizar knowledge base após mudanças arquiteturais
- **PODE** chamar Meta-Improver para validar decisões (opcional)

### Feature-Implementer Agent
- **DEVE** consultar knowledge base para entender estrutura de testes
- **DEVE** atualizar knowledge base após adicionar novos componentes ou testes
- **PODE** incrementar versão minor se adicionar > 5 componentes

### Test-Debugger Agent
- **DEVE** consultar knowledge base para entender testes existentes
- **DEVE** atualizar knowledge base após corrigir testes ou adicionar novos
- **DEVE** atualizar coverage metrics se mudaram significativamente

### Reviewer Agent
- **DEVE** consultar knowledge base para validar que mudanças seguem padrões do projeto
- **PODE** sugerir atualização de knowledge base se PR introduz mudanças significativas

### Meta-Improver Agent
- **DEVE** consultar knowledge base antes de analisar degradações
- **PODE** identificar inconsistências entre knowledge base e estado real do projeto
- **DEVE** atualizar knowledge base se encontrar discrepâncias críticas

### Documentation Agent
- **DEVE** consultar knowledge base para manter documentação consistente
- **PODE** extrair informações do knowledge base para Confluence

---

## 📊 CRITÉRIOS DE ATUALIZAÇÃO

### O que justifica uma Atualização Menor (v1.0 → v1.1)?

- ✅ Novos testes adicionados (< 10 specs)
- ✅ Coverage aumentou significativamente (> 10%)
- ✅ Novos componentes (< 5 componentes)
- ✅ Pequenas mudanças em configurações
- ✅ Atualização de dependências (minor versions)
- ✅ Correções de informações incorretas

### O que justifica uma Atualização Maior (v1.0 → v2.0)?

- 🔴 Mudança de framework de testes
- 🔴 Refatoração arquitetural significativa
- 🔴 Novos componentes (> 5 componentes)
- 🔴 Novas features principais implementadas
- 🔴 Mudanças em CI/CD pipeline
- 🔴 Migração de tecnologias (React 18 → 19, Node 16 → 18)

### O que NÃO justifica atualização?

- ❌ Correções de typos no código
- ❌ Mudanças cosméticas (styling)
- ❌ Atualizações de documentação externa (README)
- ❌ Mudanças em .gitignore, .env, etc.
- ❌ Atualização de dependências (patch versions)

---

## 🛠️ FERRAMENTAS PARA VALIDAÇÃO

### Comandos para Validar Estado Atual

```bash
# 1. Verificar arquivos de teste existentes
ls "c:\Users\NEXLAB\Documents\Projetos\site-da-luci\cypress\e2e" -Recurse
ls "c:\Users\NEXLAB\Documents\Projetos\site-da-luci\backend\tests" -Recurse
ls "c:\Users\NEXLAB\Documents\Projetos\site-da-luci\frontend\src" -Include *.test.js -Recurse

# 2. Verificar versões de dependências
cat "c:\Users\NEXLAB\Documents\Projetos\site-da-luci\frontend\package.json" | grep -E "(react|cypress|jest)"
cat "c:\Users\NEXLAB\Documents\Projetos\site-da-luci\backend\package.json" | grep -E "(express|jest)"

# 3. Contar arquivos de teste
(ls "c:\Users\NEXLAB\Documents\Projetos\site-da-luci\cypress\e2e" -Recurse -Include *.cy.js).Count
(ls "c:\Users\NEXLAB\Documents\Projetos\site-da-luci\backend\tests" -Recurse -Include *.test.js).Count

# 4. Verificar últimas mudanças (se git disponível)
cd "c:\Users\NEXLAB\Documents\Projetos\site-da-luci"
git log --oneline --since="30 days ago" --grep="test\|cypress\|spec"
git diff HEAD~10 -- cypress/ backend/tests/ frontend/src/**/*.test.js
```

### Checklist de Validação

```markdown
## ✅ Checklist de Validação de Knowledge Base

- [ ] Li o arquivo `site-da-luci-deep-analysis-v*.md` mais recente
- [ ] Verifiquei a data de última atualização (< 30 dias?)
- [ ] Validei que arquivos mencionados ainda existem
- [ ] Comparei versões de dependências (package.json)
- [ ] Contei arquivos de teste atuais vs documentados
- [ ] Verifiquei mudanças recentes via git log (se disponível)
- [ ] Identifiquei gaps ou discrepâncias
- [ ] Determinei se atualização é necessária (minor/major/nenhuma)
- [ ] Se necessário, criei nova versão do documento
- [ ] Atualizei histórico de atualizações
- [ ] Respondi ao usuário com informações atualizadas
```

---

## 🚨 PENALIDADES POR NÃO SEGUIR O PROTOCOLO

Se um agente **NÃO** seguir este protocolo:

1. ⚠️ **Desperdício de recursos**: Análise redundante (500-2000 tokens desperdiçados)
2. ⚠️ **Informações inconsistentes**: Recomendações contraditórias entre agentes
3. ⚠️ **Perda de contexto**: Decisões arquiteturais anteriores não consideradas
4. ⚠️ **Retrabalho**: Usuário recebe análises duplicadas e confusas

### Exceções ao Protocolo

**ÚNICA exceção válida:**
- Knowledge base não existe (primeira análise profunda ever)
- Nesse caso, criar `site-da-luci-deep-analysis-v1.0.md` do zero

---

## 📞 CONTATO E MANUTENÇÃO

### Responsável pelo Protocolo
- **Criador**: Architect Agent (2026-01-23)
- **Mantenedores**: Todos os agentes (responsabilidade compartilhada)

### Atualização do Protocolo
Este protocolo deve ser atualizado se:
- Processos de validação mudarem
- Novos agentes forem adicionados ao ecossistema
- Estrutura de versionamento mudar
- Novos critérios de atualização forem identificados

**Versionamento do protocolo:**
- v1.0 (2026-01-23): Criação inicial

---

## 🎓 RESUMO EXECUTIVO

**Para Agentes Iniciantes:**

1. **Antes de analisar site-da-luci**: Leia `site-da-luci-deep-analysis-v*.md`
2. **Valide informações**: Cheque se está atualizado
3. **Atualize se necessário**: Crie nova versão com data e incremento
4. **Responda ao usuário**: Use informações validadas

**Regra de Ouro:**
> "SEMPRE consulte o knowledge base ANTES de fazer análises profundas. SEMPRE atualize o knowledge base DEPOIS de mudanças significativas."

---

**FIM DO PROTOCOLO**

> Este protocolo é obrigatório para todos os agentes que trabalham no projeto site-da-luci.
