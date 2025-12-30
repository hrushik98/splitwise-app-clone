import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface Activity {
  id: string;
  type: 'expense' | 'payment' | 'settlement';
  title: string;
  group: string;
  amount: number;
  date: string;
  paidBy: string;
  participants: string[];
  icon: string;
  iconBg: string;
  status: 'you_paid' | 'you_owe' | 'settled' | 'not_involved';
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'expense',
    title: 'Stationary',
    group: 'Birthday House',
    amount: 20.0,
    date: 'Mar 18, 2024',
    paidBy: 'You',
    participants: ['John', 'Wade'],
    icon: '📝',
    iconBg: '#FFE5E5',
    status: 'you_paid',
  },
  {
    id: '2',
    type: 'expense',
    title: 'Dinning',
    group: 'Birthday House',
    amount: 120.0,
    date: 'Mar 20, 2024',
    paidBy: 'Wade',
    participants: ['You', 'John'],
    icon: '🍽️',
    iconBg: '#E5F5E5',
    status: 'you_owe',
  },
  {
    id: '3',
    type: 'expense',
    title: 'Balloons',
    group: 'Birthday House',
    amount: 30.0,
    date: 'Mar 21, 2024',
    paidBy: 'You',
    participants: ['John', 'Wade'],
    icon: '🎈',
    iconBg: '#FFF0E5',
    status: 'you_paid',
  },
  {
    id: '4',
    type: 'expense',
    title: 'Trip',
    group: 'Birthday House',
    amount: 0,
    date: 'Mar 22, 2024',
    paidBy: 'Wade',
    participants: ['John'],
    icon: '✈️',
    iconBg: '#E5F0FF',
    status: 'not_involved',
  },
  {
    id: '5',
    type: 'expense',
    title: "Ansh's Gift",
    group: 'Birthday House',
    amount: 200.0,
    date: 'Mar 26, 2024',
    paidBy: 'You',
    participants: ['John', 'Wade'],
    icon: '🎁',
    iconBg: '#FFE5F5',
    status: 'you_paid',
  },
  {
    id: '6',
    type: 'expense',
    title: 'Shopping',
    group: 'Shopping',
    amount: 505.0,
    date: 'Mar 24, 2024',
    paidBy: 'Jack',
    participants: ['You', 'Kim'],
    icon: '🛍️',
    iconBg: '#F5E5FF',
    status: 'you_owe',
  },
  {
    id: '7',
    type: 'settlement',
    title: 'Guy Warren settled up',
    group: '',
    amount: 0,
    date: 'Mar 15, 2024',
    paidBy: 'Guy Warren',
    participants: ['You'],
    icon: '✓',
    iconBg: '#E5F5F0',
    status: 'settled',
  },
];

export default function ActivityScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const renderActivityItem = (activity: Activity) => {
    const getStatusInfo = () => {
      switch (activity.status) {
        case 'you_paid':
          return { text: 'You paid', color: colors.success };
        case 'you_owe':
          return { text: 'You owe', color: colors.danger };
        case 'settled':
          return { text: 'Settled', color: colors.tabIconDefault };
        case 'not_involved':
          return { text: 'Not involved', color: colors.tabIconDefault };
      }
    };

    const statusInfo = getStatusInfo();

    return (
      <TouchableOpacity
        key={activity.id}
        style={[styles.activityItem, { backgroundColor: colors.cardBackground }]}>
        <View style={[styles.iconContainer, { backgroundColor: activity.iconBg }]}>
          <ThemedText style={styles.iconText}>{activity.icon}</ThemedText>
        </View>
        <View style={styles.activityContent}>
          <View style={styles.activityHeader}>
            <ThemedText style={styles.activityTitle}>{activity.title}</ThemedText>
            {activity.amount > 0 && (
              <ThemedText style={[styles.amountText, { color: statusInfo.color }]}>
                ${activity.amount.toFixed(2)}
              </ThemedText>
            )}
          </View>
          <View style={styles.activityDetails}>
            <ThemedText style={[styles.detailText, { color: colors.tabIconDefault }]}>
              {activity.group && `${activity.group} • `}
              {activity.date}
            </ThemedText>
          </View>
          <View style={styles.activityFooter}>
            <ThemedText style={[styles.statusText, { color: statusInfo.color }]}>
              {statusInfo.text}
            </ThemedText>
            {activity.status !== 'settled' && activity.status !== 'not_involved' && (
              <ThemedText style={[styles.paidByText, { color: colors.tabIconDefault }]}>
                Paid by {activity.paidBy}
              </ThemedText>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const groupedActivities = mockActivities.reduce(
    (acc, activity) => {
      const month = activity.date.split(' ')[0] + ' ' + activity.date.split(' ')[2];
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(activity);
      return acc;
    },
    {} as Record<string, Activity[]>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <ThemedText style={styles.headerTitle}>Activity</ThemedText>
        <ThemedText style={styles.headerSubtitle}>All expenses and settlements</ThemedText>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {Object.entries(groupedActivities).map(([month, activities]) => (
          <View key={month} style={styles.section}>
            <ThemedText style={styles.monthTitle}>{month}</ThemedText>
            <View style={styles.activitiesList}>
              {activities.map((activity) => renderActivityItem(activity))}
            </View>
          </View>
        ))}
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
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  activitiesList: {
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 24,
  },
  activityContent: {
    flex: 1,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  amountText: {
    fontSize: 16,
    fontWeight: '600',
  },
  activityDetails: {
    marginBottom: 6,
  },
  detailText: {
    fontSize: 13,
  },
  activityFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '500',
  },
  paidByText: {
    fontSize: 13,
  },
});
