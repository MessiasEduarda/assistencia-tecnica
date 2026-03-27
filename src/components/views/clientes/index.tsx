'use client';
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { PageHeader } from '@/components/ui/PageHeader';
import { Toolbar, Table, Avatar, ClientCell, DocText, MutedTd } from './styles';

const DATA = [
  { id: '1', name: 'João Silva',     doc: '123.456.789-00',     phone: '(11) 99887-7665', email: 'joao@email.com',  os: 4  },
  { id: '2', name: 'Maria Souza',    doc: '987.654.321-00',     phone: '(11) 98765-4321', email: 'maria@email.com', os: 2  },
  { id: '3', name: 'Pedro Costa',    doc: '456.789.123-00',     phone: '(11) 97654-3210', email: 'pedro@email.com', os: 7  },
  { id: '4', name: 'Tech Solutions', doc: '12.345.678/0001-90', phone: '(11) 3333-4444',  email: 'tech@sol.com',    os: 12 },
];

export default function ClientesPage() {
  const [q, setQ] = useState('');
  const list = DATA.filter(c =>
    !q ||
    c.name.toLowerCase().includes(q.toLowerCase()) ||
    c.phone.includes(q)
  );

  return (
    <AppLayout>
      <PageHeader>
        <h1>Clientes</h1>
        <p>{list.length} clientes cadastrados</p>
      </PageHeader>

      <Toolbar>
        <Input
          placeholder="Buscar por nome, CPF/CNPJ ou telefone…"
          value={q}
          onChange={e => setQ(e.target.value)}
          fullWidth={false}
        />
        <Button>+ Novo Cliente</Button>
      </Toolbar>

      <Card $noPad>
        <Table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Documento</th>
              <th>Telefone</th>
              <th>E-mail</th>
              <th>OS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.map(c => (
              <tr key={c.id}>
                <td>
                  <ClientCell>
                    <Avatar>{c.name.split(' ').map(w => w[0]).slice(0, 2).join('')}</Avatar>
                    <span>{c.name}</span>
                  </ClientCell>
                </td>
                <DocText>{c.doc}</DocText>
                <td>{c.phone}</td>
                <MutedTd>{c.email}</MutedTd>
                <td><Badge variant={c.os > 5 ? 'warning' : 'default'}>{c.os} OS</Badge></td>
                <td><Button variant="ghost" size="sm">Ver →</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </AppLayout>
  );
}