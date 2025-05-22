'use client';

import { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { KanbanColumn } from '../components/KanbanColumn';
import { KanbanFilter } from '../components/KanbanFilter';
import { NewTaskModal } from '../components/NewTaskModal';
import { Plus } from 'lucide-react';

interface Chamado {
  id: number;
  titulo: string;
  descricao: string;
  categoria: 'Melhoria' | 'Bug' | 'Dúvida' | 'Sugestão' | 'Outros';
  prioridade: 'Baixa' | 'Média' | 'Alta';
  status: 'Aberto' | 'Em Progresso' | 'Concluído' | 'Cancelado';
  solicitanteId: number;
  responsavelId?: number;
  responsavelNome?: string;
  dataCriacao: string;
  dataResposta?: string;
  dataAtualizacao: string;
}

interface FilterOptions {
  categoria: string;
  prioridade: string;
  dataInicio: string;
  dataFim: string;
}

export default function KanbanPage() {
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [filteredChamados, setFilteredChamados] = useState<Chamado[]>([]);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  useEffect(() => {
    const fetchChamados = async () => {
      try {
        const response = await fetch('/api/chamados');
        const data = await response.json();
        
        // Add example cards if no data exists
        if (data.length === 0) {
          const exampleCards: Chamado[] = [
            {
              id: 1,
              titulo: "Autenticação de dois fatores",
              descricao: "Implementar autenticação de dois fatores para aumentar a segurança do sistema",
              categoria: "Melhoria",
              prioridade: "Alta",
              status: "Aberto",
              solicitanteId: 1,
              responsavelId: 1,
              responsavelNome: "Usuario 1",
              dataCriacao: new Date().toISOString(),
              dataAtualizacao: new Date().toISOString()
            },
            {
              id: 2,
              titulo: "Documentação da API",
              descricao: "Atualizar a documentação da API com os novos endpoints",
              categoria: "Melhoria",
              prioridade: "Média",
              status: "Em Progresso",
              solicitanteId: 1,
              responsavelId: 1,
              responsavelNome: "Usuario 1",
              dataCriacao: new Date().toISOString(),
              dataAtualizacao: new Date().toISOString()
            },
            {
              id: 3,
              titulo: "Tooltips de ajuda",
              descricao: "Adicionar tooltips de ajuda nos campos do formulário",
              categoria: "Melhoria",
              prioridade: "Baixa",
              status: "Concluído",
              solicitanteId: 1,
              responsavelId: 1,
              responsavelNome: "Usuario 1",
              dataCriacao: new Date().toISOString(),
              dataAtualizacao: new Date().toISOString()
            },
            {
              id: 4,
              titulo: "Bug na exportação PDF",
              descricao: "Corrigir bug na exportação de relatórios em PDF",
              categoria: "Bug",
              prioridade: "Alta",
              status: "Em Progresso",
              solicitanteId: 1,
              responsavelId: 1,
              responsavelNome: "Usuario 1",
              dataCriacao: new Date().toISOString(),
              dataAtualizacao: new Date().toISOString()
            },
            {
              id: 5,
              titulo: "Backup automático",
              descricao: "Implementar sistema de backup automático dos dados",
              categoria: "Melhoria",
              prioridade: "Média",
              status: "Cancelado",
              solicitanteId: 1,
              responsavelId: 1,
              responsavelNome: "Usuario 1",
              dataCriacao: new Date().toISOString(),
              dataAtualizacao: new Date().toISOString()
            }
          ];
          setChamados(exampleCards);
          setFilteredChamados(exampleCards);
        } else {
          setChamados(data);
          setFilteredChamados(data);
        }
      } catch (error) {
        console.error('Erro ao buscar chamados:', error);
      }
    };

    fetchChamados();
  }, []);

  const handleFilter = (filters: FilterOptions) => {
    let filtered = [...chamados];

    if (filters.categoria) {
      filtered = filtered.filter(c => c.categoria === filters.categoria);
    }

    if (filters.prioridade) {
      filtered = filtered.filter(c => c.prioridade === filters.prioridade);
    }

    if (filters.dataInicio) {
      const dataInicio = new Date(filters.dataInicio);
      filtered = filtered.filter(c => new Date(c.dataCriacao) >= dataInicio);
    }

    if (filters.dataFim) {
      const dataFim = new Date(filters.dataFim);
      filtered = filtered.filter(c => new Date(c.dataCriacao) <= dataFim);
    }

    setFilteredChamados(filtered);
  };

  const handleNewTask = async (taskData: {
    criador: string;
    descricao: string;
    prioridade: string;
    prazo: string;
  }) => {
    try {
      const response = await fetch('/api/chamados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...taskData,
          status: 'Aberto',
          data_criacao: new Date().toISOString(),
          data_atualizacao: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        const newChamado = await response.json();
        setChamados([...chamados, newChamado]);
        setFilteredChamados([...filteredChamados, newChamado]);
        setIsNewTaskModalOpen(false);
      }
    } catch (error) {
      console.error('Erro ao criar novo chamado:', error);
    }
  };

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Update local state
    const newChamados = [...chamados];
    const chamado = newChamados.find(c => c.id.toString() === draggableId);
    if (chamado) {
      // Atualiza o status do chamado para corresponder à coluna de destino
      const newStatus = destination.droppableId as Chamado['status'];
      chamado.status = newStatus;
      chamado.dataAtualizacao = new Date().toISOString();
      
      // Atualiza os estados locais
      setChamados(newChamados);
      setFilteredChamados(newChamados);
    }

    // Update in database
    try {
      const response = await fetch(`/api/chamados/${draggableId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: destination.droppableId,
          dataAtualizacao: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Falha ao atualizar o status do chamado');
      }
    } catch (error) {
      console.error('Erro ao atualizar status do chamado:', error);
      // Reverte a mudança local em caso de erro
      if (chamado) {
        chamado.status = source.droppableId as Chamado['status'];
        setChamados([...chamados]);
        setFilteredChamados([...chamados]);
      }
    }
  };

  const statusColumns = {
    'Aberto': filteredChamados.filter(c => c.status === 'Aberto'),
    'Em Progresso': filteredChamados.filter(c => c.status === 'Em Progresso'),
    'Concluído': filteredChamados.filter(c => c.status === 'Concluído'),
    'Cancelado': filteredChamados.filter(c => c.status === 'Cancelado')
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>
          <KanbanFilter onFilter={handleFilter} />
        </div>
        <button
          onClick={() => setIsNewTaskModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#00a1d4] text-white rounded-lg hover:bg-[#0089b3] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nova tarefa
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(statusColumns).map(([status, cards]) => (
            <KanbanColumn
              key={status}
              title={status}
              cards={cards}
              id={status}
            />
          ))}
        </div>
      </DragDropContext>

      <NewTaskModal
        isOpen={isNewTaskModalOpen}
        onClose={() => setIsNewTaskModalOpen(false)}
        onSave={handleNewTask}
      />
    </div>
  );
} 