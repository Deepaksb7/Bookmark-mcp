"use client"

import { Bookmark } from "@/types/bookmark"
import BookmarkCard from "./BookmarkCard"

interface BookmarkListProps {
    bookmarks: Bookmark[],
    onDelete: (id: string) => void
}

export default function BookmarkList({ bookmarks, onDelete }: BookmarkListProps) {
    if (bookmarks.length === 0) {
        return <div className="empty-state">
            <div className="empty-icon">
                📑
            </div>
            <h3>No bookmarks available yet</h3>
            <p className="empty-text">Add your first bookmark to get started.</p>
        </div>
    }

    return (
        <div>
            <div className="bookmark-grid">
                {bookmarks.map((bookmark) => (
                    <BookmarkCard key={bookmark.id} bookmark={bookmark} onDelete={onDelete} />
                ))}
            </div>
        </div>
    )
}