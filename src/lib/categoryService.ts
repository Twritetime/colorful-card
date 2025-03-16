// 产品类目数据类型定义
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  image?: string;
  parentId?: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// 初始演示数据
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

// 从localStorage获取所有类目数据，如果没有则使用初始演示数据
const getCategories = (): Category[] => {
  if (typeof window === "undefined") {
    return [];
  }

  const storedCategories = localStorage.getItem("categories");
  if (!storedCategories) {
    // 首次使用，存储初始数据
    localStorage.setItem("categories", JSON.stringify(initialCategories));
    return initialCategories;
  }

  return JSON.parse(storedCategories);
};

// 保存所有类目数据到localStorage
const saveCategories = (categories: Category[]): void => {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem("categories", JSON.stringify(categories));
};

// 获取单个类目
export const getCategory = (id: string): Category | null => {
  const categories = getCategories();
  return categories.find(category => category.id === id) || null;
};

// 获取所有类目
export const getAllCategories = (): Category[] => {
  return getCategories();
};

// 创建新类目
export const createCategory = (categoryData: Omit<Category, "id" | "createdAt" | "updatedAt">): Category => {
  const categories = getCategories();
  
  // 生成新ID（实际应用中应使用更健壮的UUID生成方法）
  const id = categoryData.slug.toLowerCase().replace(/\s+/g, '-');
  
  const now = new Date().toISOString();
  const newCategory: Category = {
    ...categoryData,
    id,
    createdAt: now,
    updatedAt: now,
  };
  
  categories.push(newCategory);
  saveCategories(categories);
  
  return newCategory;
};

// 更新类目
export const updateCategory = (id: string, categoryData: Partial<Category>): Category | null => {
  const categories = getCategories();
  const index = categories.findIndex(category => category.id === id);
  
  if (index === -1) {
    return null;
  }
  
  // 更新类目数据
  const updatedCategory = {
    ...categories[index],
    ...categoryData,
    updatedAt: new Date().toISOString(),
  };
  
  categories[index] = updatedCategory;
  saveCategories(categories);
  
  return updatedCategory;
};

// 删除类目
export const deleteCategory = (id: string): boolean => {
  const categories = getCategories();
  const newCategories = categories.filter(category => category.id !== id);
  
  if (newCategories.length === categories.length) {
    return false; // 没有找到类目
  }
  
  saveCategories(newCategories);
  return true;
};

// 根据父类目ID获取子类目
export const getCategoriesByParent = (parentId: string | null): Category[] => {
  const categories = getCategories();
  return categories.filter(category => category.parentId === parentId);
};

// 获取类目树结构
export const getCategoryTree = (): Category[] => {
  const categories = getCategories();
  const rootCategories = categories.filter(category => !category.parentId);
  
  // 按order排序
  return rootCategories.sort((a, b) => a.order - b.order);
}; 