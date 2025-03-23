'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { getPublishedPosts } from '@/lib/services/blogService';
import { formatDate } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import ClientImage from '@/components/ClientImage';
import { useSearchParams } from 'next/navigation';

// 博客列表内容组件
function BlogContent() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const { t, language } = useLanguage();
  const [allTags, setAllTags] = useState([]);
  const searchParams = useSearchParams();
  const [activeTags, setActiveTags] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0
  });

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        // 从URL参数中获取标签过滤器
        const tagParam = searchParams.get('tag');
        if (tagParam) {
          setActiveTags([tagParam]);
        }
        
        const options = {
          page: pagination.page,
          limit: pagination.limit,
          tag: tagParam
        };
        
        const response = await getPublishedPosts(options);
        
        if (response.success) {
          setPosts(response.data);
          setPagination(response.pagination);
          
          // 提取所有标签
          const tags = new Set();
          response.data.forEach(post => {
            if (post.tags && Array.isArray(post.tags)) {
              post.tags.forEach(tag => tags.add(tag));
            }
          });
          setAllTags(Array.from(tags));
        } else {
          console.error("获取博客文章失败:", response.error);
        }
      } catch (error) {
        console.error("获取博客文章失败:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPosts();
  }, [searchParams, pagination.page, pagination.limit]);

  const toggleTag = (tag) => {
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter(t => t !== tag));
    } else {
      setActiveTags([...activeTags, tag]);
    }
  };

  const clearTags = () => {
    setActiveTags([]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">{t('blog.title')}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {language === 'en' 
            ? "Industry insights, product news, and printing know-how from our experts"
            : "行业洞察、产品新闻和专家印刷知识分享"}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder={language === 'en' ? "Search articles..." : "搜索文章..."}
            className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2">
          <button
            key="all"
            onClick={() => setSelectedTag("all")}
            className={`px-4 py-2 rounded-md whitespace-nowrap text-sm font-medium transition-colors ${
              selectedTag === "all"
                ? "bg-primary text-primary-foreground dark:text-primary-foreground"
                : "bg-muted text-foreground hover:bg-muted/80 dark:bg-muted/30 dark:text-foreground dark:hover:bg-muted/50"
            }`}
          >
            {language === 'en' ? "All Topics" : "全部话题"}
          </button>
          
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-4 py-2 rounded-md whitespace-nowrap text-sm font-medium transition-colors ${
                activeTags.includes(tag)
                  ? "bg-primary text-primary-foreground dark:text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-muted/80 dark:bg-muted/30 dark:text-foreground dark:hover:bg-muted/50"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-16">
          <div className="inline-block animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
          <p className="text-lg text-muted-foreground">{t('blog.loading')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {posts.map((post) => (
            <Link key={post._id} href={`/blog/${post._id}`}>
              <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
                <div className="relative w-full aspect-video">
                  <ClientImage 
                    src={post.coverImage || 'https://placehold.co/600x400/png'}
                    alt={post.title}
                    className="object-cover"
                    fill
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-2 flex items-center text-sm text-muted-foreground">
                    <span>{post.author}</span>
                    <span className="mx-2">•</span>
                    <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">{post.title}</h3>
                  <p className="text-muted-foreground mb-4 flex-grow">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {post.tags && post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {!isLoading && posts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">
            {language === 'en' ? "No posts found matching your criteria." : "没有找到符合条件的文章。"}
          </p>
        </div>
      )}

      {/* 分页 */}
      {pagination.pages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          <button
            onClick={() => setPagination(prev => ({ ...prev, page: Math.max(prev.page - 1, 1) }))}
            disabled={pagination.page <= 1}
            className="px-4 py-2 border border-input rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {language === 'en' ? 'Previous' : '上一页'}
          </button>
          <button
            onClick={() => setPagination(prev => ({ ...prev, page: Math.min(prev.page + 1, prev.pages) }))}
            disabled={pagination.page >= pagination.pages}
            className="px-4 py-2 border border-input rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {language === 'en' ? 'Next' : '下一页'}
          </button>
        </div>
      )}

      <div className="mt-16 bg-muted dark:bg-muted/20 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">
          {language === 'en' ? "Stay Updated with Industry News" : "获取行业最新资讯"}
        </h2>
        <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
          {language === 'en' 
            ? "Subscribe to our newsletter for the latest printing technology updates, case studies, and special offers."
            : "订阅我们的电子报，获取最新印刷技术动态、案例研究和特别优惠。"
          }
        </p>
        <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder={language === 'en' ? "Your email address" : "您的电子邮箱"}
            className="flex-1 px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
          <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors">
            {language === 'en' ? "Subscribe" : "订阅"}
          </button>
        </div>
      </div>
    </div>
  );
}

// 主页面组件
export default function BlogPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="inline-block animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
        <p className="text-lg text-muted-foreground">加载中...</p>
      </div>
    }>
      <BlogContent />
    </Suspense>
  );
} 