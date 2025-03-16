"use client";

import { $streak } from "@/app/store/users";
import { useStore } from "@nanostores/react";
import React from "react";
import { FaFire } from "react-icons/fa6";

export default function Streak() {
  const streak = useStore($streak);
  return (
    <div className="flex text-lg items-center gap-2 p-2">
      <FaFire className="text-orange-600" />
      <h1>{streak.toLocaleString()}</h1>
      <h2> days streak!</h2>
    </div>
  );
}
