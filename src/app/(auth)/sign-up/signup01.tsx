"use client";
import React from "react";
import { useRouter } from "next/navigation"
import { useEffect, useState,FormEvent } from "react"
import Signup03 from './signup03'
import Signup04 from './signup04';
export default function Signup01() {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const [next,setNext]=useState(false)
    const [email,setEmail]=useState("")
    const [validEmail,setValidEmail]=useState(emailRegex.test(email))
    const [name,setName] =useState("")
    const [emailError,setEmailerror]=useState({
        "isValid":true,
        "emailError":""
    })
    const [isPending,setIsPending]=useState(false)
    const [invalid,setInvalid]=useState(true)
    const router=useRouter()
    const [dob, setDob] = useState("");
      useEffect(() => {
        console.log(dob);
      }, [dob]);
     
    const [password, setPassword] = useState("");
    const handleLogin= async (e:FormEvent<HTMLFormElement>) =>{
        
        e.preventDefault()
        setNext(true)
       
    }
    
    return (
        <>
        { !next?
            <div className="flex flex-1 items-center justify-center text-[--color]">
                <div className="w-full max-w-[480px]">
                    <form className="flex flex-col gap-6" method="POST" onSubmit={handleLogin}>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="text-[22px] mobile:text-[26px] w-full text-black dark:text-white">Welcome to Skiilink </h1>
                        <p className="text-muted-foreground text-sm mobile:text-[16px] text-balance text-[#727272]" >
                            Enter your name and email address so create an account with us
                        </p>
                    </div>
                    <div className="mt-6 space-y-2">
                        <p className="text-subtle text-xs font-medium">Step 1 of 3</p>
                        <div
                            data-testid="step-indicator-container"
                            className="flex w-full space-x-2 rtl:space-x-reverse"
                        >
                            <div
                            className="dark:bg-white bg-black h-1 w-full rounded-[1px]"
                            data-testid="step-indicator-0"
                            />
                            <div
                            className="bg-[hsl(var(--accent))] h-1 w-full rounded-[1px] opacity-25 dark:opacity-100"
                            data-testid="step-indicator-1"
                            />
                            <div
                            className="bg-[hsl(var(--accent))] h-1 w-full rounded-[1px] opacity-25 dark:opacity-100"
                            data-testid="step-indicator-2"
                            />
                            
                        </div>
                    </div>
                    <div className="grid gap-6">
                        <label htmlFor="sign-up-name" className="relative rounded-xl border-2 bg-[rgba(225,225,225,.051)] dark:border-transparent border-[hsl(var(--border-color))] has-[input:focus]:border-[#4070f4] has-[input:focus]:bg-[hsl(var(--background))] px-[20px] py-[10px] flex flex-col gap-1">
                            <div className="flex justify-between text-[12px] dark:text-white w-full">
                                <p className='text-[#727272] font-semibold'>Name</p>
                                {/* <Link href={""}>Forgot password</Link> */}
                            </div>
                            <input
                                type="text"
                                id="sign-up-name" 
                                name="text" 
                                placeholder="Scott stillman"
                                className="w-full h-6 bg-transparent border-none outline-none text-sm text-[--color]"
                                onChange ={(e)=> setName(e.target.value)}
                                aria-describedby="uidnote"
                                autoComplete="on"
                                value={name}
                            />
                
                        
                        </label>
                        <label htmlFor="sign-in-email" className="rounded-xl bg-[rgba(225,225,225,.051)] border-2 dark:border-transparent border-[hsl(var(--border-color))] has-[input:focus]:border-[#4070f4] px-[20px] py-[10px] flex flex-col gap-1">
                            <p className='text-[12px] text-[#727272] font-semibold'>Email</p>
                            <input
                                type="email"
                                id="sign-in-email" 
                                name="email" 
                                value={email}
                                className="w-full h-6 bg-transparent border-none outline-none text-sm text-[--color]"
                                onChange ={(e)=> setEmail(e.target.value)}
                                placeholder="example@gmail.com"
                                aria-describedby="uidnote"
                                autoComplete="on"
                            />
                        
                        </label>
                        
                        
                        
                        <button
                        data-slot="button"
                        className={`w-full px-6 mt-3 py-2 ${!emailRegex.test(email) || !name.length ? "opacity-40 pointer-events-none cursor-not-allowed" :""} flex justify-center bg-black text-white rounded-lg outline-none dark:bg-[#E5E5E5] dark:text-black`}
                        type="submit"

                        >
                            Continue
                        </button>
                        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                        <span className="bg-[hsl(var(--background))] text-muted-foreground relative z-10 px-2 ">
                            Or continue with
                        </span>
                        </div>
                    
                    </div>
                    <button
                            data-slot="button"
                            className="inline-flex items-center justify-between gap-4 whitespace-nowrap rounded-md transition-all disabled:pointer-events-none disabled:cursor-not-allowed hover:opacity-70 disabled:opacity-40 [&_svg]:pointer-events-none [&img:not([class*='size-'])]:size-4 shrink-0 [&img]:shrink-0 outline-none shadow-xs hover:bg-[accent]  px-6 py-4 text-[--color] w-full bg-[hsl(var(--accent))] text-[16px] tracking-wide border dark:border-transparent border-[hsl(var(--border-color))]"
                            
                            disabled={validEmail}
                        >
                            <img src="/google.svg" className="size-6" alt="google"/>
                            <span className="flex w-full">Continue with Google</span>
                            <svg
                                width={21}
                                height={20}
                                viewBox="0 0 21 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="arrow-right"
                                >
                                <path
                                    d="M4.66667 10H16.3333"
                                    stroke="#D4D6FF"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M10.5 4.16675L16.3333 10.0001L10.5 15.8334"
                                    stroke="#D4D6FF"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                        </button>
                        <div className="text-center text-sm">
                        Already have an account?{/* */}{" "}
                        <a href="/sign-in" className="underline underline-offset-4">
                        Sign in
                        </a>
                    </div>
                    </form>
                </div>
            </div>
        : <Signup03 name={name} email={email} next={next} setNext={setNext} dob={dob} setDob={setDob} password={password} setPassword={setPassword}/>}
        </>
    );
}
