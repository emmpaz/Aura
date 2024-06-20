'use server'
import { useCallback, useEffect, useState } from "react";
import YouTube, { YouTubePlayer } from "react-youtube";
import { getGeneralPlaylists, getList, getPopularPlaylists, get_mixes, get_playlists, hasYouTubeTokenANDValid } from "./actions/youtube.action";
import { youtube_v3 } from "googleapis";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import MusicList from "./components/Playlist/MusicList";
import { getAccessToken, getSession } from "@auth0/nextjs-auth0";
import LinkYoutubeButton from "./components/Home/YouTubeLink";
import Navigation from "./components/Common/Nav";
import PlaylistList from "./components/Home/PlaylistList";
import { storeGoogleRefreshToken } from "./actions/auth0.action";
import { cookies } from "next/headers";
import LinkYoutube from "./components/Home/YouTubeLink";
import BottomPlayer from "./components/Players/BottomPlayer";
import JustPlay from "./components/Home/JustPlay";

export default async function Home() {
  const playlists = await get_playlists();
  const genre = await getGeneralPlaylists();
  const isLinked = await hasYouTubeTokenANDValid();
  const test = await getPopularPlaylists();
  
  
  return (
    <div className="min-h-screen w-full bg-[#3B4131] flex flex-col">
      <Navigation isLinked={isLinked}/>
      <JustPlay/>
      <PlaylistList list={playlists} genre={genre} test={test}/>
      <BottomPlayer/>
      {!isLinked && <LinkYoutube/>}
    </div>
  )
}
