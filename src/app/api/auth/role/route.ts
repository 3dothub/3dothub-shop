import { NextResponse } from "next/server";
import { cookies } from "next/headers";

type Role = "admin" | "user";

const COOKIE_NAME = "app_role";

const getRoleFromCookie = async (): Promise<Role> => {
  const cookieStore = await cookies();
  const role = cookieStore.get(COOKIE_NAME)?.value;
  return role === "admin" ? "admin" : "user";
};

export async function GET() {
  const role = await getRoleFromCookie();
  return NextResponse.json({ role });
}

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => ({}))) as { role?: string };
  const role: Role = payload.role === "admin" ? "admin" : "user";

  const response = NextResponse.json({ role });
  response.cookies.set(COOKIE_NAME, role, {
    path: "/",
    httpOnly: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ role: "user" });
  response.cookies.set(COOKIE_NAME, "user", {
    path: "/",
    httpOnly: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  });

  return response;
}
