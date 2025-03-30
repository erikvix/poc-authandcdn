import { app, db } from "@/lib/firebase";
import { WorkoutPlan } from "@/types";
import { FirebaseError } from "firebase/app";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function createUserWorkoutPlan(WorkoutPlan: WorkoutPlan) {
  const auth = getAuth(app);
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error(
        "Usuário não autenticado. Não é possível criar o plano de treino."
      );
    }

    const workoutCollection = doc(db, "workoutplan", user.uid);

    await setDoc(workoutCollection, {
      user: user.uid,
      workouts: WorkoutPlan,
    });
    console.log("Plano de treino criado com sucesso:", WorkoutPlan);
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error("Erro ao criar o plano de treino:", error.message);
      throw new Error(`Erro Firebase: ${error.message}`);
    }
    console.log(error);
    throw new Error("Erro inesperado ao criar o plano de treino.");
  }
}
