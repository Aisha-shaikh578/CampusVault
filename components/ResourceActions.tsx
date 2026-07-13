'use client';

import React, { useEffect, useState } from 'react'
import Button from "@/components/Button";
import { BiDownload, BiShare } from "react-icons/bi";
import { RiBookMarkedFill } from "react-icons/ri";
import { useAuth } from '@/context/authContext';
import { addBookmark, isBookmarked, removeBookmark } from '@/services/bookmarkService';
import { ResourceActionProps } from '@/types/resourceType';
import { TiTick } from 'react-icons/ti';


export default function ResourceActions({ resourceId }: ResourceActionProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const { user } = useAuth();

  const handleBookmark = async() => {
    if(!user) return;

    if(bookmarked) {
      await removeBookmark(user.uid, resourceId);
      setBookmarked(false);
    } else {
      await addBookmark(user.uid, resourceId);
      setBookmarked(true);
    }
  }

  useEffect(() => {
    if(!user) return;

    const checkBookmarkStatus = async () => {
      const status = await isBookmarked(user.uid, resourceId);
      setBookmarked(status);
    };
    checkBookmarkStatus();
  }, [user, resourceId]);

  return (
   <div className="mt-6">
      <h2 className="font-semibold text-lg mb-3">
        Actions
      </h2>

      <div className="flex flex-wrap gap-4">
        <Button text="Download" icon={<BiDownload size={18}/>}/>

        <Button text="Share" icon={<BiShare size={18}/>}/>

        <Button 
        text={`${bookmarked === true ? 'Bookmarked' : 'Bookmark'}`} 
        icon={bookmarked === true ? <TiTick size={24}/> : <RiBookMarkedFill size={18}/>}
        onClick={handleBookmark}/>
      </div>
    </div>
  )
}
