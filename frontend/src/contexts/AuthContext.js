import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Monitor online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);

        if (process.env.NODE_ENV === 'development' && session) {
          console.log('Session loaded on mount:', session.user?.email);
        }
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('Auth state changed:', event, session?.user?.email);
        }

        setUser(session?.user ?? null);

        if (event === 'SIGNED_IN') {
          // User signed in - redirect to saved path
          if (process.env.NODE_ENV === 'development') {
            console.log('User signed in:', session?.user?.email);
          }

          // Check for saved redirect path
          const savedPath = localStorage.getItem('auth_redirect_path');
          localStorage.removeItem('auth_redirect_path');
          if (savedPath && savedPath.startsWith('/') && !savedPath.startsWith('//')) {
            // Small delay to ensure state is updated
            setTimeout(() => {
              window.location.href = savedPath;
            }, 100);
          }
        } else if (event === 'SIGNED_OUT') {
          if (process.env.NODE_ENV === 'development') {
            console.log('User signed out');
          }
        } else if (event === 'TOKEN_REFRESHED') {
          if (process.env.NODE_ENV === 'development') {
            console.log('Token refreshed successfully');
          }
        }
      }
    );

    // Periodic session check and token refresh (every 5 minutes)
    // This helps ensure the session stays active
    const sessionCheckInterval = setInterval(async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Session check error:', error);
          return;
        }

        if (session) {
          // Check if token is close to expiration (within 10 minutes)
          const expiresAt = session.expires_at * 1000; // Convert to milliseconds
          const now = Date.now();
          const tenMinutes = 10 * 60 * 1000;

          if (expiresAt - now < tenMinutes) {
            if (process.env.NODE_ENV === 'development') {
              console.log('Token close to expiration, refreshing...');
            }
            // Force refresh
            await supabase.auth.refreshSession();
          }
        }
      } catch (error) {
        console.error('Session check interval error:', error);
      }
    }, 5 * 60 * 1000); // Check every 5 minutes

    return () => {
      subscription?.unsubscribe();
      clearInterval(sessionCheckInterval);
    };
  }, []);

  const signUp = async (email, password) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;
    return data;
  };

  const signIn = async (email, password) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  };

  const signInWithGoogle = async () => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: process.env.REACT_APP_AUTH_REDIRECT_URL || window.location.origin,
      },
    });

    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured');
    }

    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const resetPassword = async (email) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.REACT_APP_AUTH_REDIRECT_URL || window.location.origin}/reset-password`,
    });

    if (error) throw error;
    return data;
  };

  const saveRedirectPath = () => {
    // Save current path for redirect after login
    localStorage.setItem('auth_redirect_path', window.location.pathname);
  };

  const value = {
    user,
    loading,
    isOnline,
    isAuthenticated: !!user,
    isSupabaseEnabled: isSupabaseConfigured(),
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
    saveRedirectPath,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
