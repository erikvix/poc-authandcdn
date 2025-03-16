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
import { Calendar } from "lucide-react";

// Tipos de treino disponíveis
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

type WorkoutDayCardProps = {
  dayNumber: number;
};

export default function WorkoutDayCard({ dayNumber }: WorkoutDayCardProps) {
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);
  const [exercises, setExercises] = useState<string[]>([]);

  const handleWorkoutChange = (value: string) => {
    setSelectedWorkout(value);
    setExercises(workoutTypes[value as keyof typeof workoutTypes] || []);
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

          {selectedWorkout && exercises.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Exercícios sugeridos:</h3>
              <ul className="text-sm space-y-1 list-disc pl-5">
                {exercises.map((exercise, index) => (
                  <li key={index}>{exercise}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
