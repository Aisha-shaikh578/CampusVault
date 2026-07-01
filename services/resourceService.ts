import { db } from "@/lib/firebase";
import { Resource } from "@/types/resourceType";
import { collection, getDocs } from "firebase/firestore";

export async function fetchResources(): Promise<Resource[]> {
  const resourceCollection = collection(db, 'resources'); 
  const resourceSnapshot = await getDocs(resourceCollection);
  const uploadedResources = resourceSnapshot.docs.map((resourceDoc) => ({
    id: resourceDoc.id,
    ...resourceDoc.data(),
  })) as Resource[];
  return uploadedResources;
}