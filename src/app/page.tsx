import NavButton from '@/lib/components/layout/nav-button';
import Search from '@/lib/components/table/search';
import TableSkeleton from '@/lib/components/table/table-skeleton';
import UserTable from '@/lib/components/table/user-table';
import { QueryParams } from '@/lib/types/types';
import React, { Fragment, Suspense } from 'react';

export default async function Page(props: {
  searchParams?: Promise<QueryParams>;
}) {
  const queryParams = await props.searchParams;

  return (
    <Fragment>
      <div className="mx-4 flex items-center justify-between">
        <NavButton href="/create">Create User</NavButton>
        <Search />
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <UserTable queryParams={queryParams} />
      </Suspense>
    </Fragment>
  );
}
