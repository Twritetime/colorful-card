'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import RichTextEditor from '@/components/RichTextEditor';
import ProductImageUploader from '@/components/ProductImageUploader';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  video: string;
  category: string;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export default function EditBlogPost() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (id === 'new') {
      setPost({
        _id: '',
        title: '',
        content: '',
        excerpt: '',
        image: '',
        video: '',
        category: '',
        published: false
      });
      setLoading(false);
    } else {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      setError(null);
      const response = await fetch(`/api/blog/${id}`);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || '获取博客文章失败');
      }
      const data = await response.json();
      setPost(data);
    } catch (error) {
      console.error('Error fetching blog post:', error);
      setError(error instanceof Error ? error.message : '获取博客文章失败');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;

    setSaving(true);
    setError(null);
    try {
      const response = await fetch(`/api/blog/${id === 'new' ? '' : id}`, {
        method: id === 'new' ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || '保存博客文章失败');
      }

      const data = await response.json();
      console.log('Save response:', data);
      router.push('/dashboard/blog');
      router.refresh();
    } catch (error) {
      console.error('Error saving blog post:', error);
      setError(error instanceof Error ? error.message : '保存博客文章失败');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    if (!post) return;
    setPost({
      ...post,
      [field]: value
    });
  };

  if (loading) {
    return <div className="container mx-auto py-8 px-4">加载中...</div>;
  }

  if (!post) {
    return <div className="container mx-auto py-8 px-4">未找到博客文章</div>;
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.back()}
          className="mr-4 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold">
          {id === 'new' ? '新建博客' : '编辑博客'}
        </h1>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            标题
          </label>
          <input
            type="text"
            value={post.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            分类
          </label>
          <input
            type="text"
            value={post.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            封面图片
          </label>
          <ProductImageUploader
            images={post.image ? [post.image] : []}
            onChange={(urls) => handleChange('image', urls[0])}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            视频
          </label>
          <ProductImageUploader
            type="video"
            images={post.video ? [post.video] : []}
            onChange={(urls) => handleChange('video', urls[0])}
          />
          {post.video && (
            <video
              src={post.video}
              controls
              className="mt-2 w-full max-w-2xl rounded-lg"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            摘要
          </label>
          <textarea
            value={post.excerpt}
            onChange={(e) => handleChange('excerpt', e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            内容
          </label>
          <RichTextEditor
            value={post.content}
            onChange={(value) => handleChange('content', value)}
          />
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={post.published}
              onChange={(e) => handleChange('published', e.target.checked)}
              className="rounded border-input"
            />
            <span>发布</span>
          </label>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border border-input rounded-md hover:bg-muted"
          >
            取消
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
          >
            {saving ? '保存中...' : '保存'}
          </button>
        </div>
      </form>
    </div>
  );
} 