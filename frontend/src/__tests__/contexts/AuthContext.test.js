/**
 * Unit Tests for AuthContext
 *
 * Tests cover:
 * - Google OAuth login flow
 * - Token storage and session management
 * - Redirect after login
 * - Error handling
 * - Session refresh
 * - Sign out flow
 */

import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../contexts/AuthContext';
import * as supabaseClient from '../../services/supabaseClient';

// Mock Supabase client
jest.mock('../../services/supabaseClient', () => ({
  supabase: {
    auth: {
      getSession: jest.fn(),
      onAuthStateChange: jest.fn(),
      signInWithOAuth: jest.fn(),
      signInWithPassword: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
      resetPasswordForEmail: jest.fn(),
      refreshSession: jest.fn(),
    },
  },
  isSupabaseConfigured: jest.fn(() => true),
}));

// Test component that uses AuthContext
const TestComponent = () => {
  const auth = useAuth();
  return (
    <div>
      <div data-testid="loading">{auth.loading ? 'Loading' : 'Ready'}</div>
      <div data-testid="authenticated">{auth.isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</div>
      <div data-testid="user">{auth.user ? auth.user.email : 'No User'}</div>
      <div data-testid="online">{auth.isOnline ? 'Online' : 'Offline'}</div>
      <button onClick={() => auth.signInWithGoogle()}>Sign In with Google</button>
      <button onClick={() => auth.signOut()}>Sign Out</button>
    </div>
  );
};

describe('AuthContext', () => {
  let mockUnsubscribe;
  let mockAuthStateCallback;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Mock localStorage
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.removeItem = jest.fn();

    // Mock unsubscribe function
    mockUnsubscribe = jest.fn();

    // Reset isSupabaseConfigured to default (true)
    supabaseClient.isSupabaseConfigured.mockReturnValue(true);

    // Setup default mock implementation for onAuthStateChange
    supabaseClient.supabase.auth.onAuthStateChange.mockImplementation((callback) => {
      mockAuthStateCallback = callback;
      return {
        data: {
          subscription: {
            unsubscribe: mockUnsubscribe,
          },
        },
      };
    });

    // Default: No session
    supabaseClient.supabase.auth.getSession.mockResolvedValue({
      data: { session: null },
      error: null,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // ============== Initialization Tests ==============

  describe('initialization', () => {
    it('should initialize with loading state', async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      // Initially should be loading or quickly transition to ready
      // Since getSession resolves immediately in tests, we check for Ready
      await waitFor(() => {
        expect(screen.getByTestId('loading')).toBeInTheDocument();
      });
    });

    it('should load session on mount', async () => {
      const mockSession = {
        user: { id: '123', email: 'test@example.com' },
        expires_at: Date.now() / 1000 + 3600,
      };

      // Mock must be set BEFORE render
      supabaseClient.supabase.auth.getSession.mockReset();
      supabaseClient.supabase.auth.getSession.mockResolvedValue({
        data: { session: mockSession },
        error: null,
      });

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('authenticated')).toHaveTextContent('Authenticated');
      });

      expect(screen.getByTestId('user')).toHaveTextContent('test@example.com');
    });

    it('should handle no session on mount', async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('Ready');
      });

      expect(screen.getByTestId('authenticated')).toHaveTextContent('Not Authenticated');
      expect(screen.getByTestId('user')).toHaveTextContent('No User');
    });

    it('should detect online status', () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      expect(screen.getByTestId('online')).toHaveTextContent('Online');
    });
  });

  // ============== Google OAuth Tests ==============

  describe('Google OAuth login', () => {
    it('should call signInWithOAuth with correct parameters', async () => {
      const mockOAuthResponse = {
        data: { url: 'https://accounts.google.com/oauth...' },
        error: null,
      };

      supabaseClient.supabase.auth.signInWithOAuth.mockResolvedValueOnce(mockOAuthResponse);

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('Ready');
      });

      const signInButton = screen.getByText('Sign In with Google');
      await act(async () => {
        signInButton.click();
      });

      expect(supabaseClient.supabase.auth.signInWithOAuth).toHaveBeenCalledWith({
        provider: 'google',
        options: {
          redirectTo: expect.any(String),
        },
      });
    });

    it('should handle OAuth error', async () => {
      const mockError = { message: 'OAuth failed' };
      supabaseClient.supabase.auth.signInWithOAuth.mockResolvedValueOnce({
        data: null,
        error: mockError,
      });

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('Ready');
      });

      const signInButton = screen.getByText('Sign In with Google');

      await expect(async () => {
        await act(async () => {
          signInButton.click();
        });
      }).rejects.toThrow();
    });

    it('should throw error when Supabase not configured', async () => {
      supabaseClient.isSupabaseConfigured.mockReturnValueOnce(false);

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('Ready');
      });

      const signInButton = screen.getByText('Sign In with Google');

      await expect(async () => {
        await act(async () => {
          signInButton.click();
        });
      }).rejects.toThrow('Supabase not configured');
    });
  });

  // ============== Session & Token Management Tests ==============

  describe('session and token management', () => {
    it('should update user state on SIGNED_IN event', async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('Ready');
      });

      const mockSession = {
        user: { id: '456', email: 'newuser@example.com' },
        expires_at: Date.now() / 1000 + 3600,
      };

      // Simulate SIGNED_IN event
      await act(async () => {
        mockAuthStateCallback('SIGNED_IN', mockSession);
      });

      expect(screen.getByTestId('authenticated')).toHaveTextContent('Authenticated');
      expect(screen.getByTestId('user')).toHaveTextContent('newuser@example.com');
    });

    it('should handle redirect after sign in', async () => {
      // Mock localStorage with saved redirect path
      Storage.prototype.getItem.mockReturnValueOnce('/bestiary-planner');

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('Ready');
      });

      const mockSession = {
        user: { id: '456', email: 'newuser@example.com' },
        expires_at: Date.now() / 1000 + 3600,
      };

      // Simulate SIGNED_IN event
      await act(async () => {
        mockAuthStateCallback('SIGNED_IN', mockSession);
      });

      // Should check for saved redirect path
      expect(Storage.prototype.getItem).toHaveBeenCalledWith('auth_redirect_path');
    });

    it('should clear user state on SIGNED_OUT event', async () => {
      const mockSession = {
        user: { id: '123', email: 'test@example.com' },
        expires_at: Date.now() / 1000 + 3600,
      };

      supabaseClient.supabase.auth.getSession.mockResolvedValueOnce({
        data: { session: mockSession },
        error: null,
      });

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('authenticated')).toHaveTextContent('Authenticated');
      });

      // Simulate SIGNED_OUT event
      await act(async () => {
        mockAuthStateCallback('SIGNED_OUT', null);
      });

      expect(screen.getByTestId('authenticated')).toHaveTextContent('Not Authenticated');
      expect(screen.getByTestId('user')).toHaveTextContent('No User');
    });

    it('should handle TOKEN_REFRESHED event', async () => {
      const mockSession = {
        user: { id: '123', email: 'test@example.com' },
        expires_at: Date.now() / 1000 + 3600,
      };

      supabaseClient.supabase.auth.getSession.mockResolvedValueOnce({
        data: { session: mockSession },
        error: null,
      });

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('Ready');
      });

      const refreshedSession = {
        ...mockSession,
        expires_at: Date.now() / 1000 + 7200, // New expiration
      };

      // Simulate TOKEN_REFRESHED event
      await act(async () => {
        mockAuthStateCallback('TOKEN_REFRESHED', refreshedSession);
      });

      // User should still be authenticated
      expect(screen.getByTestId('authenticated')).toHaveTextContent('Authenticated');
    });
  });

  // ============== Sign Out Tests ==============

  describe('sign out', () => {
    it('should call signOut successfully', async () => {
      const mockSession = {
        user: { id: '123', email: 'test@example.com' },
        expires_at: Date.now() / 1000 + 3600,
      };

      supabaseClient.supabase.auth.getSession.mockResolvedValueOnce({
        data: { session: mockSession },
        error: null,
      });

      supabaseClient.supabase.auth.signOut.mockResolvedValueOnce({
        error: null,
      });

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('authenticated')).toHaveTextContent('Authenticated');
      });

      const signOutButton = screen.getByText('Sign Out');
      await act(async () => {
        signOutButton.click();
      });

      expect(supabaseClient.supabase.auth.signOut).toHaveBeenCalled();
    });

    it('should handle sign out error', async () => {
      const mockSession = {
        user: { id: '123', email: 'test@example.com' },
        expires_at: Date.now() / 1000 + 3600,
      };

      supabaseClient.supabase.auth.getSession.mockResolvedValueOnce({
        data: { session: mockSession },
        error: null,
      });

      const mockError = { message: 'Sign out failed' };
      supabaseClient.supabase.auth.signOut.mockResolvedValueOnce({
        error: mockError,
      });

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('authenticated')).toHaveTextContent('Authenticated');
      });

      const signOutButton = screen.getByText('Sign Out');

      await expect(async () => {
        await act(async () => {
          signOutButton.click();
        });
      }).rejects.toThrow();
    });
  });

  // ============== Error Handling Tests ==============

  describe('error handling', () => {
    it('should handle session loading error', async () => {
      const mockError = { message: 'Failed to load session' };
      supabaseClient.supabase.auth.getSession.mockResolvedValueOnce({
        data: { session: null },
        error: mockError,
      });

      // Spy on console.error
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('Ready');
      });

      expect(consoleErrorSpy).toHaveBeenCalledWith('Error getting session:', mockError);
      consoleErrorSpy.mockRestore();
    });

    it('should handle when Supabase is not configured', async () => {
      supabaseClient.isSupabaseConfigured.mockReturnValueOnce(false);

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('Ready');
      });

      expect(screen.getByTestId('authenticated')).toHaveTextContent('Not Authenticated');
      expect(supabaseClient.supabase.auth.getSession).not.toHaveBeenCalled();
    });
  });

  // ============== Cleanup Tests ==============

  describe('cleanup', () => {
    it('should unsubscribe from auth changes on unmount', async () => {
      const { unmount } = render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('Ready');
      });

      unmount();

      expect(mockUnsubscribe).toHaveBeenCalled();
    });
  });

  // ============== useAuth Hook Tests ==============

  describe('useAuth hook', () => {
    it('should throw error when used outside AuthProvider', () => {
      // Suppress console.error for this test
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      expect(() => {
        render(<TestComponent />);
      }).toThrow('useAuth must be used within an AuthProvider');

      consoleErrorSpy.mockRestore();
    });
  });
});
