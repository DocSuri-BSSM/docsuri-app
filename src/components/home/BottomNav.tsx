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

// 5탭 밀집 완화를 위해 라벨은 2~4자로 유지한다.
const TABS = [
  { key: 'home', label: '홈', Icon: HomeIcon },
  { key: 'result', label: '결과', Icon: LayoutIcon },
  { key: 'upload', label: '업로드', Icon: ClipboardIcon },
  { key: 'hs', label: 'HS 조회', Icon: TagIcon },
  { key: 'bl', label: 'B/L', Icon: InboxIcon },
] as const;

export type BottomNavTabKey = (typeof TABS)[number]['key'];

const TAB_ROUTES: Record<BottomNavTabKey, Href> = {
  home: '/',
  result: '/result',
  upload: '/upload',
  hs: '/hs-input',
  bl: '/bl',
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
      className="w-full flex-row items-center border-t border-border bg-white p-xs"
      style={{ paddingBottom: insets.bottom + 4 }}
    >
      {TABS.map(({ key, label, Icon }) => {
        const isActive = key === activeTab;
        const color = isActive ? colors.primary[600] : colors.gray[500];

        return (
          <Pressable
            key={key}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            className="flex-1 flex-col items-center gap-xs py-sm active:opacity-60"
            onPress={() => handleTabPress(key)}
          >
            {/* 활성 탭은 배경 없이 아이콘·라벨 색상으로만 표시 */}
            <Icon width={22} height={22} color={color} />
            <Typography
              variant="body3"
              className={isActive ? 'font-bold text-primary-600' : 'font-medium text-gray-500'}
            >
              {label}
            </Typography>
          </Pressable>
        );
      })}
    </View>
  );
}
