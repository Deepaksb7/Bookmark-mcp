"use client"
import { useState } from "react";
import { SignedIn,SignedOut } from "@clerk/nextjs";
import { useBookmarks } from "@/hooks/useBookMarks";
import { CreateBookmarkData } from "@/types/bookmark";
import styles from "./page.module.css";
import BookmarkForm from "@/components/BookmarkForm";
import BookmarkList from "@/components/BookmarkList";

export default function Home() {
  const {bookmarks,loading,error ,addBookmark, deleteBookmark,refetch} = useBookmarks()
  const [showAddForm,setShowAddForm]= useState(false)
  const [isSubmitting,setIsSubmitting] = useState(false)

  const handleAddBookmark = async (data:CreateBookmarkData) =>{
    try{
      setIsSubmitting(true)
      await addBookmark(data)
      setShowAddForm(false)
    }catch (err){
      console.log("failsed to add bookmark",err)
    }finally{
      setIsSubmitting(false)
    }
  }

  const handleDeleteBookmark = async (id:string) =>{
    if (confirm("Are you sure you want to delete this bookmark?")){
      try{
        await deleteBookmark(id)
      }catch(err){
        console.log("failed to delete the bookmark",err)
      }
    }
  }

  if (loading){
    return <div className="loading-container">
      <div className="loading-content">
        <div className="loading-spinner">
          <p>
            Loading Bookmarks..
          </p>
        </div>
      </div>
    </div>
  }

  return (
    <div>
      <SignedIn>
        <div className="container">
          <div className={styles["page-header"]}>
            <div className={styles["header-content"]}>
              <div className={styles["header-text"]}>
                <h1>
                  Bookmark Manager
                </h1>
                <p>
                  Organize and manage your bookmarks
                </p>
              </div>
              <div className={styles["header-button"]}>
                <button className="btn btn-primary" onClick={()=>setShowAddForm(!showAddForm)}>{showAddForm ? "Cancel":"Add Bookmark"}</button>
              </div>
            </div>
          </div>
        </div>

        {error && <div className={styles["error-message"]}>
            <p>
              Error : {error}
            </p>
            <button onClick={refetch} className="btn btn-secondary">
              Retry
            </button>
          </div>}

          {showAddForm && <div className={styles["form-section"]}>
            <BookmarkForm onSubmit={handleAddBookmark} isSubmitting={isSubmitting} />
            </div>}

          <BookmarkList bookmarks={bookmarks} onDelete={handleDeleteBookmark} />

      </SignedIn>
      <SignedOut>
        <div className={styles["signout-container"]}> 
          <div className={styles["signout-content"]}>
            <p className={styles["signout-text"]}>
              Please sign in to manage your bookmarks
            </p>
          </div>
        </div>
      </SignedOut>
    </div>
  );
}

