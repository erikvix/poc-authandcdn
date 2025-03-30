"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, Plus, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid"; // Install uuid library if not already installed

const workoutTypes = {
  peito: [
    "Supino reto",
    "Supino inclinado",
    "Crucifixo",
    "Crossover",
    "Flexão de braço",
  ],
  costas: [
    "Puxada frontal",
    "Remada curvada",
    "Pulldown",
    "Remada baixa",
    "Barra fixa",
  ],
  pernas: [
    "Agachamento",
    "Leg press",
    "Cadeira extensora",
    "Mesa flexora",
    "Panturrilha",
  ],
  ombros: [
    "Desenvolvimento",
    "Elevação lateral",
    "Elevação frontal",
    "Face pull",
    "Encolhimento",
  ],
  bracos: [
    "Rosca direta",
    "Rosca alternada",
    "Tríceps corda",
    "Tríceps francês",
    "Rosca martelo",
  ],
  abdomen: [
    "Abdominal reto",
    "Prancha",
    "Abdominal infra",
    "Russian twist",
    "Elevação de pernas",
  ],
  descanso: ["Dia de descanso"],
};

type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: number;
};

type WorkoutCardProps = {
  dayNumber: number;
  exercises: Exercise[];
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
};

export default function WorkoutCard({
  dayNumber,
  exercises,
  setExercises,
}: WorkoutCardProps) {
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);
  const [suggestedExercises, setSuggestedExercises] = useState<string[]>([]);

  const [newExercise, setNewExercise] = useState("");
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(12);

  const handleWorkoutChange = (value: string) => {
    setSelectedWorkout(value);
    setSuggestedExercises(
      workoutTypes[value as keyof typeof workoutTypes] || []
    );
  };

  const handleExerciseSelect = (exercise: string) => {
    setNewExercise(exercise);
  };

  const addExercise = () => {
    if (newExercise.trim()) {
      setExercises([
        ...exercises,
        { id: uuidv4(), name: newExercise, sets, reps },
      ]);
      setNewExercise("");
    }
  };

  const removeExercise = (id: string) => {
    const updatedExercises = exercises.filter((exercise) => exercise.id !== id);
    setExercises(updatedExercises);
  };

  const weekdays = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo",
  ];
  const dayName = weekdays[(dayNumber - 1) % 7];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Dia {dayNumber} - {dayName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor={`workout-day-${dayNumber}`}
              className="text-sm font-medium"
            >
              Tipo de treino
            </label>
            <Select onValueChange={handleWorkoutChange}>
              <SelectTrigger id={`workout-day-${dayNumber}`}>
                <SelectValue placeholder="Selecione o treino" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="peito">Peito</SelectItem>
                <SelectItem value="costas">Costas</SelectItem>
                <SelectItem value="pernas">Pernas</SelectItem>
                <SelectItem value="ombros">Ombros</SelectItem>
                <SelectItem value="bracos">Braços</SelectItem>
                <SelectItem value="abdomen">Abdômen</SelectItem>
                <SelectItem value="descanso">Descanso</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedWorkout && suggestedExercises.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Exercícios sugeridos:</h3>
              <div className="flex flex-wrap gap-1">
                {suggestedExercises.map((exercise, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleExerciseSelect(exercise)}
                    className="text-xs"
                  >
                    {exercise}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3 pt-2 border-t">
            <h3 className="text-sm font-medium">Adicionar exercício:</h3>

            <div className="grid grid-cols-1 gap-2">
              <Input
                placeholder="Nome do exercício"
                value={newExercise}
                onChange={(e) => setNewExercise(e.target.value)}
              />

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label
                    htmlFor={`sets-${dayNumber}`}
                    className="text-xs font-medium"
                  >
                    Séries
                  </label>
                  <Input
                    id={`sets-${dayNumber}`}
                    type="number"
                    min={1}
                    value={sets}
                    onChange={(e) => setSets(Number.parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <label
                    htmlFor={`reps-${dayNumber}`}
                    className="text-xs font-medium"
                  >
                    Repetições
                  </label>
                  <Input
                    id={`reps-${dayNumber}`}
                    type="number"
                    min={1}
                    value={reps}
                    onChange={(e) => setReps(Number.parseInt(e.target.value))}
                  />
                </div>
              </div>

              <Button
                onClick={addExercise}
                disabled={!newExercise.trim()}
                className="w-full"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-1" /> Adicionar Exercício
              </Button>
            </div>
          </div>

          {exercises.length > 0 && (
            <div className="space-y-2 pt-2 border-t">
              <h3 className="text-sm font-medium">Exercícios do dia:</h3>
              <div className="space-y-2">
                {exercises.map((exercise) => (
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
      </CardContent>
    </Card>
  );
}
