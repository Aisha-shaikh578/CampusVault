'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ResourceList from '@/components/ResourceList';
import { useAuth } from '@/context/authContext';
import { getBookmarkedResources } from '@/services/bookmarkService';
import { Resource } from '@/types/resourceType';
import { redirect } from 'next/navigation';

export default function BookmarksPage() {
  const { user } = useAuth();
  const [bookmarkedResources, setBookmarkedResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      return;
    }

    async function loadBookmarks() {
      try {
        const resources = await getBookmarkedResources(user.uid);
        setBookmarkedResources(resources);
      } catch (error) {
        console.error('Failed to load bookmarked resources:', error);
      } finally {
        setLoading(false);
      }
    }
    loadBookmarks();
  }, [user]);

  if (!user) {
    redirect('/signup')
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header searchTerm="" onSearchChange={() => undefined}/>

        <main className="flex-1 p-6 ml-20 lg:ml-60 mt-16">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">Bookmarks</h1>
            <p className="mt-2 text-sm text-(--text-secondary)">
              Your saved resources are listed here.
            </p>
          </div>

          {loading ? (
            <div className="rounded-xl border p-6 text-center text-(--text-secondary)">
              Loading your bookmarks...
            </div>
          ) : (
            <ResourceList
              title="Bookmarked Resources"
              resources={bookmarkedResources}
              emptyMessage="You have no bookmarked resources yet."
            />
          )}
        </main>
      </div>
    </div>
  );
}
