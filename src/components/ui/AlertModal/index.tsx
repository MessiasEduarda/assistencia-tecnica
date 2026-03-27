'use client';
import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import styled from 'styled-components';

type AlertVariant = 'success' | 'error' | 'warning' | 'info';

const IconCircle = styled.div<{ $bg: string }>`
  width: 64px; height: 64px; border-radius: 50%;
  background: ${({ $bg }) => $bg};
  display: flex; align-items: center; justify-content: center;
  font-size: 1.75rem; margin: 0 auto 16px;
`;

const AlertTitle = styled.h3`
  font-size: 1.1rem; font-weight: 700; color: var(--neutral-900);
  text-align: center; margin-bottom: 8px;
`;

const AlertMessage = styled.p`
  font-size: 0.9rem; color: var(--neutral-500); text-align: center; line-height: 1.6;
`;

const ALERT_CONFIG: Record<AlertVariant, { icon: string; bg: string; btnVariant: any }> = {
  success: { icon: '✅', bg: '#D1FAE5', btnVariant: 'primary' },
  error:   { icon: '❌', bg: '#FEE2E2', btnVariant: 'danger'  },
  warning: { icon: '⚠️', bg: '#FEF3C7', btnVariant: 'primary' },
  info:    { icon: 'ℹ️', bg: '#DBEAFE', btnVariant: 'primary' },
};

export interface AlertModalProps {
  open: boolean;
  onClose: () => void;
  variant?: AlertVariant;
  title?: string;
  message?: string;
  closeLabel?: string;
}

export function AlertModal({ open, onClose, variant = 'info', title = 'Atenção', message, closeLabel = 'Fechar' }: AlertModalProps) {
  const cfg = ALERT_CONFIG[variant];
  return (
    <Modal open={open} onClose={onClose} size="sm" hideClose
      footer={<Button variant={cfg.btnVariant} onClick={onClose} style={{ minWidth: 120 }}>{closeLabel}</Button>}
    >
      <div style={{ padding: '12px 0 4px' }}>
        <IconCircle $bg={cfg.bg}>{cfg.icon}</IconCircle>
        <AlertTitle>{title}</AlertTitle>
        {message && <AlertMessage>{message}</AlertMessage>}
      </div>
    </Modal>
  );
}