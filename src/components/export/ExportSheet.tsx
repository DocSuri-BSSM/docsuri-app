import { Pressable, StyleSheet, View } from 'react-native';

import CheckIcon from '@/assets/images/icons/check.svg';
import DocumentIcon from '@/assets/images/icons/document.svg';
import DownloadIcon from '@/assets/images/icons/download.svg';
import BottomSheet from '@/components/ui/BottomSheet';
import Button from '@/components/ui/Button';
import Typography from '@/components/ui/Typography';
import colors from '@/constants/colors';

interface ExportSheetProps {
  visible: boolean;
  onClose: () => void;
}

// API 연결 전 목업 데이터
const FILES: {
  key: string;
  iconColor: string;
  iconBgClass: string;
  name: string;
  meta: string;
}[] = [
  {
    key: 'report',
    iconColor: colors.danger[500],
    iconBgClass: 'bg-danger-100',
    name: '검수 리포트.pdf',
    meta: '교차검증 결과 · 248 KB',
  },
  {
    key: 'bl',
    iconColor: colors.primary[600],
    iconBgClass: 'bg-primary-50',
    name: 'B/L 수정요청서.docx',
    meta: '편집 가능 · 36 KB',
  },
];

export default function ExportSheet({ visible, onClose }: ExportSheetProps) {
  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <View className="mt-xl w-full flex-col items-center gap-lg">
        <View className="size-4xl items-center justify-center rounded-full bg-success-100">
          <CheckIcon width={26} height={26} color={colors.success[500]} />
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
          {FILES.map(({ key, iconColor, iconBgClass, name, meta }) => (
            <View
              key={key}
              className="w-full flex-row items-center gap-md rounded-lg bg-gray-100 px-lg py-md"
            >
              <View className={`size-3xl items-center justify-center rounded-md ${iconBgClass}`}>
                <DocumentIcon width={20} height={20} color={iconColor} />
              </View>
              <View className="flex-1 flex-col">
                <Typography variant="body2" className="font-bold text-text-primary">
                  {name}
                </Typography>
                <Typography variant="caption">{meta}</Typography>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`${name} 다운로드`}
                className="size-3xl items-center justify-center rounded-md bg-white active:bg-gray-50"
                // TODO: 개별 파일 다운로드 연결
                onPress={() => {}}
              >
                <DownloadIcon width={18} height={18} color={colors.primary[600]} />
              </Pressable>
            </View>
          ))}
        </View>

        <View className="w-full flex-row gap-sm">
          <View style={styles.grow1}>
            <Button
              label="공유"
              size="lg"
              variant="secondary"
              // TODO: 시스템 공유 시트 연결
              onPress={() => {}}
            />
          </View>
          <View style={styles.grow2}>
            <Button
              label="모두 다운로드"
              size="lg"
              // TODO: 전체 파일 다운로드 연결
              onPress={() => {}}
            />
          </View>
        </View>

        <Typography variant="caption" className="text-center">
          본 결과는 AI 초안이며 법적 효력이 없습니다.
        </Typography>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  // 공유:다운로드 = 1:2 비율 (피그마 그리드 열 비율)
  grow1: { flex: 1 },
  grow2: { flex: 2 },
});
