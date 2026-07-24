import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackIcon from '@/assets/images/icons/back.svg';
import Button from '@/components/ui/Button';
import Typography from '@/components/ui/Typography';
import colors from '@/constants/colors';

// API 연결 전 목업 데이터: 첫 번째 오류(총중량 불일치) 상세
const DOC_COMPARISONS: {
  key: string;
  doc: string;
  label: string;
  value: string;
  mismatch: boolean;
}[] = [
  { key: 'invoice', doc: 'Invoice · 상업송장', label: '총중량', value: '12,500', mismatch: false },
  { key: 'bl', doc: 'B/L · 선하증권 ⚠ 불일치', label: '총중량', value: '11,800', mismatch: true },
  {
    key: 'packing',
    doc: 'Packing List · 포장명세',
    label: '총중량',
    value: '12,500',
    mismatch: false,
  },
];

const NEXT_ITEMS: { key: string; dotClass: string; title: string }[] = [
  { key: 'amount', dotClass: 'bg-danger-500', title: '금액 계산 오류 (다음 항목)' },
  { key: 'name', dotClass: 'bg-warning-500', title: '품명 표기 상이 (주의)' },
];

export default function ErrorDetailScreen() {
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
          오류 상세
        </Typography>
        <View className="w-3xl items-center">
          <Typography variant="caption" className="font-title text-danger-500">
            1/2
          </Typography>
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerClassName="gap-sm px-xl pb-2xl pt-sm">
        <View className="self-start rounded-sm bg-danger-100 px-md py-xs">
          <Typography variant="caption" className="font-title text-danger-500">
            🔴 오류
          </Typography>
        </View>
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
          {DOC_COMPARISONS.map(({ key, doc, label, value, mismatch }) => (
            <View
              key={key}
              className={
                mismatch
                  ? 'w-full flex-row items-center justify-between rounded-lg border border-danger-500/40 bg-danger-100 px-lg py-lg'
                  : 'w-full flex-row items-center justify-between rounded-lg bg-white px-lg py-lg shadow-sm'
              }
            >
              <View className="flex-col gap-xs">
                <Typography
                  variant="caption"
                  className={mismatch ? 'text-danger-700' : 'text-text-secondary'}
                >
                  {doc}
                </Typography>
                <Typography
                  variant="body2"
                  className={
                    mismatch ? 'font-title text-danger-700' : 'font-bold text-text-primary'
                  }
                >
                  {label}
                </Typography>
              </View>
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
            </View>
          ))}
        </View>

        <View className="mt-xs w-full flex-col gap-xs rounded-lg bg-white p-lg pt-xl shadow-sm">
          <Typography variant="body2" className="font-title text-primary-500">
            왜 오류인가요?
          </Typography>
          <Typography variant="body2" className="text-gray-600">
            Invoice·Packing List는{' '}
            <Typography variant="body2" className="font-bold text-gray-600">
              12,500kg
            </Typography>
            으로 일치하지만, B/L만{' '}
            <Typography variant="body2" className="font-bold text-danger-500">
              700kg 적게
            </Typography>{' '}
            기재되어 있습니다. 선적 신고 중량과 실제 중량 불일치는{' '}
            <Typography variant="body2" className="font-bold text-gray-600">
              통관 보류·과태료
            </Typography>{' '}
            사유가 될 수 있어요.
          </Typography>
        </View>

        <View className="mt-xs w-full rounded-lg bg-white px-lg py-xs shadow-sm">
          {NEXT_ITEMS.map(({ key, dotClass, title }, index) => (
            <Pressable
              key={key}
              accessibilityRole="button"
              className={`w-full flex-row items-center gap-md py-md active:opacity-60 ${
                index < NEXT_ITEMS.length - 1 ? 'border-b border-border' : ''
              }`}
              // TODO: 다음 오류 상세로 전환 (API 연결 시)
              onPress={() => {}}
            >
              <View className={`size-md rounded-full ${dotClass}`} />
              <Typography variant="body2" className="flex-1 font-bold text-text-primary">
                {title}
              </Typography>
              <Typography variant="h4" className="font-regular text-gray-300">
                ›
              </Typography>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <View className="w-full flex-col gap-sm border-t border-gray-50 bg-white px-xl pb-lg pt-md">
        <Typography variant="caption" className="w-full text-center text-text-tertiary">
          본 결과는 AI 초안이며 법적 효력이 없습니다.
        </Typography>
        <Button
          label="B/L 수정 요청서 만들기"
          size="lg"
          onPress={() => router.push('/bl-request')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.gray[100] },
  scroll: { flex: 1 },
});
