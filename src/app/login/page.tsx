"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { loginUser } from "../lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token);
      router.replace("/home");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-center">Login</h2>

          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button className="w-full" onClick={handleLogin}>
            Login
          </Button>

          <p
            className="text-sm text-blue-600 underline text-center cursor-pointer"
            onClick={() => router.push("/register")}
          >
            Create new account
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
