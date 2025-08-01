"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    const data = await res.json();

    if (!res.ok) {
      setErro(data.erro || "Erro ao fazer login");
      return;
    }

    localStorage.setItem("usuario", JSON.stringify(data.usuario));
    router.push("/");
  }

  return (
    <div className="max-w-sm mx-auto mt-16 p-6 bg-zinc-900 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-white">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-600"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-600"
          required
        />
        {erro && <p className="text-red-400 text-sm">{erro}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
