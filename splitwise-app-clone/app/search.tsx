import { StyleSheet, ScrollView, View, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';

interface SearchResult {
  id: string;
  type: 'expense' | 'group' | 'friend';
  title: string;
  subtitle: string;
  amount?: number;
  icon: string;
  iconBg: string;
}

const mockSearchResults: SearchResult[] = [
  { id: '1', type: 'expense', title: 'Birthday House', subtitle: 'Mar 24, 2023', amount: 4508.32, icon: '🎂', iconBg: '#FFE5E5' },
  { id: '2', type: 'group', title: 'Party Time', subtitle: '3 members', amount: 2501.32, icon: '🎉', iconBg: '#FFF4E5' },
  { id: '3', type: 'friend', title: 'Wade Howard', subtitle: 'Owes you $1052.75', icon: '👤', iconBg: '#E5F4FF' },
  { id: '4', type: 'expense', title: 'Shopping', subtitle: 'Mar 24, 2023', amount: 505.00, icon: '🛍️', iconBg: '#F0E5FF' },
  { id: '5', type: 'expense', title: 'Dinning', subtitle: 'Mar 20, 2024', amount: 120.00, icon: '🍽️', iconBg: '#E5FFE5' },
];

export default function SearchScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'expense' | 'group' | 'friend'>('all');

  const filteredResults = mockSearchResults.filter(result => {
    const matchesQuery = result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        result.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || result.type === activeFilter;
    return matchesQuery && matchesFilter;
  });

  const renderSearchResult = (result: SearchResult) => {
    return (
      <TouchableOpacity key={result.id} style={[styles.resultItem, { backgroundColor: colors.cardBackground }]}>
        <View style={[styles.resultIcon, { backgroundColor: result.iconBg }]}>
          <ThemedText style={styles.resultIconText}>{result.icon}</ThemedText>
        </View>
        <View style={styles.resultContent}>
          <ThemedText style={styles.resultTitle}>{result.title}</ThemedText>
          <ThemedText style={[styles.resultSubtitle, { color: colors.tabIconDefault }]}>
            {result.subtitle}
          </ThemedText>
        </View>
        {result.amount && (
          <ThemedText style={[styles.resultAmount, { color: colors.primary }]}>
            ${result.amount.toFixed(2)}
          </ThemedText>
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
          <ThemedText style={styles.headerTitle}>Search</ThemedText>
          <View style={styles.placeholder} />
        </View>
        
        <View style={[styles.searchBar, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }]}>
          <IconSymbol name="magnifyingglass" size={20} color="rgba(255, 255, 255, 0.8)" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search expenses, groups, friends..."
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <IconSymbol name="xmark.circle.fill" size={20} color="rgba(255, 255, 255, 0.8)" />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {['all', 'expense', 'group', 'friend'].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterChip,
                activeFilter === filter && { backgroundColor: 'rgba(255, 255, 255, 0.3)' }
              ]}
              onPress={() => setActiveFilter(filter as any)}>
              <ThemedText style={styles.filterText}>
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {searchQuery.length === 0 ? (
          <View style={styles.emptyState}>
            <ThemedText style={styles.emptyIcon}>🔍</ThemedText>
            <ThemedText style={styles.emptyTitle}>Start searching</ThemedText>
            <ThemedText style={[styles.emptySubtitle, { color: colors.tabIconDefault }]}>
              Search for expenses, groups, or friends
            </ThemedText>
          </View>
        ) : filteredResults.length === 0 ? (
          <View style={styles.emptyState}>
            <ThemedText style={styles.emptyIcon}>😕</ThemedText>
            <ThemedText style={styles.emptyTitle}>No results found</ThemedText>
            <ThemedText style={[styles.emptySubtitle, { color: colors.tabIconDefault }]}>
              Try searching with different keywords
            </ThemedText>
          </View>
        ) : (
          <View style={styles.resultsContainer}>
            <ThemedText style={styles.resultsCount}>
              {filteredResults.length} {filteredResults.length === 1 ? 'result' : 'results'}
            </ThemedText>
            {filteredResults.map(renderSearchResult)}
          </View>
        )}
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
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
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
  resultsContainer: {
    padding: 16,
  },
  resultsCount: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    opacity: 0.7,
  },
  resultItem: {
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
  resultIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  resultIconText: {
    fontSize: 24,
  },
  resultContent: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  resultSubtitle: {
    fontSize: 14,
  },
  resultAmount: {
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
});
