import { pgTable, serial, text, timestamp, varchar, boolean, pgEnum, integer } from 'drizzle-orm/pg-core';

// Tabela de teste
export const teste = pgTable('teste', {
  id: serial('id').primaryKey(),
  nome: varchar('nome', { length: 255 }).notNull(),
  descricao: text('descricao'),
  dataCriacao: timestamp('data_criacao').defaultNow().notNull(),
});

// Tabela de usuários
export const usuarios = pgTable('usuarios', {
  id: serial('id').primaryKey(),
  nome: varchar('nome', { length: 255 }).notNull(),
  login: varchar('login', { length: 100 }).notNull().unique(),
  senha: varchar('senha', { length: 255 }).notNull(),
  isAdmin: boolean('is_admin').default(false).notNull(),
  dataCriacao: timestamp('data_criacao').defaultNow().notNull(),
});

// Enums para os cards
export const categoriaEnum = pgEnum('categoria_chamado', ['Melhoria', 'Bug', 'Dúvida', 'Sugestão', 'Outros']);
export const prioridadeEnum = pgEnum('prioridade_chamado', ['Baixa', 'Média', 'Alta']);
export const statusEnum = pgEnum('status_chamado', ['Aberto', 'Em Progresso', 'Concluído', 'Cancelado']);

// Tabela de cards de chamados
export const chamados = pgTable('chamados', {
  id: serial('id').primaryKey(),
  titulo: varchar('titulo', { length: 255 }).notNull(),
  descricao: text('descricao').notNull(),
  categoria: categoriaEnum('categoria').notNull(),
  prioridade: prioridadeEnum('prioridade').notNull(),
  status: statusEnum('status').default('Aberto').notNull(),
  
  // Relacionamentos com usuários
  solicitanteId: integer('solicitante_id').references(() => usuarios.id).notNull(),
  responsavelId: integer('responsavel_id').references(() => usuarios.id),
  
  // Datas
  dataCriacao: timestamp('data_criacao').defaultNow().notNull(),
  dataResposta: timestamp('data_resposta'),
  dataAtualizacao: timestamp('data_atualizacao').defaultNow().notNull(),
});
