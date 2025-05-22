import { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Calendar, User } from 'lucide-react';
import { CardDetailModal } from './CardDetailModal';

interface KanbanCardProps {
  chamado: {
    id: number;
    titulo: string;
    descricao: string;
    categoria: string;
    prioridade: string;
    status: string;
    dataCriacao: string;
    dataAtualizacao: string;
    responsavelId?: number;
    responsavelNome?: string;
  };
  index: number;
}

export function KanbanCard({ chamado, index }: KanbanCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getPriorityColor = (prioridade: string) => {
    switch (prioridade) {
      case 'Alta':
        return 'bg-red-100 border-red-500';
      case 'Média':
        return 'bg-yellow-100 border-yellow-500';
      case 'Baixa':
        return 'bg-green-100 border-green-500';
      default:
        return 'bg-gray-100 border-gray-500';
    }
  };

  return (
    <>
      <Draggable draggableId={chamado.id.toString()} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => setIsModalOpen(true)}
            className={`p-4 rounded-lg border-l-4 ${getPriorityColor(chamado.prioridade)} cursor-pointer hover:shadow-md transition-shadow`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full">
                {chamado.categoria}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                chamado.prioridade === 'Alta' ? 'bg-red-100 text-red-700' :
                chamado.prioridade === 'Média' ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              }`}>
                {chamado.prioridade}
              </span>
            </div>
            
            <h3 className="font-medium text-gray-800 mb-1">{chamado.titulo}</h3>
            <p className="text-sm text-gray-700 line-clamp-2 mb-3">{chamado.descricao}</p>
            
            <div className="flex justify-between items-center text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="w-3 h-3 text-blue-600" />
                </div>
                <span className="text-gray-700">{chamado.responsavelNome || 'Sem responsável'}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{new Date(chamado.dataCriacao).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        )}
      </Draggable>

      <CardDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        chamado={chamado}
      />
    </>
  );
} 