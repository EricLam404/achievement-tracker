import { getAccessToken, getSession } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

const EXTERNAL_API_URL = "http://localhost:5001";

export async function POST(req) {
    const res = new NextResponse();
    const { accessToken } = await getAccessToken(req, res);
    const { refreshToken } = await getSession(req, res);
    const body = await req.json();
    
    return await fetch(`${EXTERNAL_API_URL}/api/users/metadata/${refreshToken}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
}