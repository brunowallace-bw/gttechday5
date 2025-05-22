import { X } from 'lucide-react';

interface CardDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
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
}

export function CardDetailModal({ isOpen, onClose, chamado }: CardDetailModalProps) {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getPriorityColor = (prioridade: string) => {
    switch (prioridade) {
      case 'Alta':
        return 'bg-red-100 text-red-700';
      case 'Média':
        return 'bg-yellow-100 text-yellow-700';
      case 'Baixa':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium px-2 py-1 bg-gray-100 rounded-full">
                {chamado.categoria}
              </span>
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${getPriorityColor(chamado.prioridade)}`}>
                {chamado.prioridade}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-4">{chamado.titulo}</h2>
          
          <div className="prose max-w-none mb-6">
            <p className="text-gray-600 whitespace-pre-wrap">{chamado.descricao}</p>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 text-xs">U</span>
                </div>
                <span className="text-gray-700">{chamado.responsavelNome || 'Sem responsável'}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-500">Criado em:</span>
                <span>{new Date(chamado.dataCriacao).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-500">Status:</span>
              <span className="font-medium">{chamado.status}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 