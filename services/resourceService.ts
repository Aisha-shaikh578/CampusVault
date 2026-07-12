import { db } from "@/lib/firebase";
import { Resource } from "@/types/resourceType";
import { collection, doc, getDoc, getDocs, limit, orderBy, query } from "firebase/firestore";

export async function fetchResources(): Promise<Resource[]> {
  const resourceCollection = collection(db, 'resources'); 
  const resourceSnapshot = await getDocs(resourceCollection);
  const uploadedResources = resourceSnapshot.docs.map((resourceDoc) => ({
    id: resourceDoc.id,
    ...resourceDoc.data(),
  })) as Resource[];
  return uploadedResources;
}


export async function fetchRecentResources(): Promise<Resource[]> {
  const resourceQuery = query(
    collection(db, 'resources'),
    orderBy('uploadedAt', 'desc'),
    limit(3)
  ); 
  const resourceSnapshot = await getDocs(resourceQuery);
  const uploadedResources = resourceSnapshot.docs.map((resourceDoc) => ({
    id: resourceDoc.id,
    ...resourceDoc.data(),
  })) as Resource[];
  return uploadedResources;
}


export async function fetchResourceById(resourceId: string): Promise<Resource | null> {
  const resourceDoc = doc(db, 'resources', resourceId);
  const resourceSnapshot = await getDoc(resourceDoc);
  if(!resourceSnapshot.exists()) {return null};
  return {
    id: resourceSnapshot.id,
    ...resourceSnapshot.data()
  } as Resource
}