'use client';

import { BiSend } from "react-icons/bi";
import React, { useEffect, useState } from 'react'
import { CommentTypes } from "@/types/commentTypes";
import { addComment, getComments } from "@/services/comments";
import { useAuth } from "@/context/authContext";
import { formatDistanceToNow } from "date-fns";
import { CommentSectionProps } from "@/types/commentTypes";
import ProfilePicture from "./ProfilePicture";
import { FiUser } from "react-icons/fi";
import { toast } from "react-hot-toast";
 

 export default function CommentSection({resourceId}: CommentSectionProps) {
  const { user, profilePic } = useAuth();
  const [inputComment, setInputComment] = useState('');
  const [comments, setComments] = useState<CommentTypes[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if(!user) return;

    const fetchComments = async() => {
    const data = await getComments(resourceId);
    setComments(data);
    }
    fetchComments();
  }, [resourceId, user]);

  const handleAddComment = async () => {
    if (!user || !inputComment.trim() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      await addComment(resourceId, inputComment, user, profilePic);
      setInputComment('');
      const data = await getComments(resourceId);
      setComments(data);
      toast.success('Comment added successfully!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">
        Comments ({comments.length})
      </h2>

      <div className="space-y-5">
        {comments.map((comment, idx) => (
          <div key={comment.id || idx} className="flex gap-3">
            <div className="bg-gray-300 rounded-full overflow-hidden h-8 w-8">
              {comment.userProfilePic ?
              <ProfilePicture userProfilePic={comment.userProfilePic}/> :
              <div className="flex h-full w-full items-center justify-center bg-(--surface-variant)">
                <FiUser className="h-6 w-6 text-(--text-secondary)" />
              </div>
              }
            </div>

            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-medium">
                  {comment.username || 'Anonymous'}
                </h3>

                <span className="text-sm text-(--text-secondary)">
                  {`${formatDistanceToNow(comment.createdAt.toDate())} ago`}
                </span>
              </div>

              <p className="text-(--text-primary) mt-1">
                {comment.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Comment */}
      <div className="mt-8 flex gap-3">
        <input
          type="text"
          value={inputComment}
          onChange={(e) => setInputComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 border border-(--border) rounded-lg px-4 py-3 bg-(--surface) text-(--text-primary) focus:outline-none focus:ring-1 focus:ring-(--primary)"
        />

        <button 
        className="bg-(--primary) text-(--on-primary) px-5 rounded-lg hover:bg-(--primary-hover) hover:opacity-80 transition cursor-pointer"
        onClick={handleAddComment}
        disabled={isSubmitting || !user || !inputComment.trim()}>
          <BiSend size={18} />
        </button>
      </div>
  </div>
   )
 }