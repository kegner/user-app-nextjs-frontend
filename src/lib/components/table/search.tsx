'use client';

import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useLoaderStore } from '@/lib/store';

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const { setLoading } = useLoaderStore((state) => state);

  const handleSearch = useDebouncedCallback((value: string) => {
    setLoading(true);

    const params = new URLSearchParams(searchParams);
    params.set('page', '0');

    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative">
      <MagnifyingGlassIcon className="absolute top-1/2 left-3 h-[28px] w-[28px] -translate-y-1/2 pr-2 text-gray-100" />
      <input
        aria-label="Search input"
        className="w-80 rounded border-1 border-neutral-200 bg-neutral-900 py-2 pl-10
          placeholder:text-neutral-300 focus:ring-blue-400 focus:outline-blue-400"
        placeholder="Search..."
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('search')?.toString()}
      />
    </div>
  );
}
