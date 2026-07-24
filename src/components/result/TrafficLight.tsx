import { View } from 'react-native';

import { type Severity } from '@/components/ui/SeverityDot';

export { type Severity };

const LIGHT_ORDER: Severity[] = ['error', 'warn', 'ok'];

// 켜진 등은 원색 + 반투명 링(글로우), 꺼진 등은 어두운 하우징 위 반투명 원색
const ACTIVE_CLASS: Record<Severity, string> = {
  error: 'border-4 border-danger-500/40 bg-danger-500',
  warn: 'border-4 border-warning-500/40 bg-warning-500',
  ok: 'border-4 border-success-500/40 bg-success-500',
};

const DIM_CLASS: Record<Severity, string> = {
  error: 'bg-danger-500/20',
  warn: 'bg-warning-500/20',
  ok: 'bg-success-500/20',
};

interface TrafficLightProps {
  active: Severity;
}

export default function TrafficLight({ active }: TrafficLightProps) {
  return (
    <View className="items-center gap-sm rounded-full bg-gray-700 p-sm">
      {LIGHT_ORDER.map((key) => (
        <View
          key={key}
          className={`size-3xl rounded-full ${key === active ? ACTIVE_CLASS[key] : DIM_CLASS[key]}`}
        />
      ))}
    </View>
  );
}
