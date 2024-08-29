import { auth } from "@/auth"
import { NextRequest, NextResponse } from "next/server"
import { authRoutes } from "./routes";

export default auth((req)=>{
    const nextUrl = new URL(req.nextUrl);
    const isLoggedIn = !!req.auth;
    const publicRoute = "/"
    const apiAuthPrefix = "/api/auth"
    const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    if(isApiRoute) return ;
    if(!isLoggedIn){
        if(!isAuthRoute) return NextResponse.redirect(new URL("/auth/login", nextUrl))
    }
    
    if(isLoggedIn){
        if(isAuthRoute) return NextResponse.redirect(new URL("/", nextUrl))
    }
    return ;
})

export const config = {
    matcher:['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}