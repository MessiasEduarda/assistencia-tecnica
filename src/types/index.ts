export type OSStatus =
  | 'RECEIVED'
  | 'ANALYSIS'
  | 'WAITING_APPROVAL'
  | 'IN_REPAIR'
  | 'DONE'
  | 'DELIVERED';

export const OS_STATUS_LABEL: Record<OSStatus, string> = {
  RECEIVED:         'Recebido',
  ANALYSIS:         'Em análise',
  WAITING_APPROVAL: 'Aguardando aprovação',
  IN_REPAIR:        'Em reparo',
  DONE:             'Finalizado',
  DELIVERED:        'Entregue',
};

export const OS_STATUS_COLOR: Record<OSStatus, { bg: string; text: string; border: string }> = {
  RECEIVED:         { bg: '#EFF6FF', text: '#1D4ED8', border: '#BFDBFE' },
  ANALYSIS:         { bg: '#FEF3C7', text: '#92400E', border: '#FDE68A' },
  WAITING_APPROVAL: { bg: '#FFF7ED', text: '#9A3412', border: '#FED7AA' },
  IN_REPAIR:        { bg: '#EDE9FE', text: '#5B21B6', border: '#DDD6FE' },
  DONE:             { bg: '#ECFDF5', text: '#065F46', border: '#A7F3D0' },
  DELIVERED:        { bg: '#F0F9FF', text: '#0C4A6E', border: '#BAE6FD' },
};

export type UserRole = 'ADMIN' | 'ATTENDANT' | 'TECHNICIAN';

export interface User {
  id: string;
  tenantId: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  plan: 'BASIC' | 'PRO' | 'ENTERPRISE';
}

export interface Client {
  id: string;
  name: string;
  document: string;
  phone: string;
  whatsapp?: string;
  email?: string;
}

export interface Equipment {
  id: string;
  clientId: string;
  type: string;
  brand: string;
  model: string;
  serialNumber?: string;
  reportedDefect: string;
}

export interface ServiceOrder {
  id: string;
  number: string;
  clientId: string;
  equipmentId: string;
  technicianId?: string;
  status: OSStatus;
  entryDate: string;
  budgetParts: number;
  budgetLabor: number;
  budgetTotal: number;
  publicToken: string;
  client?: Client;
  equipment?: Equipment;
}
