import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import React from 'react'

export default function page() {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex flex-1 flex-col'>
        <Header />

        <main className='flex-1 p-6'>
          Dashboard Content
        </main>
      </div>
    </div>
  )
}
