"use client"

import {useEffect, useState} from "react"
import {Bookmark, CreateBookmarkData} from "@/types/bookmark"


export function useBookmarks() {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchBookmarks();
    }, [])
    
    const fetchBookmarks = async () => {
        try {
            setError(null)
            const response = await fetch("/api/bookmarks")

            if (!response.ok) {
                throw new Error("Failed to fetch bookmarks")
            }

            const data = await response.json()
            setBookmarks(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        } finally {
            setLoading(false)
        }
    }

    const addBookmark = async (data: CreateBookmarkData) => {
        try {
            setError(null)
            const response = await fetch("/api/bookmarks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error("Failed to add bookmark")
            }

            const newBookmark = await response.json()
            setBookmarks((prev) => [newBookmark, ...prev])
            return newBookmark;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An error occurred"
            setError(errorMessage)
        }
    }

    const deleteBookmark = async (id: string) => {
        try {
            setError(null)
            const response= await fetch(`/api/bookmarks/${id}`, {method: "DELETE"})

            if (!response.ok) {
                throw new Error("Failed to delete bookmark")
            }

            setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id))
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An error occurred"
            setError(errorMessage)
        }
    }

    return {
        bookmarks,
        loading,
        error,
        addBookmark,
        deleteBookmark,
        refetch: fetchBookmarks
    }
}