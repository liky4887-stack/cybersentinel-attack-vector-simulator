import { useState, useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Terminal } from '@/components/Terminal/Terminal';
import { useScanner } from '@/hooks/useScanner';
import { useTerminal } from '@/hooks/useTerminal';
import { SIMULATION_SPEEDS, type SimSpeed } from '@/utils/constants';
import { cn } from '@/utils/cn';
import { Radar, Cpu, Server, Globe, Layers, Shield, Monitor, Bug, Play, RotateCcw } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ReconScreenProps {
  simSpeed: SimSpeed;
}

const iconMap: Record<string, LucideIcon> = {
  Monitor, Cpu, Server, Globe, Layers, Shield,
};

export function ReconScreen({ simSpeed }: ReconScreenProps) {
  const speed = SIMULATION_SPEEDS[simSpeed];
  const { status, results, vulnerabilities, startScan, reset } = useScanner(speed);
  const { lines, addLine, clear } = useTerminal();
  const [hasStarted, setHasStarted] = useState(false);

  const handleStart = useCallback(() => {
    setHasStarted(true);
    clear();
    startScan(addLine);
  }, [clear, startScan, addLine]);

  const handleReset = useCallback(() => {
    reset();
    clear();
    setHasStarted(false);
  }, [reset, clear]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-mono font-bold text-cyber-cyan text-glow-cyan">Reconnaissance Module</h2>
          <p className="text-sm font-mono text-cyber-text-dim mt-1">Device fingerprinting and vulnerability discovery simulation</p>
        </div>
        <div className="flex gap-2">
          <Button variant="primary" onClick={handleStart} disabled={status === 'scanning'}>
            <Play className="w-4 h-4" /> Start Scan
          </Button>
          <Button variant="ghost" onClick={handleReset}>
            <RotateCcw className="w-4 h-4" /> Reset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-5" scan={status === 'scanning'}>
          <div className="flex items-center gap-2 mb-4">
            <Radar className={cn('w-5 h-5', status === 'scanning' ? 'text-cyber-cyan animate-pulse' : 'text-cyber-text-dim')} />
            <h3 className="font-mono text-sm font-bold text-cyber-text uppercase tracking-wider">Device Profile</h3>
            {status === 'scanning' && <Badge variant="cyan" pulse>Scanning</Badge>}
            {status === 'complete' && <Badge variant="green">Complete</Badge>}
          </div>

          <div className="space-y-3">
            {results.map((result) => {
              const Icon = iconMap[result.key] ?? Monitor;
              return (
                <div key={result.key} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className={cn(
                        'w-4 h-4',
                        result.status === 'complete' ? 'text-cyber-green' :
                        result.status === 'scanning' ? 'text-cyber-cyan animate-pulse' :
                        'text-cyber-muted'
                      )} />
                      <span className="text-xs font-mono text-cyber-text-dim">{result.label}</span>
                    </div>
                    <span className={cn(
                      'text-xs font-mono',
                      result.status === 'complete' ? 'text-cyber-green' :
                      result.status === 'scanning' ? 'text-cyber-cyan' : 'text-cyber-muted'
                    )}>
                      {result.status === 'complete' ? result.value : result.status === 'scanning' ? '...' : '---'}
                    </span>
                  </div>
                  {(result.status === 'scanning' || result.status === 'complete') && (
                    <ProgressBar
                      value={result.progress}
                      color={result.status === 'complete' ? 'green' : 'cyan'}
                      height="h-1"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Bug className="w-5 h-5 text-cyber-amber" />
              <h3 className="font-mono text-sm font-bold text-cyber-text uppercase tracking-wider">Vulnerabilities Found</h3>
              {vulnerabilities.length > 0 && (
                <Badge variant="red" pulse>{vulnerabilities.length}</Badge>
              )}
            </div>

            {vulnerabilities.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-xs font-mono text-cyber-muted">
                  {hasStarted ? 'Scanning for vulnerabilities...' : 'Run a scan to discover vulnerabilities'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {vulnerabilities.map((vuln) => (
                  <div
                    key={vuln.cve}
                    className="p-3 border border-cyber-red/20 bg-cyber-red/5 rounded-lg animate-slide-up"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono font-bold text-cyber-red">{vuln.cve}</span>
                      <Badge variant={vuln.cvss >= 9 ? 'red' : vuln.cvss >= 7 ? 'amber' : 'cyan'}>
                        CVSS {vuln.cvss}
                      </Badge>
                    </div>
                    <p className="text-sm font-mono text-cyber-text mb-1">{vuln.name}</p>
                    <p className="text-xs font-mono text-cyber-text-dim leading-relaxed">{vuln.description}</p>
                    <p className="text-xs font-mono text-cyber-muted mt-2">Vector: {vuln.vector}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Terminal lines={lines} title="recon@cybersentinel:~$" className="h-64" />
        </div>
      </div>
    </div>
  );
}
