'use server'
import { getSession } from "@auth0/nextjs-auth0";
import { createManagementClient } from "../lib/auth0"



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