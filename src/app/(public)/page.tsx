import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 英雄区域 */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-primary/10 to-background">
        <div className="container flex flex-col items-center text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            专业的智能卡与RFID解决方案
          </h1>
          <p className="text-xl text-muted-foreground max-w-[700px]">
            深圳市彩卡科技有限公司是一家专业的智能卡、RFID标签和PVC卡片制造商，提供高质量的产品和定制解决方案。
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/products">
              <Button size="lg">浏览产品</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                联系我们
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 产品分类 */}
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">我们的产品</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden rounded-lg border bg-background">
              <div className="aspect-square overflow-hidden">
                <div className="h-full w-full bg-muted" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">RFID卡</h3>
                <p className="mt-2 text-muted-foreground">
                  高频和低频RFID卡，适用于门禁、考勤、支付等多种应用场景。
                </p>
                <Link
                  href="/products/rfid-cards"
                  className="mt-4 inline-block text-primary hover:underline"
                >
                  了解更多
                </Link>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-lg border bg-background">
              <div className="aspect-square overflow-hidden">
                <div className="h-full w-full bg-muted" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">PVC卡</h3>
                <p className="mt-2 text-muted-foreground">
                  高质量的PVC卡片，可定制印刷，适用于会员卡、ID卡等多种用途。
                </p>
                <Link
                  href="/products/pvc-cards"
                  className="mt-4 inline-block text-primary hover:underline"
                >
                  了解更多
                </Link>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-lg border bg-background">
              <div className="aspect-square overflow-hidden">
                <div className="h-full w-full bg-muted" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">NFC标签</h3>
                <p className="mt-2 text-muted-foreground">
                  多种形状和尺寸的NFC标签，适用于智能海报、产品防伪等应用。
                </p>
                <Link
                  href="/products/nfc-tags"
                  className="mt-4 inline-block text-primary hover:underline"
                >
                  了解更多
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 关于我们 */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">关于彩卡科技</h2>
              <p className="text-muted-foreground mb-4">
                深圳市彩卡科技有限公司成立于2010年，是一家专业从事智能卡、RFID标签和PVC卡片研发、生产和销售的高新技术企业。
              </p>
              <p className="text-muted-foreground mb-4">
                我们拥有先进的生产设备和专业的技术团队，可以为客户提供从设计、生产到售后的一站式服务。
              </p>
              <p className="text-muted-foreground mb-6">
                公司产品广泛应用于门禁、考勤、交通、零售、物流等多个领域，远销欧美、东南亚等国家和地区。
              </p>
              <Link href="/about">
                <Button variant="outline">了解更多</Button>
              </Link>
            </div>
            <div className="bg-muted aspect-video rounded-lg"></div>
          </div>
        </div>
      </section>

      {/* 优势 */}
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">我们的优势</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M12 2v4" />
                  <path d="M12 18v4" />
                  <path d="m4.93 4.93 2.83 2.83" />
                  <path d="m16.24 16.24 2.83 2.83" />
                  <path d="M2 12h4" />
                  <path d="M18 12h4" />
                  <path d="m4.93 19.07 2.83-2.83" />
                  <path d="m16.24 7.76 2.83-2.83" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">先进设备</h3>
              <p className="text-muted-foreground">
                拥有先进的生产设备和检测仪器，确保产品质量。
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">专业团队</h3>
              <p className="text-muted-foreground">
                拥有经验丰富的研发和生产团队，提供专业解决方案。
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                  <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">优质服务</h3>
              <p className="text-muted-foreground">
                提供从设计、生产到售后的一站式服务，响应迅速。
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">定制化生产</h3>
              <p className="text-muted-foreground">
                根据客户需求提供定制化产品和解决方案。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 联系我们 */}
      <section className="py-16 bg-primary/5">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">联系我们</h2>
          <p className="text-muted-foreground max-w-[600px] mx-auto mb-8">
            无论您有任何问题或需求，我们的团队随时准备为您提供帮助和支持。
          </p>
          <Link href="/contact">
            <Button size="lg">立即咨询</Button>
          </Link>
        </div>
      </section>
    </div>
  );
} 