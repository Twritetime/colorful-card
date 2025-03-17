'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getProduct, updateProduct, deleteProduct } from '@/lib/productService';
import { getAllCategories, Category } from '@/lib/categoryService';
import ImageDropzone from '@/components/ImageDropzone';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
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

  // 获取产品数据和类目数据
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // 检查ID是否有效
        if (!params.id || params.id === 'undefined') {
          setError('无效的产品ID');
          setIsLoading(false);
          return;
        }

        console.log(`尝试获取产品，ID: ${params.id}`);
        
        // 获取产品数据
        try {
          const productData = await getProduct(params.id);
          if (productData) {
            setProduct(productData);
            setFormData({
              name: productData.name,
              description: productData.description || '',
              price: productData.price.toString(),
              category: productData.category || '',
              stock: productData.stock.toString(),
              published: productData.published,
              images: productData.images || []
            });
          } else {
            setError('找不到该产品');
          }
        } catch (productError) {
          console.error('获取产品数据失败:', productError);
          setError(`获取产品数据失败: ${productError.message || '未知错误'}`);
        }
        
        // 获取所有类目
        try {
          const categoriesData = await getAllCategories();
          setCategories(categoriesData);
        } catch (categoriesError) {
          console.error('获取类目数据失败:', categoriesError);
          // 不会中止流程，只记录错误
        }
      } catch (error) {
        console.error('获取数据失败:', error);
        setError(`获取数据失败: ${error.message || '未知错误'}`);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [params.id]);

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
      
      // 更新产品
      const updatedProduct = await updateProduct(params.id, productData);
      
      // 显示成功消息
      alert('产品更新成功！');
      
      // 重定向到产品列表页
      router.push('/dashboard/products');
    } catch (error) {
      console.error('更新产品失败:', error);
      alert('更新产品失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('确定要删除这个产品吗？此操作不可撤销。')) {
      try {
        // 删除产品
        await deleteProduct(params.id);
        
        // 显示成功消息
        alert('产品删除成功！');
        
        // 重定向到产品列表页
        router.push('/dashboard/products');
      } catch (error) {
        console.error('删除产品失败:', error);
        alert('删除产品失败，请重试');
      }
    }
  };

  // 加载中状态
  if (isLoading) {
    return (
      <div className="container mx-auto py-6 px-4">
        <div className="flex items-center justify-center h-64">
          {error ? (
            <p className="text-lg text-red-500 mb-4">{error}</p>
          ) : (
            <p className="text-lg">加载中...</p>
          )}
        </div>
      </div>
    );
  }

  // 产品不存在
  if (!product) {
    return (
      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-lg text-red-500 mb-4">找不到该产品</p>
          <button
            onClick={() => router.push('/dashboard/products')}
            className="px-4 py-2 bg-primary text-white rounded-md"
          >
            返回产品列表
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">编辑产品</h1>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          删除产品
        </button>
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
                <option key={category.id} value={category.id}>
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
            发布产品
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
            {isSubmitting ? '保存中...' : '保存修改'}
          </button>
        </div>
      </form>
    </div>
  );
} 