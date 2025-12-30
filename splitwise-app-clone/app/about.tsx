import { StyleSheet, ScrollView, View, TouchableOpacity, Linking } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';

export default function AboutScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color="#fff" />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>About</ThemedText>
          <View style={styles.placeholder} />
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.logoSection}>
          <View style={[styles.logoContainer, { backgroundColor: colors.primary }]}>
            <ThemedText style={styles.logoText}>💰</ThemedText>
          </View>
          <ThemedText style={styles.appName}>Splitty</ThemedText>
          <ThemedText style={[styles.version, { color: colors.tabIconDefault }]}>
            Version 1.0.0
          </ThemedText>
        </View>

        <View style={[styles.descriptionCard, { backgroundColor: colors.cardBackground }]}>
          <ThemedText style={styles.description}>
            Splitty helps you split bills and expenses with friends, family, and roommates. 
            Keep track of shared expenses, settle up with ease, and never worry about who owes what.
          </ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Information</ThemedText>
          <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
            <View style={styles.infoItem}>
              <ThemedText style={styles.infoLabel}>Developer</ThemedText>
              <ThemedText style={styles.infoValue}>Splitty Inc.</ThemedText>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoItem}>
              <ThemedText style={styles.infoLabel}>Release Date</ThemedText>
              <ThemedText style={styles.infoValue}>December 2024</ThemedText>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoItem}>
              <ThemedText style={styles.infoLabel}>Size</ThemedText>
              <ThemedText style={styles.infoValue}>45.2 MB</ThemedText>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoItem}>
              <ThemedText style={styles.infoLabel}>Category</ThemedText>
              <ThemedText style={styles.infoValue}>Finance</ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Legal</ThemedText>
          <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
            <TouchableOpacity style={styles.linkItem}>
              <ThemedText style={styles.linkText}>Terms of Service</ThemedText>
              <IconSymbol name="chevron.right" size={20} color={colors.tabIconDefault} />
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.linkItem}>
              <ThemedText style={styles.linkText}>Privacy Policy</ThemedText>
              <IconSymbol name="chevron.right" size={20} color={colors.tabIconDefault} />
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.linkItem}>
              <ThemedText style={styles.linkText}>Open Source Licenses</ThemedText>
              <IconSymbol name="chevron.right" size={20} color={colors.tabIconDefault} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Connect With Us</ThemedText>
          <View style={styles.socialContainer}>
            <TouchableOpacity style={[styles.socialButton, { backgroundColor: colors.cardBackground }]}>
              <ThemedText style={styles.socialIcon}>🌐</ThemedText>
              <ThemedText style={styles.socialLabel}>Website</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialButton, { backgroundColor: colors.cardBackground }]}>
              <ThemedText style={styles.socialIcon}>📧</ThemedText>
              <ThemedText style={styles.socialLabel}>Email</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialButton, { backgroundColor: colors.cardBackground }]}>
              <ThemedText style={styles.socialIcon}>🐦</ThemedText>
              <ThemedText style={styles.socialLabel}>Twitter</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialButton, { backgroundColor: colors.cardBackground }]}>
              <ThemedText style={styles.socialIcon}>📷</ThemedText>
              <ThemedText style={styles.socialLabel}>Instagram</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <ThemedText style={[styles.footerText, { color: colors.tabIconDefault }]}>
            Made with ❤️ for splitting bills
          </ThemedText>
          <ThemedText style={[styles.copyright, { color: colors.tabIconDefault }]}>
            © 2024 Splitty Inc. All rights reserved.
          </ThemedText>
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
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  logoSection: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 48,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  version: {
    fontSize: 16,
  },
  descriptionCard: {
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    opacity: 0.6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  infoLabel: {
    fontSize: 16,
    opacity: 0.7,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  linkItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  linkText: {
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    marginLeft: 16,
  },
  socialContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  socialIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  socialLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 14,
    marginBottom: 8,
  },
  copyright: {
    fontSize: 12,
  },
  bottomPadding: {
    height: 40,
  },
});
