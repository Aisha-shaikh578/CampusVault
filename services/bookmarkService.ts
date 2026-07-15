import { db } from "@/lib/firebase";
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";

export async function addBookmark(uid: string, resourceId: string): Promise<void> {
  const bookmarkRef = doc(db, 'users', uid, 'bookmarks', resourceId);
  await setDoc(bookmarkRef, {placeholder: true})
}


export async function removeBookmark(uid: string, resourceId: string): Promise<void> {
  const bookmarkRef = doc(db, 'users', uid, 'bookmarks', resourceId);
  await deleteDoc(bookmarkRef);
}


export async function isBookmarked(uid: string, resourceId: string): Promise<boolean> {
  const bookmarkRef = doc(db, 'users', uid, 'bookmarks', resourceId);
  const bookmarkSnapshot = await getDoc(bookmarkRef);
  return bookmarkSnapshot.exists();
}


export async function countBookmarks(uid: string): Promise<number> {
  const bookmarkRef = collection(db, 'users', uid, 'bookmarks');
  const snapshot = await getDocs(bookmarkRef);
  return snapshot.size
}


export async function getBookmarkedResources(uid: string) {
  const bookmarkRef = collection(db, 'users', uid, 'bookmarks');
  const bookmarkSnapshot = await getDocs(bookmarkRef);
  const resources = [];

  for(const bookmarkedDoc of bookmarkSnapshot.docs) {
    const resourceId = bookmarkedDoc.id;
    const resourceRef = doc(db, 'resources', resourceId);
    const resourceSnapshot = await getDoc(resourceRef);

    if(resourceSnapshot.exists()) {
      resources.push({
        id: resourceSnapshot.id,
        ...resourceSnapshot.data(),
      });
    }
  }
  return resources;
}