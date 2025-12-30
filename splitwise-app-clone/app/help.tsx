import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    id: '1',
    category: 'Getting Started',
    question: 'How do I add a new expense?',
    answer: 'Tap the + button at the bottom of the screen, select "Add Expense", enter the details, and choose how to split it among group members.',
  },
  {
    id: '2',
    category: 'Getting Started',
    question: 'How do I create a group?',
    answer: 'Go to the Groups tab, tap the + button, give your group a name, and add members by searching for their email or phone number.',
  },
  {
    id: '3',
    category: 'Payments',
    question: 'How do I settle up with someone?',
    answer: 'Go to the Friends or Groups tab, select the person or group, and tap "Settle Up". Enter the payment amount and confirm.',
  },
  {
    id: '4',
    category: 'Payments',
    question: 'Can I record a partial payment?',
    answer: 'Yes! When settling up, you can enter any amount less than the total owed. The remaining balance will be updated automatically.',
  },
  {
    id: '5',
    category: 'Groups',
    question: 'How do I leave a group?',
    answer: 'Open the group, tap the settings icon, scroll down and select "Leave Group". Make sure all balances are settled first.',
  },
  {
    id: '6',
    category: 'Groups',
    question: 'Can I edit or delete an expense?',
    answer: 'Yes, tap on any expense to view details. From there, you can edit or delete it if you created it or are the group admin.',
  },
  {
    id: '7',
    category: 'Account',
    question: 'How do I change my currency?',
    answer: 'Go to Settings > Currency and select your preferred currency from the list.',
  },
  {
    id: '8',
    category: 'Account',
    question: 'Is my data secure?',
    answer: 'Yes, we use industry-standard encryption to protect your data. Your financial information is never shared with third parties.',
  },
];

export default function HelpScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

  const toggleFAQ = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color="#fff" />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Help & FAQs</ThemedText>
          <View style={styles.placeholder} />
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={[styles.contactCard, { backgroundColor: colors.cardBackground }]}>
          <View style={[styles.contactIcon, { backgroundColor: colors.primary + '20' }]}>
            <IconSymbol name="envelope.circle" size={32} color={colors.primary} />
          </View>
          <View style={styles.contactContent}>
            <ThemedText style={styles.contactTitle}>Need More Help?</ThemedText>
            <ThemedText style={[styles.contactText, { color: colors.tabIconDefault }]}>
              Contact our support team
            </ThemedText>
          </View>
          <TouchableOpacity style={[styles.contactButton, { backgroundColor: colors.primary }]}>
            <ThemedText style={styles.contactButtonText}>Contact</ThemedText>
          </TouchableOpacity>
        </View>

        {categories.map((category) => (
          <View key={category} style={styles.section}>
            <ThemedText style={styles.sectionTitle}>{category}</ThemedText>
            <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
              {faqs
                .filter(faq => faq.category === category)
                .map((faq, index, array) => (
                  <View key={faq.id}>
                    <TouchableOpacity
                      style={styles.faqItem}
                      onPress={() => toggleFAQ(faq.id)}>
                      <View style={styles.faqHeader}>
                        <ThemedText style={styles.faqQuestion}>{faq.question}</ThemedText>
                        <IconSymbol
                          name={expandedId === faq.id ? 'chevron.up' : 'chevron.down'}
                          size={20}
                          color={colors.tabIconDefault}
                        />
                      </View>
                      {expandedId === faq.id && (
                        <ThemedText style={[styles.faqAnswer, { color: colors.tabIconDefault }]}>
                          {faq.answer}
                        </ThemedText>
                      )}
                    </TouchableOpacity>
                    {index < array.length - 1 && <View style={styles.divider} />}
                  </View>
                ))}
            </View>
          </View>
        ))}

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
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contactContent: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  contactText: {
    fontSize: 14,
  },
  contactButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
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
  faqItem: {
    padding: 16,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    marginRight: 12,
  },
  faqAnswer: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 12,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    marginLeft: 16,
  },
  bottomPadding: {
    height: 40,
  },
});
