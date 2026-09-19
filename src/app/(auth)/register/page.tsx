"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";

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

        router.push("/dashboard");
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "مشکلی پیش آمد. لطفاً دوباره تلاش کنید.",
        );
      }
    });
  }

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-background
        px-4
      "
    >
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="mb-6 text-center">
          <span
            className="
              text-caption
              font-medium
              tracking-wide
              text-muted-foreground
            "
          >
            LifeOS
          </span>
        </div>

        {/* Card */}
        <div
          className="
            bg-card
            border
            border-border
            rounded-lg
            p-8
          "
        >
          <div className="mb-6">
            <h1 className="text-h1 text-foreground">ساخت حساب کاربری</h1>

            <p className="text-body text-muted-foreground mt-1">
              مرکز مدیریت شخصی خود را راه‌اندازی کنید.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            noValidate
          >
            <Field label="نام" htmlFor="name">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="نام و نام خانوادگی"
                required
                disabled={isPending}
                className={inputClass}
              />
            </Field>

            <Field label="ایمیل" htmlFor="email">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="example@email.com"
                required
                disabled={isPending}
                className={inputClass}
              />
            </Field>

            <Field label="رمز عبور" htmlFor="password">
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="حداقل ۸ کاراکتر"
                  required
                  minLength={8}
                  disabled={isPending}
                  className={`${inputClass} pl-9`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  tabIndex={-1}
                  className="
                    absolute
                    left-1
                    top-1/2
                    -translate-y-1/2
                    h-7
                    w-7
                    flex
                    items-center
                    justify-center
                    text-muted-foreground
                    hover:text-foreground
                  "
                  aria-label="نمایش رمز عبور"
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
              <div
                className="
                  rounded-md
                  border-r-2
                  border-destructive
                  bg-destructive/10
                  px-3
                  py-2.5
                "
              >
                <p className="text-body-sm text-destructive">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="
                mt-1
                h-9
                w-full
                rounded-md
                bg-primary
                text-primary-foreground
                font-medium
                flex
                items-center
                justify-center
                gap-2
                transition
                hover:opacity-90
                disabled:opacity-50
              "
            >
              {isPending ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  در حال ساخت حساب...
                </>
              ) : (
                "ساخت حساب"
              )}
            </button>
          </form>
        </div>

        <p className="text-body-sm text-muted-foreground text-center mt-5">
          قبلاً حساب ساخته‌اید؟{" "}
          <Link
            href="/login"
            className="
              text-primary
              hover:underline
            "
          >
            ورود به حساب
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
    <div className="space-y-1.5">
      <label
        htmlFor={htmlFor}
        className="
          text-body-sm
          text-foreground
          font-medium
        "
      >
        {label}
      </label>

      {children}
    </div>
  );
}

const inputClass =
  "w-full h-9 px-3 rounded-md border border-border bg-card text-body text-foreground " +
  "placeholder:text-muted-foreground outline-none transition-colors duration-150 " +
  "hover:border-border focus:border-ring focus:ring-[3px] focus:ring-primary/10 " +
  "disabled:bg-muted disabled:text-muted-foreground";
