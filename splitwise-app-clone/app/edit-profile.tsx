import { StyleSheet, ScrollView, View, TouchableOpacity, TextInput, Image } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';

export default function EditProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
  });

  const handleSave = () => {
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color="#fff" />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Edit Profile</ThemedText>
          <TouchableOpacity onPress={handleSave}>
            <ThemedText style={styles.saveText}>Save</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.avatarSection}>
          <View style={[styles.avatarContainer, { backgroundColor: colors.primary }]}>
            <ThemedText style={styles.avatarText}>JD</ThemedText>
          </View>
          <TouchableOpacity style={[styles.changePhotoButton, { backgroundColor: colors.cardBackground }]}>
            <IconSymbol name="camera" size={20} color={colors.primary} />
            <ThemedText style={[styles.changePhotoText, { color: colors.primary }]}>
              Change Photo
            </ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Full Name</ThemedText>
            <View style={[styles.inputContainer, { backgroundColor: colors.cardBackground }]}>
              <IconSymbol name="person" size={20} color={colors.tabIconDefault} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                value={profile.name}
                onChangeText={(text) => setProfile({ ...profile, name: text })}
                placeholder="Enter your name"
                placeholderTextColor={colors.tabIconDefault}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Email Address</ThemedText>
            <View style={[styles.inputContainer, { backgroundColor: colors.cardBackground }]}>
              <IconSymbol name="envelope" size={20} color={colors.tabIconDefault} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                value={profile.email}
                onChangeText={(text) => setProfile({ ...profile, email: text })}
                placeholder="Enter your email"
                placeholderTextColor={colors.tabIconDefault}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Phone Number</ThemedText>
            <View style={[styles.inputContainer, { backgroundColor: colors.cardBackground }]}>
              <IconSymbol name="phone" size={20} color={colors.tabIconDefault} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                value={profile.phone}
                onChangeText={(text) => setProfile({ ...profile, phone: text })}
                placeholder="Enter your phone"
                placeholderTextColor={colors.tabIconDefault}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={[styles.infoCard, { backgroundColor: colors.cardBackground }]}>
            <IconSymbol name="info.circle" size={20} color={colors.primary} />
            <ThemedText style={[styles.infoText, { color: colors.tabIconDefault }]}>
              Your email and phone number are used for account recovery and notifications.
            </ThemedText>
          </View>
        </View>

        <View style={styles.dangerZone}>
          <ThemedText style={styles.dangerTitle}>Danger Zone</ThemedText>
          <TouchableOpacity style={[styles.dangerButton, { borderColor: colors.danger }]}>
            <ThemedText style={[styles.dangerButtonText, { color: colors.danger }]}>
              Delete Account
            </ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  saveText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  changePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 8,
  },
  changePhotoText: {
    fontSize: 14,
    fontWeight: '600',
  },
  form: {
    paddingHorizontal: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  infoCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    marginTop: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  dangerZone: {
    paddingHorizontal: 16,
    marginTop: 32,
  },
  dangerTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    opacity: 0.6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dangerButton: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
  },
  dangerButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 40,
  },
});
