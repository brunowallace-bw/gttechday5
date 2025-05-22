'use client';

import { useSearchParams } from 'next/navigation';
import Chamados from '../pages/Chamados';

export default function ChamadosPage() {
  const searchParams = useSearchParams();
  const isAdmin = searchParams.get('is_admin') === 'true';

  return <Chamados isAdmin={isAdmin} />;
} 