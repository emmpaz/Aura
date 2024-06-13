'use client'
import { youtube_v3 } from "googleapis";
import { useEffect, useRef, useState } from "react";
import { IoMdPause, IoMdPlay } from "react-icons/io";
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import YouTube, { YouTubePlayer } from "react-youtube";

export default function YouTubeSongPlayer({
    song,
    handleSkip,
    handlePrevious
}: { 
    song: youtube_v3.Schema$PlaylistItem | null ,
    handleSkip: () => void,
    handlePrevious: () => void
}) {

    const [play, setPlay] = useState(true);
    const [loading, setLoading] = useState(true);
    const [videoElement, SetVideoElement] = useState<YouTubePlayer>(null);
    
    const [songProgress, setSongProgress] = useState({x: 0, y: 0});
    const [duration, setDuration] = useState(0);
    const intervalRef = useRef<number | null>(null);
    const [prog, setProg] = useState({ x: 10, y: 10 });


    useEffect(() => {

        setPlay(true);
        setLoading(true);
        setSongProgress(prev => ({x: 0, y: prev.y}));
        

        return () => {
            if(intervalRef.current) clearInterval(intervalRef.current);
        }
    }, [song]);

    useEffect(() => {
        if(play && videoElement){
            intervalRef.current = window.setInterval(() => {
                const currentTime = videoElement.target.getCurrentTime();
                
                setSongProgress(prev => ({x:currentTime, y: prev.y}));
            }, 100);
        }else{
            if(intervalRef.current) clearInterval(intervalRef.current);
        }

        return () => {
            if(intervalRef.current) clearInterval(intervalRef.current);
        }
    },[play, videoElement])

    const opts = {
        height: "0",
        width: "0",
        playerVars: {
            autoplay: 1,
        },
    };

    const _onReady = (event: YouTubePlayer) => {
        try {
            SetVideoElement(event);
            event.target.unMute();
            event.target.setVolume(100);
            event.target.playVideo();
            setDuration(event.target.getDuration());
            setLoading(false);

        } catch (error) {
            console.log(error);
        }
    }

    const _onChange = (event: YouTubePlayer) => {
        switch(event.data){
            case 0:
                handleSkip();
                break;
            case 1:
                setPlay(true);
                break;
            case 2:
                setPlay(false);
                break;
            default:
        }
    }

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(videoElement){
            const time = parseFloat(e.target.value);
            videoElement.target.seekTo(time, true);
            setSongProgress(prev => ({x: time, y: prev.y}));
        }
    }

    const togglePlay = () => {
        if (play) {
            videoElement.target.pauseVideo();
        }
        else {
            videoElement.target.playVideo();
        }
        setPlay(prev => !prev);
    }

    const control = () => {
        if (play) {
            return (
                <IoMdPause
                    className="mx-10 p-1 active:shadow-none cursor-pointer"
                    size={40}
                    onClick={togglePlay} />
            )
        } else {
            return (
                <IoMdPlay
                    className="mx-10 p-1 active:shadow-none cursor-pointer"
                    size={40}
                    onClick={togglePlay}
                />
            )
        }
    }


    return (
        <div className="">
            {song && <YouTube
                videoId={song.snippet?.resourceId?.videoId as string}
                opts={opts}
                onReady={_onReady}
                onStateChange={_onChange}
            />}
            {song && (
                <div className="p-4 flex justify-center">
                    <div className="w-full flex flex-col justify-center items-center rounded max-w-xl">
                        <div className="mx-auto overflow-hidden w-[400px] h-[400px] m-4 rounded-xl relative">
                            <img
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-auto w-[707px] max-w-none"
                                src={song.snippet?.thumbnails?.maxres?.url as string}
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
                            {(!loading) ? 
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