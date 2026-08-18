    "use client";
    import { useState, FormEvent } from "react";
    import Cookies from "js-cookie";
import Link from "next/link";

    export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isPending, setIsPending] = useState(false);

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValidEmail = emailRegex.test(email);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (!isValidEmail) {
        setError("Please enter a valid email");
        return;
        }

        setIsPending(true);
        try {
        const res = await fetch(
            "https://solar-store.onrender.com/api/v1/auth/login",
            {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            }
        );
        const data = await res.json();

        if (res.ok && data.accessTokenJWT && data.refreshTokenJWT) {
            Cookies.set("RFTFL", data.refreshTokenJWT, { expires: 7 });
            Cookies.set("ACTFL", data.accessTokenJWT, { expires: 7 });
            window.location.href = "/";
            return;
        }

        setError(data.msg || "Unable to sign in. Please try again.");
        } catch {
        setError("Something went wrong. Check your connection and try again.");
        } finally {
        setIsPending(false);
        }
    };

    return (
        <div className="w-full">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-3xl bold-livvic text-black dark:text-white">
                Welcome back
            </h1>
            <p className="text-base med-livvic text-[#727272]">
                Sign in to your account to continue shopping.
            </p>
            </div>

            {error && (
            <div className="text-sm text-white bg-red-500 rounded-md px-4 py-3">
                {error}
            </div>
            )}

            <div className="grid gap-4">
            <label
                htmlFor="email"
                className="rounded-2xl bg-gray-100 border-2 border-transparent has-[input:focus]:border-orange-400 dark:has-[input:focus]:border-white/25 px-5 py-2.5 flex flex-col gap-1"
            >
                <span className="text-sm med-livvic text-gray-700">Enter your email</span>
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
                htmlFor="password"
                className="rounded-2xl bg-gray-100 outline-2 outline-white dark:bg-white/5 border-2 border-transparent has-[input:focus]:border-orange-400 dark:has-[input:focus]:border-white/25 px-5 py-2.5 flex flex-col gap-1"
            >
                <span className="text-sm med-livvic text-gray-700">Enter your password</span>
                <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full h-6 bg-transparent border-none outline-none text-base text-black dark:text-white"
                />
            </label>

            <button
                type="submit"
                disabled={!isValidEmail || password.length === 0 || isPending}
                className="w-full mt-2 px-6 py-2 med-livvic text-lg flex justify-center items-center rounded-xl text-white bg-gradient-to-b from-orange-400 to-orange-600  active:scale-[0.97]  disabled:opacity-40 disabled:cursor-not-allowed"
            >
                {isPending ? "Signing in…" : "Continue"}
            </button>
            </div>
        </form>
        <p className="text-center text-sm med-livvic text-[#727272] mt-6">
        Don't have an account?{" "}
        <Link
          href="/sign-up"
          className="font-medium text-black dark:text-white underline underline-offset-4"
        >
          Sign up
        </Link>
      </p>
        </div>
    );
    }