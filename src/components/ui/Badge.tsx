import { type ReactNode } from 'react';
import { View } from 'react-native';

import Typography from '@/components/ui/Typography';

export type BadgeVariant = 'error' | 'warn' | 'ok' | 'info';

const BADGE_BG_CLASS: Record<BadgeVariant, string> = {
  error: 'bg-danger-100',
  warn: 'bg-warning-100',
  ok: 'bg-success-100',
  info: 'bg-primary-50',
};

// 텍스트는 틴트 배경 위 대비 확보를 위해 700 계열을 쓴다.
const BADGE_TEXT_CLASS: Record<BadgeVariant, string> = {
  error: 'text-danger-700',
  warn: 'text-warning-700',
  ok: 'text-success-700',
  info: 'text-primary-600',
};

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  /** 라벨 앞 아이콘/도트 슬롯 */
  icon?: ReactNode;
}

/** 상태·카테고리 표시용 틴트 뱃지. */
export default function Badge({ label, variant = 'info', icon }: BadgeProps) {
  return (
    <View
      className={`flex-row items-center gap-xs self-start rounded-sm px-md py-xs ${BADGE_BG_CLASS[variant]}`}
    >
      {icon}
      <Typography variant="caption" className={`font-bold ${BADGE_TEXT_CLASS[variant]}`}>
        {label}
      </Typography>
    </View>
  );
}
