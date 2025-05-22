import { NextResponse } from 'next/server';
import { db } from '@/db';
import { chamados } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json();
    const id = parseInt(params.id);

    await db
      .update(chamados)
      .set({ 
        status,
        dataAtualizacao: new Date()
      })
      .where(eq(chamados.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao atualizar chamado:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar chamado' },
      { status: 500 }
    );
  }
} 