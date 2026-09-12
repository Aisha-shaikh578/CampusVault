'use client';
import { BsStars } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';

type AnalyzeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  resourceId: string;
};

export default function AnalyzeModal({
  isOpen,
  onClose,
  resourceId,
}: AnalyzeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex">
            <BsStars color='orange' size={24}/>
             <span>AI Analysis</span>
          </h2>

          <button 
          onClick={onClose}
          className='cursor-pointer'>
            <MdCancel size={24}/>
          </button>
        </div>

        <div className="mt-6">
          <p>
            Comming Soon...
          </p>
        </div>

      </div>
    </div>
  );
}
