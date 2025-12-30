import { StyleSheet, ScrollView, View, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface Friend {
  id: string;
  name: string;
  avatar: string;
  balance: number;
  status: 'owes_you' | 'you_owe' | 'settled';
}

const mockFriends: Friend[] = [
  { id: '1', name: 'Wade Howard', avatar: '👤', balance: 1052.75, status: 'owes_you' },
  { id: '2', name: 'John Smith', avatar: '👤', balance: -1052.75, status: 'you_owe' },
  { id: '3', name: 'Sarah Johnson', avatar: '👤', balance: 250.50, status: 'owes_you' },
  { id: '4', name: 'Mike Davis', avatar: '👤', balance: -88.00, status: 'you_owe' },
  { id: '5', name: 'Emily Brown', avatar: '👤', balance: 450.25, status: 'owes_you' },
  { id: '6', name: 'Lisa Anderson', avatar: '👤', balance: -125.75, status: 'you_owe' },
];

export default function SettleUpScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFriends = mockFriends.filter(
    (friend) =>
      friend.balance !== 0 &&
      friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectFriend = (friend: Friend) => {
    router.push({
      pathname: '/payment-confirmation',
      params: {
        friendId: friend.id,
        friendName: friend.name,
        amount: Math.abs(friend.balance).toString(),
        type: friend.balance > 0 ? 'receive' : 'pay',
      },
    });
  };

  const renderFriendItem = (friend: Friend) => {
    const isPositive = friend.balance > 0;

    return (
      <TouchableOpacity
        key={friend.id}
        style={[styles.friendItem, { backgroundColor: colors.cardBackground }]}
        onPress={() => handleSelectFriend(friend)}>
        <View style={styles.friendLeft}>
          <View style={[styles.avatar, { backgroundColor: colors.background }]}>
            <ThemedText style={styles.avatarText}>{friend.avatar}</ThemedText>
          </View>
          <View style={styles.friendInfo}>
            <ThemedText style={styles.friendName}>{friend.name}</ThemedText>
            <ThemedText
              style={[
                styles.statusText,
                { color: isPositive ? colors.success : colors.danger },
              ]}>
              {isPositive ? 'Owes you' : 'You owe'}
            </ThemedText>
          </View>
        </View>
        <View style={styles.friendRight}>
          <ThemedText
            style={[
              styles.balanceText,
              { color: isPositive ? colors.success : colors.danger },
            ]}>
            ${Math.abs(friend.balance).toFixed(2)}
          </ThemedText>
          <IconSymbol name="chevron.right" size={20} color={colors.tabIconDefault} />
        </View>
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
          <ThemedText style={styles.headerTitle}>Settle Up</ThemedText>
          <View style={styles.placeholder} />
        </View>
        <ThemedText style={styles.headerSubtitle}>
          Select who you want to settle with
        </ThemedText>
      </View>

      <View style={styles.content}>
        <View style={[styles.searchContainer, { backgroundColor: colors.cardBackground }]}>
          <IconSymbol name="magnifyingglass" size={20} color={colors.tabIconDefault} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search friends..."
            placeholderTextColor={colors.tabIconDefault}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>
              {filteredFriends.length} {filteredFriends.length === 1 ? 'person' : 'people'} to
              settle with
            </ThemedText>
            <View style={styles.friendsList}>
              {filteredFriends.map((friend) => renderFriendItem(friend))}
            </View>
          </View>
        </ScrollView>
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
    marginBottom: 8,
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
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    opacity: 0.7,
  },
  friendsList: {
    gap: 12,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  friendLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 24,
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  statusText: {
    fontSize: 14,
  },
  friendRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  balanceText: {
    fontSize: 18,
    fontWeight: '700',
  },
});
