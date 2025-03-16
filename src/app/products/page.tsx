"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

// 模拟产品数据
const products = [
  {
    id: 1,
    name: "高级商务名片",
    category: "商务名片",
    price: "¥49.99/100张起",
    description: "采用350克进口铜版纸，表面覆哑光膜，精致工艺，适合商务人士展示专业形象",
    image: "https://images.unsplash.com/photo-1572502007796-bf53841bc530",
  },
  {
    id: 2,
    name: "定制贺卡",
    category: "贺卡",
    price: "¥29.99/50张起",
    description: "全彩印刷，多种纸张可选，可定制个性化内容和设计，适合节日和特殊场合",
    image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0",
  },
  {
    id: 3,
    name: "企业礼品卡",
    category: "礼品卡",
    price: "¥39.99/20张起",
    description: "豪华质感设计，烫金工艺，专为企业客户定制，展示品牌价值",
    image: "https://images.unsplash.com/photo-1512909006721-3d6018887383",
  },
  {
    id: 4,
    name: "高端包装盒",
    category: "包装",
    price: "¥99.99/10个起",
    description: "精致礼品包装盒，多种尺寸和样式，可定制LOGO和图案，适合产品和礼品包装",
    image: "https://images.unsplash.com/photo-1607166452427-5ca322cfb650",
  },
  {
    id: 5,
    name: "环保纸袋",
    category: "包装",
    price: "¥15.99/50个起",
    description: "采用可回收牛皮纸，印刷精美，承重能力强，适合礼品、服装等商品包装",
    image: "https://images.unsplash.com/photo-1605600659873-d808a13e4d2a",
  },
  {
    id: 6,
    name: "会员卡",
    category: "会员卡",
    price: "¥25.99/100张起",
    description: "PVC材质，可印刷二维码或磁条，适合俱乐部、健身房、商店等会员管理",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
  },
  {
    id: 7,
    name: "定制便签本",
    category: "文具",
    price: "¥19.99/10本起",
    description: "多种尺寸可选，可定制封面和内页，适合企业宣传和办公使用",
    image: "https://images.unsplash.com/photo-1572520810093-370ac5690b3d",
  },
  {
    id: 8,
    name: "豪华请柬",
    category: "请柬",
    price: "¥59.99/30张起",
    description: "高档纸质，烫金工艺，内附回执卡，适合婚礼、庆典等重要场合",
    image: "https://images.unsplash.com/photo-1607450852568-b2e1e6fa0ece",
  },
];

// 产品类别
const categories = [
  { name: "全部", value: "all" },
  { name: "商务名片", value: "商务名片" },
  { name: "贺卡", value: "贺卡" },
  { name: "礼品卡", value: "礼品卡" },
  { name: "包装", value: "包装" },
  { name: "会员卡", value: "会员卡" },
  { name: "文具", value: "文具" },
  { name: "请柬", value: "请柬" },
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // 过滤产品
  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "all" || product.category === selectedCategory) &&
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">我们的产品</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          深圳彩卡公司提供高品质的卡片和包装解决方案，从商务名片到豪华礼品包装，满足您的所有需求。
        </p>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="搜索产品..."
            className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 py-2 rounded-md whitespace-nowrap text-sm font-medium ${
                selectedCategory === category.value
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <div className="group rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="rounded-t-lg object-cover w-full h-48"
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
                  {product.description}
                </p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="font-medium text-primary">{product.price}</span>
                  <span className="text-xs text-muted-foreground">最小起订量适用</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">
            没有找到匹配的产品。请尝试其他搜索条件。
          </p>
        </div>
      )}

      {/* 询价区域 */}
      <div className="mt-16 bg-muted rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">寻找定制解决方案？</h2>
        <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
          我们提供完全定制的设计和生产服务，满足您的独特需求。联系我们获取免费报价。
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-primary rounded-lg hover:bg-primary/90 focus:outline-none"
        >
          获取免费报价
        </Link>
      </div>
    </div>
  );
} 