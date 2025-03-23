import { getBlogPostByUrlId } from '@/lib/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface Props {
  params: {
    urlId: string;
  };
}

export default async function BlogPostPage({ params }: Props) {
  if (!params.urlId) {
    console.error('urlId is required');
    return notFound();
  }

  try {
    console.log('Fetching blog post for urlId:', params.urlId);
    const post = await getBlogPostByUrlId(params.urlId);

    if (!post || !post.published) {
      console.error('Blog post not found or not published:', params.urlId);
      return notFound();
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/blog" 
          className="inline-block mb-8 text-primary hover:underline"
        >
          返回博客列表
        </Link>
        <article>
          <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
          <div className="flex items-center text-sm text-gray-500 mb-8">
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <span>{post.category}</span>
          </div>
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="w-full max-h-[500px] object-cover rounded-lg mb-8"
            />
          )}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    );
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return notFound();
  }
} 