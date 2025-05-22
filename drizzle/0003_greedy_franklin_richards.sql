CREATE TYPE "public"."categoria_chamado" AS ENUM('Melhoria', 'Bug', 'Dúvida', 'Sugestão', 'Outros');--> statement-breakpoint
CREATE TYPE "public"."prioridade_chamado" AS ENUM('Baixa', 'Média', 'Alta');--> statement-breakpoint
CREATE TYPE "public"."status_chamado" AS ENUM('Aberto', 'Em Progresso', 'Concluído', 'Cancelado');--> statement-breakpoint
CREATE TABLE "chamados" (
	"id" serial PRIMARY KEY NOT NULL,
	"titulo" varchar(255) NOT NULL,
	"descricao" text NOT NULL,
	"categoria" "categoria_chamado" NOT NULL,
	"prioridade" "prioridade_chamado" NOT NULL,
	"status" "status_chamado" DEFAULT 'Aberto' NOT NULL,
	"solicitante_id" integer NOT NULL,
	"responsavel_id" integer,
	"data_criacao" timestamp DEFAULT now() NOT NULL,
	"data_resposta" timestamp,
	"data_atualizacao" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "chamados" ADD CONSTRAINT "chamados_solicitante_id_usuarios_id_fk" FOREIGN KEY ("solicitante_id") REFERENCES "public"."usuarios"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chamados" ADD CONSTRAINT "chamados_responsavel_id_usuarios_id_fk" FOREIGN KEY ("responsavel_id") REFERENCES "public"."usuarios"("id") ON DELETE no action ON UPDATE no action;