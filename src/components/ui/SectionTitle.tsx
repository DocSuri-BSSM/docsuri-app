import { type ReactNode } from 'react';

import Typography from '@/components/ui/Typography';

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
}

/** 화면 내 섹션 소제목 공용 스타일. */
export default function SectionTitle({ children, className }: SectionTitleProps) {
  return (
    <Typography variant="body2" className={`font-title text-text-primary ${className ?? ''}`}>
      {children}
    </Typography>
  );
}
