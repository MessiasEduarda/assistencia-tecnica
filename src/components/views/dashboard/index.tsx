import { PageHeader } from '@/components/ui/PageHeader';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { OSStatusBadge } from '@/components/ui/OSStatusBadge';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { useApi } from '@/hooks/useApi';
import { OSStatus } from '@/types';
import {
  StatsGrid, StatCard, StatIcon, StatValue, StatLabel,
  DashGrid, OSTable, OSNum, AlertList, AlertDanger, AlertWarning, AlertInfo,
  CardHeaderInner,
} from './styles';

interface DashStats {
  osOpen: number;
  osToday: number;
  osLate: number;
  revenueMonth: number;
  activeTechnicians: number;
  lowStockParts: number;
}

interface RecentOS {
  id: string;
  number: string;
  status: OSStatus;
  client: { name: string };
  equipment: { brand: string; model: string };
  technician: { name: string } | null;
  entryDate: string;
}

const STATS_CONFIG = [
  { key: 'osOpen',            icon: '📋', bg: '#FEF3C7', label: 'OS em aberto',   accent: '#F59E0B' },
  { key: 'osToday',           icon: '✅', bg: '#D1FAE5', label: 'Abertas hoje',    accent: '#10B981' },
  { key: 'osLate',            icon: '⚠️', bg: '#FEE2E2', label: 'OS atrasadas',    accent: '#EF4444' },
  { key: 'revenueMonth',      icon: '💰', bg: '#DBEAFE', label: 'Faturamento/mês', accent: '#3B82F6', currency: true },
  { key: 'activeTechnicians', icon: '🔧', bg: '#EDE9FE', label: 'Técnicos ativos', accent: '#8B5CF6' },
  { key: 'lowStockParts',     icon: '📦', bg: '#FED7AA', label: 'Peças em baixo',  accent: '#F97316' },
];

export default function DashboardPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const api = useApi();

  const [stats, setStats]       = useState<DashStats | null>(null);
  const [recentOS, setRecentOS] = useState<RecentOS[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/auth/login');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (!isAuthenticated) return;
    Promise.all([
      api.get<DashStats>('/dashboard/stats'),
      api.get<{ data: RecentOS[] }>('/service-orders?perPage=5'),
    ])
      .then(([s, os]) => {
        setStats(s);
        setRecentOS(os.data);
      })
      .catch(() => {})
      .finally(() => setLoadingStats(false));
  }, [isAuthenticated]);

  const fmtValue = (key: string, value: number, currency?: boolean) => {
    if (currency) {
      return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    }
    return String(value ?? 0);
  };

  return (
    <>
      
      <AppLayout>
        <PageHeader>
          <h1>Dashboard</h1>
          <p>
            {new Date().toLocaleDateString('pt-BR', {
              weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
            })}
          </p>
        </PageHeader>

        <StatsGrid>
          {STATS_CONFIG.map(s => (
            <StatCard key={s.key} $accent={s.accent}>
              <StatIcon $bg={s.bg}>{s.icon}</StatIcon>
              <StatValue>
                {fmtValue(s.key, stats?.[s.key as keyof DashStats] ?? 0, s.currency)}
              </StatValue>
              <StatLabel>{s.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>

        <DashGrid>
          <Card $noPad>
            <CardHeader>
              <CardHeaderInner>
                <div>
                  <h2>Ordens recentes</h2>
                  <p>Últimas movimentações do sistema</p>
                </div>
                <Link href="/ordens">
                  <Button size="sm">+ Nova OS</Button>
                </Link>
              </CardHeaderInner>
            </CardHeader>
            <OSTable>
              <thead>
                <tr>
                  <th>Número</th>
                  <th>Cliente</th>
                  <th>Equipamento</th>
                  <th>Status</th>
                  <th>Técnico</th>
                  <th>Entrada</th>
                </tr>
              </thead>
              <tbody>
                {recentOS.length === 0 ? (
                  <tr>
                    <td colSpan={6}>
                      {loadingStats ? 'Carregando...' : 'Nenhuma OS encontrada'}
                    </td>
                  </tr>
                ) : (
                  recentOS.map(os => (
                    <tr key={os.id} onClick={() => router.push(`/ordens/${os.id}`)}>
                      <td><OSNum>{os.number}</OSNum></td>
                      <td>{os.client.name}</td>
                      <td>{os.equipment.brand} {os.equipment.model}</td>
                      <td><OSStatusBadge status={os.status} /></td>
                      <td>{os.technician?.name ?? '—'}</td>
                      <td>{new Date(os.entryDate).toLocaleDateString('pt-BR')}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </OSTable>
          </Card>

          <Card>
            <CardHeader>
              <div>
                <h2>Alertas</h2>
                <p>Itens que precisam de atenção</p>
              </div>
            </CardHeader>
            <CardBody>
              <AlertList>
                {(stats?.osLate ?? 0) > 0 && (
                  <AlertDanger>
                    <span className="ico">🚨</span>
                    <div>
                      <strong>{stats!.osLate} OS com SLA vencido</strong>
                      <p>Ordens atrasadas precisam de atenção imediata.</p>
                    </div>
                  </AlertDanger>
                )}
                {(stats?.lowStockParts ?? 0) > 0 && (
                  <AlertWarning>
                    <span className="ico">⚠️</span>
                    <div>
                      <strong>{stats!.lowStockParts} peças com estoque baixo</strong>
                      <p>Verifique o estoque e faça o reabastecimento.</p>
                    </div>
                  </AlertWarning>
                )}
                <AlertInfo>
                  <span className="ico">ℹ️</span>
                  <div>
                    <strong>Sistema atualizado</strong>
                    <p>Todos os dados estão sincronizados com o servidor.</p>
                  </div>
                </AlertInfo>
              </AlertList>
            </CardBody>
          </Card>
        </DashGrid>
      </AppLayout>
    </>
  );
}