import { NextResponse, type NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
    console.log("check");
    return new Response(null, {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
        statusText: "OK",
    });
};
