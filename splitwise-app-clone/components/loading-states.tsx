import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function LoadingScreen({ message = 'Loading...' }: { message?: string }) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <ThemedView style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <ThemedText style={styles.message}>{message}</ThemedText>
    </ThemedView>
  );
}

export function SkeletonCard() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.skeletonCard, { backgroundColor: colors.cardBackground }]}>
      <View style={styles.skeletonRow}>
        <View style={[styles.skeletonCircle, { backgroundColor: colors.background }]} />
        <View style={styles.skeletonContent}>
          <View style={[styles.skeletonLine, styles.skeletonLineShort, { backgroundColor: colors.background }]} />
          <View style={[styles.skeletonLine, styles.skeletonLineVeryShort, { backgroundColor: colors.background }]} />
        </View>
      </View>
    </View>
  );
}

export function SkeletonExpenseItem() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.skeletonExpenseItem, { backgroundColor: colors.cardBackground }]}>
      <View style={[styles.skeletonIconBox, { backgroundColor: colors.background }]} />
      <View style={styles.skeletonExpenseContent}>
        <View style={[styles.skeletonLine, styles.skeletonLineMedium, { backgroundColor: colors.background }]} />
        <View style={[styles.skeletonLine, styles.skeletonLineVeryShort, { backgroundColor: colors.background }]} />
      </View>
      <View style={[styles.skeletonLine, styles.skeletonLineShort, { backgroundColor: colors.background }]} />
    </View>
  );
}

export function SkeletonList({ count = 5 }: { count?: number }) {
  return (
    <View style={styles.skeletonList}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonExpenseItem key={index} />
      ))}
    </View>
  );
}

export function SkeletonGroupCard() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.skeletonGroupCard, { backgroundColor: colors.cardBackground }]}>
      <View style={styles.skeletonGroupHeader}>
        <View style={[styles.skeletonIconBox, { backgroundColor: colors.background }]} />
        <View style={styles.skeletonGroupInfo}>
          <View style={[styles.skeletonLine, styles.skeletonLineMedium, { backgroundColor: colors.background }]} />
          <View style={[styles.skeletonLine, styles.skeletonLineVeryShort, { backgroundColor: colors.background }]} />
        </View>
      </View>
      <View style={styles.skeletonGroupFooter}>
        <View style={[styles.skeletonLine, styles.skeletonLineShort, { backgroundColor: colors.background }]} />
        <View style={[styles.skeletonLine, styles.skeletonLineShort, { backgroundColor: colors.background }]} />
      </View>
    </View>
  );
}

export function SkeletonHeader() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.skeletonHeader, { backgroundColor: colors.primary }]}>
      <View style={[styles.skeletonLine, styles.skeletonLineLong, { backgroundColor: 'rgba(255, 255, 255, 0.3)' }]} />
      <View style={[styles.skeletonLine, styles.skeletonLineMedium, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    marginTop: 16,
    fontSize: 16,
  },
  skeletonCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  skeletonRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skeletonCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  skeletonContent: {
    flex: 1,
  },
  skeletonLine: {
    height: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  skeletonLineVeryShort: {
    width: '30%',
  },
  skeletonLineShort: {
    width: '40%',
  },
  skeletonLineMedium: {
    width: '60%',
  },
  skeletonLineLong: {
    width: '80%',
  },
  skeletonExpenseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  skeletonIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginRight: 12,
  },
  skeletonExpenseContent: {
    flex: 1,
  },
  skeletonList: {
    padding: 16,
  },
  skeletonGroupCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  skeletonGroupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  skeletonGroupInfo: {
    flex: 1,
  },
  skeletonGroupFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skeletonHeader: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
});
