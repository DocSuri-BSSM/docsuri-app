import { View, type ViewProps } from 'react-native';

export interface CardProps extends ViewProps {
  className?: string;
}

/**
 * 흰 배경 공용 카드. 패딩은 호출부에서 className으로 지정한다.
 * shadow-sm은 항상 고정 — 분기 렌더로 shadow-*가 늦게 붙으면 css-interop 크래시가
 * 재발하므로(DocSlotCard 참고) 조건부로 넣지 말 것.
 */
export default function Card({ className, ...props }: CardProps) {
  return <View className={`w-full rounded-lg bg-white shadow-sm ${className ?? ''}`} {...props} />;
}
