import React from "react";
import {
  FiFileText,
  FiLink,
  FiUser,
} from "react-icons/fi";

type UploadItemProps = {
  title: string;
  category: string;
  uploadedAt: string;
  type: "pdf" | "link";
};

export default function UploadItem({
  title,
  category,
  uploadedAt,
  type,
}: UploadItemProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row items-center justify-between py-4 cursor-pointer">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <div>
          {type === "pdf" ? (
            <FiFileText size={22} />
          ) : (
            <FiLink size={22} />
          )}
        </div>

        <div>
          <h3 className="font-medium">
            {title}
          </h3>

          <p className="text-sm text-gray-500">
            {category} • {uploadedAt}
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
          {type.toUpperCase()}
        </span>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
          <FiUser size={16} />
        </div>
      </div>
    </div>
  );
}