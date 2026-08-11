import { db } from "@/lib/firebase";
import { CommentTypes } from "@/types/commentTypes";
import { User } from "firebase/auth";
import { addDoc, collection, getDocs, orderBy, query, serverTimestamp } from "firebase/firestore";

export async function addComment(resourceId: string, text: string, user: User, profilePic: string | null) {
  const userName = user?.email?.split('@')[0];
  const commentsRef = collection(db, 'resources', resourceId, 'comments');
  const commentedDocRef = await addDoc(commentsRef, {
    text,
    userUid: user.uid,
    username: userName,
    createdAt: serverTimestamp(),
    userProfilePic: profilePic
  })
}


export async function getComments(resourceId: string) {
  const commentsRef = collection(db, 'resources', resourceId, 'comments');
  const q = query(commentsRef,
    orderBy('createdAt', 'desc')
  );
  const commentsSnapshot = await getDocs(q);
  const comments = commentsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  } as CommentTypes));
  return comments;
}