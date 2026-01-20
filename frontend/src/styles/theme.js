/**
 * Theme configuration for styled-components
 * Consolidated from all components - Phase 4 ETAPA 31
 * Single source of truth for all colors, spacing, and design tokens
 */

const theme = {
  colors: {
    // Background colors
    bg: {
      primary: '#0f0e17',      // Main app background
      secondary: '#0f1620',    // Secondary containers
      tertiary: '#141b28',     // Tertiary containers
      dark: '#1a1a2e',         // Dark background
      darker: '#16213e',       // Darker background (cards, inputs)
      card: '#16213e',         // Card containers
      input: '#0f0e17',        // Input fields
      hover: 'rgba(195, 155, 211, 0.1)', // Hover state
    },

    // Text colors
    text: {
      primary: '#e0e0e0',      // Primary text (#E0E0E0, #f0f0f0)
      secondary: '#9e9e9e',    // Secondary text (#9E9E9E)
      muted: '#9e9e9e',        // Muted text (same as secondary)
      label: '#b8b8b8',        // Form labels
      light: '#ffffff',        // White text
      placeholder: '#616161',  // Placeholder text
      disabled: '#b0b0b0',     // Disabled text
    },

    // Accent colors (purple/gold theme)
    accent: {
      primary: '#c39bd3',      // Primary accent color
      primaryLight: '#c39bd3', // Light variant (same)
      primaryDark: '#b388c7',  // Dark variant
      primaryDarker: '#9d6fb0',// Darker variant
      gold: '#c39bd3',         // Gold accent (purple)
      goldHover: '#b388c7',    // Gold hover
      goldLight: 'rgba(195, 155, 211, 0.2)', // Gold light (20% opacity)
      goldMedium: 'rgba(195, 155, 211, 0.3)', // Gold medium (30% opacity)
      accentGold: '#ffd700',   // True gold color
    },

    // Status colors
    success: '#4caf50',        // Success green
    successLight: 'rgba(76, 175, 80, 0.1)', // Success background
    successAlt: '#10b981',     // Alternative success green
    successBg: 'rgba(16, 185, 129, 0.1)', // Alternative success background

    error: '#f44336',          // Error red
    errorLight: 'rgba(244, 67, 54, 0.1)', // Error background
    errorAlt: '#ff6b6b',       // Alternative error red
    errorDark: '#d32f2f',      // Dark error red
    errorDarker: '#c62828',    // Darker error red

    warning: '#fbbf24',        // Warning yellow/orange
    warningBg: 'rgba(251, 191, 36, 0.1)', // Warning background
    warningBorder: '#fbbf24',  // Warning border
    warningText: '#fbbf24',    // Warning text
    warningAlt: '#ff9800',     // Alternative warning orange
    warningAlt2: '#ffc107',    // Alternative warning yellow

    info: '#1976d2',           // Info blue
    infoBg: '#e3f2fd',         // Info background
    infoDark: '#1565c0',       // Dark info blue

    // Border colors
    border: {
      light: 'rgba(195, 155, 211, 0.2)',   // Light border (20%)
      medium: 'rgba(195, 155, 211, 0.3)',  // Medium border (30%)
      default: '#e0e0e0',                  // Default gray border
      light2: '#e8e8e8',                   // Alternative light border
      error: '#ffcdd2',                    // Error border
    },

    // Language selector specific (different from main theme)
    languageSelector: {
      gradient1: '#667eea',    // Purple-blue
      gradient2: '#764ba2',    // Purple
    },

    // Tooltip
    tooltip: {
      bg: '#2c3e50',          // Dark blue-gray
    },

    // Legacy/deprecated (HuntHistory light theme - keeping for backwards compatibility)
    legacy: {
      white: '#ffffff',
      lightGray: '#f9f9f9',
      lighterGray: '#fafafa',
      border: '#e0e0e0',
      hoverGray: '#f0f0f0',
      errorBg: '#fff5f5',
      errorBgAlt: '#ffebee',
    },

    // Utility colors
    utility: {
      secondary: '#2d2d44',    // Secondary button background
      secondaryHover: '#3a3a55', // Secondary button hover
    },
  },

  // Gradients (frequently used)
  gradients: {
    primary: 'linear-gradient(135deg, #c39bd3 0%, #b388c7 100%)',
    primaryReverse: 'linear-gradient(135deg, #b388c7, #9d6fb0)',
    sidebar: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
    language: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    languageReverse: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    xxl: '32px',
  },

  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },

  fonts: {
    base: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    mono: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
  },

  transitions: {
    fast: '0.2s ease',
    normal: '0.3s ease',
  },
};

export default theme;
