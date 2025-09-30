'use client'

import { Fragment, useEffect, useState ,useRef, useContext} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Command } from 'cmdk'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import getExplorePosts from '../../../lib/explore'

import Person from '../components/person'
import { ThemeContext } from 'app/contexts/ThemeContext'
import { X } from 'lucide-react'
interface Item {
  id: string
  label: string
  shortcut?: string   // e.g. "G H" for GitHub’s palette vibes
  href?: string
  action?: () => void
}
/* --- your app-specific commands ----------------------------------------- */
const COMMANDS: Item[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'blog', label: 'Blog', href: '/blog' },
  { id: 'profile', label: 'Open profile modal', action: () => alert('👋') },
]

export default function CommandPalette () {
     const themeContext = useContext(ThemeContext);
      if (!themeContext) {
        throw new Error(
          "ThemeContext is undefined. Make sure your component is wrapped in ThemeContext.Provider."
        );
      }
    const {
        search,
        setSearch
    } = themeContext;
    const ref=Cookies.get("RFTFL")
    const acc=Cookies.get("ACTFL")
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<any>({})
    const [loading, setLoading] = useState(false)
    const abortRef = useRef<AbortController | null>(null)
    const router = useRouter()
    /* keyboard shortcut: ⌘K / CtrlK toggles palette */
    const handlePush=(data:string)=>{
        console.log(data)
        router.push(data)
        setSearch(false)
        setQuery("")
    }
    useEffect(() => {
        const toggle = (e: KeyboardEvent) => {
        const hotKey = (e.metaKey || e.ctrlKey) && e.key === 'k'
        if (hotKey) {
            e.preventDefault()
            setSearch((prev:boolean) => !prev)
        }
        if (e.key === 'Escape') setSearch(false)
        }
        window.addEventListener('keydown', toggle)
        return () => window.removeEventListener('keydown', toggle)
    }, [])

    /* reset search text whenever we close */
    useEffect(() => {
        if (!search) setQuery('')
    }, [search])
    async function petch(){
        const data : any=await getExplorePosts(query,ref,acc)
        const result :any= await data
        if (!result || result===undefined){
            setLoading(false)
            console.log("undefined")
        }else{
            setLoading(false)
            setResults(result)
            
        }
    }
    /* --------------------------------------------------------------------- */
    useEffect(() => {
        // 1️⃣ Ignore empty queries
        if (!query.trim()) { 
            setResults({}) 
            setLoading(false) 
            return 
        }
        setLoading(true)
        // 2️⃣ Debounce: fire only after 300 ms of silence
        const id = setTimeout(() => {
            // 3️⃣ Cancel the previous in-flight request (if any)
            abortRef.current?.abort()
            const controller = new AbortController()
            abortRef.current = controller
            petch()
        }, 300)

        // // Cleanup for the debounce timer
        return () => clearTimeout(id)

    }, [query])
    useEffect(()=>{
        if (search==false){
            setQuery("")
        }
    },[search])
    return (
        <Transition show={search} as={Fragment}>
        <Dialog onClose={() => {
            setSearch(false)
            setQuery("")
        }} className="fixed bg-black/60 inset-0 z-50">
            {/* backdrop */}
            <Transition.Child
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
            <div className="absolute inset-0 hidden bg-black/60" />
            </Transition.Child>

            {/* panel */}
            <Transition.Child
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-50 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-50 scale-95"
            >
            <Dialog.Panel className="mx-auto mt-0 sm:bg-transparent sm:max-h-90vh w-full  h-screen sm:pb-10">
                <Command
                    className="max-h-full overflow-y-auto w-full  sm:shadow-2xl py-10 bg-gray-100"
                >
               <div className="w-full">
                    <div className="w-full m-auto max-w-3xl  flex flex-row px-4" >
                        
                         {/* search input */}
                        <div className="border sticky  flex-1 rounded-full top-0 bg-[hsl(var(--background))] z-10 border-zinc-200 dark:border-zinc-700 h-[60px] flex flex-row gap-1">
                            
                            <input
                            
                                type='text'
                                value={query}
                                onChange={(e)=>setQuery(e.target.value)}
                                placeholder="What are you searching for…"
                                className="flex-1  px-5 text-[--color] bg-transparent py-3 text-xl
                                            outline-none focus:ring-2 rounded-full focus:ring-orange-500 placeholder:text-zinc-400"
                                autoFocus
                            />
                        
                        </div> 
                         <div className=' h-[60px] flex items-center'>
                            <button className="h-full  flex  items-center px-2"
                                onClick={()=>setSearch(false)}
                            >
                            
                            <X size={20}/>
                            </button>
                            </div>
               
                    </div>
                     {/* results */}
                <Command.List className="h-fit w-full  max-w-3xl m-auto  p-2 flex flex-col font-[famil]">
                    {query && results && <Command.Item tabIndex={-1} className='flex-1 aria-selected:bg-[hsl(var(--accent))] flex px-2 py-2 cursor-pointer rounded-lg'>
                        <div className='w-full flex-1 h-10 rounded-xl flex flex-row ' onClick={()=>handlePush(`/explore/${query}`)}>
                            <div className='h-full aspect-square flex justify-center items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-black dark:stroke-white"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
                            </div>
                            <div className='flex-1 h-full flex items-center '>
                                <div>
                                    <span className='text-[--color] text-sm'>Search for <b>{query}</b></span>
                                </div>
                            </div>
                        </div>
                    </Command.Item>}
                   
                        <Command.Item
                            // key={index}
                            // value={cmd._id}
                            // onSelect={() => {
                            //     setSearch(false)
                            //     router.push(`/${cmd.username}`)
                            // }}
                            className="flex cursor-pointer items-center justify-between
                                    rounded-md px-3 py-2 text-sm text-[--color]
                                    aria-selected:bg-zinc-100 dark:aria-selected:bg-[hsl(var(--accent))]"
                        >
                           <h3 className='text-lg'>Top Searches</h3>
                        </Command.Item>
                    

                    <Command.Empty className="p-3 text-center text-xs text-zinc-500">
                        No result
                    </Command.Empty>
                </Command.List>
               </div>
                </Command>
            </Dialog.Panel>
            </Transition.Child>
        </Dialog>
        </Transition>
    )
}