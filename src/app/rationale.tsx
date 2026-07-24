import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ClipboardIcon from '@/assets/images/icons/clipboard.svg';
import CopyIcon from '@/assets/images/icons/copy.svg';
import WarningIcon from '@/assets/images/icons/warning.svg';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import IconButton from '@/components/ui/IconButton';
import ScreenHeader from '@/components/ui/ScreenHeader';
import SectionTitle from '@/components/ui/SectionTitle';
import StickyFooter from '@/components/ui/StickyFooter';
import Typography from '@/components/ui/Typography';
import colors from '@/constants/colors';

// API 연결 전 목업 데이터
const SELECTED_CODE = 'HS 9617.00';

const CITATIONS: { key: string; label: string; desc: string }[] = [
  { key: 'rule3b', label: '통칙 3나', desc: '본질적 특성을 부여하는 재료·구성요소로 분류' },
  { key: 'ch96', label: '96류 해설', desc: '진공용기(vacuum flask)의 제9617호 분류 명시' },
];

export default function RationaleScreen() {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScreenHeader
        title="소명 논리"
        right={
          <IconButton
            accessibilityLabel="소명 논리 복사"
            // TODO: 클립보드 복사 (expo-clipboard 도입 시)
            onPress={() => {}}
          >
            <CopyIcon width={20} height={20} color={colors.primary[600]} />
          </IconButton>
        }
      />

      <ScrollView style={styles.scroll} contentContainerClassName="gap-sm px-xl pb-2xl pt-sm">
        <View className="w-full flex-row items-center gap-sm">
          <Typography variant="caption">선택한 분류</Typography>
          <Badge label={SELECTED_CODE} variant="info" />
        </View>
        <Typography variant="h3" className="font-title">
          소명 논리 초안
        </Typography>
        <Typography variant="body2">
          관세 원칙(통칙)에 기반해 자동 생성된 세관 대응용 설명입니다.
        </Typography>

        {/* 장문 본문은 body1(16px)로 — 14px보다 법률성 텍스트 가독성이 좋다 */}
        <Card className="mt-xs flex-col gap-lg p-xl">
          <Typography variant="body1" className="text-gray-700">
            본 물품은 스테인리스강 이중벽 구조에{' '}
            <Typography variant="body1" className="font-bold text-gray-700">
              진공 단열층
            </Typography>
            을 형성한 휴대용 보온·보냉 용기입니다. 비록 재질이 강(steel)이나,{' '}
            <Typography variant="body1" className="bg-primary-50 text-gray-700">
              관세율표 해석에 관한 통칙 제3호 나목
            </Typography>
            에 따라 물품의{' '}
            <Typography variant="body1" className="font-bold text-gray-700">
              본질적 특성
            </Typography>
            은 {"'진공에 의한 보온 기능'"}에 있습니다.
          </Typography>
          <Typography variant="body1" className="text-gray-700">
            제96류 해설서는{' '}
            <Typography variant="body1" className="font-bold text-gray-700">
              {"'진공 플라스크 및 기타 진공용기'"}
            </Typography>
            를 제9617호로 명시 분류하고 있으므로, 본 물품을{' '}
            <Typography variant="body1" className="font-bold text-gray-700">
              제9617.00호
            </Typography>
            로 분류함이 타당합니다.
          </Typography>
        </Card>

        <SectionTitle className="mt-sm">인용 근거</SectionTitle>
        {CITATIONS.map(({ key, label, desc }) => (
          <Card key={key} className="flex-col gap-xs px-lg py-md">
            <Typography variant="caption" className="font-title text-primary-600">
              {label}
            </Typography>
            <Typography variant="body2" className="text-gray-600">
              {desc}
            </Typography>
          </Card>
        ))}

        <View className="mt-xs w-full flex-row items-start gap-sm rounded-md bg-warning-100 px-lg py-md">
          <WarningIcon width={16} height={16} color={colors.warning[700]} />
          <Typography variant="caption" className="flex-1 text-warning-700">
            품목분류 사전심사(관세청)를 통해 최종 확정하시길 권장합니다. 본 논리는 AI 초안입니다.
          </Typography>
        </View>
      </ScrollView>

      <StickyFooter className="flex-row gap-sm">
        <Button
          label="복사"
          size="lg"
          variant="secondary"
          Icon={ClipboardIcon}
          // TODO: 클립보드 복사 (expo-clipboard 도입 시)
          onPress={() => {}}
        />
        <Button
          label="소명서 내보내기"
          size="lg"
          className="flex-1"
          // TODO: 소명서 내보내기 (공유/파일 저장) 연결
          onPress={() => {}}
        />
      </StickyFooter>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  scroll: { flex: 1 },
});
