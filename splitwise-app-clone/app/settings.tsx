import { StyleSheet, ScrollView, View, TouchableOpacity, Switch } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';

interface SettingItem {
  id: string;
  title: string;
  icon: string;
  type: 'navigation' | 'toggle';
  value?: boolean;
  route?: string;
  subtitle?: string;
}

const settingsSections = [
  {
    title: 'Account',
    items: [
      { id: 'profile', title: 'Edit Profile', icon: 'person.circle', type: 'navigation', route: '/edit-profile', subtitle: 'Name, email, phone' },
      { id: 'currency', title: 'Currency', icon: 'dollarsign.circle', type: 'navigation', route: '/currency-settings', subtitle: 'USD' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { id: 'notifications', title: 'Notifications', icon: 'bell', type: 'navigation', route: '/notification-settings', subtitle: 'Manage alerts' },
      { id: 'dark-mode', title: 'Dark Mode', icon: 'moon', type: 'toggle', value: false },
      { id: 'face-id', title: 'Face ID / Touch ID', icon: 'faceid', type: 'toggle', value: true },
    ],
  },
  {
    title: 'Data & Privacy',
    items: [
      { id: 'export', title: 'Export Data', icon: 'arrow.down.doc', type: 'navigation', subtitle: 'Download your data' },
      { id: 'privacy', title: 'Privacy Policy', icon: 'lock.shield', type: 'navigation' },
    ],
  },
  {
    title: 'Support',
    items: [
      { id: 'help', title: 'Help & FAQs', icon: 'questionmark.circle', type: 'navigation', route: '/help' },
      { id: 'contact', title: 'Contact Support', icon: 'envelope', type: 'navigation' },
      { id: 'about', title: 'About', icon: 'info.circle', type: 'navigation', route: '/about', subtitle: 'Version 1.0.0' },
    ],
  },
];

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({
    'dark-mode': false,
    'face-id': true,
  });

  const handleToggle = (id: string) => {
    setToggleStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleNavigation = (route?: string) => {
    if (route) {
      router.push(route as any);
    }
  };

  const renderSettingItem = (item: SettingItem) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.settingItem}
        onPress={() => item.type === 'navigation' && handleNavigation(item.route)}
        disabled={item.type === 'toggle'}>
        <View style={styles.settingLeft}>
          <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
            <IconSymbol name={item.icon as any} size={20} color={colors.primary} />
          </View>
          <View style={styles.settingContent}>
            <ThemedText style={styles.settingTitle}>{item.title}</ThemedText>
            {item.subtitle && (
              <ThemedText style={[styles.settingSubtitle, { color: colors.tabIconDefault }]}>
                {item.subtitle}
              </ThemedText>
            )}
          </View>
        </View>
        {item.type === 'navigation' ? (
          <IconSymbol name="chevron.right" size={20} color={colors.tabIconDefault} />
        ) : (
          <Switch
            value={toggleStates[item.id]}
            onValueChange={() => handleToggle(item.id)}
            trackColor={{ false: colors.tabIconDefault + '40', true: colors.primary }}
            thumbColor="#fff"
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color="#fff" />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Settings</ThemedText>
          <View style={styles.placeholder} />
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={[styles.profileAvatar, { backgroundColor: colors.primary }]}>
            <ThemedText style={styles.profileAvatarText}>JD</ThemedText>
          </View>
          <ThemedText style={styles.profileName}>John Doe</ThemedText>
          <ThemedText style={[styles.profileEmail, { color: colors.tabIconDefault }]}>
            john.doe@example.com
          </ThemedText>
        </View>

        {settingsSections.map((section, sectionIndex) => (
          <View key={section.title} style={styles.section}>
            <ThemedText style={styles.sectionTitle}>{section.title}</ThemedText>
            <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
              {section.items.map((item, index) => (
                <View key={item.id}>
                  {renderSettingItem(item)}
                  {index < section.items.length - 1 && (
                    <View style={styles.divider} />
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.logoutButton}>
          <ThemedText style={[styles.logoutText, { color: colors.danger }]}>
            Log Out
          </ThemedText>
        </TouchableOpacity>

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
  profileCard: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  profileAvatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
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
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    marginLeft: 68,
  },
  logoutButton: {
    marginHorizontal: 16,
    marginTop: 8,
    padding: 16,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 40,
  },
});
