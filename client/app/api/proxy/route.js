import { getAccessToken } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

const EXTERNAL_API_URL = "http://localhost:5001";

export async function GET(req) {
    const res = new NextResponse();
    const { accessToken } = await getAccessToken(req, res);
    const path = req.nextUrl.searchParams.get("route");

    return await fetch(`${EXTERNAL_API_URL}/${path}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

export async function POST(req) {
    const res = new NextResponse();
    const { accessToken } = await getAccessToken(req, res);
    const path = req.nextUrl.searchParams.get("route");
    const body = await req.json();
    return await fetch(`${EXTERNAL_API_URL}/${path}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
}

export async function PUT(req) {
    const res = new NextResponse();
    const { accessToken } = await getAccessToken(req, res);
    const path = req.nextUrl.searchParams.get("route");
    const body = await req.json();

    return await fetch(`${EXTERNAL_API_URL}/${path}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
}

export async function DELETE(req) {
    const res = new NextResponse();
    const { accessToken } = await getAccessToken(req, res);
    const path = req.nextUrl.searchParams.get("route");
    const body = await req.json();

    return await fetch(`${EXTERNAL_API_URL}/${path}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
}
