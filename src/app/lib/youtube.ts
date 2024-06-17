'use server'
import { google } from "googleapis";
import { cookies } from "next/headers";
import { getRefreshTokenFromMetaData } from "../actions/auth0.action";


export const createOAuth2Client = async () => {
    const oauth2Client = new google.auth.OAuth2({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        redirectUri: process.env.AUTH_CALLBACK
    })
    return oauth2Client;
}
