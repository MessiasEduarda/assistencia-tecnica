'use client';
import React, { useState } from 'react';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { AlertModal } from '@/components/ui/AlertModal';
import { useApi } from '@/hooks/useApi';

interface Props {
  open: boolean;
  osId: string | null;
  osNumber: string | null;
  onClose: () => void;
  onDeleted: () => void;
}

export function OSDeleteModal({ open, osId, osNumber, onClose, onDeleted }: Props) {
  const api = useApi();
  const [loading, setLoading]         = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  async function handleConfirm() {
    if (!osId) return;
    setLoading(true);
    try {
      await api.del(`/service-orders/${osId}`);
      setSuccessOpen(true); // abre o sucesso ANTES de fechar o confirm
      onClose();
    } catch {
      // silencioso
    } finally {
      setLoading(false);
    }
  }

  function handleSuccessClose() {
    setSuccessOpen(false);
    onDeleted();
  }

  return (
    <>
      <ConfirmModal
        open={open}
        onClose={onClose}
        onConfirm={handleConfirm}
        loading={loading}
        variant="danger"
        title="Excluir ordem de serviço"
        message={
          osNumber
            ? `Tem certeza que deseja excluir a ${osNumber}? Esta ação não pode ser desfeita.`
            : 'Tem certeza que deseja excluir esta OS? Esta ação não pode ser desfeita.'
        }
        confirmLabel="Sim, excluir"
      />

      <AlertModal
        open={successOpen}
        onClose={handleSuccessClose}
        variant="success"
        title="OS excluída!"
        message="A ordem de serviço foi removida com sucesso."
        closeLabel="Ok, entendi"
      />
    </>
  );
}