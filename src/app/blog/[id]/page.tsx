"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeftIcon, CalendarIcon, UserIcon, TagIcon, ShareIcon, ClockIcon } from "@heroicons/react/24/outline";
import { getPost, getPublishedPosts } from "@/lib/services/blogService";
import { formatDate } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import ClientImage from "@/components/ClientImage";
import DOMPurify from "isomorphic-dompurify";
import { useRouter, useParams } from 'next/navigation';

export default function BlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params?.id as string;
  const { t, language } = useLanguage();

  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [readingTime, setReadingTime] = useState("5 min");

  useEffect(() => {
    if (!postId) {
      router.push('/blog');
      return;
    }

    async function fetchPost() {
      try {
        const response = await getPost(postId);
        
        if (response.success) {
          setPost(response.data);
          
          // 如果文章未发布，重定向到博客列表页
          if (response.data.status !== 'published') {
            router.push('/blog');
            return;
          }

          // 计算阅读时间
          if (response.data.content) {
            const wordCount = response.data.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
            const readingTimeMinutes = Math.ceil(wordCount / 200); // 假设平均阅读速度为每分钟200字
            setReadingTime(`${readingTimeMinutes} ${language === 'en' ? 'min read' : '分钟阅读'}`);
          }

          // 获取相关文章
          fetchRelatedPosts(response.data.tags);
        } else {
          setError(response.error || t('blog.postNotFound'));
          setTimeout(() => {
            router.push('/blog');
          }, 3000);
        }
      } catch (error) {
        console.error('获取博客文章失败:', error);
        setError(t('blog.postNotFound'));
        setTimeout(() => {
          router.push('/blog');
        }, 3000);
      } finally {
        setIsLoading(false);
      }
    }

    async function fetchRelatedPosts(tags) {
      if (!tags || tags.length === 0) return;
      
      try {
        // 获取拥有相同标签的文章
        const response = await getPublishedPosts({ tag: tags[0], limit: 3 });
        if (response.success) {
          // 过滤掉当前文章
          const filtered = response.data.filter(p => p._id !== postId);
          setRelatedPosts(filtered.slice(0, 3));
        }
      } catch (error) {
        console.error('获取相关文章失败:', error);
      }
    }

    fetchPost();
  }, [postId, router, t, language]);

  const handleShare = (platform) => {
    if (!post) return;
    
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const title = post.title;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        if (navigator.clipboard) {
          navigator.clipboard.writeText(url)
            .then(() => alert(language === 'en' ? 'Link copied to clipboard!' : '链接已复制到剪贴板！'))
            .catch(err => console.error('Failed to copy link:', err));
        }
        break;
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="inline-block animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
        <p className="text-lg text-muted-foreground">{t('blog.loading')}</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-red-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-4">{error || t('blog.postNotFound')}</h1>
        <p className="text-muted-foreground mb-6">{t('blog.redirecting')}</p>
        <Link href="/blog" className="text-primary hover:underline">
          {t('blog.backToBlog')}
        </Link>
      </div>
    );
  }

  const sanitizedContent = DOMPurify.sanitize(post.content);

  return (
    <article className="py-8 md:py-12">
      {/* 顶部导航和面包屑 */}
      <div className="container mx-auto px-4 mb-6">
        <Link href="/blog" className="inline-flex items-center text-primary hover:underline mb-6">
          <ChevronLeftIcon className="h-5 w-5 mr-1" />
          {t('blog.backToBlog')}
        </Link>
        
        {/* 文章头部信息：标签、标题、摘要、元数据 */}
        <div className="max-w-4xl mx-auto mb-8">
          {post.tags && post.tags.length > 0 && (
            <div className="mb-4">
              <Link
                href={`/blog?tag=${encodeURIComponent(post.tags[0])}`}
                className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full"
              >
                {post.tags[0]}
              </Link>
            </div>
          )}
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>
          
          {post.excerpt && (
            <p className="text-xl text-muted-foreground mb-6 font-medium leading-relaxed">
              {post.excerpt}
            </p>
          )}
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
            <div className="flex items-center">
              <UserIcon className="h-4 w-4 mr-1" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-1" />
              <span>{formatDate(post.publishedAt || post.createdAt)}</span>
            </div>
            <div className="flex items-center">
              <ClockIcon className="h-4 w-4 mr-1" />
              <span>{readingTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 主图 */}
      {post.coverImage && (
        <div className="w-full mb-8 md:mb-12">
          <div className="relative w-full h-[300px] md:h-[500px] max-w-5xl mx-auto overflow-hidden rounded-xl">
            <ClientImage 
              src={post.coverImage}
              alt={post.title}
              className="object-cover"
              fill
              priority
            />
          </div>
        </div>
      )}

      {/* 主要内容和侧边栏 */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          {/* 左侧：社交分享 */}
          <aside className="lg:w-16 order-2 lg:order-1">
            <div className="lg:sticky lg:top-24 flex lg:flex-col gap-4 justify-center lg:justify-start mb-8 lg:mb-0">
              <button
                onClick={() => handleShare('twitter')}
                className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                aria-label="Share on Twitter"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                aria-label="Share on Facebook"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
                </svg>
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                aria-label="Share on LinkedIn"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z" />
                  <path d="M5 10C5 9.44772 5.44772 9 6 9H7C7.55228 9 8 9.44771 8 10V18C8 18.5523 7.55228 19 7 19H6C5.44772 19 5 18.5523 5 18V10Z" />
                  <path d="M11 19H12C12.5523 19 13 18.5523 13 18V13.5C13 12 16 11 16 13V18.0004C16 18.5527 16.4477 19 17 19H18C18.5523 19 19 18.5523 19 18V12C19 10 17.5 9 15.5 9C13.5 9 13 10.5 13 10.5V10C13 9.44771 12.5523 9 12 9H11C10.4477 9 10 9.44772 10 10V18C10 18.5523 10.4477 19 11 19Z" />
                </svg>
              </button>
              <button
                onClick={() => handleShare('copy')}
                className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                aria-label="Copy link"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              </button>
            </div>
          </aside>

          {/* 中间：文章内容 */}
          <main className="lg:flex-1 order-1 lg:order-2">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div 
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: sanitizedContent }} 
              />
              
              {/* 标签列表 */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <TagIcon className="h-5 w-5 mr-2" />
                    {t('blog.tags')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Link 
                        key={tag} 
                        href={`/blog?tag=${encodeURIComponent(tag)}`}
                        className="px-3 py-1 bg-muted rounded-md text-sm hover:bg-muted/80 transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 作者信息 */}
            <div className="mt-12 p-8 bg-muted/30 rounded-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                  {post.author ? post.author.charAt(0).toUpperCase() : 'A'}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{post.author}</h3>
                  <p className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Content Creator' : '内容创作者'}
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground">
                {language === 'en'
                  ? `${post.author} is a professional writer and expert in the printing and packaging industry with years of experience.`
                  : `${post.author}是印刷和包装行业的专业作家和专家，拥有多年经验。`
                }
              </p>
            </div>
          </main>
        </div>
        
        {/* 相关文章 */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 md:mt-24 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">
              {language === 'en' ? 'Related Articles' : '相关文章'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost._id} href={`/blog/${relatedPost._id}`}>
                  <div className="bg-card rounded-xl overflow-hidden shadow-md h-full flex flex-col blog-card">
                    <div className="relative w-full aspect-video">
                      <ClientImage 
                        src={relatedPost.coverImage || 'https://placehold.co/600x400/png'}
                        alt={relatedPost.title}
                        className="object-cover"
                        fill
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="mb-2 flex items-center text-sm text-muted-foreground">
                        <span>{relatedPost.author}</span>
                        <span className="mx-2">•</span>
                        <span>{formatDate(relatedPost.publishedAt || relatedPost.createdAt)}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-foreground line-clamp-2">{relatedPost.title}</h3>
                      <p className="text-muted-foreground flex-grow line-clamp-2">{relatedPost.excerpt}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 订阅区域 */}
        <div className="mt-16 md:mt-24 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8 md:p-12 text-center max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {language === 'en' ? "Enjoyed this article?" : "喜欢这篇文章吗？"}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {language === 'en' 
              ? "Subscribe to our newsletter for more expert insights and industry updates delivered directly to your inbox."
              : "订阅我们的电子报，获取更多专家见解和行业更新，直接发送到您的收件箱。"
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
    </article>
  );
} 