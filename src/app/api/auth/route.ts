import { validateUserLogin } from "@/db/validateUserLogin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const user = await validateUserLogin(body);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Usuário ou senha inválidos" },
      { status: 401 }
    );
  }
} 