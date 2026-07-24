import { router } from 'expo-router';
import { type ComponentType, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { type SvgProps } from 'react-native-svg';

import BackIcon from '@/assets/images/icons/back.svg';
import DocumentIcon from '@/assets/images/icons/document.svg';
import PackageIcon from '@/assets/images/icons/package.svg';
import ShipIcon from '@/assets/images/icons/ship.svg';
import UploadIcon from '@/assets/images/icons/upload.svg';
import BottomNav from '@/components/home/BottomNav';
import Button from '@/components/ui/Button';
import Typography from '@/components/ui/Typography';
import DocSlotCard from '@/components/upload/DocSlotCard';
import colors from '@/constants/colors';

type DocKey = 'invoice' | 'bl' | 'packing';

const DOC_SLOTS: {
  key: DocKey;
  Icon: ComponentType<SvgProps>;
  label: string;
  mockFileName: string;
}[] = [
  {
    key: 'invoice',
    Icon: DocumentIcon,
    label: 'Invoice',
    mockFileName: 'commercial_invoice_0612.pdf',
  },
  { key: 'bl', Icon: ShipIcon, label: 'B/L', mockFileName: 'bill_of_lading_scan.jpg' },
  {
    key: 'packing',
    Icon: PackageIcon,
    label: 'Packing List',
    mockFileName: 'packing_list_0612.xlsx',
  },
];

export default function UploadScreen() {
  // API 연결 전 목업 상태: 파일 선택 대신 탭하면 목업 파일명이 채워진다.
  const [files, setFiles] = useState<Record<DocKey, string | null>>({
    invoice: 'commercial_invoice_0612.pdf',
    bl: 'bill_of_lading_scan.jpg',
    packing: null,
  });

  const remaining = DOC_SLOTS.filter(({ key }) => !files[key]).length;

  const fillNextEmptySlot = () => {
    const empty = DOC_SLOTS.find(({ key }) => !files[key]);
    if (empty) {
      setFiles((prev) => ({ ...prev, [empty.key]: empty.mockFileName }));
    }
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
          서류 업로드
        </Typography>
        <View className="w-3xl items-center">
          <Typography variant="body2" className="font-bold">
            1/3
          </Typography>
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerClassName="gap-sm px-xl pb-2xl pt-sm">
        <Typography variant="h2" className="font-title">
          3종 서류를{'\n'}한 번에 올려주세요
        </Typography>
        <Typography variant="body2">PDF · 이미지 · Excel · 동시 업로드 가능</Typography>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="파일 선택"
          className="mt-xs w-full items-center gap-xs rounded-lg border-2 border-dashed border-primary-200 bg-primary-50 px-lg pb-2xl pt-3xl active:opacity-70"
          onPress={fillNextEmptySlot}
        >
          <UploadIcon width={32} height={32} color={colors.primary[500]} />
          <Typography variant="body1" className="font-bold text-primary-500">
            여기로 파일을 끌어다 놓기
          </Typography>
          <Typography variant="caption" className="text-text-secondary">
            또는 탭하여 파일 선택
          </Typography>
        </Pressable>

        <View className="mt-sm w-full flex-col gap-md">
          {DOC_SLOTS.map(({ key, Icon, label }) => (
            <DocSlotCard
              key={key}
              Icon={Icon}
              label={label}
              fileName={files[key]}
              onAdd={fillNextEmptySlot}
            />
          ))}
        </View>
      </ScrollView>

      <View className="w-full border-t border-gray-50 bg-white px-xl py-lg">
        <Button
          label={remaining > 0 ? `서류 ${remaining}개 더 올리면 시작` : '검수 시작'}
          size="lg"
          disabled={remaining > 0}
          onPress={() => router.push('/processing')}
        />
      </View>
      <BottomNav activeTab="upload" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.gray[100] },
  scroll: { flex: 1 },
});
