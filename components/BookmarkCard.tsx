"use client "

import { Bookmark } from "@/types/bookmark"

interface BookmarkCardProps {
    bookmark:Bookmark,
    onDelete : (id:string) => void
}

export default function BookmarkCard({bookmark, onDelete}:BookmarkCardProps) {
    const formatDate = (date:Date) =>{
        return new Date(date).toLocaleDateString("en-US",{
            year: "numeric",
            month: "short",
            day: "numeric"
        })
    }

    const getDomain = (url:string) =>{
        try{
            const domain = new URL(url).hostname;
            return domain.replace("www.","")
        } catch (err){
            return "Invalid URL"
        }
    }

    return <div className="bookmark-card">
        <div className="bookmark-actions">
            <button onClick={()=>onDelete(bookmark.id)} className="action-btn delete" title="Delete Bookmark">🗑️</button>
        </div>
        <h3 className="bookmark-title">
            {bookmark.title}
        </h3>
        <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="bookmark-url" >{bookmark.url} </a>

        <p className="bookmark-meta">
            {getDomain(bookmark.url)} - {formatDate(bookmark.createdAt)}
        </p>

        {bookmark.notes && <div className="notes-section">
            <p className="notes-content">
                {bookmark.notes}
            </p>
        </div>
            }
    </div>
}