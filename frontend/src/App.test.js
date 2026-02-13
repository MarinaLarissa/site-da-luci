import { render, screen, waitFor } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';
import theme from './styles/theme';
import { AuthProvider } from './contexts/AuthContext';
import App from './App';

// Mock Supabase client
jest.mock('./services/supabaseClient', () => ({
  supabase: {
    auth: {
      getSession: jest.fn(() => Promise.resolve({ data: { session: null }, error: null })),
      onAuthStateChange: jest.fn(() => ({
        data: { subscription: { unsubscribe: jest.fn() } },
      })),
      refreshSession: jest.fn(),
    },
  },
  isSupabaseConfigured: jest.fn(() => true),
}));

test('renders Site da Luci title', async () => {
  render(
    <HashRouter>
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </I18nextProvider>
      </ThemeProvider>
    </HashRouter>
  );

  await waitFor(() => {
    const titleElement = screen.getByText(/Site da Luci/i);
    expect(titleElement).toBeInTheDocument();
  });
});
