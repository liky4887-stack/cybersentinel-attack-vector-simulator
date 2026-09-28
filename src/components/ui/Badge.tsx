import { cn } from '@/utils/cn';
import type { ReactNode } from 'react';

type BadgeVariant = 'cyan' | 'green' | 'amber' | 'red' | 'muted';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
  pulse?: boolean;
}

export function Badge({ children, variant = 'muted', className, pulse = false }: BadgeProps) {
  const variants: Record<BadgeVariant, string> = {
    cyan: 'bg-cyber-cyan/10 text-cyber-cyan border-cyber-cyan/30',
    green: 'bg-cyber-green/10 text-cyber-green border-cyber-green/30',
    amber: 'bg-cyber-amber/10 text-cyber-amber border-cyber-amber/30',
    red: 'bg-cyber-red/10 text-cyber-red border-cyber-red/30',
    muted: 'bg-cyber-muted/10 text-cyber-text-dim border-cyber-border',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-mono border rounded uppercase tracking-wider',
        variants[variant],
        pulse && 'animate-pulse-slow',
        className
      )}
    >
      {children}
    </span>
  );
}
