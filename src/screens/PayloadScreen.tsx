import { useState, useCallback, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Terminal } from '@/components/Terminal/Terminal';
import { MemoryVisualizer } from '@/components/Visualizer/MemoryVisualizer';
import { useTerminal } from '@/hooks/useTerminal';
import { SCOUT_LOG_STEPS, PAYLOAD_LOG_STEPS } from '@/utils/constants';
import { cn } from '@/utils/cn';
import { FileSearch, Skull, Play, RotateCcw, ArrowRight } from 'lucide-react';

type Phase = 'idle' | 'scout' | 'transition' | 'payload' | 'done';

interface PayloadScreenProps {
  speed: number;
}

export function PayloadScreen({ speed }: PayloadScreenProps) {
  const { lines: scoutLines, addLine: addScoutLine, clear: clearScout } = useTerminal();
  const { lines: payloadLines, addLine: addPayloadLine, clear: clearPayload } = useTerminal();
  const [phase, setPhase] = useState<Phase>('idle');
  const [scoutProgress, setScoutProgress] = useState(0);
  const [payloadProgress, setPayloadProgress] = useState(0);
  const [overflowProgress, setOverflowProgress] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const runScout = useCallback(() => {
    clearScout();
    setScoutProgress(0);
    setPhase('scout');

    SCOUT_LOG_STEPS.forEach((log, i) => {
      const t = setTimeout(() => addScoutLine(log, i === SCOUT_LOG_STEPS.length - 1 ? 'success' : 'info'), i * speed);
      timers.current.push(t);
    });

    const progressInterval = setInterval(() => {
      setScoutProgress((p) => Math.min(100, p + 100 / SCOUT_LOG_STEPS.length));
    }, speed);
    timers.current.push(progressInterval as unknown as ReturnType<typeof setTimeout>);

    const done = setTimeout(() => {
      clearInterval(progressInterval);
      setScoutProgress(100);
      setPhase('transition');
      const next = setTimeout(() => {
        runPayload();
      }, speed * 2);
      timers.current.push(next);
    }, SCOUT_LOG_STEPS.length * speed + speed);
    timers.current.push(done);
  }, [speed, addScoutLine, clearScout]);

  const runPayload = useCallback(() => {
    clearPayload();
    setPayloadProgress(0);
    setOverflowProgress(0);
    setPhase('payload');

    PAYLOAD_LOG_STEPS.forEach((log, i) => {
      const t = setTimeout(() => {
        addPayloadLine(log, i >= 5 ? 'error' : i >= 3 ? 'warning' : 'info');
        setPayloadProgress(((i + 1) / PAYLOAD_LOG_STEPS.length) * 100);
        setOverflowProgress(((i + 1) / PAYLOAD_LOG_STEPS.length) * 100);
      }, i * speed);
      timers.current.push(t);
    });

    const done = setTimeout(() => {
      setPhase('done');
    }, PAYLOAD_LOG_STEPS.length * speed + speed);
    timers.current.push(done);
  }, [speed, addPayloadLine, clearPayload]);

  const handleStart = useCallback(() => {
    clearTimers();
    runScout();
  }, [clearTimers, runScout]);

  const handleReset = useCallback(() => {
    clearTimers();
    clearScout();
    clearPayload();
    setPhase('idle');
    setScoutProgress(0);
    setPayloadProgress(0);
    setOverflowProgress(0);
  }, [clearTimers, clearScout, clearPayload]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-mono font-bold text-cyber-amber text-glow-amber">Payload Delivery Sandbox</h2>
          <p className="text-sm font-mono text-cyber-text-dim mt-1">Two-step attack strategy: Scout file extraction, then payload execution</p>
        </div>
        <div className="flex gap-2">
          <Button variant="primary" onClick={handleStart} disabled={phase === 'scout' || phase === 'payload' || phase === 'transition'}>
            <Play className="w-4 h-4" /> Start Simulation
          </Button>
          <Button variant="ghost" onClick={handleReset}>
            <RotateCcw className="w-4 h-4" /> Reset
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 py-2">
        <div className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-lg border font-mono text-xs uppercase tracking-wider transition-all',
          phase === 'scout' ? 'border-cyber-cyan bg-cyber-cyan/10 text-cyber-cyan box-glow-cyan' :
          phase === 'idle' ? 'border-cyber-border text-cyber-muted' :
          'border-cyber-green/30 bg-cyber-green/5 text-cyber-green'
        )}>
          <FileSearch className="w-4 h-4" /> Step 1: Scout
        </div>
        <ArrowRight className={cn('w-4 h-4', phase === 'idle' ? 'text-cyber-muted' : 'text-cyber-text-dim')} />
        <div className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-lg border font-mono text-xs uppercase tracking-wider transition-all',
          phase === 'payload' || phase === 'transition' ? 'border-cyber-amber bg-cyber-amber/10 text-cyber-amber box-glow-cyan' :
          phase === 'done' ? 'border-cyber-red/30 bg-cyber-red/5 text-cyber-red' :
          'border-cyber-border text-cyber-muted'
        )}>
          <Skull className="w-4 h-4" /> Step 2: Payload
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card className="p-5" scan={phase === 'scout'}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileSearch className={cn('w-5 h-5', phase === 'scout' ? 'text-cyber-cyan animate-pulse' : phase === 'idle' ? 'text-cyber-muted' : 'text-cyber-green')} />
                <h3 className="font-mono text-sm font-bold text-cyber-text uppercase tracking-wider">Scout File Analysis</h3>
              </div>
              {phase === 'scout' && <Badge variant="cyan" pulse>Scanning</Badge>}
              {(phase === 'transition' || phase === 'payload' || phase === 'done') && <Badge variant="green">Complete</Badge>}
            </div>
            <p className="text-xs font-mono text-cyber-text-dim mb-3">
              Harmless image file used to collect metadata: EXIF data, header structures, and environment info.
            </p>
            <ProgressBar value={scoutProgress} color="cyan" showLabel height="h-1.5" />
            <Terminal lines={scoutLines} title="scout@payload:~$" className="h-48 mt-3" />
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-5" scan={phase === 'payload'} glow={phase === 'done' ? 'red' : 'none'}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Skull className={cn(
                  'w-5 h-5',
                  phase === 'payload' ? 'text-cyber-amber animate-pulse' :
                  phase === 'done' ? 'text-cyber-red' :
                  phase === 'idle' ? 'text-cyber-muted' : 'text-cyber-text-dim'
                )} />
                <h3 className="font-mono text-sm font-bold text-cyber-text uppercase tracking-wider">Payload Execution</h3>
              </div>
              {phase === 'payload' && <Badge variant="amber" pulse>Executing</Badge>}
              {phase === 'done' && <Badge variant="red" pulse>Compromised</Badge>}
            </div>
            <p className="text-xs font-mono text-cyber-text-dim mb-3">
              Malicious payload triggers buffer overflow, corrupting heap memory and hijacking control flow.
            </p>
            <ProgressBar value={payloadProgress} color={phase === 'done' ? 'red' : 'amber'} showLabel height="h-1.5" />
            <Terminal lines={payloadLines} title="payload@exploit:~$" className="h-48 mt-3" />
          </Card>
        </div>
      </div>

      <MemoryVisualizer active={phase === 'payload' || phase === 'done'} overflowProgress={overflowProgress} />

      {phase === 'done' && (
        <Card glow="red" className="p-4 animate-slide-up">
          <div className="flex items-center gap-3">
            <Skull className="w-6 h-6 text-cyber-red animate-flicker" />
            <div>
              <p className="font-mono text-sm font-bold text-cyber-red text-glow-red">PAYLOAD DELIVERY SUCCESSFUL</p>
              <p className="text-xs font-mono text-cyber-text-dim">Remote code execution achieved. Attacker now has USER-level access in renderer process context.</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
