// src/app/page.tsx
"use client";

import { useEffect, useState } from "react";

type Tarefa = {
  id: number;
  texto: string;
  created_at: string;
  usuario: { nome: string } | null;
};

export default function Home() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [texto, setTexto] = useState("");
  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const dados = localStorage.getItem("usuario");
    if (!dados) {
      window.location.href = "/login";
    } else {
      const user = JSON.parse(dados);
      setUsuarioId(user.id);
      carregarTarefas();
    }
  }, []);

  async function carregarTarefas() {
    const res = await fetch("/api/tarefas");
    const data = await res.json();
    setTarefas(data);
  }

  async function adicionarTarefa(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    if (!texto.trim() || !usuarioId) return;

    const res = await fetch("/api/tarefas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texto, usuario_id: usuarioId }),
    });

    const data = await res.json();

    if (!res.ok) {
      setErro(data.erro || "Erro ao criar tarefa");
      return;
    }

    setTexto("");
    carregarTarefas();
  }

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Tarefas</h1>

      <form onSubmit={adicionarTarefa} className="mb-4 flex gap-2">
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Nova tarefa"
          className="flex-1 p-2 rounded bg-zinc-800 text-white border border-zinc-600"
        />
        <button
          type="submit"
          className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700"
        >
          Adicionar
        </button>
      </form>

      {erro && <p className="text-red-400 mb-4">{erro}</p>}

      <ul className="space-y-2">
        {tarefas.map((tarefa) => (
          <li key={tarefa.id} className="p-3 rounded bg-zinc-800 text-white border border-zinc-700">
            {tarefa.texto}
            <span className="block text-sm text-zinc-400">
              {new Date(tarefa.created_at).toLocaleString("pt-BR")}
            </span>
            {tarefa.usuario && (
              <span className="block text-xs text-zinc-500">
                Criado por: {tarefa.usuario.nome}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
