'use client';

import { useLoaderStore } from '@/lib/store';
import { useSearchParams } from 'next/navigation';
import React, { Fragment, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';

export default function Loader() {
  const searchParams = useSearchParams();

  const { loading, setLoading } = useLoaderStore((state) => state);

  const searchParamsString = searchParams.toString();

  useEffect(() => {
    setLoading(false);
  }, [searchParamsString, setLoading]);

  return (
    <Fragment>
      {loading && (
        <ClipLoader
          color="#fff"
          size={120}
          className="fixed top-[40%] left-[50%] translate-[-50%]"
        />
      )}
    </Fragment>
  );
}
