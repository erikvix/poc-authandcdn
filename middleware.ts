import { NextResponse } from "next/server";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/lib/firebase";
import { checkUserSession } from "./app/actions/authAction";
import { setUser } from "./app/store/users";

export function middleware(request: Request) {
  const auth = getAuth(app);

  onAuthStateChanged(auth, (user) => {
    setUser(user);
    if (!user) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  });
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
