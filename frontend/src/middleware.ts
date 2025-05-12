import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios from 'axios';

// Public routes that don't require authentication
const publicRoutes = ['/user/login', '/user/signup', '/captain/login', '/captain/signup'];

// Utility function to determine user role safely
const determineUserRole = (userData: any): 'captain' | 'user' => {
  return userData?.vehicle ? 'captain' : 'user';
};

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('cabtoken')?.value;

  // Check if the current route is a public route
  const isPublicRoute = publicRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // If no token and not a public route, redirect to login
  if (!token && !isPublicRoute && request.nextUrl.pathname !== '/') {
    const loginUrl = new URL('/user/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Skip authentication check for public routes and root
  if (isPublicRoute || request.nextUrl.pathname === '/') {
    return NextResponse.next();
  }

  // If token exists, validate the user
  try {
    const res = await axios.get(`${process.env.API_BASE_URL || "http://localhost:4000"}/current-user`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      timeout: 5000 
    });

    const role = determineUserRole(res.data.currUser);

    // If user is already on a public login/signup route and authenticated
    if (token && isPublicRoute) {
      const home = new URL(role === 'captain' ? '/captain/home' : '/home', request.url);
      return NextResponse.redirect(home);
    }

    // Prevent access to captain routes for non-captain users
    if (request.nextUrl.pathname.startsWith("/captain") && role !== 'captain') {
      const home = new URL('/home', request.url);
      return NextResponse.redirect(home);
    }

    return NextResponse.next();

  } catch (error) {
    console.error('Authentication error:', error);
    
    const response = NextResponse.redirect(new URL('/user/login', request.url));
    response.cookies.delete('cabtoken');
    return response;
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'], // Exclude static files and assets
};