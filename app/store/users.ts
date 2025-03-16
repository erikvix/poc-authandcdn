import { User } from "firebase/auth";
import { atom } from "nanostores";

export const $user = atom<User | null>(null);

export function setUser(user: User | null) {
  $user.set(user);
}

export const $streak = atom<Number>(3);
