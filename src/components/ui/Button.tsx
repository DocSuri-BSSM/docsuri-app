import { ActivityIndicator, Pressable, type PressableProps } from 'react-native';

import Typography from '@/components/ui/Typography';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: 'bg-primary-500',
  secondary: 'bg-gray-100 border border-border',
  ghost: 'bg-transparent',
};

const VARIANT_TEXT_CLASS: Record<ButtonVariant, string> = {
  primary: 'text-text-inverse',
  secondary: 'text-text-primary',
  ghost: 'text-primary-600',
};

const SIZE_CLASS: Record<ButtonSize, string> = {
  sm: 'px-md py-sm rounded-sm',
  md: 'px-lg py-md rounded-md',
  lg: 'px-xl py-lg rounded-lg',
};

export interface ButtonProps extends Omit<PressableProps, 'children'> {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  className?: string;
}

export default function Button({
  label,
  variant = 'primary',
  size = 'md',
  loading = false,
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
      className={`flex-row items-center justify-center ${variantClass} ${SIZE_CLASS[size]} ${
        isDisabled && variant !== 'primary' ? 'opacity-50' : ''
      } ${className ?? ''}`}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" />
      ) : (
        <Typography variant="body1" className={`font-bold ${VARIANT_TEXT_CLASS[variant]}`}>
          {label}
        </Typography>
      )}
    </Pressable>
  );
}
