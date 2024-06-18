'use client'
import { youtube_v3 } from "googleapis";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useEffect, useRef, useState } from "react";
import YouTube, { YouTubePlayer } from "react-youtube";


type initialProps = {
    song: youtube_v3.Schema$PlaylistItem | null,
    contextList: youtube_v3.Schema$PlaylistItemListResponse | null,
    changeSong: (song: youtube_v3.Schema$PlaylistItem | null) => void,
    videoElement: YouTubePlayer,
    changeVideo: (video: YouTubePlayer) => void,
    play: boolean,
    handleTogglePlay: () => void,
    videoLoading: boolean,
    handleSeek: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleSkip: () => void,
    handlePrevious: () => void,
    songProgress: { x: number },
    duration: number,
    handleList: (list: youtube_v3.Schema$PlaylistItemListResponse | null) => void
    handlePlayListName: (name: string) => void,
    handleOpenToLargePlayer: () => void,
    resetContext: () => void
}

export const songContext = createContext<initialProps | null>(null);

export const SongProvider = ({
    children
}: { children: React.ReactElement }) => {

    const router = useRouter();
    //song and playlist details
    const [song, setSong] = useState<youtube_v3.Schema$PlaylistItem | null>(null);
    const [videoElement, SetVideoElement] = useState<YouTubePlayer>(null);
    const [list, setList] = useState<youtube_v3.Schema$PlaylistItemListResponse | null>(null);
    const [playlistName, setPlaylistName] = useState<string>("");


    //controls
    const [play, setPlay] = useState(true);
    const [videoLoading, setVideoLoading] = useState(true);
    //for song progress
    const [songProgress, setSongProgress] = useState({ x: 0 });
    const [duration, setDuration] = useState(0);
    const intervalRef = useRef<number | null>(null);

    /**
     * we reset everything when the song is loading
     */
    useEffect(() => {

        setPlay(true);
        setVideoLoading(true);
        setSongProgress(prev => ({ x: 0 }));


        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
    }, [song]);


    /**
     * progress bar
     */
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

    /**
     * start the video when we click a song
     * @param event the youtube player iframe
     */
    const _onReady = (event: YouTubePlayer) => {
        try {
            changeVideo(event);
            event.target.unMute();
            event.target.setVolume(100);
            event.target.playVideo();
            setDuration(event.target.getDuration());
            setVideoLoading(false);

        } catch (error) {
            console.log(error);
        }
    }

    const handleSkip = () => {
        let newSong: youtube_v3.Schema$PlaylistItem;
        if (list?.items) {
            newSong = list.items[
                (song?.snippet?.position === list?.pageInfo?.totalResults! - 1)
                    ? 0 : song?.snippet?.position! + 1
            ];
        } else {
            newSong = song as youtube_v3.Schema$PlaylistItem;
        }
        changeSong(newSong);
    }

    const handlePrevious = () => {
        let newSong : youtube_v3.Schema$PlaylistItem;
        if(list?.items){
          newSong = list.items[
            (song?.snippet?.position === 0) 
            ? list?.pageInfo?.totalResults! - 1 : song?.snippet?.position! - 1 
          ];
        }else{
          newSong = song as youtube_v3.Schema$PlaylistItem;
        }
        changeSong(newSong);
    }

    const handleTogglePlay = () => {
        if (play) {
            videoElement.target.pauseVideo();
        } else {
            videoElement.target.playVideo();
        }
        setPlay(prev => !prev);
    }

    const _onChange = (event: YouTubePlayer) => {
        switch (event.data) {
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
        if (videoElement) {
            const time = parseFloat(e.target.value);
            videoElement.target.seekTo(time, true);
            setSongProgress(prev => ({ x: time }));
        }
    }

    const handleOpenToLargePlayer = () => {
        const playlistId = list?.items![0].snippet?.playlistId as string ?? "";
        const params = new URLSearchParams({
            name : playlistName
        })
        router.push(`/playlist/${playlistId}?${params}`);
    }

    const resetContext = () => {
        setSong(null);
        SetVideoElement(null);
        setList(null);
        setPlaylistName("null");
        setDuration(0);
        setSongProgress({x : 0})
        intervalRef.current = null;
    }



    const changeSong = (song: youtube_v3.Schema$PlaylistItem | null) => setSong(song)

    const changeVideo = (video: YouTubePlayer) => SetVideoElement(video);

    const handleList = (list : youtube_v3.Schema$PlaylistItemListResponse | null) => setList(list);

    const handlePlayListName = useCallback((name : string) => setPlaylistName(name), []);

    const opts = {
        height: "0",
        width: "0",
        playerVars: {
            autoplay: 1,
        },
    };

    const value = {
        song,
        contextList : list,
        changeSong,
        videoElement,
        changeVideo,
        play,
        handleTogglePlay,
        videoLoading,
        handleSeek,
        handleSkip,
        handlePrevious,
        songProgress,
        duration,
        handleList,
        handlePlayListName,
        handleOpenToLargePlayer,
        resetContext,
    }

    return (
        <songContext.Provider value={value}>
            {children}
            {song && <YouTube
                videoId={song.snippet?.resourceId?.videoId as string}
                opts={opts}
                onReady={_onReady}
                onStateChange={_onChange}
            />}
        </songContext.Provider>
    )
}