'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';
import { AlertModal } from '@/components/ui/AlertModal';
import { Table, Column } from '@/components/ui/Table';
import { useApi } from '@/hooks/useApi';
import { TecnicoCreateModal } from './modals/TecnicoCreateModal';
import { TecnicoEditModal } from './modals/TecnicoEditModal';
import { TecnicoDeleteModal } from './modals/TecnicoDeleteModal';
import {
  HeaderRow, Toolbar, SearchWrap,
  ActionButtons, ActionBtn, AvatarSmall, StatusDot,
} from './styles';

export interface Technician {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
  avatar?: string | null;
  cpf?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  birthDate?: string | null;
  street?: string | null;
  number?: string | null;
  complement?: string | null;
  neighborhood?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
}

const EmptyIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
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
const IconToggle = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="5" width="22" height="14" rx="7" />
    <circle cx="16" cy="12" r="3" fill="currentColor" stroke="none" />
  </svg>
);

function getInitials(name: string) {
  return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
}

export default function TecnicosPage() {
  const api = useApi();

  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [loading, setLoading]         = useState(true);
  const [search, setSearch]           = useState('');

  const [createOpen, setCreateOpen]     = useState(false);
  const [editTarget, setEditTarget]     = useState<Technician | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);

  const [alertOpen, setAlertOpen]       = useState(false);
  const [alertVariant, setAlertVariant] = useState<'success' | 'error'>('success');
  const [alertTitle, setAlertTitle]     = useState('');
  const [alertMsg, setAlertMsg]         = useState('');

  const loadTechnicians = useCallback((showSpinner = true) => {
    // ── só mostra spinner no carregamento inicial, não nos reloads ────────────
    if (showSpinner) setLoading(true);
    api.get<Technician[]>('/users')
      .then(users => {
        setTechnicians(users.filter(u => u.role === 'TECHNICIAN'));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { loadTechnicians(true); }, [loadTechnicians]);

  const filtered = search.trim()
    ? technicians.filter(t =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.email.toLowerCase().includes(search.toLowerCase())
      )
    : technicians;

  function showAlert(variant: 'success' | 'error', title: string, msg: string) {
    setAlertVariant(variant);
    setAlertTitle(title);
    setAlertMsg(msg);
    setAlertOpen(true);
  }

  const columns: Column<Technician>[] = [
    {
      key: 'name',
      label: 'Técnico',
      render: (t) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <AvatarSmall>{getInitials(t.name)}</AvatarSmall>
          <div>
            <div style={{ fontWeight: 600 }}>{t.name}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--neutral-400)', marginTop: 2 }}>{t.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      label: 'Função',
      width: '130px',
      render: () => <span style={{ fontSize: '0.8125rem', color: 'var(--neutral-500)' }}>Técnico</span>,
    },
    {
      key: 'active',
      label: 'Status',
      width: '110px',
      render: (t) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <StatusDot $active={t.active} />
          <span style={{ fontSize: '0.8125rem', color: t.active ? '#065f46' : 'var(--neutral-400)', fontWeight: 500 }}>
            {t.active ? 'Ativo' : 'Inativo'}
          </span>
        </div>
      ),
    },
    {
      key: 'actions',
      label: 'Ações',
      width: '110px',
      align: 'center',
      render: (t) => (
        <ActionButtons>
          <ActionBtn title="Editar" $variant="edit" onClick={e => { e.stopPropagation(); setEditTarget(t); }}>
            <IconEdit />
          </ActionBtn>
          <ActionBtn title="Ativar / Inativar" $variant="toggle" onClick={async e => {
            e.stopPropagation();
            try {
              await api.patch(`/users/${t.id}/toggle`, {});
              loadTechnicians(false); // sem spinner
              showAlert('success', t.active ? 'Técnico inativado!' : 'Técnico ativado!',
                `${t.name} foi ${t.active ? 'inativado' : 'ativado'} com sucesso.`);
            } catch {
              showAlert('error', 'Erro', 'Não foi possível alterar o status do técnico.');
            }
          }}>
            <IconToggle />
          </ActionBtn>
          <ActionBtn title="Excluir" $variant="delete" onClick={e => { e.stopPropagation(); setDeleteTarget({ id: t.id, name: t.name }); }}>
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
          <h1>Técnicos</h1>
          <p>{technicians.length} {technicians.length === 1 ? 'técnico cadastrado' : 'técnicos cadastrados'}</p>
        </PageHeader>
        <Button variant="login" onClick={() => setCreateOpen(true)}>+ Novo Técnico</Button>
      </HeaderRow>

      <Toolbar>
        <SearchWrap>
          <Input
            placeholder="Buscar por nome ou e-mail…"
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
        rowKey={(t) => t.id}
        loading={loading}
        emptyIcon={<EmptyIcon />}
        emptyTitle={search ? 'Nenhum resultado encontrado' : 'Nenhum técnico cadastrado'}
        emptyDescription={search ? 'Tente outros termos de busca.' : 'Clique em "+ Novo Técnico" para cadastrar o primeiro.'}
      />

      <TecnicoCreateModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={() => {
          loadTechnicians(false);
          showAlert('success', 'Técnico cadastrado!', 'O técnico foi adicionado com sucesso.');
        }}
      />

      <TecnicoEditModal
        open={!!editTarget}
        technician={editTarget}
        onClose={() => setEditTarget(null)}
        onSaved={() => {
          setEditTarget(null);
          loadTechnicians(false);
          showAlert('success', 'Técnico atualizado!', 'As alterações foram salvas com sucesso.');
        }}
      />

      <TecnicoDeleteModal
        open={!!deleteTarget}
        technicianId={deleteTarget?.id ?? null}
        technicianName={deleteTarget?.name ?? null}
        onClose={() => setDeleteTarget(null)}
        onDeleted={() => {
          setDeleteTarget(null);
          loadTechnicians(false);
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