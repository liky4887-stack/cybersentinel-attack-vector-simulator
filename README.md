# CyberSentinel: Attack Vector Simulator

An educational Proof of Concept (PoC) dashboard designed for security researchers to visualize the lifecycle of advanced persistent threats (APTs). All data is simulated — no real exploits, network connections, or file operations are performed.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** build tool
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **clsx** for class merging

## Features

### Module 1: Reconnaissance
Simulates device fingerprinting with animated progress bars for OS version, kernel build, CPU architecture, browser engine, memory map, and sandbox version. Discovers mock vulnerabilities with CVSS scores.

### Module 2: Payload Delivery
Two-step attack walkthrough:
- **Scout File**: Simulates metadata extraction from a harmless image (EXIF data, header structures)
- **Payload**: Simulates buffer overflow with a live heap memory visualizer showing data overflowing into system memory

### Module 3: Exploit Chain
Interactive step-by-step flowchart visualizing the full attack progression:
1. Media Parser Error (integer overflow in libpng)
2. Buffer Overflow (heap corruption, vtable hijack)
3. Remote Code Execution (shellcode in renderer process)
4. Sandbox Escape (IPC broker exploit)
5. Kernel Privilege Escalation (Ring 0 achieved)

### Settings
- Simulation speed control (Slow / Normal / Fast)
- Simulation mode toggle
- About and safety information

## Design

- Dark terminal aesthetic with deep black backgrounds
- Cyber color system: cyan (info), green (safe), amber (warning), red (critical)
- JetBrains Mono font throughout
- Grid background, scan-line animations, glitch effects, flicker animations
- Fully responsive with mobile sidebar navigation

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Disclaimer

This is a purely educational visualization tool. No real exploits are executed. All vulnerability data, device profiles, and attack logs are mock/simulated for research and learning purposes.
