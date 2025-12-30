import { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface SplitType {
  id: string;
  name: string;
  description: string;
  icon: string;
  route?: string;
}

const splitTypes: SplitType[] = [
  {
    id: 'equal',
    name: 'Equal split',
    description: 'Split the amount equally among all participants',
    icon: '⚖️',
  },
  {
    id: 'unequal',
    name: 'Unequal split',
    description: 'Manually adjust individual amounts',
    icon: '📊',
    route: '/unequal-split-detail',
  },
  {
    id: 'percentage',
    name: 'Percentage split',
    description: 'Split by percentage for each person',
    icon: '📈',
  },
  {
    id: 'shares',
    name: 'Share-based split',
    description: 'Split by shares (e.g., 2:1:1)',
    icon: '🎯',
  },
  {
    id: 'adjustment',
    name: 'Split by adjustment',
    description: 'Adjust amounts after equal split',
    icon: '⚙️',
  },
];

export default function SelectSplitTypeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [selectedType, setSelectedType] = useState('equal');

  const handleSelectType = (type: SplitType) => {
    setSelectedType(type.id);
    if (type.route) {
      router.push(type.route as any);
    } else {
      setTimeout(() => router.back(), 200);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color="#fff" />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Select Split Type</ThemedText>
          <View style={styles.placeholder} />
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          {splitTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.typeCard,
                {
                  backgroundColor: colors.cardBackground,
                  borderWidth: selectedType === type.id ? 2 : 0,
                  borderColor: selectedType === type.id ? colors.primary : 'transparent',
                },
              ]}
              onPress={() => handleSelectType(type)}>
              <View style={styles.typeLeft}>
                <View
                  style={[
                    styles.iconCircle,
                    {
                      backgroundColor:
                        selectedType === type.id ? colors.primary : colors.primary + '20',
                    },
                  ]}>
                  <ThemedText style={styles.typeIcon}>{type.icon}</ThemedText>
                </View>
                <View style={styles.typeInfo}>
                  <ThemedText style={styles.typeName}>{type.name}</ThemedText>
                  <ThemedText style={[styles.typeDescription, { color: colors.tabIconDefault }]}>
                    {type.description}
                  </ThemedText>
                </View>
              </View>
              {selectedType === type.id && (
                <View style={[styles.checkmark, { backgroundColor: colors.primary }]}>
                  <IconSymbol name="checkmark" size={16} color="#fff" />
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
  section: {
    padding: 16,
  },
  typeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  typeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  typeIcon: {
    fontSize: 28,
  },
  typeInfo: {
    flex: 1,
  },
  typeName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  typeDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  checkmark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
});
