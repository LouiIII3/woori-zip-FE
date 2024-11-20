import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

// 라우트가 수행되기 전에 호출되는 곳
// ex. lh:3-/login, lh:3-/dashboard라든지, 요청했을 때, 
export default async function middleware(req) {

  const session = await auth();

  const accessToken = session?.user?.accessToken;

  if (isProtectedRoute && !accessToken ) {
    return NextResponse.redirect(new URL("/user/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/user/authtest']
}

