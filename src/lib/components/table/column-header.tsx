'use client';

import { useLoaderStore } from '@/lib/store';
import { RowType } from '@/lib/types/types';
import { ArrowDownIcon } from '@heroicons/react/24/solid';
import { ArrowUpIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

type SortDirection = 'asc' | 'desc' | '';

function getNextDirection(sortDirection: SortDirection): SortDirection {
  if (sortDirection === 'asc') {
    return 'desc';
  }

  if (sortDirection === 'desc') {
    return '';
  }

  return 'asc';
}

export default function ColumnHeader<T extends RowType>({
  field,
  headerName,
}: {
  field?: keyof T;
  headerName: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const { loading, setLoading } = useLoaderStore((state) => state);

  const currentSort = searchParams.get('sort');

  const sortArray =
    currentSort?.split(',').map((pair) => {
      const pairArray = pair.split(':');

      return { field: pairArray[0], direction: pairArray[1] as SortDirection };
    }) ?? [];

  const currentDirection: SortDirection =
    sortArray.find((sort) => sort.field === field)?.direction ?? '';

  function sort() {
    setLoading(true);

    const params = new URLSearchParams(searchParams);
    const nextDirection = getNextDirection(currentDirection);

    const sortParam =
      nextDirection !== '' ? `${field?.toString()}:${nextDirection}` : null;

    if (sortParam) {
      params.set('sort', sortParam);
    } else {
      params.delete('sort');
    }

    replace(`${pathname}?${params.toString()}`);
  }

  const icon =
    currentDirection === 'asc' ? (
      <ArrowUpIcon className="w-4" />
    ) : (
      <ArrowDownIcon className="w-4" />
    );

  return (
    <th
      className="cursor-pointer p-3 py-4 text-left"
      onClick={() => {
        if (field && !loading) {
          sort();
        }
      }}
    >
      <div className="flex items-center gap-1">
        <div>{headerName}</div>
        <div
          className={clsx({
            invisible: currentDirection === '',
          })}
        >
          {icon}
        </div>
      </div>
    </th>
  );
}
