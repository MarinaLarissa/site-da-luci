# Examples - site-da-luci

## O que são Examples?

Examples são **demonstrações práticas** de boas e más práticas, mostrando o que fazer e o que evitar.

## Formato

Cada example deve seguir a estrutura:

### DO's ✅

```javascript
// GOOD - [Explicação do porquê]
const example = "código correto";
```

### DON'Ts ❌

```javascript
// BAD - [Explicação do porquê]
const example = "código incorreto";
```

## Examples Planejados

### react-component-dos-donts.md

Boas e más práticas de componentes React:
- ✅ DO: Usar memo para performance
- ✅ DO: Definir propTypes
- ✅ DO: Destructuring de props
- ❌ DON'T: Inline styles
- ❌ DON'T: Hardcoded texts
- ❌ DON'T: Prop drilling excessivo

### i18n-dos-donts.md

Boas e más práticas de internacionalização:
- ✅ DO: Usar useTranslation hook
- ✅ DO: Organizar por namespaces
- ✅ DO: Validar com script
- ❌ DON'T: Hardcoded strings
- ❌ DON'T: Missing translation keys
- ❌ DON'T: Wrong namespace

### css-dos-donts.md

Boas e más práticas de CSS:
- ✅ DO: Usar CSS variables
- ✅ DO: Mobile-first approach
- ✅ DO: Semantic color names
- ❌ DON'T: Hardcoded colors
- ❌ DON'T: Pixel units (use rem)
- ❌ DON'T: !important overuse

### git-workflow-example.md

Exemplo de workflow Git ideal:
- Commits granulares (1 etapa = 1 commit)
- Mensagens descritivas
- Branches organizadas

### execution-plan-example.md

Exemplo de execution plan seguindo template:
- 10 tarefas max por etapa
- 200 tokens max por etapa
- 1 etapa = 1 commit

## Como Usar

### Para a IA

Ao implementar algo:
1. **Consulte o example relevante** antes de escrever código
2. **Siga os DO's** documentados
3. **Evite os DON'Ts** documentados
4. **Use os examples** como referência

### Para Usuários

Para referenciar um example:

```
@examples/[nome-do-example].md
```

## Criando Novos Examples

Quando criar um novo example:

1. Use formato DO's ✅ / DON'Ts ❌
2. Inclua código real do projeto
3. Explique o **porquê** de cada prática
4. Mostre **before/after** quando aplicável

## Referências

- [Examples do nex-web-test](../../nex-docs/nex-web-test/.claude/examples/)

---

**Last Updated**: 2026-01-16
**Total Examples**: 0 (5 planejados)
