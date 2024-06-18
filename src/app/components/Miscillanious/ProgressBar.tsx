import { useSongProgressContext } from "@/app/lib/SongContext";




export default function ProgressBar() {

    const {
        songProgress,
        duration,
        handleSeek
    } = useSongProgressContext();


    return (
        <input
            type="range"
            min={0}
            value={songProgress.x}
            max={duration}
            onChange={handleSeek}
            className="w-full range range-xs bg-background range-primary"
        />

    )
}