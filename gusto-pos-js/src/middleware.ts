import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
    import {authRoutes,privateRoutes} from '@/constants/routes'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    if (path === "/") {
        return  NextResponse.redirect(new URL(request.cookies.get("email") ? "/dashboard" : "/login", request.nextUrl));
    }
    if (privateRoutes.find(route => path?.includes(route)) && !request.cookies.get("email")) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    if (authRoutes.find(route => path?.includes(route)) && request.cookies.get("email")) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/",'/login/:path*', '/dashboard/:path*'],
}


