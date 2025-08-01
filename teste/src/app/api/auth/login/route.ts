// src/app/api/auth/login/route.ts
import { compare } from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { email, senha } = await req.json();

  const usuario = await prisma.usuario.findUnique({ where: { email } });

  if (!usuario || !(await compare(senha, usuario.senha))) {
    return NextResponse.json({ erro: "Credenciais inválidas" }, { status: 401 });
  }

  return NextResponse.json({ ok: true, usuario });
}
