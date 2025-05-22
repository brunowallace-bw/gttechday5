import { Droppable } from '@hello-pangea/dnd';
import { KanbanCard } from './KanbanCard';

interface KanbanColumnProps {
  title: string;
  cards: any[];
  id: string;
}

export function KanbanColumn({ title, cards, id }: KanbanColumnProps) {
  const getColumnColor = (status: string) => {
    switch (status) {
      case 'Aberto':
        return 'from-blue-50 to-transparent';
      case 'Em Progresso':
        return 'from-yellow-50 to-transparent';
      case 'Concluído':
        return 'from-green-50 to-transparent';
      case 'Cancelado':
        return 'from-red-50 to-transparent';
      default:
        return 'from-gray-50 to-transparent';
    }
  };

  return (
    <div className={`p-4 rounded-lg bg-gradient-to-b ${getColumnColor(id)} min-h-[calc(100vh-200px)]`}>
      <h2 className="font-semibold mb-4">{title}</h2>
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-3"
          >
            {cards.map((card, index) => (
              <KanbanCard key={card.id} chamado={card} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
} 