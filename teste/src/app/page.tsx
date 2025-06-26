'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Usuario = {
  id: number
  nome: string
}

type Tarefa = {
  id: number
  texto: string
  created_at: string
  user: Usuario
}

export default function Home() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([])
  const [texto, setTexto] = useState('')
  const [user, setUser] = useState<Usuario | null>(null)
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (!stored) return router.push('/login')
    const u = JSON.parse(stored)
    setUser(u)
  }, [])

  async function carregarTarefas() {
    const res = await fetch('/api/tarefas')
    const data = await res.json()
    setTarefas(data)
  }

  async function adicionarTarefa(e: React.FormEvent) {
    e.preventDefault()
    if (!texto.trim() || !user) return

    const res = await fetch('/api/tarefas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texto, userId: user.id }),
    })
    if (res.ok) {
      setTexto('')
      carregarTarefas()
    }
  }

  useEffect(() => {
    carregarTarefas()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Tarefas</h1>
      <form onSubmit={adicionarTarefa} className="flex gap-2 mb-4">
        <input value={texto} onChange={e => setTexto(e.target.value)} placeholder="Nova tarefa" className="flex-1 p-2 border rounded" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Adicionar</button>
      </form>
      <ul className="space-y-2">
        {tarefas.map((tarefa) => (
          <li key={tarefa.id} className="p-3 border rounded">
            <p>{tarefa.texto}</p>
            <span className="text-sm text-gray-500">{new Date(tarefa.created_at).toLocaleString('pt-BR')} por {tarefa.user.nome}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}