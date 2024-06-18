'use client'

import { SearchContext } from "@/app/lib/SearchContext"
import { songContext } from "@/app/lib/SongContext";
import { youtube_v3 } from "googleapis";
import { useContext } from "react"



export default function SearchResult(){

    const {
        result,
        isLoading,
        handleNewPlaylist
    } = useContext(SearchContext)!;

    const {
        changeSong
    } = useContext(songContext)!;


    const changeToPlayListItem = (item : youtube_v3.Schema$SearchResult) => {
        const tempPlaylistItem : youtube_v3.Schema$PlaylistItem = {
            id: item.id?.videoId,
            snippet: {
                resourceId: {
                    kind: 'youtube#video',
                    videoId: item.id?.videoId,
                },
                title: item.snippet?.title,
                thumbnails: item.snippet?.thumbnails,
                videoOwnerChannelTitle : item.snippet?.channelTitle,
                position: 0,

            }
        }
        changeSong(tempPlaylistItem);
    }

    

    if(isLoading) return (
        <div className="flex-1 bg-[#3B4131] flex justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    )

    return(
        <div>
            {result?.items?.map((item) => (
                <div 
                    key={item.id?.videoId as string}
                    className="w-full h-20 flex items-center justify-center border-[1px] flex-1 cursor-pointer"
                    onClick={() => {
                        handleNewPlaylist(item.id?.videoId ?? "", item.snippet?.title ?? "Mix");
                        changeToPlayListItem(item);
                        }}>
                    {item.snippet?.title}
                </div>
            ))}
        </div>
    )
}