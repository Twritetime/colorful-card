'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getProduct, updateProduct, deleteProduct } from '@/lib/productService';
import { use } from 'react';
import ImageDropzone from '@/components/ImageDropzone';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
    published: true,
    images: [] as string[],
  });

  // 获取产品数据
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const product = getProduct(id);
        
        if (!product) {
          alert('未找到产品');
          router.push('/dashboard/products');
          return;
        }
        
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          stock: product.stock,
          published: product.published,
          images: product.images,
        });
      } catch (error) {
        console.error('获取产品失败:', error);
        alert('获取产品失败');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id, router]);

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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 转换数据类型
      const productToUpdate = {
        ...formData,
        price: typeof formData.price === 'string' ? parseFloat(formData.price) : formData.price,
        stock: typeof formData.stock === 'string' ? parseInt(formData.stock) : formData.stock,
      };
      
      // 更新产品
      const updatedProduct = updateProduct(id, productToUpdate);
      
      if (!updatedProduct) {
        throw new Error('更新产品失败');
      }
      
      // 显示成功消息
      alert('产品更新成功！');
    } catch (error) {
      console.error('更新产品失败:', error);
      alert('更新产品失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    // 确认删除
    if (!window.confirm('确定要删除此产品吗？此操作无法撤销。')) {
      return;
    }

    setIsDeleting(true);

    try {
      // 删除产品
      const success = deleteProduct(id);
      
      if (!success) {
        throw new Error('删除产品失败');
      }
      
      // 显示成功消息
      alert('产品删除成功！');
      
      // 重定向到产品列表页
      router.push('/dashboard/products');
    } catch (error) {
      console.error('删除产品失败:', error);
      alert('删除产品失败，请重试');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleImagesChange = (images: string[]) => {
    setFormData(prev => ({
      ...prev,
      images
    }));
  };

  // 产品图片
  const productImage = formData.images && formData.images.length > 0 
    ? formData.images[0] 
    : "https://via.placeholder.com/150?text=No+Image";

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>加载中...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">产品详情</h2>
        <div className="flex gap-2">
          <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            type="button"
          >
            {isDeleting ? '删除中...' : '删除'}
          </button>
          <button 
            type="button"
            onClick={handleSave}
            disabled={isSubmitting}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? '保存中...' : '保存更改'}
          </button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {/* 产品图片 */}
        <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="text-xl font-semibold">产品图片</h3>
            <p className="text-sm text-muted-foreground">
              上传产品图片，支持拖放和多图上传
            </p>
          </div>
          <div className="p-6">
            <ImageDropzone 
              initialImages={formData.images}
              onImagesChange={handleImagesChange}
              maxImages={5}
            />
          </div>
        </div>
        
        {/* 产品信息 */}
        <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="text-xl font-semibold">产品信息</h3>
            <p className="text-sm text-muted-foreground">
              编辑产品的基本信息
            </p>
          </div>
          <div className="p-6">
            <form className="space-y-4" onSubmit={handleSave}>
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">产品名称</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">产品描述</label>
                <textarea
                  id="description"
                  name="description"
                  className="w-full px-3 py-2 border rounded-md min-h-[120px]"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <label htmlFor="price" className="text-sm font-medium">产品价格</label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="stock" className="text-sm font-medium">库存数量</label>
                  <input
                    id="stock"
                    name="stock"
                    type="number"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="category" className="text-sm font-medium">产品分类</label>
                <select 
                  id="category" 
                  name="category"
                  className="w-full px-3 py-2 border rounded-md" 
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">选择分类</option>
                  <option value="greeting">贺卡</option>
                  <option value="business">名片</option>
                  <option value="invitation">邀请卡</option>
                  <option value="gift">礼品卡</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="published" 
                  name="published"
                  className="mr-2" 
                  checked={formData.published}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="published" className="text-sm font-medium">发布状态</label>
              </div>

              <div className="mt-4">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? '保存中...' : '保存更改'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 