'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RichTextEditor from '@/components/RichTextEditor';
import { BlogPost } from '@/lib/api';

interface Props {
  params: {
    urlId: string;
  };
}

export default function EditBlogPage({ params }: Props) {
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPost();
  }, [params.urlId]);

  const fetchPost = async () => {
    try {
      setError(null);
      const response = await fetch(`/api/blog/${params.urlId}`);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || '获取博客文章失败');
      }
      const data = await response.json();
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
      setError(error instanceof Error ? error.message : '获取博客文章失败');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (content: string) => {
    if (!post) return;

    try {
      const response = await fetch(`/api/blog/${params.urlId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...post,
          content,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || '保存博客文章失败');
      }

      router.push('/dashboard/blog');
    } catch (error) {
      console.error('Error saving post:', error);
      alert(error instanceof Error ? error.message : '保存博客文章失败');
    }
  };

  if (loading) {
    return <div className="container mx-auto py-8 px-4">加载中...</div>;
  }

  if (error || !post) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
          {error || '未找到博客文章'}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">编辑博客文章</h1>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">{post.title}</h2>
      </div>
      <RichTextEditor
        initialContent={post.content}
        onSave={handleSave}
      />
    </div>
  );
} 