import UploadItem from "./UploadItem";

export default function RecentUploads() {
  return (
    <>
    <h2 className="text-xl font-semibold mt-12">
      Recent Uploads
    </h2>
    <div className="rounded-xl border p-4 shadow-md mt-5">
      <div className="divide-y">
        <UploadItem
          title="DSA Notes.pdf"
          category="Computer Science"
          uploadedAt="2 days ago"
          type="pdf"
        />

        <UploadItem
          title="Operating System.pdf"
          category="Computer Science"
          uploadedAt="15 minutes ago"
          type="pdf"
        />

        <UploadItem
          title="Roadmap.link"
          category="Development"
          uploadedAt="1 hour ago"
          type="link"
        />
      </div>
    </div>
    </>
  );
}