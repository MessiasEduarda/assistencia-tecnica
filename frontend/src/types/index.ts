// frontend/src/types/index.ts

export type OSStatus =
  | 'RECEIVED'
  | 'ANALYSIS'
  | 'WAITING_APPROVAL'
  | 'IN_REPAIR'
  | 'DONE'
  | 'DELIVERED';

export type Priority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';

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

export const PRIORITY_LABEL: Record<Priority, string> = {
  LOW:    'Baixa',
  NORMAL: 'Normal',
  HIGH:   'Alta',
  URGENT: 'Urgente',
};

export const PRIORITY_COLOR: Record<Priority, { bg: string; text: string; border: string }> = {
  LOW:    { bg: '#F0F9FF', text: '#0C4A6E', border: '#BAE6FD' },
  NORMAL: { bg: '#F8F7F4', text: '#4A4742', border: '#D6D3CC' },
  HIGH:   { bg: '#FFF7ED', text: '#9A3412', border: '#FED7AA' },
  URGENT: { bg: '#FEF2F2', text: '#991B1B', border: '#FECACA' },
};

export type UserRole = 'ADMIN' | 'ATTENDANT' | 'TECHNICIAN';

export interface User {
  id: string;
  tenantId: string;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  plan: 'BASIC' | 'PRO' | 'ENTERPRISE';
}

export interface Client {
  id: string;
  tenantId: string;
  name: string;
  document?: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  zip?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  equipment?: Equipment[];
  orders?: ServiceOrder[];
}

export interface Equipment {
  id: string;
  tenantId: string;
  clientId: string;
  type: string;
  brand: string;
  model: string;
  serialNumber?: string;
  imei?: string;
  accessories: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
  client?: Client;
  orders?: ServiceOrder[];
}

export interface ServiceOrder {
  id: string;
  number: string;
  tenantId: string;
  clientId: string;
  equipmentId: string;
  technicianId?: string | null;
  status: OSStatus;
  priority: Priority;
  entryDate: string;
  slaDeadline?: string | null;
  reportedDefect: string;
  diagnosis?: string | null;
  testsPerformed?: string | null;
  budgetParts: number;
  budgetLabor: number;
  budgetTotal: number;
  clientApproved?: boolean | null;
  approvalDate?: string | null;
  publicToken: string;
  warranty?: number | null;
  rating?: number | null;
  feedback?: string | null;
  internalNotes?: string | null;
  completedAt?: string | null;
  deliveredAt?: string | null;
  createdAt: string;
  updatedAt: string;
  client: Client;
  equipment: Equipment;
  technician?: { id: string; name: string; email: string; role: string } | null;
  statusHistory?: StatusHistory[];
  attachments?: Attachment[];
  partsUsed?: OrderPart[];
}

export interface StatusHistory {
  id: string;
  orderId: string;
  fromStatus?: OSStatus | null;
  toStatus: OSStatus;
  changedById: string;
  note?: string | null;
  createdAt: string;
  changedBy?: { id: string; name: string; role: string };
}

export interface Attachment {
  id: string;
  orderId: string;
  type: string;
  url: string;
  label?: string | null;
  createdAt: string;
}

export interface Part {
  id: string;
  tenantId: string;
  supplierId?: string | null;
  name: string;
  sku: string;
  description?: string | null;
  quantity: number;
  minQuantity: number;
  cost: number;
  salePrice: number;
  createdAt: string;
  updatedAt: string;
  supplier?: Supplier | null;
}

export interface OrderPart {
  id: string;
  orderId: string;
  partId: string;
  quantity: number;
  unitCost: number;
  part?: Part;
}

export interface Supplier {
  id: string;
  tenantId: string;
  name: string;
  contact?: string | null;
  phone?: string | null;
  email?: string | null;
  notes?: string | null;
  createdAt: string;
}

export interface Transaction {
  id: string;
  tenantId: string;
  orderId?: string | null;
  supplierId?: string | null;
  type: 'RECEIVABLE' | 'PAYABLE';
  description: string;
  amount: number;
  paymentMethod?: 'CASH' | 'CARD' | 'PIX' | 'INSTALLMENT' | 'BANK_SLIP' | null;
  dueDate: string;
  paidDate?: string | null;
  paid: boolean;
  createdAt: string;
  updatedAt: string;
  order?: ServiceOrder | null;
  supplier?: Supplier | null;
}