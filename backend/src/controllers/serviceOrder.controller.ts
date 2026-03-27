import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { AppError } from '../middlewares/errorHandler';
import { v4 as uuid } from 'uuid';

async function nextNumber(tenantId: string): Promise<string> {
  const count = await prisma.serviceOrder.count({ where: { tenantId } });
  const year = new Date().getFullYear();
  return `OS-${year}-${String(count + 1).padStart(4, '0')}`;
}

export async function list(req: Request, res: Response) {
  const { tenantId } = req.user!;
  const { status, technicianId, search, page = '1', perPage = '20' } = req.query as any;
  const skip = (Number(page) - 1) * Number(perPage);

  const where: any = { tenantId };
  if (status) where.status = status;
  if (technicianId) where.technicianId = technicianId;
  if (search) {
    where.OR = [
      { number: { contains: search, mode: 'insensitive' } },
      { client: { name: { contains: search, mode: 'insensitive' } } },
    ];
  }

  const [data, total] = await Promise.all([
    prisma.serviceOrder.findMany({
      where, skip, take: Number(perPage),
      orderBy: { createdAt: 'desc' },
      include: {
        client: true,
        equipment: true,
        technician: { select: { id: true, name: true, email: true, role: true } },
      },
    }),
    prisma.serviceOrder.count({ where }),
  ]);

  res.json({
    data, total,
    page: Number(page),
    perPage: Number(perPage),
    totalPages: Math.ceil(total / Number(perPage)),
  });
}

export async function create(req: Request, res: Response) {
  const { tenantId, userId } = req.user!;
  const {
    clientId, equipmentId, reportedDefect,
    technicianId, priority, budgetParts = 0,
    budgetLabor = 0, internalNotes,
  } = req.body;

  if (!clientId || !equipmentId || !reportedDefect) {
    throw new AppError('Campos obrigatórios: clientId, equipmentId, reportedDefect');
  }

  const number = await nextNumber(tenantId);

  const order = await prisma.serviceOrder.create({
    data: {
      number, tenantId, clientId, equipmentId,
      reportedDefect,
      technicianId: technicianId || null,
      priority: priority ?? 'NORMAL',
      budgetParts: Number(budgetParts),
      budgetLabor: Number(budgetLabor),
      budgetTotal: Number(budgetParts) + Number(budgetLabor),
      internalNotes,
      publicToken: uuid(),
      statusHistory: {
        create: { toStatus: 'RECEIVED', changedById: userId },
      },
    },
    include: { client: true, equipment: true },
  });

  res.status(201).json(order);
}

export async function getOne(req: Request, res: Response) {
  const id = req.params.id as string;
  const order = await prisma.serviceOrder.findFirst({
    where: { id, tenantId: req.user!.tenantId },
    include: {
      client: true,
      equipment: true,
      technician: { select: { id: true, name: true, email: true, role: true } },
      statusHistory: {
        include: { changedBy: { select: { id: true, name: true, role: true } } },
        orderBy: { createdAt: 'asc' },
      },
      attachments: true,
      partsUsed: { include: { part: true } },
    },
  });
  if (!order) throw new AppError('OS não encontrada', 404);
  res.json(order);
}

export async function update(req: Request, res: Response) {
  const id = req.params.id as string;
  const exists = await prisma.serviceOrder.findFirst({
    where: { id, tenantId: req.user!.tenantId },
  });
  if (!exists) throw new AppError('OS não encontrada', 404);

  const { budgetParts, budgetLabor, ...rest } = req.body;
  const parts = budgetParts !== undefined ? Number(budgetParts) : Number(exists.budgetParts);
  const labor = budgetLabor !== undefined ? Number(budgetLabor) : Number(exists.budgetLabor);

  const updated = await prisma.serviceOrder.update({
    where: { id },
    data: { ...rest, budgetParts: parts, budgetLabor: labor, budgetTotal: parts + labor },
  });
  res.json(updated);
}

export async function changeStatus(req: Request, res: Response) {
  const id = req.params.id as string;
  const { tenantId, userId } = req.user!;
  const { status, note } = req.body;
  if (!status) throw new AppError('Status é obrigatório');

  const order = await prisma.serviceOrder.findFirst({
    where: { id, tenantId },
  });
  if (!order) throw new AppError('OS não encontrada', 404);

  const updated = await prisma.serviceOrder.update({
    where: { id },
    data: {
      status,
      ...(status === 'DONE'      && { completedAt: new Date() }),
      ...(status === 'DELIVERED' && { deliveredAt: new Date() }),
      statusHistory: {
        create: { fromStatus: order.status, toStatus: status, changedById: userId, note },
      },
    },
  });
  res.json(updated);
}

export async function remove(req: Request, res: Response) {
  const id = req.params.id as string;
  const exists = await prisma.serviceOrder.findFirst({
    where: { id, tenantId: req.user!.tenantId },
  });
  if (!exists) throw new AppError('OS não encontrada', 404);
  await prisma.serviceOrder.delete({ where: { id } });
  res.status(204).send();
}