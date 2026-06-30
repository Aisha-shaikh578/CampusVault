"use client";

import { FiSearch, FiUser } from "react-icons/fi";
import { MdLightMode } from "react-icons/md";
import { BsMoon } from "react-icons/bs";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="flex items-center justify-between gap-4 border-b border-(--border) px-4 py-3">
      {/* Search Bar */}
      <div className="relative flex-1 max-w-xl">
        <FiSearch
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-(--muted)"
        />

        <input
          type="text"
          placeholder="Search resources..."
          className="w-full rounded-lg border border-(--border) bg-(--surface) py-2 pl-10 pr-4 outline-none text-(--text-primary) placeholder:text-(--placeholder) focus:ring-1 focus:ring-(--primary)"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 md:gap-4 xl:gap-6">
        {/* Theme Toggle */}
        <button
          className="flex items-center rounded-full border border-(--border) p-2.5 hover:opacity-80 cursor-pointer"
          onClick={toggleTheme}
        >
          {theme === 'light' ? <BsMoon size={18} color="orange" /> : <MdLightMode size={20} color="orange" />}
        </button>

        {/* Profile */}
        <button className="flex h-10.5 w-10.5 items-center justify-center rounded-full border border-(--border) hover:opacity-80 cursor-pointer">
          <FiUser size={20} />
        </button>
      </div>
    </header>
  );
}