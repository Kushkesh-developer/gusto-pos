
import { NextResponse } from 'next/server';

export function middleware(request) {
  const { cookies } = request;

  // Check if the user is logged in
  const isLoggedIn = cookies.get('loggedIn')?.value === 'true';

  // Redirect `/` to `/login` if no specific logic is handled for `/`
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If the user is logged in and trying to access the login page, log them out
  if (isLoggedIn && request.nextUrl.pathname === '/login') {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('loggedIn'); // Corrected cookie deletion
    return response;
  }

  // If the user is not logged in and trying to access a protected route, redirect to login
  if (!isLoggedIn && ['/dashboard', '/stock-manager'].includes(request.nextUrl.pathname)) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard', '/stock-manager', '/login'] // Include `/` explicitly
};