import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";

const tokenSchema = z.string().min(1);

export function middleware(request: NextRequest) {
  const rawToken = request.cookies.get("token")?.value;

  const result = tokenSchema.safeParse(rawToken);

  if (!result.success) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};