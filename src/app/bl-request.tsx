import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackIcon from '@/assets/images/icons/back.svg';
import ExportSheet from '@/components/export/ExportSheet';
import Button from '@/components/ui/Button';
import Typography from '@/components/ui/Typography';
import colors from '@/constants/colors';

/** 발송 전 직접 입력이 필요한 부분을 표시하는 노란 하이라이트 */
function InputNeeded({ children }: { children: string }) {
  return (
    <Typography
      variant="caption"
      className="rounded-xs bg-warning-200 px-xs font-bold text-gray-700"
    >
      {children}
    </Typography>
  );
}

export default function BlRequestScreen() {
  const [exportOpen, setExportOpen] = useState(false);

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
          B/L 수정 요청서
        </Typography>
        <View className="w-3xl" />
      </View>

      <ScrollView style={styles.scroll} contentContainerClassName="gap-sm px-xl pb-2xl pt-sm">
        <View className="w-full flex-row items-center gap-sm">
          <View className="rounded-sm bg-success-100 px-md py-xs">
            <Typography variant="caption" className="font-bold text-success-500">
              ✓ 자동 생성됨
            </Typography>
          </View>
          <Typography variant="caption" className="text-text-secondary">
            탐지된 오류 기반
          </Typography>
        </View>
        <View className="w-full flex-row items-center gap-xs">
          <Typography
            variant="caption"
            className="rounded-xs bg-warning-200 px-xs font-bold text-warning-700"
          >
            노란 표시
          </Typography>
          <Typography variant="caption" className="text-text-secondary">
            = 발송 전 직접 입력이 필요한 부분이에요.
          </Typography>
        </View>

        <View className="mt-xs w-full flex-col gap-md rounded-lg bg-white px-xl py-2xl shadow-sm">
          <View className="w-full items-center border-b-2 border-gray-800 pb-lg">
            <Typography variant="body1" className="font-title text-text-primary">
              B/L 정정 요청서
            </Typography>
          </View>

          <View className="w-full flex-col gap-xs">
            <View className="flex-row flex-wrap items-center gap-xs">
              <Typography variant="caption" className="text-gray-700">
                수신:
              </Typography>
              <InputNeeded>[선사명 입력 필요]</InputNeeded>
              <Typography variant="caption" className="text-gray-700">
                귀중
              </Typography>
            </View>
            <View className="flex-row flex-wrap items-center gap-xs">
              <Typography variant="caption" className="text-gray-700">
                발신:
              </Typography>
              <InputNeeded>(당사 상호)</InputNeeded>
            </View>
            <View className="flex-row flex-wrap items-center gap-xs">
              <Typography variant="caption" className="text-gray-700">
                일자:
              </Typography>
              <InputNeeded>2026. __. __</InputNeeded>
            </View>
          </View>

          <View className="h-px w-full bg-gray-50" />

          <View className="w-full flex-col gap-xs">
            <Typography variant="caption" className="font-bold text-gray-700">
              1. 대상 서류
            </Typography>
            <View className="flex-row flex-wrap items-center gap-xs">
              <Typography variant="caption" className="text-gray-700">
                B/L No.
              </Typography>
              <InputNeeded>[B/L 번호 입력]</InputNeeded>
            </View>
          </View>

          <View className="w-full flex-col gap-xs">
            <Typography variant="caption" className="font-bold text-gray-700">
              2. 정정 요청 사항
            </Typography>
            <Typography variant="caption" className="text-gray-700">
              총중량(Gross Weight) 기재 정정
            </Typography>
            <Typography variant="caption" className="text-gray-700">
              <Typography variant="caption" className="font-bold text-danger-500">
                11,800 KG
              </Typography>{' '}
              →{' '}
              <Typography variant="caption" className="font-bold text-success-500">
                12,500 KG
              </Typography>
            </Typography>
          </View>

          <View className="w-full flex-col gap-xs">
            <Typography variant="caption" className="font-bold text-gray-700">
              3. 정정 사유
            </Typography>
            <Typography variant="caption" className="text-gray-700">
              당사 Commercial Invoice 및 Packing List상 실제 총중량은 12,500KG이나, B/L에
              11,800KG으로 상이하게 기재되어 정정을 요청드립니다.
            </Typography>
          </View>

          <View className="w-full items-center pt-xs">
            <Typography variant="caption" className="text-gray-700">
              위와 같이 정정을 요청합니다.
            </Typography>
          </View>
        </View>
      </ScrollView>

      <View className="w-full border-t border-gray-50 bg-white px-xl py-lg">
        <Button label="PDF · Word로 내보내기" size="lg" onPress={() => setExportOpen(true)} />
      </View>

      <ExportSheet visible={exportOpen} onClose={() => setExportOpen(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.gray[100] },
  scroll: { flex: 1 },
});
