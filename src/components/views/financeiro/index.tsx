import { PageHeader } from '@/components/ui/PageHeader';
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  StatsGrid, StatCard, StatIcon, StatValue, StatLabel,
  Toolbar, Table, AmountPositive, AmountNegative, MutedTd,
  CardHeaderInner,
} from './styles';

const TX = [
  { id: '1', desc: 'OS-2024-0847 — João Silva',     type: 'RECEIVABLE', amount: 450.00,  method: 'PIX',    due: '26/03', paid: true  },
  { id: '2', desc: 'OS-2024-0844 — Lucia Ferreira', type: 'RECEIVABLE', amount: 780.00,  method: 'CARD',   due: '26/03', paid: true  },
  { id: '3', desc: 'OS-2024-0846 — Maria Souza',    type: 'RECEIVABLE', amount: 320.00,  method: '—',      due: '28/03', paid: false },
  { id: '4', desc: 'Compra peças — TechParts',      type: 'PAYABLE',    amount: 890.00,  method: 'PIX',    due: '25/03', paid: true  },
  { id: '5', desc: 'Aluguel do espaço — Março',     type: 'PAYABLE',    amount: 2200.00, method: 'BOLETO', due: '05/03', paid: true  },
];

const fmt = (v: number) => `R$ ${v.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

export default function FinanceiroPage() {
  const recv = TX.filter(t => t.type === 'RECEIVABLE' && t.paid).reduce((a, b) => a + b.amount, 0);
  const pend = TX.filter(t => t.type === 'RECEIVABLE' && !t.paid).reduce((a, b) => a + b.amount, 0);
  const pay  = TX.filter(t => t.type === 'PAYABLE' && t.paid).reduce((a, b) => a + b.amount, 0);

  const STATS = [
    { icon: '💰', bg: '#D1FAE5', accent: '#10B981', value: fmt(recv),       label: 'Recebido no mês' },
    { icon: '⏳', bg: '#FEF3C7', accent: '#F59E0B', value: fmt(pend),       label: 'A receber'       },
    { icon: '📤', bg: '#FEE2E2', accent: '#EF4444', value: fmt(pay),        label: 'Pago no mês'     },
    { icon: '📈', bg: '#DBEAFE', accent: '#3B82F6', value: fmt(recv - pay), label: 'Lucro no mês'    },
  ];

  return (
    <>
      
      <AppLayout>
        <PageHeader>
          <h1>Financeiro</h1>
          <p>Contas a receber e a pagar</p>
        </PageHeader>

        <StatsGrid>
          {STATS.map(s => (
            <StatCard key={s.label} $accent={s.accent}>
              <StatIcon $bg={s.bg}>{s.icon}</StatIcon>
              <StatValue>{s.value}</StatValue>
              <StatLabel>{s.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>

        <Toolbar>
          <span />
          <Button>+ Novo lançamento</Button>
        </Toolbar>

        <Card $noPad>
          <CardHeader>
            <CardHeaderInner>
              <div>
                <h2>Lançamentos</h2>
                <p>Março 2024</p>
              </div>
            </CardHeaderInner>
          </CardHeader>
          <Table>
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Tipo</th>
                <th>Valor</th>
                <th>Pagamento</th>
                <th>Vencimento</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {TX.map(t => (
                <tr key={t.id}>
                  <td>{t.desc}</td>
                  <td>
                    <Badge variant={t.type === 'RECEIVABLE' ? 'success' : 'danger'}>
                      {t.type === 'RECEIVABLE' ? 'A receber' : 'A pagar'}
                    </Badge>
                  </td>
                  {t.type === 'RECEIVABLE'
                    ? <AmountPositive>{fmt(t.amount)}</AmountPositive>
                    : <AmountNegative>-{fmt(t.amount)}</AmountNegative>
                  }
                  <MutedTd>{t.method}</MutedTd>
                  <MutedTd>{t.due}</MutedTd>
                  <td><Badge variant={t.paid ? 'success' : 'warning'} dot>{t.paid ? 'Pago' : 'Pendente'}</Badge></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </AppLayout>
    </>
  );
}