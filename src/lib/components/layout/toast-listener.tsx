'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Fragment, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function ToastListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const showToast = Boolean(searchParams.get('showToast'));
  const toastMessage = searchParams.get('toastMessage');

  useEffect(() => {
    if (showToast) {
      toast.success(toastMessage);
      const params = new URLSearchParams(searchParams);
      params.delete('showToast');
      params.delete('toastMessage');
      replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [pathname, replace, searchParams, showToast, toastMessage]);

  return <Fragment />;
}
