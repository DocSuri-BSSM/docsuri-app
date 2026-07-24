import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CheckIcon from '@/assets/images/icons/check.svg';
import BottomNav from '@/components/home/BottomNav';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ScreenHeader from '@/components/ui/ScreenHeader';
import SectionTitle from '@/components/ui/SectionTitle';
import StickyFooter from '@/components/ui/StickyFooter';
import Typography from '@/components/ui/Typography';
import colors from '@/constants/colors';

// API 연결 전 목업 데이터 (입력 화면에서 넘어오지 않았을 때의 기본값)
const FALLBACK_PRODUCT_NAME = '스테인리스 진공 보온병 (이중벽, 750ml)';

const CANDIDATES: {
  code: string;
  fit: number;
  desc: string;
  note?: string;
  recommended?: boolean;
}[] = [
  {
    code: '9617.00',
    fit: 91,
    desc: '진공용기(보온병) 및 그 부분품',
    recommended: true,
  },
  {
    code: '7323.93',
    fit: 58,
    desc: '스테인리스강제 식탁·주방용품',
    note: '재질 기준 분류이나, 진공 단열 구조는 본 호에서 제외됨.',
  },
  {
    code: '3924.10',
    fit: 24,
    desc: '플라스틱제 식탁·주방용품',
  },
];

// 적합도 구간 → 텍스트·게이지 색 (높음/중간/낮음)
function fitLevel(fit: number): 'high' | 'mid' | 'low' {
  if (fit >= 80) return 'high';
  if (fit >= 50) return 'mid';
  return 'low';
}

const FIT_TEXT_CLASS: Record<'high' | 'mid' | 'low', string> = {
  high: 'font-title text-success-700',
  mid: 'font-bold text-warning-700',
  low: 'font-bold text-text-tertiary',
};

const FIT_BAR_CLASS: Record<'high' | 'mid' | 'low', string> = {
  high: 'bg-success-500',
  mid: 'bg-warning-500',
  low: 'bg-gray-300',
};

export default function HsScreen() {
  const { query } = useLocalSearchParams<{ query?: string }>();
  const productName = query?.trim() || FALLBACK_PRODUCT_NAME;
  const [selectedCode, setSelectedCode] = useState(CANDIDATES[0].code);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScreenHeader title="HS Code 추천" />

      <ScrollView style={styles.scroll} contentContainerClassName="gap-xs px-xl pb-2xl pt-sm">
        <Card className="flex-col gap-xs px-lg py-lg">
          <Typography variant="caption">분석한 품목</Typography>
          <Typography variant="body2" className="font-bold text-text-primary">
            {productName}
          </Typography>
        </Card>

        <SectionTitle className="mt-md">추천 HS Code</SectionTitle>
        <Typography variant="caption">관세율표 기반 · 적합도 순</Typography>

        {CANDIDATES.map(({ code, fit, desc, note, recommended }) => {
          const isSelected = code === selectedCode;
          const level = fitLevel(fit);

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
                  {/* 선택 라디오 — 테두리만으로는 약한 선택 상태를 명확히 */}
                  <View
                    className={`size-xl items-center justify-center rounded-full ${
                      isSelected ? 'bg-primary-600' : 'border-2 border-gray-300 bg-white'
                    }`}
                  >
                    {isSelected && <CheckIcon width={12} height={12} color={colors.white} />}
                  </View>
                  <Typography variant="h4" className="font-title text-text-primary">
                    {code}
                  </Typography>
                  {recommended && <Badge label="추천" variant="info" />}
                </View>
                <View className="flex-col items-end gap-xs">
                  <Typography variant="body2" className={FIT_TEXT_CLASS[level]}>
                    적합도 {fit}%
                  </Typography>
                  <View className="h-xs w-4xl overflow-hidden rounded-full bg-gray-100">
                    <View
                      className={`h-full rounded-full ${FIT_BAR_CLASS[level]}`}
                      style={{ width: `${fit}%` }}
                    />
                  </View>
                </View>
              </View>
              <Typography variant="body2" className="font-medium text-gray-600">
                {desc}
              </Typography>
              {note && <Typography variant="caption">{note}</Typography>}
              {recommended && isSelected && (
                <View className="mt-xs w-full flex-col gap-xs rounded-md bg-primary-50/50 p-md pt-lg">
                  <Typography variant="caption" className="font-title text-primary-600">
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

      <StickyFooter inset={false}>
        <Button
          label={`${selectedCode} 선택 · 소명 논리 생성`}
          size="lg"
          onPress={() => router.push('/rationale')}
        />
      </StickyFooter>
      <BottomNav activeTab="hs" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  scroll: { flex: 1 },
});
