import type { ThreatLevel } from '@/types';

export function formatTime(date: Date): string {
  return date.toTimeString().split(' ')[0] + '.' + String(date.getMilliseconds()).padStart(3, '0');
}

export function getThreatColor(level: ThreatLevel): string {
  switch (level) {
    case 'SAFE': return 'text-cyber-green';
    case 'INFO': return 'text-cyber-cyan';
    case 'WARNING': return 'text-cyber-amber';
    case 'CRITICAL': return 'text-cyber-red';
  }
}

export function getThreatBg(level: ThreatLevel): string {
  switch (level) {
    case 'SAFE': return 'bg-cyber-green/10 border-cyber-green/30';
    case 'INFO': return 'bg-cyber-cyan/10 border-cyber-cyan/30';
    case 'WARNING': return 'bg-cyber-amber/10 border-cyber-amber/30';
    case 'CRITICAL': return 'bg-cyber-red/10 border-cyber-red/30';
  }
}

export function getThreatGlow(level: ThreatLevel): string {
  switch (level) {
    case 'SAFE': return 'box-glow-green';
    case 'INFO': return 'box-glow-cyan';
    case 'WARNING': return 'box-glow-cyan';
    case 'CRITICAL': return 'box-glow-red';
  }
}
