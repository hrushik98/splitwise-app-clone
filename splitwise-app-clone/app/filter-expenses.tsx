import { StyleSheet, ScrollView, View, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';

const categories = [
  { id: 'all', name: 'All Categories', icon: '📋' },
  { id: 'food', name: 'Food & Dining', icon: '🍽️' },
  { id: 'shopping', name: 'Shopping', icon: '🛍️' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬' },
  { id: 'transport', name: 'Transport', icon: '🚗' },
  { id: 'utilities', name: 'Utilities', icon: '💡' },
  { id: 'other', name: 'Other', icon: '📦' },
];

const groups = [
  { id: 'all', name: 'All Groups' },
  { id: '1', name: 'Birthday House' },
  { id: '2', name: 'Party Time' },
  { id: '3', name: 'Shopping' },
];

export default function FilterExpensesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [amountRange, setAmountRange] = useState({ min: '', max: '' });

  const handleApplyFilters = () => {
    router.back();
  };

  const handleResetFilters = () => {
    setDateRange({ from: '', to: '' });
    setSelectedCategory('all');
    setSelectedGroup('all');
    setAmountRange({ min: '', max: '' });
  };

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color="#fff" />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Filter Expenses</ThemedText>
          <TouchableOpacity onPress={handleResetFilters}>
            <ThemedText style={styles.resetText}>Reset</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Date Range</ThemedText>
          <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
            <View style={styles.dateRow}>
              <View style={styles.dateInput}>
                <ThemedText style={[styles.dateLabel, { color: colors.tabIconDefault }]}>From</ThemedText>
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="DD/MM/YYYY"
                  placeholderTextColor={colors.tabIconDefault}
                  value={dateRange.from}
                  onChangeText={(text) => setDateRange({ ...dateRange, from: text })}
                />
              </View>
              <ThemedText style={styles.dateSeparator}>—</ThemedText>
              <View style={styles.dateInput}>
                <ThemedText style={[styles.dateLabel, { color: colors.tabIconDefault }]}>To</ThemedText>
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="DD/MM/YYYY"
                  placeholderTextColor={colors.tabIconDefault}
                  value={dateRange.to}
                  onChangeText={(text) => setDateRange({ ...dateRange, to: text })}
                />
              </View>
            </View>
            
            <View style={styles.quickDates}>
              {['Today', 'This Week', 'This Month', 'Last Month'].map((period) => (
                <TouchableOpacity
                  key={period}
                  style={[styles.quickDateChip, { backgroundColor: colors.background }]}>
                  <ThemedText style={styles.quickDateText}>{period}</ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Category</ThemedText>
          <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryItem,
                  index !== categories.length - 1 && styles.categoryItemBorder,
                  selectedCategory === category.id && { backgroundColor: colors.background }
                ]}
                onPress={() => setSelectedCategory(category.id)}>
                <View style={styles.categoryLeft}>
                  <ThemedText style={styles.categoryIcon}>{category.icon}</ThemedText>
                  <ThemedText style={styles.categoryName}>{category.name}</ThemedText>
                </View>
                {selectedCategory === category.id && (
                  <IconSymbol name="checkmark.circle.fill" size={24} color={colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Group</ThemedText>
          <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
            {groups.map((group, index) => (
              <TouchableOpacity
                key={group.id}
                style={[
                  styles.groupItem,
                  index !== groups.length - 1 && styles.groupItemBorder,
                  selectedGroup === group.id && { backgroundColor: colors.background }
                ]}
                onPress={() => setSelectedGroup(group.id)}>
                <ThemedText style={styles.groupName}>{group.name}</ThemedText>
                {selectedGroup === group.id && (
                  <IconSymbol name="checkmark.circle.fill" size={24} color={colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Amount Range</ThemedText>
          <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
            <View style={styles.amountRow}>
              <View style={styles.amountInput}>
                <ThemedText style={[styles.amountLabel, { color: colors.tabIconDefault }]}>Min Amount</ThemedText>
                <View style={styles.inputWrapper}>
                  <ThemedText style={styles.currencySymbol}>$</ThemedText>
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="0.00"
                    placeholderTextColor={colors.tabIconDefault}
                    keyboardType="decimal-pad"
                    value={amountRange.min}
                    onChangeText={(text) => setAmountRange({ ...amountRange, min: text })}
                  />
                </View>
              </View>
              <View style={styles.amountInput}>
                <ThemedText style={[styles.amountLabel, { color: colors.tabIconDefault }]}>Max Amount</ThemedText>
                <View style={styles.inputWrapper}>
                  <ThemedText style={styles.currencySymbol}>$</ThemedText>
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="0.00"
                    placeholderTextColor={colors.tabIconDefault}
                    keyboardType="decimal-pad"
                    value={amountRange.max}
                    onChangeText={(text) => setAmountRange({ ...amountRange, max: text })}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: colors.cardBackground }]}>
        <TouchableOpacity
          style={[styles.applyButton, { backgroundColor: colors.primary }]}
          onPress={handleApplyFilters}>
          <ThemedText style={styles.applyButtonText}>Apply Filters</ThemedText>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  resetText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
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
  card: {
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  dateInput: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  dateSeparator: {
    fontSize: 18,
    marginTop: 20,
  },
  input: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  quickDates: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickDateChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  quickDateText: {
    fontSize: 14,
    fontWeight: '500',
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  categoryItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  categoryIcon: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 16,
  },
  groupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  groupItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  groupName: {
    fontSize: 16,
  },
  amountRow: {
    flexDirection: 'row',
    gap: 12,
  },
  amountInput: {
    flex: 1,
  },
  amountLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 4,
  },
  bottomPadding: {
    height: 100,
  },
  footer: {
    padding: 16,
    paddingBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  applyButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
