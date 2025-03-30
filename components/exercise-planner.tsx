"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dumbbell, Trash2 } from "lucide-react";
import WorkoutDayCard from "@/components/workout-day-card";

type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: number;
};

export default function ExercisePlanner() {
  const [daysPerWeek, setDaysPerWeek] = useState<number | null>(null);
  const [showDayCards, setShowDayCards] = useState<boolean>(false);
  const [createPlan, setCreatePlan] = useState<boolean>(false);
  const [exercise, SetExercises] = useState<Exercise[]>([]);

  const handleDaysChange = (value: string) => {
    setDaysPerWeek(Number.parseInt(value));
  };

  const handleCreatePlan = () => {
    if (daysPerWeek) {
      setShowDayCards(true);
    }
  };

  const handleSubmitPlan = () => {
    console.log(exercise);
  };

  const removeExercise = (id: string) => {
    SetExercises((prevExercises) =>
      prevExercises.filter((exercise) => exercise.id !== id)
    );
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Crie Seu Plano de Treino
      </h1>

      <Card className="max-w-md mx-auto mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dumbbell className="h-5 w-5" />
            Configure seu treino
          </CardTitle>
          <CardDescription>
            Escolha quantos dias por semana você deseja treinar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="days-select" className="text-sm font-medium">
                Dias de treino por semana
              </label>
              <Select onValueChange={handleDaysChange}>
                <SelectTrigger id="days-select">
                  <SelectValue placeholder="Selecione os dias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 dias</SelectItem>
                  <SelectItem value="4">4 dias</SelectItem>
                  <SelectItem value="5">5 dias</SelectItem>
                  <SelectItem value="6">6 dias</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleCreatePlan}
              className="w-full"
              disabled={!daysPerWeek}
            >
              Criar Plano de Treino
            </Button>
          </div>
        </CardContent>
      </Card>

      {showDayCards && daysPerWeek && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center">
            Seu Plano de Treino de {daysPerWeek} Dias
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: daysPerWeek }).map((_, index) => (
              <WorkoutDayCard
                key={index}
                exercises={exercise}
                setExercises={SetExercises}
                dayNumber={index + 1}
              />
            ))}
          </div>
          <div className="mt-6">
            <Button
              onClick={handleSubmitPlan}
              className="w-full"
              disabled={!daysPerWeek}
            >
              Criar Plano de Treino
            </Button>
          </div>
          <div className="mt-6">
            {exercise.map((exercise) => (
              <div
                key={exercise.id}
                className="flex items-center justify-between bg-muted p-2 rounded-md"
              >
                <div>
                  <p className="font-medium">{exercise.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {exercise.sets} séries x {exercise.reps} repetições
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeExercise(exercise.id)}
                  className="h-7 w-7"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
