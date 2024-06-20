'use server'
import { google } from "googleapis"
import { cookies } from "next/headers"
import { getRefreshTokenFromMetaData } from "./auth0.action"
import { createOAuth2Client } from "../lib/youtube";
import NodeCache from "node-cache";
import Bottleneck from "bottleneck";

const cache = new NodeCache({stdTTL: 600});

const limiter = new Bottleneck({
    minTime: 100,
    maxConcurrent: 1
});

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

export const get_mixes = async () => {
    const refresh = await getRefreshTokenFromMetaData();
    const oauth2Client = await createOAuth2Client();

    const ids = [
        'RDTMAK5uy_nGQKSMIkpr4o9VI_2i56pkGliD6FQRo50',
        'RDTMAK5uy_lz2owBgwWf1mjzyn_NbxzMViQzIg8IAIg',
        'RDTMAK5uy_k5UUl0lmrrfrjMpsT0CoMpdcBz1ruAO1k',
        'RDTMAK5uy_moBoT_VVdgxH0hIqhcSGzGMOIDqKt-g34',
        'RDTMAK5uy_kddCK20Aa8IItro4abs9ettQq6bE6kRMM',
        'RDTMAK5uy_kset8DisdE7LSD4TNjEVvrKRTmG7a56sY'
    ]

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
        id: ids,
        access_token: access.token,
    })

    return res.data;
}


export const searchYoutube = async (input : string) => {
    
    const cacheKey = `youtube_search_${input}`;
    const cachedResult = cache.get(cacheKey);

    if(cachedResult) return cachedResult;

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

    const rateLimited = limiter.wrap(async () => {
        const res = await youtube.search.list({
            part:['snippet'],
            q: input,
            type: ['video'],
            access_token: access.token as string,
            maxResults: 10
        });
        return res.data;
    });

    try{
        const result = await rateLimited();

        cache.set(cacheKey, result);

        return result;
    }catch(error){
        return null
    }
}

export const generateNewPlaylist = async (videoID : string) => {
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
        id: [`RD${videoID}`],
        maxResults: 1000,
        access_token: access.token,
    })

    return res.data;
}


export const getPopularPlaylists = async () => {
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
        access_token: access.token,
        maxResults: 50,
        id: ['RDCLAK5uy_lBNUteBRencHzKelu5iDHwLF6mYqjL-JU',
            'RDCLAK5uy_kmPRjHDECIcuVwnKsx2Ng7fyNgFKWNJFs',
            'RDCLAK5uy_lBGRuQnsG37Akr1CY4SxL0VWFbPrbO4gs',
            'RDCLAK5uy_lJ8xZWiZj2GCw7MArjakb6b0zfvqwldps',
            'RDCLAK5uy_m0Nsi5Jnn_g6qbvc7fywPRhEv1qN0PcMM'
        ]
    })

    return res.data;
}

export const getGeneralPlaylists = async () => {
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
        access_token: access.token,
        maxResults: 50,
        id: ['RDCLAK5uy_kb7EBi6y3GrtJri4_ZH56Ms786DFEimbM',
            'RDCLAK5uy_mPolD_J22gS1SKxufARWcTZd1UrAH_0ZI',
            'RDCLAK5uy_mEgZl9zsBOcaP1iAdShTQpoRDeDpPRkyY',

        ]
    })

    return res.data;
}