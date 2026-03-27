'use client';
import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import styled from 'styled-components';

const IconWrap = styled.div<{ $color: string }>`
  width: 52px; height: 52px; border-radius: 50%;
  background: ${({ $color }) => $color}22;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.5rem; margin-bottom: 14px;
`;

const Message = styled.p`
  font-size: 0.9375rem; color: var(--neutral-600); line-height: 1.6;
`;

type Variant = 'danger' | 'warning' | 'info';

const CONFIG: Record<Variant, { icon: string; color: string; confirmLabel: string; confirmVariant: any }> = {
  danger:  { icon: '🗑️', color: '#EF4444', confirmLabel: 'Excluir',   confirmVariant: 'danger'  },
  warning: { icon: '⚠️', color: '#F59E0B', confirmLabel: 'Confirmar', confirmVariant: 'primary' },
  info:    { icon: 'ℹ️', color: '#3B82F6', confirmLabel: 'Confirmar', confirmVariant: 'primary' },
};

export interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  variant?: Variant;
  confirmLabel?: string;
  loading?: boolean;
}

export function ConfirmModal({ open, onClose, onConfirm, title = 'Tem certeza?', message = 'Esta ação não pode ser desfeita.', variant = 'danger', confirmLabel, loading = false }: ConfirmModalProps) {
  const cfg = CONFIG[variant];
  return (
    <Modal open={open} onClose={onClose} size="sm" hideClose
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>Cancelar</Button>
          <Button variant={cfg.confirmVariant} onClick={onConfirm} loading={loading}>
            {confirmLabel ?? cfg.confirmLabel}
          </Button>
        </>
      }
    >
      <div style={{ textAlign: 'center', padding: '8px 0' }}>
        <IconWrap $color={cfg.color}>{cfg.icon}</IconWrap>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 8 }}>{title}</h3>
        <Message>{message}</Message>
      </div>
    </Modal>
  );
}