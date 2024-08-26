import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authRoutes, privateRoutes } from './contants/routes'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    console.log("🚀 ~ middleware ~ request:", request.nextUrl.pathname)
    if (privateRoutes.find(route => request.nextUrl.pathname?.includes(route)) && !request.cookies.get("email")) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    if (authRoutes.find(route => request.nextUrl.pathname?.includes(route)) && request.cookies.get("email")) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/login/:path*', '/dashboard/:path*'],
}