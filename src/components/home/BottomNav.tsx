import { router, type Href } from 'expo-router';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ClipboardIcon from '@/assets/images/icons/clipboard.svg';
import HomeIcon from '@/assets/images/icons/home.svg';
import InboxIcon from '@/assets/images/icons/inbox.svg';
import LayoutIcon from '@/assets/images/icons/layout.svg';
import TagIcon from '@/assets/images/icons/tag.svg';
import Typography from '@/components/ui/Typography';
import colors from '@/constants/colors';

const TABS = [
  { key: 'home', label: '홈', Icon: HomeIcon },
  { key: 'result', label: '검수 결과', Icon: LayoutIcon },
  { key: 'upload', label: '서류업로드', Icon: ClipboardIcon },
  { key: 'hs', label: 'HS 조회', Icon: TagIcon },
  { key: 'bl', label: 'B/L 생성', Icon: InboxIcon },
] as const;

export type BottomNavTabKey = (typeof TABS)[number]['key'];

// 화면이 있는 탭만 라우트를 연결한다. 나머지 탭은 화면이 생기면 여기에 추가.
const TAB_ROUTES: Partial<Record<BottomNavTabKey, Href>> = {
  home: '/',
  result: '/result',
  upload: '/upload',
};

interface BottomNavProps {
  activeTab?: BottomNavTabKey;
  onTabPress?: (tab: BottomNavTabKey) => void;
}

export default function BottomNav({ activeTab = 'home', onTabPress }: BottomNavProps) {
  const insets = useSafeAreaInsets();

  const handleTabPress = (tab: BottomNavTabKey) => {
    onTabPress?.(tab);
    const route = TAB_ROUTES[tab];
    if (route && tab !== activeTab) {
      router.navigate(route);
    }
  };

  return (
    <View
      className="w-full flex-row items-center gap-sm rounded-t-lg border-t border-gray-100 bg-white p-xs"
      style={{ paddingBottom: insets.bottom + 4 }}
    >
      {TABS.map(({ key, label, Icon }) => {
        const isActive = key === activeTab;
        const color = isActive ? colors.primary[600] : colors.gray[600];

        return (
          <Pressable
            key={key}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            className="flex-1 flex-col items-center gap-xs p-sm active:opacity-60"
            onPress={() => handleTabPress(key)}
          >
            <Icon width={24} height={24} color={color} />
            <Typography
              variant="body3"
              className={isActive ? 'font-medium text-primary-600' : 'font-medium text-gray-600'}
            >
              {label}
            </Typography>
          </Pressable>
        );
      })}
    </View>
  );
}
