// frontend/src/components/views/clientes/index.tsx

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
import { Client } from '@/types';
import {
  HeaderRow, Toolbar, SearchWrap, Avatar, ClientCell,
  FormGrid, SectionTitle, FormSection, ActionButtons, ActionBtn,
} from './styles';

interface FormState {
  name: string;
  document: string;
  phone: string;
  whatsapp: string;
  email: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zip: string;
  notes: string;
}

const EMPTY_FORM: FormState = {
  name: '', document: '', phone: '', whatsapp: '', email: '',
  street: '', number: '', complement: '', neighborhood: '',
  city: '', state: '', zip: '', notes: '',
};

const BR_STATES = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO',
].map(s => ({ value: s, label: s }));

const IconClient = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconAddress = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
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
const IconTrash = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6"/><path d="M14 11v6"/>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);
const EmptyIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

export default function ClientesPage() {
  const api = useApi();

  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal]     = useState(0);
  const [search, setSearch]   = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Client | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Client | null>(null);
  const [form, setForm]   = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [alertOpen, setAlertOpen]       = useState(false);
  const [alertVariant, setAlertVariant] = useState<'success' | 'error'>('success');
  const [alertTitle, setAlertTitle]     = useState('');
  const [alertMsg, setAlertMsg]         = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const loadClients = useCallback(() => {
    setLoading(true);
    api.get<Client[]>('/clients')
      .then(data => { setClients(data); setTotal(data.length); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { loadClients(); }, [loadClients]);

  const filtered = search.trim()
    ? clients.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        (c.document ?? '').includes(search) ||
        c.phone.includes(search) ||
        (c.email ?? '').toLowerCase().includes(search.toLowerCase())
      )
    : clients;

  const set = (f: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(p => ({ ...p, [f]: e.target.value }));
  const setVal = (f: keyof FormState) => (v: string) =>
    setForm(p => ({ ...p, [f]: v }));

  function openCreate() {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setFormError(null);
    setModalOpen(true);
  }

  function openEdit(c: Client) {
    setEditTarget(c);
    setForm({
      name: c.name, document: c.document ?? '', phone: c.phone,
      whatsapp: c.whatsapp ?? '', email: c.email ?? '',
      street: c.street ?? '', number: c.number ?? '', complement: c.complement ?? '',
      neighborhood: c.neighborhood ?? '', city: c.city ?? '',
      state: c.state ?? '', zip: c.zip ?? '', notes: c.notes ?? '',
    });
    setFormError(null);
    setModalOpen(true);
  }

  function showAlert(variant: 'success' | 'error', title: string, msg: string) {
    setAlertVariant(variant); setAlertTitle(title); setAlertMsg(msg); setAlertOpen(true);
  }

  async function handleSubmit() {
    setFormError(null);
    if (!form.name.trim())  return setFormError('O nome do cliente é obrigatório.');
    if (!form.phone.trim()) return setFormError('O telefone é obrigatório.');

    setSaving(true);
    try {
      const payload = {
        name:         form.name.trim(),
        document:     form.document.trim() || undefined,
        phone:        form.phone.trim(),
        whatsapp:     form.whatsapp.trim() || undefined,
        email:        form.email.trim() || undefined,
        street:       form.street.trim() || undefined,
        number:       form.number.trim() || undefined,
        complement:   form.complement.trim() || undefined,
        neighborhood: form.neighborhood.trim() || undefined,
        city:         form.city.trim() || undefined,
        state:        form.state || undefined,
        zip:          form.zip.trim() || undefined,
        notes:        form.notes.trim() || undefined,
      };

      if (editTarget) {
        await api.put(`/clients/${editTarget.id}`, payload);
        showAlert('success', 'Cliente atualizado!', 'Os dados foram salvos com sucesso.');
      } else {
        await api.post('/clients', payload);
        showAlert('success', 'Cliente cadastrado!', 'O cliente foi registrado com sucesso.');
      }
      setModalOpen(false);
      loadClients();
    } catch (err: any) {
      setFormError(err?.message ?? 'Erro ao salvar.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      await api.del(`/clients/${deleteTarget.id}`);
      setDeleteConfirmOpen(false);
      setDeleteTarget(null);
      loadClients();
      showAlert('success', 'Cliente excluído!', 'O cliente foi removido.');
    } catch (err: any) {
      showAlert('error', 'Erro ao excluir', err?.message ?? 'Tente novamente.');
    }
  }

  const columns: Column<Client>[] = [
    {
      key: 'name',
      label: 'Cliente',
      render: (c) => (
        <ClientCell>
          <Avatar>{c.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()}</Avatar>
          <div>
            <div style={{ fontWeight: 600 }}>{c.name}</div>
            {c.document && <div style={{ fontSize: '0.78rem', color: 'var(--neutral-400)', marginTop: 1 }}>{c.document}</div>}
          </div>
        </ClientCell>
      ),
    },
    {
      key: 'phone',
      label: 'Contato',
      width: '180px',
      render: (c) => (
        <>
          <div>{c.phone}</div>
          {c.whatsapp && c.whatsapp !== c.phone && (
            <div style={{ fontSize: '0.78rem', color: 'var(--neutral-400)' }}>WhatsApp: {c.whatsapp}</div>
          )}
          {c.email && <div style={{ fontSize: '0.78rem', color: 'var(--neutral-400)' }}>{c.email}</div>}
        </>
      ),
    },
    {
      key: 'city',
      label: 'Cidade / Estado',
      width: '150px',
      render: (c) =>
        c.city
          ? `${c.city}${c.state ? ` — ${c.state}` : ''}`
          : <span style={{ color: 'var(--neutral-300)' }}>—</span>,
    },
    {
      key: 'createdAt',
      label: 'Cadastro',
      width: '110px',
      render: (c) => new Date(c.createdAt).toLocaleDateString('pt-BR'),
    },
    {
      key: 'actions',
      label: 'Ações',
      width: '100px',
      align: 'center',
      render: (c) => (
        <ActionButtons>
          <ActionBtn title="Editar" $variant="edit" onClick={e => { e.stopPropagation(); openEdit(c); }}>
            <IconEdit />
          </ActionBtn>
          <ActionBtn title="Excluir" $variant="delete" onClick={e => {
            e.stopPropagation();
            setDeleteTarget(c);
            setDeleteConfirmOpen(true);
          }}>
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
          <h1>Clientes</h1>
          <p>{total} {total === 1 ? 'cliente cadastrado' : 'clientes cadastrados'}</p>
        </PageHeader>
        <Button variant="login" onClick={openCreate}>+ Novo Cliente</Button>
      </HeaderRow>

      <Toolbar>
        <SearchWrap>
          <Input
            placeholder="Buscar por nome, CPF/CNPJ, telefone ou e-mail…"
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
        rowKey={(c) => c.id}
        loading={loading}
        emptyIcon={<EmptyIcon />}
        emptyTitle={search ? 'Nenhum resultado encontrado' : 'Nenhum cliente cadastrado'}
        emptyDescription={search ? 'Tente outros termos.' : 'Clique em "+ Novo Cliente" para começar.'}
      />

      {/* Modal criar/editar */}
      <Modal
        open={modalOpen}
        onClose={() => { if (!saving) setModalOpen(false); }}
        title={editTarget ? 'Editar Cliente' : 'Novo Cliente'}
        subtitle={editTarget ? `Editando: ${editTarget.name}` : 'Preencha os dados do cliente'}
        size="lg"
        footer={
          <>
            <Button variant="neutral" onClick={() => setModalOpen(false)} disabled={saving}>Cancelar</Button>
            <Button variant="login" onClick={handleSubmit} loading={saving}>
              {saving ? 'Salvando...' : editTarget ? 'Salvar alterações' : 'Cadastrar'}
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
          <SectionTitle><IconClient /> Dados pessoais</SectionTitle>
          <FormGrid>
            <Input label="Nome completo / Razão social *" value={form.name} onChange={set('name')} placeholder="Nome do cliente" />
            <Input label="CPF / CNPJ" value={form.document} onChange={set('document')} placeholder="000.000.000-00" />
            <Input label="Telefone *" value={form.phone} mask="telefone" onValueChange={setVal('phone')} placeholder="(11) 99999-9999" />
            <Input label="WhatsApp" value={form.whatsapp} mask="telefone" onValueChange={setVal('whatsapp')} placeholder="(11) 99999-9999" />
            <Input label="E-mail" value={form.email} onChange={set('email')} type="email" placeholder="cliente@email.com" />
          </FormGrid>
        </FormSection>

        <FormSection style={{ marginBottom: 0 }}>
          <SectionTitle><IconAddress /> Endereço</SectionTitle>
          <FormGrid>
            <Input label="CEP" value={form.zip} onChange={set('zip')} placeholder="00000-000" />
            <Input label="Logradouro" value={form.street} onChange={set('street')} placeholder="Rua, Avenida…" />
            <Input label="Número" value={form.number} onChange={set('number')} placeholder="123" />
            <Input label="Complemento" value={form.complement} onChange={set('complement')} placeholder="Apto, Bloco…" />
            <Input label="Bairro" value={form.neighborhood} onChange={set('neighborhood')} placeholder="Bairro" />
            <Input label="Cidade" value={form.city} onChange={set('city')} placeholder="Cidade" />
            <Select label="Estado" value={form.state} options={BR_STATES} onChange={setVal('state')} placeholder="UF" />
            <Input label="Observações" value={form.notes} onChange={set('notes')} placeholder="Informações adicionais" />
          </FormGrid>
        </FormSection>
      </Modal>

      {/* Confirmação de exclusão */}
      <Modal
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        title="Excluir cliente"
        subtitle={`Deseja remover "${deleteTarget?.name}"? Esta ação não pode ser desfeita.`}
        size="sm"
        footer={
          <>
            <Button variant="neutral" onClick={() => setDeleteConfirmOpen(false)}>Cancelar</Button>
            <Button variant="danger" onClick={handleDelete}>Excluir</Button>
          </>
        }
      >
        <p style={{ fontSize: '0.875rem', color: 'var(--neutral-600)' }}>
          Todos os equipamentos e ordens de serviço vinculadas a este cliente também serão afetados.
        </p>
      </Modal>

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