import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { AppError } from '../middlewares/errorHandler';

export async function list(req: Request, res: Response) {
  const parts = await prisma.part.findMany({
    where: { tenantId: req.user!.tenantId },
    include: { supplier: true },
    orderBy: { name: 'asc' },
  });
  res.json(parts);
}

export async function lowStock(req: Request, res: Response) {
  const parts = await prisma.part.findMany({
    where: { tenantId: req.user!.tenantId, quantity: { lte: 0 } },
  });
  res.json(parts);
}

export async function create(req: Request, res: Response) {
  const p = await prisma.part.create({
    data: { ...req.body, tenantId: req.user!.tenantId },
  });
  res.status(201).json(p);
}

export async function update(req: Request, res: Response) {
  const id = req.params.id as string;
  const exists = await prisma.part.findFirst({
    where: { id, tenantId: req.user!.tenantId },
  });
  if (!exists) throw new AppError('Peça não encontrada', 404);
  const p = await prisma.part.update({ where: { id }, data: req.body });
  res.json(p);
}

export async function movement(req: Request, res: Response) {
  const id = req.params.id as string;
  const { type, quantity, reason } = req.body;
  const part = await prisma.part.findFirst({
    where: { id, tenantId: req.user!.tenantId },
  });
  if (!part) throw new AppError('Peça não encontrada', 404);

  const qty = type === 'IN'
    ? part.quantity + Number(quantity)
    : part.quantity - Number(quantity);

  if (qty < 0) throw new AppError('Estoque insuficiente');

  await prisma.$transaction([
    prisma.part.update({ where: { id }, data: { quantity: qty } }),
    prisma.stockMovement.create({
      data: { partId: id, type, quantity: Number(quantity), reason, createdBy: req.user!.userId },
    }),
  ]);

  res.json({ ok: true, newQuantity: qty });
}