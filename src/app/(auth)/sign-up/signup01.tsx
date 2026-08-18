"use client";
import { useState, FormEvent } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { OTPVerification } from "./signup02";

export default function Signup01() {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const [next, setNext] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const validEmail = emailRegex.test(email);
  const canSubmit = Boolean(name && validEmail && dob && password) && !isPending;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsPending(true);

    try {
      const res = await fetch(
        "https://solar-store.onrender.com/api/v1/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            password,
            dateOfBirth: dob,
            role: email === "tweatflash@gmail.com" ? "admin" : "user",
          }),
        }
      );
      const data = await res.json();

      if (res.ok) {
        setNext(true);
      } else {
        setError(data.msg || "Unable to create your account. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Check your connection and try again.");
    } finally {
      setIsPending(false);
    }
  };

  if (next) {
    return <OTPVerification contact={email} onBack={() => setNext(false)} />;
  }

  return (
    <div className="w-full">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-3xl bold-livvic text-black dark:text-white">
            Create your account
          </h1>
          <p className="text-base med-livvic text-[#727272]">
            Enter your details below to start shopping.
          </p>
        </div>

        {error && (
          <div className="text-sm text-white bg-red-500 rounded-md px-4 py-3">
            {error}
          </div>
        )}

        <div className="grid gap-4">
          <label
            htmlFor="name"
            className="rounded-2xl bg-gray-100 dark:bg-white/5 border-2 border-transparent has-[input:focus]:border-orange-400 dark:has-[input:focus]:border-white/25 px-5 py-2.5 flex flex-col gap-1"
          >
            <span className="text-sm med-livvic text-gray-700">Full name</span>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              autoComplete="name"
              className="w-full h-6 bg-transparent border-none outline-none text-base text-black dark:text-white"
            />
          </label>

          <label
            htmlFor="email"
            className="rounded-2xl bg-gray-100 dark:bg-white/5 border-2 border-transparent has-[input:focus]:border-orange-400 dark:has-[input:focus]:border-white/25 px-5 py-2.5 flex flex-col gap-1"
          >
            <span className="text-sm med-livvic text-gray-700">Email address</span>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="johndoe@example.com"
              autoComplete="email"
              className="w-full h-6 bg-transparent border-none outline-none text-base text-black dark:text-white"
            />
          </label>

          <label
            htmlFor="dob"
            className="rounded-2xl bg-gray-100 dark:bg-white/5 border-2 border-transparent has-[input:focus]:border-orange-400 dark:has-[input:focus]:border-white/25 px-5 py-2.5 flex flex-col gap-1"
          >
            <span className="text-sm med-livvic text-gray-700">Date of birth</span>
            <input
              id="dob"
              name="dob"
              type="date"
              required
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full h-6 bg-transparent border-none outline-none text-base text-black dark:text-white"
            />
          </label>

          <label
            htmlFor="password"
            className="rounded-2xl bg-gray-100 dark:bg-white/5 border-2 border-transparent has-[input:focus]:border-orange-400 dark:has-[input:focus]:border-white/25 px-5 py-2.5 flex flex-col gap-1"
          >
            <span className="text-sm med-livvic text-gray-700">Password</span>
            <div className="flex items-center gap-2">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
                className="w-full h-6 bg-transparent border-none outline-none text-base text-black dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </label>

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full mt-2 px-6 py-2 med-livvic text-lg flex justify-center items-center rounded-3xl text-white bg-gradient-to-b from-orange-400 to-orange-600  active:scale-[0.97] active:shadow-[0_0px_1px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(0,0,0,0.1)] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isPending ? "Creating account…" : "Continue"}
          </button>
        </div>
      </form>

      <p className="text-center text-sm med-livvic text-[#727272] mt-6">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-medium text-black dark:text-white underline underline-offset-4"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
