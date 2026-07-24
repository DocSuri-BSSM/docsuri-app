import { router } from 'expo-router';
import { type ReactNode } from 'react';
import { View } from 'react-native';

import BackIcon from '@/assets/images/icons/back.svg';
import IconButton from '@/components/ui/IconButton';
import Typography from '@/components/ui/Typography';
import colors from '@/constants/colors';

interface ScreenHeaderProps {
  title: string;
  /** 우측 슬롯. 없어도 타이틀 중앙 정렬을 위해 같은 폭의 빈 영역을 유지한다. */
  right?: ReactNode;
  onBack?: () => void;
}

/** 뒤로가기 + 중앙 타이틀 + 우측 슬롯 공용 헤더. */
export default function ScreenHeader({ title, right, onBack }: ScreenHeaderProps) {
  return (
    <View className="w-full flex-row items-center px-xs py-xs">
      <IconButton accessibilityLabel="뒤로 가기" onPress={onBack ?? (() => router.back())}>
        <BackIcon width={22} height={22} color={colors.gray[800]} />
      </IconButton>
      <Typography variant="body1" className="flex-1 text-center font-bold">
        {title}
      </Typography>
      <View className="size-4xl items-center justify-center">{right}</View>
    </View>
  );
}
