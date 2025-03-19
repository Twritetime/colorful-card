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

  // 添加必要的headers
  const headers = new Headers(request.headers);
  
  // 对于API请求添加CORS headers
  if (path.startsWith('/api/')) {
    return NextResponse.next({
      headers: {
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,DELETE,PATCH,POST,PUT',
        'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
      },
    });
  }

  // 对于dashboard路由进行处理
  if (path.startsWith('/dashboard')) {
    // 这里可以添加认证逻辑
    return NextResponse.next();
  }

  return NextResponse.next();
}

// 匹配的路由
export const config = {
  matcher: [
    '/api/:path*',
    '/dashboard/:path*',
  ],
}; 