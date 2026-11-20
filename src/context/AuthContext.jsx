import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { STORAGE_KEYS } from '../constants/storageKeys.js';
import { safeParseJSON } from '../utils/storeLogic.js';

const AuthContext = createContext(undefined);

function readStoredUser() {
  if (typeof window === 'undefined') return null;
  return safeParseJSON(window.localStorage.getItem(STORAGE_KEYS.DEMO_USER), null);
}

function readStoredSession() {
  if (typeof window === 'undefined') return null;
  return safeParseJSON(window.localStorage.getItem(STORAGE_KEYS.DEMO_SESSION), null);
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => readStoredSession());
  const [user, setUser] = useState(() => {
    const activeSession = readStoredSession();
    const savedUser = readStoredUser();
    return activeSession && savedUser ? savedUser : null;
  });

  const persistUserAndSession = useCallback((nextUser, nextSession) => {
    setUser(nextUser);
    setSession(nextSession);
    try {
      window.localStorage.setItem(STORAGE_KEYS.DEMO_USER, JSON.stringify(nextUser));
      window.localStorage.setItem(STORAGE_KEYS.DEMO_SESSION, JSON.stringify(nextSession));
    } catch {
      // Ignore storage write errors
    }
  }, []);

  const login = useCallback(
    (email, remember = true) => {
      const cleanEmail = email.trim().toLowerCase();
      const existing = readStoredUser();
      const derivedName =
        existing && existing.email.toLowerCase() === cleanEmail
          ? existing.fullName
          : cleanEmail
              .split('@')[0]
              .replace(/[._-]+/g, ' ')
              .replace(/\b\w/g, (c) => c.toUpperCase()) || 'Guest Customer';

      const nextUser =
        existing && existing.email.toLowerCase() === cleanEmail
          ? existing
          : {
              id: `aura-user-${Date.now()}`,
              fullName: derivedName,
              email: cleanEmail,
              phone: existing?.phone ?? '',
              createdAt: new Date().toISOString(),
            };

      const nextSession = {
        userId: nextUser.id,
        email: nextUser.email,
        remember,
        loggedInAt: new Date().toISOString(),
      };

      persistUserAndSession(nextUser, nextSession);
      return nextUser;
    },
    [persistUserAndSession],
  );

  const registerDemoUser = useCallback(
    (data) => {
      const nextUser = {
        id: `aura-user-${Date.now()}`,
        fullName: data.fullName.trim(),
        email: data.email.trim().toLowerCase(),
        phone: '',
        createdAt: new Date().toISOString(),
      };
      const nextSession = {
        userId: nextUser.id,
        email: nextUser.email,
        remember: true,
        loggedInAt: new Date().toISOString(),
      };
      persistUserAndSession(nextUser, nextSession);
      return nextUser;
    },
    [persistUserAndSession],
  );

  const updateProfile = useCallback((data) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        fullName: data.fullName.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone?.trim() ?? '',
      };
      try {
        window.localStorage.setItem(STORAGE_KEYS.DEMO_USER, JSON.stringify(updated));
      } catch {
        // Ignore storage error
      }
      return updated;
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setSession(null);
    try {
      window.localStorage.removeItem(STORAGE_KEYS.DEMO_SESSION);
    } catch {
      // Ignore storage error
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      session,
      isAuthenticated: Boolean(user && session),
      login,
      registerDemoUser,
      updateProfile,
      logout,
    }),
    [user, session, login, registerDemoUser, updateProfile, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
