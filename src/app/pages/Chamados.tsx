'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LayoutGrid, List } from 'lucide-react';
import Modal from '../components/Modal';
import NovoChamado from './NovoChamado';

interface Chamado {
  id: number;
  titulo: string;
  descricao: string;
  status: 'aberto' | 'em_andamento' | 'fechado';
  prioridade: 'baixa' | 'media' | 'alta';
  cliente: string;
  dataAbertura: string;
  usuario: string;
}

interface ChamadosProps {
  isAdmin: boolean;
  userEmail?: string;
}

export default function Chamados({ isAdmin, userEmail }: ChamadosProps) {
  const router = useRouter();
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');
  const [filtroPrioridade, setFiltroPrioridade] = useState<string>('todos');
  const [viewMode, setViewMode] = useState<'grid' | 'card'>('grid');
  const [busca, setBusca] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const carregarChamados = async () => {
    const chamadosMock: Chamado[] = [
      {
        id: 1,
        titulo: 'Problema com impressora',
        descricao: 'Impressora não está imprimindo',
        status: 'aberto',
        prioridade: 'alta',
        cliente: 'Empresa ABC',
        dataAbertura: '2024-03-20',
        usuario: 'cliente1@email.com'
      },
      {
        id: 2,
        titulo: 'Problema com Teclado',
        descricao: 'Teclado não está funcionando',
        status: 'aberto',
        prioridade: 'media',
        cliente: 'Empresa X - Cabrunco',
        dataAbertura: '2024-03-20',
        usuario: 'cliente2@email.com'
      },
      // Adicione mais chamados mock aqui
    ];
    const chamadosFiltrados = isAdmin 
      ? chamadosMock 
      : chamadosMock.filter(chamado => chamado.usuario === userEmail);
    setChamados(chamadosFiltrados);
  };

  useEffect(() => {
    carregarChamados();
  }, [isAdmin, userEmail]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aberto':
        return 'bg-yellow-100 text-yellow-800';
      case 'em_andamento':
        return 'bg-blue-100 text-blue-800';
      case 'fechado':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'alta':
        return 'bg-red-100 text-red-800';
      case 'media':
        return 'bg-orange-100 text-orange-800';
      case 'baixa':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const chamadosFiltrados = chamados.filter(chamado => {
    const statusMatch = filtroStatus === 'todos' || chamado.status === filtroStatus;
    const prioridadeMatch = filtroPrioridade === 'todos' || chamado.prioridade === filtroPrioridade;
    
    // Filtro de busca por texto
    const buscaMatch = busca === '' || 
      Object.values(chamado).some(valor => 
        String(valor).toLowerCase().includes(busca.toLowerCase())
      );
    
    return statusMatch && prioridadeMatch && buscaMatch;
  });

  const handleNovoChamado = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChamadoCriado = () => {
    setIsModalOpen(false);
    // Recarregar a lista de chamados
    carregarChamados();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Controle de Chamados</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'card' : 'grid')}
              className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
              title={viewMode === 'grid' ? 'Visualização em Cards' : 'Visualização em Grid'}
            >
              {viewMode === 'grid' ? (
                <LayoutGrid className="h-5 w-5 text-gray-600" />
              ) : (
                <List className="h-5 w-5 text-gray-600" />
              )}
            </button>
            <button
              onClick={handleNovoChamado}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Novo Chamado
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-8 mb-6">
          <div className="flex items-end space-x-2">
            <div className="flex-1">
              <label htmlFor="busca" className="block text-lg font-medium text-gray-700 mb-2">
                Buscar
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="busca"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  placeholder="Buscar em todos os campos..."
                  className="w-full h-14 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 pl-14 text-lg"
                />
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <svg 
                    className="h-6 w-6 text-gray-400" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-lg font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
                className="w-full h-14 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
              >
                <option value="todos">Todos</option>
                <option value="aberto">Aberto</option>
                <option value="em_andamento">Em Andamento</option>
                <option value="fechado">Fechado</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-lg font-medium text-gray-700 mb-2">Prioridade</label>
              <select
                value={filtroPrioridade}
                onChange={(e) => setFiltroPrioridade(e.target.value)}
                className="w-full h-14 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
              >
                <option value="todos">Todas</option>
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
              </select>
            </div>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 font-medium text-gray-700">
              <div className="col-span-3">Título</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Prioridade</div>
              <div className="col-span-2">Cliente</div>
              <div className="col-span-2">Data</div>
              <div className="col-span-1 text-right">Ações</div>
            </div>

            {chamadosFiltrados.map((chamado) => (
              <div 
                key={chamado.id} 
                className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="col-span-3">
                  <div className="font-medium text-gray-900">{chamado.titulo}</div>
                  <div className="text-sm text-gray-500 truncate">{chamado.descricao}</div>
                </div>
                <div className="col-span-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(chamado.status)}`}>
                    {chamado.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPrioridadeColor(chamado.prioridade)}`}>
                    {chamado.prioridade}
                  </span>
                </div>
                <div className="col-span-2 text-sm text-gray-600">
                  {chamado.cliente}
                </div>
                <div className="col-span-2 text-sm text-gray-600">
                  {new Date(chamado.dataAbertura).toLocaleDateString()}
                </div>
                <div className="col-span-1 text-right">
                  <button
                    onClick={() => router.push(`/chamados/${chamado.id}`)}
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                  >
                    Detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chamadosFiltrados.map((chamado) => (
              <div key={chamado.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{chamado.titulo}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(chamado.status)}`}>
                    {chamado.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{chamado.descricao}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Cliente:</span>
                    <span className="text-gray-900">{chamado.cliente}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Data:</span>
                    <span className="text-gray-900">{new Date(chamado.dataAbertura).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Prioridade:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPrioridadeColor(chamado.prioridade)}`}>
                      {chamado.prioridade}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => router.push(`/chamados/${chamado.id}`)}
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                  >
                    Ver detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Novo Chamado"
        >
          <NovoChamado 
            onSuccess={() => {
              handleChamadoCriado();
              carregarChamados();
            }} 
            onCancel={handleCloseModal} 
          />
        </Modal>
      )}
    </div>
  );
} 