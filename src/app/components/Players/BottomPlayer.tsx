'use client'

import { useSongContext } from "@/app/lib/SongContextProvider"
import { youtube_v3 } from "googleapis";
import { useContext } from "react"
import { IoIosArrowUp, IoMdPause, IoMdPlay } from "react-icons/io";
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import ProgressBar from "../Misc/ProgressBar";


export default function BottomPlayer() {

    const {
        song,
        play,
        videoLoading,
        handleOpenToLargePlayer,
        handleTogglePlay,
        handlePrevious,
        handleSkip
    } = useSongContext();

    const control = () => {
        if (play) {
            return (
                <IoMdPause
                    className="mx-10 p-1 active:shadow-none cursor-pointer"
                    size={40}
                    onClick={handleTogglePlay} />
            )
        } else {
            return (
                <IoMdPlay
                    className="mx-10 p-1 active:shadow-none cursor-pointer"
                    size={40}
                    onClick={handleTogglePlay}
                />
            )
        }
    }

    const correctImage = (thumbnails : youtube_v3.Schema$ThumbnailDetails) => {
        if(thumbnails.maxres) return thumbnails.maxres.url;

        if(thumbnails.standard) return thumbnails.standard.url;

        if(thumbnails.high?.url) return thumbnails.high.url;

        if(thumbnails.medium?.url) return thumbnails.medium.url;

        return thumbnails.default?.url ?? "";
    }


    return (
        song &&
        <div className="w-full h-24 bg-[#4E5444] bottom-0 rounded-xl sticky">
            <div className="px-3 grid grid-cols-3">
                <div className="place-self-start flex items-center">
                    <div className="mx-auto overflow-hidden w-[64px] h-[64px] m-4 rounded-xl relative">
                        <img
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-auto w-[113px] max-w-none"
                            src={correctImage(song.snippet?.thumbnails!) as string}
                        />
                    </div>
                    <div className="ml-2 w-20 sm:w-36 md:w-48 lg:w-80">
                        <div className="flex flex-col text-white">
                            <span className="truncate font-medium text-sm">{song.snippet?.title}</span>
                            <span className="truncate font-thin text-xs">{song.snippet?.videoOwnerChannelTitle?.replace('- Topic', '')}</span>
                        </div>
                    </div>
                </div>
                <div className="grid">
                    <div className=" place-self-center w-full">
                        <div className=" flex justify-center mt-1">
                                <MdOutlineKeyboardDoubleArrowLeft 
                                    className="cursor-pointer" 
                                    size={40} 
                                    onClick={handlePrevious}/>
                                {(!videoLoading) ? 
                                    control() 
                                    :
                                    <span className="loading loading-spinner loading-lg mx-4"></span>
                                }
                                <MdOutlineKeyboardDoubleArrowRight 
                                    className="cursor-pointer" 
                                    size={40} 
                                    onClick={handleSkip}/>
                            </div>
                    </div>
                    <div className="w-full pb-3 place-self-end">
                        <ProgressBar/>
                    </div>
                </div>
                <div className="w-full grid">
                    <div className="justify-self-end w-fit h-fit place-self-center">
                        <IoIosArrowUp
                            size={30}
                            className="cursor-pointer"
                            onClick={handleOpenToLargePlayer} />
                    </div>
                </div>
            </div>
        </div>
    )
}