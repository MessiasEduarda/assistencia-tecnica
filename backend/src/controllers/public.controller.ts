import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { AppError } from '../middlewares/errorHandler';

export async function getByToken(req: Request, res: Response) {
  const publicToken = req.params.token as string;
  const order = await prisma.serviceOrder.findUnique({
    where: { publicToken },
    select: {
      number: true,
      status: true,
      entryDate: true,
      equipment: {
        select: { type: true, brand: true, model: true, serialNumber: true },
      },
      client: {
        select: { name: true, phone: true },
      },
      statusHistory: {
        select: { toStatus: true, createdAt: true, note: true },
        orderBy: { createdAt: 'asc' },
      },
    },
  });
  if (!order) throw new AppError('OS não encontrada', 404);
  res.json(order);
}