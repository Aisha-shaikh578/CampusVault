import { Timestamp } from "firebase/firestore";

export interface Resource {
  id: string,
  title: string,
  category: string,
  resourceType: string,
  fileUrl: string,
  uploadedAt: Timestamp,
  uploadedBy: UploadedBy
}

export interface UploadedBy {
  uid: string,
  name: string,
  email: string
}