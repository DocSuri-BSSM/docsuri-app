import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import WarningIcon from '@/assets/images/icons/warning.svg';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ListRow from '@/components/ui/ListRow';
import ScreenHeader from '@/components/ui/ScreenHeader';
import SeverityDot, { type Severity } from '@/components/ui/SeverityDot';
import StickyFooter from '@/components/ui/StickyFooter';
import Typography from '@/components/ui/Typography';
import colors from '@/constants/colors';

// API 연결 전 목업 데이터: 첫 번째 오류(총중량 불일치) 상세
const DOC_COMPARISONS: {
  key: string;
  doc: string;
  label: string;
  value: string;
  /** 기준 서류 대비 차이 표기 (불일치 서류에만) */
  diff?: string;
  mismatch: boolean;
}[] = [
  { key: 'invoice', doc: 'Invoice · 상업송장', label: '총중량', value: '12,500', mismatch: false },
  {
    key: 'bl',
    doc: 'B/L · 선하증권',
    label: '총중량',
    value: '11,800',
    diff: 'Invoice 대비 -700 kg',
    mismatch: true,
  },
  {
    key: 'packing',
    doc: 'Packing List · 포장명세',
    label: '총중량',
    value: '12,500',
    mismatch: false,
  },
];

const NEXT_ITEMS: { key: string; severity: Severity; title: string }[] = [
  { key: 'amount', severity: 'error', title: '금액 계산 오류 (다음 항목)' },
  { key: 'name', severity: 'warn', title: '품명 표기 상이 (주의)' },
];

export default function ErrorDetailScreen() {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScreenHeader
        title="오류 상세"
        right={
          <Typography variant="caption" className="font-title text-danger-700">
            1/2
          </Typography>
        }
      />

      <ScrollView style={styles.scroll} contentContainerClassName="gap-sm px-xl pb-2xl pt-sm">
        <Badge label="오류" variant="error" icon={<SeverityDot severity="error" size="sm" />} />
        <Typography variant="h3" className="font-title">
          총중량이 서로 달라요
        </Typography>
        <Typography variant="body2">
          3종 서류의{' '}
          <Typography variant="body2" className="font-bold">
            Gross Weight
          </Typography>{' '}
          항목을 1:1로 매핑한 결과입니다.
        </Typography>

        <View className="mt-sm w-full flex-col gap-sm">
          {DOC_COMPARISONS.map(({ key, doc, label, value, diff, mismatch }) => (
            <View
              key={key}
              className={
                mismatch
                  ? 'w-full flex-row items-center justify-between rounded-lg border-l-4 border-danger-500 bg-danger-100 px-lg py-lg'
                  : 'w-full flex-row items-center justify-between rounded-lg bg-white px-lg py-lg shadow-sm'
              }
            >
              <View className="flex-col gap-xs">
                <View className="flex-row items-center gap-xs">
                  <Typography
                    variant="caption"
                    className={mismatch ? 'text-danger-700' : 'text-text-secondary'}
                  >
                    {doc}
                  </Typography>
                  {mismatch && (
                    <>
                      <WarningIcon width={12} height={12} color={colors.danger[700]} />
                      <Typography variant="caption" className="text-danger-700">
                        불일치
                      </Typography>
                    </>
                  )}
                </View>
                <Typography
                  variant="body2"
                  className={
                    mismatch ? 'font-title text-danger-700' : 'font-bold text-text-primary'
                  }
                >
                  {label}
                </Typography>
              </View>
              <View className="flex-col items-end gap-xs">
                <View className="flex-row items-baseline gap-xs">
                  <Typography
                    variant="h4"
                    className={
                      mismatch ? 'font-title text-danger-500' : 'font-title text-text-primary'
                    }
                  >
                    {value}
                  </Typography>
                  <Typography
                    variant="caption"
                    className={
                      mismatch ? 'font-medium text-danger-500' : 'font-medium text-text-secondary'
                    }
                  >
                    kg
                  </Typography>
                </View>
                {diff != null && (
                  <Typography variant="caption" className="font-medium text-danger-700">
                    {diff}
                  </Typography>
                )}
              </View>
            </View>
          ))}
        </View>

        <Card className="mt-xs flex-col gap-xs p-lg">
          <Typography variant="body2" className="font-title text-primary-600">
            왜 오류인가요?
          </Typography>
          <Typography variant="body2" className="text-gray-600">
            Invoice·Packing List는{' '}
            <Typography variant="body2" className="font-bold text-gray-600">
              12,500kg
            </Typography>
            으로 일치하지만, B/L만{' '}
            <Typography variant="body2" className="font-bold text-danger-700">
              700kg 적게
            </Typography>{' '}
            기재되어 있습니다. 선적 신고 중량과 실제 중량 불일치는{' '}
            <Typography variant="body2" className="font-bold text-gray-600">
              통관 보류·과태료
            </Typography>{' '}
            사유가 될 수 있어요.
          </Typography>
        </Card>

        <Card className="mt-xs px-lg py-xs">
          {NEXT_ITEMS.map(({ key, severity, title }, index) => (
            <ListRow
              key={key}
              title={title}
              left={<SeverityDot severity={severity} />}
              showDivider={index < NEXT_ITEMS.length - 1}
              // TODO: 다음 오류 상세로 전환 (API 연결 시)
              onPress={() => {}}
            />
          ))}
        </Card>
      </ScrollView>

      <StickyFooter className="flex-col gap-sm">
        <Typography variant="caption" className="w-full text-center">
          본 결과는 AI 초안이며 법적 효력이 없습니다.
        </Typography>
        <Button
          label="B/L 수정 요청서 만들기"
          size="lg"
          onPress={() => router.push('/bl-request')}
        />
      </StickyFooter>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  scroll: { flex: 1 },
});
