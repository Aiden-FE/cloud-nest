'use client';

import { useEffect, useMemo, useState } from 'react';
import ImageCard from '@/components/image-card';

export default function ImagesPage() {
  const [images, setImages] = useState<{ name: string; size: number; url: string }[]>([]);

  async function getImages() {
    fetch('/api/assets/images', {
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
        <ImageCard
          key={image.name}
          image={image}
          fallbackSrc="https://juehackr.net/uploads/biyingbizhi/20200419.jpg"
          className="col-span-4 sm:col-span-2 h-[180px] sm:h-[300px]"
        />
      );
    });
  }, [images]);

  return <div className="grid grid-cols-12 gap-1">{cards}</div>;
}
