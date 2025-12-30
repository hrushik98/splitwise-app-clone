import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HARDCODED_EMAIL = 'admin@admin.com';
const HARDCODED_PASSWORD = 'password';

interface MockUser {
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName: string | null;
}

interface AuthContextType {
  user: MockUser | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  verifyEmail: () => Promise<void>;
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: (value: boolean) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasCompletedOnboarding, setOnboardingState] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const completed = await AsyncStorage.getItem('onboarding_completed');
      setOnboardingState(completed === 'true');
      
      const storedUser = await AsyncStorage.getItem('mock_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const signUp = async (email: string, password: string) => {
    if (email === HARDCODED_EMAIL && password === HARDCODED_PASSWORD) {
      const mockUser: MockUser = {
        uid: 'mock-admin-uid',
        email: HARDCODED_EMAIL,
        emailVerified: true,
        displayName: 'Admin User',
      };
      await AsyncStorage.setItem('mock_user', JSON.stringify(mockUser));
      setUser(mockUser);
    } else {
      throw new Error('Invalid credentials. Use admin@admin.com / password');
    }
  };

  const signIn = async (email: string, password: string) => {
    if (email === HARDCODED_EMAIL && password === HARDCODED_PASSWORD) {
      const mockUser: MockUser = {
        uid: 'mock-admin-uid',
        email: HARDCODED_EMAIL,
        emailVerified: true,
        displayName: 'Admin User',
      };
      await AsyncStorage.setItem('mock_user', JSON.stringify(mockUser));
      setUser(mockUser);
    } else {
      throw new Error('Invalid credentials. Use admin@admin.com / password');
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('mock_user');
    setUser(null);
  };

  const resetPassword = async (email: string) => {
    if (email === HARDCODED_EMAIL) {
      return Promise.resolve();
    }
    throw new Error('Email not found');
  };

  const verifyEmail = async () => {
    return Promise.resolve();
  };

  const setHasCompletedOnboarding = async (value: boolean) => {
    await AsyncStorage.setItem('onboarding_completed', value.toString());
    setOnboardingState(value);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp,
        signIn,
        logout,
        resetPassword,
        verifyEmail,
        hasCompletedOnboarding,
        setHasCompletedOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
