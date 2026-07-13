import { db } from "@/lib/firebase";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";

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