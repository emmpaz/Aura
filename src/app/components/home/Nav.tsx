'use client'
import { deleteGoogleRefreshToken } from "@/app/actions/auth0.action"
import Image from "next/image"
import { FaSignOutAlt, FaUnlink } from "react-icons/fa"
import LinkYoutubeButton from "./YouTubeLink"
import { useRouter } from "next/navigation"



export default function Navigation({
    isLinked
} : {
    isLinked: boolean
}){

    const router = useRouter();

    const handleUnLink = async () => {
        await deleteGoogleRefreshToken();
        router.push('/');
    }
    return(
        <div className=" h-28 grid grid-cols-2">
            <div className="ml-3 justify-self-start self-center">
                <Image src='/logo.png' width={40} height={40} alt="logo"/>
            </div>
            <div className="justify-self-end self-center flex flex-col mr-5">
                <a href="/api/auth/logout" className="flex mb-2">
                    <FaSignOutAlt className="" size={25}/>
                </a>
                {isLinked && 
                    <button className="flex mt-1" onClick={handleUnLink}>
                        <FaUnlink size={25}/>
                    </button>}
            </div>
        </div>
    )
}