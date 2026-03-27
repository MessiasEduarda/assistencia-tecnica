import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';
import {
  Grid,
  TechCard,
  Avatar,
  TechHeader,
  TechInfo,
  TechName,
  TechRole,
  ActiveBanner,
  StatRow,
  Stat,
  StatValue,
  StatLabel,
  CardActions,
  HeaderRow,
} from './styles';

interface Tech {
  id: string;
  name: string;
  role: string;
  os: number;
  done: number;
  avg: string;
  active: boolean;
}

const TECHS: Tech[] = [
  { id: '1', name: 'Carlos Mendes', role: 'Hardware', os: 12, done: 47, avg: '2.3h', active: true },
  { id: '2', name: 'Ana Paula',     role: 'Software', os: 8,  done: 63, avg: '1.8h', active: true },
  { id: '3', name: 'Ricardo Lima',  role: 'Hardware', os: 5,  done: 31, avg: '3.1h', active: true },
  { id: '4', name: 'Fernanda Reis', role: 'Redes',    os: 0,  done: 18, avg: '2.7h', active: false },
];

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('');
}

export default function TecnicosPage() {
  return (
    <>
            <AppLayout>
        <PageHeader>
          <HeaderRow>
            <div>
              <h1>Técnicos</h1>
              <p>Gestão da equipe e produtividade</p>
            </div>
            <Button>+ Novo Técnico</Button>
          </HeaderRow>
        </PageHeader>

        <Grid>
          {TECHS.map((t) => (
            <TechCard key={t.id}>
              <TechHeader>
                <Avatar>{getInitials(t.name)}</Avatar>
                <TechInfo>
                  <TechName>{t.name}</TechName>
                  <TechRole>{t.role}</TechRole>
                </TechInfo>
                <Badge variant={t.active ? 'success' : 'default'} dot>
                  {t.active ? 'Ativo' : 'Inativo'}
                </Badge>
              </TechHeader>

              {t.active && (
                <ActiveBanner>🔧 {t.os} OS em andamento</ActiveBanner>
              )}

              <StatRow>
                <Stat>
                  <StatValue>{t.done}</StatValue>
                  <StatLabel>Concluídas</StatLabel>
                </Stat>
                <Stat>
                  <StatValue>{t.avg}</StatValue>
                  <StatLabel>Tempo médio</StatLabel>
                </Stat>
                <Stat>
                  <StatValue>{t.os}</StatValue>
                  <StatLabel>Em aberto</StatLabel>
                </Stat>
              </StatRow>

              <CardActions>
                <Button variant="outline" size="sm" fullWidth>
                  Ver OS
                </Button>
                <Button variant="secondary" size="sm" fullWidth>
                  Editar
                </Button>
              </CardActions>
            </TechCard>
          ))}
        </Grid>
      </AppLayout>
    </>
  );
}