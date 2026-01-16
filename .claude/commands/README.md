# Commands - site-da-luci

## O que são Slash Commands?

Slash commands são **atalhos para workflows complexos** que permitem executar tarefas comuns rapidamente.

## Como Usar

### Sintaxe

```
/[command-name] [argumentos]
```

### Exemplos

```
/implement criar botão de logout
/validate-i18n src/components/Header
/generate-component Button
/review-pr 123
/debug-issue erro no dark theme
```

## Commands Planejados

### /implement
**Descrição**: Implementar feature com execution plan automático
**Uso**: `/implement [descrição da feature]`
**Workflow**:
1. Criar execution plan (10 tarefas max)
2. Implementar etapa por etapa
3. Atualizar plan após cada etapa
4. Commit por etapa

**Exemplo**:
```
/implement adicionar dark mode ao header
```

---

### /validate-i18n
**Descrição**: Validar traduções e identificar textos hardcoded
**Uso**: `/validate-i18n [path]`
**Workflow**:
1. Usar skill i18n-validator
2. Executar script validate-i18n.js
3. Reportar issues encontrados
4. Sugerir correções

**Exemplo**:
```
/validate-i18n src/components/Dashboard
```

---

### /generate-component
**Descrição**: Gerar componente React padronizado
**Uso**: `/generate-component [ComponentName]`
**Workflow**:
1. Usar skill react-component-generator
2. Criar pasta + arquivos (index.js, styles.js)
3. Aplicar patterns do projeto
4. Validar com checklist

**Exemplo**:
```
/generate-component UserProfileCard
```

---

### /review-pr
**Descrição**: Revisar Pull Request seguindo padrões
**Uso**: `/review-pr [número]`
**Workflow**:
1. Usar agente reviewer
2. Validar i18n, CSS, React patterns
3. Identificar violações
4. Sugerir melhorias

**Exemplo**:
```
/review-pr 42
```

---

### /debug-issue
**Descrição**: Debugar issue específico
**Uso**: `/debug-issue [descrição]`
**Workflow**:
1. Usar agente test-debugger
2. Analisar logs/erros
3. Identificar root cause
4. Propor solução

**Exemplo**:
```
/debug-issue dark theme não funciona no Firefox
```

---

## Criando Novos Commands

Quando criar um novo command:

1. Crie arquivo `[command-name].md`
2. Documente:
   - Descrição
   - Sintaxe
   - Workflow (passo a passo)
   - Examples
   - Skills/agents utilizados
3. Adicione ao `index.md`

## Referências

- [Commands do nex-web-test](../../nex-docs/nex-web-test/.claude/commands/)

---

**Last Updated**: 2026-01-16
**Total Commands**: 0 (5 planejados)
