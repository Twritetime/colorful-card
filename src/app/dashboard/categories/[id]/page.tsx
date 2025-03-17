'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCategory, updateCategory } from '@/lib/categoryService';
import CategoryForm from '@/components/dashboard/categories/CategoryForm';
import { use } from 'react';

interface EditCategoryPageProps {
  params: {
    id: string;
  };
}

export default function EditCategoryPage({ params }: EditCategoryPageProps) {
  const router = useRouter();
  // 使用React.use()解包params
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  
  const [category, setCategory] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 获取类目数据
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const categoryData = await getCategory(id);
        if (categoryData) {
          setCategory(categoryData);
        } else {
          setError('找不到该类目');
        }
      } catch (err) {
        console.error('获取类目数据失败:', err);
        setError('获取类目数据失败');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  // 处理更新类目
  const handleUpdateCategory = async (categoryData: any) => {
    setIsSubmitting(true);
    try {
      // 更新类目
      const updatedCategory = await updateCategory(id, categoryData);
      
      // 显示成功消息
      alert('类目更新成功！');
      
      // 重定向到类目列表页
      router.push('/dashboard/categories');
    } catch (error) {
      console.error('更新类目失败:', error);
      alert('更新类目失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 加载中状态
  if (isLoading) {
    return (
      <div className="container mx-auto py-6 px-4">
        <div className="flex items-center justify-center h-64">
          <p className="text-lg">加载中...</p>
        </div>
      </div>
    );
  }

  // 错误状态
  if (error) {
    return (
      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-lg text-red-500 mb-4">{error}</p>
          <button
            onClick={() => router.push('/dashboard/categories')}
            className="px-4 py-2 bg-primary text-white rounded-md"
          >
            返回类目列表
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">编辑类目</h1>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <CategoryForm 
          initialData={category}
          onSubmit={handleUpdateCategory}
          isSubmitting={isSubmitting}
          submitLabel="保存修改"
        />
      </div>
    </div>
  );
} 