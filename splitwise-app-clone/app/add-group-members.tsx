import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Friend {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

const MOCK_FRIENDS: Friend[] = [
  { id: '1', name: 'Wade Howard', email: 'wade@example.com', avatar: '👤' },
  { id: '2', name: 'Guy Warren', email: 'guy@example.com', avatar: '👤' },
  { id: '3', name: 'John Smith', email: 'john@example.com', avatar: '👤' },
  { id: '4', name: 'Sarah Johnson', email: 'sarah@example.com', avatar: '👤' },
  { id: '5', name: 'Mike Davis', email: 'mike@example.com', avatar: '👤' },
  { id: '6', name: 'Emily Brown', email: 'emily@example.com', avatar: '👤' },
  { id: '7', name: 'David Wilson', email: 'david@example.com', avatar: '👤' },
  { id: '8', name: 'Lisa Anderson', email: 'lisa@example.com', avatar: '👤' },
];

export default function AddGroupMembersScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const groupName = (params.groupName as string) || 'New Group';
  const groupIcon = (params.icon as string) || '🏠';
  const groupColor = (params.color as string) || '#FF7F50';

  const filteredFriends = MOCK_FRIENDS.filter(
    (friend) =>
      friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleMember = (id: string) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((memberId) => memberId !== id) : [...prev, id]
    );
  };

  const handleCreateGroup = () => {
    router.push('/');
  };

  const renderFriendItem = ({ item }: { item: Friend }) => {
    const isSelected = selectedMembers.includes(item.id);
    
    return (
      <TouchableOpacity
        style={styles.friendItem}
        onPress={() => toggleMember(item.id)}
      >
        <View style={styles.friendLeft}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{item.avatar}</Text>
          </View>
          <View style={styles.friendInfo}>
            <Text style={styles.friendName}>{item.name}</Text>
            <Text style={styles.friendEmail}>{item.email}</Text>
          </View>
        </View>
        <View
          style={[
            styles.checkbox,
            isSelected && styles.checkboxSelected,
          ]}
        >
          {isSelected && <Ionicons name="checkmark" size={18} color="#fff" />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: groupColor }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{groupName}</Text>
          <Text style={styles.headerSubtitle}>Add Members</Text>
        </View>
        <View style={styles.groupIconSmall}>
          <Text style={styles.groupIconText}>{groupIcon}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search friends by name or email"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {selectedMembers.length > 0 && (
          <View style={styles.selectedSection}>
            <Text style={styles.selectedText}>
              {selectedMembers.length} member{selectedMembers.length !== 1 ? 's' : ''} selected
            </Text>
          </View>
        )}

        <FlatList
          data={filteredFriends}
          renderItem={renderFriendItem}
          keyExtractor={(item) => item.id}
          style={styles.friendsList}
          contentContainerStyle={styles.friendsListContent}
        />

        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.createButton,
              selectedMembers.length === 0 && styles.createButtonDisabled,
            ]}
            onPress={handleCreateGroup}
            disabled={selectedMembers.length === 0}
          >
            <Text style={styles.createButtonText}>
              Create Group ({selectedMembers.length})
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  groupIconSmall: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupIconText: {
    fontSize: 18,
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: '#333',
  },
  selectedSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
  },
  selectedText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  friendsList: {
    flex: 1,
  },
  friendsListContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  friendLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  friendEmail: {
    fontSize: 13,
    color: '#999',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  createButton: {
    backgroundColor: '#000',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  createButtonDisabled: {
    backgroundColor: '#ccc',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
