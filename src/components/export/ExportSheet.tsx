import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import DownloadIcon from '@/assets/images/icons/download.svg';
import Button from '@/components/ui/Button';
import Typography from '@/components/ui/Typography';
import colors from '@/constants/colors';

interface ExportSheetProps {
  visible: boolean;
  onClose: () => void;
}

// API 연결 전 목업 데이터
const FILES: { key: string; emoji: string; iconBgClass: string; name: string; meta: string }[] = [
  {
    key: 'report',
    emoji: '📕',
    iconBgClass: 'bg-danger-100',
    name: '검수 리포트.pdf',
    meta: '교차검증 결과 · 248 KB',
  },
  {
    key: 'bl',
    emoji: '📘',
    iconBgClass: 'bg-primary-50',
    name: 'B/L 수정요청서.docx',
    meta: '편집 가능 · 36 KB',
  },
];

export default function ExportSheet({ visible, onClose }: ExportSheetProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      transparent
      statusBarTranslucent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="닫기"
          className="absolute inset-0 bg-black/50"
          onPress={onClose}
        />
        <View
          className="w-full items-center rounded-t-xl bg-white px-2xl pt-md"
          style={{ paddingBottom: insets.bottom + 24 }}
        >
          <View className="h-xs w-3xl rounded-full bg-gray-200" />

          <View className="mt-xl w-full flex-col items-center gap-lg">
            <View className="size-4xl items-center justify-center rounded-full bg-success-100">
              <Typography variant="h2" className="font-regular">
                ✅
              </Typography>
            </View>

            <View className="w-full flex-col items-center gap-xs">
              <Typography variant="h3" className="font-title">
                서류가 준비됐어요
              </Typography>
              <Typography variant="body2" className="text-center">
                검수 리포트와 수정 요청서를{'\n'}다운로드하거나 공유할 수 있어요.
              </Typography>
            </View>

            <View className="w-full flex-col gap-sm">
              {FILES.map(({ key, emoji, iconBgClass, name, meta }) => (
                <View
                  key={key}
                  className="w-full flex-row items-center gap-md rounded-lg bg-gray-100 px-lg py-md"
                >
                  <View
                    className={`size-3xl items-center justify-center rounded-md ${iconBgClass}`}
                  >
                    <Typography variant="body1">{emoji}</Typography>
                  </View>
                  <View className="flex-1 flex-col">
                    <Typography variant="body2" className="font-bold text-text-primary">
                      {name}
                    </Typography>
                    <Typography variant="caption" className="text-text-secondary">
                      {meta}
                    </Typography>
                  </View>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`${name} 다운로드`}
                    className="size-3xl items-center justify-center rounded-md bg-white active:opacity-60"
                    // TODO: 개별 파일 다운로드 연결
                    onPress={() => {}}
                  >
                    <DownloadIcon width={18} height={18} color={colors.primary[500]} />
                  </Pressable>
                </View>
              ))}
            </View>

            <View className="w-full flex-row gap-sm">
              <Pressable
                accessibilityRole="button"
                className="flex-1 items-center justify-center rounded-lg border border-gray-200 bg-white py-lg active:opacity-60"
                // TODO: 시스템 공유 시트 연결
                onPress={() => {}}
              >
                <Typography variant="body1" className="font-bold text-gray-600">
                  공유
                </Typography>
              </Pressable>
              <View style={styles.grow2}>
                <Button
                  label="모두 다운로드"
                  size="lg"
                  // TODO: 전체 파일 다운로드 연결
                  onPress={() => {}}
                />
              </View>
            </View>

            <Typography variant="caption" className="text-center text-text-tertiary">
              본 결과는 AI 초안이며 법적 효력이 없습니다.
            </Typography>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  // 공유:다운로드 = 1:2 비율 (피그마 그리드 열 비율)
  grow2: { flex: 2 },
});
