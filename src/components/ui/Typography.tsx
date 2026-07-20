import { Text, type TextProps } from 'react-native';

export type TypographyVariant =
  'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'body1' | 'body2' | 'body3' | 'caption';

/** variant → tailwind 클래스. 임의값 대신 tailwind.config.js 토큰만 사용한다. */
const VARIANT_CLASS: Record<TypographyVariant, string> = {
  display: 'font-title text-4xl',
  h1: 'font-bold text-3xl',
  h2: 'font-bold text-2xl',
  h3: 'font-bold text-xl',
  h4: 'font-medium text-lg',
  body1: 'font-regular text-base',
  body2: 'font-regular text-sm',
  body3: 'font-regular text-xs',
  caption: 'font-regular text-xs',
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

/** raw <Text> 대신 항상 이 컴포넌트를 사용한다. */
export default function Typography({ variant = 'body1', className, ...props }: TypographyProps) {
  return (
    <Text
      className={`${VARIANT_CLASS[variant]} ${VARIANT_COLOR_CLASS[variant]} ${className ?? ''}`}
      {...props}
    />
  );
}
