import { useMemo } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  signInWithRedirect,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "@/lib/firebase";
import { redirect } from "next/navigation";
import { useStore } from "@nanostores/react";
import { $user, setUser } from "@/app/store/users";

const useAuth = () => {
  const user = useStore($user);

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const isAuthenticated = useMemo(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Usuário autenticado:", user);
      } else {
        console.log("Nenhum usuário autenticado.");
      }
    });
  }, [user]);

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setUser(user);
    } catch (error: any) {
      // setError(error.message);
    }
    // } finally {
    //   setLoading(false);
    // }
    if (user) {
      redirect("/dashboard");
    }
  };

  const loginWithGithub = async () => {
    try {
      await signInWithRedirect(auth, githubProvider);
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    // setLoading(true);
    // setError(null);
    alert("Logging out...");
    try {
      await signOut(auth);
      setUser(null);
      redirect("/");
    } catch (error: any) {
      // setError(error.message);
    }
    // } finally {
    //   setLoading(false);
    // }
  };

  return {
    user,
    loginWithGoogle,
    loginWithGithub,
    logout,
    isAuthenticated,
  };
};

export default useAuth;
