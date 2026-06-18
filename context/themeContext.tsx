"use client";

import { createContext, useState, ReactNode } from "react";

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({ theme: 'light', toggleTheme: () => {} });

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    if(theme === 'light') {
      setTheme('dark');
    } else{
      setTheme('light');
    }
  }

  return(
  <ThemeContext.Provider value={{ theme, toggleTheme }}>
    { children }
  </ThemeContext.Provider>
  )
}