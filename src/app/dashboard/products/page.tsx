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
import useSWR from 'swr';
import { Plus } from 'lucide-react';
import ClientImage from '@/components/ClientImage';

// 数据获取器
const fetcher = (url: string) => fetch(url).then(res => res.json()).then(data => data.data);

// 由于元数据只能在服务器组件中定义，我们需要在另一个文件中定义或使用替代方法
// export const metadata: Metadata = {
//   title: "产品管理",
//   description: "管理您的产品目录",
// };

export default function ProductsPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<{[key: string]: Category}>({});
  
  // 使用SWR获取产品数据
  const { data: products, error: productsError, isLoading: productsLoading, mutate: refreshProducts } = 
    useSWR('/api/products', fetcher, { refreshInterval: 5000 }); // 每5秒自动刷新一次
  
  // 使用SWR获取类别数据
  const { data: categoriesData, error: categoriesError, isLoading: categoriesLoading, mutate: refreshCategories } = 
    useSWR('/api/categories', fetcher, { refreshInterval: 5000 });

  useEffect(() => {
    if (categoriesData) {
      const categoriesMap = categoriesData.reduce((acc, category) => {
        acc[category.id || category._id] = category;
        return acc;
      }, {} as {[key: string]: Category});
      setCategories(categoriesMap);
    }
  }, [categoriesData]);

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

  // 手动刷新数据
  const handleRefreshData = () => {
    refreshProducts();
    refreshCategories();
  };

  // 显示加载状态
  if (productsLoading || categoriesLoading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">产品管理</h1>
        <div className="flex justify-between mb-6">
          <button
            onClick={handleAddProduct}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            添加产品
          </button>
          <button
            onClick={handleRefreshData}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md ml-2"
          >
            刷新数据
          </button>
        </div>
        <div className="text-center py-10">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">加载中...</p>
        </div>
      </div>
    );
  }

  // 显示错误
  if (productsError || categoriesError) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">产品管理</h1>
        <div className="flex justify-between mb-6">
          <button
            onClick={handleAddProduct}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            添加产品
          </button>
          <button
            onClick={handleRefreshData}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md ml-2"
          >
            刷新数据
          </button>
        </div>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong className="font-bold">错误：</strong>
          <span className="block sm:inline">获取数据失败，请重试。</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">产品管理</h1>
        <Link
          href="/dashboard/products/new"
          className="bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-primary/90"
        >
          <Plus size={20} />
          添加产品
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/dashboard/products/${product._id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-square relative">
              {product.images && product.images.length > 0 ? (
                <ClientImage
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">暂无图片</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-primary font-semibold">¥{product.price}</span>
                <span className="text-sm text-gray-500">库存: {product.stock}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 