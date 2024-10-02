import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "./lib/verifyToken";

const AuthRoutes = ["/login", "/register"];

type Role = keyof typeof roleBasedRoutes;

const roleBasedRoutes = {
  USER: [/^\/user/],
  ADMIN: [/^\/admin/],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
  }

  let verifiedUser = null;

  try {
    verifiedUser = verifyToken(accessToken) as any;
  } catch (error) {
    console.error("Token verification failed:", error);

    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url)
    );
  }

  if (verifiedUser && AuthRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url)); // Redirect authenticated users to home if they try to access login/register
  }

  const role = verifiedUser?.role;

  if (role && roleBasedRoutes[role as Role]) {
    const routes = roleBasedRoutes[role as Role];

    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next(); // Allow access to the role-based route
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/user",
    "/user/:page*",
    "/admin",
    "/admin/:page",
    "/login",
    "/register",
  ],
};
