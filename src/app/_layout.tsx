import '@/global.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { queryClient } from '@/api/queryClient';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          {/* 앱 공용 Provider는 이 위치에 추가한다 (Auth, Toast 등) */}
          <StatusBar style="auto" />
          {/* Android 기본 전환 대신 일관된 우측 슬라이드 전환을 명시 */}
          <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }} />
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
