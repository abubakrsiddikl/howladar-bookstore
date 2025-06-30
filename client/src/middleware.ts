import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/verifyToken";

// ✅ Route-based Role Mapping
const routeRoleMap: Record<string, string[]> = {
  "/dashboard": ["admin", "store-manager"],
  "/orders": ["admin", "customer", "store-manager"],
  "/checkout": ["customer"],
  "/books/add": ["admin", "store-manager"],
  "/profile": ["admin", "customer", "store-manager"],
};

// ✅ Middleware Function
export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const matchedRoute = Object.keys(routeRoleMap).find((route) =>
    pathname.startsWith(route)
  );

  if (!matchedRoute) {
    // If route is not protected, allow
    return NextResponse.next();
  }

  // ✅ Token Check
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const decoded = await verifyToken(token);
  console.log("decoded value", decoded);

  if (!decoded) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const userRole = decoded.role;
  const allowedRoles = routeRoleMap[matchedRoute];

  if (!allowedRoles.includes(userRole)) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }
}

// ✅ Matcher
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/orders/:path*",
    "/checkout",
    "/books/add",
    "/profile/:path*",
  ],
};
