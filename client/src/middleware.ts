import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/verifyToken";

const routeRoleMap: Record<string, string[]> = {
  "/dashboard": ["admin", "store-manager"],
  "/orders": ["admin", "customer", "store-manager"],
  "/checkout": ["customer"],
  "/books/add": ["admin", "store-manager"],
  "/profile": ["admin", "customer", "store-manager"],
};

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  console.log("👉 Token in middleware:", token);

  const matchedRoute = Object.keys(routeRoleMap).find((route) =>
    pathname.startsWith(route)
  );

  if (!matchedRoute) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const decoded = await verifyToken(token);

    if (!decoded) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const userRole = decoded.role;
    const allowedRoles = routeRoleMap[matchedRoute];

    if (!allowedRoles.includes(userRole)) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/orders/:path*",
    "/checkout",
    "/books/add",
    "/profile/:path*",
  ],
};
