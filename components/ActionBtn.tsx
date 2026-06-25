import React from 'react'

interface ActionBtnProps{
  icon: React.ReactNode,
  type: string,
  selected: boolean;
  onClick: () => void;
}

export default function ActionBtn({icon, type, selected, onClick}:ActionBtnProps) {
  return (
   <button
    type="button"
    onClick={onClick}
    className={`${selected ? 'border-2 border-blue-500 bg-blue-50 transition cursor-pointer flex items-center justify-center gap-3 p-4 rounded-2xl' : 
      'flex items-center justify-center gap-3 border border-gray-300 rounded-2xl p-4 hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer'}`}
    >
    {icon}
    <span className="font-medium">
      {type}
    </span>
   </button>
  )
}
