import { useState } from 'react';
import { Pressable, View } from 'react-native';

import CheckIcon from '@/assets/images/icons/check.svg';
import ShieldIcon from '@/assets/images/icons/shield.svg';
import BottomSheet from '@/components/ui/BottomSheet';
import Button from '@/components/ui/Button';
import Typography from '@/components/ui/Typography';
import colors from '@/constants/colors';

interface ConsentSheetProps {
  visible: boolean;
  onClose: () => void;
  onAgree: () => void;
}

const NOTICE_ITEMS = [
  {
    number: '1',
    content: (
      <>
        검수 결과는{' '}
        <Typography variant="body2" className="font-bold text-gray-600">
          AI가 생성한 초안
        </Typography>
        으로, 통관·법률상{' '}
        <Typography variant="body2" className="font-bold text-gray-600">
          효력이 없습니다.
        </Typography>
      </>
    ),
  },
  {
    number: '2',
    content: (
      <>
        OCR 인식 특성상 일부 데이터가{' '}
        <Typography variant="body2" className="font-bold text-gray-600">
          부정확
        </Typography>
        할 수 있습니다.
      </>
    ),
  },
  {
    number: '3',
    content: (
      <>
        최종 서류의 책임은{' '}
        <Typography variant="body2" className="font-bold text-gray-600">
          이용자
        </Typography>
        에게 있으며, 전문가 검토를 권장합니다.
      </>
    ),
  },
];

export default function ConsentSheet({ visible, onClose, onAgree }: ConsentSheetProps) {
  const [agreed, setAgreed] = useState(false);

  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <View className="mt-xl w-full flex-col gap-lg">
        <View className="size-4xl items-center justify-center rounded-lg bg-primary-50">
          <ShieldIcon width={24} height={24} color={colors.primary[600]} />
        </View>

        <View className="w-full flex-col gap-xs">
          <Typography variant="h3" className="font-title">
            검수를 시작하기 전에
          </Typography>
          <Typography variant="body2">아래 내용을 확인하고 동의해 주세요.</Typography>
        </View>

        <View className="w-full flex-col gap-md">
          {NOTICE_ITEMS.map(({ number, content }) => (
            <View key={number} className="w-full flex-row items-start gap-md">
              <View className="size-2xl items-center justify-center rounded-full bg-primary-50">
                <Typography variant="caption" className="font-bold text-primary-600">
                  {number}
                </Typography>
              </View>
              <Typography variant="body2" className="flex-1 text-gray-600">
                {content}
              </Typography>
            </View>
          ))}
        </View>

        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{ checked: agreed }}
          className="min-h-4xl w-full flex-row items-center gap-sm rounded-md bg-gray-100 px-md py-md active:bg-gray-200"
          onPress={() => setAgreed((prev) => !prev)}
        >
          <View
            className={`size-2xl items-center justify-center rounded-sm ${
              agreed ? 'bg-primary-600' : 'border border-gray-300 bg-white'
            }`}
          >
            {agreed && <CheckIcon width={14} height={14} color={colors.white} />}
          </View>
          <Typography variant="body2" className="font-bold text-text-primary">
            위 안내를 모두 확인했습니다
          </Typography>
        </Pressable>

        <Button label="동의하고 시작하기" size="lg" disabled={!agreed} onPress={onAgree} />
      </View>
    </BottomSheet>
  );
}
