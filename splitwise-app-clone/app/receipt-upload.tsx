import { StyleSheet, ScrollView, View, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';

export default function ReceiptUploadScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleCameraPress = () => {
    console.log('Open camera');
  };

  const handleGalleryPress = () => {
    console.log('Open gallery');
  };

  const handleContinue = () => {
    if (selectedImage) {
      router.push('/image-preview' as any);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color="#fff" />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Add Receipt</ThemedText>
          <View style={styles.placeholder} />
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {!selectedImage ? (
            <>
              <View style={styles.iconContainer}>
                <View style={[styles.iconCircle, { backgroundColor: colors.primary + '20' }]}>
                  <IconSymbol name="doc.text" size={48} color={colors.primary} />
                </View>
              </View>

              <ThemedText style={styles.title}>Upload Receipt</ThemedText>
              <ThemedText style={[styles.description, { color: colors.tabIconDefault }]}>
                Add a photo of your receipt to keep track of your expenses
              </ThemedText>

              <View style={styles.optionsContainer}>
                <TouchableOpacity
                  style={[styles.optionCard, { backgroundColor: colors.cardBackground }]}
                  onPress={handleCameraPress}>
                  <View style={[styles.optionIcon, { backgroundColor: colors.primary + '20' }]}>
                    <IconSymbol name="camera" size={32} color={colors.primary} />
                  </View>
                  <ThemedText style={styles.optionTitle}>Take Photo</ThemedText>
                  <ThemedText style={[styles.optionDescription, { color: colors.tabIconDefault }]}>
                    Use your camera to capture the receipt
                  </ThemedText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.optionCard, { backgroundColor: colors.cardBackground }]}
                  onPress={handleGalleryPress}>
                  <View style={[styles.optionIcon, { backgroundColor: colors.primary + '20' }]}>
                    <IconSymbol name="photo" size={32} color={colors.primary} />
                  </View>
                  <ThemedText style={styles.optionTitle}>Choose from Gallery</ThemedText>
                  <ThemedText style={[styles.optionDescription, { color: colors.tabIconDefault }]}>
                    Select an existing photo from your device
                  </ThemedText>
                </TouchableOpacity>
              </View>

              <View style={[styles.infoCard, { backgroundColor: colors.cardBackground }]}>
                <IconSymbol name="info.circle" size={20} color={colors.primary} />
                <ThemedText style={[styles.infoText, { color: colors.tabIconDefault }]}>
                  Supported formats: JPG, PNG, PDF. Max size: 10MB
                </ThemedText>
              </View>
            </>
          ) : (
            <>
              <View style={styles.previewContainer}>
                <View style={[styles.imagePreview, { backgroundColor: colors.cardBackground }]}>
                  <ThemedText style={styles.previewPlaceholder}>Receipt Preview</ThemedText>
                </View>
                <TouchableOpacity
                  style={styles.changeButton}
                  onPress={() => setSelectedImage(null)}>
                  <IconSymbol name="arrow.clockwise" size={20} color={colors.primary} />
                  <ThemedText style={[styles.changeButtonText, { color: colors.primary }]}>
                    Change Photo
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {selectedImage && (
        <View style={[styles.footer, { backgroundColor: colors.cardBackground }]}>
          <TouchableOpacity
            style={[styles.continueButton, { backgroundColor: colors.primary }]}
            onPress={handleContinue}>
            <ThemedText style={styles.continueButtonText}>Continue</ThemedText>
          </TouchableOpacity>
        </View>
      )}
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
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 32,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  optionsContainer: {
    gap: 16,
    marginBottom: 24,
  },
  optionCard: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  optionIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  infoCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  previewContainer: {
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 400,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  previewPlaceholder: {
    fontSize: 16,
    opacity: 0.5,
  },
  changeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  changeButtonText: {
    fontSize: 16,
    fontWeight: '600',
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
  continueButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
