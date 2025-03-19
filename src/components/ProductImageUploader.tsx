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
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({});
  const [localImages, setLocalImages] = useState<string[]>(images);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    setLocalImages(images);
  }, [images]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        setIsUploading(true);
        setUploadError(null);
        
        console.log('准备上传文件:', acceptedFiles.map(f => f.name).join(', '));
        
        // 创建临时预览
        const tempUrls = acceptedFiles.map(file => URL.createObjectURL(file));
        const updatedImages = multiple ? [...localImages, ...tempUrls] : tempUrls;
        setLocalImages(updatedImages);
        
        // 上传文件
        const uploadPromises = acceptedFiles.map(async (file, index) => {
          try {
            setUploadProgress(prev => ({ ...prev, [tempUrls[index]]: 0 }));
            
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
            const url = blob.url;
            
            setUploadProgress(prev => ({ ...prev, [tempUrls[index]]: 100 }));
            return { tempUrl: tempUrls[index], serverUrl: url };
          } catch (error) {
            console.error('上传图片失败:', error);
            setUploadProgress(prev => ({ ...prev, [tempUrls[index]]: -1 }));
            return { tempUrl: tempUrls[index], serverUrl: null };
          }
        });
        
        const results = await Promise.all(uploadPromises);
        
        // 检查是否所有上传都失败
        const allFailed = results.every(r => r.serverUrl === null);
        if (allFailed && acceptedFiles.length > 0) {
          setUploadError('所有图片上传失败，请重试');
        }
        
        // 更新图片列表
        const finalImages = localImages.map(img => {
          const match = results.find(r => r.tempUrl === img);
          return match ? (match.serverUrl || img) : img;
        }).filter(url => url !== null && !url.startsWith('blob:'));
        
        console.log('成功上传图片URL:', finalImages);
        
        setLocalImages(finalImages);
        onChange(finalImages);
        
        // 清理临时URL
        tempUrls.forEach(url => URL.revokeObjectURL(url));
      } catch (error) {
        console.error('处理图片上传失败:', error);
        setUploadError(error instanceof Error ? error.message : '上传过程中发生错误');
      } finally {
        setIsUploading(false);
        setUploadProgress({});
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
              <div className="aspect-square relative w-full h-[200px] overflow-hidden rounded-md bg-gray-100">
                <ClientImage
                  src={src}
                  alt={`上传的图片 ${index + 1}`}
                  fill
                  priority={index < 4}
                  className="object-cover"
                />
                {uploadProgress[src] !== undefined && uploadProgress[src] !== 100 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    {uploadProgress[src] === -1 ? (
                      <span className="text-white text-sm">上传失败</span>
                    ) : (
                      <span className="text-white text-sm">{uploadProgress[src]}%</span>
                    )}
                  </div>
                )}
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