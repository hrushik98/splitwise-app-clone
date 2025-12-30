import { StyleSheet, ScrollView, View, TouchableOpacity, Switch } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  type: 'navigation' | 'toggle';
  value?: boolean;
  onPress?: () => void;
}

export default function AccountScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);

  const accountMenuItems: MenuItem[] = [
    {
      id: '1',
      title: 'Edit Profile',
      icon: 'person.circle',
      type: 'navigation',
    },
    {
      id: '2',
      title: 'Payment Methods',
      icon: 'creditcard',
      type: 'navigation',
    },
    {
      id: '3',
      title: 'Currency',
      icon: 'dollarsign.circle',
      type: 'navigation',
    },
  ];

  const settingsMenuItems: MenuItem[] = [
    {
      id: '1',
      title: 'Push Notifications',
      icon: 'bell',
      type: 'toggle',
      value: notifications,
      onPress: () => setNotifications(!notifications),
    },
    {
      id: '2',
      title: 'Email Updates',
      icon: 'envelope',
      type: 'toggle',
      value: emailUpdates,
      onPress: () => setEmailUpdates(!emailUpdates),
    },
    {
      id: '3',
      title: 'Privacy',
      icon: 'lock',
      type: 'navigation',
    },
    {
      id: '4',
      title: 'Language',
      icon: 'globe',
      type: 'navigation',
    },
  ];

  const supportMenuItems: MenuItem[] = [
    {
      id: '1',
      title: 'Help & Support',
      icon: 'questionmark.circle',
      type: 'navigation',
    },
    {
      id: '2',
      title: 'About',
      icon: 'info.circle',
      type: 'navigation',
    },
    {
      id: '3',
      title: 'Terms of Service',
      icon: 'doc.text',
      type: 'navigation',
    },
  ];

  const renderMenuItem = (item: MenuItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={item.onPress}
      activeOpacity={0.7}>
      <View style={styles.menuLeft}>
        <View style={[styles.iconWrapper, { backgroundColor: colors.cardBackground }]}>
          <IconSymbol name={item.icon} size={20} color={colors.primary} />
        </View>
        <ThemedText style={styles.menuTitle}>{item.title}</ThemedText>
      </View>
      {item.type === 'toggle' ? (
        <Switch
          value={item.value}
          onValueChange={item.onPress}
          trackColor={{ false: colors.tabIconDefault, true: colors.primary }}
          thumbColor="#fff"
        />
      ) : (
        <IconSymbol name="chevron.right" size={20} color={colors.tabIconDefault} />
      )}
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <ThemedText style={styles.headerTitle}>Account</ThemedText>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={[styles.profileCard, { backgroundColor: colors.cardBackground }]}>
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <ThemedText style={styles.avatarText}>JD</ThemedText>
          </View>
          <ThemedText style={styles.userName}>John Doe</ThemedText>
          <ThemedText style={[styles.userEmail, { color: colors.tabIconDefault }]}>
            john.doe@example.com
          </ThemedText>
          <TouchableOpacity
            style={[styles.editButton, { borderColor: colors.primary }]}
            activeOpacity={0.7}>
            <ThemedText style={[styles.editButtonText, { color: colors.primary }]}>
              Edit Profile
            </ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Account</ThemedText>
          <View style={[styles.menuList, { backgroundColor: colors.cardBackground }]}>
            {accountMenuItems.map((item) => renderMenuItem(item))}
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Settings</ThemedText>
          <View style={[styles.menuList, { backgroundColor: colors.cardBackground }]}>
            {settingsMenuItems.map((item) => renderMenuItem(item))}
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Support</ThemedText>
          <View style={[styles.menuList, { backgroundColor: colors.cardBackground }]}>
            {supportMenuItems.map((item) => renderMenuItem(item))}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: colors.danger }]}
          activeOpacity={0.7}>
          <IconSymbol name="rectangle.portrait.and.arrow.right" size={20} color="#fff" />
          <ThemedText style={styles.logoutText}>Logout</ThemedText>
        </TouchableOpacity>

        <View style={styles.footer}>
          <ThemedText style={[styles.footerText, { color: colors.tabIconDefault }]}>
            Version 1.0.0
          </ThemedText>
        </View>
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
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  profileCard: {
    margin: 16,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    marginBottom: 16,
  },
  editButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  menuList: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuTitle: {
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: 8,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 12,
  },
});
