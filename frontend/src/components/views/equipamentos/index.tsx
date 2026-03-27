// frontend/src/components/views/equipamentos/index.tsx

'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { PageHeader } from '@/components/ui/PageHeader';
import { Modal } from '@/components/ui/Modal';
import { AlertModal } from '@/components/ui/AlertModal';
import { Table, Column } from '@/components/ui/Table';
import { useApi } from '@/hooks/useApi';
import { Equipment, Client } from '@/types';
import { EquipmentDetailsModal } from './modals/EquipmentDetailsModal';
import { EquipmentEditModal } from './modals/EquipmentEditModal';
import {
  HeaderRow, Toolbar, SearchWrap,
  FormGrid, SectionTitle, FormSection, ActionButtons, ActionBtn,
  TypeBadge,
} from './styles';

interface FormState {
  clientId: string;
  type: string;
  brand: string;
  model: string;
  serialNumber: string;
  imei: string;
  accessories: string;
  notes: string;
}

const EMPTY_FORM: FormState = {
  clientId: '', type: '', brand: '', model: '',
  serialNumber: '', imei: '', accessories: '', notes: '',
};

const EQUIPMENT_TYPES = [
  { value: 'Celular',   label: 'Celular' },
  { value: 'Notebook',  label: 'Notebook' },
  { value: 'Tablet',    label: 'Tablet' },
  { value: 'TV',        label: 'TV' },
  { value: 'Videogame', label: 'Videogame' },
  { value: 'Impressora',label: 'Impressora' },
  { value: 'Desktop',   label: 'Desktop' },
  { value: 'Outro',     label: 'Outro' },
];

const IconEquip = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5"/>
  </svg>
);
const IconClient = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconDetails = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);
const IconEdit = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const EmptyIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/>
  </svg>
);

export default function EquipamentosPage() {
  const api = useApi();

  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading]     = useState(true);
  const [total, setTotal]         = useState(0);
  const [search, setSearch]       = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm]           = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving]       = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [clients, setClients] = useState<Client[]>([]);

  const [detailsId, setDetailsId] = useState<string | null>(null);
  const [editId, setEditId]       = useState<string | null>(null);

  const [alertOpen, setAlertOpen]       = useState(false);
  const [alertVariant, setAlertVariant] = useState<'success' | 'error'>('success');
  const [alertTitle, setAlertTitle]     = useState('');
  const [alertMsg, setAlertMsg]         = useState('');

  const loadEquipment = useCallback(() => {
    setLoading(true);
    api.get<Equipment[]>('/equipment')
      .then(data => { setEquipment(data); setTotal(data.length); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const loadClients = useCallback(() => {
    api.get<Client[]>('/clients')
      .then(setClients)
      .catch(() => {});
  }, []);

  useEffect(() => {
    loadEquipment();
    loadClients();
  }, [loadEquipment, loadClients]);

  const filtered = search.trim()
    ? equipment.filter(e =>
        e.brand.toLowerCase().includes(search.toLowerCase()) ||
        e.model.toLowerCase().includes(search.toLowerCase()) ||
        e.type.toLowerCase().includes(search.toLowerCase()) ||
        (e.serialNumber ?? '').toLowerCase().includes(search.toLowerCase()) ||
        (e.client?.name ?? '').toLowerCase().includes(search.toLowerCase())
      )
    : equipment;

  const setVal = (f: keyof FormState) => (v: string) =>
    setForm(p => ({ ...p, [f]: v }));
  const set = (f: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(p => ({ ...p, [f]: e.target.value }));

  function openCreateModal() {
    setForm(EMPTY_FORM);
    setFormError(null);
    setModalOpen(true);
  }

  function showAlert(variant: 'success' | 'error', title: string, msg: string) {
    setAlertVariant(variant);
    setAlertTitle(title);
    setAlertMsg(msg);
    setAlertOpen(true);
  }

  async function handleSubmit() {
    setFormError(null);
    if (!form.clientId)    return setFormError('Selecione o cliente dono do equipamento.');
    if (!form.type)        return setFormError('Selecione o tipo do equipamento.');
    if (!form.brand.trim()) return setFormError('A marca é obrigatória.');
    if (!form.model.trim()) return setFormError('O modelo é obrigatório.');

    setSaving(true);
    try {
      await api.post('/equipment', {
        clientId:     form.clientId,
        type:         form.type,
        brand:        form.brand.trim(),
        model:        form.model.trim(),
        serialNumber: form.serialNumber.trim() || undefined,
        imei:         form.imei.trim() || undefined,
        accessories:  form.accessories.trim()
          ? form.accessories.split(',').map(a => a.trim()).filter(Boolean)
          : [],
        notes: form.notes.trim() || undefined,
      });
      setModalOpen(false);
      loadEquipment();
      showAlert('success', 'Equipamento cadastrado!', 'O equipamento foi registrado com sucesso.');
    } catch (err: any) {
      setFormError(err?.message ?? 'Erro ao salvar. Verifique os dados e tente novamente.');
    } finally {
      setSaving(false);
    }
  }

  const columns: Column<Equipment>[] = [
    {
      key: 'type',
      label: 'Tipo',
      width: '110px',
      render: (eq) => <TypeBadge>{eq.type}</TypeBadge>,
    },
    {
      key: 'brand',
      label: 'Equipamento',
      render: (eq) => (
        <>
          <div style={{ fontWeight: 600 }}>{eq.brand} {eq.model}</div>
          {eq.serialNumber && (
            <div style={{ fontSize: '0.78rem', color: 'var(--neutral-400)', marginTop: 2 }}>
              S/N: {eq.serialNumber}
            </div>
          )}
          {eq.imei && (
            <div style={{ fontSize: '0.78rem', color: 'var(--neutral-400)', marginTop: 1 }}>
              IMEI: {eq.imei}
            </div>
          )}
        </>
      ),
    },
    {
      key: 'client',
      label: 'Cliente',
      width: '200px',
      render: (eq) => (
        <>
          <div style={{ fontWeight: 500 }}>{eq.client?.name ?? '—'}</div>
          {eq.client?.phone && (
            <div style={{ fontSize: '0.78rem', color: 'var(--neutral-400)', marginTop: 2 }}>
              {eq.client.phone}
            </div>
          )}
        </>
      ),
    },
    {
      key: 'accessories',
      label: 'Acessórios',
      width: '160px',
      render: (eq) =>
        eq.accessories?.length
          ? <span style={{ fontSize: '0.8125rem' }}>{eq.accessories.join(', ')}</span>
          : <span style={{ color: 'var(--neutral-300)' }}>—</span>,
    },
    {
      key: 'createdAt',
      label: 'Cadastro',
      width: '110px',
      render: (eq) => new Date(eq.createdAt).toLocaleDateString('pt-BR'),
    },
    {
      key: 'actions',
      label: 'Ações',
      width: '90px',
      align: 'center',
      render: (eq) => (
        <ActionButtons>
          <ActionBtn title="Ver detalhes" $variant="details"
            onClick={e => { e.stopPropagation(); setDetailsId(eq.id); }}>
            <IconDetails />
          </ActionBtn>
          <ActionBtn title="Editar" $variant="edit"
            onClick={e => { e.stopPropagation(); setEditId(eq.id); }}>
            <IconEdit />
          </ActionBtn>
        </ActionButtons>
      ),
    },
  ];

  return (
    <AppLayout>
      <HeaderRow>
        <PageHeader style={{ marginBottom: 0 }}>
          <h1>Equipamentos</h1>
          <p>{total} {total === 1 ? 'equipamento cadastrado' : 'equipamentos cadastrados'}</p>
        </PageHeader>
        <Button variant="login" onClick={openCreateModal}>+ Novo Equipamento</Button>
      </HeaderRow>

      <Toolbar>
        <SearchWrap>
          <Input
            placeholder="Buscar por marca, modelo, tipo, cliente…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            iconLeft={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            }
          />
        </SearchWrap>
      </Toolbar>

      <Table
        columns={columns}
        data={filtered}
        rowKey={(eq) => eq.id}
        loading={loading}
        emptyIcon={<EmptyIcon />}
        emptyTitle={search ? 'Nenhum resultado encontrado' : 'Nenhum equipamento cadastrado'}
        emptyDescription={search ? 'Tente outros termos de busca.' : 'Clique em "+ Novo Equipamento" para cadastrar.'}
      />

      {/* Modal de criação */}
      <Modal
        open={modalOpen}
        onClose={() => { if (!saving) setModalOpen(false); }}
        title="Novo Equipamento"
        subtitle="Cadastre um equipamento vinculado a um cliente"
        size="lg"
        footer={
          <>
            <Button variant="neutral" onClick={() => setModalOpen(false)} disabled={saving}>Cancelar</Button>
            <Button variant="login" onClick={handleSubmit} loading={saving}>
              {saving ? 'Salvando...' : 'Cadastrar'}
            </Button>
          </>
        }
      >
        {formError && (
          <div style={{
            background: '#FEF2F2', border: '1px solid #FECACA',
            color: '#991B1B', borderRadius: 8,
            padding: '10px 14px', fontSize: '0.875rem', marginBottom: 20,
          }}>
            ⚠️ {formError}
          </div>
        )}

        <FormSection>
          <SectionTitle><IconClient /> Cliente proprietário</SectionTitle>
          <FormGrid $cols={1}>
            <Select
              label="Cliente *"
              value={form.clientId}
              options={clients.map(c => ({ value: c.id, label: `${c.name} — ${c.phone}` }))}
              onChange={setVal('clientId')}
              placeholder="Selecione o cliente"
            />
          </FormGrid>
        </FormSection>

        <FormSection>
          <SectionTitle><IconEquip /> Dados do Equipamento</SectionTitle>
          <FormGrid>
            <Select
              label="Tipo *"
              value={form.type}
              options={EQUIPMENT_TYPES}
              onChange={setVal('type')}
              placeholder="Tipo de equipamento"
            />
            <Input label="Marca *"  value={form.brand}  onChange={set('brand')}  placeholder="Apple, Samsung, Dell…" />
            <Input label="Modelo *" value={form.model}  onChange={set('model')}  placeholder="iPhone 14, Galaxy S23…" />
            <Input label="Número de série (S/N)" value={form.serialNumber} onChange={set('serialNumber')} placeholder="Opcional" />
            <Input label="IMEI" value={form.imei} onChange={set('imei')} placeholder="Para celulares (opcional)" />
            <Input
              label="Acessórios entregues"
              value={form.accessories}
              onChange={set('accessories')}
              placeholder="Carregador, capa, caixa… (separe por vírgula)"
            />
          </FormGrid>
        </FormSection>

        <FormSection style={{ marginBottom: 0 }}>
          <SectionTitle>Observações</SectionTitle>
          <Input
            label="Notas internas"
            value={form.notes}
            onChange={set('notes')}
            placeholder="Riscos, detalhes físicos, condição do equipamento…"
          />
        </FormSection>
      </Modal>

      <EquipmentDetailsModal
        open={!!detailsId}
        equipmentId={detailsId}
        onClose={() => setDetailsId(null)}
      />
      <EquipmentEditModal
        open={!!editId}
        equipmentId={editId}
        onClose={() => setEditId(null)}
        onSaved={() => {
          loadEquipment();
          showAlert('success', 'Equipamento atualizado!', 'As alterações foram salvas.');
        }}
      />

      <AlertModal
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        variant={alertVariant}
        title={alertTitle}
        message={alertMsg}
        closeLabel="Ok, entendi"
      />
    </AppLayout>
  );
}