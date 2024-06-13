import {handleAuth, handleLogin, handleLogout } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

/**
 * this creates the following routes
 * 
 * - /api/auth/login
 * - /api/auth/logout
 * - /api/auth/callback
 * - api/auth/me
 */ 
export const GET = handleAuth({
    logout: handleLogout({returnTo: '/'})
});