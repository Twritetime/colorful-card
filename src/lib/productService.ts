// 产品数据类型定义
export interface Product {
  id?: string; // 使用MongoDB时，这将是_id
  _id?: string; // MongoDB的ID
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  published: boolean;
  images: string[];
  videos: string[];
  content?: string; // 富文本内容
  createdAt: string;
  updatedAt: string;
}

// API基础URL
const API_BASE_URL = typeof window !== 'undefined' ? '' : process.env.NEXT_PUBLIC_API_BASE_URL || '';

// 获取单个产品
export const getProduct = async (id: string): Promise<Product | null> => {
  // 检查ID是否有效
  if (!id || id === 'undefined') {
    console.error('获取产品失败: 无效的产品ID:', id);
    throw new Error('无效的产品ID');
  }

  try {
    console.log(`正在获取产品，ID: ${id}`);
    const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`获取产品失败: ${response.status} ${response.statusText}`, errorText);
      throw new Error(response.statusText || `HTTP错误 ${response.status}`);
    }
    
    const result = await response.json();
    
    if (!result.success) {
      console.error('API返回错误:', result.message);
      throw new Error(result.message || '获取产品失败');
    }
    
    return result.data;
  } catch (error) {
    console.error('获取产品出错:', error);
    throw error;
  }
};

// 获取所有产品
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products`);
    
    if (!response.ok) {
      console.error('获取所有产品失败:', response.statusText);
      return [];
    }
    
    const result = await response.json();
    return result.success ? result.data : [];
  } catch (error) {
    console.error('获取所有产品出错:', error);
    return [];
  }
};

// 创建新产品
export const createProduct = async (productData: Omit<Product, '_id' | 'id' | 'createdAt' | 'updatedAt'>): Promise<Product | null> => {
  try {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...productData,
        videos: productData.videos || [],
        content: productData.content || ''
      }),
    });

    if (!response.ok) {
      throw new Error('创建产品失败');
    }

    return response.json();
  } catch (error) {
    console.error('创建产品时出错:', error);
    return null;
  }
};

// 更新产品
export const updateProduct = async (id: string, productData: Partial<Product>): Promise<Product | null> => {
  try {
    // 确保不传递_id字段，避免MongoDB更新错误
    const { _id, ...updateData } = productData;
    
    const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    
    if (!response.ok) {
      console.error('更新产品失败:', response.statusText);
      return null;
    }
    
    const result = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error('更新产品出错:', error);
    return null;
  }
};

// 删除产品
export const deleteProduct = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      console.error('删除产品失败:', response.statusText);
      return false;
    }
    
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('删除产品出错:', error);
    return false;
  }
}; 