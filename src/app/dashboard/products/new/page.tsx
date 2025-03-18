'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct } from '@/lib/productService';
import { getAllCategories, Category } from '@/lib/categoryService';
import ImageDropzone from '@/components/ImageDropzone';

export default function NewProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    published: true,
    images: [] as string[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  // 获取所有类目
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getAllCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('获取类目数据失败:', error);
      }
    };
    
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleImagesChange = (newImages: string[]) => {
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 转换数据类型
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        // 如果没有上传图片，使用默认图片
        images: formData.images.length > 0 ? formData.images : ['https://placehold.co/600x400?text=产品图片']
      };
      
      // 创建产品
      const newProduct = await createProduct(productData);
      
      // 重定向到产品列表页
      router.push('/dashboard/products');
    } catch (error) {
      console.error('创建产品失败:', error);
      alert('创建产品失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">添加新产品</h1>
      </div>
      
      <form onSubmit={handleSave} className="bg-white p-6 rounded-lg shadow">
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              产品名称
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="输入产品名称"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block mb-2 text-sm font-medium">
              产品类目
            </label>
            <select
              id="category"
              name="category"
              className="w-full px-3 py-2 border rounded-md"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">选择类目</option>
              {categories.map((category) => (
                <option key={category._id || category.id} value={category._id || category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="price" className="block mb-2 text-sm font-medium">
              价格
            </label>
            <input
              type="number"
              id="price"
              name="price"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="输入价格"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label htmlFor="stock" className="block mb-2 text-sm font-medium">
              库存
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="输入库存数量"
              min="0"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="description" className="block mb-2 text-sm font-medium">
            产品描述
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="输入产品描述"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">
            产品图片
          </label>
          <ImageDropzone 
            initialImages={formData.images}
            onImagesChange={handleImagesChange}
          />
        </div>
        
        <div className="flex items-center mb-6">
          <input
            id="published"
            name="published"
            type="checkbox"
            className="w-4 h-4 mr-2"
            checked={formData.published}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="published" className="text-sm font-medium">
            立即发布
          </label>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push('/dashboard/products')}
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            取消
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
          >
            {isSubmitting ? '保存中...' : '保存产品'}
          </button>
        </div>
      </form>
    </div>
  );
} 