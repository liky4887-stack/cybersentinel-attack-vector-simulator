import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Toggle } from '@/components/ui/Toggle';
import { cn } from '@/utils/cn';
import { SIMULATION_SPEEDS, type SimSpeed } from '@/utils/constants';
import { Settings, Gauge, ShieldCheck, Info } from 'lucide-react';

interface SettingsScreenProps {
  simSpeed: SimSpeed;
  setSimSpeed: (speed: SimSpeed) => void;
  simulationMode: boolean;
  setSimulationMode: (mode: boolean) => void;
}

export function SettingsScreen({
  simSpeed,
  setSimSpeed,
  simulationMode,
  setSimulationMode,
}: SettingsScreenProps) {
  const speeds: { key: SimSpeed; label: string; description: string }[] = [
    { key: 'slow', label: 'Slow', description: '800ms delay — detailed observation' },
    { key: 'normal', label: 'Normal', description: '400ms delay — balanced pace' },
    { key: 'fast', label: 'Fast', description: '150ms delay — rapid execution' },
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-mono font-bold text-cyber-green text-glow-green">Settings</h2>
        <p className="text-sm font-mono text-cyber-text-dim mt-1">Configure simulation parameters and visualization options</p>
      </div>

      <Card className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <Gauge className="w-5 h-5 text-cyber-cyan" />
          <h3 className="font-mono text-sm font-bold text-cyber-text uppercase tracking-wider">Simulation Speed</h3>
        </div>
        <div className="space-y-2">
          {speeds.map((speed) => (
            <button
              key={speed.key}
              onClick={() => setSimSpeed(speed.key)}
              className={cn(
                'w-full text-left p-3 rounded-lg border transition-all duration-200',
                simSpeed === speed.key
                  ? 'border-cyber-cyan bg-cyber-cyan/10 box-glow-cyan'
                  : 'border-cyber-border bg-cyber-bg hover:border-cyber-border-bright'
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className={cn(
                    'font-mono text-sm font-bold',
                    simSpeed === speed.key ? 'text-cyber-cyan' : 'text-cyber-text'
                  )}>
                    {speed.label}
                  </span>
                  <p className="text-xs font-mono text-cyber-text-dim mt-0.5">{speed.description}</p>
                </div>
                {simSpeed === speed.key && <Badge variant="cyan">Active</Badge>}
              </div>
            </button>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="w-5 h-5 text-cyber-green" />
          <h3 className="font-mono text-sm font-bold text-cyber-text uppercase tracking-wider">Simulation Mode</h3>
        </div>
        <div className="flex items-center justify-between p-3 rounded-lg border border-cyber-border bg-cyber-bg">
          <div>
            <p className="font-mono text-sm text-cyber-text">Enable Simulation Mode</p>
            <p className="text-xs font-mono text-cyber-text-dim mt-0.5">
              When enabled, all attack simulations run with mock data. No real network requests or exploits are executed.
            </p>
          </div>
          <Toggle checked={simulationMode} onChange={setSimulationMode} />
        </div>
      </Card>

      <Card className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-5 h-5 text-cyber-amber" />
          <h3 className="font-mono text-sm font-bold text-cyber-text uppercase tracking-wider">About CyberSentinel</h3>
        </div>
        <div className="space-y-3 text-xs font-mono text-cyber-text-dim leading-relaxed">
          <p>
            CyberSentinel is an educational Proof of Concept (PoC) dashboard designed for security researchers
            to visualize the lifecycle of advanced persistent threats (APTs).
          </p>
          <p>
            All data in this application is <span className="text-cyber-green">simulated</span>. No real exploits,
            network connections, or file operations are performed. The tool demonstrates attack chain logic
            for educational and defensive research purposes only.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <Badge variant="cyan">Educational</Badge>
            <Badge variant="green">No Real Exploits</Badge>
            <Badge variant="amber">PoC Only</Badge>
            <Badge variant="muted">v1.0.0</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}
