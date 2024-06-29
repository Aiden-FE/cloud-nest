'use client';

import { Listbox, ListboxItem } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { PageProps } from '@/interfaces';

export default function Home({ params: { lng } }: PageProps) {
  const router = useRouter();

  function onAction(key: string | number) {
    switch (key) {
      case 'images':
        router.push(`/${lng}/images`);
        break;
      case 'videos':
        router.push(`/${lng}/videos`);
        break;
      case 'adminImages':
        router.push(`/${lng}/images/admin`);
        break;
      case 'adminVideos':
        router.push(`/${lng}/videos/admin`);
        break;
      default:
        break;
    }
  }

  return (
    <main className="w-full px-1 py-2">
      <Listbox onAction={(key) => onAction(key)}>
        <ListboxItem key="images">Images</ListboxItem>
        <ListboxItem key="videos">Videos</ListboxItem>
        <ListboxItem key="adminImages">Admin images</ListboxItem>
        <ListboxItem key="adminVideos">Admin videos</ListboxItem>
      </Listbox>
    </main>
  );
}
