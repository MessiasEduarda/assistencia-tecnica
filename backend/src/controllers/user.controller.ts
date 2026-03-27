import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma';
import { AppError } from '../middlewares/errorHandler';

export async function list(req: Request, res: Response) {
  const users = await prisma.user.findMany({
    where: { tenantId: req.user!.tenantId },
    select: { id: true, name: true, email: true, role: true, active: true, avatar: true, createdAt: true, updatedAt: true },
    orderBy: { name: 'asc' },
  });
  res.json(users);
}

export async function create(req: Request, res: Response) {
  const { password, ...rest } = req.body;
  if (!password) throw new AppError('Senha é obrigatória');
  const hashed = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { ...rest, password: hashed, tenantId: req.user!.tenantId },
    select: { id: true, name: true, email: true, role: true, active: true, createdAt: true },
  });
  res.status(201).json(user);
}

export async function update(req: Request, res: Response) {
  const id = req.params.id as string;
  const { password, ...rest } = req.body;
  const data: any = { ...rest };
  if (password) data.password = await bcrypt.hash(password, 12);
  const user = await prisma.user.updateMany({
    where: { id, tenantId: req.user!.tenantId },
    data,
  });
  res.json(user);
}

export async function toggle(req: Request, res: Response) {
  const id = req.params.id as string;
  const u = await prisma.user.findFirst({
    where: { id, tenantId: req.user!.tenantId },
  });
  if (!u) throw new AppError('Usuário não encontrado', 404);
  const updated = await prisma.user.update({
    where: { id },
    data: { active: !u.active },
    select: { id: true, name: true, active: true },
  });
  res.json(updated);
}