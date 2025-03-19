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
    const loadImage = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // 检查是否为blob URL
        if (src.startsWith('blob:')) {
          setImageSrc(src);
          return;
        }

        // 检查是否为API URL
        if (src.startsWith('/api/images/')) {
          // 确保URL格式正确
          const imageId = src.split('/api/images/')[1];
          if (imageId) {
            setImageSrc(`/api/images/${imageId}`);
            return;
          }
        }

        // 检查是否为完整URL
        if (src.startsWith('http://') || src.startsWith('https://')) {
          setImageSrc(src);
          return;
        }

        // 默认使用传入的src
        setImageSrc(src);
      } catch (err) {
        console.error('加载图片失败:', err);
        setError('加载失败');
      } finally {
        setIsLoading(false);
      }
    };

    loadImage();
  }, [src]);

  const containerStyle = {
    width: width ? `${width}px` : '100%',
    height: height ? `${height}px` : '100%',
    ...style,
  };

  if (isLoading) {
    return (
      <div
        className={`bg-gray-200 animate-pulse ${className}`}
        style={containerStyle}
      />
    );
  }

  if (error) {
    return (
      <div
        className={`bg-gray-100 flex items-center justify-center text-gray-500 ${className}`}
        style={containerStyle}
      >
        <span className="text-sm">图片加载失败</span>
      </div>
    );
  }

  const imageProps = {
    src: imageSrc,
    alt,
    onError: () => setError('加载失败'),
    unoptimized: true,
    loading: "lazy" as const,
    className: `${className} ${fill ? 'object-cover' : ''}`.trim(),
  };

  if (fill) {
    return (
      <div className="relative w-full h-full" style={style}>
        <Image
          {...imageProps}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    );
  }

  return (
    <Image
      {...imageProps}
      width={width || 300}
      height={height || 300}
      style={style}
    />
  );
} 