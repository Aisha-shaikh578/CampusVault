import React from 'react'

interface ButtonProps{
  text: string,
  icon: React.ReactNode
}

export default function Button({text, icon}:ButtonProps) {
  return (
    <button className="flex items-center gap-2 px-5 py-3 border border-(--border) rounded-lg text-(--text-primary) hover:text-(--on-primary) hover:bg-(--primary) transition cursor-pointer">
      {icon}
      {text}
    </button>
  )
}
