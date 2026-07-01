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
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Resource } from '@/types/resourceType';
import { fetchResources } from '@/services/resourceService';

export default function DashboardPage() {
  const { user } = UseAuth();
  const userName = user?.email?.split('@')[0];
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    async function loadResources() {
      const fetchedResources = await fetchResources();
      setResources(fetchedResources);
    }
    loadResources();
  }, [])

  const usersUploadedResource = resources.filter((resource) => resource.uploadedBy?.uid === user?.uid);

  return (
    <>
    {
     user ?
    <div className='flex'>
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
     
             <Link href='/upload'>
              <button 
               className='bg-(--primary) text-(--on-primary) px-4 py-2 rounded flex gap-2 items-center cursor-pointer hover:bg-(--primary-hover)'>
                Upload
                <span>{<FiUpload />}</span>
              </button>
             </Link>
            </div> 

            {/* StatsCard Grid */}
            <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
              <StatsCard
                title="Total Resources"
                value={resources.length}
                icon={<FiFileText />}
                iconColor="text-yellow-700"
                bgColor="bg-yellow-100"
              />

              <StatsCard
                title="My Uploads"
                value={usersUploadedResource.length}
                icon={<FiUpload />}
                iconColor="text-sky-700"
                bgColor="bg-sky-100"
              />

              <StatsCard
                title="Bookmarks"
                value={12}
                icon={<FiBookmark />}
                iconColor="text-green-700"
                bgColor="bg-green-100"
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
