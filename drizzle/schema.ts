import { pgTable, serial, varchar, text, timestamp, unique, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const teste = pgTable("teste", {
	id: serial().primaryKey().notNull(),
	nome: varchar({ length: 255 }).notNull(),
	descricao: text(),
	dataCriacao: timestamp("data_criacao", { mode: 'string' }).defaultNow().notNull(),
});

export const usuarios = pgTable("usuarios", {
	id: serial().primaryKey().notNull(),
	nome: varchar({ length: 255 }).notNull(),
	login: varchar({ length: 100 }).notNull(),
	senha: varchar({ length: 255 }).notNull(),
	isAdmin: boolean("is_admin").default(false).notNull(),
	dataCriacao: timestamp("data_criacao", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("usuarios_login_unique").on(table.login),
]);
