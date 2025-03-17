import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  // 公司历史里程碑
  const timeline = [
    { year: "2010", title: "成立", description: "深圳彩卡公司在中国深圳成立，专注于商务印刷领域" },
    { year: "2012", title: "扩展产品线", description: "扩大生产线，增加贺卡、礼品卡和包装产品" },
    { year: "2015", title: "技术升级", description: "引进先进印刷设备，提高生产效率和产品质量" },
    { year: "2018", title: "国际化", description: "开始拓展海外市场，提供全球销售和服务" },
    { year: "2021", title: "数字化转型", description: "推出在线定制平台，简化客户下单流程" },
    { year: "2023", title: "可持续发展", description: "引入环保材料和生产工艺，减少环境影响" },
  ];
  
  // 团队成员
  const team = [
    {
      name: "张伟",
      position: "创始人兼CEO",
      description: "拥有20年印刷行业经验，负责公司战略规划和业务拓展",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    },
    {
      name: "李娜",
      position: "设计总监",
      description: "知名设计学院毕业，曾服务多家国际品牌，负责产品设计和创意方向",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    },
    {
      name: "王强",
      position: "生产经理",
      description: "印刷工程专业背景，精通各类印刷工艺和质量控制流程",
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    },
    {
      name: "赵芳",
      position: "国际销售总监",
      description: "精通三国语言，负责海外市场开发和客户关系管理",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    },
  ];
  
  // 荣誉和认证
  const certifications = [
    { name: "ISO 9001:2015", description: "质量管理体系认证" },
    { name: "ISO 14001:2015", description: "环境管理体系认证" },
    { name: "FSC认证", description: "森林管理委员会认证，确保使用可持续采购的纸张" },
    { name: "深圳市优秀企业", description: "连续三年获得深圳市优秀企业称号" },
    { name: "高新技术企业", description: "获得国家高新技术企业认定" },
    { name: "印刷行业协会成员", description: "中国印刷技术协会理事单位" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      {/* 公司简介 */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">关于我们</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          深圳彩卡公司成立于2010年，是一家专业提供高品质卡片和包装解决方案的制造商。我们致力于为全球客户提供创新、优质的产品和服务。
        </p>
      </div>
      
      {/* 公司使命和愿景 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div className="relative h-80 md:h-full rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1577401239170-897942555fb3"
            alt="彩卡公司工厂"
            fill
            className="object-cover"
            unoptimized={true}
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6">我们的使命与愿景</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">使命</h3>
              <p className="text-muted-foreground">
                通过优质的卡片和包装产品，帮助企业展示品牌价值，增强与客户的情感联系。
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">愿景</h3>
              <p className="text-muted-foreground">
                成为全球领先的卡片和包装解决方案提供商，以创新设计和卓越品质赢得客户信赖。
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">核心价值观</h3>
              <p className="text-muted-foreground">
                质量至上、客户为先、创新驱动、环保责任、团队协作。
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* 公司历史 */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">我们的历史</h2>
        <div className="relative">
          {/* 时间线 */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-border"></div>
          
          <div className="space-y-16">
            {timeline.map((item, index) => (
              <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className={`absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-primary border-4 border-background z-10`}></div>
                
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-10' : 'text-left pl-10'}`}>
                  <div className="bg-card rounded-lg border border-border p-6 hover:shadow-md transition-shadow">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-md mb-2">
                      {item.year}
                    </span>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* 生产能力 */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">生产能力</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card rounded-lg border border-border p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">先进设备</h3>
            <p className="text-muted-foreground mb-4">
              配备德国海德堡印刷机、日本理光数码印刷系统和瑞士全自动后道工序设备。
            </p>
            <ul className="text-sm text-muted-foreground text-left">
              <li className="mb-1">• 6色胶印机，日产能10万张</li>
              <li className="mb-1">• 高精度数码印刷，适合小批量定制</li>
              <li className="mb-1">• 自动模切、压纹、烫金设备</li>
              <li>• 智能质检系统，确保产品品质</li>
            </ul>
          </div>
          
          <div className="bg-card rounded-lg border border-border p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">质量控制</h3>
            <p className="text-muted-foreground mb-4">
              采用ISO 9001质量管理体系，从原材料采购到成品出厂实施全流程控制。
            </p>
            <ul className="text-sm text-muted-foreground text-left">
              <li className="mb-1">• 原材料检测，确保环保安全</li>
              <li className="mb-1">• 印前校对系统，减少印刷错误</li>
              <li className="mb-1">• 印刷过程监控，保证色彩准确</li>
              <li>• 成品随机抽检，确保客户满意</li>
            </ul>
          </div>
          
          <div className="bg-card rounded-lg border border-border p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">全球物流</h3>
            <p className="text-muted-foreground mb-4">
              拥有完善的国内外物流网络，确保产品准时送达客户手中。
            </p>
            <ul className="text-sm text-muted-foreground text-left">
              <li className="mb-1">• 与多家国际物流公司合作</li>
              <li className="mb-1">• 提供空运、海运等多种运输方式</li>
              <li className="mb-1">• 专业包装，确保运输安全</li>
              <li>• 全程跟踪，及时更新物流信息</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* 团队介绍 */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">核心团队</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-64">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="w-24 h-24 rounded-full object-cover"
                  unoptimized={true}
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.position}</p>
                <p className="text-sm text-muted-foreground">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 荣誉和认证 */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">荣誉与认证</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <div key={index} className="bg-card rounded-lg border border-border p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold">{cert.name}</h3>
                  <p className="text-muted-foreground">{cert.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 工厂参观 */}
      <div className="bg-muted rounded-lg p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">预约工厂参观</h2>
            <p className="text-muted-foreground mb-6">
              我们欢迎客户来我们的工厂参观，了解产品生产流程和质量控制体系。您可以与我们的团队面对面交流，共同探讨定制化解决方案。
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-primary rounded-lg hover:bg-primary/90 focus:outline-none"
            >
              预约参观
            </Link>
          </div>
          <div className="relative h-64 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1581093458791-9cd5083cc0be"
              alt="工厂参观"
              fill
              className="object-cover"
              unoptimized={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 