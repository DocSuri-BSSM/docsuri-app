import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CheckIcon from '@/assets/images/icons/check.svg';
import DocScanCard from '@/components/processing/DocScanCard';
import Typography from '@/components/ui/Typography';
import colors from '@/constants/colors';

type StepStatus = 'done' | 'active' | 'waiting';

// API 연결 전 목업 값
const PROGRESS = 0.68;

const STEPS: { key: string; label: string; status: StepStatus }[] = [
  { key: 'ocr', label: '텍스트 인식 (OCR)', status: 'done' },
  { key: 'extract', label: '핵심 데이터 추출', status: 'active' },
  { key: 'cross', label: '서류 간 교차 검증', status: 'waiting' },
];

const STATUS_LABEL: Record<StepStatus, string> = {
  done: '완료',
  active: '진행 중',
  waiting: '대기',
};

const STATUS_TEXT_CLASS: Record<StepStatus, string> = {
  done: 'font-bold text-success-500',
  active: 'font-bold text-primary-500',
  waiting: 'font-medium text-text-tertiary',
};

const EXTRACTED_CHIPS = [
  { label: '품명', done: true },
  { label: '수량 1,250', done: true },
  { label: '단가 39.00', done: true },
  { label: '중량 …', done: false },
  { label: '금액 …', done: false },
];

function StepIcon({ status }: { status: StepStatus }) {
  if (status === 'done') {
    return (
      <View className="size-2xl items-center justify-center rounded-full bg-success-500">
        <CheckIcon width={12} height={12} color={colors.white} />
      </View>
    );
  }
  if (status === 'active') {
    return (
      <View className="size-2xl items-center justify-center rounded-full bg-primary-500">
        <View className="size-sm rounded-full bg-white" />
      </View>
    );
  }
  return <View className="size-2xl rounded-full bg-gray-50" />;
}

export default function ProcessingScreen() {
  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerClassName="gap-sm px-xl pb-2xl pt-2xl">
        <Typography variant="h2" className="font-title">
          AI가 서류를{'\n'}읽고 있어요
        </Typography>
        <Typography variant="body2">핵심 데이터를 추출하는 중이에요. 잠시만요.</Typography>

        <View className="mt-xs w-full">
          <DocScanCard />
        </View>

        <View className="mt-sm w-full flex-col gap-sm">
          <View className="w-full flex-row items-baseline justify-between">
            <Typography variant="body2" className="font-bold text-text-primary">
              데이터 추출
            </Typography>
            <Typography variant="body2" className="font-title text-primary-500">
              {Math.round(PROGRESS * 100)}%
            </Typography>
          </View>
          <View className="h-sm w-full overflow-hidden rounded-full bg-gray-200">
            {/* 진행률은 목업 상수 — API 연결 시 서버 값으로 대체 */}
            <View
              className="h-full rounded-full bg-primary-500"
              style={{ width: `${PROGRESS * 100}%` }}
            />
          </View>
        </View>

        <View className="mt-sm w-full rounded-lg bg-white px-lg py-xs shadow-sm">
          {STEPS.map(({ key, label, status }, index) => (
            <View
              key={key}
              className={`w-full flex-row items-center gap-md py-md ${
                index < STEPS.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              <StepIcon status={status} />
              <Typography
                variant="body2"
                className={`flex-1 ${
                  status === 'waiting'
                    ? 'font-medium text-text-tertiary'
                    : status === 'active'
                      ? 'font-bold text-text-primary'
                      : 'font-medium text-text-primary'
                }`}
              >
                {label}
              </Typography>
              <Typography variant="caption" className={STATUS_TEXT_CLASS[status]}>
                {STATUS_LABEL[status]}
              </Typography>
            </View>
          ))}
        </View>

        <View className="mt-sm w-full flex-col gap-sm">
          <Typography variant="caption" className="text-text-secondary">
            추출된 항목
          </Typography>
          <View className="w-full flex-row flex-wrap gap-sm">
            {EXTRACTED_CHIPS.map(({ label, done }) => (
              <View
                key={label}
                className={`rounded-sm px-md py-xs ${done ? 'bg-primary-50' : 'bg-gray-100'}`}
              >
                <Typography
                  variant="caption"
                  className={done ? 'font-bold text-primary-600' : 'font-medium text-text-tertiary'}
                >
                  {label}
                </Typography>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.gray[100] },
  scroll: { flex: 1 },
});
