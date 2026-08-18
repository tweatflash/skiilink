import { NextRequest, NextResponse } from "next/server";
export  async function middleware(req: NextRequest) {
  let protectedRoutes= ["/administration_dashboard"]
  let protcttedRoutesIfLoggedIn=["/sign-in","/sign-up"]
  const refreshToken=req.cookies.getAll("RFTFL")
  const accessToken=req.cookies.getAll("ACTFL")
  if (!refreshToken.length && protectedRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
  if (refreshToken.length && protcttedRoutesIfLoggedIn.includes(req.nextUrl.pathname)){
    return NextResponse.redirect(new URL("/products", req.url));
  }
  

}
