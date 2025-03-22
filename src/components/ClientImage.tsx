'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ClientImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function ClientImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className = '',
  style,
}: ClientImageProps) {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 获取占位图URL
  const getPlaceholderUrl = () => {
    return '/placeholder.svg';
  };

  // 检查URL是否有效
  const isValidUrl = (url: string) => {
    if (!url) return false;
    if (url.startsWith('/')) return true; // 本地路径
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleError = () => {
    console.error('图片加载错误，使用占位图替代:', src);
    setError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  // 确定最终要显示的图片URL
  const imageUrl = error || !isValidUrl(src) ? getPlaceholderUrl() : src;

  // 为fill模式添加必要的样式
  const containerClassName = `relative ${fill ? 'w-full h-full' : ''} ${className}`;
  const imageClassName = `
    duration-700 ease-in-out
    ${isLoading ? 'scale-105 blur-lg' : 'scale-100 blur-0'}
    ${fill ? 'object-cover' : ''}
  `;

  return (
    <div 
      className={containerClassName} 
      style={fill ? { position: 'absolute', inset: 0, ...style } : style}
    >
      <Image
        src={imageUrl}
        alt={alt}
        width={fill ? undefined : (width || 400)}
        height={fill ? undefined : (height || 400)}
        fill={fill}
        priority={priority}
        className={imageClassName}
        onError={handleError}
        onLoad={handleLoad}
        sizes={fill ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" : undefined}
        unoptimized={imageUrl.includes('blob.vercel-storage.com')} // 对于 Vercel Blob Storage URL 禁用优化
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );
} 