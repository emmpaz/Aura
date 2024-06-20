import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useSongContext } from "./SongContextProvider";




type ProgressinitialProps = {
    songProgress : {
        x: number
    },
    handleSeek: (e: React.ChangeEvent<HTMLInputElement>) => void,
    resetSongProgressContext : () => void,
}

const SongProgressContext = createContext<ProgressinitialProps | null>(null);


export const SongProgressProvider = ({
    children
} : {
    children : React.ReactNode
}) => {

    const {
        videoElement,
        song,
        play,
    } = useSongContext();

    const [songProgress, setSongProgress] = useState({ x: 0 });
    const intervalRef = useRef<number | null>(null);
    
    useEffect(() => {
        setSongProgress({x: 0});

        return () => {
            if(intervalRef.current) clearInterval(intervalRef.current);
        }
    }, [song]);

    useEffect(() => {
        if (play && videoElement) {
            intervalRef.current = window.setInterval(() => {
                const currentTime = videoElement.target.getCurrentTime();

                setSongProgress(prev => ({ x: currentTime }));
            }, 10);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
    }, [play, videoElement]);

    const resetSongProgressContext = () => {
        setSongProgress({x: 0});
        intervalRef.current = 0;
    }


    const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (videoElement) {
            const time = parseFloat(e.target.value);
            videoElement.target.seekTo(time, true);
            setSongProgress({ x: time });
        }
    }, [videoElement]);

    const values = {
        songProgress,
        handleSeek,
        resetSongProgressContext
    }

    return(
        <SongProgressContext.Provider value={values}>
            {children}
        </SongProgressContext.Provider>
    )
}

export const useSongProgressContext = () => {
    const context = useContext(SongProgressContext);
    if(context === null) throw new Error('useSongProgress must be used within a SongProvider');

    return context;
}