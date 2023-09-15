import { getAccessToken } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

export async function GET(req) {
    const res = new NextResponse();
    const { accessToken } = await getAccessToken(req, res);
    const EXTERNAL_API_URL = "http://localhost:5001";
    const path = req.nextUrl.searchParams.get('route');
    const method = req.nextUrl.searchParams.get('method');
    const request = {
        method: method,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }
    if(method === "POST" || method === "PUT" || method === "PATCh"){
        const body = req.nextUrl.searchParams.get('body');
        request['body'] = JSON.stringify(body);
    }
    return await fetch(`${EXTERNAL_API_URL}/${path}`, request);
}
