/**
 * Global styles for the application
 * Migrated from index.css
 */

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* CSS Custom Properties (Design Tokens) */
  :root {
    /* Colors - Background */
    --color-bg-primary: ${({ theme }) => theme.colors.bg.primary};
    --color-bg-secondary: ${({ theme }) => theme.colors.bg.secondary};
    --color-bg-tertiary: ${({ theme }) => theme.colors.bg.tertiary};

    /* Colors - Text */
    --color-text-primary: ${({ theme }) => theme.colors.text.primary};
    --color-text-secondary: ${({ theme }) => theme.colors.text.secondary};
    --color-text-light: ${({ theme }) => theme.colors.text.light};

    /* Colors - Accent */
    --color-accent-gold: ${({ theme }) => theme.colors.accent.gold};
    --color-accent-gold-hover: ${({ theme }) => theme.colors.accent.goldHover};
    --color-accent-gold-light: ${({ theme }) => theme.colors.accent.goldLight};

    /* Colors - Status */
    --color-success: ${({ theme }) => theme.colors.success};
    --color-success-light: ${({ theme }) => theme.colors.successLight};
    --color-error: ${({ theme }) => theme.colors.error};
    --color-error-light: ${({ theme }) => theme.colors.errorLight};

    /* Spacing */
    --spacing-xs: ${({ theme }) => theme.spacing.xs};
    --spacing-sm: ${({ theme }) => theme.spacing.sm};
    --spacing-md: ${({ theme }) => theme.spacing.md};
    --spacing-lg: ${({ theme }) => theme.spacing.lg};
    --spacing-xl: ${({ theme }) => theme.spacing.xl};
    --spacing-2xl: ${({ theme }) => theme.spacing.xxl};

    /* Border Radius */
    --radius-sm: ${({ theme }) => theme.radius.sm};
    --radius-md: ${({ theme }) => theme.radius.md};
    --radius-lg: ${({ theme }) => theme.radius.lg};

    /* Fonts */
    --font-family-base: ${({ theme }) => theme.fonts.base};
    --font-family-mono: ${({ theme }) => theme.fonts.mono};

    /* Transitions */
    --transition-fast: ${({ theme }) => theme.transitions.fast};
    --transition-normal: ${({ theme }) => theme.transitions.normal};
  }

  /* Global styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: var(--font-family-base);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--color-bg-primary);
    color: var(--color-text-primary);
  }

  code {
    font-family: var(--font-family-mono);
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: var(--color-bg-primary);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--color-accent-gold);
    border-radius: var(--radius-sm);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-accent-gold-hover);
  }
`;

export default GlobalStyles;
