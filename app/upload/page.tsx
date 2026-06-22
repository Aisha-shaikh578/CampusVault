'use client'

import ActionBtn from "@/components/ActionBtn";
import Link from "next/link";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  FiUploadCloud,
  FiFileText,
  FiLink,
  FiFolder,
} from "react-icons/fi";

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const onDrop = (acceptedFiles: File[]) => {
    setSelectedFile(acceptedFiles[0]);
  }
  console.log(selectedFile);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="w-full p-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Upload Resource
            </h1>

            <p className="mt-2 text-gray-500">
              Share useful resources with your friends and classmates.
            </p>
          </div>

          {/* Upload Area */}
          <div 
          className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-blue-500 transition-all"
          {...getRootProps()}>
            <input type="file" {...getInputProps()}/>
            <FiUploadCloud
              size={60}
              className="mx-auto text-blue-600"
            />

            <h3 className="mt-4 text-xl font-semibold text-gray-800">
              Drag and drop your file here
            </h3>

            <p className="mt-2 text-gray-500">or</p>

            <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition cursor-pointer">
              Select Files
            </button>
          </div>

          {/* Resource Details */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Resource Details
            </h2>

            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Title *
                </label>

                <input
                  type="text"
                  placeholder="Enter resource title"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Subject / Category
                </label>

                <select className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer">
                  <option>Computer Science</option>
                  <option>Operating System</option>
                  <option>Mathematics</option>
                  <option>DSA</option>
                  <option>Physics</option>
                  <option>Chemistry</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Resource Type */}
              <div>
                <label className="block mb-3 font-medium text-gray-700">
                  Resource Type *
                </label>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <ActionBtn icon={<FiFileText size={22} color="red"/>} type='PDF'/>

                  <ActionBtn icon={<FiLink size={22} color="gray"/>} type='Link'/>

                  <ActionBtn icon={<FiFolder size={22} color="orange"/>} type='Document'/>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-4 mt-10">
              <Link href='/dashboard'>
              <button className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition cursor-pointer">
                Cancel
              </button>
              </Link>

              <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition cursor-pointer">
                Upload Resource
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}