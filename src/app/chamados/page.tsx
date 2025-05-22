'use client';

import { useSearchParams } from 'next/navigation';
import Chamados from '../pages/Chamados';

export default function ChamadosPage() {
  const searchParams = useSearchParams();
  const isAdmin = searchParams.get('is_admin') === 'true';
  const userEmail = searchParams.get('email');

  return <Chamados isAdmin={isAdmin} userEmail={userEmail || undefined} />;
} 