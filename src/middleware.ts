import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getSessionFromRequest } from "./app/actions/auth";

// eslint-disable-next-line func-style
export async function middleware(request: NextRequest): Promise<NextResponse<unknown>> {
  const requestCookies = request.cookies;

  const session = await getSessionFromRequest(requestCookies);

  if (!session.isLoggedIn && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (session.isLoggedIn && request.nextUrl.pathname === "/auth") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
