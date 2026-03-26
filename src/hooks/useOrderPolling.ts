/**
 * Hook para polling do status do pedido apos pagamento.
 *
 * Verifica a cada 3 segundos ate o pedido ser SENT ou ERROR.
 * Para automaticamente apos 10 minutos (timeout de seguranca).
 */

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { getOrderStatus } from '@/services/api';
import type { OrderStatus } from '@/types';

const POLL_INTERVAL = 3000;
const MAX_POLL_TIME = 600000;

type PollingState = 'idle' | 'polling' | 'completed' | 'error' | 'timeout';

export function useOrderPolling(orderId: string | null) {
  const [status, setStatus] = useState<OrderStatus | null>(null);
  const [pollingState, setPollingState] = useState<PollingState>('idle');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const stopPolling = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const startPolling = useCallback(() => {
    if (!orderId) return;

    setPollingState('polling');

    const poll = async () => {
      try {
        const orderStatus = await getOrderStatus(orderId);
        setStatus(orderStatus);

        if (orderStatus.status === 'PAID') {
          stopPolling();
          setPollingState('completed');
        } else if (orderStatus.status === 'ERROR' || orderStatus.status === 'EXPIRED') {
          stopPolling();
          setPollingState('error');
        }
      } catch {
        // Ignorar erros de rede temporarios durante polling
      }
    };

    poll();
    intervalRef.current = setInterval(poll, POLL_INTERVAL);

    timeoutRef.current = setTimeout(() => {
      stopPolling();
      setPollingState('timeout');
    }, MAX_POLL_TIME);
  }, [orderId, stopPolling]);

  useEffect(() => {
    if (orderId) startPolling();
    return () => stopPolling();
  }, [orderId, startPolling, stopPolling]);

  return { status, pollingState };
}
