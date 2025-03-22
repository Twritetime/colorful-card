'use client';

import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import ClientImage from './ClientImage';
import { Upload, X } from 'lucide-react';

interface ProductImageUploaderProps {
  images: string[];
  onChange: (urls: string[]) => void;
  type?: 'image' | 'video';
}

export default function ProductImageUploader({
  images,
  onChange,
  type = 'image'
}: ProductImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // 组件挂载时打印当前状态
  useEffect(() => {
    console.log(`ProductImageUploader mounted - type: ${type}`);
    console.log('Current images/videos:', images);
  }, [type, images]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      setIsUploading(true);
      setUploadProgress(0);
      
      console.log(`开始上传${type}文件:`, acceptedFiles);
      console.log('文件详情:', acceptedFiles.map(f => ({
        name: f.name,
        size: f.size,
        type: f.type
      })));

      const uploadPromises = acceptedFiles.map(async (file) => {
        // 验证文件大小
        const maxSize = type === 'video' ? 100 * 1024 * 1024 : 5 * 1024 * 1024; // 视频100MB，图片5MB
        if (file.size > maxSize) {
          throw new Error(`文件大小超过限制 (${type === 'video' ? '100MB' : '5MB'})`);
        }

        // 创建FormData对象
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', type); // 添加文件类型信息

        console.log(`正在上传${type}:`, file.name);

        try {
          // 上传到Vercel Blob Storage
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          const responseText = await response.text();
          console.log('Upload response text:', responseText);

          if (!response.ok) {
            let errorData;
            try {
              errorData = JSON.parse(responseText);
            } catch (e) {
              errorData = { error: responseText };
            }
            console.error('上传响应错误:', errorData);
            throw new Error(`上传失败: ${errorData.error || response.statusText}`);
          }

          const data = JSON.parse(responseText);
          console.log(`${type}上传成功:`, data);
          
          if (!data.url) {
            throw new Error('上传成功但未返回URL');
          }

          return data.url;
        } catch (error) {
          console.error(`单个文件上传失败:`, error);
          throw error;
        }
      });

      const urls = await Promise.all(uploadPromises);
      console.log(`所有${type}上传完成:`, urls);

      // 更新图片/视频列表
      const newUrls = [...images, ...urls];
      console.log(`更新${type}列表:`, newUrls);
      onChange(newUrls);
      setUploadProgress(100);
    } catch (error) {
      console.error(`${type}上传错误:`, error);
      alert(error instanceof Error ? error.message : '上传失败');
    } finally {
      setIsUploading(false);
    }
  }, [images, onChange, type]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: type === 'video' 
      ? { 'video/*': ['.mp4', '.webm', '.ogg'] }
      : { 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] },
    multiple: true
  });

  const removeFile = (index: number) => {
    console.log(`删除${type} index:`, index);
    const newFiles = [...images];
    newFiles.splice(index, 1);
    console.log(`删除后的${type}列表:`, newFiles);
    onChange(newFiles);
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'}`}
      >
        <input {...getInputProps()} />
        {isUploading ? (
          <div className="space-y-2">
            <p>正在上传... {uploadProgress}%</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        ) : (
          <div>
            {isDragActive ? (
              <p>将{type === 'video' ? '视频' : '图片'}拖放到此处</p>
            ) : (
              <p>
                点击或拖放{type === 'video' ? '视频' : '图片'}到此处上传
                <br />
                <span className="text-sm text-gray-500">
                  {type === 'video' 
                    ? '支持MP4、WebM、OGG格式，最大100MB'
                    : '支持PNG、JPG、GIF格式，最大5MB'}
                </span>
              </p>
            )}
          </div>
        )}
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((url, index) => (
            <div key={index} className="relative group">
              {type === 'video' ? (
                <video
                  src={url}
                  className="w-full aspect-video object-cover rounded"
                  controls
                />
              ) : (
                <img
                  src={url}
                  alt={`上传的${type} ${index + 1}`}
                  className="w-full aspect-square object-cover rounded"
                />
              )}
              <button
                onClick={() => removeFile(index)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 