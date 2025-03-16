import Link from "next/link";
import Image from "next/image";
import { 
  ChevronLeftIcon, 
  CheckIcon
} from "@heroicons/react/24/outline";

// 模拟产品数据
const productData = [
  {
    id: "1",
    name: "高级商务名片",
    category: "商务名片",
    price: 49.99,
    description: "采用350克进口铜版纸，表面覆哑光膜，精致工艺，适合商务人士展示专业形象。我们的高级商务名片采用国际标准尺寸，提供多种表面处理选项，包括哑光、亮光、局部UV等。每张名片都通过严格的质量控制，确保色彩准确、切边整齐。",
    features: [
      "350克进口铜版纸",
      "哑光表面处理",
      "精准四色印刷",
      "可选择烫金/烫银工艺",
      "标准尺寸: 90x54mm"
    ],
    minOrder: 100,
    specs: {
      材质: "350克铜版纸",
      尺寸: "90 x 54 mm",
      印刷: "四色印刷",
      表面处理: "哑光膜",
      背面: "可印刷",
      形状: "矩形（可选圆角）",
      生产周期: "5-7个工作日"
    },
    images: [
      "https://images.unsplash.com/photo-1572502007796-bf53841bc530",
      "https://images.unsplash.com/photo-1616628188717-6e7db5ae8424",
      "https://images.unsplash.com/photo-1603201667141-5a2d4c673378"
    ],
    relatedProducts: [2]
  },
  {
    id: "2",
    name: "定制贺卡",
    category: "贺卡",
    price: 29.99,
    description: "全彩印刷，多种纸张可选，可定制个性化内容和设计，适合节日和特殊场合。我们的贺卡采用250克优质艺术纸，提供折叠和平板两种款式，可以根据您的需求定制内容和设计。每张贺卡都配有精美的信封，让您的祝福更加完整。",
    features: [
      "250克艺术纸",
      "折叠或平板设计",
      "全彩印刷",
      "可定制内容",
      "含配套信封"
    ],
    minOrder: 50,
    specs: {
      材质: "250克艺术纸",
      尺寸: "A5折叠后为A6",
      印刷: "四色印刷",
      表面处理: "可选烫金",
      信封: "包含",
      形状: "矩形（可选特殊形状）",
      生产周期: "7-10个工作日"
    },
    images: [
      "https://images.unsplash.com/photo-1607344645866-009c320b63e0",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
      "https://images.unsplash.com/photo-1608155686393-8fdd966d784d"
    ],
    relatedProducts: [1]
  },
];

export function generateStaticParams() {
  return productData.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  // 确保params.id是字符串
  const productId = String(params.id);
  
  // 在实际应用中，应该从数据库获取产品数据
  const product = productData.find(p => p.id === productId) || productData[0];
  
  // 获取相关产品
  const relatedProducts = product.relatedProducts 
    ? productData.filter(p => product.relatedProducts.includes(Number(p.id)))
    : [];

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
              src={product.images[0]}
              alt={product.name}
              width={600}
              height={400}
              className="rounded-lg object-cover w-full h-full"
              unoptimized={true}
            />
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className="relative h-20 w-20 rounded-md overflow-hidden border-2 border-border"
              >
                <Image
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  width={600}
                  height={400}
                  className="rounded-lg object-cover w-full h-full"
                  unoptimized={true}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* 产品信息 */}
        <div>
          <div className="bg-primary/10 px-4 py-2 rounded-md text-primary text-sm font-medium inline-block mb-4">
            {product.category}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
          <div className="flex items-baseline mb-6">
            <span className="text-2xl font-bold text-primary">
              ¥{product.price.toFixed(2)}
            </span>
            <span className="text-sm text-muted-foreground ml-2">
              /{product.minOrder}张起订
            </span>
          </div>
          
          <p className="text-muted-foreground mb-6">
            {product.description}
          </p>
          
          {/* 特点列表 */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">产品特点</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
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
              <span className="text-sm font-medium mr-4">最小订单量:</span>
              <span className="px-4 py-2 border border-input rounded-md">{product.minOrder}</span>
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
              {Object.entries(product.specs).map(([key, value]) => (
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
            {relatedProducts.map((product) => (
              <Link href={`/products/${product.id}`} key={product.id}>
                <div className="group rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={600}
                      height={400}
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized={true}
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                        {product.category}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                      {product.description.substring(0, 80)}...
                    </p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="font-medium text-primary">¥{product.price.toFixed(2)}/{product.minOrder}张起</span>
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