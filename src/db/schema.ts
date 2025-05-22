import { pgTable, serial, text, timestamp, varchar, boolean } from 'drizzle-orm/pg-core';

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
