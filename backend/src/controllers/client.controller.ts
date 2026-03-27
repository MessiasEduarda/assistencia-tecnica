import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { AppError } from '../middlewares/errorHandler';

export async function list(req: Request, res: Response) {
  const { tenantId } = req.user!;
  const { search } = req.query as any;
  const where: any = { tenantId };
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { phone: { contains: search } },
      { document: { contains: search } },
    ];
  }
  const clients = await prisma.client.findMany({ where, orderBy: { name: 'asc' } });
  res.json(clients);
}

export async function create(req: Request, res: Response) {
  const { tenantId } = req.user!;
  const client = await prisma.client.create({ data: { ...req.body, tenantId } });
  res.status(201).json(client);
}

export async function getOne(req: Request, res: Response) {
  const id = req.params.id as string;
  const c = await prisma.client.findFirst({
    where: { id, tenantId: req.user!.tenantId },
    include: { equipment: true, orders: { take: 10, orderBy: { createdAt: 'desc' } } },
  });
  if (!c) throw new AppError('Cliente não encontrado', 404);
  res.json(c);
}

export async function update(req: Request, res: Response) {
  const id = req.params.id as string;
  const exists = await prisma.client.findFirst({
    where: { id, tenantId: req.user!.tenantId },
  });
  if (!exists) throw new AppError('Cliente não encontrado', 404);
  const c = await prisma.client.update({ where: { id }, data: req.body });
  res.json(c);
}

export async function remove(req: Request, res: Response) {
  const id = req.params.id as string;
  const exists = await prisma.client.findFirst({
    where: { id, tenantId: req.user!.tenantId },
  });
  if (!exists) throw new AppError('Cliente não encontrado', 404);
  await prisma.client.delete({ where: { id } });
  res.status(204).send();
}