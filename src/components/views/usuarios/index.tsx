import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';
import { Toolbar, Table, UserCell, Avatar, EmailTd } from './styles';

const USERS = [
  { id: '1', name: 'Admin Master',   email: 'admin@empresa.com',   role: 'ADMIN',      active: true  },
  { id: '2', name: 'Carlos Mendes',  email: 'carlos@empresa.com',  role: 'TECHNICIAN', active: true  },
  { id: '3', name: 'Ana Paula',      email: 'ana@empresa.com',     role: 'TECHNICIAN', active: true  },
  { id: '4', name: 'Beatriz Santos', email: 'beatriz@empresa.com', role: 'ATTENDANT',  active: true  },
  { id: '5', name: 'Ricardo Lima',   email: 'ricardo@empresa.com', role: 'TECHNICIAN', active: false },
];

const ROLE_LABEL: Record<string, string> = {
  ADMIN: 'Admin', ATTENDANT: 'Atendente', TECHNICIAN: 'Técnico',
};

const ROLE_VARIANT: Record<string, any> = {
  ADMIN: 'danger', ATTENDANT: 'info', TECHNICIAN: 'purple',
};

export default function UsuariosPage() {
  return (
    <>
      
      <AppLayout>
        <PageHeader>
          <h1>Usuários</h1>
          <p>Gerencie acessos e permissões</p>
        </PageHeader>

        <Toolbar>
          <span />
          <Button>+ Novo Usuário</Button>
        </Toolbar>

        <Card $noPad>
          <Table>
            <thead>
              <tr>
                <th>Usuário</th>
                <th>E-mail</th>
                <th>Perfil</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {USERS.map(u => (
                <tr key={u.id}>
                  <td>
                    <UserCell>
                      <Avatar>{u.name.split(' ').map(w => w[0]).slice(0, 2).join('')}</Avatar>
                      <span>{u.name}</span>
                    </UserCell>
                  </td>
                  <EmailTd>{u.email}</EmailTd>
                  <td><Badge variant={ROLE_VARIANT[u.role]}>{ROLE_LABEL[u.role]}</Badge></td>
                  <td><Badge variant={u.active ? 'success' : 'default'} dot>{u.active ? 'Ativo' : 'Inativo'}</Badge></td>
                  <td><Button variant="ghost" size="sm">Editar</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </AppLayout>
    </>
  );
}