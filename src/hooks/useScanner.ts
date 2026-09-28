import { useState, useCallback, useRef, useEffect } from 'react';
import type { DeviceProfile, VulnerabilityInfo } from '@/types';
import { MOCK_DEVICE_PROFILE, MOCK_VULNERABILITIES, RECON_PARAMETERS } from '@/utils/constants';

export type ScanStatus = 'idle' | 'scanning' | 'complete';

export interface ScanResult {
  key: string;
  label: string;
  value: string;
  status: ScanStatus;
  progress: number;
}

export function useScanner(speed: number = 400) {
  const [status, setStatus] = useState<ScanStatus>('idle');
  const [results, setResults] = useState<ScanResult[]>(
    RECON_PARAMETERS.map((p) => ({
      key: p.key,
      label: p.label,
      value: '',
      status: 'idle' as const,
      progress: 0,
    }))
  );
  const [vulnerabilities, setVulnerabilities] = useState<VulnerabilityInfo[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const startScan = useCallback(
    (onLog?: (text: string) => void) => {
      clearTimers();
      setStatus('scanning');
      setResults(
        RECON_PARAMETERS.map((p) => ({
          key: p.key,
          label: p.label,
          value: '',
          status: 'idle' as const,
          progress: 0,
        }))
      );
      setVulnerabilities([]);

      onLog?.('[*] Initiating reconnaissance scan...');
      onLog?.('[*] Target: 192.168.1.42 (local network)');
      onLog?.('[*] Probing device fingerprint...');

      RECON_PARAMETERS.forEach((param, index) => {
        const scanStart = setTimeout(() => {
          setResults((prev) =>
            prev.map((r) =>
              r.key === param.key ? { ...r, status: 'scanning' as const } : r
            )
          );
          onLog?.(`[>] Scanning ${param.label}...`);

          let progress = 0;
          const interval = setInterval(() => {
            progress += Math.random() * 25 + 10;
            if (progress >= 100) {
              progress = 100;
              clearInterval(interval);
              const value =
                MOCK_DEVICE_PROFILE[param.key as keyof DeviceProfile] ?? 'Unknown';
              setResults((prev) =>
                prev.map((r) =>
                  r.key === param.key
                    ? { ...r, status: 'complete' as const, progress: 100, value: String(value) }
                    : r
                )
              );
              onLog?.(`[+] ${param.label}: ${value}`);
            } else {
              setResults((prev) =>
                prev.map((r) =>
                  r.key === param.key ? { ...r, progress } : r
                )
              );
            }
          }, speed / 3);
          timers.current.push(interval as unknown as ReturnType<typeof setTimeout>);
        }, index * speed * 2);
        timers.current.push(scanStart);
      });

      const vulnDelay = RECON_PARAMETERS.length * speed * 2 + speed * 2;
      const vulnTimer = setTimeout(() => {
        setStatus('complete');
        setVulnerabilities(MOCK_VULNERABILITIES);
        onLog?.('[!] Vulnerability scan complete.');
        onLog?.(`[!] ${MOCK_VULNERABILITIES.length} vulnerabilities identified.`);
        onLog?.('[*] Reconnaissance phase complete.');
      }, vulnDelay);
      timers.current.push(vulnTimer);
    },
    [clearTimers, speed]
  );

  const reset = useCallback(() => {
    clearTimers();
    setStatus('idle');
    setResults(
      RECON_PARAMETERS.map((p) => ({
        key: p.key,
        label: p.label,
        value: '',
        status: 'idle' as const,
        progress: 0,
      }))
    );
    setVulnerabilities([]);
  }, [clearTimers]);

  return { status, results, vulnerabilities, startScan, reset };
}
