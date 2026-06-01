import Sidebar from '@/components/Sidebar'
import React from 'react'

export default function page() {
  return (
    <div className='flex'>
      <Sidebar />
      <main className='flex-1 p-6'>
        Dashboard Content
      </main>
    </div>
  )
}
