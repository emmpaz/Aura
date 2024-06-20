import { useSongContext } from "@/app/lib/SongContextProvider";
import { useSongProgressContext } from "@/app/lib/SongProgressProvider";
import { formatTime } from "@/app/lib/helpers";
import { useMemo, useState } from "react";




export default function ProgressBar() {

    const {
        songProgress,
        handleSeek
    } = useSongProgressContext();

    const {
        duration,
        videoLoading,
    } = useSongContext();

    const displayTime = useMemo(() => formatTime(songProgress.x), [songProgress]);
    const displayDuration = useMemo(() => formatTime(duration), [duration]);
    


    return (
        <div className="flex flex-col">
            <div className="flex justify-between">
                <span>{displayTime}</span>
                <span>{displayDuration}</span>
            </div>
            <input
                type="range"
                min={0}
                value={songProgress.x}
                max={duration}
                onChange={handleSeek}
                className="w-full range range-xs bg-background range-primary"
                disabled={videoLoading}
            />
        </div>

    )
}