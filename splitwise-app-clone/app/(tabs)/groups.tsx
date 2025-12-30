import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function GroupsScreen() {
  const router = useRouter();

  const groups = [
    {
      id: '1',
      name: 'Birthday House',
      date: 'Mar 24, 2025',
      amount: 4508.32,
      type: 'owe',
      icon: '🎂',
      members: 4,
    },
    {
      id: '2',
      name: 'Party Time',
      date: 'Mar 24, 2025',
      amount: 2501.32,
      type: 'owed',
      icon: '🎉',
      members: 3,
    },
    {
      id: '3',
      name: 'Shopping',
      date: 'Mar 24, 2025',
      amount: 505.0,
      type: 'owe',
      icon: '🛍️',
      members: 2,
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Groups</Text>
          <Text style={styles.headerSubtitle}>You are in {groups.length} groups</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/create-group')}
        >
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.groupsList}>
          {groups.map((group) => (
            <TouchableOpacity
              key={group.id}
              style={styles.groupCard}
              onPress={() => router.push('/group-detail')}
            >
              <View style={styles.groupIconContainer}>
                <Text style={styles.groupIcon}>{group.icon}</Text>
              </View>
              <View style={styles.groupInfo}>
                <Text style={styles.groupName}>{group.name}</Text>
                <View style={styles.groupMeta}>
                  <Ionicons name="people" size={14} color="#7F8C8D" />
                  <Text style={styles.groupMembers}>{group.members} members</Text>
                  <Text style={styles.groupDate}>• {group.date}</Text>
                </View>
              </View>
              <View style={styles.groupAmount}>
                <Text
                  style={[
                    styles.groupAmountLabel,
                    group.type === 'owe' ? styles.groupOwe : styles.groupOwed,
                  ]}
                >
                  {group.type === 'owe' ? 'You Owe' : 'You are owed'}
                </Text>
                <Text
                  style={[
                    styles.groupAmountValue,
                    group.type === 'owe' ? styles.groupOweValue : styles.groupOwedValue,
                  ]}
                >
                  ${group.amount.toFixed(2)}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.createGroupCard}
          onPress={() => router.push('/create-group')}
        >
          <View style={styles.createGroupIcon}>
            <Ionicons name="add-circle-outline" size={48} color="#FF6B6B" />
          </View>
          <Text style={styles.createGroupTitle}>Create New Group</Text>
          <Text style={styles.createGroupSubtitle}>
            Start splitting expenses with friends
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#FF6B6B',
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingTop: 24,
  },
  groupsList: {
    paddingHorizontal: 20,
  },
  groupCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  groupIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFF5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  groupIcon: {
    fontSize: 28,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 6,
  },
  groupMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupMembers: {
    fontSize: 12,
    color: '#7F8C8D',
    marginLeft: 4,
  },
  groupDate: {
    fontSize: 12,
    color: '#7F8C8D',
    marginLeft: 4,
  },
  groupAmount: {
    alignItems: 'flex-end',
  },
  groupAmountLabel: {
    fontSize: 11,
    marginBottom: 4,
    fontWeight: '600',
  },
  groupOwe: {
    color: '#FF6B6B',
  },
  groupOwed: {
    color: '#4CAF50',
  },
  groupAmountValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  groupOweValue: {
    color: '#FF6B6B',
  },
  groupOwedValue: {
    color: '#4CAF50',
  },
  createGroupCard: {
    backgroundColor: '#FFFFFF',
    padding: 32,
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  createGroupIcon: {
    marginBottom: 16,
  },
  createGroupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  createGroupSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
  },
});
