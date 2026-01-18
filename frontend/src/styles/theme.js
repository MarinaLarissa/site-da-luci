/**
 * Theme configuration for styled-components
 * Design tokens extracted from index.css CSS custom properties
 */

const theme = {
  colors: {
    // Background
    bg: {
      primary: '#0f0e17',
      secondary: '#0f1620',
      tertiary: '#141b28',
    },
    // Text
    text: {
      primary: '#E0E0E0',
      secondary: '#9E9E9E',
      light: '#FFFFFF',
    },
    // Accent
    accent: {
      gold: '#c39bd3',
      goldHover: '#b388c7',
      goldLight: 'rgba(195, 155, 211, 0.2)',
    },
    // Status
    success: '#4CAF50',
    successLight: 'rgba(76, 175, 80, 0.1)',
    error: '#f44336',
    errorLight: 'rgba(244, 67, 54, 0.1)',
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
