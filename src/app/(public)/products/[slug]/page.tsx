import Link from "next/link";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

// 模拟产品数据
const products = [
  {
    id: "1",
    name: "RFID智能卡",
    slug: "rfid-smart-card",
    description:
      "高频13.56MHz RFID智能卡，适用于门禁、考勤、支付等多种应用场景。采用优质PVC材质，耐用防水，支持定制印刷。",
    category: "RFID卡",
    features: [
      "频率: 13.56MHz",
      "芯片类型: MIFARE Classic 1K/4K, MIFARE DESFire, MIFARE Ultralight",
      "材质: PVC, PET, ABS",
      "尺寸: 85.5mm × 54mm × 0.84mm (标准CR80)",
      "读取距离: 3-10cm (取决于读卡器)",
      "支持定制印刷: CMYK全彩印刷, 丝网印刷, 烫金/烫银",
    ],
    applications: [
      "门禁系统",
      "考勤管理",
      "会员管理",
      "公交卡",
      "校园一卡通",
      "电子钱包",
    ],
    specifications: [
      { name: "频率", value: "13.56MHz" },
      { name: "芯片类型", value: "MIFARE Classic 1K/4K, MIFARE DESFire, MIFARE Ultralight" },
      { name: "材质", value: "PVC, PET, ABS" },
      { name: "尺寸", value: "85.5mm × 54mm × 0.84mm (标准CR80)" },
      { name: "读取距离", value: "3-10cm (取决于读卡器)" },
      { name: "工作温度", value: "-20°C 至 50°C" },
      { name: "数据保存时间", value: "10年以上" },
      { name: "防水等级", value: "IP67" },
      { name: "最小订购量", value: "500张" },
      { name: "生产周期", value: "7-15个工作日" },
    ],
    relatedProducts: ["5", "6", "7"],
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
];

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    return {
      title: "产品未找到",
    };
  }

  return {
    title: `${product.name} - Colorful Card`,
    description: product.description,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  // 获取相关产品
  const relatedProducts = product.relatedProducts
    ? products.filter((p) => product.relatedProducts?.includes(p.id))
    : [];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 页面标题 */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container">
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-primary">
              首页
            </Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-primary">
              产品中心
            </Link>
            <span className="mx-2">/</span>
            <span>{product.name}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
          <div className="mt-2">
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
              {product.category}
            </span>
          </div>
        </div>
      </section>

      {/* 产品详情 */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 产品图片 */}
            <div className="bg-muted aspect-square rounded-lg"></div>

            {/* 产品信息 */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">产品描述</h2>
                <p className="text-muted-foreground">{product.description}</p>
              </div>

              {product.features && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">产品特点</h2>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {product.applications && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">应用场景</h2>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    {product.applications.map((application, index) => (
                      <li key={index}>{application}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-4">
                <Link href="/contact">
                  <Button size="lg">立即询盘</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 产品规格 */}
      {product.specifications && (
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <h2 className="text-2xl font-bold mb-8">产品规格</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.specifications.map((spec, index) => (
                <div
                  key={index}
                  className="flex justify-between p-4 bg-background rounded-lg"
                >
                  <span className="font-medium">{spec.name}</span>
                  <span className="text-muted-foreground">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 相关产品 */}
      {relatedProducts.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container">
            <h2 className="text-2xl font-bold mb-8">相关产品</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((product) => (
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
        </section>
      )}

      {/* 询盘CTA */}
      <section className="py-12 md:py-16 bg-primary/5">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">需要更多信息？</h2>
          <p className="text-muted-foreground max-w-[600px] mx-auto mb-8">
            如果您对该产品有任何疑问，或需要定制解决方案，请随时联系我们。我们的团队将竭诚为您服务。
          </p>
          <Link href="/contact">
            <Button size="lg">立即咨询</Button>
          </Link>
        </div>
      </section>
    </div>
  );
} 