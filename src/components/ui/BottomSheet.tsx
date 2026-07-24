import { type ReactNode } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
}

/** 그랩바 + 배경 딤 + 하단 슬라이드 등장을 갖춘 바텀시트 골격. */
export default function BottomSheet({ visible, onClose, children }: BottomSheetProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      transparent
      statusBarTranslucent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="닫기"
          className="absolute inset-0 bg-black/40"
          onPress={onClose}
        />
        {/* 시트 본체만 슬라이드 업 — 딤은 Modal fade로 처리 */}
        <Animated.View entering={SlideInDown.duration(300)} style={styles.sheet}>
          <View
            className="w-full items-center rounded-t-2xl bg-white px-2xl pt-md"
            style={{ paddingBottom: insets.bottom + 24 }}
          >
            <View className="h-xs w-3xl rounded-full bg-gray-200" />
            {children}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  sheet: { width: '100%' },
});
