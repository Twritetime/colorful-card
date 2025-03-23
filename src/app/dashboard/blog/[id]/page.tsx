'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeftIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/contexts/LanguageContext';
import { getBlogPost, updateBlogPost, deleteBlogPost } from '@/lib/blogService';
import Link from 'next/link';
import ProductImageUploader from '@/components/ProductImageUploader';
import RichTextEditor from '@/components/RichTextEditor';
import 'react-quill/dist/quill.snow.css';

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params?.id as string;
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [originalSlug, setOriginalSlug] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [content, setContent] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    author: '',
    status: 'draft',
    tags: '',
    publishedAt: null,
  });
  const [errors, setErrors] = useState({
    title: '',
    content: '',
    author: '',
  });

  useEffect(() => {
    if (!postId) {
      router.push('/dashboard/blog');
      return;
    }
    
    const fetchPost = async () => {
      try {
        const post = await getBlogPost(postId);
        
        if (post) {
          setFormData({
            title: post.title || '',
            excerpt: post.excerpt || '',
            author: post.author || '',
            status: post.publishedAt ? 'published' : 'draft',
            tags: Array.isArray(post.tags) ? post.tags.join(', ') : '',
            publishedAt: post.publishedAt,
          });
          
          setContent(post.content || '');
          setCoverImage(post.coverImage || '');
          setOriginalSlug(post.slug || '');
        } else {
          alert('未找到博客文章');
          router.push('/dashboard/blog');
        }
      } catch (error) {
        console.error('获取博客文章失败:', error);
        alert('加载文章失败，请重试');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [postId, router]);

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
      let publishedAt = formData.publishedAt;
      
      // 如果状态从草稿变为已发布，设置发布日期
      if (formData.status === 'published' && !publishedAt) {
        publishedAt = new Date().toISOString();
      }
      
      // 保持相同的slug，除非标题改变了
      let slug = originalSlug;
      if (!slug || slug === '') {
        slug = formData.title
          .toLowerCase()
          .replace(/[^\w\s]/gi, '')
          .replace(/\s+/g, '-');
      }
      
      const blogPostData = {
        ...formData,
        content,
        tags: tagsArray,
        slug,
        coverImage,
        publishedAt,
      };
      
      const updated = await updateBlogPost(postId, blogPostData);
      
      if (updated) {
        router.push('/dashboard/blog');
      } else {
        alert('更新文章失败，请重试');
      }
    } catch (error) {
      console.error('更新博客文章失败:', error);
      alert('发生错误，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    
    try {
      const deleted = await deleteBlogPost(postId);
      
      if (deleted) {
        router.push('/dashboard/blog');
      } else {
        alert('删除文章失败，请重试');
        setShowDeleteConfirmation(false);
      }
    } catch (error) {
      console.error('删除博客文章失败:', error);
      alert('发生错误，请重试');
      setShowDeleteConfirmation(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-2 text-muted-foreground">加载中...</p>
        </div>
      </div>
    );
  }

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
        <h1 className="text-2xl font-bold mr-auto">
          编辑博客文章
        </h1>
        <button
          type="button"
          onClick={() => setShowDeleteConfirmation(true)}
          className="inline-flex items-center px-3 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-colors"
          disabled={isSubmitting}
        >
          <TrashIcon className="w-5 h-5 mr-1" />
          删除文章
        </button>
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
                  已发布
                </span>
              </label>
            </div>
            {formData.publishedAt && formData.status === 'published' && (
              <p className="mt-2 text-sm text-muted-foreground">
                发布于: {new Date(formData.publishedAt).toLocaleString('zh-CN')}
              </p>
            )}
          </div>
          
          <div className="flex justify-end">
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
              {isSubmitting ? "保存中..." : "保存更改"}
            </button>
          </div>
        </div>
      </form>

      {/* 删除确认弹窗 */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">
              确认删除
            </h3>
            <p className="mb-6">
              确定要删除这篇博客文章吗？此操作无法撤销。
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowDeleteConfirmation(false)}
                className="px-4 py-2 border border-input rounded-md mr-2 hover:bg-muted transition-colors"
                disabled={isSubmitting}
              >
                取消
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 border border-transparent rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? "删除中..." : "确认删除"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 