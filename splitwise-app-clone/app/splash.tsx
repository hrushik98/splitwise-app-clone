import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

export default function SplashScreen() {
  const router = useRouter();
  const { user, loading, hasCompletedOnboarding } = useAuth();

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        if (!hasCompletedOnboarding) {
          router.replace('/onboarding');
        } else if (user) {
          router.replace('/(tabs)/home');
        } else {
          router.replace('/login');
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [loading, user, hasCompletedOnboarding]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>💰</Text>
        </View>
        <Text style={styles.appName}>Splitty</Text>
        <Text style={styles.tagline}>Split expenses with friends</Text>
      </View>
      <ActivityIndicator size="large" color="#FF6B6B" style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 50,
  },
  appName: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  loader: {
    position: 'absolute',
    bottom: 100,
  },
});
