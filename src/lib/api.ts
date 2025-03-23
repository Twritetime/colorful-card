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
    cache: 'no-store', // 禁用缓存以获取最新数据
    next: { revalidate: 0 }, // 禁用ISR缓存
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    console.error('Error fetching blog posts:', data);
    throw new Error(data.error || 'Failed to fetch blog posts');
  }

  return Array.isArray(data) ? data.filter(post => post.published) : [];
}

export async function getBlogPostByUrlId(urlId: string): Promise<BlogPost> {
  if (!urlId) {
    console.error('urlId is required');
    throw new Error('urlId is required');
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  console.log('Fetching blog post with urlId:', urlId);
  console.log('API URL:', `${baseUrl}/api/blog/${urlId}`);

  try {
    const response = await fetch(`${baseUrl}/api/blog/${urlId}`, {
      cache: 'no-store', // 禁用缓存以获取最新数据
      next: { revalidate: 0 }, // 禁用ISR缓存
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Error response:', data);
      throw new Error(data.error || 'Failed to fetch blog post');
    }

    if (!data || !data.title) {
      console.error('Invalid blog post data:', data);
      throw new Error('Blog post not found');
    }

    return data;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw error instanceof Error ? error : new Error('Failed to fetch blog post');
  }
} 