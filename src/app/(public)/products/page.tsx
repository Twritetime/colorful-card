import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "产品中心 - Colorful Card",
  description: "浏览深圳市彩卡科技有限公司的智能卡、RFID标签和PVC卡片产品",
};

export default function ProductsPage() {
  // 模拟产品数据
  const products = [
    {
      id: "1",
      name: "RFID智能卡",
      slug: "rfid-smart-card",
      description: "高频13.56MHz RFID智能卡，适用于门禁、考勤、支付等多种应用场景。",
      category: "RFID卡",
    },
    {
      id: "2",
      name: "PVC会员卡",
      slug: "pvc-membership-card",
      description: "高质量PVC材质会员卡，可定制印刷，适用于商场、健身房等会员管理。",
      category: "PVC卡",
    },
    {
      id: "3",
      name: "NFC标签",
      slug: "nfc-tag",
      description: "多种形状和尺寸的NFC标签，适用于智能海报、产品防伪等应用。",
      category: "NFC标签",
    },
    {
      id: "4",
      name: "ID工作证",
      slug: "id-work-card",
      description: "企业员工ID卡，可定制印刷，支持照片、条码、二维码等多种信息。",
      category: "PVC卡",
    },
    {
      id: "5",
      name: "低频RFID卡",
      slug: "low-frequency-rfid-card",
      description: "125KHz低频RFID卡，适用于门禁、考勤等应用场景。",
      category: "RFID卡",
    },
    {
      id: "6",
      name: "双界面CPU卡",
      slug: "dual-interface-cpu-card",
      description: "支持接触式和非接触式读取的CPU卡，适用于金融支付、公交卡等应用。",
      category: "RFID卡",
    },
    {
      id: "7",
      name: "RFID腕带",
      slug: "rfid-wristband",
      description: "防水RFID腕带，适用于游泳池、水上乐园、医院等场所。",
      category: "RFID标签",
    },
    {
      id: "8",
      name: "RFID标签",
      slug: "rfid-label",
      description: "各种尺寸的RFID标签，适用于物流、仓储、零售等领域的资产管理。",
      category: "RFID标签",
    },
  ];

  // 获取所有分类
  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 页面标题 */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold">产品中心</h1>
          <div className="flex items-center mt-4 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">
              首页
            </Link>
            <span className="mx-2">/</span>
            <span>产品中心</span>
          </div>
        </div>
      </section>

      {/* 产品列表 */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* 侧边栏 */}
            <div className="space-y-8">
              {/* 分类 */}
              <div>
                <h2 className="text-xl font-semibold mb-4">产品分类</h2>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/products"
                      className="text-primary font-medium hover:underline"
                    >
                      全部产品
                    </Link>
                  </li>
                  {categories.map((category) => (
                    <li key={category}>
                      <Link
                        href={`/products?category=${encodeURIComponent(category)}`}
                        className="text-muted-foreground hover:text-primary"
                      >
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 联系我们 */}
              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">需要帮助？</h3>
                <p className="text-muted-foreground mb-4">
                  如果您对我们的产品有任何疑问，或需要定制解决方案，请随时联系我们。
                </p>
                <Link href="/contact">
                  <Button variant="default" className="w-full">
                    联系我们
                  </Button>
                </Link>
              </div>
            </div>

            {/* 产品网格 */}
            <div className="md:col-span-3">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-semibold">全部产品</h2>
                <div className="text-sm text-muted-foreground">
                  显示 {products.length} 个产品
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="group relative overflow-hidden rounded-lg border bg-background"
                  >
                    <div className="aspect-square overflow-hidden">
                      <div className="h-full w-full bg-muted" />
                    </div>
                    <div className="p-6">
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {product.description}
                      </p>
                      <Link
                        href={`/products/${product.slug}`}
                        className="mt-4 inline-block text-primary hover:underline"
                      >
                        查看详情
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 询盘CTA */}
      <section className="py-12 md:py-16 bg-primary/5">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">寻找定制解决方案？</h2>
          <p className="text-muted-foreground max-w-[600px] mx-auto mb-8">
            我们可以根据您的需求提供定制化的智能卡和RFID解决方案，满足您的特定应用场景。
          </p>
          <Link href="/contact">
            <Button size="lg">立即咨询</Button>
          </Link>
        </div>
      </section>
    </div>
  );
} 