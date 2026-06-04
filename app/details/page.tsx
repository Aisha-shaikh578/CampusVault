import Link from "next/link";
import { BiDownload, BiSend, BiShare } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import { FiFileText } from "react-icons/fi";
import { RiBookMarkedFill } from "react-icons/ri";

export default function NoteDetails() {
  return (
  <>
    {/* Sidebar */}
    <div className="flex-1 p-6 overflow-y-auto">
      {/* Back Button */}
    <Link href='/dashboard'>
      <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition cursor-pointer">
      <BsArrowLeft size={18} />
        Back
      </button>
    </Link>

      {/* Document Info */}
      <div className="mt-6 bg-white rounded-xl border p-5 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-3">
            <FiFileText />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              DSA Notes.pdf
            </h1>

            <p className="text-gray-500 mt-1">
              Computer Science • 2 days ago
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Uploaded by Aisha
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6">
        <h2 className="font-semibold text-lg mb-3">
          Actions
        </h2>

        <div className="flex flex-wrap gap-4">
          <button className="flex items-center gap-2 px-5 py-3 border rounded-lg hover:text-white hover:bg-[#4338ca] transition cursor-pointer">
            <BiDownload size={18} />
            Download
          </button>

          <button className="flex items-center gap-2 px-5 py-3 border rounded-lg hover:text-white hover:bg-[#4338ca] transition cursor-pointer">
            <BiShare size={18} />
            Share
          </button>

          <button className="flex items-center gap-2 px-5 py-3 border rounded-lg hover:text-white hover:bg-[#4338ca] transition cursor-pointer">
            <RiBookMarkedFill size={18} />
            Bookmark
          </button>
        </div>
      </div>

      {/* Comments */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">
          Comments (2)
        </h2>

        <div className="space-y-5">
          <div className="flex gap-3">
            <div className="bg-gray-300 rounded-full h-8 w-8"/>

            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-medium">
                  XYZ
                </h3>

                <span className="text-sm text-gray-500">
                  1 min ago
                </span>
              </div>

              <p className="text-gray-600 mt-1">
                Thanks for sharing!
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="bg-blue-300 rounded-full h-8 w-8"/>

            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-medium">
                  123
                </h3>

                <span className="text-sm text-gray-500">
                  2 days ago
                </span>
              </div>

              <p className="text-gray-600 mt-1">
                Saving this for sure.
              </p>
            </div>
          </div>
        </div>

        {/* Add Comment */}
        <div className="mt-8 flex gap-3">
          <input
            type="text"
            placeholder="Write a comment..."
            className="flex-1 border rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />

          <button className="bg-[#4338ca] text-white px-5 rounded-lg hover:opacity-80 transition cursor-pointer">
            <BiSend size={18} />
          </button>
        </div>
      </div>
    </div>
  </>
  );
}