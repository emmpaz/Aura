'use server'
import { useCallback, useEffect, useState } from "react";
import YouTube, { YouTubePlayer } from "react-youtube";
import { getList, get_playlists, hasYouTubeTokenANDValid } from "./actions/youtube.action";
import { youtube_v3 } from "googleapis";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import MusicList from "./components/playlist/MusicList";
import { getAccessToken, getSession } from "@auth0/nextjs-auth0";
import LinkYoutubeButton from "./components/home/YouTubeLink";
import Navigation from "./components/home/Nav";
import PlaylistList from "./components/home/PlaylistList";
import { storeGoogleRefreshToken } from "./actions/auth0.action";
import { cookies } from "next/headers";
import LinkYoutube from "./components/home/YouTubeLink";

export default async function Home() {
  const playlists = await get_playlists();
  const isLinked = await hasYouTubeTokenANDValid();
  
  return (
    <div className="min-h-screen w-full bg-[#3B4131] flex flex-col">
      <Navigation isLinked={isLinked}/>
      <PlaylistList list={playlists}/>
      {!isLinked && <LinkYoutube/>}
    </div>
  )
}
