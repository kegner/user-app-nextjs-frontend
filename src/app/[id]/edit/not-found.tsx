import NavButton from '@/lib/components/layout/nav-button';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <ExclamationTriangleIcon className="w-12 text-neutral-100" />
      <h2>Not Found</h2>
      <div className="mb-4">This user could not be found.</div>
      <NavButton href="/">Go Back</NavButton>
    </main>
  );
}
