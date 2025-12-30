import { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  Platform,
} from 'react-native';
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
}

const mockParticipants: Participant[] = [
  { id: '1', name: 'Wade Howard', avatar: '👤' },
  { id: '2', name: 'Guy Warren', avatar: '👤' },
  { id: '3', name: 'John Smith', avatar: '👤' },
  { id: '4', name: 'You', avatar: '😊' },
];

export default function AddExpenseScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [paidBy, setPaidBy] = useState<string[]>(['4']);
  const [splitBetween, setSplitBetween] = useState<string[]>(['1', '2', '3', '4']);
  const [category, setCategory] = useState({ name: 'General', icon: '📝' });
  const [date, setDate] = useState(new Date());
  const [showPaidByModal, setShowPaidByModal] = useState(false);
  const [showSplitModal, setShowSplitModal] = useState(false);

  const getParticipantNames = (ids: string[]) => {
    return ids
      .map((id) => mockParticipants.find((p) => p.id === id)?.name)
      .filter(Boolean)
      .join(', ');
  };

  const toggleParticipant = (id: string, list: string[], setter: (val: string[]) => void) => {
    if (list.includes(id)) {
      if (list.length > 1) {
        setter(list.filter((i) => i !== id));
      }
    } else {
      setter([...list, id]);
    }
  };

  const handleSave = () => {
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color="#fff" />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Add Expense</ThemedText>
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <ThemedText style={styles.saveText}>Save</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={[styles.amountSection, { backgroundColor: colors.cardBackground }]}>
          <ThemedText style={styles.currencySymbol}>$</ThemedText>
          <TextInput
            style={[styles.amountInput, { color: colors.text }]}
            placeholder="0.00"
            placeholderTextColor={colors.tabIconDefault}
            keyboardType="decimal-pad"
            value={amount}
            onChangeText={setAmount}
            autoFocus
          />
        </View>

        <View style={styles.section}>
          <View style={[styles.inputCard, { backgroundColor: colors.cardBackground }]}>
            <TextInput
              style={[styles.descriptionInput, { color: colors.text }]}
              placeholder="Description"
              placeholderTextColor={colors.tabIconDefault}
              value={description}
              onChangeText={setDescription}
            />
          </View>
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.optionCard, { backgroundColor: colors.cardBackground }]}
            onPress={() => setShowPaidByModal(true)}>
            <View style={styles.optionLeft}>
              <View style={[styles.iconCircle, { backgroundColor: colors.primary + '20' }]}>
                <ThemedText style={styles.optionIcon}>💰</ThemedText>
              </View>
              <View style={styles.optionInfo}>
                <ThemedText style={styles.optionLabel}>Paid by</ThemedText>
                <ThemedText style={[styles.optionValue, { color: colors.tabIconDefault }]}>
                  {getParticipantNames(paidBy)}
                </ThemedText>
              </View>
            </View>
            <IconSymbol name="chevron.right" size={20} color={colors.tabIconDefault} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionCard, { backgroundColor: colors.cardBackground }]}
            onPress={() => setShowSplitModal(true)}>
            <View style={styles.optionLeft}>
              <View style={[styles.iconCircle, { backgroundColor: colors.success + '20' }]}>
                <ThemedText style={styles.optionIcon}>👥</ThemedText>
              </View>
              <View style={styles.optionInfo}>
                <ThemedText style={styles.optionLabel}>Split between</ThemedText>
                <ThemedText style={[styles.optionValue, { color: colors.tabIconDefault }]}>
                  {splitBetween.length} people
                </ThemedText>
              </View>
            </View>
            <IconSymbol name="chevron.right" size={20} color={colors.tabIconDefault} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionCard, { backgroundColor: colors.cardBackground }]}
            onPress={() => router.push('/select-split-type')}>
            <View style={styles.optionLeft}>
              <View style={[styles.iconCircle, { backgroundColor: '#9B59B6' + '20' }]}>
                <ThemedText style={styles.optionIcon}>⚖️</ThemedText>
              </View>
              <View style={styles.optionInfo}>
                <ThemedText style={styles.optionLabel}>Split type</ThemedText>
                <ThemedText style={[styles.optionValue, { color: colors.tabIconDefault }]}>
                  Equal split
                </ThemedText>
              </View>
            </View>
            <IconSymbol name="chevron.right" size={20} color={colors.tabIconDefault} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionCard, { backgroundColor: colors.cardBackground }]}
            onPress={() => router.push('/select-category')}>
            <View style={styles.optionLeft}>
              <View style={[styles.iconCircle, { backgroundColor: '#E67E22' + '20' }]}>
                <ThemedText style={styles.optionIcon}>{category.icon}</ThemedText>
              </View>
              <View style={styles.optionInfo}>
                <ThemedText style={styles.optionLabel}>Category</ThemedText>
                <ThemedText style={[styles.optionValue, { color: colors.tabIconDefault }]}>
                  {category.name}
                </ThemedText>
              </View>
            </View>
            <IconSymbol name="chevron.right" size={20} color={colors.tabIconDefault} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionCard, { backgroundColor: colors.cardBackground }]}>
            <View style={styles.optionLeft}>
              <View style={[styles.iconCircle, { backgroundColor: '#3498DB' + '20' }]}>
                <ThemedText style={styles.optionIcon}>📅</ThemedText>
              </View>
              <View style={styles.optionInfo}>
                <ThemedText style={styles.optionLabel}>Date</ThemedText>
                <ThemedText style={[styles.optionValue, { color: colors.tabIconDefault }]}>
                  {date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </ThemedText>
              </View>
            </View>
            <IconSymbol name="chevron.right" size={20} color={colors.tabIconDefault} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionCard, { backgroundColor: colors.cardBackground }]}>
            <View style={styles.optionLeft}>
              <View style={[styles.iconCircle, { backgroundColor: '#E74C3C' + '20' }]}>
                <ThemedText style={styles.optionIcon}>📷</ThemedText>
              </View>
              <View style={styles.optionInfo}>
                <ThemedText style={styles.optionLabel}>Add receipt</ThemedText>
                <ThemedText style={[styles.optionValue, { color: colors.tabIconDefault }]}>
                  Optional
                </ThemedText>
              </View>
            </View>
            <IconSymbol name="chevron.right" size={20} color={colors.tabIconDefault} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={showPaidByModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowPaidByModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <View style={styles.modalHeader}>
              <ThemedText style={styles.modalTitle}>Paid by</ThemedText>
              <TouchableOpacity onPress={() => setShowPaidByModal(false)}>
                <IconSymbol name="xmark" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalList}>
              {mockParticipants.map((participant) => (
                <TouchableOpacity
                  key={participant.id}
                  style={styles.participantItem}
                  onPress={() => toggleParticipant(participant.id, paidBy, setPaidBy)}>
                  <View style={styles.participantLeft}>
                    <View style={[styles.avatar, { backgroundColor: colors.cardBackground }]}>
                      <ThemedText style={styles.avatarText}>{participant.avatar}</ThemedText>
                    </View>
                    <ThemedText style={styles.participantName}>{participant.name}</ThemedText>
                  </View>
                  <View
                    style={[
                      styles.checkbox,
                      {
                        backgroundColor: paidBy.includes(participant.id)
                          ? colors.primary
                          : 'transparent',
                        borderColor: paidBy.includes(participant.id)
                          ? colors.primary
                          : colors.tabIconDefault,
                      },
                    ]}>
                    {paidBy.includes(participant.id) && (
                      <IconSymbol name="checkmark" size={16} color="#fff" />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showSplitModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowSplitModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <View style={styles.modalHeader}>
              <ThemedText style={styles.modalTitle}>Split between</ThemedText>
              <TouchableOpacity onPress={() => setShowSplitModal(false)}>
                <IconSymbol name="xmark" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalList}>
              {mockParticipants.map((participant) => (
                <TouchableOpacity
                  key={participant.id}
                  style={styles.participantItem}
                  onPress={() =>
                    toggleParticipant(participant.id, splitBetween, setSplitBetween)
                  }>
                  <View style={styles.participantLeft}>
                    <View style={[styles.avatar, { backgroundColor: colors.cardBackground }]}>
                      <ThemedText style={styles.avatarText}>{participant.avatar}</ThemedText>
                    </View>
                    <ThemedText style={styles.participantName}>{participant.name}</ThemedText>
                  </View>
                  <View
                    style={[
                      styles.checkbox,
                      {
                        backgroundColor: splitBetween.includes(participant.id)
                          ? colors.primary
                          : 'transparent',
                        borderColor: splitBetween.includes(participant.id)
                          ? colors.primary
                          : colors.tabIconDefault,
                      },
                    ]}>
                    {splitBetween.includes(participant.id) && (
                      <IconSymbol name="checkmark" size={16} color="#fff" />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  scrollView: {
    flex: 1,
  },
  amountSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 20,
  },
  currencySymbol: {
    fontSize: 48,
    fontWeight: 'bold',
    opacity: 0.5,
  },
  amountInput: {
    fontSize: 48,
    fontWeight: 'bold',
    minWidth: 150,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  inputCard: {
    borderRadius: 16,
    padding: 20,
  },
  descriptionInput: {
    fontSize: 16,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionIcon: {
    fontSize: 24,
  },
  optionInfo: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  optionValue: {
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalList: {
    padding: 20,
  },
  participantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
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
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
