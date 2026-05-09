import { subscriptions } from "@/const/global"
import { NextResponse } from "next/server"


export async function POST(req: Request) {
    const body = await req.json()

    subscriptions.push(body)


    return NextResponse.json({
        success: true
    })
}