'use client';

import { useRouter } from "next/navigation";
import { PlusIcon, TagIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { Category, getAllCategories } from "@/lib/categoryService";
import Image from "next/image";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import useSWR from 'swr';
import { Category as CategoryType } from '@/types/category';
import { getCategories } from '@/lib/categoryService';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import ClientImage from '@/components/ClientImage';

// 数据获取器
const fetcher = (url: string) => fetch(url).then(res => res.json()).then(data => data.data);

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">类别管理</h1>
        <Link
          href="/dashboard/categories/new"
          className="bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-primary/90"
        >
          <Plus size={20} />
          添加类别
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/dashboard/categories/${category._id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-square relative">
              {category.image ? (
                <ClientImage
                  src={category.image}
                  alt={category.name}
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
              <h2 className="text-lg font-semibold mb-2">{category.name}</h2>
              <p className="text-gray-600 text-sm">{category.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 