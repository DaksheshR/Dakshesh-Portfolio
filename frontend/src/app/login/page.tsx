/**
 * Admin Login page.
 */

"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login({ email, password });
      router.push("/admin");
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-light dark:bg-surface-dark p-4">
      {/* Background */}
      <div className="absolute inset-0 -z-10 dot-pattern opacity-50" />

      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="text-lg font-semibold tracking-tight text-text-primary-light dark:text-text-primary-dark">
            Dakshesh<span className="text-primary-500">.</span>
          </Link>
          <h1 className="text-xl font-semibold mt-6 text-text-primary-light dark:text-text-primary-dark tracking-tight">
            Admin Login
          </h1>
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1.5">
            Sign in to manage your portfolio content
          </p>
        </div>

        <div className="bg-white dark:bg-surface-card-dark rounded-xl border border-border-light dark:border-border-dark p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-600 dark:text-red-400 font-medium animate-fade-in">
                {error}
              </div>
            )}

            <Input
              id="login-email"
              label="Email Address"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              id="login-password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              size="lg"
              isLoading={isLoading}
              className="w-full"
            >
              Sign In
            </Button>
          </form>
        </div>

        <p className="text-center mt-6 text-xs text-text-muted-light dark:text-text-muted-dark">
          <Link
            href="/"
            className="text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark transition-colors font-medium"
          >
            ← Back to portfolio
          </Link>
        </p>
      </div>
    </div>
  );
}
