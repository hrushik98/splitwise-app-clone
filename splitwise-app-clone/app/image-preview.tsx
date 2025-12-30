import { StyleSheet, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';

export default function ImagePreviewScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [scale, setScale] = useState(1);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.5, 1));
  };

  const handleCrop = () => {
    router.push('/crop-receipt' as any);
  };

  const handleSave = () => {
    router.back();
  };

  const handleDelete = () => {
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color="#fff" />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Receipt Preview</ThemedText>
          <TouchableOpacity onPress={handleDelete}>
            <IconSymbol name="trash" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <View
            style={[
              styles.imagePlaceholder,
              { backgroundColor: colors.cardBackground, transform: [{ scale }] }
            ]}>
            <ThemedText style={styles.placeholderText}>Receipt Image</ThemedText>
            <ThemedText style={[styles.placeholderSubtext, { color: colors.tabIconDefault }]}>
              Full size preview
            </ThemedText>
          </View>
        </View>

        <View style={styles.controls}>
          <View style={[styles.controlsCard, { backgroundColor: colors.cardBackground }]}>
            <TouchableOpacity style={styles.controlButton} onPress={handleZoomOut}>
              <IconSymbol name="minus.magnifyingglass" size={24} color={colors.primary} />
              <ThemedText style={styles.controlLabel}>Zoom Out</ThemedText>
            </TouchableOpacity>
            
            <View style={styles.controlDivider} />
            
            <TouchableOpacity style={styles.controlButton} onPress={handleZoomIn}>
              <IconSymbol name="plus.magnifyingglass" size={24} color={colors.primary} />
              <ThemedText style={styles.controlLabel}>Zoom In</ThemedText>
            </TouchableOpacity>
            
            <View style={styles.controlDivider} />
            
            <TouchableOpacity style={styles.controlButton} onPress={handleCrop}>
              <IconSymbol name="crop" size={24} color={colors.primary} />
              <ThemedText style={styles.controlLabel}>Crop</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.infoCard, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.infoRow}>
            <ThemedText style={[styles.infoLabel, { color: colors.tabIconDefault }]}>
              File Size
            </ThemedText>
            <ThemedText style={styles.infoValue}>2.4 MB</ThemedText>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.infoRow}>
            <ThemedText style={[styles.infoLabel, { color: colors.tabIconDefault }]}>
              Dimensions
            </ThemedText>
            <ThemedText style={styles.infoValue}>1920 × 1080</ThemedText>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.infoRow}>
            <ThemedText style={[styles.infoLabel, { color: colors.tabIconDefault }]}>
              Format
            </ThemedText>
            <ThemedText style={styles.infoValue}>JPEG</ThemedText>
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: colors.cardBackground }]}>
        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: colors.primary }]}
          onPress={handleSave}>
          <IconSymbol name="checkmark" size={20} color="#fff" />
          <ThemedText style={styles.saveButtonText}>Save Receipt</ThemedText>
        </TouchableOpacity>
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
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  imagePlaceholder: {
    width: '100%',
    height: 400,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  placeholderSubtext: {
    fontSize: 14,
  },
  controls: {
    marginBottom: 24,
  },
  controlsCard: {
    flexDirection: 'row',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  controlButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
  },
  controlLabel: {
    fontSize: 12,
    marginTop: 8,
  },
  controlDivider: {
    width: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  infoCard: {
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 16,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  infoDivider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  bottomPadding: {
    height: 100,
  },
  footer: {
    padding: 16,
    paddingBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
