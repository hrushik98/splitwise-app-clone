import { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface Split {
  id: string;
  name: string;
  avatar: string;
  amount: number;
  paid: number;
}

interface Comment {
  id: string;
  user: string;
  avatar: string;
  text: string;
  timestamp: Date;
}

export default function ExpenseDetailScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      user: 'Wade Howard',
      avatar: '👤',
      text: 'Thanks for covering this!',
      timestamp: new Date('2024-03-20T10:30:00'),
    },
  ]);

  const expense = {
    id: '1',
    description: 'Dinner at Restaurant',
    amount: 1200.0,
    category: { name: 'Food & Dining', icon: '🍽️' },
    date: new Date('2024-03-20'),
    paidBy: { name: 'You', avatar: '😊' },
    hasReceipt: true,
    splits: [
      { id: '1', name: 'Wade Howard', avatar: '👤', amount: 300, paid: 0 },
      { id: '2', name: 'Guy Warren', avatar: '👤', amount: 300, paid: 0 },
      { id: '3', name: 'John Smith', avatar: '👤', amount: 300, paid: 0 },
      { id: '4', name: 'You', avatar: '😊', amount: 300, paid: 1200 },
    ],
  };

  const handleDelete = () => {
    Alert.alert('Delete Expense', 'Are you sure you want to delete this expense?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => router.back(),
      },
    ]);
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      setComments([
        ...comments,
        {
          id: Date.now().toString(),
          user: 'You',
          avatar: '😊',
          text: comment,
          timestamp: new Date(),
        },
      ]);
      setComment('');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color="#fff" />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Expense Details</ThemedText>
          <TouchableOpacity onPress={() => setIsEditing(!isEditing)} style={styles.editButton}>
            <IconSymbol name={isEditing ? 'checkmark' : 'pencil'} size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={[styles.amountCard, { backgroundColor: colors.cardBackground }]}>
          <View style={[styles.categoryBadge, { backgroundColor: colors.primary + '20' }]}>
            <ThemedText style={styles.categoryIcon}>{expense.category.icon}</ThemedText>
            <ThemedText style={[styles.categoryName, { color: colors.primary }]}>
              {expense.category.name}
            </ThemedText>
          </View>
          <ThemedText style={styles.amount}>${expense.amount.toFixed(2)}</ThemedText>
          <ThemedText style={styles.description}>{expense.description}</ThemedText>
          <ThemedText style={[styles.date, { color: colors.tabIconDefault }]}>
            {expense.date.toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </ThemedText>
        </View>

        {expense.hasReceipt && (
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Receipt</ThemedText>
            <TouchableOpacity
              style={[styles.receiptCard, { backgroundColor: colors.cardBackground }]}>
              <View style={styles.receiptPlaceholder}>
                <IconSymbol name="photo" size={48} color={colors.tabIconDefault} />
                <ThemedText style={[styles.receiptText, { color: colors.tabIconDefault }]}>
                  Tap to view receipt
                </ThemedText>
              </View>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Paid by</ThemedText>
          <View style={[styles.infoCard, { backgroundColor: colors.cardBackground }]}>
            <View style={styles.infoLeft}>
              <View style={[styles.avatar, { backgroundColor: colors.background }]}>
                <ThemedText style={styles.avatarText}>{expense.paidBy.avatar}</ThemedText>
              </View>
              <ThemedText style={styles.infoName}>{expense.paidBy.name}</ThemedText>
            </View>
            <ThemedText style={[styles.infoAmount, { color: colors.success }]}>
              ${expense.amount.toFixed(2)}
            </ThemedText>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Split details</ThemedText>
          <View style={[styles.splitCard, { backgroundColor: colors.cardBackground }]}>
            {expense.splits.map((split, index) => (
              <View
                key={split.id}
                style={[
                  styles.splitItem,
                  index < expense.splits.length - 1 && styles.splitItemBorder,
                ]}>
                <View style={styles.splitLeft}>
                  <View style={[styles.avatar, { backgroundColor: colors.background }]}>
                    <ThemedText style={styles.avatarText}>{split.avatar}</ThemedText>
                  </View>
                  <View style={styles.splitInfo}>
                    <ThemedText style={styles.splitName}>{split.name}</ThemedText>
                    {split.paid > 0 && (
                      <ThemedText style={[styles.splitPaid, { color: colors.tabIconDefault }]}>
                        Paid ${split.paid.toFixed(2)}
                      </ThemedText>
                    )}
                  </View>
                </View>
                <View style={styles.splitRight}>
                  <ThemedText style={styles.splitAmount}>${split.amount.toFixed(2)}</ThemedText>
                  {split.paid > split.amount && (
                    <ThemedText style={[styles.splitOwed, { color: colors.success }]}>
                      Gets back ${(split.paid - split.amount).toFixed(2)}
                    </ThemedText>
                  )}
                  {split.paid < split.amount && split.paid === 0 && (
                    <ThemedText style={[styles.splitOwed, { color: colors.danger }]}>
                      Owes ${split.amount.toFixed(2)}
                    </ThemedText>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Comments ({comments.length})</ThemedText>
          <View style={[styles.commentsCard, { backgroundColor: colors.cardBackground }]}>
            {comments.map((c) => (
              <View key={c.id} style={styles.commentItem}>
                <View style={[styles.commentAvatar, { backgroundColor: colors.background }]}>
                  <ThemedText style={styles.commentAvatarText}>{c.avatar}</ThemedText>
                </View>
                <View style={styles.commentContent}>
                  <View style={styles.commentHeader}>
                    <ThemedText style={styles.commentUser}>{c.user}</ThemedText>
                    <ThemedText style={[styles.commentTime, { color: colors.tabIconDefault }]}>
                      {c.timestamp.toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </ThemedText>
                  </View>
                  <ThemedText style={styles.commentText}>{c.text}</ThemedText>
                </View>
              </View>
            ))}
            <View style={styles.commentInputContainer}>
              <TextInput
                style={[styles.commentInput, { color: colors.text }]}
                placeholder="Add a comment..."
                placeholderTextColor={colors.tabIconDefault}
                value={comment}
                onChangeText={setComment}
                multiline
              />
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  { backgroundColor: comment.trim() ? colors.primary : colors.tabIconDefault },
                ]}
                onPress={handleAddComment}
                disabled={!comment.trim()}>
                <IconSymbol name="arrow.up" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.deleteButton, { backgroundColor: colors.danger + '20' }]}
            onPress={handleDelete}>
            <IconSymbol name="trash" size={20} color={colors.danger} />
            <ThemedText style={[styles.deleteButtonText, { color: colors.danger }]}>
              Delete Expense
            </ThemedText>
          </TouchableOpacity>
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
  editButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  amountCard: {
    margin: 16,
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
    gap: 6,
  },
  categoryIcon: {
    fontSize: 16,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
  },
  amount: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
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
  receiptCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  receiptPlaceholder: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  receiptText: {
    fontSize: 14,
    marginTop: 8,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
  },
  infoName: {
    fontSize: 16,
    fontWeight: '600',
  },
  infoAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  splitCard: {
    borderRadius: 16,
    padding: 16,
  },
  splitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  splitItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  splitLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  splitInfo: {
    flex: 1,
  },
  splitName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  splitPaid: {
    fontSize: 12,
  },
  splitRight: {
    alignItems: 'flex-end',
  },
  splitAmount: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  splitOwed: {
    fontSize: 12,
  },
  commentsCard: {
    borderRadius: 16,
    padding: 16,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  commentAvatarText: {
    fontSize: 18,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  commentUser: {
    fontSize: 14,
    fontWeight: '600',
  },
  commentTime: {
    fontSize: 12,
  },
  commentText: {
    fontSize: 14,
    lineHeight: 20,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    marginTop: 8,
  },
  commentInput: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    maxHeight: 100,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 8,
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
