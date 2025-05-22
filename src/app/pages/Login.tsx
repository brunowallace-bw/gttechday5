'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateUserLogin, type LoginForm } from "@/db/validateUserLogin";

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  });
  const [erro, setErro] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    if (!formData.email || !formData.senha) {
      setErro('Por favor, preencha todos os campos');
      return;
    }

    if (!formData.email.includes('@')) {
      setErro('Por favor, insira um email válido');
      return;
    }

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.senha
        }),
      });

      if (!response.ok) {
        throw new Error('Falha na autenticação');
      }

      const user = await response.json();
      
      router.push(`/chamados?is_admin=${user.isAdmin}&email=${(user.login)}`);
    } catch (error) {
      setErro('Usuário ou senha inválidos');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm w-full space-y-6 bg-white p-8 rounded-lg shadow-md border border-gray-200">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-[#00A1d4]">
            Login
          </h2>
        </div>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-3">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-[5px] focus:outline-none focus:ring-[#00A1d4] focus:border-[#00A1d4] focus:z-10 sm:text-sm"
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="senha" className="sr-only">
                Senha
              </label>
              <input
                id="senha"
                name="senha"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-[5px] focus:outline-none focus:ring-[#00A1d4] focus:border-[#00A1d4] focus:z-10 sm:text-sm"
                placeholder="••••••••"
                value={formData.senha}
                onChange={handleChange}
              />
            </div>
          </div>

          {erro && (
            <div className="text-red-500 text-sm text-center">
              {erro}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-medium text-[#00A1d4] hover:text-[#0088b3]">
                Esqueceu sua senha?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#00A1d4] hover:bg-[#0088b3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00A1d4]"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
