'use client';

import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadImage } from '@/lib/imageService';
import ClientImage from './ClientImage';

type ProductImageUploaderProps = {
  images: string[];
  onChange: (urls: string[]) => void;
  multiple?: boolean;
};

export default function ProductImageUploader({ 
  images, 
  onChange, 
  multiple = true 
}: ProductImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [localImages, setLocalImages] = useState<string[]>(images);

  useEffect(() => {
    // 每当外部images发生变化时，更新本地状态
    setLocalImages(images);
  }, [images]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        setIsUploading(true);
        
        // 先为每个文件创建临时blob URL以便立即预览
        const tempUrls = acceptedFiles.map(file => URL.createObjectURL(file));
        
        // 添加临时URLs到当前图片列表中
        const updatedImages = multiple ? [...localImages, ...tempUrls] : [...tempUrls];
        setLocalImages(updatedImages);
        
        // 上传所有文件到服务器
        const uploadPromises = acceptedFiles.map(async (file, index) => {
          try {
            const url = await uploadImage(file);
            
            // 替换blob URL为服务器URL
            return { tempUrl: tempUrls[index], serverUrl: url };
          } catch (error) {
            console.error('上传图片失败:', error);
            return { tempUrl: tempUrls[index], serverUrl: null };
          }
        });
        
        const results = await Promise.all(uploadPromises);
        
        // 更新图片列表，替换临时URL为服务器URL
        const finalImages = localImages.map(img => {
          const match = results.find(r => r.tempUrl === img);
          return match ? (match.serverUrl || img) : img;
        });
        
        // 过滤掉上传失败的图片
        const validImages = finalImages.filter(url => url !== null);
        
        // 更新组件状态和父组件
        setLocalImages(validImages as string[]);
        onChange(validImages as string[]);
        
        // 释放blob URLs
        tempUrls.forEach(url => URL.revokeObjectURL(url));
      } catch (error) {
        console.error('处理图片上传失败:', error);
      } finally {
        setIsUploading(false);
      }
    },
    [localImages, onChange, multiple]
  );

  const removeImage = (indexToRemove: number) => {
    const newImages = localImages.filter((_, index) => index !== indexToRemove);
    setLocalImages(newImages);
    onChange(newImages);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    multiple
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
          isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300'
        } ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <input {...getInputProps()} />
        {isUploading ? (
          <p className="text-gray-500">上传中，请稍候...</p>
        ) : isDragActive ? (
          <p className="text-primary">拖放图片到这里</p>
        ) : (
          <p className="text-gray-500">
            {multiple ? '点击或拖放图片到这里上传' : '点击或拖放一张图片到这里上传'}
          </p>
        )}
      </div>

      {localImages.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {localImages.map((src, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square relative overflow-hidden rounded-md bg-gray-100">
                <ClientImage
                  src={src}
                  alt={`上传的图片 ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 