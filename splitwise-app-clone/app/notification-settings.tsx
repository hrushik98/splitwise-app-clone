import { StyleSheet, ScrollView, View, TouchableOpacity, Switch } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export default function NotificationSettingsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    { id: 'new-expense', title: 'New Expenses', description: 'When someone adds an expense', enabled: true },
    { id: 'payment', title: 'Payments', description: 'When someone records a payment', enabled: true },
    { id: 'reminders', title: 'Payment Reminders', description: 'Reminders for outstanding balances', enabled: true },
    { id: 'group-updates', title: 'Group Updates', description: 'When groups are created or modified', enabled: false },
    { id: 'comments', title: 'Comments', description: 'When someone comments on an expense', enabled: true },
    { id: 'friend-requests', title: 'Friend Requests', description: 'When someone sends you a friend request', enabled: true },
    { id: 'weekly-summary', title: 'Weekly Summary', description: 'Weekly summary of your expenses', enabled: false },
    { id: 'monthly-report', title: 'Monthly Report', description: 'Monthly spending report', enabled: false },
  ]);

  const handleToggle = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, enabled: !notif.enabled } : notif
      )
    );
  };

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color="#fff" />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Notifications</ThemedText>
          <View style={styles.placeholder} />
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={[styles.infoCard, { backgroundColor: colors.cardBackground }]}>
          <IconSymbol name="bell.badge" size={24} color={colors.primary} />
          <View style={styles.infoContent}>
            <ThemedText style={styles.infoTitle}>Stay Updated</ThemedText>
            <ThemedText style={[styles.infoText, { color: colors.tabIconDefault }]}>
              Choose which notifications you want to receive
            </ThemedText>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Expense Notifications</ThemedText>
          <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
            {notifications.slice(0, 3).map((notif, index) => (
              <View key={notif.id}>
                <View style={styles.notificationItem}>
                  <View style={styles.notificationContent}>
                    <ThemedText style={styles.notificationTitle}>{notif.title}</ThemedText>
                    <ThemedText style={[styles.notificationDescription, { color: colors.tabIconDefault }]}>
                      {notif.description}
                    </ThemedText>
                  </View>
                  <Switch
                    value={notif.enabled}
                    onValueChange={() => handleToggle(notif.id)}
                    trackColor={{ false: colors.tabIconDefault + '40', true: colors.primary }}
                    thumbColor="#fff"
                  />
                </View>
                {index < 2 && <View style={styles.divider} />}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Social Notifications</ThemedText>
          <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
            {notifications.slice(3, 6).map((notif, index) => (
              <View key={notif.id}>
                <View style={styles.notificationItem}>
                  <View style={styles.notificationContent}>
                    <ThemedText style={styles.notificationTitle}>{notif.title}</ThemedText>
                    <ThemedText style={[styles.notificationDescription, { color: colors.tabIconDefault }]}>
                      {notif.description}
                    </ThemedText>
                  </View>
                  <Switch
                    value={notif.enabled}
                    onValueChange={() => handleToggle(notif.id)}
                    trackColor={{ false: colors.tabIconDefault + '40', true: colors.primary }}
                    thumbColor="#fff"
                  />
                </View>
                {index < 2 && <View style={styles.divider} />}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Reports & Summaries</ThemedText>
          <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
            {notifications.slice(6).map((notif, index) => (
              <View key={notif.id}>
                <View style={styles.notificationItem}>
                  <View style={styles.notificationContent}>
                    <ThemedText style={styles.notificationTitle}>{notif.title}</ThemedText>
                    <ThemedText style={[styles.notificationDescription, { color: colors.tabIconDefault }]}>
                      {notif.description}
                    </ThemedText>
                  </View>
                  <Switch
                    value={notif.enabled}
                    onValueChange={() => handleToggle(notif.id)}
                    trackColor={{ false: colors.tabIconDefault + '40', true: colors.primary }}
                    thumbColor="#fff"
                  />
                </View>
                {index < 1 && <View style={styles.divider} />}
              </View>
            ))}
          </View>
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
  infoCard: {
    flexDirection: 'row',
    margin: 16,
    padding: 16,
    borderRadius: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
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
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  notificationContent: {
    flex: 1,
    marginRight: 16,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    marginLeft: 16,
  },
  bottomPadding: {
    height: 40,
  },
});
