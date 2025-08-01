import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lista de Tarefas",
  description: "Uma lista de tarefas criada por William Felixs, com auxilio de IA",
};



// opcional: app/layout.tsx
import { redirect } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  if (typeof window !== "undefined" && !localStorage.getItem("usuario")) {
    redirect("/login");
  }

  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
