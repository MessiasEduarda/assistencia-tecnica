'use client';
import React, { useState } from 'react';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { AlertModal } from '@/components/ui/AlertModal';
import { useApi } from '@/hooks/useApi';

interface Props {
  open: boolean;
  technicianId: string | null;
  technicianName: string | null;
  onClose: () => void;
  onDeleted: () => void;
}

export function TecnicoDeleteModal({ open, technicianId, technicianName, onClose, onDeleted }: Props) {
  const api = useApi();
  const [loading, setLoading]         = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  async function handleConfirm() {
    if (!technicianId) return;
    setLoading(true);
    try {
      await api.del(`/users/${technicianId}`);
      onClose();           // 1. fecha o confirm
      onDeleted();         // 2. atualiza a tabela IMEDIATAMENTE
      setSuccessOpen(true); // 3. abre o alert de sucesso
    } catch {
      // silencioso
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <ConfirmModal
        open={open}
        onClose={onClose}
        onConfirm={handleConfirm}
        loading={loading}
        variant="danger"
        title="Excluir técnico"
        message={
          technicianName
            ? `Tem certeza que deseja excluir o técnico ${technicianName}? Esta ação não pode ser desfeita.`
            : 'Tem certeza que deseja excluir este técnico? Esta ação não pode ser desfeita.'
        }
        confirmLabel="Sim, excluir"
      />

      <AlertModal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        variant="success"
        title="Técnico excluído!"
        message="O técnico foi removido com sucesso."
        closeLabel="Ok, entendi"
      />
    </>
  );
}