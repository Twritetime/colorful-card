import { API_BASE_URL } from '@/config/constants';

export interface BlogPost {
  id?: string;
  _id?: string;
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  author: string;
  status: 'draft' | 'published';
  coverImage?: string;
  tags?: string[];
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

// 带重试机制的fetch函数
export async function fetchWithRetry(url: string, options: RequestInit = {}, retries = 3, delay = 500) {
  try {
    const response = await fetch(url, options);
    
    // 检查响应状态
    if (!response.ok) {
      // 如果状态码是5xx，且还有重试次数，则重试
      if (response.status >= 500 && retries > 0) {
        console.log(`请求失败，状态码: ${response.status}，剩余重试次数: ${retries}`);
        
        // 等待一段时间后重试
        await new Promise(resolve => setTimeout(resolve, delay));
        
        // 指数退避，每次重试增加等待时间
        return fetchWithRetry(url, options, retries - 1, delay * 2);
      }
      
      // 4xx错误或重试次数已用完，直接抛出错误
      throw new Error(`请求失败: ${response.status} ${response.statusText}`);
    }
    
    return response;
  } catch (error) {
    // 网络错误或其他异常
    if (retries > 0) {
      console.log(`请求异常，剩余重试次数: ${retries}`, error);
      
      // 等待一段时间后重试
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // 指数退避，每次重试增加等待时间
      return fetchWithRetry(url, options, retries - 1, delay * 2);
    }
    
    throw error;
  }
}

// 获取所有博客文章
export const getBlogPosts = async (forceRefresh = false) => {
  try {
    // 构建URL并添加时间戳参数以防止缓存
    const timestamp = forceRefresh ? `?t=${Date.now()}` : '';
    const response = await fetchWithRetry(`${API_BASE_URL}/api/posts${timestamp}`);
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('获取博客文章失败:', error);
    return []; // 返回空数组而不是抛出错误
  }
};

// 获取单个博客文章
export const getBlogPost = async (id: string, forceRefresh = false) => {
  if (!id) return null;
  
  try {
    // 构建URL并添加时间戳参数以防止缓存
    const timestamp = forceRefresh ? `?t=${Date.now()}` : '';
    const response = await fetchWithRetry(`${API_BASE_URL}/api/posts/${id}${timestamp}`);
    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('获取博客文章失败:', error);
    return null;
  }
};

// 获取前台博客文章列表（仅发布的）
export const getPublishedPosts = async (forceRefresh = false) => {
  try {
    // 构建URL并添加时间戳参数以防止缓存
    const timestamp = forceRefresh ? `?t=${Date.now()}` : '';
    const response = await fetchWithRetry(`${API_BASE_URL}/api/posts/published${timestamp}`);
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('获取已发布文章失败:', error);
    return []; // 返回空数组而不是抛出错误
  }
};

// 根据slug获取博客文章
export const getBlogPostBySlug = async (slug: string, forceRefresh = false) => {
  if (!slug) return null;
  
  try {
    // 构建URL并添加时间戳参数以防止缓存
    const timestamp = forceRefresh ? `?t=${Date.now()}` : '';
    const response = await fetchWithRetry(`${API_BASE_URL}/api/posts/slug/${slug}${timestamp}`);
    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('根据slug获取博客文章失败:', error);
    return null;
  }
};

// 获取单篇文章
export const getPost = async (id: string, forceRefresh = false) => {
  if (!id) return null;
  
  try {
    // 构建URL并添加时间戳参数以防止缓存
    const timestamp = forceRefresh ? `?t=${Date.now()}` : '';
    const response = await fetchWithRetry(`${API_BASE_URL}/api/posts/${id}${timestamp}`);
    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('获取文章失败:', error);
    return null;
  }
};

// 创建博客文章
export const createBlogPost = async (post: BlogPost) => {
  try {
    const response = await fetchWithRetry(`${API_BASE_URL}/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('创建博客文章失败:', error);
    return null;
  }
};

// 更新博客文章
export const updateBlogPost = async (id: string, post: Partial<BlogPost>) => {
  if (!id) return null;
  
  try {
    const response = await fetchWithRetry(`${API_BASE_URL}/api/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('更新博客文章失败:', error);
    return null;
  }
};

// 删除博客文章
export const deleteBlogPost = async (id: string) => {
  if (!id) return false;
  
  try {
    const response = await fetchWithRetry(`${API_BASE_URL}/api/posts/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('删除博客文章失败:', error);
    return false;
  }
}; 