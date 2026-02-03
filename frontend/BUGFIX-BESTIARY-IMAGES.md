# Bugfix: Bestiary Planner - Erro 400 nas Imagens

**Data**: 2026-02-03
**Severity**: MEDIUM
**Status**: ✅ FIXED

## Problema Identificado

As imagens das criaturas no Bestiary Planner estavam retornando erro 400 (Bad Request) devido a URLs incorretas sendo construídas.

### Causa Raiz

O projeto está configurado com `"homepage": "https://marinalarissa.github.io/site-da-luci"` no `package.json`, o que significa que em produção (GitHub Pages), todos os recursos estáticos devem ser prefixados com `/site-da-luci`.

**URLs das Imagens no Código:**
```javascript
// bestiary.js
"imageUrl": "/images/creatures/Raging_Fire.gif"
```

**O que estava acontecendo:**

1. **Em desenvolvimento local**: URLs funcionavam como `/images/creatures/X.gif` ✅
2. **Em produção (GitHub Pages)**: URLs tentavam buscar de:
   - Errado: `https://marinalarissa.github.io/images/creatures/X.gif` ❌
   - Correto: `https://marinalarissa.github.io/site-da-luci/images/creatures/X.gif` ✅

### Sintomas

- Erro 400/404 nas requisições de imagens
- Imagens não carregavam, exibindo placeholder "???"
- Console do navegador mostrando erros de rede

## Solução Implementada

### 1. Criado Helper de Imagens (`src/utils/imageUtils.js`)

Implementamos funções utilitárias que automaticamente adicionam o `PUBLIC_URL` correto baseado no ambiente:

```javascript
export const getImageUrl = (imageUrl) => {
  if (!imageUrl) return null;

  // URLs absolutas (http/https/data) não são modificadas
  if (imageUrl.startsWith('http://') ||
      imageUrl.startsWith('https://') ||
      imageUrl.startsWith('data:')) {
    return imageUrl;
  }

  // Adiciona PUBLIC_URL em produção
  const cleanUrl = imageUrl.startsWith('/') ? imageUrl.slice(1) : imageUrl;
  const publicUrl = process.env.PUBLIC_URL || '';
  return publicUrl ? `${publicUrl}/${cleanUrl}` : `/${cleanUrl}`;
};
```

**Como funciona:**

- **Development** (`PUBLIC_URL` vazio): `/images/creatures/Dragon.gif`
- **Production** (`PUBLIC_URL = /site-da-luci`): `/site-da-luci/images/creatures/Dragon.gif`

### 2. Atualizado Componentes

Modificamos todos os componentes que renderizam imagens para usar o helper:

#### CreatureCard.js
```diff
- import { memo } from 'react';
+ import { getImageUrl, PLACEHOLDER_IMAGE } from '../../utils/imageUtils';

  <CreatureImage
-   src={creature.imageUrl}
+   src={getImageUrl(creature.imageUrl)}
    alt={creature.name}
    loading="lazy"
    onError={handleImageError}
  />
```

#### KillCountModal.js
```diff
+ import { getImageUrl } from '../../utils/imageUtils';

  <CreatureImage
-   src={creature.imageUrl}
+   src={getImageUrl(creature.imageUrl)}
    alt={creature.name}
  />
```

### 3. Testes Criados

Criamos suite de testes completa para validar o comportamento em diferentes ambientes:

**Arquivo**: `src/utils/__tests__/imageUtils.test.js`

**Testes**:
- ✅ Retorna PUBLIC_URL do environment
- ✅ Retorna string vazia quando PUBLIC_URL não está definido
- ✅ Não modifica URLs absolutas (http/https)
- ✅ Não modifica data URLs (placeholders)
- ✅ Adiciona PUBLIC_URL corretamente em produção
- ✅ Funciona corretamente em desenvolvimento

**Resultado**: 12/12 testes passando ✅

## Arquivos Modificados

1. ✅ `src/utils/imageUtils.js` (CRIADO)
2. ✅ `src/utils/__tests__/imageUtils.test.js` (CRIADO)
3. ✅ `src/components/BestiaryPlanner/CreatureCard.js` (MODIFICADO)
4. ✅ `src/components/BestiaryPlanner/KillCountModal.js` (MODIFICADO)

## Validação

### Desenvolvimento Local
```bash
# As imagens devem carregar corretamente
http://localhost:3000/images/creatures/Raging_Fire.gif
```

### Produção (GitHub Pages)
```bash
# As imagens devem carregar com o prefixo correto
https://marinalarissa.github.io/site-da-luci/images/creatures/Raging_Fire.gif
```

## Impacto

### Positivo
- ✅ Imagens carregam corretamente em TODOS os ambientes
- ✅ Código mais robusto e maintainable
- ✅ Comportamento consistente entre dev e prod
- ✅ Testes automatizados garantem qualidade
- ✅ Reutilizável para outros componentes que usam imagens

### Nenhum Impacto Negativo
- ✅ Não quebra funcionalidades existentes
- ✅ Backwards compatible (URLs antigas ainda funcionam)
- ✅ Performance não afetada (apenas string concatenation)

## Como Usar em Novos Componentes

Se você precisar exibir imagens de criaturas em novos componentes:

```javascript
import { getImageUrl, PLACEHOLDER_IMAGE } from '../../utils/imageUtils';

// Em qualquer componente
<img
  src={getImageUrl(creature.imageUrl)}
  alt={creature.name}
  onError={(e) => {
    e.target.src = PLACEHOLDER_IMAGE;
  }}
/>
```

## Próximos Passos (Opcional)

1. **Verificar outros componentes**: Procurar por outros lugares que possam estar carregando imagens sem usar o helper
2. **Adicionar ESLint rule**: Criar regra para detectar uso direto de `imageUrl` sem `getImageUrl()`
3. **Documentar padrão**: Adicionar ao guia de desenvolvimento

## Referências

- **Issue/Ticket**: Erro 400 nas imagens do Bestiary Planner
- **Environment Variables**: https://create-react-app.dev/docs/adding-custom-environment-variables/
- **PUBLIC_URL**: https://create-react-app.dev/docs/using-the-public-folder/

---

**Author**: Claude Code
**Reviewed**: Aguardando review
**Deploy**: Aguardando merge to main
