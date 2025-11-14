"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState, FormEvent } from "react";
import Signup03 from "./signup03";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { OTPVerification } from "./signup02";
export default function Signup01() {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const [next, setNext] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(emailRegex.test(email));
  const [name, setName] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [invalid, setInvalid] = useState(true);
  const router = useRouter();
  const [dob, setDob] = useState("");
  useEffect(() => {
    setValidEmail(emailRegex.test(email));;
  }, [email]);
  const [password, setPassword] = useState("");
  const [showPassword,setShowPassword]=useState(false)
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNext(true);
  };
  const handlePrevious=()=>{
    setNext(false);
  }
  return (
    <>
      {!next ? (
        <div className="flex flex-1 items-center justify-center dark:text-white text-black">
          <div className="w-full max-w-[480px]">
            <form className="flex flex-col gap-6" method="POST" onSubmit={handleLogin}>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-[22px] mobile:text-[26px] w-full text-black dark:text-white">
                  Welcome to Skiilink Ventures
                </h1>
                <p className="text-muted-foreground text-sm mobile:text-[16px] text-balance text-[#727272]">
                  Type your e-mail and password to log in to your Jumia account.
                </p>
              </div>
              <div className="grid gap-6">
                <label
                  htmlFor="sign-in-name"
                  className="rounded-xl transition-all bg-gray-200 dark:bg-white/5 border-2 border-transparent dark:has-[input:focus]:border-white/25 has-[input:focus]:border-black/25 px-[20px] py-[10px] flex flex-col gap-1"
                >
                  <p className="text-[12px] text-gray-900">Name</p>
                  <input
                    type="name"
                    id="sign-in-name"
                    name="text"
                    value={name}
                    className="w-full h-6 bg-transparent border-none outline-none text-sm dark:text-white text-black"
                    onChange ={(e)=> setName(e.target.value)}
                    placeholder="John doe"
                    aria-describedby="uidnote"
                    autoComplete="on"
                  />
                </label>
                <label
                  htmlFor="sign-in-email"
                  className={`rounded-xl transition-all bg-gray-200 dark:bg-white/5 border-2 border-transparent dark:has-[input:focus]:border-white/25 px-[20px] py-[10px] flex flex-col gap-1 ${!validEmail ? "has-[input:focus]:border-red-500 border-red-500" :"has-[input:focus]:border-black/25"}`}
                >
                  <p className="text-[12px] text-gray-900">Email</p>
                  <input
                    type="email"
                    id="sign-in-email"
                    name="email"
                    value={email}
                    className="w-full h-6 bg-transparent border-none outline-none text-sm dark:text-white text-black"
                    onChange ={(e)=> setEmail(e.target.value)}
                    placeholder="example@gmail.co"
                    aria-describedby="uidnote"
                    autoComplete="on"
                  />
                </label>
                <label
                  htmlFor="datepicker-autohide"
                  className="relative rounded-xl border-2 transition-all bg-gray-200 border-transparent  has-[input:focus]:border-black/25 px-[20px] py-[10px] pb-5 flex flex-col gap-1"
                >
                  <div className="flex justify-between text-[12px] dark:text-white w-full">
                    <p className="text-gray-900">Date of birth</p>
                    {/* <Link href={""}>Forgot password</Link> */}
                  </div>
                  <div className="relative w-full mt-2.5">
                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                      </svg>
                    </div>
                    <input
                      id="datepicker-autohide"
                      required
                      onChange={(e) => setDob(e.target.value)}
                      datepicker-autohide=""
                      value={dob}
                      type="date"
                      className="outline-none bg-transparent text-gray-900 text-sm rounded-lg block w-full ps-7 p-2.5  dark:placeholder-gray-400 dark:text-white "
                      placeholder="Select date"
                    />
                  </div>
                </label>

                <label
                  htmlFor="sign-in-password"
                  className="relative rounded-xl border-2 transition-all bg-gray-200 dark:bg-white/5 border-transparent dark:has-[input:focus]:border-white/25 has-[input:focus]:border-black/25  px-[20px] py-[10px] flex flex-col gap-1"
                >
                  <div className="flex justify-between text-[12px] dark:text-white w-full">
                    <p className="text-gray-900">Password</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="sign-in-password"
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                      name="password"
                      placeholder="**********"
                      className="w-full h-6 bg-transparent border-none outline-none text-sm text-black dark:text-white"
                      aria-describedby="uidnote"
                      autoComplete="on"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                      aria-label={true ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <Eye className="w-5 h-5" />
                      ) : (
                        <EyeOff className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </label>

                <button
                  data-slot="button"
                  className={`w-full px-6 mt-3 py-2 ${
                    name && email && dob && password? ""
                      : "opacity-40 pointer-events-none cursor-not-allowed"
                     
                  } flex justify-center bg-black text-white rounded-lg outline-none dark:bg-[#E5E5E5] dark:text-black`}
                  disabled={ name && email && dob && password ? false : true}
                  type="submit"
                >
                  Continue
                </button>
              </div>
            </form>

            <div className="text-center text-sm mt-6">
              Already have an account?
              <Link href="/sign-in" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <OTPVerification
            contact={email}
            onBack={handlePrevious}
        />
      )}
    </>
  );
}
