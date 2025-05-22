import { NextResponse } from 'next/server';
import { db } from '@/db';
import { chamados } from '@/db/schema';

export async function GET() {
  try {
    const allChamados = await db.select().from(chamados);
    return NextResponse.json(allChamados);
  } catch (error) {
    console.error('Erro ao buscar chamados:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar chamados' },
      { status: 500 }
    );
  }
} 