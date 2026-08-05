import { useAuth } from '@/context/authContext'
import React from 'react'

export default function ProfilePicture() {
  const { profilePic } = useAuth();

  return (
   <img
    src={profilePic}
    alt="Profile preview"
    className="h-full w-full object-cover"
    />
  )
}
