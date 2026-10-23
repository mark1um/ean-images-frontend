/**
 * Polling do status do pedido na página de pagamento.
 *
 * - Consulta a cada 5s até o pedido ser SENT, ERROR ou EXPIRED.
 * - Continua depois do PAID para mostrar quando as imagens foram enviadas.
 * - Consulta na hora quando o cliente volta para a aba (ex.: depois de pagar no app do banco).
 * - Para depois de 70 min (o PIX expira em 60 min).
 */

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { getOrderStatus } from '@/services/api';
import type { OrderStatus } from '@/types';

const POLL_INTERVAL = 5000;
const MAX_POLL_TIME = 70 * 60 * 1000;
const FINAL_STATUSES: OrderStatus['status'][] = ['SENT', 'ERROR', 'EXPIRED'];

type PollingState = 'idle' | 'polling' | 'completed' | 'error' | 'timeout';

export function useOrderPolling(orderId: string | null) {
  const [status, setStatus] = useState<OrderStatus | null>(null);
  const [pollingState, setPollingState] = useState<PollingState>('idle');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stoppedRef = useRef(true);

  const stopPolling = useCallback(() => {
    stoppedRef.current = true;
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    intervalRef.current = null;
    timeoutRef.current = null;
  }, []);

  const poll = useCallback(async () => {
    if (!orderId) return;
    try {
      const orderStatus = await getOrderStatus(orderId);
      setStatus(orderStatus);

      if (FINAL_STATUSES.includes(orderStatus.status)) {
        stopPolling();
        setPollingState(orderStatus.status === 'SENT' ? 'completed' : 'error');
      }
    } catch {
      // Ignorar erros de rede temporarios durante polling
    }
  }, [orderId, stopPolling]);

  const startPolling = useCallback(() => {
    if (!orderId) return;

    stopPolling();
    stoppedRef.current = false;
    setPollingState('polling');

    poll();
    intervalRef.current = setInterval(poll, POLL_INTERVAL);
    timeoutRef.current = setTimeout(() => {
      stopPolling();
      setPollingState('timeout');
    }, MAX_POLL_TIME);
  }, [orderId, poll, stopPolling]);

  useEffect(() => {
    if (orderId) startPolling();
    return () => stopPolling();
  }, [orderId, startPolling, stopPolling]);

  // Cliente voltou para a aba: confere o pagamento imediatamente
  useEffect(() => {
    function handleVisibility() {
      if (document.visibilityState === 'visible' && !stoppedRef.current) poll();
    }
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [poll]);

  return { status, pollingState, restartPolling: startPolling };
}
