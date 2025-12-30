import { StyleSheet, View, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface ConfirmationModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'danger' | 'warning' | 'info';
}

export function ConfirmationModal({
  visible,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  type = 'info',
}: ConfirmationModalProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const iconName = type === 'danger' ? 'trash' : type === 'warning' ? 'exclamationmark.triangle' : 'info.circle';
  const iconColor = type === 'danger' ? colors.danger : type === 'warning' ? '#FF9500' : colors.primary;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: colors.cardBackground }]}>
          <View style={[styles.modalIcon, { backgroundColor: iconColor + '20' }]}>
            <IconSymbol name={iconName as any} size={32} color={iconColor} />
          </View>
          
          <ThemedText style={styles.modalTitle}>{title}</ThemedText>
          <ThemedText style={[styles.modalMessage, { color: colors.tabIconDefault }]}>
            {message}
          </ThemedText>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton, { backgroundColor: colors.background }]}
              onPress={onCancel}>
              <ThemedText style={styles.cancelButtonText}>{cancelText}</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.modalButton,
                styles.confirmButton,
                { backgroundColor: type === 'danger' ? colors.danger : colors.primary }
              ]}
              onPress={onConfirm}>
              <ThemedText style={styles.confirmButtonText}>{confirmText}</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export function DeleteExpenseModal({
  visible,
  onConfirm,
  onCancel,
}: {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <ConfirmationModal
      visible={visible}
      title="Delete Expense"
      message="Are you sure you want to delete this expense? This action cannot be undone."
      confirmText="Delete"
      cancelText="Cancel"
      onConfirm={onConfirm}
      onCancel={onCancel}
      type="danger"
    />
  );
}

export function DeleteGroupModal({
  visible,
  onConfirm,
  onCancel,
}: {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <ConfirmationModal
      visible={visible}
      title="Delete Group"
      message="Are you sure you want to delete this group? All expenses and history will be permanently removed."
      confirmText="Delete Group"
      cancelText="Cancel"
      onConfirm={onConfirm}
      onCancel={onCancel}
      type="danger"
    />
  );
}

export function LeaveGroupModal({
  visible,
  onConfirm,
  onCancel,
}: {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <ConfirmationModal
      visible={visible}
      title="Leave Group"
      message="Are you sure you want to leave this group? Make sure all balances are settled before leaving."
      confirmText="Leave"
      cancelText="Cancel"
      onConfirm={onConfirm}
      onCancel={onCancel}
      type="warning"
    />
  );
}

interface LoadingModalProps {
  visible: boolean;
  message?: string;
}

export function LoadingModal({ visible, message = 'Loading...' }: LoadingModalProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={[styles.loadingContent, { backgroundColor: colors.cardBackground }]}>
          <ActivityIndicator size="large" color={colors.primary} />
          <ThemedText style={styles.loadingText}>{message}</ThemedText>
        </View>
      </View>
    </Modal>
  );
}

interface ErrorModalProps {
  visible: boolean;
  title?: string;
  message: string;
  onDismiss: () => void;
}

export function ErrorModal({
  visible,
  title = 'Error',
  message,
  onDismiss,
}: ErrorModalProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: colors.cardBackground }]}>
          <View style={[styles.modalIcon, { backgroundColor: colors.danger + '20' }]}>
            <IconSymbol name="xmark.circle" size={32} color={colors.danger} />
          </View>
          
          <ThemedText style={styles.modalTitle}>{title}</ThemedText>
          <ThemedText style={[styles.modalMessage, { color: colors.tabIconDefault }]}>
            {message}
          </ThemedText>

          <TouchableOpacity
            style={[styles.fullButton, { backgroundColor: colors.primary }]}
            onPress={onDismiss}>
            <ThemedText style={styles.confirmButtonText}>OK</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

interface SuccessModalProps {
  visible: boolean;
  title: string;
  message: string;
  onDismiss: () => void;
}

export function SuccessModal({
  visible,
  title,
  message,
  onDismiss,
}: SuccessModalProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: colors.cardBackground }]}>
          <View style={[styles.modalIcon, { backgroundColor: colors.success + '20' }]}>
            <IconSymbol name="checkmark.circle" size={32} color={colors.success} />
          </View>
          
          <ThemedText style={styles.modalTitle}>{title}</ThemedText>
          <ThemedText style={[styles.modalMessage, { color: colors.tabIconDefault }]}>
            {message}
          </ThemedText>

          <TouchableOpacity
            style={[styles.fullButton, { backgroundColor: colors.primary }]}
            onPress={onDismiss}>
            <ThemedText style={styles.confirmButtonText}>Done</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  modalIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  confirmButton: {},
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  fullButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  loadingContent: {
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  loadingText: {
    fontSize: 16,
    marginTop: 16,
  },
});
