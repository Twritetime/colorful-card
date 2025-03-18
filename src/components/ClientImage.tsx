'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

type ClientImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export default function ClientImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = '',
  style = {},
}: ClientImageProps) {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 检查是否为blob URL
    if (src.startsWith('blob:')) {
      setImageSrc(src);
      setIsLoading(false);
      return;
    }

    // 检查是否为API URL
    if (src.startsWith('/api/images/')) {
      setImageSrc(src);
      setIsLoading(false);
      return;
    }

    // 默认使用传入的src
    setImageSrc(src);
    setIsLoading(false);
  }, [src]);

  if (isLoading) {
    return (
      <div
        className={`bg-gray-200 animate-pulse ${className}`}
        style={{
          width: width ? `${width}px` : '100%',
          height: height ? `${height}px` : '100%',
          ...style,
        }}
      />
    );
  }

  if (error) {
    return (
      <div
        className={`bg-gray-100 flex items-center justify-center text-gray-500 ${className}`}
        style={{
          width: width ? `${width}px` : '100%',
          height: height ? `${height}px` : '100%',
          ...style,
        }}
      >
        图片加载失败
      </div>
    );
  }

  if (fill) {
    return (
      <div className={`relative ${className}`} style={style}>
        <Image
          src={imageSrc}
          alt={alt}
          fill
          style={{ objectFit: 'cover' }}
          onError={() => setError('加载失败')}
          unoptimized={imageSrc.startsWith('blob:') || process.env.NODE_ENV === 'development'}
        />
      </div>
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width || 300}
      height={height || 300}
      className={className}
      style={style}
      onError={() => setError('加载失败')}
      unoptimized={imageSrc.startsWith('blob:') || process.env.NODE_ENV === 'development'}
    />
  );
} 