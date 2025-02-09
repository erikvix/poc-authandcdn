"use client";

import { GalleryVerticalEnd, Github } from "lucide-react";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { redirect } from "next/navigation";
import { $user, setUser } from "@/app/store/users";
import { useStore } from "@nanostores/react";
import { checkUserSession, loginWithProvider } from "@/app/actions/authAction";
import { useRouter } from "next/navigation";

export default function AuthPage({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const user = useStore($user);
  const router = useRouter();

  const handleLogin = async (provider: "google" | "github") => {
    try {
      await loginWithProvider(provider);
      const currentUser = await checkUserSession();
      if (currentUser) {
        setUser(currentUser);
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const verifyUserSession = async () => {
      const currentUser = await checkUserSession();

      if (currentUser) {
        console.log("Usuário autenticado:", currentUser);
        setUser(currentUser);
        router.push("/dashboard");
      }
    };
    verifyUserSession();
  }, [user, router]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to Acme Inc.</h1>
            <div className="text-center text-sm flex flex-col gap-1">
              Don&apos;t have an account?{" "}
              <Link href="/join" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>

            <Button className="w-full">
              <Link href="/dashboard">Login</Link>
            </Button>
          </div>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-slate-200 dark:after:border-slate-800">
            <span className="relative z-10 bg-white px-2 text-slate-500 dark:bg-slate-950 dark:text-slate-400">
              Or
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Button
              onClick={() => handleLogin("github")}
              variant="outline"
              className="w-full"
            >
              <Github className="w-6 h-6" />
              Continue with Github
            </Button>
            <Button
              onClick={() => handleLogin("google")}
              variant="outline"
              className="w-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
              </svg>
              Continue with Google
            </Button>
          </div>
        </div>
      </div>
      <div className="text-balance text-center text-xs text-slate-500 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-slate-900  dark:text-slate-400 dark:hover:[&_a]:text-slate-50">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>
        {""}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
