import Link from 'next/link';
import { getBlogPosts } from '@/lib/api';

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
  urlId: string;
  description: string;
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">博客列表</h1>
      <div className="grid gap-6">
        {posts.map((post) => (
          <article key={post._id} className="p-6 bg-white rounded-lg shadow-md">
            <Link 
              href={`/blog/${post.urlId}`} 
              className="block hover:text-blue-600"
            >
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            </Link>
            <p className="text-gray-600 mb-4">{post.description}</p>
            <div className="flex items-center text-sm text-gray-500">
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <span>{post.category}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
} 