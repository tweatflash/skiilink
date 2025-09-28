import Link from 'next/link'
import React from 'react'
type Param={
    userObj:any
}
export default function Person({userObj}:Param) {
  return (
    <div className="flex-1 flex flex-row gap-3 px-4 py-3" >
        <div className="flex-1 flex flex-row gap-3">
            <div className="flex">
            <Link href={"/"+userObj.username}>
                <div className="size-10 bg-[hsl(var(--accent))] rounded-full">
                    <img
                        alt={userObj.name}
                        src={userObj.profileImage?userObj.profileImage : "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"}
                        className="h-full w-full object-cover object-center rounded-full"
                    />
                    
                </div>
            </Link>
            </div>
            <div className="flex-1 flex flex-col h-fit">
            
                <div className="flex flex-row justify-between flex-1 gap-3 leading-5">
                    <div className='flex-1'>
                        <div className="flex justify-between gap-2">
                        <div className="flex gap-3 items-center">
                        <span className="font-[500] tracking-wide decoration-0">
                            <span className="text-black  dark:text-[#EEEEEE] text-[15px] decoration-0">
                            <div className="hover:underline decoration-0">
                                <Link href={"/"+userObj.username}>
                                    {userObj.name}
                                </Link>
                            </div>
                            </span>
                        </span>
                        
                        </div>
                    </div>
                    <span className="text-[#727272] text-sm">
                        <Link href={"/"+userObj.username}>
                                @{userObj.username}
                        </Link>
                    </span>
                    </div>
                    {
                        userObj.following && <div className='flex'>
                            <button
                        type="submit"
                        
                        className={`px-4 h-8 rounded-lg text-sm font-medium transition-all ${
                           
                             "bg-blue-500 text-white hover:bg-blue-600 hover:shadow-md"
                        }`}
                        >
                        Folllow
                        </button>
                        </div>
                    }
                </div>
                {
                    userObj.bio && <div className="w-full relative overflow-ellipsis ">
                        <span className="text-[--color] text-[15px] w-full overflow-hidden  overflow-ellipsis">
                            {userObj.bio}
                        </span>
                    </div>
                }
                
            
            </div>
        </div>
        {/* <button className="px-4 h-fit rounded-full py-1 text-white bg-[#4070f4] text-[15px] ">
            Follow
        </button> */}
    </div>
  )
}
