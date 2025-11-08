import { NextRequest, NextResponse } from "next/server";
import {auth} from "@clerk/nextjs/server";
import { getUserBookmarks, createUserBookmark} from "@/lib/bookmark-utils";

export async function GET(){
    try {
        const {userId} = await auth()
        if (!userId){
            return NextResponse.json({error:"Unauthorized"}, {status:401});
        }
        const bookmarks = await getUserBookmarks(userId);
        return NextResponse.json(bookmarks, {status:200});
    } catch (error) {
        console.error("Error getting bookmarks:", error);
        return NextResponse.json({error:"Failed to get bookmarks"}, {status:500});
    }
}

export async function POST(request: NextRequest){
    try {
        const {userId} = await auth()
        console.log("Auth userId:", userId)
        if (!userId){
            return NextResponse.json({error:"Unauthorized"}, {status:401});
        }
        const body = await request.json()
        const {url, title, notes} = body;

        if (!url || !title){
            return NextResponse.json({error:"URL and title are required"}, {status:400});
        }
        const bookmark = await createUserBookmark(userId, {url, title, notes});
        return NextResponse.json(bookmark, {status:201});
    } catch (error) {
        console.error("Error creating bookmarks:", error);
        return NextResponse.json({error:"Failed to create bookmark"}, {status:500});
    }
}