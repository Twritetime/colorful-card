"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeftIcon, CalendarIcon, UserIcon, TagIcon } from "@heroicons/react/24/outline";
import { getPost } from "@/lib/services/blogService";
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

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

    fetchPost();
  }, [postId, router, t]);

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
    <div className="container mx-auto px-4 py-8">
      <Link href="/blog" className="inline-flex items-center text-primary hover:underline mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        {t('blog.backToBlog')}
      </Link>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex items-center text-sm text-muted-foreground mb-8">
          <span>{post.author}</span>
          <span className="mx-2">•</span>
          <span>{formatDate(post.publishedAt || post.createdAt)}</span>
        </div>

        {post.coverImage && (
          <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
            <ClientImage 
              src={post.coverImage}
              alt={post.title}
              className="object-cover"
              fill
            />
          </div>
        )}

        {post.excerpt && (
          <div className="text-xl text-muted-foreground mb-8 font-medium italic">
            {post.excerpt}
          </div>
        )}

        <div 
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }} 
        />

        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t">
            <h3 className="text-lg font-semibold mb-4">{t('blog.tags')}</h3>
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
    </div>
  );
} 