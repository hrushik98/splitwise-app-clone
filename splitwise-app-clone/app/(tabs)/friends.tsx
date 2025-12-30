import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface Friend {
  id: string;
  name: string;
  avatar: string;
  balance: number;
  status: 'owes_you' | 'you_owe' | 'settled';
}

const mockFriends: Friend[] = [
  { id: '1', name: 'Wade Howard', avatar: '👤', balance: 1052.75, status: 'owes_you' },
  { id: '2', name: 'Guy Warren', avatar: '👤', balance: 0, status: 'settled' },
  { id: '3', name: 'John Smith', avatar: '👤', balance: -1052.75, status: 'you_owe' },
  { id: '4', name: 'Sarah Johnson', avatar: '👤', balance: 250.50, status: 'owes_you' },
  { id: '5', name: 'Mike Davis', avatar: '👤', balance: -88.00, status: 'you_owe' },
  { id: '6', name: 'Emily Brown', avatar: '👤', balance: 450.25, status: 'owes_you' },
  { id: '7', name: 'Alex Wilson', avatar: '👤', balance: 0, status: 'settled' },
  { id: '8', name: 'Lisa Anderson', avatar: '👤', balance: -125.75, status: 'you_owe' },
];

export default function FriendsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const renderFriendItem = (friend: Friend) => {
    const isPositive = friend.balance > 0;
    const isSettled = friend.balance === 0;

    return (
      <TouchableOpacity key={friend.id} style={styles.friendItem}>
        <View style={styles.friendLeft}>
          <View style={[styles.avatar, { backgroundColor: colors.cardBackground }]}>
            <ThemedText style={styles.avatarText}>{friend.avatar}</ThemedText>
          </View>
          <View style={styles.friendInfo}>
            <ThemedText style={styles.friendName}>{friend.name}</ThemedText>
            {isSettled ? (
              <ThemedText style={[styles.statusText, { color: colors.tabIconDefault }]}>
                Settled up
              </ThemedText>
            ) : (
              <ThemedText
                style={[
                  styles.statusText,
                  { color: isPositive ? colors.success : colors.danger },
                ]}>
                {isPositive ? 'Owes you' : 'You owe'}
              </ThemedText>
            )}
          </View>
        </View>
        <View style={styles.friendRight}>
          {!isSettled && (
            <ThemedText
              style={[
                styles.balanceText,
                { color: isPositive ? colors.success : colors.danger },
              ]}>
              ${Math.abs(friend.balance).toFixed(2)}
            </ThemedText>
          )}
          <IconSymbol name="chevron.right" size={20} color={colors.tabIconDefault} />
        </View>
      </TouchableOpacity>
    );
  };

  const totalOwed = mockFriends
    .filter((f) => f.balance > 0)
    .reduce((sum, f) => sum + f.balance, 0);
  const totalYouOwe = mockFriends
    .filter((f) => f.balance < 0)
    .reduce((sum, f) => sum + Math.abs(f.balance), 0);

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <ThemedText style={styles.headerTitle}>Friends</ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          {mockFriends.length} {mockFriends.length === 1 ? 'friend' : 'friends'}
        </ThemedText>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={[styles.summaryCard, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <ThemedText style={styles.summaryLabel}>You are owed</ThemedText>
              <ThemedText style={[styles.summaryAmount, { color: colors.success }]}>
                ${totalOwed.toFixed(2)}
              </ThemedText>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <ThemedText style={styles.summaryLabel}>You owe</ThemedText>
              <ThemedText style={[styles.summaryAmount, { color: colors.danger }]}>
                ${totalYouOwe.toFixed(2)}
              </ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>All Friends</ThemedText>
          <View style={[styles.friendsList, { backgroundColor: colors.cardBackground }]}>
            {mockFriends.map((friend) => renderFriendItem(friend))}
          </View>
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
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  scrollView: {
    flex: 1,
  },
  summaryCard: {
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  summaryLabel: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
  },
  summaryAmount: {
    fontSize: 24,
    fontWeight: 'bold',
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
  friendsList: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  friendLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 24,
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  statusText: {
    fontSize: 14,
  },
  friendRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  balanceText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
