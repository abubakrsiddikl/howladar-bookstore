import { NextRequest, NextResponse } from "next/server";

// ✅ Route to Role Mapping
const routeRoleMap: Record<string, string[]> = {
  "/dashboard": ["admin", "store-manager"],
  "/orders": ["admin", "customer", "store-manager"],
  "/checkout": ["customer"],
  "/books/add": ["admin", "store-manager"],
  "/profile": ["admin", "customer", "store-manager"],
};

// ✅ Middleware Function
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const userRole = request.cookies.get("role")?.value; // ✅ Role cookie from server

  const { pathname } = request.nextUrl;

  console.log("Middleware hit:", pathname);
  // console.log({ token, userRole });

  const matchedRoute = Object.keys(routeRoleMap).find((route) =>
    pathname.startsWith(route)
  );

  if (matchedRoute) {
    // ✅ If no token, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // ✅ Check role from cookie
    const allowedRoles = routeRoleMap[matchedRoute];
    if (!userRole || !allowedRoles.includes(userRole)) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

// ✅ Matcher: Protect these routes
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/orders/:path*",
    "/checkout/:path*",
    "/books/add",
    "/profile/:path*",
  ],
};
