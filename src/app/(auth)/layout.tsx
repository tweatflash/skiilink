"use client"
import Link from "next/link";
import { useContext, useEffect } from "react";
import { ThemeContext } from "app/contexts/ThemeContext";

export default function AuthLayout({children,}: {children: React.ReactNode}) {
    const navigation = [
      { name: "Product", href: "#" },
      { name: "Features", href: "#" },
      { name: "Marketplace", href: "#" },
      { name: "Company", href: "#" },
    ];
    const { authError,setAuthError} :any=useContext(ThemeContext)
    const closeError=()=>{
      setAuthError({
        "show":false,
        "error":""
      })
    }
    useEffect(()=>{
      if(authError.show) {
        setTimeout(()=>{
          closeError()
        },2000)
      }
    },[authError])
    return (
      
        <div className={`bg-[hsl(var(--background))] grid min-h-svh lg:grid-cols-1`}>

            <div className="flex flex-col gap-4 p-6 md:p-10">
              <div className="flex justify-center gap-2 ">
                <a href="/" className="flex items-center gap-2  text-[--color] tracking-wid bg-[hsl(var(--accent))] px-3 py-2 rounded-[14px]">
                  <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                    {/* <GalleryVerticalEnd className="size-4" /> */}
                    <img
                      className="w-full h-full"
                      alt="Cal"
                      title="Cal"
                      src="/ali.png"
                      />
                  </div>
                  Skiilink Ventures NL.
                </a>
              </div>
              <div className="flex flex-1 items-center justify-center">
                <div className="w-full max-w-[480px] mobile:px-5 dark:text-white text-black ">
                  {children}
                  
                </div>
                
                  <div role="alert" className={`${authError.show? "bottom-10 opacity-100 flex visible" :"hidden"} transition-all pl-5 max-w-sm w-[90%] opacity-0 m-auto pr-10 items-center absolute bottom-0 px-3 py-5 text-sm text-white bg-red-500 rounded-md`}>
                      {authError.error}
                      <button className="flex items-center absolute justify-center transition-all w-8 h-8 rounded-md text-white hover:bg-white/10 active:bg-white/10 right-3" type="button">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                      </button>
                  </div>
              </div>
            </div>
            {/* <div className="bg-muted relative hidden lg:block">
              <img
                src="https://app.fireflies.ai/login-testimonial-background-dark.png"
                alt="Image"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div> */}
            
      </div>
    )
   
}
