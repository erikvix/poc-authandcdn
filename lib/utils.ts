import { clsx, type ClassValue } from "clsx";
import { env } from "process";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: `${env.NEXT_PUBLIC_WEB_URL}/dashboard`,
  handleCodeInApp: true,
  dynamicLinkDomain: "example.page.link",
};
