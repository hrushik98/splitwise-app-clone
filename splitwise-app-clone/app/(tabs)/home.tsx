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
import { useAuth } from '../../contexts/AuthContext';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const balances = {
    youOwe: 567.58,
    owedToYou: 826.43,
  };

  const pendingBills = [
    {
      id: '1',
      name: 'Birthday House',
      date: 'Mar 24, 2025',
      amount: 4508.32,
      type: 'owe',
      icon: '🎂',
    },
    {
      id: '2',
      name: 'You and Wade',
      date: 'Mar 22, 2025',
      amount: 3005.54,
      type: 'owed',
      icon: '👥',
    },
    {
      id: '3',
      name: 'Shopping',
      date: 'Mar 24, 2025',
      amount: 505.0,
      type: 'owe',
      icon: '🛍️',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoIcon}>💰</Text>
            <Text style={styles.logoText}>Splitty</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.balanceCards}>
          <View style={[styles.balanceCard, styles.balanceCardDark]}>
            <Text style={styles.balanceAmount}>${balances.youOwe.toFixed(2)}</Text>
            <Text style={styles.balanceLabel}>You Owe</Text>
          </View>
          <View style={[styles.balanceCard, styles.balanceCardLight]}>
            <Text style={styles.balanceAmount}>${balances.owedToYou.toFixed(2)}</Text>
            <Text style={styles.balanceLabel}>Owes you</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Pending Bills</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {pendingBills.map((bill) => (
            <TouchableOpacity
              key={bill.id}
              style={styles.billCard}
              onPress={() => router.push('/group-detail')}
            >
              <View style={styles.billIconContainer}>
                <Text style={styles.billIcon}>{bill.icon}</Text>
              </View>
              <View style={styles.billInfo}>
                <Text style={styles.billName}>{bill.name}</Text>
                <Text style={styles.billDate}>{bill.date}</Text>
              </View>
              <View style={styles.billAmount}>
                <Text
                  style={[
                    styles.billAmountText,
                    bill.type === 'owe' ? styles.billOwe : styles.billOwed,
                  ]}
                >
                  {bill.type === 'owe' ? 'You Owe' : 'You are owed'}
                </Text>
                <Text
                  style={[
                    styles.billAmountValue,
                    bill.type === 'owe' ? styles.billOweValue : styles.billOwedValue,
                  ]}
                >
                  ${bill.amount.toFixed(2)}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push('/add-expense')}
            >
              <View style={styles.actionIconContainer}>
                <Ionicons name="add-circle" size={32} color="#FF6B6B" />
              </View>
              <Text style={styles.actionText}>Add Expense</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push('/settle-up')}
            >
              <View style={styles.actionIconContainer}>
                <Ionicons name="checkmark-circle" size={32} color="#4CAF50" />
              </View>
              <Text style={styles.actionText}>Settle Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push('/create-group')}
            >
              <View style={styles.actionIconContainer}>
                <Ionicons name="people" size={32} color="#2196F3" />
              </View>
              <Text style={styles.actionText}>New Group</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    fontSize: 28,
    marginRight: 8,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceCards: {
    flexDirection: 'row',
    gap: 12,
  },
  balanceCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
  },
  balanceCardDark: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  balanceCardLight: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  balanceLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  content: {
    flex: 1,
    paddingTop: 24,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  viewAllText: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  billCard: {
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
  billIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  billIcon: {
    fontSize: 24,
  },
  billInfo: {
    flex: 1,
  },
  billName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  billDate: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  billAmount: {
    alignItems: 'flex-end',
  },
  billAmountText: {
    fontSize: 11,
    marginBottom: 4,
    fontWeight: '600',
  },
  billOwe: {
    color: '#FF6B6B',
  },
  billOwed: {
    color: '#4CAF50',
  },
  billAmountValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  billOweValue: {
    color: '#FF6B6B',
  },
  billOwedValue: {
    color: '#4CAF50',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  actionIconContainer: {
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2C3E50',
    textAlign: 'center',
  },
});
