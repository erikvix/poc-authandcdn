import { useMemo, useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
} from "firebase/auth";
import { app } from "@/lib/firebase";
import { redirect } from "next/navigation";
import { useStore } from "@nanostores/react";
import { $user, setUser } from "@/app/store/users";

const useGoogleAuth = () => {
  const user = useStore($user);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const isAuthenticated = useMemo(() => !!user, [user]);

  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
    if (user) {
      redirect("/dashboard");
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    alert("Logging out...");
    try {
      await signOut(auth);
      setUser(null);
      redirect("/");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const isLoggedIn = async () => {
    return !!user;
  };

  return {
    user,
    error,
    loading,
    loginWithGoogle,
    logout,
    isAuthenticated,
  };
};

export default useGoogleAuth;
