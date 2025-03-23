'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Category {
  _id: string;
  name: string;
  slug: string;
  image?: string;
}

interface Props {
  params: {
    urlId: string;
  };
}

export default function EditCategoryPage({ params }: Props) {
  const router = useRouter();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategory();
  }, [params.urlId]);

  const fetchCategory = async () => {
    try {
      setError(null);
      const response = await fetch(`/api/categories/${params.urlId}`);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || '获取分类失败');
      }
      const data = await response.json();
      setCategory(data);
    } catch (error) {
      console.error('Error fetching category:', error);
      setError(error instanceof Error ? error.message : '获取分类失败');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!category) return;

    try {
      const formData = new FormData(event.currentTarget);
      const updatedCategory = {
        ...category,
        name: formData.get('name') as string,
        slug: formData.get('slug') as string,
      };

      const response = await fetch(`/api/categories/${params.urlId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCategory),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || '保存分类失败');
      }

      router.push('/dashboard/categories');
    } catch (error) {
      console.error('Error saving category:', error);
      alert(error instanceof Error ? error.message : '保存分类失败');
    }
  };

  if (loading) {
    return <div className="container mx-auto py-8 px-4">加载中...</div>;
  }

  if (error || !category) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
          {error || '未找到分类'}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">编辑分类</h1>
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            名称
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={category.name}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
            Slug
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            defaultValue={category.slug}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
        >
          保存
        </button>
      </form>
    </div>
  );
} 