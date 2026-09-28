import { cn } from '@/utils/cn';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  glow?: 'cyan' | 'red' | 'green' | 'none';
  scan?: boolean;
}

export function Card({ children, className, glow = 'none', scan = false }: CardProps) {
  const glowClass = {
    cyan: 'box-glow-cyan',
    red: 'box-glow-red',
    green: 'box-glow-green',
    none: '',
  }[glow];

  return (
    <div
      className={cn(
        'bg-cyber-surface border border-cyber-border rounded-lg',
        glowClass,
        scan && 'scan-overlay',
        className
      )}
    >
      {children}
    </div>
  );
}
