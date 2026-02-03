# React Component Do's and Don'ts

**Objetivo**: Guia escanável de padrões React do projeto site-da-luci
**Formato**: Comparações before/after com explicação do PORQUÊ
**Última Atualização**: 2026-02-03

---

## Table of Contents
1. [DO: Use React.memo for Pure Components](#do-use-reactmemo-for-pure-components)
2. [DO: Use PropTypes for Type Checking](#do-use-proptypes-for-type-checking)
3. [DO: Use useRef for Callback Storage](#do-use-useref-for-callback-storage)
4. [DO: Destructure Props at Function Signature](#do-destructure-props-at-function-signature)
5. [DON'T: Use Inline Styles](#dont-use-inline-styles)
6. [DON'T: Hardcode User-Facing Text](#dont-hardcode-user-facing-text)
7. [DON'T: Use useState for Callbacks](#dont-use-usestate-for-callbacks)
8. [DON'T: Use useEffect Without Dependencies](#dont-use-useeffect-without-dependencies)

---

## DO: Use React.memo for Pure Components

### ✅ CORRECT

```javascript
import React from 'react';
import PropTypes from 'prop-types';

const PlayerCard = React.memo(({ player, onClick }) => {
  return (
    <div onClick={() => onClick(player.id)} data-cy="player-card">
      <h3>{player.name}</h3>
      <p>Level: {player.level}</p>
    </div>
  );
});

PlayerCard.propTypes = {
  player: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PlayerCard;
```

### ❌ WRONG

```javascript
function PlayerCard(props) {
  return (
    <div onClick={() => props.onClick(props.player.id)}>
      <h3>{props.player.name}</h3>
      <p>Level: {props.player.level}</p>
    </div>
  );
}

export default PlayerCard;
```

### PORQUÊ?

**Problema**: Sem `React.memo`, o componente re-renderiza toda vez que o componente pai re-renderiza, mesmo que as props não tenham mudado.

**Solução**: `React.memo` faz shallow comparison das props e previne re-renderizações desnecessárias quando as props não mudaram.

**Impacto**:
- ✅ Reduz re-renderizações: -60% a -80% em listas grandes
- ✅ Melhora performance: especialmente importante para componentes repetidos (ex: 100+ PlayerCards)
- ✅ Sem custo: o overhead do shallow comparison é mínimo comparado ao custo de re-renderizar

**Quando usar**:
- Componentes "puros" (mesmas props = mesmo output)
- Componentes renderizados em listas (map)
- Componentes que recebem callbacks como props

---

## DO: Use PropTypes for Type Checking

### ✅ CORRECT

```javascript
import PropTypes from 'prop-types';

function BestiaryCard({ creature, onToggleFavorite }) {
  return (
    <div data-cy="bestiary-card">
      <h3>{creature.name}</h3>
      <button onClick={() => onToggleFavorite(creature.id)}>
        {creature.isFavorite ? 'Unfavorite' : 'Favorite'}
      </button>
    </div>
  );
}

BestiaryCard.propTypes = {
  creature: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool,
  }).isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
};

export default BestiaryCard;
```

### ❌ WRONG

```javascript
function BestiaryCard({ creature, onToggleFavorite }) {
  return (
    <div>
      <h3>{creature.name}</h3>
      <button onClick={() => onToggleFavorite(creature.id)}>
        {creature.isFavorite ? 'Unfavorite' : 'Favorite'}
      </button>
    </div>
  );
}

export default BestiaryCard;
```

### PORQUÊ?

**Problema**: Sem PropTypes, erros de tipo só aparecem em runtime (ex: passar string onde espera-se number), causando bugs difíceis de debugar.

**Solução**: PropTypes valida tipos em development e mostra warnings claros no console quando algo está errado.

**Impacto**:
- ✅ Detecta bugs em development antes de ir para produção
- ✅ Serve como documentação viva das props esperadas
- ✅ Facilita refactoring: se mudar a estrutura de uma prop, PropTypes avisa todos os usos
- ✅ Sem impacto em production: PropTypes são removidos em builds otimizados

**Exemplo de Warning**:
```
Warning: Failed prop type: Invalid prop `creature.id` of type `number`
supplied to `BestiaryCard`, expected `string`.
```

---

## DO: Use useRef for Callback Storage

### ✅ CORRECT

```javascript
import { useRef, useEffect } from 'react';

function ChatInput({ onSendMessage, isConnected }) {
  const sendMessageRef = useRef(onSendMessage);

  // Update ref without causing re-render
  useEffect(() => {
    sendMessageRef.current = onSendMessage;
  }, [onSendMessage]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && isConnected) {
      sendMessageRef.current(e.target.value);
    }
  };

  return <input onKeyPress={handleKeyPress} data-cy="chat-input" />;
}
```

### ❌ WRONG

```javascript
import { useState, useEffect } from 'react';

function ChatInput({ onSendMessage, isConnected }) {
  const [sendCallback, setSendCallback] = useState(() => onSendMessage);

  useEffect(() => {
    setSendCallback(() => onSendMessage); // Triggers re-render!
  }, [onSendMessage]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && isConnected) {
      sendCallback(e.target.value);
    }
  };

  return <input onKeyPress={handleKeyPress} />;
}
```

### PORQUÊ?

**Problema**: Usar `useState` para armazenar callbacks causa re-renderizações desnecessárias toda vez que o callback muda.

**Solução**: `useRef` armazena o callback sem causar re-render. Atualizar `.current` no useEffect mantém sempre a versão mais recente.

**Impacto**:
- ✅ Elimina re-renderizações: componente só re-renderiza quando as props que afetam o UI mudam
- ✅ Previne stale closures: sempre usa a versão mais recente do callback via `.current`
- ✅ Melhor performance: menos ciclos de render = menos trabalho do React

**Quando usar**:
- Callbacks recebidos como props que são usados em event handlers
- Callbacks que mudam frequentemente (ex: a cada render do pai)
- Qualquer referência que não afeta o rendering

---

## DO: Destructure Props at Function Signature

### ✅ CORRECT

```javascript
import { useTranslation } from 'react-i18next';

function MiniCalculator({ initialValue, onCalculate, isDisabled }) {
  const { t } = useTranslation();

  return (
    <div data-cy="mini-calculator">
      <input
        type="number"
        defaultValue={initialValue}
        disabled={isDisabled}
      />
      <button onClick={onCalculate}>
        {t('calculator.calculate')}
      </button>
    </div>
  );
}
```

### ❌ WRONG

```javascript
import { useTranslation } from 'react-i18next';

function MiniCalculator(props) {
  const { t } = useTranslation();

  return (
    <div>
      <input
        type="number"
        defaultValue={props.initialValue}
        disabled={props.isDisabled}
      />
      <button onClick={props.onCalculate}>
        {t('calculator.calculate')}
      </button>
    </div>
  );
}
```

### PORQUÊ?

**Problema**: Usar `props.propName` polui o código e dificulta identificar quais props o componente espera.

**Solução**: Destructure na assinatura da função torna as props explícitas e o código mais limpo.

**Impacto**:
- ✅ Legibilidade: fica claro quais props o componente usa
- ✅ Menos código: `initialValue` vs `props.initialValue`
- ✅ Melhor autocompletar: IDEs sugerem as props destructured
- ✅ Facilita refactoring: mudanças nas props ficam visíveis na assinatura

**Padrão do projeto**:
```javascript
function Component({ prop1, prop2, children }) {
  // Use prop1, prop2, children diretamente
}
```

---

## DON'T: Use Inline Styles

### ✅ CORRECT

```javascript
import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: ${props => props.isHighlighted ? '#FFE5B4' : '#FFF'};
  border: 2px solid ${props => props.isHighlighted ? '#FFA500' : '#DDD'};
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

function CreatureCard({ creature, isHighlighted }) {
  return (
    <CardContainer isHighlighted={isHighlighted} data-cy="creature-card">
      <h3>{creature.name}</h3>
    </CardContainer>
  );
}
```

### ❌ WRONG

```javascript
function CreatureCard({ creature, isHighlighted }) {
  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
    backgroundColor: isHighlighted ? '#FFE5B4' : '#FFF',
    border: `2px solid ${isHighlighted ? '#FFA500' : '#DDD'}`,
    borderRadius: '8px',
  };

  return (
    <div style={cardStyle}>
      <h3>{creature.name}</h3>
    </div>
  );
}
```

### PORQUÊ?

**Problema**: Inline styles não suportam pseudo-classes (`:hover`), media queries, e criam novo objeto a cada render (performance).

**Solução**: Styled-components oferece todas as features do CSS + dynamic props + scoping automático.

**Impacto**:
- ❌ Inline styles criam novo objeto toda renderização → garbage collection
- ✅ Styled-components reusa estilos → melhor performance
- ❌ Inline não tem `:hover`, `:focus`, `:active` → UX limitada
- ✅ Styled permite pseudo-classes, animations, media queries
- ❌ Inline polui JSX → código difícil de ler
- ✅ Styled separa estilo de lógica → componente mais limpo

**Padrão do projeto**:
```javascript
// ComponentName.styles.js
export const StyledElement = styled.div`
  /* CSS here */
`;

// ComponentName.js
import { StyledElement } from './ComponentName.styles';
```

---

## DON'T: Hardcode User-Facing Text

### ✅ CORRECT

```javascript
import { useTranslation } from 'react-i18next';

function LoginForm({ onSubmit }) {
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit} data-cy="login-form">
      <h2>{t('auth.login.title')}</h2>
      <input
        type="email"
        placeholder={t('auth.login.emailPlaceholder')}
        aria-label={t('auth.login.emailLabel')}
      />
      <input
        type="password"
        placeholder={t('auth.login.passwordPlaceholder')}
        aria-label={t('auth.login.passwordLabel')}
      />
      <button type="submit">
        {t('auth.login.submit')}
      </button>
    </form>
  );
}
```

**Translation file** (`locales/en/translation.json`):
```json
{
  "auth": {
    "login": {
      "title": "Login to Your Account",
      "emailPlaceholder": "Enter your email",
      "emailLabel": "Email address",
      "passwordPlaceholder": "Enter your password",
      "passwordLabel": "Password",
      "submit": "Log In"
    }
  }
}
```

### ❌ WRONG

```javascript
function LoginForm({ onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <h2>Login to Your Account</h2>
      <input
        type="email"
        placeholder="Enter your email"
        aria-label="Email address"
      />
      <input
        type="password"
        placeholder="Enter your password"
        aria-label="Password"
      />
      <button type="submit">Log In</button>
    </form>
  );
}
```

### PORQUÊ?

**Problema**: Textos hardcoded tornam impossível traduzir a aplicação e dificultam mudanças de copy.

**Solução**: `react-i18next` centraliza textos em arquivos JSON, permitindo traduções e updates sem tocar no código.

**Impacto**:
- ❌ Hardcoded: mudar "Log In" → "Sign In" requer buscar em todo o código
- ✅ i18n: mudar em 1 lugar (translation.json) → propaga automaticamente
- ❌ Hardcoded: adicionar português requer duplicar componentes
- ✅ i18n: adicionar `pt/translation.json` → app inteiro traduzido
- ❌ Hardcoded: textos espalhados por todo o codebase
- ✅ i18n: textos organizados por feature/domain

**Padrão do projeto**:
```javascript
const { t } = useTranslation();
// Use t('namespace.key') para TODOS os textos visíveis ao usuário
```

**O que traduzir**:
- Títulos, labels, placeholders
- Mensagens de erro/sucesso
- Botões, links
- Tooltips, aria-labels (acessibilidade)

**O que NÃO traduzir**:
- data-cy attributes (Cypress tests)
- console.log (debug)
- Comentários no código

---

## DON'T: Use useState for Callbacks

### ✅ CORRECT (see [DO: Use useRef for Callback Storage](#do-use-useref-for-callback-storage))

### ❌ WRONG

```javascript
import { useState, useEffect } from 'react';

function SearchBar({ onSearch, debounceMs = 300 }) {
  const [searchCallback, setSearchCallback] = useState(() => onSearch);

  useEffect(() => {
    setSearchCallback(() => onSearch); // Triggers unnecessary re-render
  }, [onSearch]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchCallback(searchTerm);
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, searchCallback, debounceMs]);

  return <input onChange={e => setSearchTerm(e.target.value)} />;
}
```

### PORQUÊ?

**Problema**: `useState` para callbacks causa re-renderizações toda vez que o callback muda no pai.

**Solução**: Use `useRef` (ver DO acima).

**Impacto**:
- ❌ useState: 3 re-renders quando `onSearch` muda (setState + 2 filhos re-render)
- ✅ useRef: 0 re-renders extras, só atualiza `.current`
- ❌ useState: pode capturar stale callback entre renders
- ✅ useRef: sempre acessa versão mais recente via `.current`

**Regra prática**:
```javascript
// Callback afeta UI? → useState
const [isLoading, setIsLoading] = useState(false);

// Callback só usado em handlers/effects? → useRef
const callbackRef = useRef(onAction);
```

---

## DON'T: Use useEffect Without Dependencies

### ✅ CORRECT

```javascript
import { useEffect, useState } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    async function fetchUser() {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();

        if (!isCancelled) {
          setUser(data);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error('Failed to fetch user:', error);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    fetchUser();

    return () => {
      isCancelled = true; // Cleanup on unmount or userId change
    };
  }, [userId]); // Dependencies: only run when userId changes

  if (loading) return <div>Loading...</div>;
  return <div>{user?.name}</div>;
}
```

### ❌ WRONG

```javascript
import { useEffect, useState } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Missing dependency array → runs on EVERY render
    async function fetchUser() {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      setUser(data);
    }
    fetchUser();
  }); // ❌ NO DEPENDENCY ARRAY!

  return <div>{user?.name}</div>;
}
```

### PORQUÊ?

**Problema**: useEffect sem array de dependências roda TODA RENDERIZAÇÃO, causando loops infinitos e fetches desnecessários.

**Solução**: Sempre especifique dependências: `[]` para rodar 1x (mount), ou `[dep1, dep2]` para rodar quando deps mudarem.

**Impacto**:
- ❌ Sem deps: fetch dispara toda renderização → sobrecarga no servidor
- ✅ Com `[userId]`: fetch só quando userId muda → eficiente
- ❌ Sem deps: setUser causa re-render → dispara useEffect → loop infinito 💥
- ✅ Com deps: re-render não dispara useEffect novamente → seguro

**Casos de uso**:
```javascript
// Run once on mount
useEffect(() => {
  initializeApp();
}, []);

// Run when specific values change
useEffect(() => {
  fetchData(userId);
}, [userId]);

// Run on every render (RARE! Usually a mistake)
useEffect(() => {
  // Only if you REALLY need this
});
```

**Cleanup pattern** (importante para async):
```javascript
useEffect(() => {
  let isCancelled = false;

  asyncOperation().then(result => {
    if (!isCancelled) {
      setState(result);
    }
  });

  return () => {
    isCancelled = true; // Prevent setState on unmounted component
  };
}, [dependencies]);
```

---

## Summary

| Pattern | DO ✅ | DON'T ❌ | Impact |
|---------|-------|----------|--------|
| **Optimization** | React.memo | No memo on repeated components | -60% re-renders |
| **Type Safety** | PropTypes | No type validation | Catch bugs early |
| **Callback Storage** | useRef | useState for callbacks | No extra re-renders |
| **Code Style** | Destructure props | Use props.propName | Better readability |
| **Styling** | styled-components | Inline styles | Full CSS features |
| **Internationalization** | react-i18next | Hardcoded text | Easy translations |
| **State Management** | useRef for non-UI | useState for callbacks | Prevent re-renders |
| **Effect Safety** | Dependencies array | No dependencies | Prevent infinite loops |

---

## Related Files

- **Template**: [template_react_component_styled.md](../templates/template_react_component_styled.md)
- **Knowledge Base**: [react_patterns.md](../knowledge/react_patterns.md)
- **Live Examples**:
  - [PlayerCard.js](../../src/components/PlayerCard/PlayerCard.js)
  - [PlayerCard.styles.js](../../src/components/PlayerCard/PlayerCard.styles.js)

---

**Tags**: `react`, `best-practices`, `do-dont`, `patterns`, `performance`, `i18n`, `styled-components`, `hooks`

**Last Updated**: 2026-02-03
**Maintainer**: site-da-luci team
