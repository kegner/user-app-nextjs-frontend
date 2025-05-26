import React from 'react';
import DataTable from './data-table';
import { ColumnDef, QueryParams, User } from '@/lib/types/types';
import { DEFAULT_PAGE_SIZE, fetchUsers } from '@/lib/data';
import { PencilIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import DeleteButton from './delete-button';

const columns: ColumnDef<User>[] = [
  {
    id: 'firstName',
    field: 'firstName',
    headerName: 'First Name',
  },
  {
    id: 'lastName',
    field: 'lastName',
    headerName: 'Last Name',
  },
  {
    id: 'email',
    field: 'email',
    headerName: 'Email',
  },
  {
    id: 'createdDate',
    field: 'createdDate',
    headerName: 'Created On',
    formatter: (row: User) =>
      row.createdDate.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      }),
  },
  {
    id: 'action',
    headerName: 'Actions',
    formatter: (row: User) => (
      <div className="flex gap-4">
        <Link href={`${row.id}/edit`}>
          <PencilIcon className="w-6" aria-label="Edit User" />
        </Link>
        <DeleteButton id={row.id} />
      </div>
    ),
  },
];

export default async function UserTable({
  queryParams,
}: {
  queryParams?: QueryParams;
}) {
  const results = await fetchUsers(queryParams);
  const pageSize = queryParams?.pageSize ?? DEFAULT_PAGE_SIZE;

  const totalPages = Math.max(Math.ceil(results.total / pageSize), 1);

  return (
    <DataTable
      data={results.users}
      columns={columns}
      totalPages={totalPages}
      totalItems={results.total}
    />
  );
}
