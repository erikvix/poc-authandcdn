import React from "react";
import { Card, CardHeader } from "./ui/card";

interface TrainingCardProps {
  TrainingTitle: string;
}

export default function TrainingCard({ TrainingTitle }: TrainingCardProps) {
  return (
    <Card className="bg-foreground text-background bg-card">
      <CardHeader>
        <h2>{TrainingTitle}</h2>
      </CardHeader>
    </Card>
  );
}
