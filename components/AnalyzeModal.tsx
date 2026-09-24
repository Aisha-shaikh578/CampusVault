'use client';
import { useState } from 'react';
import { BsStars } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';

type AnalyzeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  resourceId: string;
};

type Analysis = {
  summary: string,
  keyPoints: string[]
}

export default function AnalyzeModal({
  isOpen,
  onClose,
  resourceId,
}: AnalyzeModalProps) {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState('');
  if (!isOpen) return null;

const handleAnalyze = async () => {
  try {
    setLoading(true);
    setError('');

    const response = await fetch(
      `/api/resources/${resourceId}/analyze`,
      {
        method: 'POST',
      }
    );

    const data = await response.json();

    console.log('API status:', response.status);
    console.log('API response:', data);

    if (!response.ok) {
      throw new Error(data.error || 'Failed to analyze resource');
    }

    setAnalysis(data.analysis);
  } catch (error) {
    console.error('Analyze error:', error);

    setError(
      error instanceof Error
        ? error.message
        : 'Something went wrong'
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-2xl rounded-2xl bg-(--surface) p-6 shadow-xl">
        
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex">
            <BsStars color='orange' size={24}/>
             <span className='text-(--text-primary)'>AI Analysis</span>
          </h2>

          <button 
          onClick={onClose}
          className='cursor-pointer text-(--text-primary)'>
            <MdCancel size={24}/> 
          </button>
        </div>

       {/* Initial State */} 
        <div className="mt-6">
          {!loading && !analysis && (
            <div>
            <p className='text-(--secondary)'>Get an AI powered summary of this resource</p>
            <button 
            onClick={handleAnalyze}
            className='rounded-lg px-4 py-2 text-white bg-(--primary) mt-4 cursor-pointer hover:bg-(--primary-hover)'>
              Analyze
            </button>
            </div>
          )}

       {/* Loading State */} 
          {loading && (
            <div className='py-10 text-center'>
              <p className='text-(--secondary)'>Analyzing Resource...</p>
            </div>
          )}
        </div>

       {/* Result State */} 
        {!loading && analysis && (
            <div className='text-(--text-primary)'>
              <h3 className="font-semibold">
                Summary
              </h3>

              <p className="mt-2 text-(--secondary)">
                {analysis.summary}
              </p>

              <h3 className="mt-6 font-semibold">
                Key Points
              </h3>

              <ul className="mt-2 list-disc pl-5 text-(--secondary)">
                {analysis.keyPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Error */}
          {error && (
            <p className="mt-4 text-(--danger)">
              {error}
            </p>
          )}

      </div>
    </div>
  );
}
