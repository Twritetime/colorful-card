'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ClientImage from './ClientImage';

type ImageDropzoneProps = {
  images: string[];
  onChange: (urls: string[]) => void;
  multiple?: boolean;
};

export default function ImageDropzone({ images, onChange, multiple = true }: ImageDropzoneProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        setIsUploading(true);
        setUploadError(null);
        
        console.log('准备上传文件:', acceptedFiles.map(f => f.name).join(', '));
        
        // 上传所有文件
        const uploadedUrls = await Promise.all(
          acceptedFiles.map(async (file) => {
            try {
              // 添加时间戳确保文件名唯一
              const timestamp = new Date().getTime();
              const uniqueFilename = `${timestamp}-${file.name}`;
              
              console.log(`开始上传文件: ${uniqueFilename}`);
              
              const response = await fetch(
                `/api/upload?filename=${encodeURIComponent(uniqueFilename)}`,
                {
                  method: 'POST',
                  body: file,
                }
              );

              if (!response.ok) {
                const errorData = await response.json();
                console.error('上传响应错误:', errorData);
                throw new Error(`上传失败: ${errorData.error || response.statusText}`);
              }

              const blob = await response.json();
              console.log('上传成功, 返回数据:', blob);
              return blob.url;
            } catch (error) {
              console.error('上传图片失败:', error);
              return null;
            }
          })
        );

        // 过滤掉上传失败的图片
        const validUrls = uploadedUrls.filter((url): url is string => url !== null);
        
        if (validUrls.length === 0 && acceptedFiles.length > 0) {
          setUploadError('所有图片上传失败，请重试');
          return;
        }
        
        console.log('成功上传图片URL:', validUrls);
        
        // 更新图片列表
        if (multiple) {
          onChange([...images, ...validUrls]);
        } else {
          onChange(validUrls.length > 0 ? [validUrls[0]] : []);
        }
      } catch (error) {
        console.error('处理图片上传失败:', error);
        setUploadError(error instanceof Error ? error.message : '上传过程中发生错误');
      } finally {
        setIsUploading(false);
      }
    },
    [images, onChange, multiple]
  );

  const removeImage = (indexToRemove: number) => {
    onChange(images.filter((_, index) => index !== indexToRemove));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple,
    maxSize: 4 * 1024 * 1024, // 限制文件大小为4MB
    disabled: isUploading
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
            <br />
            <span className="text-xs text-gray-400">支持JPG、PNG、GIF、WEBP格式，单文件最大4MB</span>
          </p>
        )}
      </div>

      {uploadError && (
        <div className="mt-2 text-sm text-red-500">
          {uploadError}
        </div>
      )}

      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((src, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square relative overflow-hidden rounded-md">
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