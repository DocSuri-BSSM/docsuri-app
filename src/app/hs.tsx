import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackIcon from '@/assets/images/icons/back.svg';
import BottomNav from '@/components/home/BottomNav';
import Button from '@/components/ui/Button';
import Typography from '@/components/ui/Typography';
import colors from '@/constants/colors';

// API 연결 전 목업 데이터
const PRODUCT_NAME = '스테인리스 진공 보온병 (이중벽, 750ml)';

const CANDIDATES: {
  code: string;
  fit: number;
  fitClass: string;
  desc: string;
  note?: string;
  recommended?: boolean;
}[] = [
  {
    code: '9617.00',
    fit: 91,
    fitClass: 'font-title text-success-500',
    desc: '진공용기(보온병) 및 그 부분품',
    recommended: true,
  },
  {
    code: '7323.93',
    fit: 58,
    fitClass: 'font-bold text-warning-500',
    desc: '스테인리스강제 식탁·주방용품',
    note: '재질 기준 분류이나, 진공 단열 구조는 본 호에서 제외됨.',
  },
  {
    code: '3924.10',
    fit: 24,
    fitClass: 'font-bold text-text-tertiary',
    desc: '플라스틱제 식탁·주방용품',
  },
];

export default function HsScreen() {
  const [selectedCode, setSelectedCode] = useState(CANDIDATES[0].code);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View className="w-full flex-row items-center px-sm py-sm">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="뒤로 가기"
          className="size-3xl items-center justify-center active:opacity-60"
          onPress={() => router.back()}
        >
          <BackIcon width={22} height={22} color={colors.gray[800]} />
        </Pressable>
        <Typography variant="body1" className="flex-1 text-center font-bold">
          HS Code 추천
        </Typography>
        <View className="w-3xl" />
      </View>

      <ScrollView style={styles.scroll} contentContainerClassName="gap-xs px-xl pb-2xl pt-sm">
        <View className="w-full flex-col gap-xs rounded-lg bg-white px-lg py-lg shadow-sm">
          <Typography variant="caption" className="text-text-secondary">
            분석한 품목
          </Typography>
          <Typography variant="body2" className="font-bold text-text-primary">
            {PRODUCT_NAME}
          </Typography>
        </View>

        <Typography variant="body2" className="mt-md font-title text-text-primary">
          추천 HS Code
        </Typography>
        <Typography variant="caption" className="text-text-secondary">
          관세율표 기반 · 적합도 순
        </Typography>

        {CANDIDATES.map(({ code, fit, fitClass, desc, note, recommended }) => {
          const isSelected = code === selectedCode;

          return (
            <Pressable
              key={code}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              className={`mt-xs w-full flex-col gap-xs rounded-lg border-2 bg-white px-lg pb-lg pt-xl shadow-sm active:opacity-80 ${
                isSelected ? 'border-primary-500' : 'border-transparent'
              }`}
              onPress={() => setSelectedCode(code)}
            >
              <View className="w-full flex-row items-center justify-between">
                <View className="flex-row items-center gap-sm">
                  <Typography variant="h4" className="font-title text-text-primary">
                    {code}
                  </Typography>
                  {recommended && (
                    <View className="rounded-sm bg-primary-50 px-sm py-xs">
                      <Typography variant="caption" className="font-title text-primary-500">
                        추천
                      </Typography>
                    </View>
                  )}
                </View>
                <Typography variant="body2" className={fitClass}>
                  적합도 {fit}%
                </Typography>
              </View>
              <Typography variant="body2" className="font-medium text-gray-600">
                {desc}
              </Typography>
              {note && (
                <Typography variant="caption" className="text-text-secondary">
                  {note}
                </Typography>
              )}
              {recommended && (
                <View className="mt-xs w-full flex-col gap-xs rounded-md bg-primary-50/50 p-md pt-lg">
                  <Typography variant="caption" className="font-title text-primary-500">
                    추천 근거
                  </Typography>
                  <Typography variant="caption" className="text-gray-600">
                    제96류 해설서상{' '}
                    <Typography variant="caption" className="font-bold text-gray-600">
                      {"'진공으로 단열된 용기'"}
                    </Typography>
                    는 제9617호로 명시 분류. 재질(스테인리스)과 무관하게{' '}
                    <Typography variant="caption" className="font-bold text-gray-600">
                      용도(보온)
                    </Typography>
                    가 본질적 특성(통칙 제3호 나목).
                  </Typography>
                </View>
              )}
            </Pressable>
          );
        })}
      </ScrollView>

      <View className="w-full border-t border-gray-50 bg-white px-xl py-lg">
        <Button
          label={`${selectedCode} 선택 · 소명 논리 생성`}
          size="lg"
          onPress={() => router.push('/rationale')}
        />
      </View>
      <BottomNav activeTab="hs" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.gray[100] },
  scroll: { flex: 1 },
});
