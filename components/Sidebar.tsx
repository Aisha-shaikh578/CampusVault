"use client";

import Link from "next/link";
import {
  FiHome,
  FiFolder,
  FiBookmark,
  FiLogOut,
  FiSettings,
} from "react-icons/fi";

import { useAuth } from "@/context/authContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Image from "next/image";
import logo from '../images/logo.png';
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    name: "Home",
    icon: FiHome,
    href: "/dashboard",
  },
  {
    name: "Resources",
    icon: FiFolder,
    href: "/dashboard/uploadedResources",
  },
  {
    name: "Bookmarks",
    icon: FiBookmark,
    href: "/dashboard/bookmarks",
  },
  {
    name: "Settings",
    icon: FiSettings,
    href: "/dashboard/settings",
  },
];

export default function Sidebar() {

  const { user } = useAuth();
  const pathname = usePathname();

  const handleLogOut = async() => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
    } catch (err) {
      console.log('Logout failed ',err)
    }
  }

  return (
    <aside className="flex h-screen fixed left-0 bottom-0 flex-col justify-between border-r border-(--border) px-2 py-4 lg:w-55 w-20">
      <div>
        {/* Logo */}
        <motion.div
          className="mb-4 flex items-center justify-center gap-1.5 px-1"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: -4 }}
          transition={{ duration: 0.35 }}
        >
          <Image 
            src={logo}
            alt='Logo'
            width={50}
            height={50}/>

          <span className="hidden lg:block text-lg font-bold">
            Campus Vault
          </span>
        </motion.div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-center lg:justify-start gap-3 rounded-lg p-3 hover:text-(--on-primary) hover:bg-(--primary) transition ${pathname === item.href ? 'bg-(--primary) text-white' : ''}`}
              >
                <Icon size={22} />

                <span className="hidden lg:block">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      {
      user ?  
      <motion.button 
      className="flex flex-col items-center gap-2 rounded-lg p-3 cursor-pointer hover:text-white hover:bg-[#4338ca] transition"
      onClick={handleLogOut}
      whileTap={{ scale: 0.96 }}
      >
        <FiLogOut size={24} />
        <span className="text-sm">Logout</span>
      </motion.button> : 
      null
      }
    </aside>
  );
}