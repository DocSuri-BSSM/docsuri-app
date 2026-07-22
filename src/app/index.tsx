import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import WarningIcon from '@/assets/images/icons/warning.svg';
import BottomNav from '@/components/home/BottomNav';
import ConsentSheet from '@/components/home/ConsentSheet';
import GlossarySection from '@/components/home/GlossarySection';
import Button from '@/components/ui/Button';
import Typography from '@/components/ui/Typography';
import colors from '@/constants/colors';

export default function HomeScreen() {
  const [consentOpen, setConsentOpen] = useState(false);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerClassName="gap-2xl px-xl py-2xl">
        <View className="w-full flex-row items-center justify-between">
          <Typography variant="h2" className="font-title text-primary-600">
            독수리
          </Typography>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="도움말"
            className="size-3xl items-center justify-center rounded-full bg-white active:opacity-60"
          >
            <Typography variant="body2" className="font-bold text-text-secondary">
              ?
            </Typography>
          </Pressable>
        </View>

        <View className="w-full rounded-lg bg-white p-lg shadow-sm">
          <Typography variant="h2" className="font-title">
            <Typography variant="h2" className="font-title text-primary-500">
              무역 서류,{'\n'}
            </Typography>
            끌어다 놓으면{'\n'}검수 끝.
          </Typography>
          <Typography variant="body2" className="mt-xs">
            Invoice · B/L · Packing List를 올리면{'\n'}AI가 항목을 교차 검증해요.
          </Typography>
        </View>

        <View className="w-full flex-col gap-xs">
          <Button
            label="서류 올리고 검수 시작"
            size="lg"
            className="w-full"
            onPress={() => setConsentOpen(true)}
          />
          <Typography variant="caption" className="text-center">
            회원가입 없이 바로 시작 · 평균 12초
          </Typography>
        </View>

        <View className="w-full flex-row items-start gap-sm rounded-sm bg-warning-100 p-md">
          <WarningIcon width={24} height={24} color={colors.warning[700]} />
          <Typography variant="body3" className="flex-1 font-medium text-warning-700">
            본 서비스의 결과는 AI 초안이며 법적 효력이 없습니다. 최종 확인은 전문가와 함께하세요.
          </Typography>
        </View>

        <GlossarySection />
      </ScrollView>
      <BottomNav />
      <ConsentSheet
        visible={consentOpen}
        onClose={() => setConsentOpen(false)}
        onAgree={() => {
          setConsentOpen(false);
          router.push('/upload');
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  scroll: { flex: 1 },
});
