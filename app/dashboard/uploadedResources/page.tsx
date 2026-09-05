'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ResourceList from '@/components/ResourceList';
import { useAuth } from '@/context/authContext';
import { fetchResources } from '@/services/resourceService';
import { Resource } from '@/types/resourceType';
import { redirect } from 'next/navigation';
import { FadeIn } from '@/context/motionContext';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function ResourcesPage() {
  const { user } = useAuth();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

    useEffect(() => {
    if (!user) {
      return;
    }

    async function loadResources() {
     try {
          const fetchedResources = await fetchResources();
          setResources(fetchedResources);
        } catch (error) {
          try {
           const fetchedResources = await fetchResources();
           setResources(fetchedResources);
          } catch (error) {
            toast.error('Failed to load resources');
          }  
        } finally {
          setLoading(false);
        }
      }
      loadResources();
    }, [user]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (!user) {
    redirect('/signup')
  }

  const searchQuery = searchTerm.trim().toLowerCase();
  const filteredResources = resources.filter((resource) => {
    if (!searchQuery) {
      return true;
    }

    return resource.title.toLowerCase().includes(searchQuery);
  });

  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedResources = filteredResources.slice(startIndex, endIndex);

  const emptyMessage = resources.length === 0
    ? 'There are no resources uploaded yet.'
    : 'No resources found.';

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <main className="flex-1 p-6 ml-20 lg:ml-60 mt-16">
          <FadeIn>
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">Resources</h1>
            <p className="mt-2 text-sm text-(--text-secondary)">
              All the uploaded resources are listed below.
            </p>
          </div>

          {loading ? (
            <div className="rounded-xl border p-6 text-center text-(--text-secondary)">
              Loading Resources...
            </div>
          ) : (
            <>
              <ResourceList
                title="Uploaded Resources"
                resources={paginatedResources}
                emptyMessage={emptyMessage}
              />
              {filteredResources.length > 0 && totalPages > 1 && (
                <div className="mt-6 flex items-center justify-center gap-3">
                  <button
                    onClick={() => setCurrentPage((page) => page - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center cursor-pointer gap-2 px-2 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:disabled:bg-transparent hover:bg-(--primary) hover:text-white"
                  >
                    <FiArrowLeft size={18} />
                  </button>
                  <span className="text-sm text-(--text-secondary)">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((page) => page + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center cursor-pointer gap-2 px-2 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:disabled:bg-transparent hover:bg-(--primary) hover:text-white"
                  >
                    <FiArrowRight size={18} />
                  </button>
                </div>
              )}
            </>
          )}
          </FadeIn>
        </main>
      </div>
    </div>
  );
}
