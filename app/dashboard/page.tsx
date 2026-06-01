import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import StatsCard from "@/components/StatsCard";
import {
  FiFileText,
  FiUpload,
  FiBookmark,
} from "react-icons/fi";

export default function page() {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex flex-1 flex-col'>
        <Header />

        <main className='flex-1 p-6'>
            <div className='flex flex-col md:flex-row justify-between items-center mb-5'>
              <h1 className="mb-4 text-lg md:text-2xl font-semibold md:mt-3">
                Welcome back, Aisha
              </h1>

              <button className='bg-[#4338ca] text-white px-4 py-2 rounded flex gap-2 items-center cursor-pointer hover:opacity-50'>
                Upload
                <span>{<FiUpload />}</span>
              </button>
            </div>

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
        </main>
      </div>
    </div>
  )
}
