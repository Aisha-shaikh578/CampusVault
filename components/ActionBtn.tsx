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
    className={`${selected ? 'border-2 border-(--primary) bg-(--surface-variant) transition cursor-pointer flex items-center justify-center gap-3 p-4 rounded-2xl' : 
      'flex items-center justify-center gap-3 border border-(--border) rounded-2xl p-4 hover:border-(--primary) hover:bg-(--surface-variant) transition cursor-pointer'}`}
    >
    {icon}
    <span className="font-medium">
      {type}
    </span>
   </button>
  )
}
