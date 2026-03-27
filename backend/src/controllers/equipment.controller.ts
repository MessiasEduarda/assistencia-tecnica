import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { AppError } from '../middlewares/errorHandler';

export async function list(req: Request, res: Response) {
  const { clientId } = req.query as any;
  const where: any = { tenantId: req.user!.tenantId };
  if (clientId) where.clientId = clientId;
  res.json(await prisma.equipment.findMany({ where, include: { client: true } }));
}

export async function create(req: Request, res: Response) {
  const eq = await prisma.equipment.create({
    data: { ...req.body, tenantId: req.user!.tenantId },
  });
  res.status(201).json(eq);
}

export async function getOne(req: Request, res: Response) {
  const id = req.params.id as string;
  const eq = await prisma.equipment.findFirst({
    where: { id, tenantId: req.user!.tenantId },
    include: { client: true },
  });
  if (!eq) throw new AppError('Equipamento não encontrado', 404);
  res.json(eq);
}

export async function update(req: Request, res: Response) {
  const id = req.params.id as string;
  const exists = await prisma.equipment.findFirst({
    where: { id, tenantId: req.user!.tenantId },
  });
  if (!exists) throw new AppError('Equipamento não encontrado', 404);
  const eq = await prisma.equipment.update({ where: { id }, data: req.body });
  res.json(eq);
}