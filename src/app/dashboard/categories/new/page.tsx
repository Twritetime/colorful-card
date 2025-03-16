'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCategory } from '@/lib/categoryService';
import CategoryForm from '@/components/dashboard/categories/CategoryForm';

export default function NewCategoryPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateCategory = async (categoryData: any) => {
    setIsSubmitting(true);
    try {
      // 创建新类目
      const newCategory = createCategory(categoryData);
      
      // 显示成功消息
      alert('类目创建成功！');
      
      // 重定向到类目列表页
      router.push('/dashboard/categories');
    } catch (error) {
      console.error('创建类目失败:', error);
      alert('创建类目失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">添加新类目</h1>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <CategoryForm 
          onSubmit={handleCreateCategory}
          isSubmitting={isSubmitting}
          submitLabel="创建类目"
        />
      </div>
    </div>
  );
} 