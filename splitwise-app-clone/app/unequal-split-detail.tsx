import { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface Participant {
  id: string;
  name: string;
  avatar: string;
  amount: string;
}

export default function UnequalSplitDetailScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const totalAmount = 1200.0;
  const [participants, setParticipants] = useState<Participant[]>([
    { id: '1', name: 'Wade Howard', avatar: '👤', amount: '300.00' },
    { id: '2', name: 'Guy Warren', avatar: '👤', amount: '300.00' },
    { id: '3', name: 'John Smith', avatar: '👤', amount: '300.00' },
    { id: '4', name: 'You', avatar: '😊', amount: '300.00' },
  ]);

  const updateAmount = (id: string, value: string) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, amount: value } : p))
    );
  };

  const calculateTotal = () => {
    return participants.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
  };

  const currentTotal = calculateTotal();
  const remaining = totalAmount - currentTotal;

  const distributeEqually = () => {
    const equalAmount = (totalAmount / participants.length).toFixed(2);
    setParticipants((prev) => prev.map((p) => ({ ...p, amount: equalAmount })));
  };

  const clearAll = () => {
    setParticipants((prev) => prev.map((p) => ({ ...p, amount: '0.00' })));
  };

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color="#fff" />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Unequal Split</ThemedText>
          <TouchableOpacity onPress={() => router.back()} style={styles.saveButton}>
            <ThemedText style={styles.saveText}>Done</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.summaryCard, { backgroundColor: colors.cardBackground }]}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <ThemedText style={styles.summaryLabel}>Total</ThemedText>
            <ThemedText style={[styles.summaryAmount, { color: colors.text }]}>
              ${totalAmount.toFixed(2)}
            </ThemedText>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <ThemedText style={styles.summaryLabel}>Remaining</ThemedText>
            <ThemedText
              style={[
                styles.summaryAmount,
                { color: remaining === 0 ? colors.success : colors.danger },
              ]}>
              ${Math.abs(remaining).toFixed(2)}
            </ThemedText>
          </View>
        </View>
        {remaining !== 0 && (
          <View style={[styles.warningBanner, { backgroundColor: colors.danger + '20' }]}>
            <IconSymbol name="exclamationmark.triangle.fill" size={16} color={colors.danger} />
            <ThemedText style={[styles.warningText, { color: colors.danger }]}>
              {remaining > 0
                ? `$${remaining.toFixed(2)} left to split`
                : `Over by $${Math.abs(remaining).toFixed(2)}`}
            </ThemedText>
          </View>
        )}
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.cardBackground }]}
          onPress={distributeEqually}>
          <IconSymbol name="equal" size={20} color={colors.primary} />
          <ThemedText style={[styles.actionButtonText, { color: colors.primary }]}>
            Split Equally
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.cardBackground }]}
          onPress={clearAll}>
          <IconSymbol name="trash" size={20} color={colors.tabIconDefault} />
          <ThemedText style={[styles.actionButtonText, { color: colors.tabIconDefault }]}>
            Clear All
          </ThemedText>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Adjust amounts</ThemedText>
          {participants.map((participant) => (
            <View
              key={participant.id}
              style={[styles.participantCard, { backgroundColor: colors.cardBackground }]}>
              <View style={styles.participantLeft}>
                <View style={[styles.avatar, { backgroundColor: colors.background }]}>
                  <ThemedText style={styles.avatarText}>{participant.avatar}</ThemedText>
                </View>
                <ThemedText style={styles.participantName}>{participant.name}</ThemedText>
              </View>
              <View style={styles.amountInputContainer}>
                <ThemedText style={styles.currencySymbol}>$</ThemedText>
                <TextInput
                  style={[styles.amountInput, { color: colors.text }]}
                  value={participant.amount}
                  onChangeText={(value) => updateAmount(participant.id, value)}
                  keyboardType="decimal-pad"
                  selectTextOnFocus
                />
              </View>
            </View>
          ))}
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
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  saveText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
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
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  warningText: {
    fontSize: 14,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    gap: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  participantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  participantLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
  participantName: {
    fontSize: 16,
    fontWeight: '500',
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 4,
  },
  amountInput: {
    fontSize: 16,
    fontWeight: '600',
    minWidth: 80,
    textAlign: 'right',
  },
});
