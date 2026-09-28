import { DashboardCard } from '@/components/Dashboard/DashboardCard';
import { Badge } from '@/components/ui/Badge';
import type { ScreenId } from '@/types';
import { Radar, Package, GitBranch, Settings, ShieldCheck, Activity, AlertTriangle } from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: ScreenId) => void;
  simulationMode: boolean;
}

export function HomeScreen({ onNavigate, simulationMode }: HomeScreenProps) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4 py-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-cyber-cyan/30 bg-cyber-cyan/5 rounded-full">
          <ShieldCheck className="w-4 h-4 text-cyber-cyan" />
          <span className="text-xs font-mono text-cyber-cyan uppercase tracking-wider">Educational PoC Dashboard</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-mono font-bold text-cyber-text">
          CyberSentinel
        </h1>
        <p className="text-cyber-text-dim font-mono text-sm max-w-2xl mx-auto">
          Attack Vector Simulator — a visualization tool for security researchers to understand
          the lifecycle of advanced persistent threats. All data is simulated for educational purposes.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Badge variant={simulationMode ? 'green' : 'muted'} pulse={simulationMode}>
            <Activity className="w-3 h-3" /> {simulationMode ? 'Simulation Active' : 'Simulation Paused'}
          </Badge>
          <Badge variant="amber">
            <AlertTriangle className="w-3 h-3" /> No Real Exploits
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard
          icon={Radar}
          title="Reconnaissance"
          description="Simulate device fingerprinting: OS version, kernel build, browser engine, and network environment profiling."
          badge="Module 01"
          badgeVariant="cyan"
          onClick={() => onNavigate('recon')}
        />
        <DashboardCard
          icon={Package}
          title="Payload Delivery"
          description="Two-step attack walkthrough: Scout file metadata extraction vs. Payload buffer overflow with heap visualization."
          badge="Module 02"
          badgeVariant="amber"
          onClick={() => onNavigate('payload')}
        />
        <DashboardCard
          icon={GitBranch}
          title="Exploit Chain"
          description="Interactive flowchart: Parser error to buffer overflow to sandbox escape to kernel privilege escalation."
          badge="Module 03"
          badgeVariant="red"
          onClick={() => onNavigate('exploit')}
        />
        <DashboardCard
          icon={Settings}
          title="Settings"
          description="Configure simulation speed, toggle simulation mode, and adjust visualization parameters."
          badge="Config"
          badgeVariant="green"
          onClick={() => onNavigate('settings')}
        />
      </div>

      <div className="border border-cyber-border bg-cyber-surface rounded-lg p-6">
        <h2 className="font-mono text-sm font-bold text-cyber-cyan mb-3 uppercase tracking-wider">
          Attack Lifecycle Overview
        </h2>
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          {['IDLE', 'RECON', 'FINGERPRINTING', 'PAYLOAD_DELIVERY', 'EXPLOIT_CHAIN', 'COMPROMISE'].map((phase, i) => (
            <div key={phase} className="flex items-center gap-2">
              <span className={
                phase === 'COMPROMISE' ? 'px-2 py-1 border border-cyber-red/30 bg-cyber-red/5 text-cyber-red rounded' :
                phase === 'EXPLOIT_CHAIN' ? 'px-2 py-1 border border-cyber-amber/30 bg-cyber-amber/5 text-cyber-amber rounded' :
                'px-2 py-1 border border-cyber-border text-cyber-text-dim rounded'
              }>
                {phase}
              </span>
              {i < 5 && <span className="text-cyber-muted">{'->'}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
