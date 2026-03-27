'use client';
import React, { useEffect, useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { OSStatusBadge } from '@/components/ui/OSStatusBadge';
import { useApi } from '@/hooks/useApi';
import { OSStatus, OS_STATUS_LABEL } from '@/types';
import {
  HeaderInfo, OSNumBadge, Grid, Section, SectionTitle,
  Field, FieldLabel, FieldValue, Divider, BudgetBox, BudgetRow,
  ObsBox, Timeline, TimelineItem, TimelineDot, TimelineContent,
  TimelineLabel, TimelineMeta, LoadingBox, Spinner,
} from './styles';

interface StatusHistoryItem {
  id: string;
  fromStatus: OSStatus | null;
  toStatus: OSStatus;
  createdAt: string;
  note?: string;
  changedBy: { name: string; role: string };
}

interface OSDetail {
  id: string;
  number: string;
  status: OSStatus;
  entryDate: string;
  budgetParts: number;
  budgetLabor: number;
  budgetTotal: number;
  internalNotes?: string;
  reportedDefect?: string;
  client: { name: string; phone: string; email?: string; document?: string };
  equipment: { brand: string; model: string; type: string; serialNumber?: string };
  technician: { name: string; email: string } | null;
  statusHistory: StatusHistoryItem[];
}

interface Props {
  open: boolean;
  osId: string | null;
  onClose: () => void;
}

const fmt = (v: number) =>
  v > 0 ? `R$ ${v.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '—';

const fmtDate = (d: string) =>
  new Date(d).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });

export function OSDetailsModal({ open, osId, onClose }: Props) {
  const api = useApi();
  const [data, setData] = useState<OSDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !osId) return;
    setLoading(true);
    setData(null);
    api.get<OSDetail>(`/service-orders/${osId}`)
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [open, osId]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Detalhes da OS"
      size="lg"
      footer={<Button variant="neutral" onClick={onClose}>Fechar</Button>}
    >
      {loading || !data ? (
        <LoadingBox><Spinner />Carregando...</LoadingBox>
      ) : (
        <>
          {/* ── Cabeçalho ── */}
          <HeaderInfo>
            <OSNumBadge>{data.number}</OSNumBadge>
            <OSStatusBadge status={data.status} />
            <span style={{ fontSize: '0.8125rem', color: 'var(--neutral-400)', marginLeft: 'auto' }}>
              Entrada: {fmtDate(data.entryDate)}
            </span>
          </HeaderInfo>

          {/* ── Cliente + Equipamento ── */}
          <Grid>
            <Section>
              <SectionTitle>Cliente</SectionTitle>
              <Field>
                <FieldLabel>Nome</FieldLabel>
                <FieldValue>{data.client.name}</FieldValue>
              </Field>
              <Field>
                <FieldLabel>Telefone</FieldLabel>
                <FieldValue>{data.client.phone}</FieldValue>
              </Field>
              {data.client.email && (
                <Field>
                  <FieldLabel>E-mail</FieldLabel>
                  <FieldValue>{data.client.email}</FieldValue>
                </Field>
              )}
              {data.client.document && (
                <Field>
                  <FieldLabel>CPF / CNPJ</FieldLabel>
                  <FieldValue>{data.client.document}</FieldValue>
                </Field>
              )}
            </Section>

            <Section>
              <SectionTitle>Equipamento</SectionTitle>
              <Field>
                <FieldLabel>Tipo</FieldLabel>
                <FieldValue>{data.equipment.type}</FieldValue>
              </Field>
              <Field>
                <FieldLabel>Marca / Modelo</FieldLabel>
                <FieldValue>{data.equipment.brand} {data.equipment.model}</FieldValue>
              </Field>
              {data.equipment.serialNumber && (
                <Field>
                  <FieldLabel>Nº de série</FieldLabel>
                  <FieldValue style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>
                    {data.equipment.serialNumber}
                  </FieldValue>
                </Field>
              )}
              <Field>
                <FieldLabel>Técnico</FieldLabel>
                <FieldValue>{data.technician?.name ?? '—'}</FieldValue>
              </Field>
            </Section>
          </Grid>

          {/* ── Defeito relatado ── */}
          {data.reportedDefect && (
            <>
              <Divider />
              <Section>
                <SectionTitle>Defeito relatado</SectionTitle>
                <ObsBox>{data.reportedDefect}</ObsBox>
              </Section>
            </>
          )}

          {/* ── Notas internas ── */}
          {data.internalNotes && (
            <>
              <Divider />
              <Section>
                <SectionTitle>Notas internas</SectionTitle>
                <ObsBox>{data.internalNotes}</ObsBox>
              </Section>
            </>
          )}

          {/* ── Orçamento ── */}
          <Divider />
          <Section>
            <SectionTitle>Orçamento</SectionTitle>
            <BudgetBox>
              <BudgetRow><span>Peças</span><span>{fmt(data.budgetParts)}</span></BudgetRow>
              <BudgetRow><span>Mão de obra</span><span>{fmt(data.budgetLabor)}</span></BudgetRow>
              <BudgetRow $total><span>Total</span><span>{fmt(data.budgetTotal)}</span></BudgetRow>
            </BudgetBox>
          </Section>

          {/* ── Histórico de status ── */}
          {data.statusHistory.length > 0 && (
            <>
              <Divider />
              <Section>
                <SectionTitle>Histórico de status</SectionTitle>
                <Timeline>
                  {data.statusHistory.map(h => (
                    <TimelineItem key={h.id}>
                      <TimelineDot />
                      <TimelineContent>
                        <TimelineLabel>{OS_STATUS_LABEL[h.toStatus]}</TimelineLabel>
                        <TimelineMeta>
                          {fmtDate(h.createdAt)} — {h.changedBy.name}
                          {h.note && ` · ${h.note}`}
                        </TimelineMeta>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </Section>
            </>
          )}
        </>
      )}
    </Modal>
  );
}