import { type ReactNode } from 'react';
import { Pressable, View } from 'react-native';

import ChevronRightIcon from '@/assets/images/icons/chevron-right.svg';
import Typography from '@/components/ui/Typography';
import colors from '@/constants/colors';

interface ListRowProps {
  title: string;
  subtitle?: string;
  /** 좌측 도트/아이콘 슬롯 */
  left?: ReactNode;
  /** 있으면 눌림 가능한 행이 되고 우측에 셰브런이 붙는다. */
  onPress?: () => void;
  showDivider?: boolean;
  titleClassName?: string;
}

/** 카드 내부 리스트 행. 최소 48dp 터치 영역을 보장한다. */
export default function ListRow({
  title,
  subtitle,
  left,
  onPress,
  showDivider = false,
  titleClassName,
}: ListRowProps) {
  const rowClass = `min-h-4xl w-full flex-row items-center gap-md py-md ${
    showDivider ? 'border-b border-border' : ''
  }`;

  const content = (
    <>
      {left}
      <View className="flex-1 flex-col">
        <Typography variant="body2" className={titleClassName ?? 'font-bold text-text-primary'}>
          {title}
        </Typography>
        {subtitle != null && <Typography variant="caption">{subtitle}</Typography>}
      </View>
      {onPress != null && <ChevronRightIcon width={18} height={18} color={colors.gray[400]} />}
    </>
  );

  if (onPress == null) {
    return <View className={rowClass}>{content}</View>;
  }

  return (
    <Pressable
      accessibilityRole="button"
      className={`${rowClass} active:bg-gray-50`}
      onPress={onPress}
    >
      {content}
    </Pressable>
  );
}
