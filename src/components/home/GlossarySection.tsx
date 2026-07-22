import { useState } from 'react';
import { Pressable, View } from 'react-native';

import Typography from '@/components/ui/Typography';

export default function GlossarySection() {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <View className="w-full flex-col gap-lg">
      <View className="w-full flex-row items-center justify-between">
        <Typography variant="h4" className="font-title">
          무역 용어 사전
        </Typography>
        <Pressable accessibilityRole="button" className="active:opacity-60">
          <Typography variant="body2" className="text-text-secondary">
            초보자 가이드
          </Typography>
        </Pressable>
      </View>

      <View className="w-full flex-col gap-md">
        <View className="w-full flex-row items-center justify-between rounded-lg bg-white p-lg shadow-sm">
          <Typography variant="body1" className="font-bold">
            Invoice{' '}
            <Typography variant="body1" className="font-medium text-text-secondary">
              (상업송장)
            </Typography>
          </Typography>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Invoice 설명 보기"
            className="size-2xl items-center justify-center rounded-full bg-primary-50 active:opacity-60"
            onPress={() => setTooltipOpen((prev) => !prev)}
          >
            <Typography variant="body3" className="font-title text-primary-500">
              i
            </Typography>
          </Pressable>
        </View>

        {tooltipOpen && (
          <View className="relative z-10 w-full">
            <View className="absolute left-0 right-0 top-0 rounded-lg bg-gray-800 px-lg py-md shadow-lg">
              <View className="absolute -top-xs left-2xl size-md rotate-45 bg-gray-800" />
              <Typography variant="body3" className="text-text-inverse">
                수출자가 발행하는{' '}
                <Typography variant="body3" className="font-bold text-text-inverse">
                  거래 명세서
                </Typography>
                로 품명·수량·단가·금액이 적혀 있어요. 검수의 기준 서류가 됩니다.
              </Typography>
            </View>
          </View>
        )}

        <View className="w-full flex-row gap-md">
          <View className="flex-1 flex-row items-end gap-xs rounded-lg bg-white px-lg py-md shadow-sm">
            <Typography variant="body2" className="font-bold text-text-primary">
              B/L
            </Typography>
            <Typography variant="body3" className="font-medium">
              선하증권
            </Typography>
          </View>
          <View className="flex-1 flex-row items-end gap-xs rounded-lg bg-white px-lg py-md shadow-sm">
            <Typography variant="body2" className="font-bold text-text-primary">
              HS Code
            </Typography>
            <Typography variant="body3" className="font-medium">
              품목분류
            </Typography>
          </View>
        </View>
      </View>
    </View>
  );
}
