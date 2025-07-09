"use client";

import { useEffect, useState } from "react";
import { getMyStats } from "../lib/api";
import { Card, CardContent } from "@/components/ui/card";

export default function StatsPage() {
  const [stats, setStats] = useState<{ wins: number; losses: number; draws: number } | null>(null);

  useEffect(() => {
    getMyStats().then(setStats);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 space-y-4 text-center">
          <h2 className="text-2xl font-semibold">Your Game Stats</h2>
          <p>Wins: {stats?.wins ?? 0}</p>
          <p>Losses: {stats?.losses ?? 0}</p>
          <p>Draws: {stats?.draws ?? 0}</p>
        </CardContent>
      </Card>
    </div>
  );
}
