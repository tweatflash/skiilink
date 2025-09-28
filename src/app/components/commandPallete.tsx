'use client'

import { Fragment, useEffect, useState ,useRef, useContext} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Command } from 'cmdk'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import getExplorePosts from '../../../lib/explore'
import Person from '../components/person'
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

export default function CommandPalette() {
    const ref=Cookies.get("RFTFL")
    const acc=Cookies.get("ACTFL")
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<any>({})
    const [loading, setLoading] = useState(false)
    const abortRef = useRef<AbortController | null>(null)
    const router = useRouter()
    const [openSearch , setOpenSearch] = useState(true)
    /* keyboard shortcut: ⌘K / CtrlK toggles palette */
    const handlePush=(data:string)=>{
        console.log(data)
        router.push(data)
        setOpenSearch(false)
        setQuery("")
    }
    useEffect(() => {
        const toggle = (e: KeyboardEvent) => {
        const hotKey = (e.metaKey || e.ctrlKey) && e.key === 'k'
        if (hotKey) {
            e.preventDefault()
            setOpenSearch((prev:boolean) => !prev)
        }
        if (e.key === 'Escape') setOpenSearch(false)
        }
        window.addEventListener('keydown', toggle)
        return () => window.removeEventListener('keydown', toggle)
    }, [])

    /* reset search text whenever we close */
    useEffect(() => {
        if (!openSearch) setQuery('')
    }, [open])
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
        if (openSearch==false){
            setQuery("")
        }
    },[openSearch])
    return (
        <Transition show={openSearch} as={Fragment}>
        <Dialog onClose={() => {
            setOpenSearch(false)
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
            <Dialog.Panel className="mx-auto mt-0 sm:bg-transparent bg-[hsl(var(--background))] sm:max-h-90vh w-full sm:max-w-[600px] max-w-full sm:px-4 h-screen sm:py-10">
                <Command
                    className="sm:rounded-xl sm:border max-h-full overflow-y-auto sm:border-[hsl(var(--border-color))] sm:shadow-2xl sm:bg-[hsl(var(--background))]"
                >
                {/* search input */}
                <div className="border-b sticky top-0 bg-[hsl(var(--background))] z-10 border-zinc-200 dark:border-zinc-700 h-[55px] flex flex-row gap-1">
                    <div className='aspect-square h-[55px] p-2'>
                        <button className="h-full aspect-square hover:bg-[hsl(var(--accent))] rounded-full flex justify-center items-center"
                            onClick={()=>setOpenSearch(false)}
                        >
                        
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="fill-black dark:fill-white size-5"
                            style={{ color: "rgb(239, 243, 244)" }}
                            >
                            <g>
                                <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z" />
                            </g>
                            </svg>

                        </button>
                    </div>
                    <input
                    
                        type='search'
                        value={query}
                        onChange={(e)=>setQuery(e.target.value)}
                        placeholder="Type a command or search…"
                        className="flex-1 text-[--color] bg-transparent px-4 py-3 pl-0 text-sm
                                    outline-none placeholder:text-zinc-400"
                        autoFocus
                    />
                    <div className="loader_holder">
                      <div className={`loader-line ${loading ?"" :"hidden"}`}></div>
                    </div>
                </div>

                {/* results */}
                <Command.List className="h-fit  p-2 flex flex-col">
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
                    {results.user && results.user.map((cmd:any,index:number) => (
                        <Command.Item
                            key={index}
                            value={cmd._id}
                            onSelect={() => {
                                setOpenSearch(false)
                                router.push(`/${cmd.username}`)
                            // if (cmd.action) cmd.action()
                            }}
                            className="flex cursor-pointer items-center justify-between
                                    rounded-md px-3 py-2 text-sm text-[--color]
                                    aria-selected:bg-zinc-100 dark:aria-selected:bg-[hsl(var(--accent))]"
                        >
                            <Person userObj={cmd} key={index} />
                        </Command.Item>
                    ))}

                    <Command.Empty className="p-3 text-center text-xs text-zinc-500">
                        No result
                    </Command.Empty>
                </Command.List>
                </Command>
            </Dialog.Panel>
            </Transition.Child>
        </Dialog>
        </Transition>
    )
}