export type AttackState =
  | 'IDLE'
  | 'RECON'
  | 'FINGERPRINTING'
  | 'PAYLOAD_DELIVERY'
  | 'EXPLOIT_CHAIN'
  | 'COMPROMISE';

export type PrivilegeLevel = 'USER' | 'SYSTEM' | 'KERNEL';

export type ThreatLevel = 'SAFE' | 'INFO' | 'WARNING' | 'CRITICAL';

export interface DeviceProfile {
  os: string;
  kernel: string;
  arch: string;
  browserEngine: string;
  memoryMap: string;
  networkLatency: number;
  sandboxVersion: string;
  openPorts: number[];
}

export interface VulnerabilityInfo {
  cve: string;
  name: string;
  description: string;
  cvss: number;
  vector: string;
}

export interface ExploitStep {
  id: string;
  label: string;
  description: string;
  icon: string;
  status: 'pending' | 'active' | 'complete' | 'failed';
}

export interface SimulationData {
  targetOS: string;
  vulnerabilityFound: VulnerabilityInfo | null;
  privilegeLevel: PrivilegeLevel;
  exploitPath: ExploitStep[];
}

export interface TerminalLine {
  id: number;
  text: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'command';
  timestamp: string;
}

export interface MemoryBlock {
  id: number;
  label: string;
  type: 'safe' | 'overflow' | 'system';
  filled: boolean;
}

export type ScreenId = 'home' | 'recon' | 'payload' | 'exploit' | 'settings';
