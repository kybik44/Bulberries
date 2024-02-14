import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const authToken = 'next-auth.session-token';

    if (request.cookies.get(authToken)) {
        if (!pathname.startsWith('/signin') && !pathname.startsWith('/signup')) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL('/home', request.url));
        }
    } else {
        const secureRoutes = ['/home', '/addProduct', '/dashboard'];

        const isSecureRoute = secureRoutes.some((route) =>
            pathname.startsWith(route)
        );
        if (isSecureRoute) {
            return NextResponse.redirect(new URL('/signin', request.url));
        } else {
            return NextResponse.next();
        }
    }
}
