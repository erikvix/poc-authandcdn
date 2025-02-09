"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { $user, setUser } from "@/app/store/users";
import { useStore } from "@nanostores/react";
import { checkUserSession, loginWithProvider } from "@/app/actions/authAction";
import { useRouter } from "next/navigation";
import zanarkand from "@/public/zanarkand.png";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";

export default function JoinPage({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const user = useStore($user);
  const router = useRouter();

  const handleSignUp = async () => {};

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

  // useEffect(() => {
  //   const verifyUserSession = async () => {
  //     const currentUser = await checkUserSession();

  //     if (currentUser) {
  //       console.log("Usuário autenticado:", currentUser);
  //       setUser(currentUser);
  //       router.push("/dashboard");
  //     }
  //   };
  //   verifyUserSession();
  // }, [user, router]);

  return (
    <Card className="">
      <div>
        <CardHeader className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex items-center justify-center mb-2 rounded-md">
                <Image
                  className="w-28 px-6 py-4 rounded-md shadow-md h-22 border"
                  height={76}
                  width={76}
                  alt="Zanarkand"
                  src={zanarkand}
                />
              </div>
              <span className="sr-only">Zanarkand</span>
            </a>
            <CardTitle className="text-2xl font-semibold">
              Create your account
            </CardTitle>
            <CardDescription className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth" className="underline underline-offset-4">
                Sign in
              </Link>
            </CardDescription>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Repeat Password</Label>
              <Input id="repeat-password" type="password" required />
            </div>
            <Button className="w-full" onClick={handleSignUp}>
              Sign Up
            </Button>
          </div>
        </CardHeader>
        <div className="relative mx-6 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex mb-4 after:items-center after:border-t after:border-slate-200 dark:after:border-slate-800">
          <span className="relative z-10 bg-white px-2 text-slate-500 dark:bg-slate-950 dark:text-slate-400">
            Or
          </span>
        </div>
        <CardFooter className="grid gap-4 sm:grid-cols-2">
          <Button
            onClick={() => handleLogin("github")}
            variant="outline"
            className="w-full"
          >
            <Image
              height={20}
              width={20}
              alt="Github"
              src={
                "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
              }
            />
            Continue with Github
          </Button>
          <Button
            onClick={() => handleLogin("google")}
            variant="outline"
            className="w-full"
          >
            <Image
              height={20}
              width={20}
              alt="Google"
              src={
                "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"
              }
            />
            Continue with Google
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
