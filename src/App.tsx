import { useState, useCallback } from 'react';
import { cn } from '@/utils/cn';
import type { ScreenId } from '@/types';
import type { SimSpeed } from '@/utils/constants';
import { HomeScreen } from '@/screens/HomeScreen';
import { ReconScreen } from '@/screens/ReconScreen';
import { PayloadScreen } from '@/screens/PayloadScreen';
import { ExploitScreen } from '@/screens/ExploitScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';
import { SIMULATION_SPEEDS } from '@/utils/constants';
import {
  ShieldCheck,
  Home,
  Radar,
  Package,
  GitBranch,
  Settings,
  Menu,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface NavItem {
  id: ScreenId;
  label: string;
  icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Dashboard', icon: Home },
  { id: 'recon', label: 'Reconnaissance', icon: Radar },
  { id: 'payload', label: 'Payload', icon: Package },
  { id: 'exploit', label: 'Exploit Chain', icon: GitBranch },
  { id: 'settings', label: 'Settings', icon: Settings },
];

function App() {
  const [screen, setScreen] = useState<ScreenId>('home');
  const [simSpeed, setSimSpeed] = useState<SimSpeed>('normal');
  const [simulationMode, setSimulationMode] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavigate = useCallback((s: ScreenId) => {
    setScreen(s);
    setMobileOpen(false);
  }, []);

  const renderScreen = () => {
    switch (screen) {
      case 'home':
        return <HomeScreen onNavigate={handleNavigate} simulationMode={simulationMode} />;
      case 'recon':
        return <ReconScreen simSpeed={simSpeed} />;
      case 'payload':
        return <PayloadScreen speed={SIMULATION_SPEEDS[simSpeed]} />;
      case 'exploit':
        return <ExploitScreen simSpeed={simSpeed} />;
      case 'settings':
        return (
          <SettingsScreen
            simSpeed={simSpeed}
            setSimSpeed={setSimSpeed}
            simulationMode={simulationMode}
            setSimulationMode={setSimulationMode}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-cyber-bg grid-bg flex">
      <aside
        className={cn(
          'fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-cyber-surface border-r border-cyber-border flex flex-col transition-transform duration-300',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="p-5 border-b border-cyber-border">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg border border-cyber-cyan/40 bg-cyber-cyan/5 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-cyber-cyan" />
            </div>
            <div>
              <h1 className="font-mono font-bold text-sm text-cyber-text">CyberSentinel</h1>
              <p className="text-xs font-mono text-cyber-text-dim">Attack Vector Sim</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto cyber-scrollbar">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = screen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-mono text-sm transition-all duration-200',
                  isActive
                    ? 'bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30'
                    : 'text-cyber-text-dim hover:text-cyber-text hover:bg-cyber-elevated border border-transparent'
                )}
              >
                <Icon className={cn('w-4 h-4', isActive && 'text-glow-cyan')} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-cyber-border">
          <div className="flex items-center gap-2 px-2">
            <div className={cn(
              'w-2 h-2 rounded-full',
              simulationMode ? 'bg-cyber-green animate-pulse' : 'bg-cyber-muted'
            )} />
            <span className="text-xs font-mono text-cyber-text-dim">
              {simulationMode ? 'Simulation Active' : 'Simulation Paused'}
            </span>
          </div>
          <p className="text-xs font-mono text-cyber-muted mt-2 px-2">Educational PoC Tool</p>
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 bg-cyber-bg/80 backdrop-blur-sm border-b border-cyber-border px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-cyber-text-dim hover:text-cyber-cyan"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-cyber-text-dim">
            <span className="text-cyber-muted">{'>'}</span>
            <span className="text-cyber-cyan">{NAV_ITEMS.find((n) => n.id === screen)?.label}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-cyber-text-dim hidden sm:inline">SIM_MODE</span>
            <span className={cn(
              'px-2 py-0.5 text-xs font-mono border rounded',
              simulationMode
                ? 'text-cyber-green border-cyber-green/30 bg-cyber-green/5'
                : 'text-cyber-muted border-cyber-border'
            )}>
              {simulationMode ? 'ON' : 'OFF'}
            </span>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <div key={screen} className="animate-fade-in">
            {renderScreen()}
          </div>
        </main>

        <footer className="border-t border-cyber-border px-4 py-3 text-center">
          <p className="text-xs font-mono text-cyber-muted">
            CyberSentinel v1.0.0 — Educational Security Research Tool — No Real Exploits Performed
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
