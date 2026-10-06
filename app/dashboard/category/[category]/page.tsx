'use client';

import Header from '@/components/Header';
import ResourceList from '@/components/ResourceList';
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/context/authContext';
import { FadeIn } from '@/context/motionContext';
import { fetchResourcesByCategory, RESOURCE_CATEGORIES } from '@/services/resourceService';
import { Resource } from '@/types/resourceType';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BsArrowLeft } from 'react-icons/bs';

export default function CategoryResourcesPage() {
  const { user } = useAuth();
  const params = useParams();

  const categoryURL = params.category as string;
  const category = RESOURCE_CATEGORIES.find((item) => item.toLowerCase().replace(/\s+/g, "-") === categoryURL) as string;

  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function loadResources() {
      try {
        const data = await fetchResourcesByCategory(category);
        setResources(data);
      } catch (error) {
        toast.error('Failed to load resources.');
      } finally {
        setLoading(false);
      }
    }

    loadResources();
  }, [user, category]);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header searchTerm="" onSearchChange={() => {}} />

        <main className="flex-1 p-6 ml-20 lg:ml-60 mt-16">
          <FadeIn>
            <div className="mb-6 flex justify-between">
              <div>
                <h1 className="text-2xl font-semibold">
                  {category}
                </h1>

                <p className="mt-2 text-sm text-(--text-secondary)">
                  Resources under{' '}
                  <span className="font-bold">{category}</span>.
                </p>
              </div>

              <Link
                href="/dashboard/category"
                className="flex space-x-1 transition-all hover:opacity-65"
              >
                <BsArrowLeft className="mt-1.5" />
                <span>Back</span>
              </Link>
            </div>

            {loading ? (
              <div className="rounded-xl border p-6 text-center text-(--text-secondary)">
                Loading {category} resources...
              </div>
            ) : (
              <ResourceList
                title={`${category} Resources`}
                resources={resources}
                emptyMessage={`No ${category} resources uploaded yet.`}
              />
            )}
          </FadeIn>
        </main>
      </div>
    </div>
  );
}