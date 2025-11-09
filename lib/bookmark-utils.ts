import { PrismaClient, Bookmark } from "../app/generated/prisma";
import { CreateBookmarkData } from "@/types/bookmark";

const prisma = new PrismaClient();


export async function getUserBookmarks(userId: string): Promise<Bookmark[]> {
    try {
        const bookmarks = await prisma.bookmark.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return bookmarks;
    } catch (error) {
        console.error("Error fetching bookmarks:", error);
        throw new Error("Failed to fetch bookmarks");
    }
}

export async function createUserBookmark(userId: string, data: CreateBookmarkData): Promise<Bookmark> {
    try {
        if (!data.url || !data.title) {
            throw new Error("URL and title are required");
        }

        const bookmark = await prisma.bookmark.create({
            data: {
                url: data.url,
                title: data.title,
                notes: data.notes || "",
                userId
            }
        })
        return bookmark;
    } catch (error) {
        console.error("Error creating bookmark:", error);
        throw new Error("Failed to create bookmark");
    }
}

export async function deleteUserBookmark(userId: string, bookmarkId: string): Promise<boolean> {
    try {
        const bookmark = await prisma.bookmark.findFirst({
            where: {
                id: bookmarkId,
                userId
            }
        })

        if (!bookmark) {
            throw new Error("Bookmark not found or access denied");
        }

        await prisma.bookmark.delete(
            {
                where: {id: bookmarkId}
            }
        )
        return true;
    } catch (error) {
        console.error("Error deleting bookmark:", error);
        throw new Error("Failed to delete bookmark");
    }
}





