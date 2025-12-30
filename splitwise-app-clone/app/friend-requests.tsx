import { StyleSheet, ScrollView, View, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface FriendRequest {
  id: string;
  name: string;
  email: string;
  avatar: string;
  date: string;
  mutualFriends: number;
}

const mockRequests: FriendRequest[] = [
  {
    id: '1',
    name: 'Jessica Parker',
    email: 'jessica@example.com',
    avatar: '👩',
    date: '2 days ago',
    mutualFriends: 3,
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael@example.com',
    avatar: '👨',
    date: '5 days ago',
    mutualFriends: 1,
  },
  {
    id: '3',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    avatar: '👩',
    date: '1 week ago',
    mutualFriends: 5,
  },
  {
    id: '4',
    name: 'Ryan Martinez',
    email: 'ryan@example.com',
    avatar: '👨',
    date: '2 weeks ago',
    mutualFriends: 0,
  },
];

export default function FriendRequestsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [requests, setRequests] = useState<FriendRequest[]>(mockRequests);

  const handleAccept = (request: FriendRequest) => {
    Alert.alert('Accept Request', `Accept friend request from ${request.name}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Accept',
        onPress: () => {
          setRequests(requests.filter((r) => r.id !== request.id));
          Alert.alert('Success', `You are now friends with ${request.name}!`);
        },
      },
    ]);
  };

  const handleDecline = (request: FriendRequest) => {
    Alert.alert('Decline Request', `Decline friend request from ${request.name}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Decline',
        style: 'destructive',
        onPress: () => {
          setRequests(requests.filter((r) => r.id !== request.id));
          Alert.alert('Declined', 'Friend request declined');
        },
      },
    ]);
  };

  const renderRequestItem = (request: FriendRequest) => {
    return (
      <View key={request.id} style={[styles.requestItem, { backgroundColor: colors.cardBackground }]}>
        <View style={styles.requestHeader}>
          <View style={styles.requestLeft}>
            <View style={[styles.avatar, { backgroundColor: colors.background }]}>
              <ThemedText style={styles.avatarText}>{request.avatar}</ThemedText>
            </View>
            <View style={styles.requestInfo}>
              <ThemedText style={styles.requestName}>{request.name}</ThemedText>
              <ThemedText style={[styles.requestEmail, { color: colors.tabIconDefault }]}>
                {request.email}
              </ThemedText>
              <View style={styles.metaRow}>
                <ThemedText style={[styles.metaText, { color: colors.tabIconDefault }]}>
                  {request.date}
                </ThemedText>
                {request.mutualFriends > 0 && (
                  <>
                    <ThemedText style={[styles.metaDot, { color: colors.tabIconDefault }]}>
                      •
                    </ThemedText>
                    <ThemedText style={[styles.metaText, { color: colors.tabIconDefault }]}>
                      {request.mutualFriends} mutual{' '}
                      {request.mutualFriends === 1 ? 'friend' : 'friends'}
                    </ThemedText>
                  </>
                )}
              </View>
            </View>
          </View>
        </View>

        <View style={styles.requestActions}>
          <TouchableOpacity
            style={[styles.acceptButton, { backgroundColor: colors.primary }]}
            onPress={() => handleAccept(request)}>
            <IconSymbol name="checkmark" size={20} color="#fff" />
            <ThemedText style={styles.acceptButtonText}>Accept</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.declineButton, { backgroundColor: colors.background }]}
            onPress={() => handleDecline(request)}>
            <IconSymbol name="xmark" size={20} color={colors.text} />
            <ThemedText style={styles.declineButtonText}>Decline</ThemedText>
          </TouchableOpacity>
        </View>
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
          <ThemedText style={styles.headerTitle}>Friend Requests</ThemedText>
          <View style={styles.placeholder} />
        </View>
        {requests.length > 0 && (
          <ThemedText style={styles.headerSubtitle}>
            {requests.length} pending {requests.length === 1 ? 'request' : 'requests'}
          </ThemedText>
        )}
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {requests.length > 0 ? (
          <View style={styles.section}>
            <View style={styles.requestsList}>{requests.map(renderRequestItem)}</View>
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <View style={[styles.emptyIcon, { backgroundColor: colors.cardBackground }]}>
              <IconSymbol name="person.2.fill" size={48} color={colors.tabIconDefault} />
            </View>
            <ThemedText style={styles.emptyTitle}>No Friend Requests</ThemedText>
            <ThemedText style={[styles.emptySubtitle, { color: colors.tabIconDefault }]}>
              When someone sends you a friend request, it will appear here
            </ThemedText>
            <TouchableOpacity
              style={[styles.addFriendButton, { backgroundColor: colors.primary }]}
              onPress={() => router.push('/add-friend')}>
              <IconSymbol name="plus" size={20} color="#fff" />
              <ThemedText style={styles.addFriendButtonText}>Add Friends</ThemedText>
            </TouchableOpacity>
          </View>
        )}

        <View style={[styles.suggestionCard, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.suggestionHeader}>
            <IconSymbol name="sparkles" size={24} color={colors.primary} />
            <ThemedText style={styles.suggestionTitle}>Find Friends</ThemedText>
          </View>
          <ThemedText style={[styles.suggestionText, { color: colors.tabIconDefault }]}>
            Discover people you may know or import contacts to find friends already using Splitwise
          </ThemedText>
          <TouchableOpacity
            style={[styles.suggestionButton, { borderColor: colors.primary }]}
            onPress={() => router.push('/add-friend')}>
            <ThemedText style={[styles.suggestionButtonText, { color: colors.primary }]}>
              Find Friends
            </ThemedText>
            <IconSymbol name="arrow.right" size={16} color={colors.primary} />
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
  section: {
    padding: 16,
  },
  requestsList: {
    gap: 16,
  },
  requestItem: {
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  requestHeader: {
    marginBottom: 16,
  },
  requestLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 28,
  },
  requestInfo: {
    flex: 1,
  },
  requestName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  requestEmail: {
    fontSize: 14,
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 13,
  },
  metaDot: {
    fontSize: 13,
  },
  requestActions: {
    flexDirection: 'row',
    gap: 12,
  },
  acceptButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    gap: 8,
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  declineButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    gap: 8,
  },
  declineButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  addFriendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  addFriendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  suggestionCard: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 32,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  suggestionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  suggestionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  suggestionText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  suggestionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 2,
    gap: 8,
  },
  suggestionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
