# Execution Plans - site-da-luci

## O que são Execution Plans?

Execution plans são **planos de execução detalhados** que dividem implementações complexas em etapas gerenciáveis, evitando perda de contexto.

## Regras Fundamentais

### Limite de Tarefas
**Máximo 10 tarefas por etapa**

Cada etapa deve conter no máximo 10 tarefas. Se precisar de mais, divida em múltiplas etapas.

### Limite de Tokens
**Máximo 200 tokens por etapa**

Cada seção de etapa deve ter aproximadamente 200 tokens para manter contexto gerenciável.

### Commit por Etapa
**1 etapa = 1 commit**

Após completar uma etapa, sugira uma mensagem de commit que o usuário deve aprovarantes de prosseguir para a próxima.

## Estrutura de um Execution Plan

```markdown
# Execution Plan: [Título]

---
Plan ID: EP-[numero]
Date: YYYY-MM-DD
Status: 🟡 Pending / 🔵 In Progress / ✅ Completed
Priority: P0/P1/P2/P3
Target: site-da-luci
---

## Executive Summary
[Resumo do que será implementado]

## Current State Analysis
[Estado atual do código/projeto]

## Goals & Success Criteria
[Objetivos e critérios de sucesso]

## Etapa 1: [Nome da Etapa]
**Objetivo**: [objetivo claro]
**Limite**: X tarefas | Y tokens
**Commit**: "[mensagem de commit]"

### Tasks
1. [Tarefa específica]
2. [Tarefa específica]
...
(max 10 tarefas)

### Validation Checklist
- [ ] Critério 1
- [ ] Critério 2

### Output
- [Entregas esperadas]

## Progress Tracking
[Tabela de progresso por etapa]
```

## Workflow de Uso

### 1. ANTES de Implementar (Obrigatório)

```
1. Criar execution plan usando template
2. Definir etapas (10 tarefas max cada)
3. Revisar plan com usuário
4. Obter aprovação
```

### 2. DURANTE a Implementação

```
1. Marcar etapa como "in_progress"
2. Executar tarefas da etapa
3. Validar com checklist
4. Atualizar plan com progresso
5. Fazer commit da etapa
6. Repetir para próxima etapa
```

### 3. APÓS Conclusão

```
1. Marcar plan como "completed"
2. Documentar lições aprendidas
3. Arquivar plan se necessário
```

## Exemplo Prático

```markdown
## Etapa 1: Criar Componente Header

**Objetivo**: Criar componente Header com dark theme
**Limite**: 5 tarefas | 120 tokens
**Commit**: "feat(header): add Header component with dark theme support"

### Tasks
1. Criar pasta components/Header/
2. Criar index.js com estrutura básica
3. Criar styles.js com CSS variables
4. Adicionar suporte a dark theme
5. Adicionar traduções (i18n)

### Validation Checklist
- [ ] Component renderiza corretamente
- [ ] Dark theme funciona
- [ ] Traduções aplicadas
- [ ] Sem textos hardcoded

### Output
- components/Header/index.js
- components/Header/styles.js
- translations/header.json
```

## Template

Use o template em [`../templates/template_execution_plan.md`](../templates/template_execution_plan.md)

## Guardrails (Para Agentes)

### feature-implementer.md
```
⚠️ CRITICAL: ANTES de implementar qualquer feature:
1. Criar execution plan
2. Limitar etapas (10 tarefas, 200 tokens)
3. Obter aprovação do usuário
4. Seguir plan estritamente
```

### test-debugger.md
```
⚠️ CRITICAL: Para debugging complexo:
1. Criar execution plan de debug
2. Dividir em etapas (identificar → analisar → corrigir)
3. Atualizar plan com descobertas
```

### reviewer.md
```
⚠️ CRITICAL: Ao revisar PR:
1. Verificar se execution plan foi seguido
2. Validar 1 commit por etapa
3. Validar tarefas completadas
```

## Benefícios

### Redução de Perda de Contexto
- Etapas pequenas = contexto gerenciável
- Limite de tokens previne overflow
- Commits frequentes = checkpoints

### Melhor Rastreabilidade
- Histórico claro de progresso
- Commits granulares
- Fácil rollback se necessário

### Qualidade Superior
- Validation checklists por etapa
- Revisão incremental
- Menos bugs introduzidos

## Referências

- [Template de Execution Plan](../templates/template_execution_plan.md)
- [Example de Execution Plan](../examples/execution-plan-example.md)

---

**Last Updated**: 2026-01-16
**Total Plans**: 0
**Active Plans**: 0
**Completed Plans**: 0