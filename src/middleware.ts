import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

// 需要保护的路由
const protectedRoutes = ['/dashboard', '/dashboard/products'];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // 检查当前路径是否是受保护的路由
  const isProtectedRoute = protectedRoutes.some(route => 
    path === route || path.startsWith(`${route}/`)
  );

  if (isProtectedRoute) {
    const token = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // 如果没有令牌，重定向到登录页面
    if (!token) {
      const url = new URL('/login', request.url);
      url.searchParams.set('callbackUrl', encodeURI(request.url));
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// 匹配的路由
export const config = {
  matcher: [
    '/dashboard/:path*',
  ],
}; 