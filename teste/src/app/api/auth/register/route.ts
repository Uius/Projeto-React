import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  const body = await req.json();
  const { nome, email, senha } = body;

  if (!nome || !email || !senha) {
    return NextResponse.json({ erro: 'Campos obrigatórios não preenchidos.' }, { status: 400 });
  }

  const senhaCriptografada = await bcrypt.hash(senha, 10);

  try {
    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: senhaCriptografada
      }
    });

    return NextResponse.json({ ok: true, usuario });
  } catch (error) {
    return NextResponse.json({ erro: 'Erro ao registrar usuário.' }, { status: 500 });
  }
}
