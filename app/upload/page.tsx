'use client'

import ActionBtn from "@/components/ActionBtn";
import { auth, db } from "@/lib/firebase";
import { supabase } from "@/lib/supabase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Link from "next/link";
import { useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { toast } from "react-hot-toast";
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
  const user = auth.currentUser;
  
  const handleUpload = async() => {
    if (isUploading) return;

    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    if (!title) {
      setError('Please enter a title.');
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      const fileName = `${category}/${Date.now()}-${selectedFile.name}`;
      const { error } = await supabase.storage.from('Storage').upload(fileName, selectedFile);

      if (error) {
        setError(error.message);
        toast.error(`Upload failed: ${error.message}`);
        return;
      }

      const { data } = supabase.storage.from('Storage').getPublicUrl(fileName);
      const fileUrl = data.publicUrl;

      if (!fileUrl || !user) {
        const message = 'Unable to store your upload.';
        setError(message);
        toast.error(`Upload failed: ${message}`);
        return;
      }

      await addDoc(
        collection(db, 'resources'),
        {
          title,
          category,
          resourceType,
          fileUrl,
          uploadedBy: {
            uid: user.uid,
            email: user.email,
            name: user?.email?.split('@')[0],
          },
          uploadedAt: serverTimestamp()
        }
      );

      toast.success('Resource uploaded successfully!');
    } catch (uploadError) {
      const message = uploadError instanceof Error ? uploadError.message : 'Unexpected upload error.';
      setError(message);
      toast.error(`Upload failed: ${message}`);
    } finally {
      setIsUploading(false);
      setCategory('Computer Science');
      setResourceType('PDF');
      setSelectedFile(null);
      setTitle(null);
      setError(null);
    }
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
        <div className="bg-(--surface) border border-(--border) rounded-3xl p-8 shadow-sm">
          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-(--text-primary)">
              Upload Resource
            </h1>

            <p className="mt-2 text-(--text-secondary)">
              Share useful resources with your friends and classmates.
            </p>
          </div>

          {/* Upload Area */}
          <div 
          className="border-2 border-dashed border-(--border) rounded-2xl p-12 text-center hover:border-(--primary) transition-all"
          {...getRootProps()}> 
          {
          selectedFile === null ?
            <div>
            <input type="file" {...getInputProps()}/>
            <FiUploadCloud
              size={60}
              className="mx-auto text-(--primary)"
            />

            <h3 className="mt-4 text-xl font-semibold text-(--text-primary)">
              Drag and drop your file here
            </h3>

            <p className="mt-2 text-(--text-secondary)">or</p>

            <button className="mt-4 px-6 py-3 bg-(--primary) text-(--on-primary) rounded-xl font-medium hover:bg-(--primary-hover) transition cursor-pointer">
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
            <p className="mt-5 text-sm text-(--danger)">{error}</p>
            )}
          </div>

          {/* Resource Details */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-(--text-primary) mb-6">
              Resource Details
            </h2>

            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block mb-2 font-medium text-(--text-primary)">
                  Title *
                </label>

                <input
                  type="text"
                  placeholder="Enter resource title"
                  className="w-full border border-(--border) rounded-xl px-4 py-3 outline-none text-(--text-primary) bg-(--surface) focus:ring-1 focus:ring-(--primary)"
                  value={title || ''}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Category */}
              <div>
                <label className="block mb-2 font-medium text-(--text-primary)">
                  Subject / Category
                </label>

                <select className="w-full border border-(--border) rounded-xl px-4 py-3 outline-none text-(--text-primary) bg-(--surface) focus:ring-1 focus:ring-(--primary) cursor-pointer"
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
                <label className="block mb-3 font-medium text-(--text-primary)">
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
              <button className="px-4 py-2 border border-(--border) rounded-xl hover:bg-(--surface-variant) transition cursor-pointer">
                Cancel
              </button>
              </Link>

              <button 
              className="px-4 py-2 bg-(--primary) text-(--on-primary) rounded-xl cursor-pointer hover:bg-(--primary-hover) hover:text-(--on-primary) transition disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleUpload}
              disabled={isUploading}>
                {isUploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}