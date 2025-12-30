import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  TextInput,
  Switch,
} from 'react-native';
import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  type: 'upi' | 'bank' | 'cash' | 'other';
}

const paymentMethods: PaymentMethod[] = [
  { id: '1', name: 'UPI', icon: '📱', type: 'upi' },
  { id: '2', name: 'Bank Transfer', icon: '🏦', type: 'bank' },
  { id: '3', name: 'Cash', icon: '💵', type: 'cash' },
  { id: '4', name: 'Other', icon: '💳', type: 'other' },
];

export default function PaymentConfirmationScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const params = useLocalSearchParams();

  const friendName = params.friendName as string;
  const amount = params.amount as string;
  const type = params.type as 'receive' | 'pay';

  const [selectedMethod, setSelectedMethod] = useState<string>('1');
  const [paymentNote, setPaymentNote] = useState('');
  const [partialPayment, setPartialPayment] = useState(false);
  const [customAmount, setCustomAmount] = useState(amount);

  const handleConfirmPayment = () => {
    router.push({
      pathname: '/payment-success',
      params: {
        friendName,
        amount: partialPayment ? customAmount : amount,
        method: paymentMethods.find((m) => m.id === selectedMethod)?.name,
      },
    });
  };

  const renderPaymentMethod = (method: PaymentMethod) => {
    const isSelected = selectedMethod === method.id;

    return (
      <TouchableOpacity
        key={method.id}
        style={[
          styles.methodItem,
          {
            backgroundColor: isSelected ? colors.primary : colors.cardBackground,
            borderColor: isSelected ? colors.primary : 'transparent',
          },
        ]}
        onPress={() => setSelectedMethod(method.id)}>
        <View style={styles.methodLeft}>
          <View
            style={[
              styles.methodIcon,
              { backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : colors.background },
            ]}>
            <ThemedText style={styles.methodIconText}>{method.icon}</ThemedText>
          </View>
          <ThemedText
            style={[styles.methodName, { color: isSelected ? '#fff' : colors.text }]}>
            {method.name}
          </ThemedText>
        </View>
        {isSelected && <IconSymbol name="checkmark.circle.fill" size={24} color="#fff" />}
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
          <ThemedText style={styles.headerTitle}>Confirm Payment</ThemedText>
          <View style={styles.placeholder} />
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={[styles.amountCard, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.friendInfo}>
            <View style={[styles.avatar, { backgroundColor: colors.background }]}>
              <ThemedText style={styles.avatarText}>👤</ThemedText>
            </View>
            <View>
              <ThemedText style={styles.label}>
                {type === 'pay' ? 'Paying to' : 'Receiving from'}
              </ThemedText>
              <ThemedText style={styles.friendName}>{friendName}</ThemedText>
            </View>
          </View>

          <View style={styles.amountSection}>
            <ThemedText style={styles.label}>Amount to settle</ThemedText>
            <View style={styles.amountRow}>
              <ThemedText style={[styles.currency, { color: colors.primary }]}>$</ThemedText>
              <ThemedText style={[styles.amount, { color: colors.primary }]}>
                {partialPayment ? customAmount : amount}
              </ThemedText>
            </View>
          </View>

          <View style={styles.partialPaymentRow}>
            <View>
              <ThemedText style={styles.partialLabel}>Partial payment</ThemedText>
              <ThemedText style={styles.partialSubtext}>Pay a different amount</ThemedText>
            </View>
            <Switch
              value={partialPayment}
              onValueChange={setPartialPayment}
              trackColor={{ false: colors.tabIconDefault, true: colors.primary }}
              thumbColor="#fff"
            />
          </View>

          {partialPayment && (
            <View style={[styles.customAmountInput, { backgroundColor: colors.background }]}>
              <ThemedText style={styles.inputLabel}>Custom Amount</ThemedText>
              <View style={styles.inputRow}>
                <ThemedText style={styles.dollarSign}>$</ThemedText>
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  value={customAmount}
                  onChangeText={setCustomAmount}
                  keyboardType="decimal-pad"
                  placeholder="0.00"
                  placeholderTextColor={colors.tabIconDefault}
                />
              </View>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Payment Method</ThemedText>
          <View style={styles.methodsList}>{paymentMethods.map(renderPaymentMethod)}</View>
        </View>

        {selectedMethod === '1' && (
          <View style={[styles.upiCard, { backgroundColor: colors.cardBackground }]}>
            <View style={styles.upiHeader}>
              <IconSymbol name="link" size={20} color={colors.primary} />
              <ThemedText style={styles.upiTitle}>UPI Payment Link</ThemedText>
            </View>
            <TouchableOpacity
              style={[styles.upiButton, { backgroundColor: colors.primary }]}
              onPress={() => {}}>
              <ThemedText style={styles.upiButtonText}>Open UPI App</ThemedText>
              <IconSymbol name="arrow.up.right" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        )}

        {selectedMethod === '2' && (
          <View style={[styles.bankCard, { backgroundColor: colors.cardBackground }]}>
            <ThemedText style={styles.bankTitle}>Bank Details</ThemedText>
            <View style={styles.bankDetail}>
              <ThemedText style={styles.bankLabel}>Account Number</ThemedText>
              <ThemedText style={styles.bankValue}>**** **** 1234</ThemedText>
            </View>
            <View style={styles.bankDetail}>
              <ThemedText style={styles.bankLabel}>IFSC Code</ThemedText>
              <ThemedText style={styles.bankValue}>ABCD0001234</ThemedText>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Add Note (Optional)</ThemedText>
          <View style={[styles.noteInput, { backgroundColor: colors.cardBackground }]}>
            <TextInput
              style={[styles.noteTextInput, { color: colors.text }]}
              placeholder="Add a payment note..."
              placeholderTextColor={colors.tabIconDefault}
              value={paymentNote}
              onChangeText={setPaymentNote}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: colors.background }]}>
        <TouchableOpacity
          style={[styles.confirmButton, { backgroundColor: colors.primary }]}
          onPress={handleConfirmPayment}>
          <ThemedText style={styles.confirmButtonText}>Confirm Settlement</ThemedText>
        </TouchableOpacity>
      </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  amountCard: {
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 28,
  },
  label: {
    fontSize: 14,
    opacity: 0.6,
    marginBottom: 4,
  },
  friendName: {
    fontSize: 18,
    fontWeight: '600',
  },
  amountSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  currency: {
    fontSize: 32,
    fontWeight: '700',
    marginTop: 4,
  },
  amount: {
    fontSize: 48,
    fontWeight: '700',
  },
  partialPaymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  partialLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  partialSubtext: {
    fontSize: 13,
    opacity: 0.6,
  },
  customAmountInput: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
  },
  inputLabel: {
    fontSize: 14,
    opacity: 0.6,
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dollarSign: {
    fontSize: 24,
    fontWeight: '600',
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 24,
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
  methodsList: {
    gap: 12,
  },
  methodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
  },
  methodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  methodIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodIconText: {
    fontSize: 24,
  },
  methodName: {
    fontSize: 16,
    fontWeight: '600',
  },
  upiCard: {
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  upiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  upiTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  upiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  upiButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bankCard: {
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  bankTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  bankDetail: {
    marginBottom: 12,
  },
  bankLabel: {
    fontSize: 13,
    opacity: 0.6,
    marginBottom: 4,
  },
  bankValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  noteInput: {
    padding: 16,
    borderRadius: 16,
    minHeight: 120,
  },
  noteTextInput: {
    fontSize: 16,
    minHeight: 88,
  },
  bottomPadding: {
    height: 100,
  },
  footer: {
    padding: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  confirmButton: {
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
