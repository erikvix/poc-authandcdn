import CalendarContainer from "@/components/CalendarContainer";
import Streak from "@/components/Streak";
import TrainingCard from "@/components/TrainingCard";
import React from "react";

export default function Week() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="border rounded-lg p-2">
        <TrainingCard TrainingTitle="Peito X Triceps" />
      </div>
      <div className="border rounded-lg p-2 space-y-2 ">
        <Streak />
        <CalendarContainer />
      </div>
    </div>
  );
}
