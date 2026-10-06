'use client';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/context/authContext';
import { FadeIn } from '@/context/motionContext';
import { RESOURCE_CATEGORIES } from '@/services/resourceService';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function CategoryPage() {
  const { user } = useAuth();

  if (!user) {
    redirect('/signup');
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header searchTerm="" onSearchChange={() => undefined} />

        <main className="flex-1 p-6 ml-20 lg:ml-60 mt-16">
          <FadeIn>
            <div className="mb-6">
              <h1 className="text-2xl font-semibold">Categories</h1>
              <p className="mt-2 text-sm text-(--text-secondary)">
                Browse resources by category.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {RESOURCE_CATEGORIES.map((category) => (
                <Link
                  key={category}
                  href={`/dashboard/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block rounded-2xl border border-(--border) bg-(--surface) p-5 shadow-sm transition hover:border-(--primary) hover:bg-(--surface-variant)"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-lg font-semibold text-(--text-primary)">{category}</span>
                    <span className="rounded-full bg-(--surface-variant) px-2 py-1 text-xs font-medium text-(--primary)">
                      View
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </FadeIn>
        </main>
      </div>
    </div>
  );
}
