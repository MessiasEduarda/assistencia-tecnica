'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { PageHeader } from '@/components/ui/PageHeader';
import { OSStatusBadge } from '@/components/ui/OSStatusBadge';
import { Modal } from '@/components/ui/Modal';
import { AlertModal } from '@/components/ui/AlertModal';
import { Table, Column } from '@/components/ui/Table';
import { useApi } from '@/hooks/useApi';
import { OSStatus } from '@/types';
import { OSDetailsModal } from './modals/OSDetailsModal';
import { OSEditModal } from './modals/OSEditModal';
import { OSDeleteModal } from './modals/OSDeleteModal';
import {
  HeaderRow, Toolbar, SearchWrap, OSNum,
  FormGrid, SectionTitle, FormSection, ActionButtons, ActionBtn,
} from './styles';

interface OS {
  id: string;
  number: string;
  status: OSStatus;
  entryDate: string;
  budgetTotal: number;
  client: { name: string; phone: string };
  equipment: { brand: string; model: string };
  technician: { name: string } | null;
}

interface Technician {
  id: string;
  name: string;
  role: string;
  active: boolean;
}

interface FormState {
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  brand: string;
  model: string;
  serialNumber: string;
  reportedDefect: string;
  budgetParts: string;
  budgetLabor: string;
  technicianId: string;
}

const EMPTY_FORM: FormState = {
  clientName: '', clientPhone: '', clientEmail: '',
  brand: '', model: '', serialNumber: '',
  reportedDefect: '', budgetParts: '', budgetLabor: '',
  technicianId: '',
};

function parseMoeda(value: string): number {
  const cleaned = value.replace('R$', '').replace(/\s/g, '').replace(/\./g, '').replace(',', '.');
  const n = parseFloat(cleaned);
  return isNaN(n) ? 0 : n;
}

const IconClient = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const IconEquipment = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
  </svg>
);
const IconBudget = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8" />
    <line x1="12" y1="6" x2="12" y2="8" /><line x1="12" y1="16" x2="12" y2="18" />
  </svg>
);
const IconTech = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);
const EmptyIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="13" y2="17" />
  </svg>
);
const IconDetails = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);
const IconEdit = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const IconTrash = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" /><path d="M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

export default function OrdensPage() {
  const api = useApi();

  const [orders, setOrders]   = useState<OS[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal]     = useState(0);
  const [search, setSearch]   = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm]           = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving]       = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [technicians, setTechnicians] = useState<Technician[]>([]);

  const [detailsId, setDetailsId]       = useState<string | null>(null);
  const [editId, setEditId]             = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; number: string } | null>(null);

  const [alertOpen, setAlertOpen]       = useState(false);
  const [alertVariant, setAlertVariant] = useState<'success' | 'error'>('success');
  const [alertTitle, setAlertTitle]     = useState('');
  const [alertMsg, setAlertMsg]         = useState('');

  const loadOrders = useCallback(() => {
    setLoading(true);
    api.get<{ data: OS[]; total: number }>('/service-orders?page=1&perPage=999')
      .then(res => { setOrders(res.data); setTotal(res.total); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const loadTechnicians = useCallback(() => {
    api.get<Technician[]>('/users')
      .then(users => setTechnicians(users.filter(u => u.role === 'TECHNICIAN' && u.active)))
      .catch(() => {});
  }, []);

  useEffect(() => {
    loadOrders();
    loadTechnicians();
  }, [loadOrders, loadTechnicians]);

  const filtered = search.trim()
    ? orders.filter(o =>
        o.number.toLowerCase().includes(search.toLowerCase()) ||
        o.client.name.toLowerCase().includes(search.toLowerCase()) ||
        o.equipment.brand.toLowerCase().includes(search.toLowerCase()) ||
        o.equipment.model.toLowerCase().includes(search.toLowerCase())
      )
    : orders;

  const set    = (f: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(p => ({ ...p, [f]: e.target.value }));
  const setVal = (f: keyof FormState) => (v: string) =>
    setForm(p => ({ ...p, [f]: v }));

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
    if (!form.clientName.trim())     return setFormError('O nome do cliente é obrigatório.');
    if (!form.clientPhone.trim())    return setFormError('O telefone do cliente é obrigatório.');
    if (!form.brand.trim() || !form.model.trim()) return setFormError('Marca e modelo são obrigatórios.');
    if (!form.reportedDefect.trim()) return setFormError('O defeito relatado é obrigatório.');
    if (!form.technicianId)          return setFormError('O técnico responsável é obrigatório.');

    setSaving(true);
    try {
      const client = await api.post<{ id: string }>('/clients', {
        name: form.clientName.trim(),
        phone: form.clientPhone.trim(),
        email: form.clientEmail.trim() || undefined,
      });
      const equipment = await api.post<{ id: string }>('/equipment', {
        clientId: client.id,
        type: 'Celular / Eletrônico',
        brand: form.brand.trim(),
        model: form.model.trim(),
        serialNumber: form.serialNumber.trim() || undefined,
        accessories: [],
      });
      await api.post('/service-orders', {
        clientId: client.id,
        equipmentId: equipment.id,
        reportedDefect: form.reportedDefect.trim(),
        technicianId: form.technicianId,
        budgetParts: parseMoeda(form.budgetParts),
        budgetLabor: parseMoeda(form.budgetLabor),
      });
      setModalOpen(false);
      loadOrders();
      showAlert('success', 'OS aberta com sucesso!', 'A ordem de serviço foi registrada.');
    } catch (err: any) {
      setFormError(err?.message ?? 'Erro ao salvar. Verifique os dados e tente novamente.');
    } finally {
      setSaving(false);
    }
  }

  const columns: Column<OS>[] = [
    {
      key: 'number',
      label: 'Número',
      width: '160px',
      render: (os) => <OSNum>{os.number}</OSNum>,
    },
    {
      key: 'client',
      label: 'Cliente',
      render: (os) => (
        <>
          <div style={{ fontWeight: 600 }}>{os.client.name}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--neutral-400)', marginTop: 2 }}>{os.client.phone}</div>
        </>
      ),
    },
    {
      key: 'equipment',
      label: 'Equipamento',
      width: '160px',
      render: (os) => `${os.equipment.brand} ${os.equipment.model}`,
    },
    {
      key: 'status',
      label: 'Status',
      width: '160px',
      render: (os) => <OSStatusBadge status={os.status} />,
    },
    {
      key: 'technician',
      label: 'Técnico',
      width: '130px',
      render: (os) => os.technician?.name ?? <span style={{ color: 'var(--neutral-300)' }}>—</span>,
    },
    {
      key: 'entryDate',
      label: 'Entrada',
      width: '120px',
      render: (os) => new Date(os.entryDate).toLocaleDateString('pt-BR'),
    },
    {
      key: 'budgetTotal',
      label: 'Total',
      width: '110px',
      align: 'right',
      render: (os) =>
        os.budgetTotal > 0
          ? `R$ ${os.budgetTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
          : <span style={{ color: 'var(--neutral-300)' }}>—</span>,
    },
    {
      key: 'actions',
      label: 'Ações',
      width: '110px',
      align: 'center',
      render: (os) => (
        <ActionButtons>
          <ActionBtn title="Ver detalhes" $variant="details" onClick={e => { e.stopPropagation(); setDetailsId(os.id); }}>
            <IconDetails />
          </ActionBtn>
          <ActionBtn title="Editar" $variant="edit" onClick={e => { e.stopPropagation(); setEditId(os.id); }}>
            <IconEdit />
          </ActionBtn>
          <ActionBtn title="Excluir" $variant="delete" onClick={e => { e.stopPropagation(); setDeleteTarget({ id: os.id, number: os.number }); }}>
            <IconTrash />
          </ActionBtn>
        </ActionButtons>
      ),
    },
  ];

  return (
    <AppLayout>
      <HeaderRow>
        <PageHeader style={{ marginBottom: 0 }}>
          <h1>Ordens de Serviço</h1>
          <p>{total} {total === 1 ? 'ordem cadastrada' : 'ordens cadastradas'}</p>
        </PageHeader>
        <Button variant="login" onClick={openCreateModal}>+ Nova OS</Button>
      </HeaderRow>

      <Toolbar>
        <SearchWrap>
          <Input
            placeholder="Buscar por número, cliente, equipamento…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            iconLeft={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            }
          />
        </SearchWrap>
      </Toolbar>

      <Table
        columns={columns}
        data={filtered}
        rowKey={(os) => os.id}
        loading={loading}
        emptyIcon={<EmptyIcon />}
        emptyTitle={search ? 'Nenhum resultado encontrado' : 'Nenhuma ordem cadastrada'}
        emptyDescription={search ? 'Tente outros termos de busca.' : 'Clique em "+ Nova OS" para abrir a primeira.'}
      />

      {/* Modal de criação */}
      <Modal
        open={modalOpen}
        onClose={() => { if (!saving) setModalOpen(false); }}
        title="Nova Ordem de Serviço"
        subtitle="Preencha os dados para abrir uma nova OS"
        size="lg"
        footer={
          <>
            <Button variant="neutral" onClick={() => setModalOpen(false)} disabled={saving}>Cancelar</Button>
            <Button variant="login" onClick={handleSubmit} loading={saving}>
              {saving ? 'Salvando...' : 'Abrir OS'}
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
          <SectionTitle><IconClient /> Dados do Cliente</SectionTitle>
          <FormGrid>
            <Input label="Nome do cliente *"     value={form.clientName}    onChange={set('clientName')}    placeholder="Nome completo ou razão social" />
            <Input label="Telefone / WhatsApp *" value={form.clientPhone}   mask="telefone" onValueChange={setVal('clientPhone')} placeholder="(11) 99999-9999" />
            <Input label="E-mail"                value={form.clientEmail}   onChange={set('clientEmail')}   type="email" placeholder="cliente@email.com" />
          </FormGrid>
        </FormSection>

        <FormSection>
          <SectionTitle><IconEquipment /> Dados do Equipamento</SectionTitle>
          <FormGrid>
            <Input label="Marca *"            value={form.brand}          onChange={set('brand')}          placeholder="Apple, Samsung, Motorola…" />
            <Input label="Modelo *"           value={form.model}          onChange={set('model')}          placeholder="iPhone 13, Galaxy A54…" />
            <Input label="Número de série"    value={form.serialNumber}   onChange={set('serialNumber')}   placeholder="IMEI ou S/N (opcional)" />
            <Input label="Defeito relatado *" value={form.reportedDefect} onChange={set('reportedDefect')} placeholder="Descreva o problema" />
          </FormGrid>
        </FormSection>

        <FormSection>
          <SectionTitle><IconTech /> Técnico responsável</SectionTitle>
          <FormGrid $cols={2}>
            <Select
              label="Técnico *"
              value={form.technicianId}
              options={technicians.map(t => ({ value: t.id, label: t.name }))}
              onChange={setVal('technicianId')}
              placeholder="Selecione um técnico"
            />
          </FormGrid>
        </FormSection>

        <FormSection style={{ marginBottom: 0 }}>
          <SectionTitle><IconBudget /> Orçamento</SectionTitle>
          <FormGrid $cols={2}>
            <Input label="Valor das peças"      value={form.budgetParts} mask="moeda" onValueChange={setVal('budgetParts')} placeholder="R$ 0,00" />
            <Input label="Valor da mão de obra" value={form.budgetLabor} mask="moeda" onValueChange={setVal('budgetLabor')} placeholder="R$ 0,00" />
          </FormGrid>
        </FormSection>
      </Modal>

      {/* Modais de ação */}
      <OSDetailsModal
        open={!!detailsId}
        osId={detailsId}
        onClose={() => setDetailsId(null)}
      />
      <OSEditModal
        open={!!editId}
        osId={editId}
        onClose={() => setEditId(null)}
        onSaved={() => {
          loadOrders();
          showAlert('success', 'OS atualizada!', 'As alterações foram salvas com sucesso.');
        }}
      />
      <OSDeleteModal
        open={!!deleteTarget}
        osId={deleteTarget?.id ?? null}
        osNumber={deleteTarget?.number ?? null}
        onClose={() => setDeleteTarget(null)}
        onDeleted={loadOrders}
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