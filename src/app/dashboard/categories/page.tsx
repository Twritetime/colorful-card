'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Category, getAllCategories, deleteCategory } from '@/lib/categoryService';
import { CategoryIcon } from '@/components/icons/CategoryIcons';

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // 获取所有类目
  useEffect(() => {
    try {
      const data = getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error('获取类目数据失败:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 处理添加新类目
  const handleAddCategory = () => {
    router.push('/dashboard/categories/new');
  };

  // 处理编辑类目
  const handleEditCategory = (id: string) => {
    router.push(`/dashboard/categories/${id}`);
  };

  // 处理删除类目
  const handleDeleteCategory = async (id: string) => {
    try {
      const success = deleteCategory(id);
      
      if (success) {
        // 更新本地状态
        setCategories(prev => prev.filter(category => category.id !== id));
        alert('类目删除成功！');
      } else {
        alert('删除失败，未找到类目');
      }
    } catch (error) {
      console.error('删除类目失败:', error);
      alert('删除类目失败，请重试');
    } finally {
      setDeleteConfirm(null);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">产品类目管理</h2>
        <button 
          onClick={handleAddCategory}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-1" />
          添加类目
        </button>
      </div>
      
      <div className="grid gap-4">
        <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="text-xl font-semibold">类目列表</h3>
            <p className="text-sm text-muted-foreground">
              管理产品分类，用于组织和展示产品
            </p>
          </div>
          <div className="p-6">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <p>加载中...</p>
              </div>
            ) : categories.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="text-left border-b">
                    <tr>
                      <th className="pb-2 font-medium">类目</th>
                      <th className="pb-2 font-medium">标识符</th>
                      <th className="pb-2 font-medium">排序</th>
                      <th className="pb-2 font-medium">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category) => (
                      <tr key={category.id} className="border-b last:border-b-0">
                        <td className="py-3">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-md overflow-hidden border mr-3 bg-muted flex items-center justify-center">
                              {category.image ? (
                                <Image 
                                  src={category.image} 
                                  alt={category.name}
                                  width={40}
                                  height={40}
                                  className="w-full h-full object-cover"
                                  unoptimized={true}
                                />
                              ) : (
                                <CategoryIcon icon={category.icon} className="h-6 w-6 text-muted-foreground" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium">{category.name}</div>
                              <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                                {category.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <span className="text-sm font-mono bg-muted px-2 py-1 rounded">
                            {category.id}
                          </span>
                        </td>
                        <td className="py-3">{category.order}</td>
                        <td className="py-3">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleEditCategory(category.id)} 
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                              title="编辑"
                            >
                              <PencilIcon className="h-5 w-5" />
                            </button>
                            {deleteConfirm === category.id ? (
                              <div className="flex items-center space-x-2">
                                <button 
                                  onClick={() => handleDeleteCategory(category.id)}
                                  className="text-xs bg-red-500 text-white px-2 py-1 rounded"
                                >
                                  确认
                                </button>
                                <button 
                                  onClick={() => setDeleteConfirm(null)}
                                  className="text-xs bg-gray-200 px-2 py-1 rounded"
                                >
                                  取消
                                </button>
                              </div>
                            ) : (
                              <button 
                                onClick={() => setDeleteConfirm(category.id)} 
                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                                title="删除"
                              >
                                <TrashIcon className="h-5 w-5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="border rounded-md p-4 flex flex-col items-center justify-center min-h-[300px]">
                <p className="text-muted-foreground text-center mb-4">
                  暂无类目数据
                </p>
                <button 
                  onClick={handleAddCategory}
                  className="px-4 py-2 border rounded-md hover:bg-gray-100"
                >
                  添加类目
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 