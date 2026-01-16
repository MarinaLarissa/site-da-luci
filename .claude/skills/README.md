# Skills - site-da-luci

## O que são Skills?

Skills são **conjuntos especializados de conhecimento e padrões** que permitem à IA executar tarefas específicas com alta qualidade e consistência.

## Como Usar

### Para a IA (Claude)

Quando o usuário solicitar uma tarefa que corresponda a uma skill:

1. **Identifique a skill relevante** consultando o `index.md`
2. **Leia o SKILL.md completo** antes de executar a tarefa
3. **Siga TODOS os patterns** documentados na skill
4. **Use os checklists** para validar a implementação
5. **Consulte examples** em caso de dúvida

### Para Usuários

Para invocar uma skill específica:

```
@skills/[nome-da-skill]/SKILL.md [sua tarefa]
```

Exemplo:
```
@skills/i18n-validator/SKILL.md validar este componente
```

## Skills Disponíveis

### Planejadas (Em Desenvolvimento)

- **i18n-validator**: Validar traduções e identificar textos hardcoded
- **react-component-generator**: Gerar componentes React seguindo padrões do projeto
- **css-theme-implementer**: Implementar CSS com suporte a dark theme

## Estrutura de uma Skill

Cada skill deve conter:

```
skills/[nome-skill]/
├── SKILL.md         # Documentação completa (300+ linhas)
│                    # - Metadata
│                    # - Purpose
│                    # - Project Context
│                    # - Code Patterns & Conventions
│                    # - Common Workflows
│                    # - Best Practices (DO's and DON'Ts)
│                    # - Examples
│                    # - Quick Reference
└── README.md        # Visão geral da skill (este arquivo)
```

## Criando Novas Skills

Quando criar uma nova skill:

1. Use `i18n-validator` como referência de formato
2. Documente **código real** do projeto (não inventar)
3. Inclua **examples práticos** (correto/incorreto)
4. Adicione **checklists de validação**
5. Mantenha atualizado com evolução do projeto

## Referências

- [Skills do nex-web-test](../../nex-docs/nex-web-test/.claude/skills/) - Exemplo de skills maduras
- [Cypress Automation Skill](../../nex-docs/nex-web-test/.claude/skills/cypress-automation/SKILL.md) - Referência de formato

---

**Last Updated**: 2026-01-16
**Total Skills**: 0 (3 planejadas)
