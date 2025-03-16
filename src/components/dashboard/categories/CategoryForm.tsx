'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Category, getAllCategories } from '@/lib/categoryService';
import { CategoryIcon } from '@/components/icons/CategoryIcons';
import ImageDropzone from '@/components/ImageDropzone';

// 可用的图标列表
const availableIcons = [
  { id: 'BusinessCard', name: '名片' },
  { id: 'Gift', name: '礼品' },
  { id: 'GiftCard', name: '礼品卡' },
  { id: 'Calendar', name: '日历' },
  { id: 'Packaging', name: '包装' },
  { id: 'Tag', name: '标签' },
  { id: 'Folder', name: '文件夹' },
];

interface CategoryFormProps {
  initialData?: Partial<Category>;
  onSubmit: (data: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => void;
  isSubmitting: boolean;
  submitLabel: string;
}

export default function CategoryForm({ 
  initialData, 
  onSubmit, 
  isSubmitting,
  submitLabel
}: CategoryFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    icon: initialData?.icon || 'Folder',
    image: initialData?.image || '',
    parentId: initialData?.parentId || null,
    order: initialData?.order || 0,
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [images, setImages] = useState<string[]>(
    initialData?.image ? [initialData.image] : []
  );

  // 获取所有类目，用于父类目选择
  useEffect(() => {
    try {
      const data = getAllCategories();
      // 过滤掉当前类目（如果是编辑模式）
      const filteredCategories = initialData?.id 
        ? data.filter(cat => cat.id !== initialData.id)
        : data;
      setCategories(filteredCategories);
    } catch (error) {
      console.error('获取类目数据失败:', error);
    }
  }, [initialData]);

  // 处理输入变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // 如果修改的是名称，并且slug还没有被手动修改过，则自动生成slug
    if (name === 'name' && formData.slug === initialData?.slug) {
      const newSlug = value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: value,
        slug: newSlug
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // 处理图标选择
  const handleIconSelect = (iconId: string) => {
    setFormData(prev => ({
      ...prev,
      icon: iconId
    }));
  };

  // 处理图片变化
  const handleImagesChange = (newImages: string[]) => {
    setImages(newImages);
    setFormData(prev => ({
      ...prev,
      image: newImages.length > 0 ? newImages[0] : ''
    }));
  };

  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 验证表单
    if (!formData.name || !formData.slug) {
      alert('请填写类目名称和标识符');
      return;
    }
    
    // 转换数据类型
    const categoryData = {
      ...formData,
      order: typeof formData.order === 'string' ? parseInt(formData.order.toString()) : formData.order,
    };
    
    onSubmit(categoryData);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid gap-6 md:grid-cols-2">
        {/* 基本信息 */}
        <div className="space-y-4">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium">类目名称</label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="输入类目名称"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="grid gap-2">
            <label htmlFor="slug" className="text-sm font-medium">标识符</label>
            <input
              id="slug"
              name="slug"
              type="text"
              className="w-full px-3 py-2 border rounded-md font-mono text-sm"
              placeholder="输入标识符，用于URL"
              value={formData.slug}
              onChange={handleChange}
              required
            />
            <p className="text-xs text-muted-foreground">
              标识符将用于URL和系统标识，只能包含小写字母、数字和连字符
            </p>
          </div>
          
          <div className="grid gap-2">
            <label htmlFor="description" className="text-sm font-medium">类目描述</label>
            <textarea
              id="description"
              name="description"
              className="w-full px-3 py-2 border rounded-md min-h-[100px]"
              placeholder="输入类目描述"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          
          <div className="grid gap-2">
            <label htmlFor="parentId" className="text-sm font-medium">父类目</label>
            <select 
              id="parentId" 
              name="parentId"
              className="w-full px-3 py-2 border rounded-md"
              value={formData.parentId || ''}
              onChange={(e) => {
                const value = e.target.value;
                setFormData(prev => ({
                  ...prev,
                  parentId: value === '' ? null : value
                }));
              }}
            >
              <option value="">无父类目（顶级类目）</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="grid gap-2">
            <label htmlFor="order" className="text-sm font-medium">排序</label>
            <input
              id="order"
              name="order"
              type="number"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="输入排序数字，数字越小排序越靠前"
              value={formData.order}
              onChange={handleChange}
              required
            />
            <p className="text-xs text-muted-foreground">
              排序数字决定类目的显示顺序，数字越小排序越靠前
            </p>
          </div>
        </div>
        
        {/* 图标和图片 */}
        <div className="space-y-6">
          <div className="grid gap-2">
            <label className="text-sm font-medium">类目图标</label>
            <div className="grid grid-cols-4 gap-2">
              {availableIcons.map((icon) => (
                <button
                  key={icon.id}
                  type="button"
                  onClick={() => handleIconSelect(icon.id)}
                  className={`p-3 rounded-md flex flex-col items-center justify-center border ${
                    formData.icon === icon.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <CategoryIcon icon={icon.id} className="h-6 w-6 mb-1" />
                  <span className="text-xs">{icon.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid gap-2">
            <label className="text-sm font-medium">类目图片</label>
            <ImageDropzone 
              initialImages={images}
              onImagesChange={handleImagesChange}
              maxImages={1}
            />
            <p className="text-xs text-muted-foreground">
              上传一张代表该类目的图片，建议尺寸为300x300像素
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-4">
        <button 
          type="button"
          onClick={() => router.push('/dashboard/categories')}
          className="px-4 py-2 border rounded-md hover:bg-gray-100"
        >
          取消
        </button>
        <button 
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '保存中...' : submitLabel}
        </button>
      </div>
    </form>
  );
} 