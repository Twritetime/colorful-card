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

// API基础URL
const API_BASE_URL = typeof window !== 'undefined' ? '' : process.env.NEXT_PUBLIC_API_BASE_URL || '';

// 获取单个类目
export const getCategory = async (id: string): Promise<Category | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/categories/${id}`);
    
    if (!response.ok) {
      console.error('获取类目失败:', response.statusText);
      return null;
    }
    
    const result = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error('获取类目出错:', error);
    return null;
  }
};

// 获取所有类目
export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/categories`);
    
    if (!response.ok) {
      console.error('获取所有类目失败:', response.statusText);
      // 如果API尚未实现，返回初始数据
      return initialCategories;
    }
    
    const result = await response.json();
    return result.success ? result.data : [];
  } catch (error) {
    console.error('获取所有类目出错:', error);
    // 在API调用失败时，使用初始数据作为备用
    return initialCategories;
  }
};

// 创建新类目
export const createCategory = async (categoryData: Omit<Category, "id" | "_id" | "createdAt" | "updatedAt">): Promise<Category | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });
    
    if (!response.ok) {
      console.error('创建类目失败:', response.statusText);
      return null;
    }
    
    const result = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error('创建类目出错:', error);
    return null;
  }
};

// 更新类目
export const updateCategory = async (id: string, categoryData: Partial<Category>): Promise<Category | null> => {
  try {
    // 确保不传递_id字段，避免MongoDB更新错误
    const { _id, ...updateData } = categoryData;
    
    const response = await fetch(`${API_BASE_URL}/api/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    
    if (!response.ok) {
      console.error('更新类目失败:', response.statusText);
      return null;
    }
    
    const result = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error('更新类目出错:', error);
    return null;
  }
};

// 删除类目
export const deleteCategory = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/categories/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      console.error('删除类目失败:', response.statusText);
      return false;
    }
    
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('删除类目出错:', error);
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