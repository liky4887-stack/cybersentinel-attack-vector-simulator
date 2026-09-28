import { useState, useCallback, useRef, useEffect } from 'react';
import type { AttackState, ExploitStep, SimulationData, PrivilegeLevel } from '@/types';
import { EXPLOIT_STEPS, SIMULATION_SPEEDS, type SimSpeed } from '@/utils/constants';

export function useAttackLifecycle() {
  const [state, setState] = useState<AttackState>('IDLE');
  const [steps, setSteps] = useState<ExploitStep[]>(
    EXPLOIT_STEPS.map((s) => ({ ...s, status: 'pending' as const }))
  );
  const [privilege, setPrivilege] = useState<PrivilegeLevel>('USER');
  const [simSpeed, setSimSpeed] = useState<SimSpeed>('normal');
  const [simulationMode, setSimulationMode] = useState(true);
  const [activeStepIndex, setActiveStepIndex] = useState(-1);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const speed = SIMULATION_SPEEDS[simSpeed];

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => {
    return clearTimers;
  }, [clearTimers]);

  const reset = useCallback(() => {
    clearTimers();
    setState('IDLE');
    setSteps(EXPLOIT_STEPS.map((s) => ({ ...s, status: 'pending' as const })));
    setPrivilege('USER');
    setActiveStepIndex(-1);
  }, [clearTimers]);

  const advanceStep = useCallback((index: number) => {
    setActiveStepIndex(index);
    setSteps((prev) =>
      prev.map((s, i) => {
        if (i < index) return { ...s, status: 'complete' as const };
        if (i === index) return { ...s, status: 'active' as const };
        return s;
      })
    );
  }, []);

  const completeStep = useCallback((index: number) => {
    setSteps((prev) =>
      prev.map((s, i) =>
        i === index ? { ...s, status: 'complete' as const } : s
      )
    );
  }, []);

  const startExploitChain = useCallback(
    (onStep?: (stepIndex: number, step: ExploitStep) => void) => {
      clearTimers();
      setState('EXPLOIT_CHAIN');
      setPrivilege('USER');

      EXPLOIT_STEPS.forEach((_, index) => {
        const activate = setTimeout(() => {
          advanceStep(index);
          onStep?.(index, EXPLOIT_STEPS[index]);
        }, index * speed * 3);
        timers.current.push(activate);

        const complete = setTimeout(() => {
          completeStep(index);
          if (index === 2) setPrivilege('SYSTEM');
          if (index === 4) {
            setPrivilege('KERNEL');
            setState('COMPROMISE');
          }
        }, index * speed * 3 + speed * 2);
        timers.current.push(complete);
      });
    },
    [clearTimers, speed, advanceStep, completeStep]
  );

  const simulationData: SimulationData = {
    targetOS: 'Linux 6.1.55-generic',
    vulnerabilityFound: null,
    privilegeLevel: privilege,
    exploitPath: steps,
  };

  return {
    state,
    setState,
    steps,
    privilege,
    simSpeed,
    setSimSpeed,
    simulationMode,
    setSimulationMode,
    activeStepIndex,
    startExploitChain,
    reset,
    simulationData,
  };
}
