import React, {FormEvent, useState} from 'react'

export default function Signup04() {
    const [next,setNext]=useState(false)
     const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        setNext(true)
        e.preventDefault();
        
    }; 
    return (
        <>
            {!next?

                <div className="flex flex-1 items-center justify-center text-[--color]">
                    <div className="w-full max-w-[480px]">
                        <form className="flex flex-col gap-6" method="POST" onSubmit={handleSubmit}>
                        <div className="flex flex-col items-center gap-2 text-center">
                            <h1 className="text-[22px] mobile:text-[26px] w-full text-black dark:text-white">Getting started provide your name and email address</h1>
                            <p className="text-muted-foreground text-sm mobile:text-[16px] text-balance text-[#727272]" >
                                this is username tweatflash.com/username and your full name you use in real life
                            </p>
                        </div>
                        <div className="mt-6 space-y-2">
                            <p className="text-subtle text-xs font-medium">Step 3 of 5</p>
                            <div
                                data-testid="step-indicator-container"
                                className="flex w-full space-x-2 rtl:space-x-reverse"
                            >
                                
                                <div
                                className="bg-[hsl(var(--accent))] h-1 w-full rounded-[1px] opacity-25 dark:opacity-100"
                                data-testid="step-indicator-1"
                                />
                                <div
                                className="bg-[hsl(var(--accent))] h-1 w-full rounded-[1px] opacity-25 dark:opacity-100"
                                data-testid="step-indicator-2"
                                />
                                <div
                                className="dark:bg-white bg-black h-1 w-full rounded-[1px]"
                                data-testid="step-indicator-0"
                                />
                                <div
                                className="bg-[hsl(var(--accent))] h-1 w-full rounded-[1px] opacity-25 dark:opacity-100"
                                data-testid="step-indicator-3"
                                />
                                <div
                                className="bg-[hsl(var(--accent))] h-1 w-full rounded-[1px] opacity-25 dark:opacity-100"
                                data-testid="step-indicator-4"
                                />
                            </div>
                        </div>
                        <div className="grid gap-6">
                            <label htmlFor="sign-up-username" className="relative rounded-xl border bg-[rgba(225,225,225,.051)] dark:border-transparent border-[hsl(var(--border-color))] has-[input:focus]:border-[#4070f4] has-[input:focus]:bg-[hsl(var(--background))] px-[20px] py-[10px] flex flex-col gap-1">
                                <div className="flex justify-between text-[12px] dark:text-white w-full">
                                    <p className='text-[#727272] font-bold'>Username</p>
                                    {/* <Link href={""}>Forgot password</Link> */}
                                </div>
                                <input
                                    type="text"
                                    id="sign-up-username" 
                                    name="text" 
                                    placeholder="tweatflash.com/[username]"
                                    className="w-full h-6 bg-transparent border-none outline-none text-sm text-[--color]"
                                
                                    aria-describedby="uidnote"
                                    autoComplete="on"
                                />
                    
                            
                            </label>
                            <label htmlFor="sign-up-password" className="rounded-xl bg-[rgba(225,225,225,.051)] border dark:border-transparent border-[hsl(var(--border-color))] has-[input:focus]:border-[#4070f4] px-[20px] py-[10px] flex flex-col gap-1">
                                <p className='text-[12px] text-[#727272]'>Password</p>
                                <input
                                    type="password"
                                    id="sign-up-password" 
                                    name="email" 
                                    
                                    className="w-full h-6 bg-transparent border-none outline-none text-sm text-[--color]"
                                
                                    placeholder="*******    "
                                    aria-describedby="uidnote"
                                    autoComplete="on"
                                />
                            
                            </label>
                            
                            
                            
                            <button
                            data-slot="button"
                            className="w-full px-6 py-2 flex justify-center bg-black text-white rounded-lg outline-none dark:bg-[#E5E5E5] dark:text-black"
                            type="submit"
                            >
                                Continiue
                            </button>
                            
                        
                        </div>
                    
                            <div className="text-center text-sm">
                            Don't have an account?{/* */}{" "}
                            <a href="#" className="underline underline-offset-4">
                            Sign up
                            </a>
                        </div>
                        </form>
                    </div>
                </div>
            : <></>}
        </>
    )
}
