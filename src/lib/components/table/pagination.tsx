'use client';

import { DEFAULT_PAGE_SIZE } from '@/lib/data';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { Fragment } from 'react';
import { useLoaderStore } from '@/lib/store';

export default function Pagination({
  totalItems,
  totalPages,
}: {
  totalItems: number;
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const { loading, setLoading } = useLoaderStore((state) => state);

  const currentPage = Number(searchParams.get('page') ?? 0);
  const pageSize = Number(searchParams.get('pageSize') ?? DEFAULT_PAGE_SIZE);

  const start = totalItems === 0 ? 0 : currentPage * pageSize + 1;
  const end = Math.min(start + pageSize - 1, totalItems);

  function handlePage(pageNumber: number) {
    setLoading(true);

    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handlePageSize(value: string) {
    setLoading(true);

    const params = new URLSearchParams(searchParams);
    params.set('page', '0');
    params.set('pageSize', value);
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <Fragment>
      <div className="flex justify-between bg-neutral-700">
        <div className="ml-2 flex items-center">
          <div>Rows Per Page</div>
          <select
            aria-label="Rows per page"
            className="ml-2 w-14 rounded border border-white bg-neutral-900 px-2 py-1
              hover:cursor-pointer hover:border-blue-400 focus:ring-blue-400
              focus:outline-blue-400"
            onChange={(e) => {
              handlePageSize(e.target.value);
            }}
            defaultValue={searchParams.get('pageSize')?.toString()}
            disabled={loading}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <div className="flex items-center">
          <PaginationArrow
            direction="left"
            onClick={() => handlePage(currentPage - 1)}
            isDisabled={currentPage <= 0 || loading}
          />
          <div className="mx-2">
            Showing {start} - {end} of {totalItems}
          </div>
          <PaginationArrow
            direction="right"
            onClick={() => handlePage(currentPage + 1)}
            isDisabled={currentPage >= totalPages - 1 || loading}
          />
        </div>
      </div>
    </Fragment>
  );
}

function PaginationArrow({
  direction,
  onClick,
  isDisabled,
}: {
  direction: 'left' | 'right';
  onClick: () => void;
  isDisabled?: boolean;
}) {
  const className = clsx('p-2', {
    'cursor-not-allowed text-gray-400': isDisabled,
    'text-white hover:bg-neutral-800': !isDisabled,
  });

  const icon =
    direction === 'left' ? (
      <ChevronLeftIcon className="w-8" aria-label="Previous page" />
    ) : (
      <ChevronRightIcon className="w-8" aria-label="Next page" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <button className={className} onClick={onClick}>
      {icon}
    </button>
  );
}
