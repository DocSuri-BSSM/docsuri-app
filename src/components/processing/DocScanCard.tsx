import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import colors from '@/constants/colors';

const SCAN_HEIGHT = 64;

/** 서류 스켈레톤 위로 스캔 라인이 내려가는 목업 카드. */
export default function DocScanCard() {
  const [cardHeight, setCardHeight] = useState(0);
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 2400, easing: Easing.inOut(Easing.ease) }),
      -1,
      false,
    );
  }, [progress]);

  const scanStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateY: progress.value * Math.max(cardHeight - SCAN_HEIGHT, 0) }],
    }),
    [cardHeight],
  );

  return (
    <View
      className="w-full overflow-hidden rounded-lg bg-white px-xl pb-4xl pt-3xl shadow-sm"
      onLayout={(e) => setCardHeight(e.nativeEvent.layout.height)}
    >
      <View className="h-md w-1/2 rounded-xs bg-gray-100" />
      <View className="mt-md h-sm w-4/5 rounded-xs bg-gray-100" />
      <View className="mt-md h-sm w-2/3 rounded-xs bg-gray-100" />
      <View className="mt-md h-sm w-5/6 rounded-xs bg-gray-100" />
      <View className="mt-md h-sm w-3/5 rounded-xs bg-gray-100" />
      <Animated.View pointerEvents="none" style={[styles.scan, scanStyle]}>
        <Svg width="100%" height="100%">
          <Defs>
            <LinearGradient id="scanFade" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={colors.primary[500]} stopOpacity="0" />
              <Stop offset="1" stopColor={colors.primary[500]} stopOpacity="0.18" />
            </LinearGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#scanFade)" />
        </Svg>
        <View style={styles.scanLine} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  scan: { position: 'absolute', left: 0, right: 0, top: 0, height: SCAN_HEIGHT },
  scanLine: { height: 2, backgroundColor: colors.primary[500] },
});
