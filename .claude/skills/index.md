---
diretorio: .claude/skills/
total_itens: 0
categoria: skills
ultima_atualizacao: 2026-01-16
---

# Skills - Index

## Inventário

| Arquivo | Tipo | Descrição | Tags | Data |
|---------|------|-----------|------|------|
| **README.md** | Documentação | Instruções para IA sobre uso de skills | `skills`, `guia`, `ia` | 2026-01-16 |

---

## Estrutura

```
skills/
├── index.md                      # Este arquivo (inventário)
├── README.md                     # Instruções para IA
└── (skills a serem criadas)
```

---

## Skills Planejadas

- `i18n-validator/` - Validação de traduções e textos hardcoded
- `react-component-generator/` - Geração de componentes React padronizados
- `css-theme-implementer/` - Implementação de CSS com dark theme

---

## Tags

`skills`, `site-da-luci`, `react`, `i18n`, `css`, `automation`, `best-practices`, `patterns`

---

## Manutenção

**Ao adicionar skill**:
1. Criar pasta `skills/[nome-skill]/`
2. Adicionar `SKILL.md` e `README.md`
3. Adicionar linha no Inventário
4. Atualizar `total_itens` no frontmatter

**Ao remover skill**:
1. Remover pasta da skill
2. Remover linha do Inventário
3. Atualizar `total_itens` no frontmatter
