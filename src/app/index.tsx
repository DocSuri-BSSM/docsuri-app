import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Typography from '@/components/ui/Typography';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center gap-sm px-lg">
        <Typography variant="h2">독수리</Typography>
        <Typography variant="body2">기초 설정 완료</Typography>
      </View>
    </SafeAreaView>
  );
}
