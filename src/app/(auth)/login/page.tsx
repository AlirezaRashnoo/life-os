"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Command } from "lucide-react";

import { loginUser } from "@/actions/auth";

export default function LoginPage() {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        await loginUser({
          email: formData.get("email") as string,
          password: formData.get("password") as string,
        });

        router.push("/dashboard");
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Invalid email or password",
        );
      }
    });
  }

  return (
    <div className="min-h-screen w-full bg-bg-canvas flex items-center justify-center px-4">
      <div className="w-full max-w-[400px]">
        <div className="flex items-center justify-center gap-1.5 mb-8">
          <div className="h-5 w-5 rounded-sm bg-primary-500 flex items-center justify-center">
            <Command className="h-3 w-3 text-text-inverse" />
          </div>

          <span className="text-caption font-medium tracking-wide text-text-tertiary uppercase">
            HomeOS
          </span>
        </div>

        <div className="bg-surface-1 border border-border rounded-lg p-8">
          <div className="mb-6">
            <h1 className="text-h1 text-text-primary">Welcome back</h1>

            <p className="text-body text-text-secondary mt-1">
              Sign in to your command center.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Field label="Email" htmlFor="email">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="alex@company.com"
                required
                disabled={isPending}
                className={inputClass}
              />
            </Field>

            <Field label="Password" htmlFor="password">
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Your password"
                  required
                  disabled={isPending}
                  className={`${inputClass} pr-9`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                >
                  {showPassword ? (
                    <EyeOff className="h-3.5 w-3.5" />
                  ) : (
                    <Eye className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
            </Field>

            {error && (
              <div className="rounded-md border-l-2 border-error-500 bg-error-bg px-3 py-2.5">
                <p className="text-body-sm text-error-500">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="
              mt-1 h-9 w-full rounded-md
              bg-primary-500 text-text-inverse
              font-medium
              flex items-center justify-center gap-2
              disabled:opacity-50
              "
            >
              {isPending ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>

        <p className="text-body-sm text-text-secondary text-center mt-5">
          Don't have an account?{" "}
          <Link href="/register" className="text-text-link hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="text-body-sm font-medium text-text-secondary"
      >
        {label}
      </label>

      {children}
    </div>
  );
}

const inputClass =
  "w-full h-9 px-3 rounded-md border border-border bg-surface-1 text-body text-text-primary " +
  "placeholder:text-text-tertiary outline-none transition-colors duration-150 " +
  "hover:border-border-strong focus:border-border-focus focus:ring-[3px] focus:ring-primary-100 " +
  "disabled:bg-bg-inset disabled:text-text-disabled";
