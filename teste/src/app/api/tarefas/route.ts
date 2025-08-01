// src/app/api/tarefas/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const tarefas = await prisma.tarefa.findMany({
    include: { usuario: { select: { nome: true } } },
    orderBy: { created_at: "desc" },
  });

  return NextResponse.json(tarefas);
}

export async function POST(req: Request) {
  const { texto, usuario_id } = await req.json();

  if (!texto || !usuario_id) {
    return NextResponse.json({ erro: "Texto ou usuário ausente" }, { status: 400 });
  }

  const nova = await prisma.tarefa.create({
    data: { texto, usuario_id },
  });

  return NextResponse.json(nova);
}
