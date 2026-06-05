import React from 'react'

interface ActionBtnProps{
  icon: React.ReactNode,
  type: string
}

export default function ActionBtn({icon, type}:ActionBtnProps) {
  return (
   <button
    type="button"
    className="flex items-center justify-center gap-3 border border-gray-300 rounded-2xl p-4 hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer"
    >
    {icon}
    <span className="font-medium">
      {type}
    </span>
   </button>
  )
}
