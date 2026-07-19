import { db } from "@/lib/firebase";
import { User } from "firebase/auth";
import { addDoc, collection, getDocs, orderBy, query, serverTimestamp } from "firebase/firestore";

export async function addComment(resourceId: string, text: string, user: User) {
  const commentsRef = collection(db, 'resources', resourceId, 'comments');
  const commentedDocRef = await addDoc(commentsRef, {
    text,
    userUid: user.uid,
    username: user.displayName,
    createdAt: serverTimestamp()
  })
}


export async function getComments(resourceId: string, text: string, user: User) {
  const commentsRef = collection(db, 'resources', resourceId, 'comments');
  const q = query(commentsRef,
    orderBy('createdAt', 'desc')
  );
  const commentsSnapshot = await getDocs(q);
  const comments = commentsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
  return comments;
}