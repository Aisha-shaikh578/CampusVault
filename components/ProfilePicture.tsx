import { useAuth } from '@/context/authContext'
import React from 'react'

interface userProfilePicProps {
  userProfilePic?: string
}

export default function ProfilePicture({userProfilePic}: userProfilePicProps) {
  const { profilePic } = useAuth();

  return (
   <img
    src={userProfilePic ?? profilePic}
    alt="Profile preview"
    className="h-full w-full object-cover"
    />
  )
}
