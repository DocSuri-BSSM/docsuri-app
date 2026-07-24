import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackIcon from '@/assets/images/icons/back.svg';
import CheckIcon from '@/assets/images/icons/check.svg';
import BottomNav from '@/components/home/BottomNav';
import Button from '@/components/ui/Button';
import Typography from '@/components/ui/Typography';
import colors from '@/constants/colors';

// API 연결 전 목업 데이터: 최근 검수에서 탐지된 오류 기반
const DETECTED_ERROR = {
  title: '총중량 불일치 1건',
  desc: 'B/L의 총중량이 Invoice·Packing List와 달라요.',
};

const STEPS = [
  { number: '①', text: '검수 결과에서 B/L 오류를 확인해요.' },
  { number: '②', text: '오류 내용을 바탕으로 정정 요청서를 자동으로 작성해요.' },
  { number: '③', text: 'PDF · Word로 내보내 선사에 바로 보낼 수 있어요.' },
];

export default function BlScreen() {
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
          B/L 생성
        </Typography>
        <View className="w-3xl" />
      </View>

      <ScrollView style={styles.scroll} contentContainerClassName="gap-xs px-xl pb-2xl pt-sm">
        <Typography variant="h3" className="font-title">
          B/L 수정 요청서 생성
        </Typography>
        <Typography variant="body2">
          검수에서 발견된 오류를 바탕으로{'\n'}선사에 보낼 정정 요청서를 자동으로 만들어요.
        </Typography>

        <View className="mt-md w-full flex-col gap-sm rounded-lg bg-white px-lg py-lg shadow-sm">
          <Typography variant="caption" className="text-text-secondary">
            최근 검수 결과
          </Typography>
          <View className="w-full flex-row items-center gap-sm">
            <View className="size-md rounded-full bg-danger-500" />
            <Typography variant="body2" className="font-bold text-text-primary">
              {DETECTED_ERROR.title}
            </Typography>
          </View>
          <Typography variant="caption" className="text-text-secondary">
            {DETECTED_ERROR.desc}
          </Typography>

          <View className="h-px w-full bg-gray-50" />

          <View className="w-full flex-row items-center gap-sm">
            <CheckIcon width={14} height={14} color={colors.success[500]} />
            <Typography variant="caption" className="font-bold text-success-500">
              수정 요청서 초안이 준비됐어요
            </Typography>
          </View>
        </View>

        <View className="mt-md w-full flex-col gap-md rounded-md bg-primary-50/50 p-md pt-lg">
          <Typography variant="caption" className="font-title text-primary-500">
            이렇게 만들어져요
          </Typography>
          {STEPS.map(({ number, text }) => (
            <View key={number} className="w-full flex-row items-start gap-sm">
              <Typography variant="caption" className="text-primary-500">
                {number}
              </Typography>
              <Typography variant="caption" className="flex-1 text-gray-600">
                {text}
              </Typography>
            </View>
          ))}
        </View>
      </ScrollView>

      <View className="w-full border-t border-gray-50 bg-white px-xl py-lg">
        <Button label="수정 요청서 확인하기" size="lg" onPress={() => router.push('/bl-request')} />
      </View>
      <BottomNav activeTab="bl" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.gray[100] },
  scroll: { flex: 1 },
});
