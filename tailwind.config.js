const colors = require('./src/constants/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  // 런타임에 조합되는 클래스명은 content 스캔으로 잡히지 않으므로 여기에 등록한다.
  safelist: [
    'font-regular',
    'font-medium',
    'font-bold',
    'font-title',
    'text-xs',
    'text-sm',
    'text-base',
    'text-lg',
    'text-xl',
    'text-2xl',
    'text-3xl',
    'text-4xl',
    'text-text-primary',
    'text-text-secondary',
    'text-text-tertiary',
    'text-text-inverse',
  ],
  theme: {
    extend: {
      colors,
      spacing: {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 20,
        '2xl': 24,
        '3xl': 40,
        '4xl': 48,
      },
      // 터치 타깃 최소 높이(Android 48dp)용
      minHeight: {
        '4xl': 48,
      },
      borderRadius: {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 20,
        '2xl': 24,
        '3xl': 40,
        '4xl': 48,
        full: 9999,
      },
      // lineHeight는 반드시 px 단위 문자열로 준다.
      // 단위 없는 숫자(32)는 CSS에서 배수로 해석돼 RN lineHeight가 fontSize×32로 폭증한다.
      fontSize: {
        xs: ['12px', { lineHeight: '16px' }],
        sm: ['14px', { lineHeight: '20px' }],
        base: ['16px', { lineHeight: '24px' }],
        lg: ['18px', { lineHeight: '26px' }],
        xl: ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['32px', { lineHeight: '40px' }],
        '4xl': ['40px', { lineHeight: '48px' }],
      },
      fontFamily: {
        regular: ['Pretendard-Regular'],
        medium: ['Pretendard-Medium'],
        bold: ['Pretendard-Bold'],
        title: ['Pretendard-ExtraBold'],
        // 앱 로고('독수리') 전용 — 안상수체 2006 굵은
        logo: ['AhnSangsoo2006-Bold'],
      },
    },
  },
  plugins: [],
};
