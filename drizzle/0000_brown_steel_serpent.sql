CREATE TABLE "teste" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" varchar(255) NOT NULL,
	"descricao" text,
	"data_criacao" timestamp DEFAULT now() NOT NULL
);
