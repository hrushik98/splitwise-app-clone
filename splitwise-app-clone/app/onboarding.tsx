import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle, Path, Rect, Line } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Split Bills Easily',
    description: 'Share expenses with friends and keep track of who owes what',
    illustration: 'split',
  },
  {
    id: '2',
    title: 'Track Your Expenses',
    description: 'Monitor all your shared expenses in one place with detailed insights',
    illustration: 'track',
  },
  {
    id: '3',
    title: 'Settle Up Simply',
    description: 'Get reminders and settle debts with just a few taps',
    illustration: 'settle',
  },
];

const SplitIllustration = () => (
  <Svg width="240" height="240" viewBox="0 0 240 240">
    <Circle cx="120" cy="80" r="55" fill="#FFE5E5" />
    <Circle cx="70" cy="160" r="35" fill="#FFB3B3" />
    <Circle cx="170" cy="160" r="35" fill="#FFB3B3" />
    <Path d="M 120 80 L 70 160" stroke="#FF6B6B" strokeWidth="4" strokeDasharray="8,6" />
    <Path d="M 120 80 L 170 160" stroke="#FF6B6B" strokeWidth="4" strokeDasharray="8,6" />
    <Circle cx="120" cy="80" r="30" fill="#FF6B6B" />
    <Circle cx="70" cy="160" r="20" fill="#FF6B6B" opacity="0.8" />
    <Circle cx="170" cy="160" r="20" fill="#FF6B6B" opacity="0.8" />
  </Svg>
);

const TrackIllustration = () => (
  <Svg width="240" height="240" viewBox="0 0 240 240">
    <Rect x="40" y="60" width="160" height="140" rx="15" fill="#FFE5E5" />
    <Rect x="60" y="85" width="120" height="20" rx="8" fill="#FFB3B3" />
    <Rect x="60" y="120" width="100" height="20" rx="8" fill="#FFB3B3" />
    <Rect x="60" y="155" width="110" height="20" rx="8" fill="#FFB3B3" />
    <Circle cx="190" cy="75" r="25" fill="#FF6B6B" />
    <Path d="M 180 75 L 187 82 L 200 65" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const SettleIllustration = () => (
  <Svg width="240" height="240" viewBox="0 0 240 240">
    <Circle cx="80" cy="120" r="40" fill="#FFE5E5" />
    <Circle cx="160" cy="120" r="40" fill="#FFE5E5" />
    <Path d="M 110 120 L 130 120" stroke="#FF6B6B" strokeWidth="5" strokeLinecap="round" />
    <Path d="M 125 112 L 135 120 L 125 128" stroke="#FF6B6B" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <Circle cx="120" cy="120" r="30" fill="#FF6B6B" />
    <Path d="M 110 120 L 117 127 L 130 112" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null);
  const router = useRouter();
  const { setHasCompletedOnboarding } = useAuth();

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems[0]) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      handleGetStarted();
    }
  };

  const handleGetStarted = async () => {
    await setHasCompletedOnboarding(true);
    router.replace('/login');
  };

  const renderItem = ({ item }: any) => {
    const getIllustration = () => {
      switch (item.illustration) {
        case 'split':
          return <SplitIllustration />;
        case 'track':
          return <TrackIllustration />;
        case 'settle':
          return <SettleIllustration />;
        default:
          return null;
      }
    };

    return (
      <View style={styles.slide}>
        <View style={styles.illustrationContainer}>
          {getIllustration()}
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.skipContainer}>
        <TouchableOpacity onPress={handleGetStarted}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={slides}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((_, index) => {
            const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [10, 20, 10],
              extrapolate: 'clamp',
            });
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={index.toString()}
                style={[styles.dot, { width: dotWidth, opacity }]}
              />
            );
          })}
        </View>

        <TouchableOpacity style={styles.button} onPress={scrollTo}>
          <Text style={styles.buttonText}>
            {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  skipContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingTop: 60,
    zIndex: 10,
  },
  skipText: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  slide: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingBottom: 100,
  },
  illustrationContainer: {
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#FFF5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 48,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 17,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: 8,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 50,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF6B6B',
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
