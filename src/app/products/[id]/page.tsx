"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { use } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Product, getProduct, getAllProducts } from "@/lib/productService";
import { Category, getAllCategories } from "@/lib/categoryService";
import { useLanguage } from "@/contexts/LanguageContext";
import ClientImage from "@/components/ClientImage";
import { formatCurrency } from '@/lib/utils';
import DOMPurify from 'isomorphic-dompurify'
import CustomVideoPlayer from '@/components/CustomVideoPlayer'

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t, language } = useLanguage();
  const [activeImage, setActiveImage] = useState<string>('');
  const [showVideo, setShowVideo] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string>('');

  // 获取产品数据
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        
        // 检查ID是否有效
        if (!id || id === 'undefined') {
          console.error('无效的产品ID:', id);
          setError('无效的产品ID');
          router.push('/products'); // 重定向到产品列表页面
          return;
        }
        
        console.log(`尝试获取产品详情，ID: ${id}`);
        const productData = await getProduct(id);
        
        if (!productData) {
          // 如果产品不存在，设置错误并重定向
          console.error('产品不存在');
          setError('抱歉，找不到该产品');
          setTimeout(() => {
            router.push('/products');
          }, 2000); // 2秒后重定向
          return;
        }
        
        // 产品数据获取成功
        console.log('获取到的完整产品数据:', productData);
        
        // 检查视频数据
        if (productData.videos) {
          console.log('原始视频数据:', productData.videos);
          // 确保videos是数组
          const videosArray = Array.isArray(productData.videos) ? productData.videos : [];
          console.log('处理后的视频数组:', videosArray);
          if (videosArray.length > 0) {
            console.log('第一个视频URL:', videosArray[0]);
            setActiveVideoUrl(videosArray[0]);
          }
          // 更新产品数据中的videos字段
          productData.videos = videosArray;
        } else {
          console.log('产品没有视频数据');
          productData.videos = [];
        }

        setProduct(productData);
        
        // 获取产品类目
        if (productData.category) {
          try {
            const categories = await getAllCategories();
            const categoryData = categories.find(c => c._id === productData.category || c.id === productData.category);
            if (categoryData) {
              setCategory(categoryData);
            }
          } catch (categoryError) {
            console.error('获取类别信息失败:', categoryError);
          }
        }
        
        // 设置第一张图片为活动图片
        if (productData.images && productData.images.length > 0) {
          setActiveImage(productData.images[0]);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('获取产品数据失败:', error);
        setError('加载产品时出错，请刷新页面重试');
        setIsLoading(false);
      }
    };
    
    fetchProduct();
  }, [id, router]);

  // 获取类目名称
  const getCategoryName = () => {
    return category ? category.name : t('product.uncategorized');
  };

  // 自定义产品特点（实际项目中应在数据库中存储这些信息）
  const getProductFeatures = (product: Product) => {
    const baseFeatures = [
      `高品质${getCategoryName()}`,
      "精准四色印刷",
      "可定制内容和设计",
      `${t('products.stock')}: ${product.stock}`,
    ];
    return baseFeatures;
  };

  // 产品规格（实际项目中应在数据库中存储这些信息）
  const getProductSpecs = (product: Product) => {
    return {
      [t('product.type')]: getCategoryName(),
      [t('product.price')]: `$${product.price.toFixed(2)}`,
      [t('products.stock')]: product.stock.toString(),
      [t('product.createdAt')]: new Date(product.createdAt).toLocaleDateString(),
      [t('product.updatedAt')]: new Date(product.updatedAt).toLocaleDateString(),
    };
  };

  // 处理视频播放
  const handlePlayVideo = (videoUrl: string) => {
    console.log('点击播放视频:', videoUrl);
    setActiveVideoUrl(videoUrl);
    setShowVideo(true);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 px-4">
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">加载中...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto py-6 px-4">
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">
          <p>{error || '产品数据加载失败'}</p>
        </div>
        <Link href="/products" className="inline-flex items-center text-blue-600 hover:underline">
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          {t('product.back')}
        </Link>
      </div>
    );
  }

  const productImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : "https://via.placeholder.com/600x400?text=No+Image";
  
  const features = getProductFeatures(product);
  const specs = getProductSpecs(product);

  return (
    <div className="container mx-auto py-6 px-4">
      {/* 视频播放模态框 */}
      {showVideo && activeVideoUrl && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setShowVideo(false)}
        >
          <div 
            className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="aspect-video">
              <CustomVideoPlayer src={activeVideoUrl} className="w-full h-full" />
            </div>
          </div>
        </div>
      )}

      <Link href="/products" className="inline-flex items-center text-blue-600 hover:underline mb-6">
        <ArrowLeftIcon className="h-4 w-4 mr-1" />
        {t('product.back')}
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* 产品主图 */}
        <div className="md:flex-1 mb-8 md:mb-0">
          <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
            <ClientImage
              src={activeImage || product.images[0] || "/placeholder.jpg"}
              alt={product.name}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          
          {/* 产品缩略图 */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-5 gap-2 mt-4">
              {product.images.map((image, idx) => (
                <div 
                  key={idx}
                  className={`aspect-square relative rounded overflow-hidden cursor-pointer 
                    ${activeImage === image ? 'ring-2 ring-primary' : 'hover:opacity-75'}`}
                  onClick={() => setActiveImage(image)}
                >
                  <ClientImage
                    src={image}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* 产品信息 */}
        <div>
          <div className="mb-4">
            {category && (
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">
                {category.name}
              </span>
            )}
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <div className="text-2xl font-bold text-primary mb-4">
              ${formatCurrency(product.price)}
            </div>

            {/* 视频按钮 */}
            {product?.videos && product.videos.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">{t('product.videos')}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.videos.map((video, index) => {
                    console.log('渲染视频按钮:', video);
                    return (
                      <button
                        key={index}
                        onClick={() => handlePlayVideo(video)}
                        className="flex items-center justify-center p-4 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors"
                      >
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">Video {index + 1}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex items-center mb-4">
              <div>
                <span className="text-sm font-medium">{t('product.stock.status')}: </span>
                {product.stock > 0 ? (
                  <span className="text-green-600">{t('product.stock.available')}</span>
                ) : (
                  <span className="text-red-600">{t('product.stock.unavailable')}</span>
                )}
              </div>
            </div>
            <div 
              className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none mb-6 prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-a:text-blue-600 hover:prose-a:text-blue-500"
              dangerouslySetInnerHTML={{ 
                __html: DOMPurify.sanitize(product.description) 
              }}
            />
          </div>
          
          <div className="space-y-4">
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              {t('product.getQuote')}
            </button>
            <Link
              href="/contact"
              className="block text-center w-full border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 px-4 rounded"
            >
              {t('product.contact')}
            </Link>
          </div>
        </div>
      </div>
      
      {/* 产品详细内容 */}
      {product.content && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">{t('product.details')}</h3>
          <div 
            className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-a:text-blue-600 hover:prose-a:text-blue-500"
            dangerouslySetInnerHTML={{ 
              __html: DOMPurify.sanitize(product.content) 
            }}
          />
        </div>
      )}
      
      {/* 产品详情 */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">{t('product.specs')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border-b pb-2">
            <span className="font-medium">{t('product.type')}: </span>
            <span>{category?.name || t('product.uncategorized')}</span>
          </div>
          <div className="border-b pb-2">
            <span className="font-medium">{t('product.price')}: </span>
            <span className="text-primary">${formatCurrency(product.price)}</span>
          </div>
          <div className="border-b pb-2">
            <span className="font-medium">{t('product.createdAt')}: </span>
            <span>{new Date(product.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="border-b pb-2">
            <span className="font-medium">{t('product.updatedAt')}: </span>
            <span>{new Date(product.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      
      {/* 相关产品 */}
      {relatedProducts.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">{t('product.related')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedProducts.map((relatedProduct) => (
              <Link href={`/products/${relatedProduct._id || relatedProduct.id}`} key={relatedProduct._id || relatedProduct.id}>
                <div 
                  key={relatedProduct._id || relatedProduct.id}
                  className="group border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-square">
                    <ClientImage
                      src={relatedProduct.images[0] || "/placeholder.jpg"}
                      alt={relatedProduct.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{relatedProduct.name}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-lg font-medium text-primary">${formatCurrency(relatedProduct.price)}</span>
                      <span className="text-xs text-muted-foreground">{t('products.stock')}: {relatedProduct.stock}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 