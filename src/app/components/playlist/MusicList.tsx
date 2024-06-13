'use client'
import { useCallback, useEffect, useState } from "react";
import YouTube, { YouTubePlayer } from "react-youtube";
import { youtube_v3 } from "googleapis";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import YouTubeSongPlayer from "../home/YoutubePlayer";
import { useSearchParams } from "next/navigation";

export default function MusicList(
  {
  musicList,
  username,
} : {
  musicList: youtube_v3.Schema$PlaylistItemListResponse | null,
  username: string
}
) {

  const params = useSearchParams();
  const playlist_name = params.get('name');

  const [list, setList] = useState<youtube_v3.Schema$PlaylistItemListResponse | null>(musicList ?? null);
  const [song, setSong] = useState<youtube_v3.Schema$PlaylistItem | null>(null);

  const handleSkip = () => {
    console.log(song?.snippet?.position! + 1)
    setSong(prev => {
      if(list?.items){
        return list.items[
          (prev?.snippet?.position === list?.pageInfo?.totalResults! - 1) 
          ? 0 : prev?.snippet?.position! + 1 
      ]
      }
      else{
        return prev
      }
    })
  }

  const handlePrevious = () => {
    setSong(prev => {
      if(list?.items){
        return list.items[
          (prev?.snippet?.position === 0) 
          ? list?.pageInfo?.totalResults! - 1 : prev?.snippet?.position! - 1 
      ]
      }
      else{
        return prev
      }
    })
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      {/* <div>
        {username }
      </div> */}
      <div className={`grid grid-rows-1 ${(song) ? 'lg:grid-cols-2' : ''} w-full max-w-7xl transition-all ease-in-out m-auto`}>
        {song && <YouTubeSongPlayer song={song} handleSkip={handleSkip} handlePrevious={handlePrevious}/>}
        <div className="flex flex-col p-2">
          <div className=" p-5">
            <p className="font-medium text-4xl text-pretty truncate">{playlist_name}</p>
          </div>
        <div className="flex flex-col p-5 max-h-[500px] overflow-y-auto">
          {list?.items?.map((im) => (
            // <div className="mx-auto overflow-hidden w-[200px] h-[200px] m-4 rounded-md" key={im.id}>
            //   <img
            //     className=" h-[268px] object-cover w-auto mt-[-34px] cursor-pointer"
            //     src={im.snippet?.thumbnails?.standard?.url as string}
            //     onClick={() => setSong(im)}
            //   ></img>
            // </div>
              <div 
                className="w-full pl-2 py-6 border-b-[1px] hover:bg-[#4E5444] transition-all ease-in-out rounded cursor-pointer"
                onClick={() => {setSong(im); scrollToTop()}}
                key={im.id as string}
                >
                <div className="flex flex-col">
                  <span>{im.snippet?.title}</span>
                  <span className="font-thin text-xs">{im.snippet?.videoOwnerChannelTitle?.replace('- Topic', '')}</span>
                </div>
              </div>
          ))}
        </div>
        </div>
      </div>  
    </div>
  )
}
