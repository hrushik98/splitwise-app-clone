import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  paidBy: 'you' | 'friend';
  category: string;
  categoryIcon: string;
}

const mockExpenses: Expense[] = [
  {
    id: '1',
    description: 'Dinner at Restaurant',
    amount: 450.0,
    date: 'Mar 26, 2024',
    paidBy: 'friend',
    category: 'Food',
    categoryIcon: '🍽️',
  },
  {
    id: '2',
    description: 'Movie Tickets',
    amount: 200.0,
    date: 'Mar 22, 2024',
    paidBy: 'you',
    category: 'Entertainment',
    categoryIcon: '🎬',
  },
  {
    id: '3',
    description: 'Groceries',
    amount: 852.75,
    date: 'Mar 18, 2024',
    paidBy: 'friend',
    category: 'Shopping',
    categoryIcon: '🛒',
  },
  {
    id: '4',
    description: 'Taxi Ride',
    amount: 150.0,
    date: 'Mar 15, 2024',
    paidBy: 'you',
    category: 'Transport',
    categoryIcon: '🚕',
  },
  {
    id: '5',
    description: 'Coffee',
    amount: 88.0,
    date: 'Mar 12, 2024',
    paidBy: 'you',
    category: 'Food',
    categoryIcon: '☕',
  },
];

export default function FriendProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const params = useLocalSearchParams();

  const friendName = (params.friendName as string) || 'Wade Howard';
  const balance = parseFloat((params.balance as string) || '1052.75');

  const totalExpenses = mockExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const yourShare = mockExpenses
    .filter((exp) => exp.paidBy === 'friend')
    .reduce((sum, exp) => sum + exp.amount / 2, 0);
  const friendShare = mockExpenses
    .filter((exp) => exp.paidBy === 'you')
    .reduce((sum, exp) => sum + exp.amount / 2, 0);

  const renderExpenseItem = (expense: Expense) => {
    const isYouPaid = expense.paidBy === 'you';
    const yourAmount = isYouPaid ? expense.amount / 2 : -(expense.amount / 2);

    return (
      <TouchableOpacity
        key={expense.id}
        style={[styles.expenseItem, { backgroundColor: colors.cardBackground }]}>
        <View style={styles.expenseLeft}>
          <View style={[styles.categoryIcon, { backgroundColor: colors.background }]}>
            <ThemedText style={styles.categoryIconText}>{expense.categoryIcon}</ThemedText>
          </View>
          <View style={styles.expenseInfo}>
            <ThemedText style={styles.expenseDescription}>{expense.description}</ThemedText>
            <ThemedText style={[styles.expenseDate, { color: colors.tabIconDefault }]}>
              {expense.date}
            </ThemedText>
            <ThemedText style={[styles.expensePaidBy, { color: colors.tabIconDefault }]}>
              {isYouPaid ? 'You paid' : `${friendName} paid`}
            </ThemedText>
          </View>
        </View>
        <View style={styles.expenseRight}>
          <ThemedText
            style={[
              styles.expenseAmount,
              { color: yourAmount > 0 ? colors.success : colors.danger },
            ]}>
            {yourAmount > 0 ? '+' : ''}${Math.abs(yourAmount).toFixed(2)}
          </ThemedText>
        </View>
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
          <ThemedText style={styles.headerTitle}>Friend Profile</ThemedText>
          <TouchableOpacity style={styles.moreButton}>
            <IconSymbol name="ellipsis" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.avatarLarge}>
            <ThemedText style={styles.avatarLargeText}>👤</ThemedText>
          </View>
          <ThemedText style={styles.friendNameLarge}>{friendName}</ThemedText>
          <ThemedText style={styles.friendEmail}>wade.howard@example.com</ThemedText>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={[styles.balanceCard, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.balanceRow}>
            <View style={styles.balanceItem}>
              <ThemedText style={[styles.balanceLabel, { color: colors.tabIconDefault }]}>
                Overall Balance
              </ThemedText>
              <ThemedText
                style={[
                  styles.balanceAmount,
                  { color: balance > 0 ? colors.success : balance < 0 ? colors.danger : colors.text },
                ]}>
                ${Math.abs(balance).toFixed(2)}
              </ThemedText>
              <ThemedText
                style={[
                  styles.balanceStatus,
                  { color: balance > 0 ? colors.success : balance < 0 ? colors.danger : colors.text },
                ]}>
                {balance > 0 ? 'Owes you' : balance < 0 ? 'You owe' : 'Settled up'}
              </ThemedText>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <ThemedText style={[styles.statLabel, { color: colors.tabIconDefault }]}>
                Total Expenses
              </ThemedText>
              <ThemedText style={styles.statValue}>${totalExpenses.toFixed(2)}</ThemedText>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <ThemedText style={[styles.statLabel, { color: colors.tabIconDefault }]}>
                Your Share
              </ThemedText>
              <ThemedText style={styles.statValue}>${yourShare.toFixed(2)}</ThemedText>
            </View>
          </View>

          {balance !== 0 && (
            <TouchableOpacity
              style={[styles.settleButton, { backgroundColor: colors.primary }]}
              onPress={() => router.push('/settle-up')}>
              <ThemedText style={styles.settleButtonText}>Settle Up</ThemedText>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Expense History</ThemedText>
            <ThemedText style={[styles.sectionCount, { color: colors.tabIconDefault }]}>
              {mockExpenses.length} expenses
            </ThemedText>
          </View>
          <View style={styles.expensesList}>{mockExpenses.map(renderExpenseItem)}</View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Actions</ThemedText>
          <View style={styles.actionsList}>
            <TouchableOpacity
              style={[styles.actionItem, { backgroundColor: colors.cardBackground }]}>
              <View style={styles.actionLeft}>
                <View style={[styles.actionIcon, { backgroundColor: colors.primary }]}>
                  <IconSymbol name="chart.bar.fill" size={20} color="#fff" />
                </View>
                <ThemedText style={styles.actionText}>View Statistics</ThemedText>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.tabIconDefault} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionItem, { backgroundColor: colors.cardBackground }]}>
              <View style={styles.actionLeft}>
                <View style={[styles.actionIcon, { backgroundColor: colors.success }]}>
                  <IconSymbol name="doc.text.fill" size={20} color="#fff" />
                </View>
                <ThemedText style={styles.actionText}>Export History</ThemedText>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.tabIconDefault} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionItem, { backgroundColor: colors.cardBackground }]}>
              <View style={styles.actionLeft}>
                <View style={[styles.actionIcon, { backgroundColor: colors.danger }]}>
                  <IconSymbol name="person.fill.xmark" size={20} color="#fff" />
                </View>
                <ThemedText style={[styles.actionText, { color: colors.danger }]}>
                  Remove Friend
                </ThemedText>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.tabIconDefault} />
            </TouchableOpacity>
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
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
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
  moreButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileSection: {
    alignItems: 'center',
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarLargeText: {
    fontSize: 40,
  },
  friendNameLarge: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  friendEmail: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  scrollView: {
    flex: 1,
  },
  balanceCard: {
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  balanceRow: {
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceItem: {
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  balanceStatus: {
    fontSize: 16,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  statLabel: {
    fontSize: 13,
    marginBottom: 6,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  settleButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  settleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  sectionCount: {
    fontSize: 14,
  },
  expensesList: {
    gap: 12,
  },
  expenseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  expenseLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIconText: {
    fontSize: 24,
  },
  expenseInfo: {
    flex: 1,
  },
  expenseDescription: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  expenseDate: {
    fontSize: 13,
    marginBottom: 2,
  },
  expensePaidBy: {
    fontSize: 13,
  },
  expenseRight: {
    alignItems: 'flex-end',
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: '700',
  },
  actionsList: {
    gap: 12,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
