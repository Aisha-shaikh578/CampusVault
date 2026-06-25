'use client'

import ActionBtn from "@/components/ActionBtn";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import {
  FiUploadCloud,
  FiFileText,
  FiLink,
  FiFolder,
} from "react-icons/fi";
import { MdCancel } from "react-icons/md";

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [category, setCategory] = useState('Computer Science');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [resourceType, setResourceType] = useState<'PDF' | 'Link' | 'Document'>('PDF')
  const MAX_SIZE = 5 * 1024 * 1024;   // 5MB
  
  const handleUpload = async() => {
    if(!selectedFile) {
      setError('Please select a file first');
      return;
    }

    if(!title) {
      setError('Please enter a title.');
      return;
    }
    
    const fileName = `${category}/${Date.now()}-${selectedFile.name}`;
    const { error } = await supabase.storage.from('Storage').upload(fileName, selectedFile);
    if(error) {
      setError(error.message);
      return;
    }
    const { data } = supabase.storage.from('Storage').getPublicUrl(fileName);
    const fileUrl = data.publicUrl;
    console.log(fileUrl);
  }

  const onDropAccepted = (acceptedFiles: File[]) => {
    setError(null);
    setSelectedFile(acceptedFiles[0]);
  };

  const onDropRejected = (fileRejections: FileRejection[]) => {
    if (!fileRejections || fileRejections.length === 0) return;
    const rej = fileRejections[0];
    const { file, errors } = rej as FileRejection & { file: File };

    if (file.name.toLowerCase().endsWith('.apk')) {
      setError('APK files are not allowed.');
      return;
    }

    if (errors) {
      const firstErr = errors[0];
      if (firstErr.code === 'file-too-large') {
        setError('File is too large. Maximum allowed size is 5 MB.');
        return;
      }
      if (firstErr.code === 'file-invalid-type') {
        setError('Invalid file type. Allowed types: pdf, doc, docx, jpeg, png.');
        return;
      }
    }

    // Fallback message
    setError('File not accepted. Please check the file type and size.');
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted,
    onDropRejected,
    maxSize: MAX_SIZE,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png']
    }
  });

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
          {
          selectedFile === null ?
            <div>
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
              :
            <div className="flex space-x-2">
             <FiFileText size={30}/>
             <span>{selectedFile.name}</span>
             <button 
             className="mx-5 cursor-pointer"
             onClick={() => setSelectedFile(null)}>
              <MdCancel color="red" size={22}/>
             </button>
            </div>
            }
            {error && (
            <p className="mt-5 text-sm text-red-600">{error}</p>
            )}
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
                  value={title || ''}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Category */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Subject / Category
                </label>

                <select className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                >
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
                  <ActionBtn 
                  icon={<FiFileText size={22} color="red"/>} 
                  type='PDF' 
                  selected={resourceType === 'PDF'}
                  onClick={() => setResourceType('PDF')}/>

                  <ActionBtn 
                  icon={<FiLink size={22} color="gray"/>} 
                  type='Link'
                  selected={resourceType === 'Link'}
                  onClick={() => setResourceType('Link')}/>

                  <ActionBtn 
                  icon={<FiFolder size={22} color="orange"/>} 
                  type='Document'
                  selected={resourceType === 'Document'}
                  onClick={() => setResourceType('Document')}/>
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

              <button 
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition cursor-pointer"
              onClick={handleUpload}>
                {isUploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}