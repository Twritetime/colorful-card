'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  video: string;
  category: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function BlogManagementPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setError(null);
      const response = await fetch('/api/blog');
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || '获取博客文章列表失败');
      }
      const data = await response.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError(error instanceof Error ? error.message : '获取博客文章列表失败');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这篇博客文章吗？')) {
      return;
    }

    try {
      setError(null);
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || '删除博客文章失败');
      }

      await fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      setError(error instanceof Error ? error.message : '删除博客文章失败');
    }
  };

  const filteredPosts = posts.filter((post) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      post.title.toLowerCase().includes(searchLower) ||
      post.category.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return <div className="container mx-auto py-8 px-4">加载中...</div>;
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">博客管理</h1>
        <Link
          href="/dashboard/blog/new/edit"
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          新建博客
        </Link>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
          {error}
        </div>
      )}

      <div className="mb-6">
        <input
          type="text"
          placeholder="搜索博客文章..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-96 px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="bg-card rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted">
                <th className="px-6 py-3 text-left text-sm font-medium">图片</th>
                <th className="px-6 py-3 text-left text-sm font-medium">标题</th>
                <th className="px-6 py-3 text-left text-sm font-medium">分类</th>
                <th className="px-6 py-3 text-left text-sm font-medium">状态</th>
                <th className="px-6 py-3 text-left text-sm font-medium">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredPosts.map((post) => (
                <tr key={post._id}>
                  <td className="px-6 py-4">
                    {post.image && (
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={80}
                        height={60}
                        className="rounded object-cover"
                      />
                    )}
                  </td>
                  <td className="px-6 py-4">{post.title}</td>
                  <td className="px-6 py-4">{post.category}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        post.published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {post.published ? '已发布' : '草稿'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => router.push(`/dashboard/blog/${post._id}/edit`)}
                        className="p-2 text-blue-600 hover:text-blue-800"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="p-2 text-red-600 hover:text-red-800"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPosts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    {searchTerm ? '没有找到匹配的博客文章' : '暂无博客文章'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 