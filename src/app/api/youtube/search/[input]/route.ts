import { NextRequest, NextResponse } from "next/server"





export const POST = async (req: NextRequest, res: NextResponse) => {
    return NextResponse.json('hello', {status: 200});
}