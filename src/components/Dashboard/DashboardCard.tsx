import { cn } from '@/utils/cn';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface DashboardCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
  badgeVariant?: 'cyan' | 'green' | 'amber' | 'red';
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
}

export function DashboardCard({
  icon: Icon,
  title,
  description,
  badge,
  badgeVariant = 'cyan',
  onClick,
  className,
  children,
}: DashboardCardProps) {
  const badgeColors = {
    cyan: 'text-cyber-cyan border-cyber-cyan/30 bg-cyber-cyan/5',
    green: 'text-cyber-green border-cyber-green/30 bg-cyber-green/5',
    amber: 'text-cyber-amber border-cyber-amber/30 bg-cyber-amber/5',
    red: 'text-cyber-red border-cyber-red/30 bg-cyber-red/5',
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative w-full text-left p-5 bg-cyber-surface border border-cyber-border rounded-lg',
        'hover:border-cyber-cyan/40 hover:bg-cyber-elevated transition-all duration-300',
        'hover:box-glow-cyan active:scale-[0.99]',
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-lg border border-cyber-border bg-cyber-bg flex items-center justify-center group-hover:border-cyber-cyan/40 transition-colors">
          <Icon className="w-6 h-6 text-cyber-cyan group-hover:text-glow-cyan transition-all" />
        </div>
        {badge && (
          <span className={cn('px-2 py-0.5 text-xs font-mono border rounded uppercase tracking-wider', badgeColors[badgeVariant])}>
            {badge}
          </span>
        )}
      </div>
      <h3 className="font-mono font-bold text-base text-cyber-text group-hover:text-cyber-cyan transition-colors mb-1">
        {title}
      </h3>
      <p className="text-xs font-mono text-cyber-text-dim leading-relaxed">{description}</p>
      {children}
    </button>
  );
}
