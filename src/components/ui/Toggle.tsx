import { cn } from '@/utils/cn';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export function Toggle({ checked, onChange, label, className }: ToggleProps) {
  return (
    <label className={cn('inline-flex items-center gap-3 cursor-pointer select-none', className)}>
      {label && <span className="text-sm font-mono text-cyber-text-dim">{label}</span>}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative w-12 h-6 rounded-full border transition-colors duration-200',
          checked
            ? 'bg-cyber-cyan/20 border-cyber-cyan'
            : 'bg-cyber-bg border-cyber-border-bright'
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-all duration-200',
            checked
              ? 'translate-x-6 bg-cyber-cyan shadow-[0_0_8px_rgba(0,229,255,0.6)]'
              : 'translate-x-0 bg-cyber-muted'
          )}
        />
      </button>
    </label>
  );
}
