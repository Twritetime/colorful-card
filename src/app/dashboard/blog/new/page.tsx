'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/contexts/LanguageContext';
import { createBlogPost } from '@/lib/blogService';
import Link from 'next/link';
import ProductImageUploader from '@/components/ProductImageUploader';
import RichTextEditor from '@/components/RichTextEditor';
import 'react-quill/dist/quill.snow.css';

export default function CreateBlogPostPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverImage, setCoverImage] = useState('');
  const [content, setContent] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    author: '',
    status: 'draft',
    tags: '',
  });
  const [errors, setErrors] = useState({
    title: '',
    content: '',
    author: '',
  });
  const [autoSaveStatus, setAutoSaveStatus] = useState('');
  const [saveTimeout, setSaveTimeout] = useState(null);

  // 加载自动保存的数据
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('blog-draft');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData.formData || formData);
        setContent(parsedData.content || '');
        setCoverImage(parsedData.coverImage || '');
        setAutoSaveStatus('已恢复草稿');
      }
    } catch (error) {
      console.error('恢复草稿失败:', error);
    }
  }, []);

  // 自动保存功能
  useEffect(() => {
    // 清除之前的超时
    if (saveTimeout) {
      clearTimeout(saveTimeout);
    }

    // 设置新的超时，延迟2秒保存，避免频繁保存
    const timeoutId = setTimeout(() => {
      try {
        // 只有当有内容时才保存
        if (content.trim() || formData.title.trim() || formData.excerpt.trim()) {
          localStorage.setItem('blog-draft', JSON.stringify({
            formData,
            content,
            coverImage
          }));
          setAutoSaveStatus('草稿已自动保存');
          
          // 5秒后清除状态消息
          setTimeout(() => {
            setAutoSaveStatus('');
          }, 5000);
        }
      } catch (error) {
        console.error('自动保存失败:', error);
        setAutoSaveStatus('自动保存失败');
      }
    }, 2000);

    setSaveTimeout(timeoutId);

    // 组件卸载时清理
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [formData, content, coverImage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // 清除错误
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      title: '',
      content: '',
      author: '',
    };
    let isValid = true;

    if (!formData.title.trim()) {
      newErrors.title = '标题不能为空';
      isValid = false;
    }

    if (!content.trim()) {
      newErrors.content = '内容不能为空';
      isValid = false;
    }

    if (!formData.author.trim()) {
      newErrors.author = '作者不能为空';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // 准备标签数组
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag);
      
      // 准备发布日期
      const publishedAt = formData.status === 'published' ? new Date().toISOString() : null;
      
      // 准备slug
      const slug = formData.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
      
      const blogPostData = {
        ...formData,
        content,
        tags: tagsArray,
        slug,
        coverImage,
        publishedAt,
      };
      
      const newPost = await createBlogPost(blogPostData);
      
      if (newPost) {
        // 清除本地存储的草稿
        localStorage.removeItem('blog-draft');
        router.push('/dashboard/blog');
      } else {
        alert('创建文章失败，请重试。');
      }
    } catch (error) {
      console.error('创建博客文章失败:', error);
      alert('发生错误，请重试。');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 图片上传处理函数
  const handleQuillImageUpload = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    
    input.onchange = async () => {
      const file = input.files[0];
      // 这里应该接入您的图片上传API
      // 上传成功后获取URL并插入到编辑器中
      alert('请实现图片上传功能，或使用正文上方的图片上传器上传图片');
    };
  };

  // 清除草稿
  const handleClearDraft = () => {
    if (confirm('确定要清除所有草稿内容吗？此操作无法撤销。')) {
      localStorage.removeItem('blog-draft');
      setFormData({
        title: '',
        excerpt: '',
        author: '',
        status: 'draft',
        tags: '',
      });
      setContent('');
      setCoverImage('');
      setAutoSaveStatus('草稿已清除');
      setTimeout(() => setAutoSaveStatus(''), 3000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link 
          href="/dashboard/blog" 
          className="inline-flex items-center text-primary hover:text-primary/80 dark:hover:text-primary/90 transition-colors mr-4"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-1" />
          返回博客管理
        </Link>
        <h1 className="text-2xl font-bold">
          创建新博客文章
        </h1>
        
        {autoSaveStatus && (
          <div className="ml-auto text-sm text-muted-foreground flex items-center">
            {autoSaveStatus}
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="bg-card rounded-lg shadow p-6 mb-6">
          <div className="mb-4">
            <label htmlFor="title" className="block mb-2 font-medium">
              标题 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
          </div>
          
          <div className="mb-4">
            <label htmlFor="author" className="block mb-2 font-medium">
              作者 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              className="w-full p-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
            {errors.author && <p className="mt-1 text-sm text-red-500">{errors.author}</p>}
          </div>
          
          <div className="mb-4">
            <label htmlFor="excerpt" className="block mb-2 font-medium">
              摘要（简短描述）
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              rows={3}
              className="w-full p-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          
          <div className="mb-6">
            <label className="block mb-2 font-medium">
              封面图片
            </label>
            <ProductImageUploader
              images={coverImage ? [coverImage] : []}
              onImagesChange={(urls) => setCoverImage(urls[0] || '')}
              maxImages={1}
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="content" className="block mb-2 font-medium">
              内容 <span className="text-red-500">*</span>
            </label>
            <div className="border border-input rounded-md bg-background">
              <RichTextEditor 
                value={content}
                onChange={setContent}
                error={errors.content}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="tags" className="block mb-2 font-medium">
              标签（用逗号分隔）
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              className="w-full p-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="技术, 新闻, 教程"
            />
          </div>
          
          <div className="mb-6">
            <label className="block mb-2 font-medium">
              状态
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="draft"
                  checked={formData.status === 'draft'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span>
                  草稿
                </span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="published"
                  checked={formData.status === 'published'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span>
                  立即发布
                </span>
              </label>
            </div>
          </div>
          
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleClearDraft}
              className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-colors"
            >
              清除草稿
            </button>
            
            <div className="flex">
              <button
                type="button"
                onClick={() => router.push('/dashboard/blog')}
                className="px-4 py-2 border border-input rounded-md mr-2 hover:bg-muted transition-colors"
              >
                取消
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 border border-transparent rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "保存中..." : "保存文章"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
} 