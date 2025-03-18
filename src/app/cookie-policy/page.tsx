'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function CookiePolicyPage() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Cookie Policy",
      lastUpdated: "Last updated: March 2024",
      introduction: "This Cookie Policy explains how Colorful Card Co., Ltd. (\"we\", \"us\", or \"our\") uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.",
      sections: [
        {
          title: "What are cookies?",
          content: "Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information."
        },
        {
          title: "Why do we use cookies?",
          content: "We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons for our website to operate, and we refer to these as \"essential\" or \"necessary\" cookies. Other cookies enable us to track and target the interests of our users to enhance the experience on our online properties."
        },
        {
          title: "How can I control cookies?",
          content: "You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality may be restricted."
        }
      ],
      contactInfo: "If you have any questions about our use of cookies, please contact us at privacy@colorfulcard.com."
    },
    zh: {
      title: "Cookie 政策",
      lastUpdated: "最后更新：2024年3月",
      introduction: "本Cookie政策解释了彩卡有限公司（"我们"）如何使用cookie和类似技术在您访问我们的网站时识别您。它解释了这些技术是什么，为什么我们使用它们，以及您控制我们使用它们的权利。",
      sections: [
        {
          title: "什么是cookies？",
          content: "Cookie是在您访问网站时放置在您的计算机或移动设备上的小型数据文件。网站所有者广泛使用cookie来使其网站运行，或更有效地运行，以及提供报告信息。"
        },
        {
          title: "为什么我们使用cookies？",
          content: "我们出于多种原因使用第一方和第三方cookie。某些cookie是出于技术原因需要的，以便我们的网站运行，我们将其称为"必要"cookie。其他cookie使我们能够跟踪和定位用户的兴趣，以增强我们在线属性的体验。"
        },
        {
          title: "如何控制cookies？",
          content: "您有权决定是接受还是拒绝cookie。您可以设置或修改您的Web浏览器控件以接受或拒绝cookie。如果您选择拒绝cookie，您仍然可以使用我们的网站，但您对某些功能的访问可能会受到限制。"
        }
      ],
      contactInfo: "如果您对我们使用cookie有任何疑问，请通过privacy@colorfulcard.com与我们联系。"
    }
  };

  const currentContent = content[language];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-2">{currentContent.title}</h1>
      <p className="text-sm text-gray-500 text-center mb-8">{currentContent.lastUpdated}</p>
      
      <div className="max-w-3xl mx-auto">
        <p className="mb-8">{currentContent.introduction}</p>
        
        {currentContent.sections.map((section, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
            <p>{section.content}</p>
          </div>
        ))}
        
        <div className="mt-8 pt-4 border-t border-gray-200">
          <p>{currentContent.contactInfo}</p>
        </div>
      </div>
    </div>
  );
} 