import Link from "next/link";
import React from "react";
import {
  FiFileText,
  FiLink,
  FiUser,
} from "react-icons/fi";
import ProfilePicture from "./ProfilePicture";

type UploadItemProps = {
  id: string;
  title: string;
  category: string;
  uploadedAt: string;
  type: "PDF" | "Link" | "Doc";
  userProfilePic: string;
};

export default function UploadItem({
  id,
  title,
  category,
  uploadedAt,
  type,
  userProfilePic
}: UploadItemProps) {
  return (
    <Link href={`/resources/${id}`}>
    <div className="flex flex-col gap-3 sm:flex-row items-center justify-between py-3 border-b-2 border-(--border) cursor-pointer">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <div>
          {type === "Link" ? (
            <FiLink size={22} />
          ) : (
            <FiFileText size={22} />
          )}
        </div>

        <div>
          <h3 className="font-medium text-(--text-primary)">
            {title}
          </h3>

          <p className="text-sm text-(--text-secondary)">
            {category} • {uploadedAt} ago
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4 text-(--text-primary)">
        <span className="rounded-full bg-(--surface-variant) px-3 py-1 text-xs font-medium">
          {type.toUpperCase()}
        </span>

        <div className="flex h-8 w-8 items-center justify-center rounded-full overflow-hidden bg-(--surface-variant)">
          {userProfilePic ?
           <ProfilePicture userProfilePic={userProfilePic}/> :
          <div className="flex h-full w-full items-center justify-center bg-(--surface-variant)">
            <FiUser className="h-5 w-5 text-(--text-secondary)" />
          </div>
          }
        </div>
      </div>
    </div>
    </Link>
  );
}