'use client'
import { songContext } from "@/app/lib/SongContext";
import { useContext} from "react";
import { IoMdPause, IoMdPlay } from "react-icons/io";
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

export default function YouTubeSongPlayer() {
    const { 
        song, play, 
        handleTogglePlay, 
        videoLoading,
        handleSeek,
        songProgress,
        duration,
        handlePrevious,
        handleSkip} = useContext(songContext)!;


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


    return (
        <div className="">
            {song && (
                <div className="p-4 flex justify-center">
                    <div className="w-full flex flex-col justify-center items-center rounded max-w-xl">
                        <div className="mx-auto overflow-hidden w-[400px] h-[400px] m-4 rounded-xl relative">
                            <img
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-auto w-[707px] max-w-none"
                                src={
                                    (song.snippet?.thumbnails?.maxres) ?
                                        song.snippet.thumbnails.maxres.url as string : song.snippet?.thumbnails?.standard?.url as string
                                }
                            />
                        </div>
                        <div className="pb-8 text-center">
                            <p>{song.snippet?.title}</p>
                            <p>{song.snippet?.videoOwnerChannelTitle?.replace('- Topic', '')}</p>
                        </div>
                        <div className="w-full">
                            <input 
                                type="range"
                                min={0}
                                value={songProgress.x}
                                max={duration}
                                onChange={handleSeek}
                                className="w-full range range-xs bg-background range-primary"
                                />
                        </div>
                        <div className="w-full flex justify-center mb-10 mt-4">
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
                </div>)}
        </div>
    )
}