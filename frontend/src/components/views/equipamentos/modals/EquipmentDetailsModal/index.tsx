// frontend/src/components/views/equipamentos/modals/EquipmentDetailsModal/index.tsx

'use client';
import React, { useEffect, useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { OSStatusBadge } from '@/components/ui/OSStatusBadge';
import { useApi } from '@/hooks/useApi';
import { Equipment } from '@/types';
import {
  Grid, Section, SectionTitle, Field, FieldLabel, FieldValue,
  Divider, TagList, Tag, LoadingBox, Spinner, OSMini,
} from './styles';

interface Props {
  open: boolean;
  equipmentId: string | null;
  onClose: () => void;
}

export function EquipmentDetailsModal({ open, equipmentId, onClose }: Props) {
  const api = useApi();
  const [eq, setEq]       = useState<Equipment | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !equipmentId) return;
    setLoading(true);
    api.get<Equipment>(`/equipment/${equipmentId}`)
      .then(setEq)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [open, equipmentId]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Detalhes do Equipamento"
      subtitle={eq ? `${eq.brand} ${eq.model}` : undefined}
      size="lg"
      footer={<Button variant="neutral" onClick={onClose}>Fechar</Button>}
    >
      {loading || !eq ? (
        <LoadingBox><Spinner />Carregando...</LoadingBox>
      ) : (
        <>
          <Section>
            <SectionTitle>Identificação</SectionTitle>
            <Grid>
              <Field><FieldLabel>Tipo</FieldLabel><FieldValue>{eq.type}</FieldValue></Field>
              <Field><FieldLabel>Marca</FieldLabel><FieldValue>{eq.brand}</FieldValue></Field>
              <Field><FieldLabel>Modelo</FieldLabel><FieldValue>{eq.model}</FieldValue></Field>
              <Field>
                <FieldLabel>Número de série</FieldLabel>
                <FieldValue>{eq.serialNumber || <span style={{ color: 'var(--neutral-300)' }}>—</span>}</FieldValue>
              </Field>
              <Field>
                <FieldLabel>IMEI</FieldLabel>
                <FieldValue>{eq.imei || <span style={{ color: 'var(--neutral-300)' }}>—</span>}</FieldValue>
              </Field>
              <Field>
                <FieldLabel>Cadastrado em</FieldLabel>
                <FieldValue>{new Date(eq.createdAt).toLocaleDateString('pt-BR')}</FieldValue>
              </Field>
            </Grid>
          </Section>

          {eq.accessories?.length > 0 && (
            <>
              <Divider />
              <Section>
                <SectionTitle>Acessórios entregues</SectionTitle>
                <TagList>
                  {eq.accessories.map((a, i) => <Tag key={i}>{a}</Tag>)}
                </TagList>
              </Section>
            </>
          )}

          {eq.notes && (
            <>
              <Divider />
              <Section>
                <SectionTitle>Observações</SectionTitle>
                <FieldValue style={{ whiteSpace: 'pre-wrap' }}>{eq.notes}</FieldValue>
              </Section>
            </>
          )}

          <Divider />
          <Section>
            <SectionTitle>Cliente proprietário</SectionTitle>
            <Grid>
              <Field><FieldLabel>Nome</FieldLabel><FieldValue>{eq.client?.name ?? '—'}</FieldValue></Field>
              <Field><FieldLabel>Telefone</FieldLabel><FieldValue>{eq.client?.phone ?? '—'}</FieldValue></Field>
              <Field><FieldLabel>E-mail</FieldLabel><FieldValue>{eq.client?.email || <span style={{ color: 'var(--neutral-300)' }}>—</span>}</FieldValue></Field>
              <Field><FieldLabel>WhatsApp</FieldLabel><FieldValue>{eq.client?.whatsapp || <span style={{ color: 'var(--neutral-300)' }}>—</span>}</FieldValue></Field>
            </Grid>
          </Section>

          {eq.orders && eq.orders.length > 0 && (
            <>
              <Divider />
              <Section>
                <SectionTitle>Ordens de serviço ({eq.orders.length})</SectionTitle>
                {eq.orders.map(os => (
                  <OSMini key={os.id}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--brand-600)' }}>{os.number}</span>
                    <OSStatusBadge status={os.status} />
                    <span style={{ color: 'var(--neutral-400)', fontSize: '0.8125rem' }}>
                      {new Date(os.entryDate).toLocaleDateString('pt-BR')}
                    </span>
                  </OSMini>
                ))}
              </Section>
            </>
          )}
        </>
      )}
    </Modal>
  );
}