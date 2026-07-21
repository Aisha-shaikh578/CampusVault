import { Timestamp } from "firebase/firestore"

export interface CommentSectionProps{
  resourceId: string
}

export interface CommentTypes{
  id: string,
  text: string,
  username: string,
  userUid: string,
  createdAt: Timestamp
}