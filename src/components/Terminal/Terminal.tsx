import { useEffect, useRef } from 'react';
import type { TerminalLine } from '@/types';
import { cn } from '@/utils/cn';

interface TerminalProps {
  lines: TerminalLine[];
  title?: string;
  className?: string;
  autoScroll?: boolean;
}

export function Terminal({ lines, title = 'terminal', className, autoScroll = true }: TerminalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, autoScroll]);

  const typeColors: Record<TerminalLine['type'], string> = {
    info: 'text-cyber-cyan',
    success: 'text-cyber-green',
    warning: 'text-cyber-amber',
    error: 'text-cyber-red',
    command: 'text-cyber-text',
  };

  const typePrefix: Record<TerminalLine['type'], string> = {
    info: '[*]',
    success: '[+]',
    warning: '[!]',
    error: '[!]',
    command: '$',
  };

  return (
    <div className={cn('bg-black/60 border border-cyber-border rounded-lg overflow-hidden', className)}>
      <div className="flex items-center gap-2 px-3 py-2 bg-cyber-surface border-b border-cyber-border">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-cyber-red/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-cyber-amber/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-cyber-green/60" />
        </div>
        <span className="text-xs font-mono text-cyber-text-dim ml-2">{title}</span>
      </div>
      <div
        ref={scrollRef}
        className="cyber-scrollbar p-3 h-full overflow-y-auto font-mono text-xs leading-relaxed"
      >
        {lines.length === 0 ? (
          <span className="text-cyber-muted">{'> '}awaiting input<span className="animate-blink">_</span></span>
        ) : (
          lines.map((line) => (
            <div key={line.id} className="animate-fade-in flex gap-2">
              <span className="text-cyber-muted shrink-0">{line.timestamp}</span>
              <span className={cn('shrink-0', typeColors[line.type])}>{typePrefix[line.type]}</span>
              <span className={cn(typeColors[line.type])}>{line.text}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
