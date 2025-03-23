'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/lib/api';

export default function BlogDashboardPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setError(null);
      const response = await fetch('/api/blog?showAll=true');
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || '获取博客文章列表失败');
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError(error instanceof Error ? error.message : '获取博客文章列表失败');
    } finally {
      setLoading(false);
    }
  };

  const togglePublished = async (post: BlogPost) => {
    try {
      const response = await fetch(`/api/blog/${post.urlId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...post,
          published: !post.published,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || '更新博客文章失败');
      }

      // 重新获取文章列表
      await fetchPosts();
    } catch (error) {
      console.error('Error updating post:', error);
      alert(error instanceof Error ? error.message : '更新博客文章失败');
    }
  };

  if (loading) {
    return <div className="container mx-auto py-8 px-4">加载中...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">博客管理</h1>
        <Link
          href="/dashboard/blog/new"
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          新建博客
        </Link>
      </div>

      <div className="grid gap-6">
        {posts.map((post) => (
          <article key={post._id} className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                <div className="flex items-center text-sm text-gray-500">
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <span>{post.category}</span>
                  <span className="mx-2">•</span>
                  <span className={post.published ? 'text-green-600' : 'text-red-600'}>
                    {post.published ? '已发布' : '未发布'}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => togglePublished(post)}
                  className={`px-3 py-1 rounded text-sm ${
                    post.published
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {post.published ? '取消发布' : '发布'}
                </button>
                <Link
                  href={`/dashboard/blog/${post.urlId}/edit`}
                  className="px-3 py-1 rounded text-sm bg-blue-100 text-blue-700 hover:bg-blue-200"
                >
                  编辑
                </Link>
              </div>
            </div>
            <p className="text-gray-600">{post.description}</p>
          </article>
        ))}

        {posts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            暂无博客文章
          </div>
        )}
      </div>
    </div>
  );
} 