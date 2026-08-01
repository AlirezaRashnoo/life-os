"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2, Command } from "lucide-react";
import { registerUser } from "@/actions/auth";

export default function RegisterPage() {
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
        await registerUser({
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          password: formData.get("password") as string,
        });
        // router.push("/");
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.",
        );
      }
    });
  }

  return (
    <div className="min-h-screen w-full bg-bg-canvas flex items-center justify-center px-4">
      <div className="w-full max-w-[400px]">
        {/* Wordmark — quiet, no marketing flourish */}
        <div className="flex items-center justify-center gap-1.5 mb-8">
          <div className="h-5 w-5 rounded-sm bg-primary-500 flex items-center justify-center">
            <Command className="h-3 w-3 text-text-inverse" strokeWidth={2.5} />
          </div>
          <span className="text-caption font-medium tracking-wide text-text-tertiary uppercase">
            HomeOS
          </span>
        </div>

        {/* Card */}
        <div className="bg-surface-1 border border-border rounded-lg p-8">
          <div className="mb-6">
            <h1 className="text-h1 text-text-primary">Create your account</h1>
            <p className="text-body text-text-secondary mt-1">
              Set up your personal command center.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            noValidate
          >
            <Field label="Name" htmlFor="name">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Alex Carter"
                required
                disabled={isPending}
                className={inputClass}
              />
            </Field>

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
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  required
                  minLength={8}
                  disabled={isPending}
                  className={`${inputClass} pr-9`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 flex items-center justify-center rounded-sm text-text-tertiary hover:bg-surface-hover hover:text-text-secondary transition-colors duration-150"
                  aria-label={showPassword ? "Hide password" : "Show password"}
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
              <div className="flex items-start gap-2 rounded-md border-l-2 border-error-500 bg-error-bg px-3 py-2.5">
                <p className="text-body-sm text-error-500">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="mt-1 h-9 w-full rounded-md bg-primary-500 text-body text-text-inverse font-medium
                         hover:bg-primary-600 active:scale-[0.98]
                         disabled:opacity-50 disabled:pointer-events-none
                         transition-all duration-100
                         flex items-center justify-center gap-2
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Creating account…
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>
        </div>

        <p className="text-body-sm text-text-secondary text-center mt-5">
          Already have an account?{" "}
          <Link href="/login" className="text-text-link hover:underline">
            Sign in
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
