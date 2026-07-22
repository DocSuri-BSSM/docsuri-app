/**
 * 색상 팔레트 단일 소스(Single Source of Truth).
 * tailwind.config.js와 앱 코드가 모두 이 파일을 import 한다.
 * tailwind.config.js(CommonJS)에서 require 가능해야 하므로 .js + CommonJS로 유지한다.
 *
 * 임의값(text-[#FF8800]) 사용 금지 — 새로운 색은 반드시 여기에 먼저 추가할 것.
 */
const colors = {
  // 피그마 Foundation/Blue 기준 (blue-500 #719EF6, blue-600 #6790E0)
  primary: {
    50: '#EAF2FE',
    100: '#D5E4FD',
    200: '#BBD2FB',
    300: '#A0C0FA',
    400: '#88AFF8',
    500: '#719EF6',
    600: '#6790E0',
    700: '#5476B8',
    800: '#425D90',
    900: '#304468',
  },
  // 피그마 Foundation/grey 기준 (50·100·300·400·500·600·700·800이 피그마 정의값,
  // 나머지 단계는 같은 계열(Chakra gray)로 채워 색조를 맞춘다)
  gray: {
    50: '#F8F9FB',
    100: '#EEF1F6',
    200: '#E2E8F0',
    300: '#C4CCDA',
    400: '#9DAABB',
    500: '#6E7D94',
    600: '#4A5568',
    700: '#2D3748',
    800: '#1A202C',
    900: '#171923',
  },
  success: {
    100: '#DCFCE7',
    500: '#22C55E',
    700: '#15803D',
  },
  // 100·700은 피그마 메인페이지 면책 배너 색상
  warning: {
    100: '#FEF6E8',
    500: '#F59E0B',
    700: '#866E43',
  },
  danger: {
    100: '#FEE2E2',
    500: '#EF4444',
    700: '#B91C1C',
  },
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  // 시맨틱 토큰 (피그마 매핑: surface=g50, border=g100, text.primary=g800, text.secondary=g500)
  background: '#FFFFFF',
  surface: '#F8F9FB',
  border: '#EEF1F6',
  text: {
    primary: '#1A202C',
    secondary: '#6E7D94',
    tertiary: '#9DAABB',
    inverse: '#FFFFFF',
  },
};

module.exports = colors;
