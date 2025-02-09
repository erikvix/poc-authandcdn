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

export default function JoinPage({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const user = useStore($user);
  const router = useRouter();

  const handleSignUp = async () => {};

  //   useEffect(() => {
  //     const verifyUserSession = async () => {
  //       const currentUser = await checkUserSession();

  //       if (currentUser) {
  //         console.log("Usuário autenticado:", currentUser);
  //         setUser(currentUser);
  //         router.push("/dashboard");
  //       }
  //     };
  //     verifyUserSession();
  //   }, [user, router]);

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
            <h1 className="text-xl font-bold">Create your account</h1>
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
        </div>
      </div>
    </div>
  );
}
