'use client';

import { Metadata } from "next";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Product, getAllProducts } from "@/lib/productService";
import { getAllCategories, Category } from '@/lib/categoryService';
import { CategoryIcon } from '@/components/icons/CategoryIcons';
import Image from 'next/image';

// 由于元数据只能在服务器组件中定义，我们需要在另一个文件中定义或使用替代方法
// export const metadata: Metadata = {
//   title: "产品管理",
//   description: "管理您的产品目录",
// };

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{[key: string]: Category}>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 获取所有产品数据
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // 异步获取产品数据
        const productsData = await getAllProducts();
        setProducts(productsData);
        
        // 异步获取所有类目
        const categoriesData = await getAllCategories();
        const categoriesMap = categoriesData.reduce((acc, category) => {
          acc[category.id as string] = category;
          return acc;
        }, {} as {[key: string]: Category});
        setCategories(categoriesMap);
      } catch (error) {
        console.error("获取数据失败:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleAddProduct = () => {
    router.push('/dashboard/products/new');
  };

  const handleClickProduct = (id: string) => {
    router.push(`/dashboard/products/${id}`);
  };

  // 获取类目名称
  const getCategoryName = (categoryId: string) => {
    return categories[categoryId]?.name || '未分类';
  };

  // 获取类目图标
  const getCategoryIcon = (categoryId: string) => {
    return categories[categoryId]?.icon || 'Folder';
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 px-4">
        <div className="flex items-center justify-center h-64">
          <p className="text-lg">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">产品管理</h1>
        <button
          onClick={handleAddProduct}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          添加新产品
        </button>
      </div>
      
      {products.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-lg mb-4">暂无产品数据</p>
          <button
            onClick={handleAddProduct}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            添加第一个产品
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link 
              key={product.id} 
              href={`/dashboard/products/${product.id}`}
              className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-48 bg-gray-100">
                {product.images && product.images.length > 0 ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    无图片
                  </div>
                )}
                {product.published ? (
                  <span className="absolute top-2 right-2 px-2 py-1 bg-green-500 text-white text-xs rounded">
                    已发布
                  </span>
                ) : (
                  <span className="absolute top-2 right-2 px-2 py-1 bg-gray-500 text-white text-xs rounded">
                    未发布
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <CategoryIcon icon={getCategoryIcon(product.category)} className="h-4 w-4 mr-1 text-gray-500" />
                  <span className="text-sm text-gray-500">{getCategoryName(product.category)}</span>
                </div>
                <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                <p className="text-primary font-medium">¥{product.price.toFixed(2)}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">库存: {product.stock}</span>
                  <span className="text-sm text-gray-500">ID: {product.id}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 