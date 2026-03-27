import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
import { AppError } from '../middlewares/errorHandler';

function signToken(userId: string, tenantId: string, role: string) {
  return jwt.sign(
    { userId, tenantId, role },
    process.env.JWT_SECRET as string,
    { expiresIn: '8h' }
  );
}

export async function checkEmail(req: Request, res: Response) {
  const { email } = req.body;
  if (!email) throw new AppError('E-mail é obrigatório');

  const user = await prisma.user.findFirst({
    where: { email: email.toLowerCase().trim(), active: true },
    select: { id: true },
  });

  res.json({ exists: !!user });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError('E-mail e senha são obrigatórios');
  }

  const user = await prisma.user.findFirst({
    where: { email: email.toLowerCase().trim(), active: true },
    include: { tenant: true },
  });

  if (!user) throw new AppError('Credenciais inválidas', 401);

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new AppError('Senha incorreta', 401);

  const token = signToken(user.id, user.tenantId, user.role);

  const { password: _, ...safeUser } = user;
  const { users: __, ...safeTenant } = user.tenant as any;

  res.json({ token, user: safeUser, tenant: safeTenant });
}

export async function me(req: Request, res: Response) {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.userId },
    include: { tenant: true },
  });
  if (!user) throw new AppError('Usuário não encontrado', 404);
  const { password: _, ...safe } = user;
  res.json(safe);
}