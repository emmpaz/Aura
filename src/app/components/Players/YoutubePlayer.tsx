'use client'
import { useSongContext } from "@/app/lib/SongContext";
import { correctImage } from "@/app/lib/helpers";
import { youtube_v3 } from "googleapis";
import { useSearchParams } from "next/navigation";
import { memo, useContext, useMemo} from "react";
import { IoMdPause, IoMdPlay } from "react-icons/io";
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import ProgressBar from "../Miscillanious/ProgressBar";

const YouTubeSongPlayer = memo(() => {


    const params = useSearchParams();
    const fromSearch = params.get('fromSearch');

    const { 
        song, 
        contextList,
        play,
        handleTogglePlay, 
        videoLoading,
        handlePrevious,
        handleSkip} = useSongContext();


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

    console.log('dsadasds');

    const getThumbnail = useMemo(() => {
        if(fromSearch && contextList?.items && contextList.items.length > 0){
            return correctImage(
                song?.snippet?.thumbnails!,
                contextList.items[0].snippet?.thumbnails!,
                fromSearch
            )
        }

        return correctImage(song?.snippet?.thumbnails!, {} as youtube_v3.Schema$ThumbnailDetails, null);
    }, [fromSearch, contextList, song]);


    return (
        <div className="">
            {song && (
                <div className="p-4 flex justify-center">
                    <div className="w-full flex flex-col justify-center items-center rounded max-w-xl">
                        <div className="mx-auto overflow-hidden w-[400px] h-[400px] m-4 rounded-xl relative">
                            <img
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-auto w-[707px] max-w-none"
                                src={getThumbnail as string}
                            />
                        </div>
                        <div className="pb-8 text-center">
                            <p>{song.snippet?.title}</p>
                            <p>{song.snippet?.videoOwnerChannelTitle?.replace('- Topic', '')}</p>
                        </div>
                        <div className="w-full">
                            <ProgressBar/>
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
});

export default YouTubeSongPlayer;