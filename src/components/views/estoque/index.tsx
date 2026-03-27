import { PageHeader } from '@/components/ui/PageHeader';
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Toolbar, ActionGroup, Table,
  SkuText, MinText, StockBar,
} from './styles';

const PARTS = [
  { id: '1', name: 'Bateria iPhone 13', sku: 'BAT-IP13', qty: 2,  min: 5,  cost: 89.90,  supplier: 'TechParts',  low: true  },
  { id: '2', name: 'Tela Samsung A54',  sku: 'SCR-SA54', qty: 8,  min: 3,  cost: 145.00, supplier: 'Mobile Plus', low: false },
  { id: '3', name: 'Conector USB-C',    sku: 'CON-USBC', qty: 15, min: 10, cost: 12.50,  supplier: 'ElecShop',   low: false },
  { id: '4', name: 'Bateria iPhone 14', sku: 'BAT-IP14', qty: 1,  min: 5,  cost: 110.00, supplier: 'TechParts',  low: true  },
];

export default function EstoquePage() {
  return (
    <>
      
      <AppLayout>
        <PageHeader>
          <h1>Estoque</h1>
          <p>{PARTS.filter(p => p.low).length} itens com estoque baixo</p>
        </PageHeader>

        <Toolbar>
          <span />
          <ActionGroup>
            <Button variant="secondary">Registrar entrada</Button>
            <Button>+ Nova peça</Button>
          </ActionGroup>
        </Toolbar>

        <Card $noPad>
          <Table>
            <thead>
              <tr>
                <th>Peça</th>
                <th>SKU</th>
                <th>Qtd</th>
                <th>Nível</th>
                <th>Custo unit.</th>
                <th>Fornecedor</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {PARTS.map(p => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td><SkuText>{p.sku}</SkuText></td>
                  <td>
                    <strong>{p.qty}</strong>
                    <MinText> / mín {p.min}</MinText>
                  </td>
                  <td>
                    <StockBar $p={Math.min(100, Math.round(p.qty / p.min * 100))} $low={p.low} />
                  </td>
                  <td>R$ {p.cost.toFixed(2)}</td>
                  <td>{p.supplier}</td>
                  <td><Badge variant={p.low ? 'danger' : 'success'} dot>{p.low ? 'Baixo' : 'OK'}</Badge></td>
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