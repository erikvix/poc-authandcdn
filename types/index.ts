export type Exercise = {
  name: string;
  sets: number;
  reps: number;
};

export type WorkoutPlan = {
  [dayOfWeek: string]: Exercise[];
};
