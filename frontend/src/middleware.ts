import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios from 'axios';

// Public routes that don't require authentication
const publicRoutes = ['/user/login', '/user/signup', '/captain/login', '/captain/signup'];

// Utility function to determine user role safely
const determineUserRole = (userData: any): 'captain' | 'user' => {
  return userData?.vehicle ? 'captain' : 'user';
};

const determineInRide = (userData: any): boolean => {
  return userData?.rideInfo?.isRideActive || false;
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('cabtoken')?.value;
  
  // Check if the current route is a public route
  const isPublicRoute = publicRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );
  
  // Allow access to root path without authentication
  if (request.nextUrl.pathname === '/') {
    return NextResponse.next();
  }
  
  // If no token and not a public route, redirect to login
  if (!token && !isPublicRoute) {
    const loginUrl = new URL('/user/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
  
  // If no token but on public route, allow access
  if (!token && isPublicRoute) {
    return NextResponse.next();
  }
  
  // If token exists, validate the user
  if (token) {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000"}/current-user`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        timeout: 5000
      });
      
      const userData = res.data.currUser;
      const role = determineUserRole(userData);
      const isOnRide = determineInRide(userData);
      
      // If user is already on a public login/signup route and authenticated, redirect to home
      if (isPublicRoute) {
        const home = new URL(role === 'captain' ? '/captain/home' : '/home', request.url);
        return NextResponse.redirect(home);
      }
      
      // If user is in an active ride, redirect to appropriate ride page
      if (isOnRide) {
        const currentPath = request.nextUrl.pathname;
        const isOnRidePage = currentPath.includes("/riding") || currentPath.includes("/ride");
        
        if (!isOnRidePage) {
          if (role === 'captain') {
            const rideUrl = new URL(`/captain/ride/${userData?.rideInfo?.rideId}`, request.url);
            return NextResponse.redirect(rideUrl);
          } else {
            const rideUrl = new URL(`/riding/${userData?.rideInfo?.rideId}`, request.url);
            return NextResponse.redirect(rideUrl);
          }
        }
      }
      
      // Prevent access to captain routes for non-captain users
      if (request.nextUrl.pathname.startsWith("/captain") && role !== 'captain') {
        const home = new URL('/home', request.url);
        return NextResponse.redirect(home);
      }
      
      // Allow the request to proceed
      return NextResponse.next();
      
    } catch (error) {
      console.error('Authentication error:', error);
      
      // Clear invalid token and redirect to login
      const response = NextResponse.redirect(new URL('/user/login', request.url));
      response.cookies.delete('cabtoken');
      return response;
    }
  }
  
  // Fallback - should not reach here in normal flow
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'], // Exclude static files, assets, and API routes
};