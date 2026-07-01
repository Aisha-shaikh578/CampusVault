import { Timestamp } from "firebase/firestore";

export interface Resource {
  id: string,
  title: string,
  category: string,
  resourceType: 'PDF' | 'Link' | 'Doc',
  fileUrl: string,
  uploadedAt: Timestamp,
  uploadedBy: UploadedBy
}

export interface UploadedBy {
  uid: string,
  name: string,
  email: string
}