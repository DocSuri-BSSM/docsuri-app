import { Text, type TextProps } from 'react-native';

export type TypographyVariant =
  'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'body1' | 'body2' | 'body3' | 'caption';

/** variant → tailwind 클래스. 임의값 대신 tailwind.config.js 토큰만 사용한다. */
const VARIANT_FONT_CLASS: Record<TypographyVariant, string> = {
  display: 'font-title',
  h1: 'font-bold',
  h2: 'font-bold',
  h3: 'font-bold',
  h4: 'font-medium',
  body1: 'font-regular',
  body2: 'font-regular',
  // 피그마 Body3 텍스트 스타일은 Medium
  body3: 'font-medium',
  caption: 'font-regular',
};

const VARIANT_SIZE_CLASS: Record<TypographyVariant, string> = {
  display: 'text-4xl',
  h1: 'text-3xl',
  h2: 'text-2xl',
  h3: 'text-xl',
  h4: 'text-lg',
  body1: 'text-base',
  body2: 'text-sm',
  body3: 'text-xs',
  caption: 'text-xs',
};

const VARIANT_COLOR_CLASS: Record<TypographyVariant, string> = {
  display: 'text-text-primary',
  h1: 'text-text-primary',
  h2: 'text-text-primary',
  h3: 'text-text-primary',
  h4: 'text-text-primary',
  body1: 'text-text-primary',
  body2: 'text-text-secondary',
  body3: 'text-text-secondary',
  caption: 'text-text-tertiary',
};

export interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  className?: string;
}

// NativeWind는 className 문자열 순서가 아니라 CSS 생성 순서로 충돌을 해소하므로,
// className에 같은 속성의 클래스가 있으면 variant 기본 클래스를 아예 빼서 override를 보장한다.
const FONT_OVERRIDE_RE = /(^|\s)font-/;
const COLOR_OVERRIDE_RE =
  /(^|\s)text-(?!(xs|sm|base|lg|xl|2xl|3xl|4xl|left|center|right|justify)(\s|$))/;

/** raw <Text> 대신 항상 이 컴포넌트를 사용한다. */
export default function Typography({ variant = 'body1', className, ...props }: TypographyProps) {
  const classes = [
    className && FONT_OVERRIDE_RE.test(className) ? null : VARIANT_FONT_CLASS[variant],
    VARIANT_SIZE_CLASS[variant],
    className && COLOR_OVERRIDE_RE.test(className) ? null : VARIANT_COLOR_CLASS[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Text className={classes} {...props} />;
}
