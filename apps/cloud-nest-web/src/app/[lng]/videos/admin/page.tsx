'use client';

import { useEffect, useMemo, useState } from 'react';
import VideoCard from '@/components/video-card';

export default function VideosPage() {
  const [videos, setVideos] = useState<{ name: string; size: number; url: string }[]>([]);

  async function getVideos() {
    fetch('/api/assets/admin/videos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setVideos(result.data);
      });
  }

  useEffect(() => {
    getVideos();
  }, []);

  const cards = useMemo(() => {
    return videos.map((video) => {
      return <VideoCard key={video.name} video={video} className="col-span-4 sm:col-span-2 h-[180px] sm:h-[300px]" />;
    });
  }, [videos]);

  return <div className="grid grid-cols-12 gap-1">{cards}</div>;
}
