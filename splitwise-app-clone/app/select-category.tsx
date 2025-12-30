import { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const categories: Category[] = [
  { id: '1', name: 'Food & Dining', icon: '🍽️', color: '#FF6B4A' },
  { id: '2', name: 'Shopping', icon: '🛍️', color: '#9B59B6' },
  { id: '3', name: 'Entertainment', icon: '🎬', color: '#E67E22' },
  { id: '4', name: 'Transportation', icon: '🚗', color: '#3498DB' },
  { id: '5', name: 'Home', icon: '🏠', color: '#1CC29F' },
  { id: '6', name: 'Utilities', icon: '💡', color: '#F39C12' },
  { id: '7', name: 'Healthcare', icon: '🏥', color: '#E74C3C' },
  { id: '8', name: 'Travel', icon: '✈️', color: '#16A085' },
  { id: '9', name: 'Education', icon: '📚', color: '#2980B9' },
  { id: '10', name: 'Sports', icon: '⚽', color: '#27AE60' },
  { id: '11', name: 'Gifts', icon: '🎁', color: '#C0392B' },
  { id: '12', name: 'Bills', icon: '📄', color: '#7F8C8D' },
  { id: '13', name: 'Groceries', icon: '🛒', color: '#2ECC71' },
  { id: '14', name: 'Drinks', icon: '🍺', color: '#F1C40F' },
  { id: '15', name: 'Electronics', icon: '💻', color: '#34495E' },
  { id: '16', name: 'Clothing', icon: '👕', color: '#E91E63' },
  { id: '17', name: 'Beauty', icon: '💄', color: '#FF69B4' },
  { id: '18', name: 'Pet Care', icon: '🐾', color: '#8E44AD' },
  { id: '19', name: 'Insurance', icon: '🛡️', color: '#95A5A6' },
  { id: '20', name: 'General', icon: '📝', color: '#687076' },
];

export default function SelectCategoryScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [selectedCategory, setSelectedCategory] = useState('20');

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category.id);
    setTimeout(() => router.back(), 200);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color="#fff" />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Select Category</ThemedText>
          <View style={styles.placeholder} />
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryCard,
                {
                  backgroundColor: colors.cardBackground,
                  borderWidth: selectedCategory === category.id ? 2 : 0,
                  borderColor: selectedCategory === category.id ? colors.primary : 'transparent',
                },
              ]}
              onPress={() => handleSelectCategory(category)}>
              <View
                style={[
                  styles.iconCircle,
                  {
                    backgroundColor:
                      selectedCategory === category.id
                        ? category.color
                        : category.color + '20',
                  },
                ]}>
                <ThemedText style={styles.categoryIcon}>{category.icon}</ThemedText>
              </View>
              <ThemedText style={styles.categoryName} numberOfLines={2}>
                {category.name}
              </ThemedText>
              {selectedCategory === category.id && (
                <View style={[styles.checkmark, { backgroundColor: colors.primary }]}>
                  <IconSymbol name="checkmark" size={12} color="#fff" />
                </View>
              )}
            </TouchableOpacity>
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
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
  },
  categoryCard: {
    width: '31.33%',
    aspectRatio: 1,
    margin: '1%',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryIcon: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
