import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  const { email, senha } = await req.json();

  if (!email || !senha) {
    return NextResponse.json({ erro: 'Email e senha são obrigatórios.' }, { status: 400 });
  }

  const usuario = await prisma.usuario.findUnique({
    where: { email }
  });

  if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
    return NextResponse.json({ erro: 'Credenciais inválidas.' }, { status: 401 });
  }

  return NextResponse.json({ ok: true, usuario });
}
