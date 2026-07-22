import { Pressable, View } from 'react-native';

import Typography from '@/components/ui/Typography';

interface DocSlotCardProps {
  emoji: string;
  label: string;
  fileName: string | null;
  onAdd: () => void;
}

export default function DocSlotCard({ emoji, label, fileName, onAdd }: DocSlotCardProps) {
  if (!fileName) {
    return (
      // key: 빈 슬롯 ↔ 업로드됨 전환 시 fiber 재사용을 막는다. 재사용되면 shadow-sm의
      // CSS 변수가 초기 렌더 이후에 추가되어 css-interop 업그레이드 경고 경로가 크래시한다.
      <View
        key="empty"
        className="w-full flex-row items-center gap-md rounded-lg border border-dashed border-gray-300 bg-white px-lg py-md"
      >
        <View className="size-3xl items-center justify-center rounded-md bg-gray-100">
          <Typography variant="body1">{emoji}</Typography>
        </View>
        <View className="flex-1 flex-col">
          <Typography variant="body2" className="font-bold text-gray-600">
            {label}
          </Typography>
          <Typography variant="body3" className="font-regular text-gray-400">
            아직 업로드되지 않았어요
          </Typography>
        </View>
        <Pressable accessibilityRole="button" className="active:opacity-60" onPress={onAdd}>
          <Typography variant="body2" className="font-bold text-primary-500">
            + 추가
          </Typography>
        </Pressable>
      </View>
    );
  }

  return (
    <View
      key="uploaded"
      className="w-full flex-row items-center gap-md rounded-lg bg-white px-lg py-md shadow-sm"
    >
      <View className="size-3xl items-center justify-center rounded-md bg-primary-50">
        <Typography variant="body1">{emoji}</Typography>
      </View>
      <View className="flex-1 flex-col">
        <Typography variant="body2" className="font-bold text-text-primary">
          {label}
        </Typography>
        <Typography variant="body3" className="font-regular" numberOfLines={1}>
          {fileName}
        </Typography>
      </View>
      <View className="size-2xl items-center justify-center rounded-full bg-success-500">
        <Typography variant="body3" className="font-title text-text-inverse">
          ✓
        </Typography>
      </View>
    </View>
  );
}
