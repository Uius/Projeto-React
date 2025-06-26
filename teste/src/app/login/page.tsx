'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    })

    const data = await res.json()
    if (data.ok) {
      localStorage.setItem('user', JSON.stringify(data.usuario))
      router.push('/')
    } else {
      alert(data.erro)
    }
  }

  return (
    <form onSubmit={handleLogin} className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Login</h1>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="block w-full p-2 border rounded" />
      <input value={senha} onChange={e => setSenha(e.target.value)} placeholder="Senha" type="password" className="block w-full p-2 border rounded" />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Entrar</button>
    </form>
  )
}