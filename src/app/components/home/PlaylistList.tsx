'use client'
import { youtube_v3 } from "googleapis";
import Link from "next/link";
import { useRef } from "react";
import { FaChevronLeft, FaPlay } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import { IoAccessibilityOutline } from "react-icons/io5";


export default function PlaylistList(
    {
        list,
        genre,
        test
    }: {
        list: youtube_v3.Schema$PlaylistListResponse | null,
        genre: youtube_v3.Schema$PlaylistListResponse | null,
        test: youtube_v3.Schema$PlaylistListResponse | null
    }
) {

    const workRef = useRef<HTMLDivElement>(null);
    const popularRef = useRef<HTMLDivElement>(null);
    const playlistRef = useRef<HTMLDivElement>(null);

    const returnCorrectImage = (playlist: youtube_v3.Schema$Playlist) => {
        const imageWidth = playlist.snippet?.thumbnails?.maxres?.width;
        const imageLength = playlist.snippet?.thumbnails?.maxres?.height;

        if (imageLength === imageWidth) {
            return (
                <div className="mx-auto overflow-hidden w-[400px] h-[400px] m-4 mb-1 rounded-xl relative">
                    <Link href={`/playlist/${playlist.id}?name=${playlist.snippet?.title}`}>
                        <img
                            className="w-full cursor-pointer"
                            src={
                                (playlist.snippet?.thumbnails?.maxres) ?
                                    playlist.snippet.thumbnails.maxres.url as string : playlist.snippet?.thumbnails?.standard?.url as string
                            }
                        />
                    </Link>
                </div>
            )
        }
        return (
            <div className="mx-auto overflow-hidden w-[400px] h-[400px] m-4 mb-1 rounded-xl relative">
                <Link href={`/playlist/${playlist.id}?name=${playlist.snippet?.title}`}>
                    <img
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-auto w-[707px] max-w-none cursor-pointer"
                        src={
                            (playlist.snippet?.thumbnails?.maxres) ?
                                playlist.snippet.thumbnails.maxres.url as string : playlist.snippet?.thumbnails?.standard?.url as string
                        }
                    />
                </Link>
            </div>
        )
    }

    const scroll = (ref : React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
        if(ref.current){
            const container = ref.current;
            const scrollAmount = container.clientWidth / 2;
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
        }
    }



    return (
        list &&
        <div className="w-full flex flex-col pb-10">
            <div className="px-5 py-10">
                <div className="text-7xl font-medium flex justify-between items-center">
                    <h1>Simple</h1>
                    <div className="flex">
                        <FaChevronLeft
                            onClick={() => scroll(workRef, 'left')}
                            size={40} 
                            className=" cursor-pointer hover:bg-[#4E5444] rounded p-2"/>
                        <FaChevronRight 
                            onClick={() => scroll(workRef, 'right')}
                            size={40} 
                            className=" cursor-pointer hover:bg-[#4E5444] rounded p-2"/>
                    </div>
                </div>
                <div 
                    ref={workRef}
                    className="flex overflow-y-auto no-scrollbar relative">
                    {genre?.items?.map((playlist) => (
                        <div className="flex flex-col mx-5" key={playlist.id as string}>
                            {returnCorrectImage(playlist)}
                            <div className="m-auto">
                                <p>{playlist.snippet?.title}</p>
                            </div>
                        </div>
                    ))}
                    
                </div>
            </div>
            <div className="px-5 py-10">
                <div className="text-7xl font-medium flex justify-between items-center">
                    <h1>Popular</h1>
                    <div className="flex">
                        <FaChevronLeft 
                            onClick={() => scroll(popularRef, 'left')}
                            size={40} 
                            className=" cursor-pointer hover:bg-[#4E5444] rounded p-2"/>
                        <FaChevronRight 
                            onClick={() => scroll(popularRef, 'right')}    
                            size={40} 
                            className=" cursor-pointer hover:bg-[#4E5444] rounded p-2"/>
                    </div>
                </div>
                <div
                    ref={popularRef} 
                    className="flex overflow-y-auto no-scrollbar relative">
                    {test?.items?.map((playlist) => (
                        <div className="flex flex-col mx-5" key={playlist.id as string}>
                            {returnCorrectImage(playlist)}
                            <div className="m-auto">
                                <p>{playlist.snippet?.title}</p>
                            </div>
                        </div>
                    ))}
                    
                </div>
            </div>
            <div className="px-5 py-10">
                <div className="text-7xl font-medium flex justify-between items-center">
                    <h1>Your Playlists</h1>
                    <div className="flex">
                        <FaChevronLeft 
                            onClick={() => scroll(playlistRef, 'left')}
                            size={40} 
                            className=" cursor-pointer hover:bg-[#4E5444] rounded p-2"/>
                        <FaChevronRight 
                            onClick={() => scroll(playlistRef, 'right')}
                            size={40} 
                            className=" cursor-pointer hover:bg-[#4E5444] rounded p-2"/>
                    </div>
                </div>
                <div 
                    ref={playlistRef}
                    className="flex overflow-y-auto no-scrollbar">
                    {list?.items?.map((playlist) => (
                        <div className="flex flex-col mx-5" key={playlist.id as string}>
                            <div className="mx-auto overflow-hidden w-[400px] h-[400px] m-4 mb-1 rounded-xl relative">
                                <Link href={`/playlist/${playlist.id}?name=${playlist.snippet?.title}`}>
                                    <img
                                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-auto w-[707px] max-w-none cursor-pointer"
                                        src={
                                            (playlist.snippet?.thumbnails?.maxres) ?
                                                playlist.snippet.thumbnails.maxres.url as string : playlist.snippet?.thumbnails?.standard?.url as string
                                        }
                                    />
                                </Link>
                            </div>
                            <div className="m-auto">
                                <p>{playlist.snippet?.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

}