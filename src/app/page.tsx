import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                高品质卡片与礼品<span className="text-primary">解决方案</span>，服务全球商务
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                彩卡有限公司为全球企业提供高质量定制卡片、包装和礼品解决方案。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/products" 
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-primary rounded-lg hover:bg-primary/90 focus:outline-none"
                >
                  浏览产品
                </Link>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-primary transition duration-200 bg-transparent border border-primary rounded-lg hover:bg-primary/5 focus:outline-none"
                >
                  联系我们
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

// Sample data
const features = [
  {
    title: "定制设计",
    description: "根据您的品牌标识和特定需求量身定制的专业设计服务。",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    title: "优质材料",
    description: "高品质材料确保耐用性、美观性，并提供环保选项。",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "全球配送",
    description: "可靠的全球配送服务，提供追踪功能和加急选项。",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "质量保证",
    description: "严格的质量控制，确保每件产品都符合我们的高标准。",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const categories = [
  {
    title: "名片",
    description: "多种工艺和材质的高级名片",
    image: "https://images.unsplash.com/photo-1572502007796-bf53841bc530?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    href: "/products",
  },
  {
    title: "礼品卡",
    description: "为零售和特殊场合定制的精美礼品卡",
    image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    href: "/products",
  },
  {
    title: "Greeting Cards",
    description: "Professional greeting cards for corporate communications",
    image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    href: "/products",
  },
  {
    title: "Packaging Solutions",
    description: "Custom packaging for products and promotional materials",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    href: "/products",
  },
  {
    title: "Membership Cards",
    description: "Durable cards for loyalty programs and memberships",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    href: "/products",
  },
  {
    title: "Custom Printing",
    description: "Specialized printing services for unique requirements",
    image: "https://images.unsplash.com/photo-1611327709756-029307e85e34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    href: "/products",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    company: "Global Retail Solutions",
    content: "The quality of business cards we received from Colorful Card exceeded our expectations. Their attention to detail and customer service are outstanding.",
  },
  {
    name: "Michael Chen",
    company: "Innovation Tech",
    content: "We've been ordering our corporate gift cards from Colorful Card for three years. Their consistent quality and reliable delivery keep us coming back.",
  },
  {
    name: "Emma Rodriguez",
    company: "Premier Boutiques",
    content: "The packaging solutions provided by Colorful Card helped elevate our brand image significantly. Our customers love the premium feel of our products now.",
  },
];
