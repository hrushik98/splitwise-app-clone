import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface SearchResult {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isFriend: boolean;
}

const mockSearchResults: SearchResult[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', avatar: '👩', isFriend: false },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', avatar: '👨', isFriend: true },
  { id: '3', name: 'Carol White', email: 'carol@example.com', avatar: '👩', isFriend: false },
  { id: '4', name: 'David Brown', email: 'david@example.com', avatar: '👨', isFriend: false },
];

export default function AddFriendScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      setTimeout(() => {
        const results = mockSearchResults.filter(
          (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(results);
        setIsSearching(false);
      }, 500);
    } else {
      setSearchResults([]);
    }
  };

  const handleSendRequest = (user: SearchResult) => {
    Alert.alert('Friend Request', `Send friend request to ${user.name}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Send',
        onPress: () => {
          Alert.alert('Success', 'Friend request sent!');
        },
      },
    ]);
  };

  const handleImportContacts = () => {
    Alert.alert(
      'Import Contacts',
      'This will access your contacts to find friends already using Splitwise.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Allow',
          onPress: () => {
            Alert.alert('Success', 'Contacts imported successfully!');
          },
        },
      ]
    );
  };

  const renderSearchResult = (user: SearchResult) => {
    return (
      <View key={user.id} style={[styles.resultItem, { backgroundColor: colors.cardBackground }]}>
        <View style={styles.resultLeft}>
          <View style={[styles.avatar, { backgroundColor: colors.background }]}>
            <ThemedText style={styles.avatarText}>{user.avatar}</ThemedText>
          </View>
          <View style={styles.userInfo}>
            <ThemedText style={styles.userName}>{user.name}</ThemedText>
            <ThemedText style={[styles.userEmail, { color: colors.tabIconDefault }]}>
              {user.email}
            </ThemedText>
          </View>
        </View>
        {user.isFriend ? (
          <View style={[styles.friendBadge, { backgroundColor: colors.success }]}>
            <ThemedText style={styles.friendBadgeText}>Friend</ThemedText>
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: colors.primary }]}
            onPress={() => handleSendRequest(user)}>
            <IconSymbol name="plus" size={20} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color="#fff" />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Add Friend</ThemedText>
          <View style={styles.placeholder} />
        </View>
        <ThemedText style={styles.headerSubtitle}>
          Search by email or phone number
        </ThemedText>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.searchSection}>
          <View style={[styles.searchContainer, { backgroundColor: colors.cardBackground }]}>
            <IconSymbol name="magnifyingglass" size={20} color={colors.tabIconDefault} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Email or phone number"
              placeholderTextColor={colors.tabIconDefault}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <IconSymbol name="xmark.circle.fill" size={20} color={colors.tabIconDefault} />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            style={[styles.searchButton, { backgroundColor: colors.primary }]}
            onPress={handleSearch}>
            <ThemedText style={styles.searchButtonText}>Search</ThemedText>
          </TouchableOpacity>
        </View>

        {isSearching && (
          <View style={styles.loadingContainer}>
            <ThemedText style={[styles.loadingText, { color: colors.tabIconDefault }]}>
              Searching...
            </ThemedText>
          </View>
        )}

        {!isSearching && searchResults.length > 0 && (
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>
              {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found
            </ThemedText>
            <View style={styles.resultsList}>
              {searchResults.map((user) => renderSearchResult(user))}
            </View>
          </View>
        )}

        {!isSearching && searchQuery.length > 0 && searchResults.length === 0 && (
          <View style={styles.emptyContainer}>
            <ThemedText style={styles.emptyIcon}>🔍</ThemedText>
            <ThemedText style={styles.emptyTitle}>No results found</ThemedText>
            <ThemedText style={[styles.emptySubtitle, { color: colors.tabIconDefault }]}>
              Try searching with a different email or phone number
            </ThemedText>
          </View>
        )}

        <View style={[styles.importCard, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.importHeader}>
            <View style={[styles.importIcon, { backgroundColor: colors.primary }]}>
              <IconSymbol name="person.2.fill" size={24} color="#fff" />
            </View>
            <View style={styles.importText}>
              <ThemedText style={styles.importTitle}>Import from Contacts</ThemedText>
              <ThemedText style={[styles.importSubtitle, { color: colors.tabIconDefault }]}>
                Find friends already using Splitwise
              </ThemedText>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.importButton, { backgroundColor: colors.primary }]}
            onPress={handleImportContacts}>
            <ThemedText style={styles.importButtonText}>Import Contacts</ThemedText>
            <IconSymbol name="arrow.right" size={16} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={[styles.inviteCard, { backgroundColor: colors.cardBackground }]}>
          <ThemedText style={styles.inviteTitle}>Invite Friends</ThemedText>
          <ThemedText style={[styles.inviteSubtitle, { color: colors.tabIconDefault }]}>
            Send an invitation link to friends not on Splitwise yet
          </ThemedText>
          <TouchableOpacity
            style={[styles.inviteButton, { borderColor: colors.primary }]}
            onPress={() => Alert.alert('Invite', 'Share invitation link')}>
            <IconSymbol name="square.and.arrow.up" size={20} color={colors.primary} />
            <ThemedText style={[styles.inviteButtonText, { color: colors.primary }]}>
              Share Invite Link
            </ThemedText>
          </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  searchSection: {
    padding: 16,
    gap: 12,
  },
  searchContainer: {
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
  },
  searchButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
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
  resultsList: {
    gap: 12,
  },
  resultItem: {
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
  resultLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 24,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
  },
  friendBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  friendBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  importCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  importHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  importIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  importText: {
    flex: 1,
  },
  importTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  importSubtitle: {
    fontSize: 14,
  },
  importButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  importButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  inviteCard: {
    marginHorizontal: 16,
    marginBottom: 32,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  inviteTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  inviteSubtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  inviteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    gap: 8,
  },
  inviteButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
