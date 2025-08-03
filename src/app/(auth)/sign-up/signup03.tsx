"use client";
import React, { useState, FormEvent, useContext, useEffect } from "react";
import Signup04 from "./signup04";
import { ThemeContext } from "app/contexts/ThemeContext";
import { OTPVerification } from "./signup02";

export default function Signup03({
  name,
  email,
  next,
  setNext,
  dob,
  setDob,
  password ,
  setPassword
}: {
  name: string;
  email: string;
  next:boolean
  setNext:any
  dob:any
  setDob:any
  password:string 
  setPassword:any
}) {
  const [open, setopen] = useState(false);
  useEffect(() => {
    console.log(dob);
  }, [dob]);
  const [next2,setNext2]=useState(false)
  const [isPending, setIsPending] = useState(false);
  const { setAuthError } = useContext<any>(ThemeContext);
   const [otpType, setOtpType] = useState<'email' | 'phone'>('email');
   const [otpContact, setOtpContact] = useState('user@tweatflash.com');
   const [showOTP, setShowOTP] = useState(true);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
   
    
    try {
      const request = await fetch(
        "https://solar-store.onrender.com/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            dateOfBirth: dob,
            role: email === "tweatflash@gmail.com" ? "admin" : "user",
          }),
        }
      );
      const response = await request.json();

      setIsPending(false);
      setNext2(true)
      console.log(response)
    } catch (error) {
      setIsPending(false);
      setAuthError({
        show: true,
        error: "An Unexpected error occured possibly your network ",
      });
      console.log(error);
    }
  };
  return (
    <>
      {!next2? (
        <div className="flex flex-1 items-center justify-center text-[--color]">
          <div className="w-full max-w-[480px]">
            <form
              className="flex flex-col gap-6"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-[22px] mobile:text-[26px] w-full text-black dark:text-white">
                  Almost done{" "}
                </h1>
                <p className="text-muted-foreground text-sm mobile:text-[16px] text-balance text-[#727272]">
                  You are almost done setting up your account provide your date
                  of birth and password for your account
                </p>
              </div>
              <div className="mt-6 space-y-2">
                <p className="text-subtle text-xs font-medium">Step 2 of 3</p>
                <div
                  data-testid="step-indicator-container"
                  className="flex w-full space-x-2 rtl:space-x-reverse"
                >
                  <div
                    className="bg-[hsl(var(--accent))] h-1 w-full rounded-[1px] opacity-25 dark:opacity-100"
                    data-testid="step-indicator-1"
                  />
                  <div
                    className="dark:bg-white bg-black h-1 w-full rounded-[1px]"
                    data-testid="step-indicator-0"
                  />
                  <div
                    className="bg-[hsl(var(--accent))] h-1 w-full rounded-[1px] opacity-25 dark:opacity-100"
                    data-testid="step-indicator-2"
                  />
                </div>
              </div>
              <div className="grid gap-6">
                <label
                  htmlFor="sign-up-name"
                  className="relative rounded-xl border bg-[rgba(225,225,225,.051)] dark:border-transparent border-[hsl(var(--border-color))] has-[input:focus]:border-[#4070f4] has-[input:focus]:bg-[hsl(var(--background))] px-[20px] py-[10px] pb-5 flex flex-col gap-1"
                >
                  <div className="flex justify-between text-[12px] dark:text-white w-full">
                    <p className="text-[#727272]">Date of birth</p>
                    {/* <Link href={""}>Forgot password</Link> */}
                  </div>
                  <div className="relative w-full mt-2.5">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
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
                      className="bg-[rgba(225,225,225,.051)] outline-none text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5  dark:placeholder-gray-400 dark:text-white "
                      placeholder="Select date"
                    />
                  </div>
                </label>
                <label
                  htmlFor="sign-up-password"
                  className="rounded-xl bg-[rgba(225,225,225,.051)] border dark:border-transparent border-[hsl(var(--border-color))] has-[input:focus]:border-[#4070f4] px-[20px] py-[10px] flex flex-col gap-1"
                >
                  <p className="text-[12px] text-[#727272]">Password</p>
                  <input
                    type="password"
                    id="sign-up-password"
                    name="email"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-6 bg-transparent border-none outline-none text-sm text-[--color]"
                    value={password}
                    placeholder="*******    "
                    aria-describedby="uidnote"
                    autoComplete="on"
                  />
                </label>

               <div className="flex flex-row gap-5 ">
                     <div
                        data-slot="button"
                        className={`w-full px-6 mt-3 cursor-pointer py-2 flex justify-center bg-[hsl(var(--accent))] text-[--color] rounded-lg outline-none`}
                        
                        onClick={()=>{
                            setNext(false)
                        }}
                        >
                        Back
                        
                        </div>
                     <button
                  data-slot="button"
                  className={`w-full px-6 mt-3 py-2 ${
                    !password || isPending || !dob
                      ? "opacity-40 pointer-events-none cursor-not-allowed"
                      : ""
                  } flex justify-center bg-black text-white rounded-lg outline-none dark:bg-[#E5E5E5] dark:text-black`}
                  type="submit"
                >
                  {isPending ? (
                    <svg
                      className=" animate-spin text-white size-5 me-3"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx={12}
                        cy={12}
                        r={10}
                        stroke="currentColor"
                        strokeWidth={4}
                      />
                      <path
                        className="opacity-75 fill-white dark:fill-black"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  ) : (
                    "Continue"
                  )}
                  
                </button>
               </div>
              </div>

              <div className="text-center text-sm">
                Already have an account?{/* */}{" "}
                <a href="/sign-in" className="underline underline-offset-4">
                  Sign in
                </a>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <OTPVerification
            type={otpType}
            contact={email}
            onVerify={(code) => {
            console.log('Verified with code:', code);
            setShowOTP(false);
            }}
            onResend={() => {
            console.log('Resending OTP...');
            }}
            onBack={() => setShowOTP(false)}
        />
      )}
    </>
  );
}
