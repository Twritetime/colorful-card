'use client';

import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
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
  const [uploadError, setUploadError] = useState<string | null>(null);

  // 确保localImages与外部images同步
  useEffect(() => {
    const validImages = images.filter(url => url && url.includes('blob.vercel-storage.com'));
    setLocalImages(validImages);
  }, [images]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        setIsUploading(true);
        setUploadError(null);

        console.log('准备上传文件:', acceptedFiles.map(f => f.name).join(', '));

        // 上传文件
        const uploadPromises = acceptedFiles.map(async (file) => {
          try {
            // 添加时间戳确保文件名唯一
            const timestamp = new Date().getTime();
            const uniqueFilename = `${timestamp}-${file.name}`;

            console.log(`开始上传文件: ${uniqueFilename}`);

            // 上传到Vercel Blob Storage
            const response = await fetch(`/api/upload?filename=${encodeURIComponent(uniqueFilename)}`, {
              method: 'POST',
              body: file,
            });

            if (!response.ok) {
              const errorData = await response.json();
              console.error('上传响应错误:', errorData);
              throw new Error(`上传失败: ${errorData.error || response.statusText}`);
            }

            const blob = await response.json();
            console.log('上传成功, 返回数据:', blob);

            // 验证返回的URL是否为Blob Storage URL
            if (!blob.url || !blob.url.includes('blob.vercel-storage.com')) {
              throw new Error('上传成功但返回的URL无效');
            }

            return blob.url;
          } catch (error) {
            console.error('上传图片失败:', error);
            return null;
          }
        });

        const uploadedUrls = await Promise.all(uploadPromises);
        const validUrls = uploadedUrls.filter((url): url is string => 
          url !== null && url.includes('blob.vercel-storage.com')
        );

        if (validUrls.length === 0 && acceptedFiles.length > 0) {
          setUploadError('所有图片上传失败，请重试');
          return;
        }

        // 更新图片列表
        const newImages = multiple ? [...localImages, ...validUrls] : validUrls;
        console.log('最终图片URL列表:', newImages);

        setLocalImages(newImages);
        onChange(newImages);
      } catch (error) {
        console.error('处理图片上传失败:', error);
        setUploadError(error instanceof Error ? error.message : '上传过程中发生错误');
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
        className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50'
        } ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <input {...getInputProps()} />
        {isUploading ? (
          <p className="text-gray-500">正在上传图片，请稍候...</p>
        ) : isDragActive ? (
          <p className="text-primary">松开鼠标上传图片</p>
        ) : (
          <p className="text-gray-500">
            {multiple ? '点击或拖放图片到这里上传（可多选）' : '点击或拖放一张图片到这里上传'}
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

      {localImages.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {localImages.map((src, index) => (
            <div key={src} className="relative group">
              <div className="aspect-square relative w-full">
                <ClientImage
                  src={src}
                  alt={`上传的图片${index + 1}`}
                  fill
                  priority={index < 4}
                  className="object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                disabled={isUploading}
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
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 