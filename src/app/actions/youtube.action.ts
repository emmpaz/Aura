'use server'
import { google } from "googleapis"
import { cookies } from "next/headers"
import { getRefreshTokenFromMetaData } from "./auth0.action"
import { createOAuth2Client } from "../lib/youtube";


export async function hasYouTubeTokenANDValid(){
    const token = await getRefreshTokenFromMetaData();
    const oauth2Client = await createOAuth2Client();

    if(!token) return false;

    try{
        oauth2Client.setCredentials({refresh_token: token});
        const {token: access} = await oauth2Client.getAccessToken();
        return !!access;
    }catch(error){
        return false;
    }
}

export const getList = async (id : string) => {
    const refresh = await getRefreshTokenFromMetaData();
    const oauth2Client = await createOAuth2Client();

    if(!refresh) return null;

    const youtube = google.youtube({
        version: 'v3',
      });
    
    let access;
    try{
        oauth2Client.setCredentials({refresh_token: refresh ?? ""});
        access = await oauth2Client.getAccessToken();
    }catch(error){
        return null
    }

    if(!access.token) return null;
    

    const res = await youtube.playlistItems.list({
        part: ['snippet'],
        playlistId: id,
        maxResults: 1000,
        access_token: access.token
    });
    return res.data;
}

export const get_playlists = async () => {
    const refresh = await getRefreshTokenFromMetaData();
    const oauth2Client = await createOAuth2Client();

    if(!refresh) return null;

    const youtube = google.youtube({
        version: 'v3',
      });
    
    let access;
    try{
        oauth2Client.setCredentials({refresh_token: refresh ?? ""});
        access = await oauth2Client.getAccessToken();
    }catch(error){
        return null
    }

    if(!access.token) return null;

    const res = await youtube.playlists.list({
        part: ['snippet'],
        maxResults: 1000,
        access_token: access.token,
        mine: true
    })
    return res.data
}