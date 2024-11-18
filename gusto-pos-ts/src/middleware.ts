import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authRoutes } from "@/constants/routes";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Redirect to /login for all routes except those that require authentication
  if (path !== "/login" && !authRoutes.some((route) => path.includes(route))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login/:path*", "/dashboard/:path*"], // You can remove "/dashboard" if not needed
};
