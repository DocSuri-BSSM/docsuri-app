import { View } from 'react-native';

/** 검수 심각도 공용 타입. TrafficLight·Badge 등에서 함께 사용한다. */
export type Severity = 'error' | 'warn' | 'ok';

const DOT_CLASS: Record<Severity, string> = {
  error: 'bg-danger-500',
  warn: 'bg-warning-500',
  ok: 'bg-success-500',
};

const SIZE_CLASS: Record<'sm' | 'md', string> = {
  sm: 'size-sm',
  md: 'size-md',
};

interface SeverityDotProps {
  severity: Severity;
  size?: 'sm' | 'md';
}

/** 심각도 색상 원형 도트. */
export default function SeverityDot({ severity, size = 'md' }: SeverityDotProps) {
  return <View className={`rounded-full ${SIZE_CLASS[size]} ${DOT_CLASS[severity]}`} />;
}
