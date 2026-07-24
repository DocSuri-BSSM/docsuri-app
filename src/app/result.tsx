import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackIcon from '@/assets/images/icons/back.svg';
import BottomNav from '@/components/home/BottomNav';
import TrafficLight, { type Severity } from '@/components/result/TrafficLight';
import Button from '@/components/ui/Button';
import Typography from '@/components/ui/Typography';
import colors from '@/constants/colors';

// API 연결 전 목업 데이터
const SUMMARY: Record<Severity, number> = { error: 2, warn: 1, ok: 5 };

const ISSUE_ITEMS: { key: string; severity: Severity; title: string; detail: string }[] = [
  {
    key: 'weight',
    severity: 'error',
    title: '총중량 불일치',
    detail: 'Invoice 12,500kg vs B/L 11,800kg',
  },
  {
    key: 'amount',
    severity: 'error',
    title: '금액 계산 오류',
    detail: '1,250 × 39.00 ≠ 송장 합계 49,750',
  },
  {
    key: 'name',
    severity: 'warn',
    title: '품명 표기 상이',
    detail: '"Vacuum Flask" vs "Vacuum Bottle"',
  },
];

const OK_ITEM = { title: '수량 · 총금액 · 단가 · 원산지 · 포장수량', detail: '5개 항목 일치' };

const DOT_CLASS: Record<Severity, string> = {
  error: 'bg-danger-500',
  warn: 'bg-warning-500',
  ok: 'bg-success-500',
};

const STAT_CARDS: { key: Severity; label: string; numberClass: string }[] = [
  { key: 'ok', label: '🟢 정상', numberClass: 'text-success-500' },
  { key: 'warn', label: '🟡 주의', numberClass: 'text-warning-500' },
  { key: 'error', label: '🔴 오류', numberClass: 'text-danger-500' },
];

export default function ResultScreen() {
  const totalCount = SUMMARY.error + SUMMARY.warn + SUMMARY.ok;

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View className="w-full items-center bg-warning-100 py-sm">
        <Typography variant="caption" className="font-medium text-warning-700">
          ⚠️ AI 초안 · 법적 효력 없음 · 참고용
        </Typography>
      </View>

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
          검수 결과
        </Typography>
        <View className="w-3xl" />
      </View>

      <ScrollView style={styles.scroll} contentContainerClassName="gap-sm px-xl pb-2xl pt-sm">
        <View className="w-full flex-row items-center gap-xl rounded-lg bg-white p-xl shadow-sm">
          <TrafficLight active="error" />
          <View className="flex-1 flex-col gap-xs">
            <View className="self-start rounded-sm bg-danger-100 px-md py-xs">
              <Typography variant="caption" className="font-title text-danger-500">
                오류 발견
              </Typography>
            </View>
            <Typography variant="h3" className="font-title">
              오류 {SUMMARY.error}건,{'\n'}주의 {SUMMARY.warn}건이에요
            </Typography>
            <Typography variant="body2">총 {totalCount}개 항목 검증</Typography>
          </View>
        </View>

        <View className="mt-xs w-full flex-row gap-sm">
          {STAT_CARDS.map(({ key, label, numberClass }) => (
            <View
              key={key}
              className="flex-1 items-center gap-xs rounded-lg bg-white py-lg shadow-sm"
            >
              <Typography variant="h3" className={`font-title ${numberClass}`}>
                {SUMMARY[key]}
              </Typography>
              <Typography variant="caption" className="text-text-secondary">
                {label}
              </Typography>
            </View>
          ))}
        </View>

        <Typography variant="body2" className="mt-md font-title text-text-primary">
          항목별 결과
        </Typography>

        <View className="w-full rounded-lg bg-white px-lg py-xs shadow-sm">
          {ISSUE_ITEMS.map(({ key, severity, title, detail }) => (
            <Pressable
              key={key}
              accessibilityRole="button"
              className="w-full flex-row items-center gap-md border-b border-border py-md active:opacity-60"
              onPress={() => router.push('/error-detail')}
            >
              <View className={`size-md rounded-full ${DOT_CLASS[severity]}`} />
              <View className="flex-1 flex-col">
                <Typography variant="body2" className="font-bold text-text-primary">
                  {title}
                </Typography>
                <Typography variant="caption" className="text-text-secondary">
                  {detail}
                </Typography>
              </View>
              <Typography variant="h4" className="font-regular text-gray-300">
                ›
              </Typography>
            </Pressable>
          ))}
          <View className="w-full flex-row items-center gap-md py-md">
            <View className={`size-md rounded-full ${DOT_CLASS.ok}`} />
            <View className="flex-1 flex-col">
              <Typography variant="body2" className="font-medium text-gray-600">
                {OK_ITEM.title}
              </Typography>
              <Typography variant="caption" className="text-text-secondary">
                {OK_ITEM.detail}
              </Typography>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="w-full border-t border-gray-50 bg-white px-xl py-lg">
        <Button label="오류 상세 보기" size="lg" onPress={() => router.push('/error-detail')} />
      </View>
      <BottomNav activeTab="result" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.gray[100] },
  scroll: { flex: 1 },
});
