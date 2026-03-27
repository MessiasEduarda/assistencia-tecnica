import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma';
import { AppError } from '../middlewares/errorHandler';

const USER_SELECT = {
  id: true, name: true, email: true, role: true, active: true,
  avatar: true, createdAt: true, updatedAt: true,
  cpf: true, phone: true, whatsapp: true, birthDate: true,
  street: true, number: true, complement: true,
  neighborhood: true, city: true, state: true, zip: true,
} as const;

export async function list(req: Request, res: Response) {
  const users = await prisma.user.findMany({
    where: { tenantId: req.user!.tenantId },
    select: USER_SELECT,
    orderBy: { name: 'asc' },
  });
  res.json(users);
}

export async function create(req: Request, res: Response) {
  const {
    password, name, email, role, active, avatar,
    cpf, phone, whatsapp, birthDate,
    street, number, complement, neighborhood, city, state, zip,
  } = req.body;

  if (!password) throw new AppError('Senha é obrigatória');

  const exists = await prisma.user.findUnique({
    where: { tenantId_email: { tenantId: req.user!.tenantId, email } },
  });
  if (exists) throw new AppError('Este e-mail já está cadastrado.', 409);

  const user = await prisma.user.create({
    data: {
      tenantId:     req.user!.tenantId,
      name,
      email,
      role,
      active:       active ?? true,
      avatar:       avatar       || null,
      password:     await bcrypt.hash(password, 12),
      cpf:          cpf          || null,
      phone:        phone        || null,
      whatsapp:     whatsapp     || null,
      birthDate:    birthDate    ? new Date(birthDate) : null,
      street:       street       || null,
      number:       number       || null,
      complement:   complement   || null,
      neighborhood: neighborhood || null,
      city:         city         || null,
      state:        state        || null,
      zip:          zip          || null,
    },
    select: USER_SELECT,
  });

  res.status(201).json(user);
}

export async function update(req: Request, res: Response) {
  const id = req.params.id as string;

  const exists = await prisma.user.findFirst({
    where: { id, tenantId: req.user!.tenantId },
  });
  if (!exists) throw new AppError('Usuário não encontrado', 404);

  const {
    name, email, active, avatar, password,
    cpf, phone, whatsapp, birthDate,
    street, number, complement, neighborhood, city, state, zip,
  } = req.body;

  const updated = await prisma.user.update({
    where: { id },
    data: {
      ...(name         !== undefined && { name }),
      ...(email        !== undefined && { email }),
      ...(active       !== undefined && { active }),
      ...(avatar       !== undefined && { avatar:       avatar       || null }),
      ...(cpf          !== undefined && { cpf:          cpf          || null }),
      ...(phone        !== undefined && { phone:        phone        || null }),
      ...(whatsapp     !== undefined && { whatsapp:     whatsapp     || null }),
      ...(birthDate    !== undefined && { birthDate:    birthDate ? new Date(birthDate) : null }),
      ...(street       !== undefined && { street:       street       || null }),
      ...(number       !== undefined && { number:       number       || null }),
      ...(complement   !== undefined && { complement:   complement   || null }),
      ...(neighborhood !== undefined && { neighborhood: neighborhood || null }),
      ...(city         !== undefined && { city:         city         || null }),
      ...(state        !== undefined && { state:        state        || null }),
      ...(zip          !== undefined && { zip:          zip          || null }),
      ...(password     && { password: await bcrypt.hash(password, 12) }),
    },
    select: USER_SELECT,
  });

  res.json(updated);
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

export async function remove(req: Request, res: Response) {
  const id = req.params.id as string;
  const u = await prisma.user.findFirst({
    where: { id, tenantId: req.user!.tenantId },
  });
  if (!u) throw new AppError('Usuário não encontrado', 404);
  await prisma.user.delete({ where: { id } });
  res.status(204).send();
}