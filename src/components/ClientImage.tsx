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
}

export default function ClientImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className = '',
}: ClientImageProps) {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 验证URL是否为有效的Blob Storage URL
  const isBlobUrl = (url: string) => {
    return url.includes('blob.vercel-storage.com');
  };

  // 获取占位图URL的辅助函数
  const getPlaceholderUrl = (text: string = '图片加载失败') => {
    const imageWidth = fill ? 400 : (width || 400);
    const imageHeight = fill ? 400 : (height || 400);
    return `/api/placeholder?width=${imageWidth}&height=${imageHeight}&text=${encodeURIComponent(text)}`;
  };

  // 检查src是否已经是占位图URL
  const isPlaceholderUrl = (url: string) => {
    return url.startsWith('/api/placeholder');
  };

  const handleError = () => {
    // 如果当前src已经是占位图但仍然失败，避免无限循环
    if (!isPlaceholderUrl(src)) {
      console.error('图片加载错误，使用占位图替代:', src);
      setError(true);
    } else {
      console.error('占位图也加载失败:', src);
    }
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  // 确定最终要显示的图片URL
  const imageUrl = (() => {
    if (!src || src === '') {
      return getPlaceholderUrl(alt);
    }
    if (error) {
      return getPlaceholderUrl(alt);
    }
    if (isBlobUrl(src)) {
      return src;
    }
    // 如果不是Blob URL，检查是否是完整的URL
    if (src.startsWith('http://') || src.startsWith('https://')) {
      return src;
    }
    // 如果是相对路径，确保它是有效的
    if (src.startsWith('/')) {
      return src;
    }
    // 其他情况使用占位图
    return getPlaceholderUrl(alt);
  })();

  // 为fill模式添加必要的样式
  const containerClassName = `relative ${fill ? 'w-full h-full' : ''} ${className}`;
  const imageClassName = `
    duration-700 ease-in-out
    ${isLoading ? 'scale-105 blur-lg' : 'scale-100 blur-0'}
    ${fill ? 'object-cover' : ''}
  `;

  return (
    <div className={containerClassName} style={fill ? { position: 'absolute', inset: 0 } : undefined}>
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
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );
} 