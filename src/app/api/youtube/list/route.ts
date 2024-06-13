import { getAccessToken, getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";



export const GET = async(req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession(req, res);
    if(!session || !session.user){
        return NextResponse.json('Unauthorized', {status: 401});
    }

    try{
        const auth0AccessToken = await getAccessToken(req, res, {refresh: true});

        return NextResponse.json(auth0AccessToken, {status: 200});

    }catch(error){

    }

    return NextResponse.json('test', {status: 200});
}