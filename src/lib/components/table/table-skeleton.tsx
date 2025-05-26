import React from 'react';

export default function TableSkeleton() {
  return (
    <div className="mx-4 animate-pulse">
      <div className="my-6 h-12 rounded bg-neutral-600"></div>
      <div className="mb-6 h-6 rounded bg-neutral-700"></div>
      <div className="mb-6 h-6 rounded bg-neutral-600"></div>
      <div className="mb-6 h-6 rounded bg-neutral-700"></div>
    </div>
  );
}
