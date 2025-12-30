import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Expense {
  id: string;
  title: string;
  date: string;
  amount: number;
  paidBy: string;
  status: 'you-owe' | 'owes-you' | 'not-involved';
  icon: string;
  iconBg: string;
}

interface OwesData {
  name: string;
  amount: number;
  avatar: string;
}

export default function GroupDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const groupName = (params.name as string) || 'Birthday House';
  const totalOwed = 1508.32;

  const owesData: OwesData[] = [
    { name: 'John', amount: 1052.75, avatar: '👤' },
    { name: 'Wade', amount: 1052.75, avatar: '👤' },
  ];

  const expenses: Expense[] = [
    {
      id: '1',
      title: "Ansh's Gift",
      date: 'Mar 26, 2024',
      amount: 200.0,
      paidBy: 'You',
      status: 'you-owe',
      icon: '🎁',
      iconBg: '#FFB6C1',
    },
    {
      id: '2',
      title: 'Trip',
      date: 'Mar 22, 2024',
      amount: 0,
      paidBy: 'Not Involved',
      status: 'not-involved',
      icon: '🚗',
      iconBg: '#B19CD9',
    },
    {
      id: '3',
      title: 'Balloons',
      date: 'Mar 21, 2024',
      amount: 30.0,
      paidBy: 'You',
      status: 'you-owe',
      icon: '🎈',
      iconBg: '#FFD700',
    },
    {
      id: '4',
      title: 'Dinning',
      date: 'Mar 20, 2024',
      amount: 120.0,
      paidBy: 'Owes you',
      status: 'owes-you',
      icon: '🍽️',
      iconBg: '#98D8C8',
    },
    {
      id: '5',
      title: 'Stationary',
      date: 'Mar 18, 2024',
      amount: 20.0,
      paidBy: 'You',
      status: 'you-owe',
      icon: '✏️',
      iconBg: '#F7CAC9',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{groupName}</Text>
        <TouchableOpacity style={styles.groupIcon}>
          <Text style={styles.groupIconText}>🏠</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>You are owed</Text>
          <Text style={styles.summaryAmount}>${totalOwed.toFixed(2)}</Text>
          <TouchableOpacity style={styles.settleButton}>
            <Text style={styles.settleButtonText}>Settle</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.owesSection}>
          <Text style={styles.sectionTitle}>Who owes whom?</Text>
          {owesData.map((person, index) => (
            <View key={index} style={styles.owesItem}>
              <View style={styles.owesLeft}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{person.avatar}</Text>
                </View>
                <Text style={styles.owesName}>{person.name} owes you</Text>
              </View>
              <Text style={styles.owesAmount}>${person.amount.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.expensesSection}>
          <View style={styles.monthHeader}>
            <Text style={styles.monthText}>Mar 2024</Text>
            <Ionicons name="calendar-outline" size={20} color="#333" />
          </View>

          {expenses.map((expense) => (
            <TouchableOpacity key={expense.id} style={styles.expenseItem}>
              <View style={[styles.expenseIcon, { backgroundColor: expense.iconBg }]}>
                <Text style={styles.expenseIconText}>{expense.icon}</Text>
              </View>
              <View style={styles.expenseDetails}>
                <Text style={styles.expenseTitle}>{expense.title}</Text>
                <Text style={styles.expenseDate}>{expense.date}</Text>
              </View>
              <View style={styles.expenseRight}>
                {expense.status === 'not-involved' ? (
                  <Text style={styles.notInvolved}>Not Involved</Text>
                ) : (
                  <>
                    <Text
                      style={[
                        styles.expenseStatus,
                        expense.status === 'you-owe'
                          ? styles.youOwe
                          : styles.owesYou,
                      ]}
                    >
                      {expense.status === 'you-owe' ? 'You Owe' : 'Owes you'}
                    </Text>
                    <Text
                      style={[
                        styles.expenseAmount,
                        expense.status === 'you-owe'
                          ? styles.youOweAmount
                          : styles.owesYouAmount,
                      ]}
                    >
                      ${expense.amount.toFixed(2)}
                    </Text>
                  </>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF7F50',
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
    flex: 1,
    textAlign: 'center',
  },
  groupIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupIconText: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
  },
  summaryCard: {
    backgroundColor: '#E8F5E9',
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  summaryAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 16,
  },
  settleButton: {
    backgroundColor: '#000',
    paddingHorizontal: 32,
    paddingVertical: 10,
    borderRadius: 20,
  },
  settleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  owesSection: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  owesItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  owesLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
  },
  owesName: {
    fontSize: 15,
    color: '#333',
  },
  owesAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  expensesSection: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    marginBottom: 8,
  },
  monthText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  expenseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  expenseIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  expenseIconText: {
    fontSize: 24,
  },
  expenseDetails: {
    flex: 1,
  },
  expenseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  expenseDate: {
    fontSize: 13,
    color: '#999',
  },
  expenseRight: {
    alignItems: 'flex-end',
  },
  expenseStatus: {
    fontSize: 12,
    marginBottom: 4,
  },
  youOwe: {
    color: '#FF6B6B',
  },
  owesYou: {
    color: '#4CAF50',
  },
  notInvolved: {
    fontSize: 13,
    color: '#999',
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  youOweAmount: {
    color: '#FF6B6B',
  },
  owesYouAmount: {
    color: '#4CAF50',
  },
});
