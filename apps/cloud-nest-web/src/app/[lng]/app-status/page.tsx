'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import AppIcon from '@/components/app-icon/app-icon';

export default function AppStatus() {
  const searchParams = useSearchParams();
  const title = searchParams.get('title') || 'Unknown error';
  const description = searchParams.get('description') || 'Oops! an unknown exception occurred.';
  const icon = searchParams.get('icon') || 'mdi:error';
  const iconColor = searchParams.get('iconColor') || '#f5a524';

  return (
    <Suspense>
      <section className="w-full h-full flex items-center justify-center">
        {/* Container */}
        <div className="px-5 py-16 md:px-10 md:py-20">
          {/* Component */}
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
            <AppIcon className="text-9xl mb-8" style={{ color: iconColor }} icon={icon} />
            <h1 className="mb-4 text-4xl font-bold md:text-6xl">{title}</h1>
            <p className="mx-auto mb-5 max-w-lg text-sm text-left text-gray-500 sm:text-base md:mb-6 lg:mb-8">
              {description}
            </p>
            {/* <a
            href="#"
            className="inline-block items-center rounded-md bg-black px-8 py-4 text-center font-semibold text-white"
          >
            Back Home
          </a> */}
          </div>
        </div>
      </section>
    </Suspense>
  );
}
