import { 
  isBrowser,
  getBaseApiUrl,
  handleApiResponse
} from '@/lib/utils/apiUtils';

// 获取所有博客文章（用于管理页面）
export async function getBlogPosts(options: {
  page?: number;
  limit?: number;
  tag?: string;
  status?: string;
} = {}) {
  const { page = 1, limit = 10, tag, status } = options;
  
  const queryParams = new URLSearchParams();
  queryParams.append('page', page.toString());
  queryParams.append('limit', limit.toString());
  
  if (tag) {
    queryParams.append('tag', tag);
  }
  
  if (status) {
    queryParams.append('status', status);
  }
  
  const url = `${getBaseApiUrl()}/posts?${queryParams.toString()}`;
  
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  }).then(handleApiResponse);
}

// 获取所有已发布的博客文章（用于前台展示）
export async function getPublishedPosts(options: {
  page?: number;
  limit?: number;
  tag?: string;
} = {}) {
  const { page = 1, limit = 10, tag } = options;
  
  const queryParams = new URLSearchParams();
  queryParams.append('page', page.toString());
  queryParams.append('limit', limit.toString());
  
  if (tag) {
    queryParams.append('tag', tag);
  }
  
  const url = `${getBaseApiUrl()}/posts/published?${queryParams.toString()}`;
  
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  }).then(handleApiResponse);
}

// 通过ID获取单个博客文章
export async function getPost(id: string) {
  if (!id) throw new Error('博客ID不能为空');
  
  const url = `${getBaseApiUrl()}/posts/${id}`;
  
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  }).then(handleApiResponse);
}

// 创建新博客文章
export async function createBlogPost(data: any) {
  const url = `${getBaseApiUrl()}/posts`;
  
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(handleApiResponse);
}

// 更新博客文章
export async function updateBlogPost(id: string, data: any) {
  if (!id) throw new Error('博客ID不能为空');
  
  const url = `${getBaseApiUrl()}/posts/${id}`;
  
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(handleApiResponse);
}

// 删除博客文章
export async function deleteBlogPost(id: string) {
  if (!id) throw new Error('博客ID不能为空');
  
  const url = `${getBaseApiUrl()}/posts/${id}`;
  
  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(handleApiResponse);
} 