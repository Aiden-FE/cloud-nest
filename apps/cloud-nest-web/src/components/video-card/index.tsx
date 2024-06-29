'use client';

/* eslint-disable jsx-a11y/media-has-caption */

import { Button, Card, CardFooter, CardHeader } from '@nextui-org/react';
import { ComponentProps, useState } from 'react';

interface VideoCardProps extends ComponentProps<'video'> {
  video: {
    name: string;
    url: string;
  };
}

export default function VideoCard({ video, className }: VideoCardProps) {
  const [isShowVideo, setIsShowVideo] = useState(false);

  return (
    <Card className={`relative bg-black ${className}`}>
      <CardHeader className="absolute z-10 top-1 flex-col !items-start">
        <p className="text-tiny text-white/60 uppercase font-bold">{video.name}</p>
      </CardHeader>
      {isShowVideo ? (
        <video preload="auto" loop className="w-full h-full object-cover" src={video.url} controls />
      ) : (
        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <Button
            onClick={() => setIsShowVideo(true)}
            className="text-tiny text-white bg-black/20"
            variant="flat"
            color="default"
            radius="lg"
            size="sm"
          >
            Play the video
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
