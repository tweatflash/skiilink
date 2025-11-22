"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState,FormEvent, useContext } from "react"
import Link from "next/link";
import Cookies from 'js-cookie'
import { ThemeContext } from "app/contexts/ThemeContext";
type Prop={
    clientId:string
}
export default function Login({clientId}:Prop) {
    const [email,setEmail]=useState("")
    const [password,setPassword] =useState("")
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const [validEmail,setValidEmail]=useState(emailRegex.test(email))
    const [googleObj,setGoogleObj]=useState({})
    const { authError,setAuthError} :any=useContext(ThemeContext)
        const closeError=()=>{
          setAuthError({
            "show":false,
            "error":""
          })
        }
    useEffect(()=>{
        setValidEmail(emailRegex.test(email))
    },[email])
    const [isPending,setIsPending]=useState(false)
    const router=useRouter()
    const checkValidAuth= async ()=>{
        try { 
            const request = await fetch("https://solar-store.onrender.com/api/v1//auth/login",{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                    
                },
                body: JSON.stringify({
                    email,
                    password

                }) 
            })
            const response=await request
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true)
        if (!emailRegex.test(email)){
            setValidEmail(false)
            setAuthError({
                "show":true,
                "error":"Please enter a valid email"
            })
        }
        try { 
            const request = await fetch("https://solar-store.onrender.com/api/v1/auth/login",{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                    
                },
                body: JSON.stringify({
                    "email":"rosecharles819@gmail.com",
                    "password":"mark2024"
                }) 
            })
            const response=await request
            
            const data =await response.json()
            if (response.status ==200 && data.refreshTokenJWT && data.accessTokenJWT) {
                Cookies.set("RFTFL", data.refreshTokenJWT, { expires: 7 });
                Cookies.set("ACTFL", data.accessTokenJWT, { expires: 7 });
                window.location.reload()
            }
            response?.status===500? setAuthError({
                "show":true,
                "error":data.msg
            }):(response?.status===400?setAuthError({
                "show":true,
                "error":data.msg
            }) :setAuthError({
                "show":false,
                "error":""
            }))
        } catch (error) {
            setIsPending(false)
            setAuthError({
                "show":true,
                "error":"An Unexpected error occured possibly your network "
            })
            console.log(error)                                                                                  
        }finally{
            setIsPending(false)
        }
    }; 
    return (
    
        <div className="flex flex-1 items-center justify-center dark:text-white text-black">
        <div className="w-full max-w-[480px]">
            <form className="flex flex-col gap-6" method="POST" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-[22px] mobile:text-[26px] w-full text-black dark:text-white">Welcome back to Skiilink Ventures</h1>
                <p className="text-muted-foreground text-sm mobile:text-[16px] text-balance text-[#727272]" >
                    Type your e-mail and  password to log in to your  account.
                </p>
            </div>
            <div className="grid gap-6">
                <label htmlFor="sign-in-email" className="rounded-xl transition-all bg-black/5 dark:bg-white/5 border-2 border-transparent dark:has-[input:focus]:border-white/25 has-[input:focus]:border-black/25 px-[20px] py-[10px] flex flex-col gap-1">
                    <p className='text-[12px] text-[#727272]'>Email</p>
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
                <label htmlFor="sign-in-password" className="relative rounded-xl border-2 transition-all bg-black/5 dark:bg-white/5 border-transparent dark:has-[input:focus]:border-white/25 has-[input:focus]:border-black/25  px-[20px] py-[10px] flex flex-col gap-1">
                    <div className="flex justify-between text-[12px] dark:text-white w-full">
                        <p className='text-[#727272]'>Password</p>
                        {/* <Link href={""}>Forgot password</Link> */}
                    </div>
                    <input
                        type="password"
                        id="sign-in-password" 
                        name="password" 
                        placeholder="**********"
                        className="w-full h-6 bg-transparent border-none outline-none text-sm text-black dark:text-white"
                        onChange ={(e)=> setPassword(e.target.value)}
                        aria-describedby="uidnote"
                        autoComplete="on"
                        value={password}
                    />
                    <span className="absolute h-5 bottom-[-20px] pt-2 right-0 text-sm ">Forgot Password ?</span>
                
                </label>
                
                
                <button
                    data-slot="button"
                    className={`w-full px-6 mt-3 py-2 ${validEmail===false || password.length==0 || isPending ? "opacity-40 pointer-events-none cursor-not-allowed" :""} flex justify-center bg-black text-white rounded-lg outline-none dark:bg-[#E5E5E5] dark:text-black`}

                    disabled={validEmail===false || password.length==0 || isPending? true :false}
                    type="submit"
                >
                    {
                        isPending ?<svg
                            className=" animate-spin text-white size-5"
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
                    </svg>: "login"
                    }
                </button>
                
               
            </div>
             
            </form>
                
                <div className="text-center text-sm mt-6">
                Don't have an account?
                <Link href="/sign-up" className="underline underline-offset-4">
                Sign up
                </Link>
            </div>
        </div>
            
        </div>

    )
}
