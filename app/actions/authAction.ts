import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  setPersistence,
  User,
  browserLocalPersistence,
} from "firebase/auth";
import { app } from "@/lib/firebase";
import { FirebaseError } from "firebase/app";
import { redirect } from "next/navigation";
import { setUser } from "../store/users";
import { useRouter } from "next/router";

export async function loginWithProvider(providerName: "google" | "github") {
  const auth = getAuth(app);
  const providers = {
    google: new GoogleAuthProvider(),
    github: new GithubAuthProvider(),
  };

  const provider = providers[providerName];

  try {
    await setPersistence(auth, browserLocalPersistence);

    const result = await signInWithPopup(auth, provider);

    setUser(result.user);
    console.log("Usuário autenticado:", result.user);
    const router = useRouter();
    router.push("/dashboard");
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error("Erro ao autenticar com o provedor:", error.message);
      throw new Error(`Erro Firebase: ${error.message}`);
    }
    throw new Error("Erro inesperado ao autenticar com o provedor.");
  }
}

export async function logoutUser() {
  const auth = getAuth(app);

  try {
    await signOut(auth);
    setUser(null);
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error("Error no logout:", error.message);
      throw new Error(`Erro Firebase: ${error.message}`);
    }
    console.log(error);
    throw new Error("Erro inesperado ao deslogar o usuário.");
  }
}

export async function checkUserSession(): Promise<User | null> {
  const auth = getAuth(app);

  return new Promise((resolve, reject) => {
    try {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("Usuário autenticado:", user);
          resolve(user);
          setUser(user);
        } else {
          console.log("Nenhum usuário autenticado.");
          redirect("/auth");
        }
      });
    } catch (error) {
      console.error("Erro ao verificar a sessão do usuário:", error);
      reject(error);
    }
  });
}
