CREATE TABLE "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"titulo" varchar(255) NOT NULL,
	"descricao" text NOT NULL,
	"prioridade" "prioridade_chamado" NOT NULL,
	"prazo" date NOT NULL,
	"criador_id" integer NOT NULL,
	"data_criacao" timestamp DEFAULT now() NOT NULL,
	"data_atualizacao" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_criador_id_usuarios_id_fk" FOREIGN KEY ("criador_id") REFERENCES "public"."usuarios"("id") ON DELETE no action ON UPDATE no action;