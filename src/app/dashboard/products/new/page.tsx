'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct } from '@/lib/productService';
import { getAllCategories, Category } from '@/lib/categoryService';
import ProductImageUploader from '@/components/ProductImageUploader';
import RichTextEditor from '@/components/RichTextEditor'

interface FormData {
  name: string;
  description: string;
  price: string;
  category: string;
  stock: string;
  published: boolean;
  images: string[];
  videos: string[];
  content: string;
}

export default function NewProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    published: true,
    images: [],
    videos: [],
    content: ''
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
    
    // 表单验证
    if (!formData.name.trim()) {
      alert('请输入产品名称');
      return;
    }
    if (!formData.description.trim()) {
      alert('请输入产品描述');
      return;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      alert('请输入有效的产品价格');
      return;
    }
    if (!formData.category) {
      alert('请选择产品类目');
      return;
    }
    if (!formData.stock || parseInt(formData.stock) < 0) {
      alert('请输入有效的库存数量');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // 准备提交的数据
      const productData = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        category: formData.category,
        stock: Number(formData.stock),
        published: formData.published,
        images: formData.images.length > 0 
          ? formData.images 
          : [`/api/placeholder?width=600&height=400&text=${encodeURIComponent('产品图片')}`],
        videos: formData.videos,
        content: formData.content
      };

      console.log('提交的产品数据:', productData);
      console.log('视频数据:', formData.videos);

      const result = await createProduct(productData);
      console.log('创建产品结果:', result);

      if (result) {
        router.push('/dashboard/products');
      } else {
        console.error('产品创建失败');
        alert('产品创建失败，请重试');
      }
    } catch (error) {
      console.error('保存产品时出错:', error);
      alert('保存产品时出错，请重试');
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
        
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            产品描述
          </label>
          <RichTextEditor
            content={formData.description}
            onChange={(content) => setFormData({ ...formData, description: content })}
            placeholder="在此输入产品描述..."
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            产品图片
          </label>
          <ProductImageUploader
            images={formData.images}
            onChange={(urls) => setFormData({ ...formData, images: urls })}
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            产品视频
          </label>
          <ProductImageUploader
            images={formData.videos}
            onChange={(urls) => {
              console.log('视频上传完成，URLs:', urls);
              setFormData(prev => ({
                ...prev,
                videos: urls
              }));
            }}
            type="video"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            产品详细内容
          </label>
          <RichTextEditor
            content={formData.content}
            onChange={(content) => setFormData({ ...formData, content })}
            placeholder="在此输入产品详细内容..."
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