import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';

interface Transaction {
  id: string;
  type: 'payment' | 'settlement';
  title: string;
  description: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  icon: string;
  iconBg: string;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'settlement',
    title: 'Settled with Wade Howard',
    description: 'Birthday House expenses',
    amount: 1052.75,
    date: '2024-03-25',
    status: 'completed',
    icon: '✅',
    iconBg: '#E5F8E5',
  },
  {
    id: '2',
    type: 'payment',
    title: 'Payment to John Smith',
    description: 'Shopping expenses',
    amount: 505.00,
    date: '2024-03-24',
    status: 'completed',
    icon: '💰',
    iconBg: '#E5F4FF',
  },
  {
    id: '3',
    type: 'settlement',
    title: 'Settled Party Time group',
    description: 'All expenses cleared',
    amount: 2501.32,
    date: '2024-03-22',
    status: 'completed',
    icon: '✅',
    iconBg: '#E5F8E5',
  },
  {
    id: '4',
    type: 'payment',
    title: 'Payment from Sarah Johnson',
    description: 'Dinner expenses',
    amount: 250.50,
    date: '2024-03-20',
    status: 'completed',
    icon: '💰',
    iconBg: '#FFF4E5',
  },
  {
    id: '5',
    type: 'payment',
    title: 'Payment to Mike Davis',
    description: 'Movie tickets',
    amount: 88.00,
    date: '2024-03-18',
    status: 'pending',
    icon: '⏳',
    iconBg: '#FFF4E5',
  },
  {
    id: '6',
    type: 'settlement',
    title: 'Settled with Emily Brown',
    description: 'Trip expenses',
    amount: 450.25,
    date: '2024-03-15',
    status: 'completed',
    icon: '✅',
    iconBg: '#E5F8E5',
  },
  {
    id: '7',
    type: 'payment',
    title: 'Payment failed',
    description: 'Payment to Alex Wilson',
    amount: 125.75,
    date: '2024-03-14',
    status: 'failed',
    icon: '❌',
    iconBg: '#FFE5E5',
  },
];

export default function TransactionHistoryScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [filter, setFilter] = useState<'all' | 'payment' | 'settlement'>('all');

  const filteredTransactions = mockTransactions.filter(
    transaction => filter === 'all' || transaction.type === filter
  );

  const groupedTransactions = filteredTransactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date);
    const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(transaction);
    return acc;
  }, {} as Record<string, Transaction[]>);

  const renderTransaction = (transaction: Transaction) => {
    const statusColor = 
      transaction.status === 'completed' ? colors.success :
      transaction.status === 'pending' ? colors.warning :
      colors.danger;

    return (
      <TouchableOpacity
        key={transaction.id}
        style={[styles.transactionItem, { backgroundColor: colors.cardBackground }]}>
        <View style={[styles.transactionIcon, { backgroundColor: transaction.iconBg }]}>
          <ThemedText style={styles.transactionIconText}>{transaction.icon}</ThemedText>
        </View>
        <View style={styles.transactionContent}>
          <ThemedText style={styles.transactionTitle}>{transaction.title}</ThemedText>
          <ThemedText style={[styles.transactionDescription, { color: colors.tabIconDefault }]}>
            {transaction.description}
          </ThemedText>
          <View style={styles.transactionMeta}>
            <ThemedText style={[styles.transactionDate, { color: colors.tabIconDefault }]}>
              {new Date(transaction.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </ThemedText>
            <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
              <ThemedText style={[styles.statusText, { color: statusColor }]}>
                {transaction.status}
              </ThemedText>
            </View>
          </View>
        </View>
        <ThemedText style={[styles.transactionAmount, { color: colors.primary }]}>
          ${transaction.amount.toFixed(2)}
        </ThemedText>
      </TouchableOpacity>
    );
  };

  const totalAmount = filteredTransactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color="#fff" />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Transaction History</ThemedText>
          <View style={styles.placeholder} />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {['all', 'payment', 'settlement'].map((filterType) => (
            <TouchableOpacity
              key={filterType}
              style={[
                styles.filterChip,
                filter === filterType && { backgroundColor: 'rgba(255, 255, 255, 0.3)' }
              ]}
              onPress={() => setFilter(filterType as any)}>
              <ThemedText style={styles.filterText}>
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={[styles.summaryCard, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.summaryContent}>
            <ThemedText style={[styles.summaryLabel, { color: colors.tabIconDefault }]}>
              Total Transactions
            </ThemedText>
            <ThemedText style={styles.summaryAmount}>
              ${totalAmount.toFixed(2)}
            </ThemedText>
            <ThemedText style={[styles.summaryCount, { color: colors.tabIconDefault }]}>
              {filteredTransactions.filter(t => t.status === 'completed').length} completed
            </ThemedText>
          </View>
        </View>

        {Object.entries(groupedTransactions).map(([monthYear, transactions]) => (
          <View key={monthYear} style={styles.section}>
            <ThemedText style={styles.sectionTitle}>{monthYear}</ThemedText>
            {transactions.map(renderTransaction)}
          </View>
        ))}

        {filteredTransactions.length === 0 && (
          <View style={styles.emptyState}>
            <ThemedText style={styles.emptyIcon}>📊</ThemedText>
            <ThemedText style={styles.emptyTitle}>No transactions yet</ThemedText>
            <ThemedText style={[styles.emptySubtitle, { color: colors.tabIconDefault }]}>
              Your transaction history will appear here
            </ThemedText>
          </View>
        )}

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
    marginBottom: 16,
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
  filterScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  filterText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  summaryCard: {
    margin: 16,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryContent: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  summaryAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  summaryCount: {
    fontSize: 14,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    opacity: 0.6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionIconText: {
    fontSize: 24,
  },
  transactionContent: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  transactionDescription: {
    fontSize: 14,
    marginBottom: 6,
  },
  transactionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  transactionDate: {
    fontSize: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  bottomPadding: {
    height: 40,
  },
});
