// backend/src/controllers/equipment.controller.ts

import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { AppError } from '../middlewares/errorHandler';

export async function list(req: Request, res: Response) {
  const { clientId, search } = req.query as any;
  const where: any = { tenantId: req.user!.tenantId };
  if (clientId) where.clientId = clientId;
  if (search) {
    where.OR = [
      { brand: { contains: search, mode: 'insensitive' } },
      { model: { contains: search, mode: 'insensitive' } },
      { serialNumber: { contains: search, mode: 'insensitive' } },
      { client: { name: { contains: search, mode: 'insensitive' } } },
    ];
  }
  const data = await prisma.equipment.findMany({
    where,
    include: {
      client: true,
      orders: {
        select: { id: true, number: true, status: true, entryDate: true },
        orderBy: { createdAt: 'desc' },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
  res.json(data);
}

export async function create(req: Request, res: Response) {
  const eq = await prisma.equipment.create({
    data: { ...req.body, tenantId: req.user!.tenantId },
    include: { client: true },
  });
  res.status(201).json(eq);
}

export async function getOne(req: Request, res: Response) {
  const id = req.params.id as string;
  const eq = await prisma.equipment.findFirst({
    where: { id, tenantId: req.user!.tenantId },
    include: {
      client: true,
      orders: {
        select: { id: true, number: true, status: true, entryDate: true, technician: { select: { name: true } } },
        orderBy: { createdAt: 'desc' },
      },
    },
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
  const eq = await prisma.equipment.update({
    where: { id },
    data: req.body,
    include: { client: true },
  });
  res.json(eq);
}

export async function remove(req: Request, res: Response) {
  const id = req.params.id as string;
  const exists = await prisma.equipment.findFirst({
    where: { id, tenantId: req.user!.tenantId },
  });
  if (!exists) throw new AppError('Equipamento não encontrado', 404);
  await prisma.equipment.delete({ where: { id } });
  res.status(204).send();
}