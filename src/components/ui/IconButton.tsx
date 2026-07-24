import { Pressable, type PressableProps } from 'react-native';

export interface IconButtonProps extends PressableProps {
  /** 아이콘만 있는 버튼이므로 라벨을 필수로 받는다. */
  accessibilityLabel: string;
  className?: string;
}

/** 48dp 터치 영역을 보장하는 아이콘 버튼. */
export default function IconButton({ accessibilityLabel, className, ...props }: IconButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      className={`size-4xl items-center justify-center rounded-full active:bg-gray-100 ${className ?? ''}`}
      {...props}
    />
  );
}
