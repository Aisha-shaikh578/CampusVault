'use client';

import React, { useEffect, useState } from 'react'
import Button from "@/components/Button";
import { BiDownload, BiShare } from "react-icons/bi";
import { RiBookMarkedFill } from "react-icons/ri";
import { useAuth } from '@/context/authContext';
import { addBookmark, isBookmarked, removeBookmark } from '@/services/bookmarkService';
import { ResourceActionProps } from '@/types/resourceType';
import { TiTick } from 'react-icons/ti';
import { fetchResourceById } from '@/services/resourceService';
import { toast } from 'react-hot-toast';


export default function ResourceActions({ resourceId }: ResourceActionProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
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

   const handleDownload = async () => {
    if (isDownloading) return;

    setIsDownloading(true);

    try {
      const resource = await fetchResourceById(resourceId);

      if (!resource?.fileUrl) {
        toast.error('File information not available.');
        return;
      }

      const response = await fetch(resource.fileUrl);

      if (!response.ok) {
        throw new Error('Failed to download file.');
      }

      const blob = await response.blob();

      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = downloadUrl;
      const fileName = resource.fileUrl.split('/').pop()?.split('?')[0] || 'download';
      link.download = fileName;

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(downloadUrl);

      setDownloaded(true);
      toast.success('Resource Downloaded!')
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Download failed.');
    } finally {
      setIsDownloading(false);
    }
  }

  const handleShare = async () => {
    try {
      const resource = await fetchResourceById(resourceId);

      if (!resource?.fileUrl) {
        toast.error('Resource link not available.');
        return;
      }

      if (navigator.share) {
        try {
          await navigator.share({
            title: resource.title,
            url: resource.fileUrl.toString(),
          });
          return;
        } catch (error) {
          if (error instanceof DOMException && error.name === 'AbortError') {
            return;
          }
        }
      }

      await navigator.clipboard.writeText(resource.fileUrl.toString());
      toast.success('Resource link copied!');
    } catch (error) {
      console.error('Share error:', error);
      toast.error('Unable to share or copy the resource link.');
    }
  }


  return (
   <div className="mt-6">
      <h2 className="font-semibold text-lg mb-3">
        Actions
      </h2>

      <div className="flex flex-wrap gap-4">
        <Button 
        text={downloaded ? 'Downloaded' : 'Download'} 
        icon={downloaded ? <TiTick size={24}/> : <BiDownload size={18}/>} 
        onClick={handleDownload}/>

        <Button text="Share" 
        icon={<BiShare size={18}/>} 
        onClick={handleShare}/>

        <Button 
        text={`${bookmarked === true ? 'Bookmarked' : 'Bookmark'}`} 
        icon={bookmarked === true ? <TiTick size={24}/> : <RiBookMarkedFill size={18}/>}
        onClick={handleBookmark}/>
      </div>
    </div>
  )
}