import { cn } from '@/utils/cn';

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  color?: 'cyan' | 'green' | 'amber' | 'red';
  showLabel?: boolean;
  height?: string;
}

export function ProgressBar({
  value,
  max = 100,
  className,
  color = 'cyan',
  showLabel = false,
  height = 'h-2',
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  const colors = {
    cyan: 'bg-cyber-cyan',
    green: 'bg-cyber-green',
    amber: 'bg-cyber-amber',
    red: 'bg-cyber-red',
  };

  const glow = {
    cyan: 'shadow-[0_0_8px_rgba(0,229,255,0.5)]',
    green: 'shadow-[0_0_8px_rgba(0,255,65,0.5)]',
    amber: 'shadow-[0_0_8px_rgba(255,179,0,0.5)]',
    red: 'shadow-[0_0_8px_rgba(255,62,62,0.5)]',
  };

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between text-xs font-mono text-cyber-text-dim mb-1">
          <span>{Math.round(pct)}%</span>
        </div>
      )}
      <div className={cn('w-full bg-cyber-bg rounded-full overflow-hidden', height)}>
        <div
          className={cn('h-full rounded-full transition-all duration-300 ease-out', colors[color], glow[color])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
