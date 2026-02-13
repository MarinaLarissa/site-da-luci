import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';

/**
 * Render with only ThemeProvider
 * Use for components that only need styled-components theme
 * Safe to use with tests that mock react-i18next
 */
export const renderWithTheme = (ui, options = {}) => {
  const Wrapper = ({ children }) => (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};
