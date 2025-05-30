import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { Routes } from "@/constants/enums";
import { getActiveSession } from "./server/actions/auth";

const protectedPaths = [
  Routes.ADMIN,
  Routes.DASHBOARD,
  // Routes.PROFILE,
  Routes.SETTING,
  Routes.INSTRUCTOR,
  Routes.STUDENT,
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedPath = protectedPaths.some((p) =>
    path.startsWith(`/${p.toLowerCase()}`)
  );
  const jwtToken = request.cookies.get("jwt")?.value;
  const isAuthPage = path.startsWith(`/${Routes.AUTH.toLowerCase()}`);
  if (isProtectedPath && !jwtToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  if (path.startsWith(`/instructor`)) {
    const session = await getActiveSession();
    if (session?.role === "student") {
      return NextResponse.redirect(new URL("/student/dashboard", request.url));
    }
  }

  if (jwtToken && isAuthPage) {
    console.log("is auth page....");
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    "/student/:path*",
    "/auth/:path*",
    "/setting/:path*",
    "/instructor/:path*",
  ],
};
