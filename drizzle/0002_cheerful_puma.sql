CREATE TABLE "usuarios" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" varchar(255) NOT NULL,
	"login" varchar(100) NOT NULL,
	"senha" varchar(255) NOT NULL,
	"is_admin" boolean DEFAULT false NOT NULL,
	"data_criacao" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "usuarios_login_unique" UNIQUE("login")
);
--> statement-breakpoint
ALTER TABLE "teste" DROP COLUMN "nascimento";