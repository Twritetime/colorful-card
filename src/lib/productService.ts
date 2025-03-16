// 产品数据类型定义
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  published: boolean;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

// 初始演示数据
const initialProducts: Product[] = [
  {
    id: "1",
    name: "高级名片",
    description: "高质量定制设计名片",
    price: 49.99,
    category: "business",
    stock: 100,
    published: true,
    images: ["https://images.unsplash.com/photo-1572502007796-bf53841bc530"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "豪华礼品卡",
    description: "特殊场合的精美礼品卡",
    price: 29.99,
    category: "gift",
    stock: 200,
    published: true,
    images: ["https://images.unsplash.com/photo-1607344645866-009c320b63e0"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "企业贺卡",
    description: "用于商务沟通的专业贺卡",
    price: 19.99,
    category: "greeting",
    stock: 150,
    published: true,
    images: ["https://images.unsplash.com/photo-1512909006721-3d6018887383"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// 从localStorage获取所有产品数据，如果没有则使用初始演示数据
const getProducts = (): Product[] => {
  if (typeof window === "undefined") {
    return [];
  }

  const storedProducts = localStorage.getItem("products");
  if (!storedProducts) {
    // 首次使用，存储初始数据
    localStorage.setItem("products", JSON.stringify(initialProducts));
    return initialProducts;
  }

  return JSON.parse(storedProducts);
};

// 保存所有产品数据到localStorage
const saveProducts = (products: Product[]): void => {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem("products", JSON.stringify(products));
};

// 获取单个产品
export const getProduct = (id: string): Product | null => {
  const products = getProducts();
  return products.find(product => product.id === id) || null;
};

// 获取所有产品
export const getAllProducts = (): Product[] => {
  return getProducts();
};

// 创建新产品
export const createProduct = (productData: Omit<Product, "id" | "createdAt" | "updatedAt">): Product => {
  const products = getProducts();
  
  // 生成新ID（实际应用中应使用更健壮的UUID生成方法）
  const newId = (Math.max(0, ...products.map(p => parseInt(p.id))) + 1).toString();
  
  const now = new Date().toISOString();
  const newProduct: Product = {
    ...productData,
    id: newId,
    createdAt: now,
    updatedAt: now,
  };
  
  products.push(newProduct);
  saveProducts(products);
  
  return newProduct;
};

// 更新产品
export const updateProduct = (id: string, productData: Partial<Product>): Product | null => {
  const products = getProducts();
  const index = products.findIndex(product => product.id === id);
  
  if (index === -1) {
    return null;
  }
  
  // 更新产品数据
  const updatedProduct = {
    ...products[index],
    ...productData,
    updatedAt: new Date().toISOString(),
  };
  
  products[index] = updatedProduct;
  saveProducts(products);
  
  return updatedProduct;
};

// 删除产品
export const deleteProduct = (id: string): boolean => {
  const products = getProducts();
  const newProducts = products.filter(product => product.id !== id);
  
  if (newProducts.length === products.length) {
    return false; // 没有找到产品
  }
  
  saveProducts(newProducts);
  return true;
}; 