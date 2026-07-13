'use client';

import React from 'react'
import Button from "@/components/Button";
import { BiDownload, BiShare } from "react-icons/bi";
import { RiBookMarkedFill } from "react-icons/ri";


export default function ResourceActions() {
  return (
   <div className="mt-6">
      <h2 className="font-semibold text-lg mb-3">
        Actions
      </h2>

      <div className="flex flex-wrap gap-4">
        <Button text="Download" icon={<BiDownload size={18}/>}/>

        <Button text="Share" icon={<BiShare size={18}/>}/>

        <Button text="Bookmark" icon={<RiBookMarkedFill size={18}/>}/>
      </div>
    </div>
  )
}
