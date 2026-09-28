import { useEffect, useState } from 'react';
import { cn } from '@/utils/cn';
import type { MemoryBlock } from '@/types';

interface MemoryVisualizerProps {
  active: boolean;
  overflowProgress: number;
  className?: string;
}

export function MemoryVisualizer({ active, overflowProgress, className }: MemoryVisualizerProps) {
  const [blocks, setBlocks] = useState<MemoryBlock[]>([]);

  useEffect(() => {
    const safeBlocks: MemoryBlock[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      label: `0x${(0x7fff0000 + i * 256).toString(16).toUpperCase()}`,
      type: 'safe' as const,
      filled: false,
    }));

    const systemBlocks: MemoryBlock[] = Array.from({ length: 4 }, (_, i) => ({
      id: i + 8,
      label: `0x${(0x7fff0800 + i * 256).toString(16).toUpperCase()}`,
      type: 'system' as const,
      filled: false,
    }));

    setBlocks([...safeBlocks, ...systemBlocks]);
  }, []);

  useEffect(() => {
    if (!active) return;
    const total = 12;
    const filledCount = Math.floor((overflowProgress / 100) * total);
    setBlocks((prev) =>
      prev.map((b, i) => {
        if (i < filledCount) {
          return {
            ...b,
            filled: true,
            type: i < 8 ? 'overflow' : 'system',
          };
        }
        return b;
      })
    );
  }, [active, overflowProgress]);

  return (
    <div className={cn('bg-black/60 border border-cyber-border rounded-lg p-4', className)}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono text-cyber-text-dim uppercase tracking-wider">Heap Memory Layout</span>
        <span className={cn('text-xs font-mono', active ? 'text-cyber-red animate-flicker' : 'text-cyber-muted')}>
          {active ? 'OVERFLOW DETECTED' : 'STABLE'}
        </span>
      </div>

      <div className="space-y-1.5">
        {blocks.map((block) => (
          <div
            key={block.id}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded border font-mono text-xs transition-all duration-300',
              block.type === 'system' && 'border-cyber-red/30 bg-cyber-red/5',
              block.type === 'safe' && !block.filled && 'border-cyber-border bg-cyber-bg',
              block.type === 'safe' && block.filled && 'border-cyber-green/40 bg-cyber-green/10',
              block.type === 'overflow' && block.filled && 'border-cyber-amber/50 bg-cyber-amber/10',
              block.type === 'system' && block.filled && 'border-cyber-red/60 bg-cyber-red/20 animate-flicker'
            )}
          >
            <span className="text-cyber-muted w-24 shrink-0">{block.label}</span>
            <div className="flex-1 h-3 bg-cyber-bg rounded-sm overflow-hidden">
              <div
                className={cn(
                  'h-full transition-all duration-500',
                  block.type === 'system' && block.filled && 'bg-cyber-red shadow-[0_0_6px_rgba(255,62,62,0.6)]',
                  block.type === 'overflow' && block.filled && 'bg-cyber-amber shadow-[0_0_6px_rgba(255,179,0,0.5)]',
                  block.type === 'safe' && block.filled && 'bg-cyber-green shadow-[0_0_6px_rgba(0,255,65,0.4)]',
                  !block.filled && 'bg-transparent'
                )}
                style={{ width: block.filled ? '100%' : '0%' }}
              />
            </div>
            <span className={cn(
              'text-xs uppercase shrink-0 w-16 text-right',
              block.type === 'system' ? 'text-cyber-red' : block.type === 'overflow' ? 'text-cyber-amber' : block.filled ? 'text-cyber-green' : 'text-cyber-muted'
            )}>
              {block.type === 'system' ? 'SYS' : block.filled ? 'DATA' : '---'}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex gap-4 text-xs font-mono">
        <span className="flex items-center gap-1.5 text-cyber-green">
          <span className="w-2 h-2 rounded-sm bg-cyber-green" /> Safe Data
        </span>
        <span className="flex items-center gap-1.5 text-cyber-amber">
          <span className="w-2 h-2 rounded-sm bg-cyber-amber" /> Overflow
        </span>
        <span className="flex items-center gap-1.5 text-cyber-red">
          <span className="w-2 h-2 rounded-sm bg-cyber-red" /> System Mem
        </span>
      </div>
    </div>
  );
}
