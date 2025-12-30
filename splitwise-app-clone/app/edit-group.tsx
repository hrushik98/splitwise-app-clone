import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const GROUP_ICONS = ['🏠', '✈️', '🎉', '❤️', '🍔', '🎬', '🏖️', '🎓', '💼', '🎮', '🏃', '🎵'];

const GROUP_COLORS = [
  '#FF7F50',
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#96CEB4',
  '#FFEAA7',
  '#DFE6E9',
  '#A29BFE',
  '#FD79A8',
  '#FDCB6E',
  '#6C5CE7',
  '#00B894',
];

interface Member {
  id: string;
  name: string;
  avatar: string;
}

const MOCK_MEMBERS: Member[] = [
  { id: '1', name: 'You', avatar: '👤' },
  { id: '2', name: 'John Smith', avatar: '👤' },
  { id: '3', name: 'Wade Howard', avatar: '👤' },
  { id: '4', name: 'Sarah Johnson', avatar: '👤' },
];

export default function EditGroupScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [groupName, setGroupName] = useState((params.name as string) || 'Birthday House');
  const [selectedIcon, setSelectedIcon] = useState((params.icon as string) || '🏠');
  const [selectedColor, setSelectedColor] = useState((params.color as string) || '#FF7F50');
  const [members, setMembers] = useState<Member[]>(MOCK_MEMBERS);

  const handleSave = () => {
    if (groupName.trim()) {
      Alert.alert('Success', 'Group updated successfully', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    }
  };

  const handleRemoveMember = (memberId: string) => {
    const member = members.find((m) => m.id === memberId);
    if (member?.name === 'You') {
      Alert.alert('Cannot Remove', 'You cannot remove yourself from the group');
      return;
    }

    Alert.alert(
      'Remove Member',
      `Are you sure you want to remove ${member?.name} from the group?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => setMembers(members.filter((m) => m.id !== memberId)),
        },
      ]
    );
  };

  const handleAddMembers = () => {
    router.push('/add-group-members');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: selectedColor }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="close" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Group</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.iconPreview}>
          <View style={[styles.iconPreviewCircle, { backgroundColor: 'rgba(255,255,255,0.3)' }]}>
            <Text style={styles.iconPreviewText}>{selectedIcon}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Group Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter group name"
            placeholderTextColor="#999"
            value={groupName}
            onChangeText={setGroupName}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Choose Icon</Text>
          <View style={styles.iconGrid}>
            {GROUP_ICONS.map((icon) => (
              <TouchableOpacity
                key={icon}
                style={[
                  styles.iconOption,
                  selectedIcon === icon && styles.iconOptionSelected,
                ]}
                onPress={() => setSelectedIcon(icon)}
              >
                <Text style={styles.iconOptionText}>{icon}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Choose Color</Text>
          <View style={styles.colorGrid}>
            {GROUP_COLORS.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorOption,
                  { backgroundColor: color },
                  selectedColor === color && styles.colorOptionSelected,
                ]}
                onPress={() => setSelectedColor(color)}
              >
                {selectedColor === color && (
                  <Ionicons name="checkmark" size={20} color="#fff" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.membersHeader}>
            <Text style={styles.label}>Members ({members.length})</Text>
            <TouchableOpacity onPress={handleAddMembers} style={styles.addButton}>
              <Ionicons name="add-circle" size={24} color="#FF7F50" />
            </TouchableOpacity>
          </View>

          {members.map((member) => (
            <View key={member.id} style={styles.memberItem}>
              <View style={styles.memberLeft}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{member.avatar}</Text>
                </View>
                <Text style={styles.memberName}>{member.name}</Text>
              </View>
              {member.name !== 'You' && (
                <TouchableOpacity
                  onPress={() => handleRemoveMember(member.id)}
                  style={styles.removeButton}
                >
                  <Ionicons name="close-circle" size={24} color="#FF6B6B" />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => router.push('/group-settings')}
        >
          <Ionicons name="settings-outline" size={20} color="#666" />
          <Text style={styles.settingsButtonText}>Group Settings</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      </ScrollView>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  saveButton: {
    padding: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
  },
  iconPreview: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: -40,
  },
  iconPreviewCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#fff',
  },
  iconPreviewText: {
    fontSize: 40,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 32,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  iconOption: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  iconOptionSelected: {
    borderColor: '#FF7F50',
    backgroundColor: '#FFF5F0',
  },
  iconOptionText: {
    fontSize: 28,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'transparent',
  },
  colorOptionSelected: {
    borderColor: '#333',
  },
  membersHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  addButton: {
    padding: 4,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  memberLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
  },
  memberName: {
    fontSize: 16,
    color: '#333',
  },
  removeButton: {
    padding: 4,
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    marginBottom: 32,
  },
  settingsButtonText: {
    flex: 1,
    fontSize: 16,
    color: '#666',
    marginLeft: 12,
  },
});
