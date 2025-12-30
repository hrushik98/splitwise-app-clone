import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export function EmptyState({ icon, title, description, actionText, onAction }: EmptyStateProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={styles.container}>
      <ThemedText style={styles.icon}>{icon}</ThemedText>
      <ThemedText style={styles.title}>{title}</ThemedText>
      <ThemedText style={[styles.description, { color: colors.tabIconDefault }]}>
        {description}
      </ThemedText>
      {actionText && onAction && (
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.primary }]}
          onPress={onAction}>
          <ThemedText style={styles.actionButtonText}>{actionText}</ThemedText>
        </TouchableOpacity>
      )}
    </View>
  );
}

export function NoGroupsEmptyState({ onCreateGroup }: { onCreateGroup?: () => void }) {
  return (
    <EmptyState
      icon="👥"
      title="No groups yet"
      description="Create a group to start splitting expenses with friends and family"
      actionText="Create Your First Group"
      onAction={onCreateGroup}
    />
  );
}

export function NoExpensesEmptyState({ onAddExpense }: { onAddExpense?: () => void }) {
  return (
    <EmptyState
      icon="💸"
      title="No expenses yet"
      description="Add your first expense to start tracking shared costs"
      actionText="Add Your First Expense"
      onAction={onAddExpense}
    />
  );
}

export function NoFriendsEmptyState({ onAddFriend }: { onAddFriend?: () => void }) {
  return (
    <EmptyState
      icon="👋"
      title="No friends yet"
      description="Add friends to split expenses and keep track of who owes what"
      actionText="Add Your First Friend"
      onAction={onAddFriend}
    />
  );
}

export function NoSearchResultsEmptyState() {
  return (
    <EmptyState
      icon="🔍"
      title="No results found"
      description="Try adjusting your search or filters to find what you're looking for"
    />
  );
}

export function NoTransactionsEmptyState() {
  return (
    <EmptyState
      icon="📊"
      title="No transactions yet"
      description="Your payment history and settlements will appear here"
    />
  );
}

export function NoNotificationsEmptyState() {
  return (
    <EmptyState
      icon="🔔"
      title="No notifications"
      description="You're all caught up! New notifications will appear here"
    />
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  icon: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  actionButton: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
