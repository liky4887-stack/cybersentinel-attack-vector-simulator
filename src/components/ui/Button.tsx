import { cn } from '@/utils/cn';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'danger' | 'success' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  const variants: Record<Variant, string> = {
    primary: 'bg-cyber-cyan/10 text-cyber-cyan border-cyber-cyan/40 hover:bg-cyber-cyan/20 hover:border-cyber-cyan',
    danger: 'bg-cyber-red/10 text-cyber-red border-cyber-red/40 hover:bg-cyber-red/20 hover:border-cyber-red',
    success: 'bg-cyber-green/10 text-cyber-green border-cyber-green/40 hover:bg-cyber-green/20 hover:border-cyber-green',
    ghost: 'bg-transparent text-cyber-text-dim border-transparent hover:text-cyber-text hover:bg-cyber-elevated',
    outline: 'bg-transparent text-cyber-text border-cyber-border-bright hover:border-cyber-cyan hover:text-cyber-cyan',
  };

  const sizes: Record<Size, string> = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-mono font-medium border rounded transition-all duration-200 active:scale-[0.97]',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
