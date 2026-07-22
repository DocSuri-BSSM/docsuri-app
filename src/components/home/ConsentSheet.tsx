import { useState } from 'react';
import { Modal, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Button from '@/components/ui/Button';
import Typography from '@/components/ui/Typography';

interface ConsentSheetProps {
  visible: boolean;
  onClose: () => void;
  onAgree: () => void;
}

const NOTICE_ITEMS = [
  {
    number: '①',
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
    number: '②',
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
    number: '③',
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
  const insets = useSafeAreaInsets();
  const [agreed, setAgreed] = useState(false);

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
          className="absolute inset-0 bg-black/20"
          onPress={onClose}
        />
        <View
          className="w-full items-center rounded-t-xl bg-white px-2xl pt-md"
          style={{ paddingBottom: insets.bottom + 24 }}
        >
          <View className="h-xs w-3xl rounded-full bg-gray-200" />

          <View className="mt-xl w-full flex-col gap-lg">
            <View className="size-4xl items-center justify-center rounded-lg bg-primary-50">
              <Typography variant="h2" className="font-regular">
                🛡️
              </Typography>
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
                  <Typography variant="body1" className="text-primary-500">
                    {number}
                  </Typography>
                  <Typography variant="body2" className="flex-1 text-gray-600">
                    {content}
                  </Typography>
                </View>
              ))}
            </View>

            <Pressable
              accessibilityRole="checkbox"
              accessibilityState={{ checked: agreed }}
              className="w-full flex-row items-center gap-sm rounded-md bg-gray-100 px-md py-md active:opacity-60"
              onPress={() => setAgreed((prev) => !prev)}
            >
              <View
                className={`size-2xl items-center justify-center rounded-sm ${
                  agreed ? 'bg-primary-500' : 'border border-gray-300 bg-white'
                }`}
              >
                {agreed && (
                  <Typography variant="body3" className="font-title text-text-inverse">
                    ✓
                  </Typography>
                )}
              </View>
              <Typography variant="body2" className="font-bold text-text-primary">
                위 안내를 모두 확인했습니다
              </Typography>
            </Pressable>

            <Button label="동의하고 시작하기" size="lg" disabled={!agreed} onPress={onAgree} />
          </View>
        </View>
      </View>
    </Modal>
  );
}
