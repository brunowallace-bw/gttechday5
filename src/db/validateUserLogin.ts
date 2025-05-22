import { db } from "@/db";
import { teste, usuarios } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export type LoginForm = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  nome: string;
  login: string;
  senha: string;
  dataCriacao: Date;
  isAdmin: boolean;
};


export async function validateUserLogin(dados: LoginForm): Promise<User> {
  const user = await db.select().from(usuarios).where(eq(usuarios.login, dados.email));
  if (user.length === 0) {
    throw new Error("Usuário não encontrado");
  }

  return user[0];
}

