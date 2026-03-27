'use client';
import React, { useEffect, useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { useApi } from '@/hooks/useApi';
import { OSStatus } from '@/types';
import {
  FormGrid, SectionTitle, OSInfo, ErrorBanner, LoadingBox, Spinner,
} from './styles';

interface OSEditData {
  id: string;
  number: string;
  status: OSStatus;
  technicianId?: string | null;
  budgetParts: number;
  budgetLabor: number;
  internalNotes?: string;
  reportedDefect?: string;
  client: { name: string; phone: string };
  equipment: { brand: string; model: string };
}

interface Technician {
  id: string;
  name: string;
  role: string;
  active: boolean;
}

interface FormState {
  status: OSStatus;
  technicianId: string;
  budgetParts: string;
  budgetLabor: string;
  internalNotes: string;
  reportedDefect: string;
}

const STATUS_OPTIONS = [
  { value: 'RECEIVED',         label: 'Recebido' },
  { value: 'ANALYSIS',         label: 'Em análise' },
  { value: 'WAITING_APPROVAL', label: 'Aguardando aprovação' },
  { value: 'IN_REPAIR',        label: 'Em reparo' },
  { value: 'DONE',             label: 'Finalizado' },
  { value: 'DELIVERED',        label: 'Entregue' },
];

function parseMoeda(value: string): number {
  const cleaned = value.replace('R$', '').replace(/\s/g, '').replace(/\./g, '').replace(',', '.');
  const n = parseFloat(cleaned);
  return isNaN(n) ? 0 : n;
}

function fmtMoeda(value: number): string {
  if (!value) return '';
  return 'R$ ' + value.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

interface Props {
  open: boolean;
  osId: string | null;
  onClose: () => void;
  onSaved: () => void;
}

export function OSEditModal({ open, osId, onClose, onSaved }: Props) {
  const api = useApi();
  const [os, setOs] = useState<OSEditData | null>(null);
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<FormState>({
    status: 'RECEIVED',
    technicianId: '',
    budgetParts: '',
    budgetLabor: '',
    internalNotes: '',
    reportedDefect: '',
  });

  useEffect(() => {
    if (!open || !osId) return;
    setLoading(true);
    setError(null);
    Promise.all([
      api.get<OSEditData>(`/service-orders/${osId}`),
      api.get<Technician[]>('/users'),
    ])
      .then(([osData, users]) => {
        setOs(osData);
        setTechnicians(users.filter(u => u.role === 'TECHNICIAN' && u.active));
        setForm({
          status:        osData.status,
          technicianId:  osData.technicianId ?? '',
          budgetParts:   fmtMoeda(osData.budgetParts),
          budgetLabor:   fmtMoeda(osData.budgetLabor),
          internalNotes: osData.internalNotes ?? '',
          reportedDefect: osData.reportedDefect ?? '',
        });
      })
      .catch(() => setError('Erro ao carregar dados da OS.'))
      .finally(() => setLoading(false));
  }, [open, osId]);

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm(p => ({ ...p, [key]: value }));
  }

  async function handleSave() {
    if (!osId) return;
    setError(null);
    setSaving(true);
    try {
      await api.put(`/service-orders/${osId}`, {
        status:        form.status,
        technicianId:  form.technicianId || null,
        budgetParts:   parseMoeda(form.budgetParts),
        budgetLabor:   parseMoeda(form.budgetLabor),
        internalNotes: form.internalNotes || null,
        reportedDefect: form.reportedDefect || undefined,
      });
      onSaved();
      onClose();
    } catch (err: any) {
      setError(err?.message ?? 'Erro ao salvar. Tente novamente.');
    } finally {
      setSaving(false);
    }
  }

  const techOptions = [
    { value: '', label: 'Sem técnico' },
    ...technicians.map(t => ({ value: t.id, label: t.name })),
  ];

  return (
    <Modal
      open={open}
      onClose={() => { if (!saving) onClose(); }}
      title="Editar OS"
      subtitle={os ? `${os.client.name} — ${os.equipment.brand} ${os.equipment.model}` : undefined}
      size="lg"
      footer={
        <>
          <Button variant="neutral" onClick={onClose} disabled={saving}>Cancelar</Button>
          <Button variant="login" onClick={handleSave} loading={saving}>
            {saving ? 'Salvando...' : 'Salvar alterações'}
          </Button>
        </>
      }
    >
      {loading || !os ? (
        <LoadingBox><Spinner />Carregando...</LoadingBox>
      ) : (
        <>
          {error && <ErrorBanner>⚠️ {error}</ErrorBanner>}

          {/* ── Resumo da OS ── */}
          <OSInfo>
            <span><strong>OS:</strong> {os.number}</span>
            <span><strong>Cliente:</strong> {os.client.name}</span>
            <span><strong>Equipamento:</strong> {os.equipment.brand} {os.equipment.model}</span>
          </OSInfo>

          {/* ── Status e responsável ── */}
          <SectionTitle>Status e responsável</SectionTitle>
          <FormGrid>
            <Select
              label="Status *"
              value={form.status}
              options={STATUS_OPTIONS}
              onChange={v => setField('status', v as OSStatus)}
            />
            <Select
              label="Técnico responsável"
              value={form.technicianId}
              options={techOptions}
              onChange={v => setField('technicianId', v)}
              placeholder="Selecione um técnico"
            />
          </FormGrid>

          {/* ── Defeito ── */}
          <SectionTitle>Defeito relatado</SectionTitle>
          <Textarea
            value={form.reportedDefect}
            onChange={e => setField('reportedDefect', e.target.value)}
            placeholder="Descreva o problema reportado pelo cliente"
            rows={3}
          />

          {/* ── Orçamento ── */}
          <SectionTitle>Orçamento</SectionTitle>
          <FormGrid>
            <Input
              label="Valor das peças"
              value={form.budgetParts}
              mask="moeda"
              onValueChange={v => setField('budgetParts', v)}
              placeholder="R$ 0,00"
            />
            <Input
              label="Valor da mão de obra"
              value={form.budgetLabor}
              mask="moeda"
              onValueChange={v => setField('budgetLabor', v)}
              placeholder="R$ 0,00"
            />
          </FormGrid>

          {/* ── Notas internas ── */}
          <SectionTitle>Notas internas</SectionTitle>
          <Textarea
            value={form.internalNotes}
            onChange={e => setField('internalNotes', e.target.value)}
            placeholder="Observações visíveis apenas para a equipe"
            rows={3}
          />
        </>
      )}
    </Modal>
  );
}