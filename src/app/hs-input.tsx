import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackIcon from '@/assets/images/icons/back.svg';
import BottomNav from '@/components/home/BottomNav';
import Button from '@/components/ui/Button';
import Typography from '@/components/ui/Typography';
import colors from '@/constants/colors';

const MAX_LENGTH = 200;

const EXAMPLES = [
  '스테인리스 진공 보온병 (이중벽, 750ml)',
  '면 100% 남성용 반팔 티셔츠',
  '블루투스 무선 이어폰 (충전 케이스 포함)',
];

export default function HsInputScreen() {
  const [query, setQuery] = useState('');
  const canSubmit = query.trim().length > 0;

  const handleSubmit = () => {
    router.push({ pathname: '/hs', params: { query: query.trim() } });
  };

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

      <ScrollView
        style={styles.scroll}
        contentContainerClassName="gap-xs px-xl pb-2xl pt-sm"
        keyboardShouldPersistTaps="handled"
      >
        <Typography variant="h3" className="font-title">
          어떤 품목인가요?
        </Typography>
        <Typography variant="body2">
          품목명과 재질·용도 등 특징을 입력하면{'\n'}AI가 알맞은 HS Code를 추천해요.
        </Typography>

        <View className="mt-md w-full flex-col gap-xs rounded-lg bg-white px-lg py-md shadow-sm">
          <TextInput
            multiline
            maxLength={MAX_LENGTH}
            value={query}
            onChangeText={setQuery}
            placeholder="예) 스테인리스 진공 보온병, 이중벽 구조, 750ml"
            placeholderTextColor={colors.gray[400]}
            className="w-full font-regular text-sm text-text-primary"
            style={styles.input}
            accessibilityLabel="품목 설명 입력"
          />
          <Typography variant="caption" className="w-full text-right text-text-tertiary">
            {query.length}/{MAX_LENGTH}
          </Typography>
        </View>

        <Typography variant="caption" className="mt-md text-text-secondary">
          이렇게 입력해 보세요
        </Typography>
        <View className="w-full flex-row flex-wrap gap-sm">
          {EXAMPLES.map((example) => (
            <Pressable
              key={example}
              accessibilityRole="button"
              className="rounded-full border border-gray-200 bg-white px-md py-sm active:opacity-60"
              onPress={() => setQuery(example)}
            >
              <Typography variant="caption" className="text-gray-600">
                {example}
              </Typography>
            </Pressable>
          ))}
        </View>

        <View className="mt-md w-full flex-col gap-xs rounded-md bg-primary-50/50 p-md pt-lg">
          <Typography variant="caption" className="font-title text-primary-500">
            정확도를 높이는 팁
          </Typography>
          <Typography variant="caption" className="text-gray-600">
            재질 · 용도 · 규격(용량, 치수)을 함께 적을수록 추천 정확도가 올라가요.
          </Typography>
        </View>
      </ScrollView>

      <View className="w-full border-t border-gray-50 bg-white px-xl py-lg">
        <Button label="HS Code 추천 받기" size="lg" disabled={!canSubmit} onPress={handleSubmit} />
      </View>
      <BottomNav activeTab="hs" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.gray[100] },
  scroll: { flex: 1 },
  // multiline 입력 영역 최소 높이 — 토큰 스케일(최대 48px) 밖의 불가피한 값
  input: { minHeight: 120, textAlignVertical: 'top' },
});
