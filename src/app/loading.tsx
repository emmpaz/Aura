'use client'
import Skeleton from "react-loading-skeleton";




export default function Loading(){
    return(
        <div className="min-h-screen bg-[#3B4131] flex justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    )
}