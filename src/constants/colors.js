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
  // 상태색은 원색 대신 채도를 낮춘 뮤트 톤 — 소프트한 primary 블루와 톤을 맞춘다.
  // 500은 도트·게이지·큰 숫자용(흰 배경 대비 ≥3:1), 텍스트는 700을 쓴다.
  success: {
    100: '#E6F3EB',
    500: '#3EA06F',
    700: '#2F7D53',
  },
  // 100·700은 피그마 메인페이지 면책 배너, 200은 B/L 요청서의 입력 필요 하이라이트 색상
  warning: {
    100: '#FDF5E7',
    200: '#F9EFD3',
    500: '#E6AC4C',
    700: '#866E43',
  },
  danger: {
    100: '#FAEBE8',
    500: '#E56A5E',
    700: '#B44A40',
  },
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  // 시맨틱 토큰 (피그마 매핑: surface=g50, border=g100, text.primary=g800, text.secondary=g500)
  // 용도: 화면 캔버스(SafeAreaView 배경) = surface, 카드 = background(흰색).
  // gray-100은 카드 내부의 2차 표면(체크박스 배경 등)에만 사용한다.
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
