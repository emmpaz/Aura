'use client'
import { deleteGoogleRefreshToken } from "@/app/actions/auth0.action"
import { FaSignOutAlt, FaUnlink } from "react-icons/fa"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useContext } from "react"
import { useSongContext } from "@/app/lib/SongContext"
import { useSearchContext } from "@/app/lib/SearchContext"



export default function Navigation({
    isLinked
}: {
    isLinked: boolean
}) {

    const router = useRouter();

    const {
        resetContext
    } = useSongContext();

    const {
        handleSearchValue,
        searchResult,
    } = useSearchContext();


    const handleUnLink = async () => {
        resetContext();
        await deleteGoogleRefreshToken();
        router.push('/');
    }
    return (
        <div className={` h-28 grid ${(isLinked) ? 'grid-cols-3' : 'grid-cols-2'}`}>
            <div className="ml-10 justify-self-start self-center">
                <Link href={'/'}>
                    <img src='/logo.png' width={40} height={40} alt="logo" />
                </Link>
            </div>
            {isLinked &&
            <div className="flex items-center">
                <form 
                    onSubmit={(e) => {
                        e.preventDefault();
                        searchResult();
                    }}
                    className="w-full flex items-center text-white p-2 bg-transparent border-none focus:border-none active:border-none input input-primary">
                    <input
                        className="w-full px-3 py-2"
                        placeholder="Search..."
                        onChange={(e) => handleSearchValue(e.target.value)}
                    />
                    <button
                        type="submit"
                    >
                    <svg
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70 cursor-pointer"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                    </button>
                </form>
            </div>}
            <div className="justify-self-end self-center flex mr-5">
                <a href="/api/auth/logout" className="flex mr-5">
                    <FaSignOutAlt className="" size={25} />
                </a>
                {isLinked &&
                    <button className="flex " onClick={handleUnLink}>
                        <FaUnlink size={25} />
                    </button>}
            </div>
        </div>
    )
}