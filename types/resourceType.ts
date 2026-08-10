import { Timestamp } from "firebase/firestore";

export interface Resource {
  id: string,
  title: string,
  category: string,
  resourceType: 'PDF' | 'Link' | 'Doc',
  fileUrl: string,
  uploadedAt: Timestamp,
  uploadedBy: UploadedBy,
  userProfilePic: string
}

export interface UploadedBy {
  uid: string,
  name: string,
  email: string
}

export interface ResourceActionProps {
  resourceId: string
}