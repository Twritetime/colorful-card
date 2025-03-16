'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

interface ImageDropzoneProps {
  initialImages?: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

export default function ImageDropzone({ 
  initialImages = [], 
  onImagesChange,
  maxImages = 5
}: ImageDropzoneProps) {
  const [images, setImages] = useState<string[]>(initialImages);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    
    // 检查文件数量是否超过最大值
    if (images.length + acceptedFiles.length > maxImages) {
      setError(`最多只能上传${maxImages}张图片`);
      return;
    }
    
    // 处理文件上传，在真实应用中，这里应该是将文件上传到服务器或云存储
    // 这里我们使用本地URL预览作为演示
    const newImages = acceptedFiles.map(file => URL.createObjectURL(file));
    const updatedImages = [...images, ...newImages];
    setImages(updatedImages);
    onImagesChange(updatedImages);
  }, [images, maxImages, onImagesChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxSize: 5242880, // 5MB
  });

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
          isDragActive ? 'border-primary/70 bg-primary/5' : 'border-gray-300 hover:border-primary/50'
        }`}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-10 w-10 mx-auto text-muted-foreground mb-3" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
          {isDragActive ? (
            <p className="text-sm text-primary font-medium">放置图片到此处上传</p>
          ) : (
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                将图片拖放到此处，或<span className="text-primary font-medium">点击选择图片</span>
              </p>
              <p className="text-xs text-muted-foreground">
                支持 JPG, PNG, GIF (最大 5MB)
              </p>
            </div>
          )}
        </div>
      </div>
      
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
      
      {images.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">已上传图片 ({images.length}/{maxImages})</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {images.map((src, index) => (
              <div key={index} className="relative group rounded-md overflow-hidden border">
                <div className="aspect-square relative">
                  <Image
                    src={src}
                    alt={`Upload ${index + 1}`}
                    fill
                    className="object-cover"
                    unoptimized={true}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-black/60 hover:bg-red-500 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 