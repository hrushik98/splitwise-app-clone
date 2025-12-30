import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function EmailVerificationScreen() {
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const router = useRouter();
  const { user, verifyEmail, logout } = useAuth();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setResendDisabled(false);
    }
  }, [countdown]);

  const handleResendEmail = async () => {
    setLoading(true);
    try {
      await verifyEmail();
      Alert.alert('Success', 'Verification email sent! Please check your inbox.');
      setResendDisabled(true);
      setCountdown(60);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckVerification = async () => {
    if (user && user.emailVerified) {
      Alert.alert('Success', 'Email verified successfully!', [
        { text: 'OK', onPress: () => router.replace('/(tabs)' as any) },
      ]);
    } else {
      Alert.alert('Not Verified', 'Please verify your email before continuing.');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/login' as any);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="mail-unread-outline" size={60} color="#FF6B6B" />
        </View>

        <Text style={styles.title}>Verify Your Email</Text>
        <Text style={styles.message}>
          We've sent a verification link to{'\n'}
          <Text style={styles.emailText}>{user?.email}</Text>
        </Text>

        <Text style={styles.infoText}>
          Please check your inbox and click the verification link to activate your account.
        </Text>

        <View style={styles.steps}>
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepText}>Check your email inbox</Text>
          </View>
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepText}>Click the verification link</Text>
          </View>
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepText}>Return here and continue</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleCheckVerification}>
          <Text style={styles.buttonText}>I've Verified My Email</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.resendButton, resendDisabled && styles.resendButtonDisabled]}
          onPress={handleResendEmail}
          disabled={resendDisabled || loading}
        >
          {loading ? (
            <ActivityIndicator color="#FF6B6B" />
          ) : (
            <Text style={[styles.resendText, resendDisabled && styles.resendTextDisabled]}>
              {resendDisabled ? `Resend in ${countdown}s` : 'Resend Verification Email'}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Use Different Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFF5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 24,
  },
  emailText: {
    color: '#FF6B6B',
    fontWeight: '600',
  },
  infoText: {
    fontSize: 14,
    color: '#95A5A6',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  steps: {
    width: '100%',
    marginBottom: 40,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  stepText: {
    fontSize: 16,
    color: '#2C3E50',
    flex: 1,
  },
  button: {
    width: '100%',
    backgroundColor: '#FF6B6B',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  resendButton: {
    paddingVertical: 12,
  },
  resendButtonDisabled: {
    opacity: 0.5,
  },
  resendText: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  resendTextDisabled: {
    color: '#95A5A6',
  },
  logoutButton: {
    marginTop: 20,
  },
  logoutText: {
    fontSize: 14,
    color: '#7F8C8D',
    fontWeight: '600',
  },
});
