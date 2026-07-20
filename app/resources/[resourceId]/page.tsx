import { fetchResourceById } from "@/services/resourceService";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import { FiFileText } from "react-icons/fi";
import { formatDistanceToNow } from "date-fns";
import ResourceActions from "@/components/ResourceActions";
import CommentSection from "@/components/CommentSection";

export default async function Details({ params }: {
  params: 
    Promise<{resourceId: string}>;
}) {
  const {resourceId} = await params;
  const resource = await fetchResourceById(resourceId);

  return (
  <>
    <div className="flex-1 p-6 overflow-y-auto">
      {/* Back Button */}
    <Link href='/dashboard'>
      <button className="flex items-center gap-2 text-sm text-(--text-secondary) hover:text-(--text-primary) transition cursor-pointer">
      <BsArrowLeft size={18} />
        Back
      </button>
    </Link>

      {/* Resource Details */}
      <div className="mt-6 bg-(--surface) rounded-xl border border-(--border) p-5 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-3">
            <FiFileText />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              {resource?.title}
            </h1>

            <p className="text-(--text-secondary) mt-1">
              {resource?.category} • {`${formatDistanceToNow(resource?.uploadedAt.toDate())} ago`}
            </p>

            <p className="text-sm text-(--text-secondary) mt-1">
              Uploaded by {resource?.uploadedBy.name}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
     <ResourceActions resourceId={resourceId}/>

      {/* Comment Section */}
      <CommentSection resourceId={resourceId}/>
    </div>
  </>
  );
}