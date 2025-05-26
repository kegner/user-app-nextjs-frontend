import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <div
      className="sticky top-0 z-100 mb-4 flex w-full justify-center bg-neutral-600 p-4
        align-middle"
    >
      <Link href="/" className="text-xl">
        User App
      </Link>
    </div>
  );
}
