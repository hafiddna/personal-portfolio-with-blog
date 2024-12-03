import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyIdToken } from "@/lib/firebase";

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("token");

    // If no token, redirect to login
    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        // Verify token with Firebase Admin SDK
        await verifyIdToken(token);
        return NextResponse.next(); // Continue to the requested page
    } catch (error) {
        console.error("Token verification failed:", error);
        // Redirect to login if token is invalid
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

// Define routes to protect
export const config = {
    matcher: ["/cms/:path*"], // Protect all routes under `/app/`
};
