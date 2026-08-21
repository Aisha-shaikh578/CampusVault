"use client";

import { FiSearch, FiUser } from "react-icons/fi";
import { MdLightMode } from "react-icons/md";
import { BsMoon } from "react-icons/bs";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import { usePathname } from "next/navigation";
import ProfilePicture from "./ProfilePicture";
import Link from "next/link";
import { useAuth } from "@/context/authContext";
import { motion } from "framer-motion";

type HeaderProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

export default function Header({ searchTerm, onSearchChange }: HeaderProps) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const pathname = usePathname();
  const { profilePic } = useAuth();

  return (
    <header className="flex items-center justify-between gap-4 border-b border-(--border) px-4 py-3 fixed top-0 right-0 left-20 lg:left-55 z-50 backdrop-blur-xs">

      {/* Search Bar */}
      <div className="flex-1">
      { 
      pathname === '/dashboard/uploadedResources'
        && 
      <div className="relative flex-1 max-w-xl">
        <FiSearch
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-(--muted)"
        />

        <input
          onChange={(e) => onSearchChange(e.target.value)}
          value={searchTerm}
          type="text"
          placeholder="Search resources..."
          className="w-full rounded-lg border border-(--border) bg-(--surface) py-2 pl-10 pr-4 outline-none text-(--text-primary) placeholder:text-(--placeholder) focus:ring-1 focus:ring-(--primary)"
        />
      </div>
      }
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 md:gap-4 xl:gap-6">
        {/* Theme Toggle */}
        <motion.button
          type="button"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          className="flex items-center rounded-full border border-(--border) p-2.5 hover:opacity-80 cursor-pointer"
          onClick={toggleTheme}
          whileTap={{ rotate: 120}}
        >
          {theme === 'light' ? <BsMoon size={18} color="orange" /> : <MdLightMode size={20} color="orange" />}
        </motion.button>

        {/* Profile */}
        <Link href='/dashboard/settings'>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-(--border) bg-(--surface-variant)">
          {profilePic ?
            <ProfilePicture /> :
            <div className="flex h-full w-full items-center justify-center bg-(--surface-variant)">
              <FiUser className="h-7 w-7 text-(--text-secondary)" />
            </div>
          }
          </div>
        </Link>
      </div>
    </header>
  );
}