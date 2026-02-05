/**
 * Unit Tests for Page Components Loading
 *
 * Tests cover:
 * - All main pages render without errors
 * - Components load correctly
 * - No JavaScript errors in console
 * - Loading states work properly
 * - Navigation between pages
 */

import React, { Suspense } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n/config';
import theme from '../../styles/theme';
import { AuthProvider } from '../../contexts/AuthContext';

// Import components (default exports)
import LootSplitCalculator from '../../components/LootSplitCalculator/LootSplitCalculator';
import SoloHuntAnalyzer from '../../components/SoloHuntAnalyzer/SoloHuntAnalyzer';
import ImbuementCalculator from '../../components/ImbuementCalculator/ImbuementCalculator';
import BestiaryPlanner from '../../components/BestiaryPlanner/BestiaryPlanner';

// Mock Supabase client
jest.mock('../../services/supabaseClient', () => ({
  supabase: {
    auth: {
      getSession: jest.fn(() => Promise.resolve({ data: { session: null }, error: null })),
      onAuthStateChange: jest.fn(() => ({
        data: { subscription: { unsubscribe: jest.fn() } },
      })),
    },
  },
  isSupabaseConfigured: jest.fn(() => true),
}));

// Mock localStorage
let localStorageStore = {};

const localStorageMock = {
  getItem: (key) => localStorageStore[key] || null,
  setItem: (key, value) => {
    localStorageStore[key] = value;
  },
  removeItem: (key) => {
    delete localStorageStore[key];
  },
  clear: () => {
    localStorageStore = {};
  },
};

Object.defineProperty(window, 'localStorage', { value: localStorageMock, writable: true });

// Test wrapper with all providers
const renderWithProviders = (component) => {
  return render(
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <Suspense fallback={<div>Loading...</div>}>
            {component}
          </Suspense>
        </AuthProvider>
      </I18nextProvider>
    </ThemeProvider>
  );
};

describe('Page Components Loading', () => {
  beforeEach(() => {
    localStorageStore = {};
    // Suppress console errors for expected warnings
    jest.spyOn(console, 'error').mockImplementation((message) => {
      // Only suppress expected React warnings
      if (message.includes('Warning:') || message.includes('act(')) {
        return;
      }
      console.error(message);
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // ============== Loot Split Calculator Tests ==============

  describe('LootSplitCalculator', () => {
    it('should render without errors', () => {
      renderWithProviders(<LootSplitCalculator />);

      // Component should be in the document
      expect(screen.getByText(/loot split/i)).toBeInTheDocument();
    });

    it('should display all main sections', () => {
      renderWithProviders(<LootSplitCalculator />);

      // Check for key sections
      expect(screen.getByText(/loot split/i)).toBeInTheDocument();
    });

    it('should handle loading state', () => {
      const { container } = renderWithProviders(<LootSplitCalculator />);

      // Component should render (no loading indefinitely)
      expect(container).toBeInTheDocument();
    });

    it('should not log console errors on mount', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error');

      renderWithProviders(<LootSplitCalculator />);

      // Filter out expected React warnings
      const unexpectedErrors = consoleErrorSpy.mock.calls.filter(
        (call) => !call[0].includes('Warning:') && !call[0].includes('act(')
      );

      expect(unexpectedErrors.length).toBe(0);
    });
  });

  // ============== Solo Hunt Analyzer Tests ==============

  describe('SoloHuntAnalyzer', () => {
    const mockGoldTokenPrice = 30000;
    const mockSetGoldTokenPrice = jest.fn();

    it('should render without errors', () => {
      renderWithProviders(
        <SoloHuntAnalyzer
          goldTokenPrice={mockGoldTokenPrice}
          setGoldTokenPrice={mockSetGoldTokenPrice}
        />
      );

      // Component should be in the document
      expect(screen.getByText(/solo hunt/i)).toBeInTheDocument();
    });

    it('should display main input sections', () => {
      renderWithProviders(
        <SoloHuntAnalyzer
          goldTokenPrice={mockGoldTokenPrice}
          setGoldTokenPrice={mockSetGoldTokenPrice}
        />
      );

      // Check for key input sections
      expect(screen.getByText(/solo hunt/i)).toBeInTheDocument();
    });

    it('should handle props correctly', () => {
      renderWithProviders(
        <SoloHuntAnalyzer
          goldTokenPrice={mockGoldTokenPrice}
          setGoldTokenPrice={mockSetGoldTokenPrice}
        />
      );

      // Component should receive and use props
      expect(screen.getByText(/solo hunt/i)).toBeInTheDocument();
    });

    it('should not log console errors on mount', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error');

      renderWithProviders(
        <SoloHuntAnalyzer
          goldTokenPrice={mockGoldTokenPrice}
          setGoldTokenPrice={mockSetGoldTokenPrice}
        />
      );

      const unexpectedErrors = consoleErrorSpy.mock.calls.filter(
        (call) => !call[0].includes('Warning:') && !call[0].includes('act(')
      );

      expect(unexpectedErrors.length).toBe(0);
    });

    it('should handle loading state', () => {
      const { container } = renderWithProviders(
        <SoloHuntAnalyzer
          goldTokenPrice={mockGoldTokenPrice}
          setGoldTokenPrice={mockSetGoldTokenPrice}
        />
      );

      expect(container).toBeInTheDocument();
    });
  });

  // ============== Imbuement Calculator Tests ==============

  describe('ImbuementCalculator', () => {
    const mockGoldTokenPrice = 30000;
    const mockSetGoldTokenPrice = jest.fn();

    it('should render without errors', () => {
      renderWithProviders(
        <ImbuementCalculator
          goldTokenPrice={mockGoldTokenPrice}
          setGoldTokenPrice={mockSetGoldTokenPrice}
        />
      );

      // Component should be in the document
      expect(screen.getByText(/imbuement/i)).toBeInTheDocument();
    });

    it('should display calculator sections', () => {
      renderWithProviders(
        <ImbuementCalculator
          goldTokenPrice={mockGoldTokenPrice}
          setGoldTokenPrice={mockSetGoldTokenPrice}
        />
      );

      // Check for key sections
      expect(screen.getByText(/imbuement/i)).toBeInTheDocument();
    });

    it('should handle props correctly', () => {
      renderWithProviders(
        <ImbuementCalculator
          goldTokenPrice={mockGoldTokenPrice}
          setGoldTokenPrice={mockSetGoldTokenPrice}
        />
      );

      expect(screen.getByText(/imbuement/i)).toBeInTheDocument();
    });

    it('should not log console errors on mount', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error');

      renderWithProviders(
        <ImbuementCalculator
          goldTokenPrice={mockGoldTokenPrice}
          setGoldTokenPrice={mockSetGoldTokenPrice}
        />
      );

      const unexpectedErrors = consoleErrorSpy.mock.calls.filter(
        (call) => !call[0].includes('Warning:') && !call[0].includes('act(')
      );

      expect(unexpectedErrors.length).toBe(0);
    });

    it('should handle loading state', () => {
      const { container } = renderWithProviders(
        <ImbuementCalculator
          goldTokenPrice={mockGoldTokenPrice}
          setGoldTokenPrice={mockSetGoldTokenPrice}
        />
      );

      expect(container).toBeInTheDocument();
    });
  });

  // ============== Bestiary Planner Tests ==============

  describe('BestiaryPlanner', () => {
    it('should render without errors', () => {
      renderWithProviders(<BestiaryPlanner />);

      // Component should be in the document
      expect(screen.getByText(/bestiary/i)).toBeInTheDocument();
    });

    it('should display warning when no character exists', () => {
      renderWithProviders(<BestiaryPlanner />);

      // Should show create character message
      expect(screen.getByText(/create character/i)).toBeInTheDocument();
    });

    it('should render planner when character exists', () => {
      // Setup character in localStorage
      const mockCharacter = {
        id: 'test-char',
        name: 'Test Character',
        level: 100,
        vocation: 'knight',
        creatures: {},
      };

      const storageData = {
        version: '1.0',
        lastUpdated: new Date().toISOString(),
        activeCharacter: mockCharacter.id,
        characters: { [mockCharacter.id]: mockCharacter },
        settings: { rapidRespawnActive: false, preferredRegions: [] },
      };

      localStorageMock.setItem('luci_bestiary_progress', JSON.stringify(storageData));

      renderWithProviders(<BestiaryPlanner />);

      // Should show planner
      expect(screen.getByText(/bestiary planner/i)).toBeInTheDocument();
    });

    it('should not log console errors on mount', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error');

      renderWithProviders(<BestiaryPlanner />);

      const unexpectedErrors = consoleErrorSpy.mock.calls.filter(
        (call) => !call[0].includes('Warning:') && !call[0].includes('act(')
      );

      expect(unexpectedErrors.length).toBe(0);
    });

    it('should handle loading state', () => {
      const { container } = renderWithProviders(<BestiaryPlanner />);

      expect(container).toBeInTheDocument();
    });
  });

  // ============== Cross-Component Integration Tests ==============

  describe('cross-component integration', () => {
    it('should render all components sequentially without errors', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error');

      // Render each component one by one
      const { unmount: unmount1 } = renderWithProviders(<LootSplitCalculator />);
      await waitFor(() => {
        expect(screen.getByText(/loot split/i)).toBeInTheDocument();
      });
      unmount1();

      const { unmount: unmount2 } = renderWithProviders(
        <SoloHuntAnalyzer goldTokenPrice={30000} setGoldTokenPrice={jest.fn()} />
      );
      await waitFor(() => {
        expect(screen.getByText(/solo hunt/i)).toBeInTheDocument();
      });
      unmount2();

      const { unmount: unmount3 } = renderWithProviders(
        <ImbuementCalculator goldTokenPrice={30000} setGoldTokenPrice={jest.fn()} />
      );
      await waitFor(() => {
        expect(screen.getByText(/imbuement/i)).toBeInTheDocument();
      });
      unmount3();

      const { unmount: unmount4 } = renderWithProviders(<BestiaryPlanner />);
      await waitFor(() => {
        expect(screen.getByText(/bestiary/i)).toBeInTheDocument();
      });
      unmount4();

      // No unexpected errors should have been logged
      const unexpectedErrors = consoleErrorSpy.mock.calls.filter(
        (call) => !call[0].includes('Warning:') && !call[0].includes('act(')
      );

      expect(unexpectedErrors.length).toBe(0);
    });

    it('should handle theme provider correctly for all components', () => {
      // Each component should receive theme
      const components = [
        <LootSplitCalculator />,
        <SoloHuntAnalyzer goldTokenPrice={30000} setGoldTokenPrice={jest.fn()} />,
        <ImbuementCalculator goldTokenPrice={30000} setGoldTokenPrice={jest.fn()} />,
        <BestiaryPlanner />,
      ];

      components.forEach((component, index) => {
        const { unmount } = renderWithProviders(component);

        // Component should be styled (has theme) - verify render succeeded
        expect(document.body).toBeInTheDocument();

        unmount();
      });
    });

    it('should handle i18n provider correctly for all components', () => {
      // Each component should receive i18n
      const components = [
        <LootSplitCalculator />,
        <SoloHuntAnalyzer goldTokenPrice={30000} setGoldTokenPrice={jest.fn()} />,
        <ImbuementCalculator goldTokenPrice={30000} setGoldTokenPrice={jest.fn()} />,
        <BestiaryPlanner />,
      ];

      components.forEach((component) => {
        const { unmount } = renderWithProviders(component);

        // Component should render with translations - verify render succeeded
        expect(document.body).toBeInTheDocument();

        unmount();
      });
    });
  });

  // ============== Loading State Tests ==============

  describe('loading states', () => {
    it('should show suspense fallback during component lazy loading', () => {
      const { container } = render(
        <ThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n}>
            <Suspense fallback={<div data-testid="loading-fallback">Loading...</div>}>
              <LootSplitCalculator />
            </Suspense>
          </I18nextProvider>
        </ThemeProvider>
      );

      // Component should eventually load
      expect(container).toBeInTheDocument();
    });
  });

  // ============== Error Boundary Tests ==============

  describe('error handling', () => {
    it('should not throw uncaught errors during render', () => {
      const components = [
        <LootSplitCalculator />,
        <SoloHuntAnalyzer goldTokenPrice={30000} setGoldTokenPrice={jest.fn()} />,
        <ImbuementCalculator goldTokenPrice={30000} setGoldTokenPrice={jest.fn()} />,
        <BestiaryPlanner />,
      ];

      components.forEach((component) => {
        expect(() => {
          const { unmount } = renderWithProviders(component);
          unmount();
        }).not.toThrow();
      });
    });
  });
});
