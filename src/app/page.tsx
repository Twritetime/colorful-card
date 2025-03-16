'use client';

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  
  // 特性数据
  const features = [
    {
      title: "高品质材料",
      description: "我们只使用最优质的材料，确保每个产品都具有出色的品质和耐用性。",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "定制设计",
      description: "根据您的品牌标识和特定需求量身定制的专业设计服务。",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
        </svg>
      ),
    },
    {
      title: "全球配送",
      description: "无论您身在世界何处，我们都能确保及时可靠的产品交付。",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h2a2 2 0 002-2v-1a2 2 0 012-2h1.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "卓越服务",
      description: "专业的客户服务团队为您提供从设计到交付的全程支持。",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  // 产品类别数据
  const categories = [
    {
      title: "商务名片",
      description: "专业的企业名片，多种材质和工艺可选",
      image: "https://images.unsplash.com/photo-1572502007796-bf53841bc530?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVzaW5lc3MlMjBjYXJkfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      href: "/products?category=business",
    },
    {
      title: "精美贺卡",
      description: "各种场合的贺卡和节日卡片",
      image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdyZWV0aW5nJTIwY2FyZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      href: "/products?category=greeting",
    },
    {
      title: "会员卡",
      description: "耐用的会员卡和忠诚度计划卡",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVtYmVyc2hpcCUyMGNhcmR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      href: "/products?category=gift",
    },
  ];
  
  // 客户评价数据
  const testimonials = [
    {
      name: "张明",
      company: "创新科技有限公司",
      content: "彩卡的商务名片质量超出了我们的预期。印刷精美，材质优良，受到了我们客户的一致好评。",
    },
    {
      name: "李佳",
      company: "环球礼品公司",
      content: "我们与彩卡合作多年，他们的产品质量和服务一直保持在最高水平。强烈推荐！",
    },
    {
      name: "王强",
      company: "星光酒店集团",
      content: "彩卡为我们设计的会员卡既美观又耐用，帮助我们提升了品牌形象和客户忠诚度。",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                {t('home.hero.title')}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                {t('home.hero.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-primary rounded-lg hover:bg-primary/90 focus:outline-none"
                >
                  {t('home.hero.browse')}
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-primary transition duration-200 bg-transparent border border-primary rounded-lg hover:bg-primary/5 focus:outline-none"
                >
                  {t('home.hero.contact')}
                </Link>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <div className="aspect-[16/9]">
                <Image
                  src="https://gcore.jsdelivr.net/gh/Twritetime/Images-0@main/blog-writetime/20250308220406915.png"
                  alt="彩卡产品展示"
                  fill
                  className="object-cover"
                  priority
                  unoptimized={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">为什么选择我们</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              凭借十多年的经验，我们为全球客户提供卓越品质、具有竞争力的价格和可靠的服务。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-card rounded-lg p-6 shadow-md transition-all hover:shadow-lg border"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">我们的产品类别</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              探索我们广泛的高品质产品系列，专为满足您的特定需求而设计。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                href={category.href}
                key={category.title}
                className="group relative overflow-hidden rounded-lg shadow-md"
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl text-white font-bold mb-1">{category.title}</h3>
                    <p className="text-gray-200 text-sm">{category.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-primary rounded-lg hover:bg-primary/90 focus:outline-none"
            >
              查看所有产品
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">客户评价</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              听听来自全球信任我们产品和服务的企业客户的声音。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-card rounded-lg p-6 shadow-md border"
              >
                <div className="flex items-center mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-500 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">&quot;{testimonial.content}&quot;</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              准备升级您的企业物料？
            </h2>
            <p className="text-lg text-white/80 mb-8">
              立即联系我们，讨论您的项目需求并获取定制报价。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-primary transition duration-200 bg-white rounded-lg hover:bg-gray-100 focus:outline-none"
              >
                获取报价
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-transparent border border-white rounded-lg hover:bg-white/10 focus:outline-none"
              >
                浏览产品
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
