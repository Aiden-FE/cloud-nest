'use client';

import { Card, Image } from '@nextui-org/react';
import { useEffect, useMemo, useState } from 'react';

export default function ImagesAdminPage() {
  const [images, setImages] = useState<{ name: string; size: number; url: string }[]>([]);

  async function getImages() {
    fetch('/api/assets/admin/images', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setImages(result.data);
      });
  }

  useEffect(() => {
    getImages();
  }, []);

  const cards = useMemo(() => {
    return images.map((image) => {
      return (
        <Card key={image.name} className="col-span-4 sm:col-span-2 h-[180px] sm:h-[300px]">
          <Image
            removeWrapper
            alt={image.name}
            isZoomed
            sizes={image.size.toString()}
            loading="lazy"
            className="z-0 w-full h-full object-cover"
            src={image.url}
            fallbackSrc="https://juehackr.net/uploads/biyingbizhi/20200419.jpg"
          />
        </Card>
      );
    });
  }, [images]);

  return <div className="grid grid-cols-12 gap-1">{cards}</div>;
}
