'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from "@/db";
import { chamados } from "@/db/schema";
// import { insertTicket } from '@/db/insertTicket';

interface FormData {
  titulo: string;
  descricao: string;
  categoria: 'melhoria' | 'duvida' | 'sugestao' | 'correcao' | 'outros';
  prioridade: 'baixa' | 'media' | 'alta';
  solicitanteId: number;
}

interface NovoChamadoProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function NovoChamado({ onSuccess, onCancel }: NovoChamadoProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    titulo: '',
    descricao: '',
    categoria: 'melhoria',
    prioridade: 'media',
    solicitanteId: 0,
  });
  const [erro, setErro] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    if (!formData.titulo || !formData.descricao) {
      setErro('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    try {
      // await insertTicket(formData);
      onSuccess?.();
    } catch (error) {
      setErro('Erro ao criar chamado. Tente novamente.');
    }
  };

  return (
    <div className="bg-gray-100 p-4 h-[25rem]">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow p-8">
          <form onSubmit={handleSubmit} className="space-y-3">
                        {/* Título */}
            <div>
              <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
                Título *
              </label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:outline-none focus:border-blue-500"
                placeholder="Digite o título do chamado"
              />
            </div>

            {/* Categoria e Prioridade na mesma linha */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">
                  Categoria *
                </label>
                <select
                  id="categoria"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  className="w-full rounded-[7px] border border-gray-300 px-3 py-0 text-base bg-white focus:outline-none focus:border-blue-500"
                >
                  <option value="melhoria">Melhoria</option>
                  <option value="duvida">Dúvida</option>
                  <option value="sugestao">Sugestão</option>
                  <option value="correcao">Correção</option>
                  <option value="outros">Outros</option>
                </select>
              </div>
              <div className="flex-1">
                <label htmlFor="prioridade" className="block text-sm font-medium text-gray-700 mb-1">
                  Prioridade *
                </label>
                <select
                  id="prioridade"
                  name="prioridade"
                  value={formData.prioridade}
                  onChange={handleChange}
                  className="w-full rounded-[7px] border border-gray-300 px-3 py-0 text-base bg-white focus:outline-none focus:border-blue-500"
                >
                  <option value="baixa">Baixa</option>
                  <option value="media">Média</option>
                  <option value="alta">Alta</option>
                </select>
              </div>
            </div>

            {/* Descrição */}
            <div>
              <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">
                Descrição *
              </label>
              <textarea
                id="descricao"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:outline-none focus:border-blue-500 resize-none"
                placeholder="Descreva detalhadamente o chamado"
              />
            </div>

            {erro && (
              <div className="text-red-500 text-xs">
                {erro}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onCancel}
                className="px-5 py-1 rounded-lg text-base font-medium bg-red-500 text-white hover:bg-red-600 transition"
              >
                Fechar
              </button>
              <button
                type="submit"
                className="px-5 py-1 rounded-lg text-base font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
