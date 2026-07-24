import { type ReactNode } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface StickyFooterProps {
  children: ReactNode;
  /** 아래에 BottomNav가 이어지는 화면에서는 false로 — 인셋은 BottomNav가 처리한다. */
  inset?: boolean;
  className?: string;
}

/**
 * 하단 고정 CTA 컨테이너. 화면이 SafeAreaView edges={['top']}을 쓰므로
 * 제스처 내비게이션 영역만큼의 하단 패딩을 여기서 보정한다.
 */
export default function StickyFooter({ children, inset = true, className }: StickyFooterProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className={`w-full border-t border-border bg-white px-xl pt-md ${className ?? ''}`}
      style={{ paddingBottom: inset ? insets.bottom + 12 : 12 }}
    >
      {children}
    </View>
  );
}
