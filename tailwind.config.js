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
      borderRadius: {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
        '2xl': 24,
        '3xl': 40,
        '4xl': 48,
        full: 9999,
      },
      fontSize: {
        xs: [12, { lineHeight: 16 }],
        sm: [14, { lineHeight: 20 }],
        base: [16, { lineHeight: 24 }],
        lg: [18, { lineHeight: 26 }],
        xl: [20, { lineHeight: 28 }],
        '2xl': [24, { lineHeight: 32 }],
        '3xl': [32, { lineHeight: 40 }],
        '4xl': [40, { lineHeight: 48 }],
      },
      fontFamily: {
        regular: ['Pretendard-Regular'],
        medium: ['Pretendard-Medium'],
        bold: ['Pretendard-Bold'],
        title: ['Pretendard-ExtraBold'],
      },
    },
  },
  plugins: [],
};
