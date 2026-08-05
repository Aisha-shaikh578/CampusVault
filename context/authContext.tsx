'use client'

import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
  profilePic: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [profilePic, setProfilePic] = useState<string | null>(null);

  useEffect(() => {
    const stopAuthListener = onAuthStateChanged(auth, async(currentUser) => {
      setUser(currentUser);

      if(currentUser) {
       const docRef = doc(db, 'users', currentUser.uid);
       const docSnap = await getDoc(docRef);

       if(docSnap.exists()) {
        const data = docSnap.data();
        setProfilePic(data.profileImgUrl);
       }
      } else{
       setProfilePic(null);
      }
    });
    return () => stopAuthListener();
  }, []);

  return (
    <AuthContext.Provider value={{ user, profilePic }}>
      { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if(!context) {
    throw new Error('useAuth must be used within the AuthProvider');
  }
  return context;
}