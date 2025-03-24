'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { MagnifyingGlassIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { getPublishedPosts } from '@/lib/services/blogService';
import { formatDate } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import ClientImage from '@/components/ClientImage';
import { useSearchParams } from 'next/navigation';

// 博客列表内容组件
function BlogContent() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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

  const filterPosts = () => {
    let filtered = [...posts];
    
    // 根据搜索词过滤
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(term) || 
        post.excerpt.toLowerCase().includes(term) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(term)))
      );
    }
    
    // 根据标签过滤
    if (activeTags.length > 0) {
      filtered = filtered.filter(post => 
        post.tags && post.tags.some(tag => activeTags.includes(tag))
      );
    }
    
    return filtered;
  };

  const toggleTag = (tag) => {
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter(t => t !== tag));
    } else {
      setActiveTags([...activeTags, tag]);
    }
  };

  const clearFilters = () => {
    setActiveTags([]);
    setSearchTerm('');
  };

  const filteredPosts = filterPosts();
  
  // 提取特色文章（第一篇）和剩余文章
  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const remainingPosts = filteredPosts.length > 0 ? filteredPosts.slice(1) : [];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* 博客头部区域 */}
      <div className="text-center mb-12">
        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          {language === 'en' ? "Our Blog" : "博客"}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent leading-tight">
          {t('blog.title')}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {language === 'en' 
            ? "Industry insights, product news, and printing know-how from our experts"
            : "行业洞察、产品新闻和专家印刷知识分享"}
        </p>
      </div>

      {/* 顶部搜索和过滤区域 */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder={language === 'en' ? "Search articles..." : "搜索文章..."}
            className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <MagnifyingGlassIcon className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
        </div>
        
        <div className="flex overflow-x-auto pb-2 gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-colors ${
                activeTags.includes(tag)
                  ? "bg-primary text-primary-foreground dark:text-primary-foreground"
                  : "bg-muted/80 backdrop-blur-sm text-foreground hover:bg-muted dark:bg-muted/30 dark:text-foreground dark:hover:bg-muted/50"
              }`}
            >
              {tag}
            </button>
          ))}
          
          {(activeTags.length > 0 || searchTerm.trim() !== '') && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-colors bg-destructive/10 text-destructive hover:bg-destructive/20"
            >
              {language === 'en' ? "Clear filters" : "清除筛选"}
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-16">
          <div className="inline-block animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
          <p className="text-lg text-muted-foreground">{t('blog.loading')}</p>
        </div>
      ) : (
        <>
          {/* 特色文章区域 */}
          {featuredPost && (
            <div className="mb-16">
              <div className="relative rounded-xl overflow-hidden shadow-md bg-card blog-card">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative h-[300px] md:h-auto">
                    <ClientImage 
                      src={featuredPost.coverImage || 'https://placehold.co/600x400/png'}
                      alt={featuredPost.title}
                      className="object-cover"
                      fill
                    />
                  </div>
                  <div className="flex flex-col p-6 md:p-8 justify-center">
                    <div className="mb-3">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                        {language === 'en' ? "Featured" : "精选"}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">{featuredPost.title}</h2>
                    <p className="text-muted-foreground mb-6 line-clamp-3">{featuredPost.excerpt}</p>
                    <div className="mb-6 flex items-center text-sm text-muted-foreground">
                      <span>{featuredPost.author}</span>
                      <span className="mx-2">•</span>
                      <span>{formatDate(featuredPost.publishedAt || featuredPost.createdAt)}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredPost.tags && featuredPost.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link 
                      href={`/blog/${featuredPost._id}`}
                      className="flex items-center text-primary font-medium hover:underline"
                    >
                      {language === 'en' ? "Read more" : "阅读更多"}
                      <ChevronRightIcon className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 文章网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {remainingPosts.map((post) => (
              <Link key={post._id} href={`/blog/${post._id}`}>
                <div className="bg-card rounded-xl overflow-hidden shadow-md h-full flex flex-col blog-card">
                  <div className="relative w-full aspect-video">
                    <ClientImage 
                      src={post.coverImage || 'https://placehold.co/600x400/png'}
                      alt={post.title}
                      className="object-cover"
                      fill
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-3 flex items-center text-sm text-muted-foreground">
                      <span>{post.author}</span>
                      <span className="mx-2">•</span>
                      <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-foreground line-clamp-2">{post.title}</h3>
                    <p className="text-muted-foreground mb-4 flex-grow line-clamp-3">{post.excerpt}</p>
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
        </>
      )}

      {!isLoading && filteredPosts.length === 0 && (
        <div className="text-center py-16 bg-muted/30 rounded-xl">
          <div className="mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 21a9 9 0 110-18 9 9 0 010 18z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">
            {language === 'en' ? "No posts found" : "没有找到文章"}
          </h3>
          <p className="text-muted-foreground mb-6">
            {language === 'en' ? "Try adjusting your search or filter to find what you're looking for." : "请尝试调整搜索条件或筛选条件。"}
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
          >
            {language === 'en' ? "Clear all filters" : "清除所有筛选"}
          </button>
        </div>
      )}

      {/* 分页 */}
      {pagination.pages > 1 && (
        <div className="mt-12 flex justify-center gap-2">
          <button
            onClick={() => setPagination(prev => ({ ...prev, page: Math.max(prev.page - 1, 1) }))}
            disabled={pagination.page <= 1}
            className="px-5 py-2 border border-input rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted"
          >
            {language === 'en' ? 'Previous' : '上一页'}
          </button>
          <div className="px-4 py-2 bg-card border border-input rounded-lg text-sm font-medium">
            {language === 'en' 
              ? `Page ${pagination.page} of ${pagination.pages}` 
              : `第 ${pagination.page} 页，共 ${pagination.pages} 页`}
          </div>
          <button
            onClick={() => setPagination(prev => ({ ...prev, page: Math.min(prev.page + 1, prev.pages) }))}
            disabled={pagination.page >= pagination.pages}
            className="px-5 py-2 border border-input rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted"
          >
            {language === 'en' ? 'Next' : '下一页'}
          </button>
        </div>
      )}

      {/* 订阅区域 */}
      <div className="mt-20 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8 md:p-12 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {language === 'en' ? "Stay Updated with Industry News" : "获取行业最新资讯"}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {language === 'en' 
              ? "Subscribe to our newsletter for the latest printing technology updates, case studies, and special offers."
              : "订阅我们的电子报，获取最新印刷技术动态、案例研究和特别优惠。"
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder={language === 'en' ? "Your email address" : "您的电子邮箱"}
              className="flex-1 px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium">
              {language === 'en' ? "Subscribe" : "订阅"}
            </button>
          </div>
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