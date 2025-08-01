// src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { nome, email, senha } = await req.json();

  if (!nome || !email || !senha) {
    return NextResponse.json({ erro: "Preencha todos os campos" }, { status: 400 });
  }

  const usuarioExistente = await prisma.usuario.findUnique({ where: { email } });

  if (usuarioExistente) {
    return NextResponse.json({ erro: "E-mail já cadastrado" }, { status: 400 });
  }

  const senhaHash = await hash(senha, 10);

  const usuario = await prisma.usuario.create({
    data: { nome, email, senha: senhaHash },
  });

  return NextResponse.json({ ok: true, usuario });
}
