// 产品类目数据类型定义
export interface Category {
  id?: string; // 使用MongoDB时，这将是_id
  _id?: string; // MongoDB的ID
  name: string;
  slug: string;
  description: string;
  icon?: string;
  image?: string;
  parentId?: string | null;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

import { API_BASE_URL } from '@/config/constants';

// 重试函数
const fetchWithRetry = async (url: string, options: RequestInit = {}, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response;
    } catch (error) {
      if (i === retries - 1) throw error; // 如果是最后一次尝试，则抛出错误
      console.warn(`获取数据失败，正在重试 (${i + 1}/${retries})...`);
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // 指数退避
    }
  }
  throw new Error('所有重试都失败了');
};

// 获取所有类别
export const getCategories = async () => {
  try {
    const response = await fetchWithRetry(`${API_BASE_URL}/api/categories`);
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('获取类别失败:', error);
    return []; // 返回空数组而不是抛出错误
  }
};

// 保持向后兼容
export const getAllCategories = getCategories;

// 获取单个类别
export const getCategory = async (id: string) => {
  if (!id) return null;
  
  try {
    const response = await fetchWithRetry(`${API_BASE_URL}/api/categories/${id}`);
    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('获取类别失败:', error);
    return null;
  }
};

// 创建类别
export const createCategory = async (category: any) => {
  try {
    const response = await fetchWithRetry(`${API_BASE_URL}/api/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    });
    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('创建类别失败:', error);
    return null;
  }
};

// 更新类别
export const updateCategory = async (id: string, category: any) => {
  if (!id) return null;
  
  try {
    const response = await fetchWithRetry(`${API_BASE_URL}/api/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    });
    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('更新类别失败:', error);
    return null;
  }
};

// 删除类别
export const deleteCategory = async (id: string) => {
  if (!id) return false;
  
  try {
    const response = await fetchWithRetry(`${API_BASE_URL}/api/categories/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('删除类别失败:', error);
    return false;
  }
};

// 根据父类目ID获取子类目
export const getCategoriesByParent = async (parentId: string | null): Promise<Category[]> => {
  try {
    const allCategories = await getAllCategories();
    return allCategories.filter(category => category.parentId === parentId);
  } catch (error) {
    console.error('获取子类目失败:', error);
    return [];
  }
};

// 获取类目树结构
export const getCategoryTree = async (): Promise<Category[]> => {
  try {
    const allCategories = await getAllCategories();
    const rootCategories = allCategories.filter(category => !category.parentId);
    
    // 按order排序
    return rootCategories.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('获取类目树失败:', error);
    return [];
  }
};

// 初始演示数据 - 当API不可用时使用
const initialCategories: Category[] = [
  {
    id: "business",
    name: "名片",
    slug: "business-cards",
    description: "专业商务名片，多种材质和工艺可选",
    icon: "BusinessCard",
    image: "https://images.unsplash.com/photo-1572502007796-bf53841bc530",
    parentId: null,
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "greeting",
    name: "贺卡",
    slug: "greeting-cards",
    description: "各种场合的精美贺卡",
    icon: "Gift",
    image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0",
    parentId: null,
    order: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "gift",
    name: "礼品卡",
    slug: "gift-cards",
    description: "高端礼品卡和礼券",
    icon: "GiftCard",
    image: "https://images.unsplash.com/photo-1512909006721-3d6018887383",
    parentId: null,
    order: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "invitation",
    name: "邀请卡",
    slug: "invitation-cards",
    description: "婚礼、派对和活动邀请卡",
    icon: "Calendar",
    image: "https://images.unsplash.com/photo-1607450852568-b2e1e6fa0ece",
    parentId: null,
    order: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
]; 