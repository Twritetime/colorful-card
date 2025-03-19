'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ClientImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
  style?: React.CSSProperties;
}

export default function ClientImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  priority = false,
  sizes,
  style,
}: ClientImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // 处理图片源
  let imageSrc = src;
  if (src.startsWith('/api/images/')) {
    imageSrc = `${process.env.NEXT_PUBLIC_API_URL}${src}`;
  }

  // 如果是占位图片，使用默认尺寸
  if (src.includes('placehold.co')) {
    width = width || 600;
    height = height || 400;
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {error ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
          图片加载失败
        </div>
      ) : (
        <Image
          src={imageSrc}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          className={cn(
            'duration-700 ease-in-out',
            isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0',
            className
          )}
          priority={priority}
          sizes={sizes}
          style={style}
          onLoadingComplete={() => setIsLoading(false)}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
} 