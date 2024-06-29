'use client';

import { Button, Card } from '@nextui-org/react';
import NextImage from 'next/image';
import { ComponentProps, SyntheticEvent, useState } from 'react';
import AppIcon from '../app-icon/app-icon';

interface ImageCardProps extends ComponentProps<'div'> {
  image: {
    name: string;
    url: string;
  };
  fallbackSrc?: string;
}

export default function ImageCard({ image, fallbackSrc, className }: ImageCardProps) {
  const [isError, setIsError] = useState(false);
  const [imageSrc, setImageSrc] = useState(image.url);
  const [isPreview, setIsPreview] = useState(false);

  function onImageError(ev: SyntheticEvent<HTMLImageElement>) {
    setIsError(true);
    if (fallbackSrc && ev.target instanceof HTMLImageElement) {
      // eslint-disable-next-line no-param-reassign
      setImageSrc(fallbackSrc);
    }
  }

  function refreshImage() {
    setIsError(false);
    setImageSrc(image.url);
  }

  function togglePreview() {
    setIsPreview(!isPreview);
  }

  return (
    <Card className={`relative ${className}`}>
      {isError ? (
        <Button isIconOnly radius="full" className="absolute z-10 m-auto left-0 right-0 top-0 bottom-0" color="warning">
          <AppIcon onClick={() => refreshImage()} icon="mdi:refresh" />
        </Button>
      ) : (
        <Button
          color="primary"
          variant="light"
          isIconOnly
          radius="full"
          className="absolute z-10 m-auto left-0 right-0 top-0 bottom-0"
          onClick={() => togglePreview()}
        >
          <AppIcon icon="mdi:eye-outline" />
        </Button>
      )}
      <NextImage quality={50} src={imageSrc} alt={image.name} loading="lazy" fill onError={(ev) => onImageError(ev)} />
      {isPreview && (
        <div
          onClick={() => togglePreview()}
          role="button"
          onKeyDown={() => togglePreview()}
          tabIndex={0}
          className="fixed z-50 left-0 top-0 w-full h-full bg-[rgba(0,0,0,.5)] flex justify-center items-center"
        >
          <NextImage unoptimized fill style={{ objectFit: 'contain' }} src={imageSrc} alt={image.name} />
        </div>
      )}
    </Card>
  );
}
