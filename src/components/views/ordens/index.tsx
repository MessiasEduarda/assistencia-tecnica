'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';
import { OSStatusBadge } from '@/components/ui/OSStatusBadge';
import { Modal } from '@/components/ui/Modal';
import { AlertModal } from '@/components/ui/AlertModal';
import { useApi } from '@/hooks/useApi';
import { OSStatus } from '@/types';
import {
  HeaderRow, Toolbar, SearchWrap, Table, OSNum,
  EmptyState, Pagination, PagButtons,
  FormGrid, SectionTitle, FormSection, LoadingRow,
  Spinner,
} from './styles';

interface OS {
  id: string; number: string; status: OSStatus; entryDate: string; budgetTotal: number;
  client: { name: string; phone: string };
  equipment: { brand: string; model: string };
  technician: { name: string } | null;
}

interface FormState {
  clientName: string; clientPhone: string; clientEmail: string;
  brand: string; model: string; serialNumber: string;
  reportedDefect: string; budgetParts: string; budgetLabor: string;
}

const EMPTY_FORM: FormState = {
  clientName: '', clientPhone: '', clientEmail: '',
  brand: '', model: '', serialNumber: '',
  reportedDefect: '', budgetParts: '', budgetLabor: '',
};

function parseMoeda(value: string): number {
  const cleaned = value.replace('R$', '').replace(/\s/g, '').replace(/\./g, '').replace(',', '.');
  const n = parseFloat(cleaned);
  return isNaN(n) ? 0 : n;
}

export default function OrdensPage() {
  const api = useApi();

  const [orders, setOrders]           = useState<OS[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [page, setPage]               = useState(1);
  const [total, setTotal]             = useState(0);
  const [search, setSearch]           = useState('');
  const perPage = 10;

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm]           = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving]       = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [alertOpen, setAlertOpen]       = useState(false);
  const [alertVariant, setAlertVariant] = useState<'success' | 'error'>('success');
  const [alertTitle, setAlertTitle]     = useState('');
  const [alertMsg, setAlertMsg]         = useState('');

  const loadOrders = useCallback(() => {
    setLoadingList(true);
    api.get<{ data: OS[]; total: number }>(`/service-orders?page=${page}&perPage=${perPage}`)
      .then(res => { setOrders(res.data); setTotal(res.total); })
      .catch(() => {})
      .finally(() => setLoadingList(false));
  }, [page]);

  useEffect(() => { loadOrders(); }, [loadOrders]);

  const totalPages = Math.ceil(total / perPage);

  const filtered = search.trim()
    ? orders.filter(o =>
        o.number.toLowerCase().includes(search.toLowerCase()) ||
        o.client.name.toLowerCase().includes(search.toLowerCase()) ||
        o.equipment.brand.toLowerCase().includes(search.toLowerCase()) ||
        o.equipment.model.toLowerCase().includes(search.toLowerCase())
      )
    : orders;

  const set    = (f: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(p => ({ ...p, [f]: e.target.value }));
  const setVal = (f: keyof FormState) => (v: string) => setForm(p => ({ ...p, [f]: v }));

  function openModal()  { setForm(EMPTY_FORM); setFormError(null); setModalOpen(true); }
  function closeModal() { if (saving) return; setModalOpen(false); }

  function showAlert(variant: 'success' | 'error', title: string, msg: string) {
    setAlertVariant(variant); setAlertTitle(title); setAlertMsg(msg); setAlertOpen(true);
  }

  async function handleSubmit() {
    setFormError(null);
    if (!form.clientName.trim())     return setFormError('O nome do cliente é obrigatório.');
    if (!form.clientPhone.trim())    return setFormError('O telefone do cliente é obrigatório.');
    if (!form.brand.trim() || !form.model.trim()) return setFormError('Marca e modelo são obrigatórios.');
    if (!form.reportedDefect.trim()) return setFormError('O defeito relatado é obrigatório.');

    setSaving(true);
    try {
      const client = await api.post<{ id: string }>('/clients', {
        name: form.clientName.trim(), phone: form.clientPhone.trim(),
        email: form.clientEmail.trim() || undefined,
      });
      const equipment = await api.post<{ id: string }>('/equipment', {
        clientId: client.id, type: 'Celular / Eletrônico',
        brand: form.brand.trim(), model: form.model.trim(),
        serialNumber: form.serialNumber.trim() || undefined, accessories: [],
      });
      await api.post('/service-orders', {
        clientId: client.id, equipmentId: equipment.id,
        reportedDefect: form.reportedDefect.trim(),
        budgetParts: parseMoeda(form.budgetParts),
        budgetLabor: parseMoeda(form.budgetLabor),
      });
      setModalOpen(false);
      setPage(1);
      loadOrders();
      showAlert('success', 'OS aberta com sucesso!', 'A ordem de serviço foi registrada e aparece na listagem abaixo.');
    } catch (err: any) {
      setFormError(err?.message ?? 'Erro ao salvar. Verifique os dados e tente novamente.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <AppLayout>

      {/* cabeçalho com botão alinhado à direita */}
      <HeaderRow>
        <PageHeader style={{ marginBottom: 0 }}>
          <h1>Ordens de Serviço</h1>
          <p>{total} {total === 1 ? 'ordem cadastrada' : 'ordens cadastradas'}</p>
        </PageHeader>
        <Button variant="primary" onClick={openModal}>+ Nova OS</Button>
      </HeaderRow>

      {/* busca */}
      <Toolbar>
        <SearchWrap>
          <Input
            placeholder="Buscar por número, cliente, equipamento…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            iconLeft={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            }
          />
        </SearchWrap>
      </Toolbar>

      {/* tabela */}
      <Card $noPad>
        {loadingList ? (
          <EmptyState>
            <LoadingRow>
              <Spinner />
              Carregando ordens...
            </LoadingRow>
          </EmptyState>
        ) : filtered.length === 0 ? (
          <EmptyState>
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>📋</div>
            <strong>{search ? 'Nenhum resultado encontrado' : 'Nenhuma ordem cadastrada'}</strong>
            <p>{search ? 'Tente outros termos de busca.' : 'Clique em "+ Nova OS" para abrir a primeira.'}</p>
          </EmptyState>
        ) : (
          <>
            <Table>
              <thead>
                <tr>
                  <th>Número</th>
                  <th>Cliente</th>
                  <th>Equipamento</th>
                  <th>Status</th>
                  <th>Técnico</th>
                  <th>Entrada</th>
                  <th style={{ textAlign: 'right' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(os => (
                  <tr key={os.id}>
                    <td><OSNum>{os.number}</OSNum></td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{os.client.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--neutral-400)', marginTop: 2 }}>
                        {os.client.phone}
                      </div>
                    </td>
                    <td>{os.equipment.brand} {os.equipment.model}</td>
                    <td><OSStatusBadge status={os.status} /></td>
                    <td>{os.technician?.name ?? <span style={{ color: 'var(--neutral-300)' }}>—</span>}</td>
                    <td>{new Date(os.entryDate).toLocaleDateString('pt-BR')}</td>
                    <td style={{ textAlign: 'right', fontWeight: 600 }}>
                      {os.budgetTotal > 0
                        ? `R$ ${os.budgetTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                        : <span style={{ color: 'var(--neutral-300)' }}>—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {totalPages > 1 && (
              <Pagination>
                <span>{(page - 1) * perPage + 1}–{Math.min(page * perPage, total)} de {total} ordens</span>
                <PagButtons>
                  <Button variant="neutral" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
                    ← Anterior
                  </Button>
                  <Button variant="neutral" size="sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>
                    Próxima →
                  </Button>
                </PagButtons>
              </Pagination>
            )}
          </>
        )}
      </Card>

      {/* MODAL NOVA OS */}
      <Modal
        open={modalOpen}
        onClose={closeModal}
        title="Nova Ordem de Serviço"
        subtitle="Preencha os dados para abrir uma nova OS"
        size="lg"
        footer={
          <>
            <Button variant="neutral" onClick={closeModal} disabled={saving}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSubmit} loading={saving}>
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
          <SectionTitle>👤 Dados do Cliente</SectionTitle>
          <FormGrid>
            <Input label="Nome do cliente *"     value={form.clientName}    onChange={set('clientName')}    placeholder="Nome completo ou razão social" />
            <Input label="Telefone / WhatsApp *" value={form.clientPhone}   mask="telefone" onValueChange={setVal('clientPhone')} placeholder="(11) 99999-9999" />
            <Input label="E-mail"                value={form.clientEmail}   onChange={set('clientEmail')}   type="email" placeholder="cliente@email.com" />
          </FormGrid>
        </FormSection>

        <FormSection>
          <SectionTitle>🔧 Dados do Equipamento</SectionTitle>
          <FormGrid>
            <Input label="Marca *"            value={form.brand}          onChange={set('brand')}          placeholder="Apple, Samsung, Motorola…" />
            <Input label="Modelo *"           value={form.model}          onChange={set('model')}          placeholder="iPhone 13, Galaxy A54…"    />
            <Input label="Número de série"    value={form.serialNumber}   onChange={set('serialNumber')}   placeholder="IMEI ou S/N (opcional)"    />
            <Input label="Defeito relatado *" value={form.reportedDefect} onChange={set('reportedDefect')} placeholder="Descreva o problema"        />
          </FormGrid>
        </FormSection>

        <FormSection style={{ marginBottom: 0 }}>
          <SectionTitle>💰 Orçamento</SectionTitle>
          <FormGrid $cols={2}>
            <Input label="Valor das peças"      value={form.budgetParts} mask="moeda" onValueChange={setVal('budgetParts')} placeholder="R$ 0,00" />
            <Input label="Valor da mão de obra" value={form.budgetLabor} mask="moeda" onValueChange={setVal('budgetLabor')} placeholder="R$ 0,00" />
          </FormGrid>
        </FormSection>
      </Modal>

      {/* ALERT FEEDBACK */}
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