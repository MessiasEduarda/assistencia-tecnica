import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';
import {
  Grid,
  ReportCard,
  IconBox,
  CardInfo,
  CardTitle,
  CardDesc,
  CardActions,
} from './styles';

const REPORTS = [
  {
    icon: '📊',
    title: 'Faturamento por período',
    desc: 'Receitas e despesas por dia, semana ou mês',
    color: '#EFF6FF',
    border: '#3B82F6',
  },
  {
    icon: '🔧',
    title: 'Produtividade dos técnicos',
    desc: 'OS por técnico, tempo médio de conclusão',
    color: '#EDE9FE',
    border: '#8B5CF6',
  },
  {
    icon: '📦',
    title: 'Peças mais utilizadas',
    desc: 'Ranking de peças e custo médio por OS',
    color: '#FFF7ED',
    border: '#F97316',
  },
  {
    icon: '👤',
    title: 'Clientes frequentes',
    desc: 'Histórico e recorrência de clientes',
    color: '#ECFDF5',
    border: '#10B981',
  },
  {
    icon: '📋',
    title: 'OS por status',
    desc: 'Distribuição e tempo médio em cada etapa',
    color: '#FFFBEB',
    border: '#F59E0B',
  },
  {
    icon: '⭐',
    title: 'Satisfação dos clientes',
    desc: 'Notas e avaliações por período',
    color: '#FEF2F2',
    border: '#EF4444',
  },
];

export default function RelatoriosPage() {
  return (
    <>
            <AppLayout>
        <PageHeader>
          <h1>Relatórios</h1>
          <p>Análise e exportação de dados</p>
        </PageHeader>

        <Grid>
          {REPORTS.map((r) => (
            <ReportCard key={r.title} $border={r.border}>
              <CardInfo>
                <IconBox $color={r.color}>{r.icon}</IconBox>
                <div>
                  <CardTitle>{r.title}</CardTitle>
                  <CardDesc>{r.desc}</CardDesc>
                </div>
              </CardInfo>
              <CardActions>
                <Button variant="outline" size="sm">
                  Ver relatório
                </Button>
                <Button variant="secondary" size="sm">
                  Exportar CSV
                </Button>
              </CardActions>
            </ReportCard>
          ))}
        </Grid>
      </AppLayout>
    </>
  );
}