import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import WarningIcon from '@/assets/images/icons/warning.svg';
import TrafficLight from '@/components/result/TrafficLight';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import ListRow from '@/components/ui/ListRow';
import ScreenHeader from '@/components/ui/ScreenHeader';
import SectionTitle from '@/components/ui/SectionTitle';
import SeverityDot, { type Severity } from '@/components/ui/SeverityDot';
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

const STAT_COLUMNS: { key: Severity; label: string; numberClass: string }[] = [
  { key: 'ok', label: '정상', numberClass: 'text-success-500' },
  { key: 'warn', label: '주의', numberClass: 'text-warning-500' },
  { key: 'error', label: '오류', numberClass: 'text-danger-500' },
];

export default function ResultScreen() {
  const totalCount = SUMMARY.error + SUMMARY.warn + SUMMARY.ok;

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
      <View className="w-full flex-row items-center justify-center gap-xs bg-warning-100 py-sm">
        <WarningIcon width={14} height={14} color={colors.warning[700]} />
        <Typography variant="caption" className="font-medium text-warning-700">
          AI 초안 · 법적 효력 없음 · 참고용
        </Typography>
      </View>

      <ScreenHeader title="검수 결과" />

      <ScrollView style={styles.scroll} contentContainerClassName="gap-sm px-xl pb-2xl pt-sm">
        {/* 요약 히어로: 신호등 + 요약 + 심각도별 카운트를 한 카드로 */}
        <Card className="p-xl">
          <View className="w-full flex-row items-center gap-xl">
            <TrafficLight active="error" />
            <View className="flex-1 flex-col gap-xs">
              <Badge label="오류 발견" variant="error" />
              <Typography variant="h3" className="font-title">
                오류 {SUMMARY.error}건,{'\n'}주의 {SUMMARY.warn}건이에요
              </Typography>
              <Typography variant="body2">총 {totalCount}개 항목 검증</Typography>
            </View>
          </View>

          <View className="mt-lg w-full flex-row border-t border-border pt-lg">
            {STAT_COLUMNS.map(({ key, label, numberClass }) => (
              <View key={key} className="flex-1 items-center gap-xs">
                <Typography variant="h3" className={`font-title ${numberClass}`}>
                  {SUMMARY[key]}
                </Typography>
                <View className="flex-row items-center gap-xs">
                  <SeverityDot severity={key} size="sm" />
                  <Typography variant="caption">{label}</Typography>
                </View>
              </View>
            ))}
          </View>
        </Card>

        <SectionTitle className="mt-md">항목별 결과</SectionTitle>

        <Card className="px-lg py-xs">
          {ISSUE_ITEMS.map(({ key, severity, title, detail }) => (
            <ListRow
              key={key}
              title={title}
              subtitle={detail}
              left={<SeverityDot severity={severity} />}
              showDivider
              onPress={() => router.push('/error-detail')}
            />
          ))}
          <ListRow
            title={OK_ITEM.title}
            subtitle={OK_ITEM.detail}
            left={<SeverityDot severity="ok" />}
            titleClassName="font-medium text-gray-600"
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  scroll: { flex: 1 },
});
