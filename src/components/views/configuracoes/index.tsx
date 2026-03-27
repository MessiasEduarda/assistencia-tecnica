import { PageHeader } from '@/components/ui/PageHeader';
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardHeader, CardBody, CardFooter } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import {
  Layout, SideNav, NavItem, FormGrid, SectionCol,
  Toggle, ToggleInfo, ToggleTitle, ToggleDesc, Switch,
} from './styles';

const NAV_ITEMS = [
  { icon: '🏢', label: 'Empresa',         active: true  },
  { icon: '🔔', label: 'Notificações',    active: false },
  { icon: '📲', label: 'WhatsApp API',    active: false },
  { icon: '💰', label: 'Financeiro',      active: false },
  { icon: '🎨', label: 'Personalização',  active: false },
  { icon: '🔐', label: 'Segurança',       active: false },
  { icon: '📦', label: 'Integrações',     active: false },
];

const NOTIFS = [
  { title: 'OS recebida',        desc: 'Notificar técnico quando nova OS for atribuída',  on: true  },
  { title: 'Orçamento aprovado', desc: 'Notificar quando cliente aprovar o orçamento',    on: true  },
  { title: 'OS finalizada',      desc: 'Notificar cliente quando serviço for concluído',  on: true  },
  { title: 'Estoque baixo',      desc: 'Alertar quando peça atingir estoque mínimo',      on: false },
];

export default function ConfiguracoesPage() {
  return (
    <>
      
      <AppLayout>
        <PageHeader>
          <h1>Configurações</h1>
          <p>Gerencie as configurações da sua empresa</p>
        </PageHeader>

        <Layout>
          <Card>
            <SideNav>
              {NAV_ITEMS.map(i => (
                <NavItem key={i.label} $active={i.active}>
                  <span>{i.icon}</span>
                  {i.label}
                </NavItem>
              ))}
            </SideNav>
          </Card>

          <SectionCol>
            <Card>
              <CardHeader>
                <div>
                  <h2>Dados da Empresa</h2>
                  <p>Informações básicas do negócio</p>
                </div>
              </CardHeader>
              <CardBody>
                <FormGrid>
                  <Input label="Nome da empresa" defaultValue="Assistência Técnica Modelo" />
                  <Input label="CNPJ"            defaultValue="12.345.678/0001-90" />
                  <Input label="Telefone"         defaultValue="(11) 3333-4444" />
                  <Input label="E-mail"           defaultValue="contato@assistencia.com" />
                </FormGrid>
              </CardBody>
              <CardFooter>
                <Button>Salvar alterações</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div>
                  <h2>Notificações</h2>
                  <p>Configure os alertas automáticos</p>
                </div>
              </CardHeader>
              <CardBody>
                {NOTIFS.map(n => (
                  <Toggle key={n.title}>
                    <ToggleInfo>
                      <ToggleTitle>{n.title}</ToggleTitle>
                      <ToggleDesc>{n.desc}</ToggleDesc>
                    </ToggleInfo>
                    <Switch $on={n.on} />
                  </Toggle>
                ))}
              </CardBody>
            </Card>
          </SectionCol>
        </Layout>
      </AppLayout>
    </>
  );
}