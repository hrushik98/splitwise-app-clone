import { StyleSheet, ScrollView, View, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';

interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}

const popularCurrencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
];

const allCurrencies: Currency[] = [
  ...popularCurrencies,
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', flag: '🇲🇽' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷' },
];

export default function CurrencySettingsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCurrencies = allCurrencies.filter(currency =>
    currency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    currency.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectCurrency = (code: string) => {
    setSelectedCurrency(code);
    setTimeout(() => router.back(), 300);
  };

  const renderCurrencyItem = (currency: Currency) => {
    const isSelected = selectedCurrency === currency.code;
    
    return (
      <TouchableOpacity
        key={currency.code}
        style={[
          styles.currencyItem,
          isSelected && { backgroundColor: colors.background }
        ]}
        onPress={() => handleSelectCurrency(currency.code)}>
        <View style={styles.currencyLeft}>
          <ThemedText style={styles.currencyFlag}>{currency.flag}</ThemedText>
          <View style={styles.currencyInfo}>
            <ThemedText style={styles.currencyName}>{currency.name}</ThemedText>
            <ThemedText style={[styles.currencyCode, { color: colors.tabIconDefault }]}>
              {currency.code} ({currency.symbol})
            </ThemedText>
          </View>
        </View>
        {isSelected && (
          <IconSymbol name="checkmark.circle.fill" size={24} color={colors.primary} />
        )}
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
          <ThemedText style={styles.headerTitle}>Currency</ThemedText>
          <View style={styles.placeholder} />
        </View>
        
        <View style={[styles.searchBar, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }]}>
          <IconSymbol name="magnifyingglass" size={20} color="rgba(255, 255, 255, 0.8)" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search currencies..."
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <IconSymbol name="xmark.circle.fill" size={20} color="rgba(255, 255, 255, 0.8)" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {searchQuery.length === 0 && (
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Popular Currencies</ThemedText>
            <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
              {popularCurrencies.map((currency, index) => (
                <View key={currency.code}>
                  {renderCurrencyItem(currency)}
                  {index < popularCurrencies.length - 1 && (
                    <View style={styles.divider} />
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={styles.section}>
          {searchQuery.length === 0 && (
            <ThemedText style={styles.sectionTitle}>All Currencies</ThemedText>
          )}
          <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
            {filteredCurrencies.length === 0 ? (
              <View style={styles.emptyState}>
                <ThemedText style={styles.emptyIcon}>🔍</ThemedText>
                <ThemedText style={styles.emptyText}>No currencies found</ThemedText>
              </View>
            ) : (
              (searchQuery.length > 0 ? filteredCurrencies : allCurrencies).map((currency, index, array) => (
                <View key={currency.code}>
                  {renderCurrencyItem(currency)}
                  {index < array.length - 1 && (
                    <View style={styles.divider} />
                  )}
                </View>
              ))
            )}
          </View>
        </View>

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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    opacity: 0.6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  currencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  currencyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  currencyFlag: {
    fontSize: 32,
    marginRight: 12,
  },
  currencyInfo: {
    flex: 1,
  },
  currencyName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  currencyCode: {
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    marginLeft: 60,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.6,
  },
  bottomPadding: {
    height: 40,
  },
});
