"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import { 
  ChevronLeftIcon, 
  CheckIcon
} from "@heroicons/react/24/outline";
import { Product, getProduct, getAllProducts } from "@/lib/productService";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 获取产品数据
  useEffect(() => {
    const fetchProduct = () => {
      try {
        setIsLoading(true);
        const productData = getProduct(id);
        
        if (!productData) {
          // 如果产品不存在，重定向到产品列表页
          alert('产品不存在');
          router.push('/products');
          return;
        }
        
        setProduct(productData);
        
        // 获取相关产品（同一类别的其他产品）
        const allProducts = getAllProducts()
          .filter(p => p.published && p.id !== id && p.category === productData.category)
          .slice(0, 3); // 限制最多显示3个相关产品
        
        setRelatedProducts(allProducts);
      } catch (error) {
        console.error('获取产品失败:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id, router]);

  // 将分类英文名转换为中文显示
  const getCategoryName = (category: string) => {
    switch (category) {
      case 'business': return '名片';
      case 'greeting': return '贺卡';
      case 'gift': return '礼品卡';
      case 'invitation': return '邀请卡';
      default: return category;
    }
  };

  // 自定义产品特点（实际项目中应在数据库中存储这些信息）
  const getProductFeatures = (product: Product) => {
    const baseFeatures = [
      `高品质${getCategoryName(product.category)}`,
      "精准四色印刷",
      "可定制内容和设计",
      `库存数量: ${product.stock}`,
    ];
    return baseFeatures;
  };

  // 产品规格（实际项目中应在数据库中存储这些信息）
  const getProductSpecs = (product: Product) => {
    return {
      "产品类型": getCategoryName(product.category),
      "价格": `¥${product.price.toFixed(2)}`,
      "库存": product.stock.toString(),
      "创建时间": new Date(product.createdAt).toLocaleDateString("zh-CN"),
      "更新时间": new Date(product.updatedAt).toLocaleDateString("zh-CN"),
    };
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <p>加载中...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>产品不存在</p>
        <Link href="/products" className="text-primary hover:underline mt-4 inline-block">
          返回产品列表
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
    <div className="container mx-auto px-4 py-8 md:py-16">
      {/* 返回链接 */}
      <div className="mb-8">
        <Link 
          href="/products" 
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
        >
          <ChevronLeftIcon className="w-4 h-4 mr-1" />
          返回产品列表
        </Link>
      </div>
      
      {/* 产品详情 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* 产品图片 */}
        <div>
          <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden border border-border mb-4">
            <Image
              src={productImage}
              alt={product.name}
              width={600}
              height={400}
              className="rounded-lg object-cover w-full h-full"
              unoptimized={true}
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className="relative h-20 w-20 rounded-md overflow-hidden border-2 border-border"
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover w-full h-full"
                    unoptimized={true}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* 产品信息 */}
        <div>
          <div className="bg-primary/10 px-4 py-2 rounded-md text-primary text-sm font-medium inline-block mb-4">
            {getCategoryName(product.category)}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
          <div className="flex items-baseline mb-6">
            <span className="text-2xl font-bold text-primary">
              ¥{product.price.toFixed(2)}
            </span>
            <span className="text-sm text-muted-foreground ml-2">
              /单价
            </span>
          </div>
          
          <p className="text-muted-foreground mb-6">
            {product.description}
          </p>
          
          {/* 特点列表 */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">产品特点</h3>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* 订购 */}
          <div className="bg-card rounded-lg border border-border p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">定制您的订单</h3>
            <div className="flex items-center mb-6">
              <span className="text-sm font-medium mr-4">库存状态:</span>
              <span className={`px-4 py-2 rounded-md ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {product.stock > 0 ? '有货' : '缺货'}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/contact" 
                className="flex-1 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 text-center"
              >
                获取报价
              </Link>
              <Link 
                href="/contact" 
                className="flex-1 border border-primary text-primary py-2 px-4 rounded-md hover:bg-primary/5 text-center"
              >
                联系我们
              </Link>
            </div>
          </div>
          
          {/* 规格 */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">产品规格</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(specs).map(([key, value]) => (
                <div key={key} className="flex flex-col">
                  <span className="text-sm text-muted-foreground">{key}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* 相关产品 */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">相关产品</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link href={`/products/${relatedProduct.id}`} key={relatedProduct.id}>
                <div className="group rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-64 overflow-hidden">
                    {relatedProduct.images && relatedProduct.images.length > 0 ? (
                      <Image
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                        width={400}
                        height={300}
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized={true}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-muted-foreground">
                        无图片
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{relatedProduct.name}</h3>
                      <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                        {getCategoryName(relatedProduct.category)}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                      {relatedProduct.description}
                    </p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="font-medium text-primary">¥{relatedProduct.price.toFixed(2)}</span>
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