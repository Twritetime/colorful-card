'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Product, getProduct, updateProduct, deleteProduct } from "@/lib/productService";
import { Category, getAllCategories } from "@/lib/categoryService";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import useSWR from 'swr';
import { use } from 'react';
import ImageDropzone from '@/components/ImageDropzone';

const fetcher = (url: string) => fetch(url).then(res => res.json()).then(data => data.data);

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const router = useRouter();
  // 使用React.use()解包params
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    published: false,
    images: [] as string[]
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // 使用SWR获取产品数据
  const { data: product, error: productError, isLoading: isLoadingProduct, mutate: refreshProduct } = 
    useSWR(id ? `/api/products/${id}` : null, fetcher);
  
  // 使用SWR获取类别数据
  const { data: categoriesData, error: categoriesError, isLoading: isLoadingCategories } = 
    useSWR('/api/categories', fetcher);

  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData);
    }
  }, [categoriesData]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description || '',
        price: product.price.toString(),
        category: product.category || '',
        stock: product.stock.toString(),
        published: product.published,
        images: product.images || []
      });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // 处理图片变化
  const handleImagesChange = (newImages: string[]) => {
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const updatedProduct = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        id: id,
      };

      const result = await updateProduct(id, updatedProduct);
      
      // 成功后刷新数据
      await refreshProduct();
      
      setSuccessMessage('产品更新成功！');
      
      // 3秒后清除成功消息
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.error('更新产品失败:', error);
      setError('更新产品失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (confirm('确定要删除这个产品吗？此操作不可撤销。')) {
      setIsSubmitting(true);
      try {
        await deleteProduct(id);
        // 成功后返回产品列表页面
        router.push('/dashboard/products');
      } catch (error) {
        console.error('删除产品失败:', error);
        setError('删除产品失败，请重试');
        setIsSubmitting(false);
      }
    }
  };

  const handleCancel = () => {
    router.push('/dashboard/products');
  };

  if (isLoadingProduct || isLoadingCategories) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner />
          <p className="ml-2">加载中...</p>
        </div>
      </div>
    );
  }

  if (productError || !product) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong className="font-bold">错误：</strong>
          <span className="block sm:inline">
            {productError ? '加载产品数据失败' : '找不到产品'}
          </span>
        </div>
        <button
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded-md"
        >
          返回列表
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">编辑产品</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong className="font-bold">错误：</strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <strong className="font-bold">成功：</strong>
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            产品名称
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            产品描述
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={4}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
              价格
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
              库存
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            类别
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">选择类别</option>
            {categories.map((category) => (
              <option key={category.id || category._id} value={category.id || category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* 图片上传组件 */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            产品图片
          </label>
          <ImageDropzone
            initialImages={formData.images}
            onImagesChange={handleImagesChange}
            maxImages={5}
          />
          <p className="text-xs text-gray-500 mt-1">
            上传产品图片，最多5张，支持JPG、PNG、GIF格式
          </p>
        </div>

        {/* 发布状态 */}
        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="mr-2"
            />
            <span className="text-gray-700 text-sm font-bold">发布产品</span>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            >
              {isSubmitting ? '保存中...' : '保存产品'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              取消
            </button>
          </div>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            删除产品
          </button>
        </div>
      </form>
    </div>
  );
} 