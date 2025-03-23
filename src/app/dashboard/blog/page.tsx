'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { getBlogPosts, deleteBlogPost } from '@/lib/services/blogService';
import { formatDate } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import ClientImage from '@/components/ClientImage';
import { useRouter } from 'next/navigation';

export default function BlogManagementPage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { t, language } = useLanguage();
  const router = useRouter();
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0
  });

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const options = {
        page: pagination.page,
        limit: pagination.limit
      };
      
      const response = await getBlogPosts(options);
      
      if (response.success) {
        setPosts(response.data || []);
        setPagination(response.pagination);
      } else {
        console.error("获取博客文章失败:", response.error);
      }
    } catch (error) {
      console.error("获取博客文章失败:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();

    // 监听页面获得焦点事件，当用户从其他页面返回时刷新列表
    const handleFocus = () => {
      fetchPosts();
    };

    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [pagination.page, pagination.limit]);

  const handleDelete = async (id) => {
    if (!id) return;
    
    setIsDeleting(true);
    try {
      const response = await deleteBlogPost(id);
      
      if (response.success) {
        // 刷新文章列表
        fetchPosts();
        setDeleteId(null);
      } else {
        console.error("删除博客文章失败:", response.error);
      }
    } catch (error) {
      console.error("删除博客文章时出错:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'published') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-700/20 dark:text-green-400">
          {t('blog.published')}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700/20 dark:text-gray-400">
        {t('blog.draft')}
      </span>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">{t('blog.management')}</h1>
        <Link
          href="/dashboard/blog/new"
          className="inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary/90 dark:text-primary-foreground dark:hover:bg-primary transition-all focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:outline-none"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          {t('blog.createNew')}
        </Link>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">{t('blog.loading')}</p>
        </div>
      ) : (
        <div className="bg-card shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t('general.title')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t('blog.author')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t('blog.date')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t('blog.status')}
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t('blog.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    {language === 'en' ? "No blog posts found. Create your first post!" : "未找到博客文章。创建您的第一篇文章！"}
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post._id} className="hover:bg-muted/20">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 mr-3">
                          {post.coverImage ? (
                            <div className="h-10 w-10 rounded-md overflow-hidden relative">
                              <ClientImage
                                src={post.coverImage}
                                alt={post.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                              <span className="text-xs text-muted-foreground">No img</span>
                            </div>
                          )}
                        </div>
                        <div className="truncate max-w-md">
                          <Link href={`/blog/${post._id}`} className="text-sm font-medium text-foreground hover:text-primary">
                            {post.title}
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {post.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {formatDate(post.updatedAt || post.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(post.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link
                          href={`/dashboard/blog/${post._id}`}
                          className="text-primary hover:text-primary/80"
                        >
                          <PencilIcon className="h-5 w-5" />
                          <span className="sr-only">{t('blog.edit')}</span>
                        </Link>
                        <button
                          onClick={() => setDeleteId(post._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <TrashIcon className="h-5 w-5" />
                          <span className="sr-only">{t('blog.delete')}</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          
          {/* 分页 */}
          {pagination.pages > 1 && (
            <div className="px-6 py-4 flex justify-between items-center border-t border-border">
              <div className="text-sm text-muted-foreground">
                {language === 'en' 
                  ? `Showing ${(pagination.page - 1) * pagination.limit + 1} to ${Math.min(pagination.page * pagination.limit, pagination.total)} of ${pagination.total} entries`
                  : `显示第 ${(pagination.page - 1) * pagination.limit + 1} 至 ${Math.min(pagination.page * pagination.limit, pagination.total)} 条，共 ${pagination.total} 条`
                }
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: Math.max(prev.page - 1, 1) }))}
                  disabled={pagination.page <= 1}
                  className="px-3 py-1 border border-input rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {language === 'en' ? 'Previous' : '上一页'}
                </button>
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: Math.min(prev.page + 1, prev.pages) }))}
                  disabled={pagination.page >= pagination.pages}
                  className="px-3 py-1 border border-input rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {language === 'en' ? 'Next' : '下一页'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 删除确认对话框 */}
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-card p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-medium mb-4">{t('blog.deleteConfirm')}</h3>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-muted-foreground hover:bg-muted"
                disabled={isDeleting}
              >
                {t('blog.cancel')}
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                disabled={isDeleting}
              >
                {isDeleting ? (language === 'en' ? "Deleting..." : "删除中...") : t('blog.delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 