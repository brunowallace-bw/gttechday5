import { db } from "@/db";
import { chamados } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export type TicketForm = {
  titulo: string;
  descricao: string;
  categoria: 'melhoria' | 'duvida' | 'sugestao' | 'correcao' | 'outros';
  prioridade: 'baixa' | 'media' | 'alta';
  solicitanteId: number;
};

export type Ticket = {
  id: number;
  titulo: string;
  descricao: string;
  categoria: string;
  prioridade: string;
  solicitanteId: number;
  dataCriacao: Date;
  dataAtualizacao: Date;
  status: string;
  responsavelId: number;
};


// export async function validateUserLogin(dados: LoginForm): Promise<User> {
//   const user = await db.select().from(usuarios).where(eq(usuarios.login, dados.email));
//   if (user.length === 0) {
//     throw new Error("Usuário não encontrado");
//   }

//   return user[0];
// }


export type NovoChamadoForm = {
    titulo: string;
    descricao: string;
    categoria: 'melhoria' | 'duvida' | 'sugestao' | 'correcao' | 'outros';
    prioridade: 'baixa' | 'media' | 'alta';
    solicitanteId: number;
  };
  
//   export async function insertTicket(dados: NovoChamadoForm) {
//     const categoriaDb =
//       dados.categoria.charAt(0).toUpperCase() + dados.categoria.slice(1).toLowerCase();
//     const prioridadeDb =
//       dados.prioridade.charAt(0).toUpperCase() + dados.prioridade.slice(1).toLowerCase();
  
//     await db.insert(chamados).values({
//       titulo: dados.titulo,
//       descricao: dados.descricao,
//       categoria: categoriaDb,
//       prioridade: prioridadeDb,
//       data_criacao: new Date(),
//       data_atualizacao: new Date(),
//       data_resposta: null,
//       responsavel_id: null,
//       solicitante_id: dados.solicitanteId,
//     });
//   } 