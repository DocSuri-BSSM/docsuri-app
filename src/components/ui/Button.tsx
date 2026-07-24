import { type ComponentType } from 'react';
import { ActivityIndicator, Pressable, type PressableProps } from 'react-native';
import { type SvgProps } from 'react-native-svg';

import Typography from '@/components/ui/Typography';
import colors from '@/constants/colors';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

// primary는 대비 확보를 위해 500이 아닌 600을 배경으로 쓴다(흰 글자 기준).
// 눌림 피드백은 opacity 대신 배경색 변화로 준다.
const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: 'bg-primary-600 active:bg-primary-700',
  secondary: 'bg-white border border-gray-200 active:bg-gray-50',
  ghost: 'bg-transparent active:bg-primary-50',
};

const VARIANT_TEXT_CLASS: Record<ButtonVariant, string> = {
  primary: 'text-text-inverse',
  secondary: 'text-text-primary',
  ghost: 'text-primary-600',
};

const ICON_COLOR: Record<ButtonVariant, string> = {
  primary: colors.white,
  secondary: colors.gray[600],
  ghost: colors.primary[600],
};

const SIZE_CLASS: Record<ButtonSize, string> = {
  sm: 'px-md py-sm rounded-sm',
  md: 'px-lg py-md rounded-md',
  lg: 'px-xl py-lg rounded-lg',
};

const ICON_SIZE: Record<ButtonSize, number> = {
  sm: 16,
  md: 18,
  lg: 20,
};

export interface ButtonProps extends Omit<PressableProps, 'children'> {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  /** 라벨 좌측 아이콘 */
  Icon?: ComponentType<SvgProps>;
  className?: string;
}

export default function Button({
  label,
  variant = 'primary',
  size = 'md',
  loading = false,
  Icon,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  // primary 비활성은 반투명 대신 회색 배경 (피그마 디자인 기준)
  const variantClass = isDisabled && variant === 'primary' ? 'bg-gray-300' : VARIANT_CLASS[variant];

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      className={`flex-row items-center justify-center gap-sm ${variantClass} ${SIZE_CLASS[size]} ${
        isDisabled && variant !== 'primary' ? 'opacity-50' : ''
      } ${className ?? ''}`}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" />
      ) : (
        <>
          {Icon && (
            <Icon width={ICON_SIZE[size]} height={ICON_SIZE[size]} color={ICON_COLOR[variant]} />
          )}
          <Typography variant="body1" className={`font-bold ${VARIANT_TEXT_CLASS[variant]}`}>
            {label}
          </Typography>
        </>
      )}
    </Pressable>
  );
}
