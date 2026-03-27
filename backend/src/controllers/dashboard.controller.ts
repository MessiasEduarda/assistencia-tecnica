import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export async function stats(req: Request, res: Response) {
  const { tenantId } = req.user!;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  const [osOpen, osToday, osLate, revenueMonth, activeTech, lowStock] = await Promise.all([
    prisma.serviceOrder.count({
      where: { tenantId, status: { notIn: ['DELIVERED'] } },
    }),
    prisma.serviceOrder.count({
      where: { tenantId, createdAt: { gte: today } },
    }),
    prisma.serviceOrder.count({
      where: {
        tenantId,
        slaDeadline: { lt: new Date() },
        status: { notIn: ['DONE', 'DELIVERED'] },
      },
    }),
    prisma.transaction.aggregate({
      where: { tenantId, type: 'RECEIVABLE', paid: true, paidDate: { gte: monthStart } },
      _sum: { amount: true },
    }),
    prisma.user.count({
      where: { tenantId, role: 'TECHNICIAN', active: true },
    }),
    prisma.part.count({
      where: { tenantId, quantity: { lte: 2 } },
    }),
  ]);

  res.json({
    osOpen,
    osToday,
    osLate,
    revenueMonth: Number(revenueMonth._sum.amount ?? 0),
    activeTechnicians: activeTech,
    lowStockParts: lowStock,
  });
}
