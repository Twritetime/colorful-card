export interface BlogPost {
  _id: string;
  title: string;
  content: string;
  description: string;
  category: string;
  image?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  urlId: string;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/blog`, {
    cache: 'no-store' // 禁用缓存以获取最新数据
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch blog posts');
  }
  const data = await response.json();
  return Array.isArray(data) ? data.filter(post => post.published) : [];
}

export async function getBlogPostByUrlId(urlId: string): Promise<BlogPost> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/blog/${urlId}`, {
    cache: 'no-store' // 禁用缓存以获取最新数据
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch blog post');
  }
  return response.json();
} 