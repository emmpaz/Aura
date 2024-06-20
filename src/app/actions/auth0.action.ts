'use server'
import { getSession } from "@auth0/nextjs-auth0";
import { createManagementClient } from "../lib/auth0"
import { jwtDecode } from "jwt-decode";
import { PlaylistSchedule } from "./playlistSchedule.action";



export const storeGoogleRefreshToken = async(refreshToken : string) => {
    const auth0client = await createManagementClient();
    const session = await getSession();

    try{
        await auth0client.users.update({id: session?.user.sub}, {
            user_metadata: {
                refreshToken
            }
        });
        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}

export const deleteGoogleRefreshToken = async() => {
    const auth0client = await createManagementClient();
    const session = await getSession();

    try{
        await auth0client.users.update({id: session?.user.sub}, {
            user_metadata: {}
        });
        return true;
    }catch(error){
        return false;
    }
}
/**
 * grab refresh token from user meta data using a management client
 * to avoid adding to id token we have to query the user by id then add.
 * @returns google refresh token | null
 */
export const getRefreshTokenFromMetaData = async () => {
    const auth0client = await createManagementClient();
    const session = await getSession();
    
    try{
        const user = await auth0client.users.get({id: session?.user.sub})
        const token = user.data.user_metadata.refreshToken;
        if(token){
            return token;
        }
        return null;
    }catch(error){
        return null;
    }
}

const getPlaylistScheduleFromIDToken = async (IDtoken : string) => {
    const decoded = jwtDecode(IDtoken) as {
        'playlistSchedule' : PlaylistSchedule | null;
        [key : string] : any;
    };
    
    if(decoded.playlistSchedule) return decoded.playlistSchedule;

    return null;
}

export const getScheduleFromMetaData = async () => {
    const session = await getSession();

    try{
        const schedule = await getPlaylistScheduleFromIDToken(session?.idToken as string);
        
        if(schedule) return schedule;

        return null;
    }catch(error){
        console.log(error);
        return null;
    }
}