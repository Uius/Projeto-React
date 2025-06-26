'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Cadastro() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const router = useRouter()

  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha }),
    })

    const data = await res.json()
    if (data.ok) {
      router.push('/login')
    } else {
      alert(data.erro)
    }
  }

  return (
    <form onSubmit={handleCadastro} className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Cadastro</h1>
      <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome" className="block w-full p-2 border rounded" />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="block w-full p-2 border rounded" />
      <input value={senha} onChange={e => setSenha(e.target.value)} placeholder="Senha" type="password" className="block w-full p-2 border rounded" />
      <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">Cadastrar</button>
    </form>
  )
}