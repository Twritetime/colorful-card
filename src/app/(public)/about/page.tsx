import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "关于我们 - Colorful Card",
  description: "深圳市彩卡科技有限公司是一家专业的智能卡、RFID标签和PVC卡片制造商",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 页面标题 */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold">关于我们</h1>
          <div className="flex items-center mt-4 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">
              首页
            </Link>
            <span className="mx-2">/</span>
            <span>关于我们</span>
          </div>
        </div>
      </section>

      {/* 公司简介 */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">公司简介</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  深圳市彩卡科技有限公司成立于2010年，是一家专业从事智能卡、RFID标签和PVC卡片研发、生产和销售的高新技术企业。
                </p>
                <p>
                  公司拥有先进的生产设备和专业的技术团队，可以为客户提供从设计、生产到售后的一站式服务。我们致力于为客户提供高质量、高性价比的产品和解决方案。
                </p>
                <p>
                  经过多年的发展，公司已经形成了完善的质量管理体系和生产流程，获得了ISO9001质量管理体系认证和ISO14001环境管理体系认证。
                </p>
                <p>
                  公司产品广泛应用于门禁、考勤、交通、零售、物流等多个领域，远销欧美、东南亚等国家和地区，赢得了客户的广泛认可和好评。
                </p>
              </div>
            </div>
            <div className="bg-muted aspect-square rounded-lg"></div>
          </div>
        </div>
      </section>

      {/* 我们的使命和愿景 */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-background p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4">我们的使命</h3>
              <p className="text-muted-foreground">
                为客户提供高质量、高性价比的智能卡和RFID解决方案，帮助客户实现业务数字化转型，提升管理效率和用户体验。
              </p>
            </div>
            <div className="bg-background p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4">我们的愿景</h3>
              <p className="text-muted-foreground">
                成为全球领先的智能卡和RFID解决方案提供商，引领行业技术创新，为构建智能互联的世界贡献力量。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 我们的优势 */}
      <section className="py-12 md:py-16">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">我们的优势</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border rounded-lg p-6">
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
              <h3 className="text-lg font-semibold mb-2">先进设备</h3>
              <p className="text-muted-foreground">
                拥有先进的生产设备和检测仪器，确保产品质量。我们的生产线采用自动化设备，提高生产效率的同时保证产品一致性。
              </p>
            </div>
            <div className="border rounded-lg p-6">
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
              <h3 className="text-lg font-semibold mb-2">专业团队</h3>
              <p className="text-muted-foreground">
                拥有经验丰富的研发和生产团队，提供专业解决方案。我们的团队成员平均拥有10年以上的行业经验，能够应对各种复杂需求。
              </p>
            </div>
            <div className="border rounded-lg p-6">
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
              <h3 className="text-lg font-semibold mb-2">优质服务</h3>
              <p className="text-muted-foreground">
                提供从设计、生产到售后的一站式服务，响应迅速。我们承诺24小时内响应客户需求，为客户提供及时、专业的技术支持。
              </p>
            </div>
            <div className="border rounded-lg p-6">
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
              <h3 className="text-lg font-semibold mb-2">定制化生产</h3>
              <p className="text-muted-foreground">
                根据客户需求提供定制化产品和解决方案。我们可以根据客户的特定需求，定制卡片的材质、尺寸、印刷和芯片类型等。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 联系我们 */}
      <section className="py-12 md:py-16 bg-primary/5">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">联系我们</h2>
          <p className="text-muted-foreground max-w-[600px] mx-auto mb-8">
            如果您对我们的产品和服务感兴趣，或者有任何问题需要咨询，欢迎随时联系我们。
          </p>
          <Link href="/contact">
            <Button size="lg">立即咨询</Button>
          </Link>
        </div>
      </section>
    </div>
  );
} 