import { router } from 'expo-router';
import { type ComponentType, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { type SvgProps } from 'react-native-svg';

import DocumentIcon from '@/assets/images/icons/document.svg';
import PackageIcon from '@/assets/images/icons/package.svg';
import ShipIcon from '@/assets/images/icons/ship.svg';
import UploadIcon from '@/assets/images/icons/upload.svg';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import ScreenHeader from '@/components/ui/ScreenHeader';
import StickyFooter from '@/components/ui/StickyFooter';
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

  const emptyLabels = DOC_SLOTS.filter(({ key }) => !files[key]).map(({ label }) => label);
  const remaining = emptyLabels.length;

  // 남은 서류를 드롭존 캡션으로 안내해 다음 행동을 알려준다.
  const dropzoneCaption =
    remaining === DOC_SLOTS.length
      ? '또는 탭하여 파일 선택'
      : remaining > 0
        ? `${emptyLabels.join(' · ')}만 남았어요`
        : '모든 서류가 준비됐어요';

  const fillNextEmptySlot = () => {
    const empty = DOC_SLOTS.find(({ key }) => !files[key]);
    if (empty) {
      setFiles((prev) => ({ ...prev, [empty.key]: empty.mockFileName }));
    }
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScreenHeader title="서류 업로드" right={<Badge label="1/3" variant="info" />} />

      <ScrollView style={styles.scroll} contentContainerClassName="gap-sm px-xl pb-2xl pt-sm">
        <Typography variant="h2" className="font-title">
          3종 서류를{'\n'}한 번에 올려주세요
        </Typography>
        <Typography variant="body2">PDF · 이미지 · Excel · 동시 업로드 가능</Typography>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="파일 선택"
          className="mt-xs w-full items-center gap-xs rounded-lg border-2 border-dashed border-primary-200 bg-primary-50 px-lg pb-2xl pt-3xl active:bg-primary-100"
          onPress={fillNextEmptySlot}
        >
          <UploadIcon width={32} height={32} color={colors.primary[600]} />
          <Typography variant="body1" className="font-bold text-primary-600">
            여기로 파일을 끌어다 놓기
          </Typography>
          <Typography variant="caption">{dropzoneCaption}</Typography>
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

      <StickyFooter>
        <Button
          label={remaining > 0 ? `서류 ${remaining}개 더 올리면 시작` : '검수 시작'}
          size="lg"
          disabled={remaining > 0}
          onPress={() => router.push('/processing')}
        />
      </StickyFooter>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  scroll: { flex: 1 },
});
