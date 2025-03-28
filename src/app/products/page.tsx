"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Product, getAllProducts } from "@/lib/productService";
import { Category, getAllCategories } from "@/lib/categoryService";
import { useLanguage } from "@/contexts/LanguageContext";
import ClientImage from "@/components/ClientImage";
import { formatCurrency } from "@/lib/utils";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const { t, language } = useLanguage();

  // 从productService获取产品数据和类目数据
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // 获取产品数据（异步）
        const productData = await getAllProducts();
        // 只显示已发布的产品
        setProducts(productData.filter(p => p.published));
        
        // 获取类目数据（异步）
        const categoryData = await getAllCategories();
        if (categoryData && categoryData.length > 0) {
          setCategories(categoryData);
        }
      } catch (error) {
        console.error("获取数据失败:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    // 立即获取一次数据
    fetchData();

    // 设置定期刷新（改为30秒一次）
    const intervalId = setInterval(fetchData, 30000);

    // 清理函数
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // 过滤产品（添加空值检查）
  const filteredProducts = products.filter(
    (product) =>
      product && // 确保产品对象存在
      (selectedCategory === "all" || 
       (product.categoryId && product.categoryId === selectedCategory) || 
       (product.category && product.category === selectedCategory)) &&
      (product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       product.description?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // 获取类目名称（添加空值检查）
  const getCategoryName = (categoryId: string) => {
    if (!categoryId) return '';
    const category = categories.find(c => 
      (c._id && c._id === categoryId) || (c.id && c.id === categoryId)
    );
    return category?.name || '';
  };

  // 获取占位图URL的辅助函数
  const getPlaceholderUrl = (text: string = '产品图片') => {
    // 确保文本被正确编码，并添加语言支持
    const displayText = language === 'en' ? 'Product Image' : text;
    return `/api/placeholder?width=600&height=600&text=${encodeURIComponent(displayText)}`;
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">{t('products.title')}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('home.hero.description')}
        </p>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder={t('products.search')}
            className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2">
          <button
            key="all"
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-md whitespace-nowrap text-sm font-medium ${
              selectedCategory === "all"
                ? "bg-primary text-white"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            {t('products.all')}
          </button>
          
          {categories.map((category) => (
            <button
              key={category._id || category.id}
              onClick={() => setSelectedCategory(category._id || category.id)}
              className={`px-4 py-2 rounded-md whitespace-nowrap text-sm font-medium ${
                selectedCategory === (category._id || category.id)
                  ? "bg-primary text-white"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* 产品网格 */}
      {isLoading ? (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">{t('products.loading')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {filteredProducts.map((product) => (
            <Link key={product._id || product.id} href={`/products/${product._id || product.id}`}>
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="aspect-square relative w-full">
                  <ClientImage 
                    src={product.images?.[0] || ''}
                    alt={product.name}
                    className="object-cover"
                    fill
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
                  <p className="mt-1 font-semibold text-primary">{formatCurrency(product.price)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {!isLoading && filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">
            {t('products.empty')}
          </p>
        </div>
      )}

      {/* 询价区域 */}
      <div className="mt-16 bg-muted rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">
          {language === 'en' ? "Looking for a Custom Solution?" : "寻找定制解决方案？"}
        </h2>
        <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
          {language === 'en' 
            ? "We offer fully customized design and production services to meet your unique needs. Contact us for a free quote."
            : "我们提供完全定制的设计和生产服务，满足您的独特需求。联系我们获取免费报价。"
          }
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-primary rounded-lg hover:bg-primary/90 focus:outline-none"
        >
          {language === 'en' ? "Get a Free Quote" : "获取免费报价"}
        </Link>
      </div>
    </div>
  );
} 