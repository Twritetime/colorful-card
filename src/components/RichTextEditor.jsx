'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// 完全避免SSR
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <div className="h-48 border border-input rounded-md bg-background flex items-center justify-center">加载编辑器中...</div>
});

// Quill 编辑器配置
const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'color': [] }, { 'background': [] }],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    matchVisual: false,
  },
  tiptap: {
    immediatelyRender: false // 修复Tiptap SSR问题
  }
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet', 'indent',
  'color', 'background',
  'link', 'image', 'video'
];

const RichTextEditor = ({ value, onChange, error }) => {
  const [mounted, setMounted] = useState(false);
  
  // 确保客户端渲染
  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 100); // 延迟渲染，确保组件完全水合
  }, []);
  
  if (!mounted) {
    return (
      <div className="h-48 border border-input rounded-md bg-background flex items-center justify-center">
        加载编辑器中...
      </div>
    );
  }
  
  return (
    <div>
      <div className="quill-wrapper">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          className="bg-background text-foreground"
          placeholder="请输入内容..."
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      <p className="mt-2 text-sm text-muted-foreground">
        提示：可以直接在编辑器中插入图片和视频，或通过复制粘贴添加
      </p>
    </div>
  );
};

export default RichTextEditor; 