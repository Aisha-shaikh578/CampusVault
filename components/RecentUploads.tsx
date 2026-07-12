import { useEffect, useState } from "react";
import UploadItem from "./UploadItem";
import { Resource } from "@/types/resourceType";
import { formatDistanceToNow } from "date-fns";
import { fetchRecentResources } from "@/services/resourceService";

export default function RecentUploads() {
  const [recentUploads, setRecentUploads] = useState<Resource[]>([]);

   useEffect(() => {
      async function loadResources() {
        const fetchedResources = await fetchRecentResources();
        setRecentUploads(fetchedResources);
      }
      loadResources();
    }, [])

  return (
    <>
    <h2 className="text-xl font-semibold mt-12">
      Recent Uploads
    </h2>
    <div className="rounded-xl border p-4 shadow-md mt-5">
      <div className="divide-y">
        {recentUploads.map((uploadedResource) => (
          <UploadItem key={uploadedResource.id}
          id={uploadedResource.id}
          title={uploadedResource.title}
          category={uploadedResource.category}
          uploadedAt={formatDistanceToNow(uploadedResource.uploadedAt.toDate())}
          type={uploadedResource.resourceType}
        />
        ))}
      </div> 
    </div>
    </>
  );
}