import { getAccessToken } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

export async function GET(req) {
    const res = new NextResponse();
    const { accessToken } = await getAccessToken(req, res);
    const path = req.nextUrl.pathname.replace("/api/", "");
    const EXTERNAL_API_URL = "http://localhost:5001";

    return await fetch(
        `https:/${EXTERNAL_API_URL}/${path}${req.nextUrl.search}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
}
