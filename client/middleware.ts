// middleware.ts

import { verifyToken } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

const routeRoleMap: Record<string, string[]> = {
  "/dashboard": ["admin"],
  "/orders": ["admin", "customer", "store-manager"],
  "/checkout": ["customer"],
  "/books/add": ["admin", "store-manager"],
  "/profile": ["admin", "customer", "store-manager"],
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;
  console.log("hit middleware")
  const matchedRoute = Object.keys(routeRoleMap).find((route) =>
    pathname.startsWith(route)
  );

  if (matchedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const decoded = verifyToken(token);

      if (!decoded) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      const allowedRoles = routeRoleMap[matchedRoute];

      if (!allowedRoles.includes(decoded.role)) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/orders",
    "/checkout",
    "/books/add",
    "/profile",
  ],
};
