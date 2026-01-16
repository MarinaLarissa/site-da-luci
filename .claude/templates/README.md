# Templates - site-da-luci

## O que são Templates?

Templates são **modelos reutilizáveis** prontos para copiar e adaptar, acelerando a criação de componentes, testes e documentação.

## Como Usar

### Para a IA

Ao criar algo novo:
1. **Identifique o template relevante** consultando `index.md`
2. **Copie o template completo**
3. **Adapte** para o caso específico
4. **Mantenha** a estrutura e patterns

### Para Usuários

Para usar um template:

```
@templates/[nome-do-template].md
```

Exemplo:
```
@templates/template_react_component.md criar componente Button
```

## Templates Planejados

### template_execution_plan.md

Template para planos de execução:
- Frontmatter (Plan ID, Date, Status, Priority)
- Executive Summary
- Current State Analysis
- Goals & Success Criteria
- Etapas (10 tarefas max, 200 tokens max)
- Progress Tracking
- Risk Analysis
- Success Metrics

### template_react_component.md

Template para componentes React:
- Estrutura de pasta
- index.js (FunctionComponent com memo)
- propTypes
- defaultProps
- useTranslation (i18n)
- styles.js (CSS-in-JS)
- Comentários JSDoc

### template_react_hook.md

Template para custom hooks:
- Estrutura useNomeDoHook
- Documentação JSDoc
- Return type
- Cleanup (useEffect return)
- Error handling
- Examples de uso

### template_cypress_test.md

Template para testes E2E:
- Estrutura describe/it
- beforeEach (setup)
- AAA pattern (Arrange, Act, Assert)
- Cleanup (afterEach)
- Tags
- Data-cy selectors

### template_index.md

Template para arquivos index.md:
- Frontmatter (diretorio, total_itens, categoria)
- Inventário (tabela)
- Estrutura (tree)
- Tags
- Manutenção

## Estrutura de um Template

Cada template deve conter:

```markdown
# Template: [Nome]

## Description
[O que este template faz]

## Usage
[Como usar este template]

## Template Code
```language
[Código do template com comentários]
```

## Example
[Exemplo de uso adaptado]

## Checklist
- [ ] Item de validação 1
- [ ] Item de validação 2
```

## Criando Novos Templates

Quando criar um novo template:

1. Use código **real e testado** do projeto
2. Adicione **comentários explicativos**
3. Inclua **example de uso**
4. Adicione **checklist de validação**
5. Mantenha **atualizado** com evolução do projeto

## Referências

- [Templates do nex-web-test](../../nex-docs/nex-web-test/.claude/templates/)
- [Template Index Template](../../nex-docs/nex-web-test/.claude/templates/template_index.md)

---

**Last Updated**: 2026-01-16
**Total Templates**: 0 (5 planejados)
