import { google } from "googleapis";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
import {serialize} from 'cookie';
import { storeGoogleRefreshToken } from "@/app/actions/auth0.action";
import { createOAuth2Client } from "@/app/lib/youtube";

export async function GET(request: NextRequest) {
  let code;
  let scope;

  const oauth2Client = await createOAuth2Client();

  const {searchParams} = request.nextUrl;

  if(searchParams){
    code = searchParams.get('code');
    scope = searchParams.get('scope');
  }

  if(!code){
    const authUrl = oauth2Client.generateAuthUrl({
      prompt: 'consent',
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/youtube.readonly'
      ]
    });
    return NextResponse.redirect(authUrl);
  }
  const {tokens} = await oauth2Client.getToken(code);
  const {refresh_token} = tokens;

  await storeGoogleRefreshToken(refresh_token ?? "");

  return redirect('/');

}