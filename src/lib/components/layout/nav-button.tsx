import { Url } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';
import React, { ReactNode } from 'react';

export default function NavButton({
  children,
  href,
}: {
  children: ReactNode;
  href: Url;
}) {
  return (
    <Link
      className="h-8 rounded bg-neutral-200 px-2 py-1 font-bold text-neutral-900
        hover:bg-blue-200 focus:bg-blue-200 focus:outline-blue-500"
      href={href}
    >
      {children}
    </Link>
  );
}
