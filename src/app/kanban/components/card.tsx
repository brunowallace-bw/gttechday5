'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface KanbanCardProps {
  title: string;
  priority: 'baixa' | 'media' | 'alta';
  status: string;
  createdAt: Date;
}

const priorityColors = {
  baixa: 'bg-green-100 text-green-800',
  media: 'bg-yellow-100 text-yellow-800',
  alta: 'bg-red-100 text-red-800',
};

export function KanbanCard({ title, priority, status, createdAt }: KanbanCardProps) {
  return (
    <Card className="mb-3 cursor-pointer hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <h4 className="font-medium mb-2 line-clamp-2">{title}</h4>
        <div className="flex items-center justify-between">
          <Badge className={priorityColors[priority]}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </Badge>
          <span className="text-sm text-gray-500">
            {format(createdAt, "dd 'de' MMMM", { locale: ptBR })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
} 