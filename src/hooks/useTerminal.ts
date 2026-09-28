import { useState, useCallback, useRef } from 'react';
import type { TerminalLine } from '@/types';
import { formatTime } from '@/utils/helpers';

export function useTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const lineId = useRef(0);

  const addLine = useCallback((text: string, type: TerminalLine['type'] = 'info') => {
    const id = lineId.current++;
    setLines((prev) => [
      ...prev,
      { id, text, type, timestamp: formatTime(new Date()) },
    ]);
  }, []);

  const clear = useCallback(() => {
    setLines([]);
    lineId.current = 0;
  }, []);

  return { lines, addLine, clear };
}
