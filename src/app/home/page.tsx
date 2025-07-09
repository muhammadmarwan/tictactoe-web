"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProfile } from "../lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setEmail(data.email);
      } catch {
        setEmail("Unknown user");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; Max-Age=0; path=/;";
    router.replace("/login");
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 space-y-4 text-center">
          <h2 className="text-2xl font-semibold">Welcome {email}</h2>
          <Button className="w-full" onClick={() => router.push("/game")}>
            Start Game
          </Button>
          <Button
            className="w-full bg-cyan-500 hover:bg-cyan-600"
            onClick={() => router.push("/stats")}
          >
            View Stats
          </Button>
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
