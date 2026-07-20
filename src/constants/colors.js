/**
 * 색상 팔레트 단일 소스(Single Source of Truth).
 * tailwind.config.js와 앱 코드가 모두 이 파일을 import 한다.
 * tailwind.config.js(CommonJS)에서 require 가능해야 하므로 .js + CommonJS로 유지한다.
 *
 * 임의값(text-[#FF8800]) 사용 금지 — 새로운 색은 반드시 여기에 먼저 추가할 것.
 */
const colors = {
  primary: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  success: {
    100: '#DCFCE7',
    500: '#22C55E',
    700: '#15803D',
  },
  warning: {
    100: '#FEF3C7',
    500: '#F59E0B',
    700: '#B45309',
  },
  danger: {
    100: '#FEE2E2',
    500: '#EF4444',
    700: '#B91C1C',
  },
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  // 시맨틱 토큰
  background: '#FFFFFF',
  surface: '#F9FAFB',
  border: '#E5E7EB',
  text: {
    primary: '#111827',
    secondary: '#4B5563',
    tertiary: '#9CA3AF',
    inverse: '#FFFFFF',
  },
};

module.exports = colors;
