'use client'

import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stopAuthListener = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => stopAuthListener();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
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