import UploadItem from "./UploadItem";
import { Resource } from "@/types/resourceType";
import { formatDistanceToNow } from "date-fns";

type ResourceListProps = {
  title: string;
  resources: Resource[];
  emptyMessage: string;
};

export default function ResourceList({
  title,
  resources,
  emptyMessage
}: ResourceListProps) {

  return (
    <>
      <h2 className="text-xl font-semibold mt-12">{title}</h2>
      <div className="rounded-xl border p-4 shadow-md mt-5">
        {resources.length === 0 ? (
          <div className="py-6 text-center text-(--text-secondary)">{emptyMessage}</div>
        ) : (
          <div className="divide-y">
            {resources.map((uploadedResource) => (
              <UploadItem
                key={uploadedResource.id}
                id={uploadedResource.id}
                title={uploadedResource.title}
                category={uploadedResource.category}
                uploadedAt={formatDistanceToNow(uploadedResource.uploadedAt.toDate())}
                type={uploadedResource.resourceType}
                userProfilePic={uploadedResource.userProfilePic}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}