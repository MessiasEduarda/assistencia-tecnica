import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed...');

  const tenant = await prisma.tenant.upsert({
    where: { slug: 'assistec-principal' },
    update: { name: 'Assistência Técnica' },
    create: { name: 'Assistência Técnica', slug: 'assistec-principal', plan: 'PRO' },
  });

  const adminPass = await bcrypt.hash('12345678', 12);
  const admin = await prisma.user.upsert({
    where: { tenantId_email: { tenantId: tenant.id, email: 'maria@gmail.com' } },
    update: { password: adminPass },
    create: { tenantId: tenant.id, name: 'Maria Admin', email: 'maria@gmail.com', password: adminPass, role: 'ADMIN' },
  });

  console.log('Seed concluido! Login: maria@gmail.com / 12345678');
}

main()
  .catch(e => { console.error('Erro:', e); process.exit(1); })
  .finally(() => prisma.$disconnect());