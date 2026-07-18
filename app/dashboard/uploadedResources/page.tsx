'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ResourceList from '@/components/ResourceList';
import { useAuth } from '@/context/authContext';
import { fetchResources } from '@/services/resourceService';
import { Resource } from '@/types/resourceType';
import { redirect } from 'next/navigation';

export default function BookmarksPage() {
  const { user } = useAuth();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    if (!user) {
      return;
    }

    async function loadResources() {
     try {
          const fetchedResources = await fetchResources();
          setResources(fetchedResources);
        } catch (error) {
          console.error('Failed to load resources:', error);
        } finally {
          setLoading(false);
        }
      }
      loadResources();
    }, [user]);

  if (!user) {
    redirect('/signup')
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header />

        <main className="flex-1 p-6">
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
            <ResourceList
              title="Uploaded Resources"
              resources={resources}
              emptyMessage="There are no resources uploaded yet."
            />
          )}
        </main>
      </div>
    </div>
  );
}
