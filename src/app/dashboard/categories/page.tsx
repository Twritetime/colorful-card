'use client';

import { useRouter } from "next/navigation";
import { PlusIcon, TagIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { Category, getAllCategories } from "@/lib/categoryService";
import Image from "next/image";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import useSWR from 'swr';

// 数据获取器
const fetcher = (url: string) => fetch(url).then(res => res.json()).then(data => data.data);

export default function CategoriesPage() {
  const router = useRouter();
  
  // 使用SWR获取类别数据
  const { data: categories, error, isLoading, mutate: refreshCategories } = 
    useSWR('/api/categories', fetcher, { refreshInterval: 5000 });

  const handleAddCategory = () => {
    router.push('/dashboard/categories/new');
  };

  const handleClickCategory = (id: string) => {
    router.push(`/dashboard/categories/${id}`);
  };

  // 手动刷新数据
  const handleRefreshData = () => {
    refreshCategories();
  };

  // 显示加载状态
  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">类别管理</h1>
        <div className="flex justify-between mb-6">
          <button
            onClick={handleAddCategory}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            添加类别
          </button>
          <button
            onClick={handleRefreshData}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md ml-2"
          >
            刷新数据
          </button>
        </div>
        <div className="text-center py-10">
          <LoadingSpinner size="large" />
          <p className="mt-2">加载中...</p>
        </div>
      </div>
    );
  }

  // 显示错误
  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">类别管理</h1>
        <div className="flex justify-between mb-6">
          <button
            onClick={handleAddCategory}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            添加类别
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">类别管理</h1>
      <div className="flex justify-between mb-6">
        <button
          onClick={handleAddCategory}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          添加类别
        </button>
        <button
          onClick={handleRefreshData}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md ml-2"
        >
          刷新数据
        </button>
      </div>

      {categories && categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category: Category) => (
            <div
              key={category.id || category._id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleClickCategory(category.id || category._id)}
            >
              <div className="h-40 bg-gray-200 relative">
                {category.image ? (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <TagIcon className="w-12 h-12" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-1">{category.name}</h3>
                <p className="text-gray-700 text-sm line-clamp-2 mb-2">{category.description}</p>
                <div className="text-sm text-gray-500">
                  Slug: {category.slug}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">暂无类别，点击"添加类别"按钮创建新类别。</p>
        </div>
      )}
    </div>
  );
} 