"use client";

import React, { useState } from "react";
import { Calendar } from "./ui/calendar";

export default function CalendarContainer() {
  const initialDates = [
    new Date("2025-03-01"),
    new Date("2025-03-02"),
    new Date("2025-03-03"),
  ];

  const [date, setDate] = React.useState<Date[] | undefined>(initialDates);

  return (
    <Calendar
      mode="multiple"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  );
}
