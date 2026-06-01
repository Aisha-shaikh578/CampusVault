"use client";

import { FiSearch, FiUser } from "react-icons/fi";
import { MdLightMode } from "react-icons/md";
import { BsMoon } from "react-icons/bs";

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-4 border-b bg-white px-4 py-3">
      {/* Search Bar */}
      <div className="relative flex-1 max-w-xl">
        <FiSearch
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        />

        <input
          type="text"
          placeholder="Search resources..."
          className="w-full rounded-lg border py-2 pl-10 pr-4 outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 md:gap-4 xl:gap-6">
        {/* Theme Toggle */}
        <button className="flex items-center rounded-full border p-2 hover:bg-gray-100 cursor-pointer">
          <MdLightMode size={18} />
          <BsMoon size={16} />
        </button>

        {/* Profile */}
        <button className="flex h-10 w-10 items-center justify-center rounded-full border hover:bg-gray-100 cursor-pointer">
          <FiUser size={20} />
        </button>
      </div>
    </header>
  );
}