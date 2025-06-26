import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const tarefas = await prisma.tarefa.findMany({
      orderBy: { created_at: 'desc' },
      include: { user: true }
    });
    return NextResponse.json(tarefas);
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    return NextResponse.json({ erro: 'Erro ao buscar tarefas' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { texto, userId } = await req.json();

  if (!texto || !userId) {
    return NextResponse.json({ erro: 'Texto e userId são obrigatórios' }, { status: 400 });
  }

  try {
    const novaTarefa = await prisma.tarefa.create({
      data: {
        texto,
        userId
      }
    });
    return NextResponse.json(novaTarefa);
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    return NextResponse.json({ erro: 'Erro ao criar tarefa' }, { status: 500 });
  }
}