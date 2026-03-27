// frontend/src/components/views/equipamentos/modals/EquipmentEditModal/index.tsx

'use client';
import React, { useEffect, useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useApi } from '@/hooks/useApi';
import { Equipment } from '@/types';
import { FormGrid, SectionTitle, LoadingBox, Spinner, ErrorBanner } from './styles';

const EQUIPMENT_TYPES = [
  { value: 'Celular',    label: 'Celular' },
  { value: 'Notebook',   label: 'Notebook' },
  { value: 'Tablet',     label: 'Tablet' },
  { value: 'TV',         label: 'TV' },
  { value: 'Videogame',  label: 'Videogame' },
  { value: 'Impressora', label: 'Impressora' },
  { value: 'Desktop',    label: 'Desktop' },
  { value: 'Outro',      label: 'Outro' },
];

interface FormState {
  type: string;
  brand: string;
  model: string;
  serialNumber: string;
  imei: string;
  accessories: string;
  notes: string;
}

interface Props {
  open: boolean;
  equipmentId: string | null;
  onClose: () => void;
  onSaved: () => void;
}

export function EquipmentEditModal({ open, equipmentId, onClose, onSaved }: Props) {
  const api = useApi();
  const [eq, setEq]     = useState<Equipment | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const [form, setForm] = useState<FormState>({
    type: '', brand: '', model: '', serialNumber: '', imei: '', accessories: '', notes: '',
  });

  useEffect(() => {
    if (!open || !equipmentId) return;
    setLoading(true);
    setError(null);
    api.get<Equipment>(`/equipment/${equipmentId}`)
      .then(data => {
        setEq(data);
        setForm({
          type:         data.type,
          brand:        data.brand,
          model:        data.model,
          serialNumber: data.serialNumber ?? '',
          imei:         data.imei ?? '',
          accessories:  data.accessories?.join(', ') ?? '',
          notes:        data.notes ?? '',
        });
      })
      .catch(() => setError('Erro ao carregar equipamento.'))
      .finally(() => setLoading(false));
  }, [open, equipmentId]);

  const set = (f: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(p => ({ ...p, [f]: e.target.value }));
  const setVal = (f: keyof FormState) => (v: string) =>
    setForm(p => ({ ...p, [f]: v }));

  async function handleSave() {
    if (!equipmentId) return;
    if (!form.brand.trim() || !form.model.trim()) {
      return setError('Marca e modelo são obrigatórios.');
    }
    setError(null);
    setSaving(true);
    try {
      await api.put(`/equipment/${equipmentId}`, {
        type:         form.type,
        brand:        form.brand.trim(),
        model:        form.model.trim(),
        serialNumber: form.serialNumber.trim() || null,
        imei:         form.imei.trim() || null,
        accessories:  form.accessories.trim()
          ? form.accessories.split(',').map(a => a.trim()).filter(Boolean)
          : [],
        notes: form.notes.trim() || null,
      });
      onSaved();
      onClose();
    } catch (err: any) {
      setError(err?.message ?? 'Erro ao salvar.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={() => { if (!saving) onClose(); }}
      title="Editar Equipamento"
      subtitle={eq ? `${eq.client?.name ?? ''} — ${eq.brand} ${eq.model}` : undefined}
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
      {loading || !eq ? (
        <LoadingBox><Spinner />Carregando...</LoadingBox>
      ) : (
        <>
          {error && <ErrorBanner>⚠️ {error}</ErrorBanner>}

          <SectionTitle>Dados do equipamento</SectionTitle>
          <FormGrid>
            <Select label="Tipo" value={form.type} options={EQUIPMENT_TYPES} onChange={setVal('type')} placeholder="Tipo" />
            <Input label="Marca *"  value={form.brand}  onChange={set('brand')}  placeholder="Marca" />
            <Input label="Modelo *" value={form.model}  onChange={set('model')}  placeholder="Modelo" />
            <Input label="Número de série" value={form.serialNumber} onChange={set('serialNumber')} placeholder="S/N (opcional)" />
            <Input label="IMEI" value={form.imei} onChange={set('imei')} placeholder="IMEI (opcional)" />
            <Input
              label="Acessórios"
              value={form.accessories}
              onChange={set('accessories')}
              placeholder="Carregador, capa… (vírgula)"
            />
          </FormGrid>
          <SectionTitle style={{ marginTop: 20 }}>Observações</SectionTitle>
          <Input label="Notas" value={form.notes} onChange={set('notes')} placeholder="Observações do equipamento" />
        </>
      )}
    </Modal>
  );
}