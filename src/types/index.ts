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

export type ScreenId =
  | 'home'
  | 'recon'
  | 'payload'
  | 'exploit'
  | 'command'
  | 'social'
  | 'adaptive'
  | 'ghost'
  | 'sync'
  | 'settings';

export type CampaignPhase = 'IDLE' | 'INTELLIGENCE' | 'TARGETING' | 'DELIVERY' | 'EXECUTION' | 'PERSISTENCE' | 'COMPLETE';

export interface TargetProfile {
  id: string;
  handle: string;
  networkProfile: string;
  osLayer: string;
  patchLevel: string;
  kernelBuild: string;
  appLayer: string;
  libVersions: string;
  cpuArch: string;
  gpuModel: string;
  deviceFamily: string;
  isp: string;
  vpnStatus: string;
  securityPosture: string;
}

export interface ReconPipelineStep {
  id: string;
  label: string;
  status: 'pending' | 'active' | 'complete';
}

export interface LureConfig {
  context: string;
  timing: string;
  messageTemplate: string;
  channel: string;
  effectiveness: number;
}

export interface CrashSignature {
  id: string;
  errorCode: string;
  description: string;
  payloadVariant: string;
  resolved: boolean;
}

export interface AdaptiveIteration {
  iteration: number;
  crashSignature: CrashSignature | null;
  payloadAdjustment: string;
  result: 'crash' | 'partial' | 'success';
}

export interface StealthMetric {
  label: string;
  value: number;
  max: number;
  unit: string;
}

export interface PersistenceTechnique {
  id: string;
  name: string;
  description: string;
  icon: string;
  noiseLevel: 'low' | 'medium' | 'high';
  detected: boolean;
  active: boolean;
}

export interface SyncedDevice {
  id: string;
  name: string;
  type: 'phone' | 'laptop' | 'cloud' | 'tablet';
  status: 'offline' | 'syncing' | 'synced' | 'compromised';
  lastSync: string;
  dataSize: string;
}

export interface RiskFactor {
  label: string;
  value: number;
  color: 'green' | 'amber' | 'red';
}
