import { useState } from 'react';
import { Pressable, View } from 'react-native';

import InfoIcon from '@/assets/images/icons/info.svg';
import Card from '@/components/ui/Card';
import Typography from '@/components/ui/Typography';
import colors from '@/constants/colors';

export default function GlossarySection() {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <View className="w-full flex-col gap-lg">
      <View className="w-full flex-row items-center justify-between">
        <Typography variant="h4" className="font-title">
          무역 용어 사전
        </Typography>
        <Pressable accessibilityRole="button" className="px-sm py-sm active:opacity-60">
          <Typography variant="body2" className="text-text-secondary">
            초보자 가이드
          </Typography>
        </Pressable>
      </View>

      <View className="w-full flex-col gap-md">
        <Card className="flex-row items-center justify-between p-lg">
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
            <InfoIcon width={16} height={16} color={colors.primary[600]} />
          </Pressable>
        </Card>

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
          <Card className="flex-1 flex-row items-end gap-xs px-lg py-md">
            <Typography variant="body2" className="font-bold text-text-primary">
              B/L
            </Typography>
            <Typography variant="body3" className="font-medium">
              선하증권
            </Typography>
          </Card>
          <Card className="flex-1 flex-row items-end gap-xs px-lg py-md">
            <Typography variant="body2" className="font-bold text-text-primary">
              HS Code
            </Typography>
            <Typography variant="body3" className="font-medium">
              품목분류
            </Typography>
          </Card>
        </View>
      </View>
    </View>
  );
}
