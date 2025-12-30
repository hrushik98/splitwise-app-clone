import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function PaymentSuccessScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const params = useLocalSearchParams();

  const friendName = params.friendName as string;
  const amount = params.amount as string;
  const method = params.method as string;

  const handleDone = () => {
    router.replace('/(tabs)');
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: colors.success }]}>
          <IconSymbol name="checkmark" size={64} color="#fff" />
        </View>

        <ThemedText style={styles.title}>Payment Successful!</ThemedText>
        <ThemedText style={[styles.subtitle, { color: colors.tabIconDefault }]}>
          Your settlement has been recorded
        </ThemedText>

        <View style={[styles.detailsCard, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.detailRow}>
            <ThemedText style={[styles.detailLabel, { color: colors.tabIconDefault }]}>
              Settled with
            </ThemedText>
            <ThemedText style={styles.detailValue}>{friendName}</ThemedText>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <ThemedText style={[styles.detailLabel, { color: colors.tabIconDefault }]}>
              Amount
            </ThemedText>
            <ThemedText style={[styles.detailValue, { color: colors.success }]}>
              ${amount}
            </ThemedText>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <ThemedText style={[styles.detailLabel, { color: colors.tabIconDefault }]}>
              Payment Method
            </ThemedText>
            <ThemedText style={styles.detailValue}>{method}</ThemedText>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <ThemedText style={[styles.detailLabel, { color: colors.tabIconDefault }]}>
              Date
            </ThemedText>
            <ThemedText style={styles.detailValue}>
              {new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </ThemedText>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.shareButton, { backgroundColor: colors.cardBackground }]}
            onPress={() => {}}>
            <IconSymbol name="square.and.arrow.up" size={20} color={colors.text} />
            <ThemedText style={styles.shareButtonText}>Share Receipt</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.doneButton, { backgroundColor: colors.primary }]}
          onPress={handleDone}>
          <ThemedText style={styles.doneButtonText}>Done</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
  },
  detailsCard: {
    width: '100%',
    padding: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  detailLabel: {
    fontSize: 15,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  actionButtons: {
    width: '100%',
    marginTop: 24,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 8,
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
  },
  doneButton: {
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
