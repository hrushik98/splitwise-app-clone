import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';

export default function CropReceiptScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [aspectRatio, setAspectRatio] = useState<'free' | '1:1' | '4:3' | '16:9'>('free');

  const handleRotate = () => {
    console.log('Rotate image');
  };

  const handleFlip = () => {
    console.log('Flip image');
  };

  const handleReset = () => {
    console.log('Reset crop');
  };

  const handleApply = () => {
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="xmark" size={24} color="#fff" />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Crop Receipt</ThemedText>
          <TouchableOpacity onPress={handleApply}>
            <ThemedText style={styles.applyText}>Apply</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.cropArea}>
          <View style={[styles.imagePlaceholder, { backgroundColor: colors.cardBackground }]}>
            <View style={styles.cropOverlay}>
              <View style={[styles.cropFrame, { borderColor: colors.primary }]}>
                <View style={[styles.cropCorner, styles.topLeft, { borderColor: colors.primary }]} />
                <View style={[styles.cropCorner, styles.topRight, { borderColor: colors.primary }]} />
                <View style={[styles.cropCorner, styles.bottomLeft, { borderColor: colors.primary }]} />
                <View style={[styles.cropCorner, styles.bottomRight, { borderColor: colors.primary }]} />
              </View>
            </View>
            <ThemedText style={styles.placeholderText}>Drag corners to crop</ThemedText>
          </View>
        </View>

        <View style={styles.controls}>
          <View style={[styles.aspectRatioContainer, { backgroundColor: colors.cardBackground }]}>
            <ThemedText style={styles.controlsTitle}>Aspect Ratio</ThemedText>
            <View style={styles.aspectRatioButtons}>
              {(['free', '1:1', '4:3', '16:9'] as const).map((ratio) => (
                <TouchableOpacity
                  key={ratio}
                  style={[
                    styles.aspectRatioButton,
                    aspectRatio === ratio && { backgroundColor: colors.primary }
                  ]}
                  onPress={() => setAspectRatio(ratio)}>
                  <ThemedText
                    style={[
                      styles.aspectRatioText,
                      aspectRatio === ratio && { color: '#fff' }
                    ]}>
                    {ratio === 'free' ? 'Free' : ratio}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={[styles.toolsContainer, { backgroundColor: colors.cardBackground }]}>
            <TouchableOpacity style={styles.toolButton} onPress={handleRotate}>
              <View style={[styles.toolIcon, { backgroundColor: colors.primary + '20' }]}>
                <IconSymbol name="arrow.clockwise" size={24} color={colors.primary} />
              </View>
              <ThemedText style={styles.toolLabel}>Rotate</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.toolButton} onPress={handleFlip}>
              <View style={[styles.toolIcon, { backgroundColor: colors.primary + '20' }]}>
                <IconSymbol name="arrow.left.and.right" size={24} color={colors.primary} />
              </View>
              <ThemedText style={styles.toolLabel}>Flip</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.toolButton} onPress={handleReset}>
              <View style={[styles.toolIcon, { backgroundColor: colors.primary + '20' }]}>
                <IconSymbol name="arrow.counterclockwise" size={24} color={colors.primary} />
              </View>
              <ThemedText style={styles.toolLabel}>Reset</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={[styles.footer, { backgroundColor: colors.cardBackground }]}>
        <TouchableOpacity
          style={[styles.cancelButton, { borderColor: colors.tabIconDefault }]}
          onPress={() => router.back()}>
          <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.applyButton, { backgroundColor: colors.primary }]}
          onPress={handleApply}>
          <ThemedText style={styles.applyButtonText}>Apply Crop</ThemedText>
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
  applyText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  cropArea: {
    flex: 1,
    marginBottom: 24,
  },
  imagePlaceholder: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  cropOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  cropFrame: {
    width: '100%',
    height: '80%',
    borderWidth: 2,
    borderStyle: 'dashed',
    position: 'relative',
  },
  cropCorner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderWidth: 3,
  },
  topLeft: {
    top: -2,
    left: -2,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: -2,
    right: -2,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: -2,
    left: -2,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: -2,
    right: -2,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  placeholderText: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    fontSize: 14,
    opacity: 0.5,
  },
  controls: {
    gap: 16,
  },
  aspectRatioContainer: {
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  controlsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    opacity: 0.7,
  },
  aspectRatioButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  aspectRatioButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  aspectRatioText: {
    fontSize: 14,
    fontWeight: '500',
  },
  toolsContainer: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  toolButton: {
    flex: 1,
    alignItems: 'center',
  },
  toolIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  toolLabel: {
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 32,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  applyButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
