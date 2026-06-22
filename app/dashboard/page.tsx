"use client";

import Header from '@/components/Header'
import RecentUploads from '@/components/RecentUploads';
import Sidebar from '@/components/Sidebar'
import StatsCard from "@/components/StatsCard";
import { UseAuth } from '@/context/authContext';
import {
  FiFileText,
  FiUpload,
  FiBookmark,
} from "react-icons/fi";
import SignupPage from '../signup/page';
import { ThemeContext } from "@/context/themeContext";
import { useContext } from 'react';

export default function DashboardPage() {
  const { user } = UseAuth();
  const { theme } = useContext(ThemeContext);
  const userName = user?.email?.split('@')[0];

  return (
    <>
    {
     user ?
    <div className={`flex ${theme === 'light'? 'light': 'dark'}`}>
      {/* Sidebar */}
      <Sidebar />
      
      <div className='flex flex-1 flex-col'>
        {/* Header */}
        <Header />

        <main className='flex-1 p-6'>
            <div className='flex flex-col md:flex-row justify-between items-center mb-5'>
              <h1 className="mb-4 text-lg md:text-2xl font-semibold md:mt-3">
                Welcome back, {userName}
              </h1>

              <button className='bg-[#4338ca] text-white px-4 py-2 rounded flex gap-2 items-center cursor-pointer hover:opacity-50'>
                Upload
                <span>{<FiUpload />}</span>
              </button>
            </div> 

            {/* StatsCard Grid */}
            <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
              <StatsCard
                title="Total Resources"
                value={128}
                icon={<FiFileText />}
                iconColor="text-yellow-700"
                bgColor="bg-yellow-50"
              />

              <StatsCard
                title="My Uploads"
                value={43}
                icon={<FiUpload />}
                iconColor="text-sky-700"
                bgColor="bg-sky-50"
              />

              <StatsCard
                title="Bookmarks"
                value={12}
                icon={<FiBookmark />}
                iconColor="text-green-700"
                bgColor="bg-green-50"
              />
            </div>

          {/* Recent Uploads Section */}
            <RecentUploads />
        </main>
      </div>
    </div>
    :
    <SignupPage />
  }
  </>
  )
}
