import type { ExploitStep, DeviceProfile, VulnerabilityInfo } from '@/types';

export const SIMULATION_SPEEDS = {
  slow: 800,
  normal: 400,
  fast: 150,
} as const;

export type SimSpeed = keyof typeof SIMULATION_SPEEDS;

export const EXPLOIT_STEPS: ExploitStep[] = [
  {
    id: 'parser',
    label: 'Media Parser Error',
    description: 'Malformed JPEG header triggers integer overflow in libpng parser. Chunk size exceeds allocated buffer boundary.',
    icon: 'FileWarning',
    status: 'pending',
  },
  {
    id: 'overflow',
    label: 'Buffer Overflow',
    description: 'Crafted payload overwrites adjacent heap memory. Control flow hijacked via corrupted function pointer in vtable.',
    icon: 'AlertOctagon',
    status: 'pending',
  },
  {
    id: 'rce',
    label: 'Remote Code Execution',
    description: 'Arbitrary shellcode executes within renderer process context. Attacker gains USER-level code execution.',
    icon: 'Terminal',
    status: 'pending',
  },
  {
    id: 'sandbox',
    label: 'Sandbox Escape',
    description: 'Exploits IPC broker vulnerability to break out of app sandbox. Attacker pivots to SYSTEM daemon context.',
    icon: 'Unlock',
    status: 'pending',
  },
  {
    id: 'kernel',
    label: 'Kernel Privilege Escalation',
    description: 'Kernel exploit via corrupted syscall handler. Ring 0 achieved. Full device compromise confirmed.',
    icon: 'Crown',
    status: 'pending',
  },
];

export const MOCK_DEVICE_PROFILE: DeviceProfile = {
  os: 'Linux 6.1.55-generic',
  kernel: '6.1.55 #1 SMP PREEMPT',
  arch: 'x86_64 (AMD Ryzen 7 5800X)',
  browserEngine: 'Blink 118.0.5993.70',
  memoryMap: '0x7fff0000-0x7fff8000 (heap)',
  networkLatency: 12,
  sandboxVersion: 'seccomp-bpf v2.5',
  openPorts: [22, 80, 443, 8080],
};

export const MOCK_VULNERABILITIES: VulnerabilityInfo[] = [
  {
    cve: 'CVE-2024-31317',
    name: 'libpng Heap Buffer Overflow',
    description: 'Heap-based buffer overflow in libpng 1.6.40 allows remote attackers to execute arbitrary code via crafted PNG chunk length field.',
    cvss: 9.8,
    vector: 'Network / Low Complexity / No Auth',
  },
  {
    cve: 'CVE-2024-29987',
    name: 'Blink Renderer Use-After-Free',
    description: 'Use-after-free in Blink rendering engine during media element cleanup leads to sandbox escape.',
    cvss: 8.8,
    vector: 'Network / Low Complexity / User Interaction',
  },
  {
    cve: 'CVE-2024-21762',
    name: 'Kernel Syscall Handler Race',
    description: 'Race condition in syscall handler allows privilege escalation from SYSTEM to KERNEL context.',
    cvss: 7.2,
    vector: 'Local / Low Complexity / SYSTEM req.',
  },
];

export const RECON_PARAMETERS = [
  { key: 'os', label: 'Operating System', icon: 'Monitor' },
  { key: 'kernel', label: 'Kernel Build', icon: 'Cpu' },
  { key: 'arch', label: 'CPU Architecture', icon: 'Server' },
  { key: 'browserEngine', label: 'Browser Engine', icon: 'Globe' },
  { key: 'memoryMap', label: 'Memory Map', icon: 'Layers' },
  { key: 'sandboxVersion', label: 'Sandbox Version', icon: 'Shield' },
] as const;

export const SCOUT_LOG_STEPS = [
  'Analyzing file header structure...',
  'Extracting EXIF metadata from image...',
  'Parsing JPEG SOI marker (0xFFD8)...',
  'Scanning APP1 segment for XMP data...',
  'Reading quantization tables...',
  'Identifying Huffman encoding...',
  'Extracting color profile (ICC)...',
  'Metadata extraction complete. 14 fields collected.',
];

export const PAYLOAD_LOG_STEPS = [
  'Injecting crafted PNG chunk (length: 0x41414141)...',
  'Triggering integer overflow in png_read_chunk()...',
  'Heap buffer overflow: 4096 bytes written to 2048 slot...',
  'Overwriting adjacent heap metadata...',
  'Corrupting vtable function pointer at 0x7fff3a20...',
  'Hijacking control flow to shellcode stub...',
  'Shellcode executing in renderer process (PID 4892)...',
  'RCE confirmed. Dropping into interactive session...',
];
