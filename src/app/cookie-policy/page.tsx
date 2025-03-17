'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function CookiePolicyPage() {
  const { language } = useLanguage();

  const cookieContent = {
    en: {
      title: "Cookie Policy",
      lastUpdated: "Last updated: March 2024",
      introduction: "This Cookie Policy explains how Colorful Card Co., Ltd. ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.",
      sections: [
        {
          title: "What are cookies?",
          content: "Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information. Cookies set by the website owner (in this case, Colorful Card Co., Ltd.) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites."
        },
        {
          title: "Why do we use cookies?",
          content: "We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our website. Third parties serve cookies through our website for advertising, analytics, and other purposes. This is described in more detail below."
        },
        {
          title: "Types of cookies we use",
          subsections: [
            {
              title: "Essential cookies",
              description: "These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas. Because these cookies are strictly necessary to deliver the website, you cannot refuse them without impacting how our website functions."
            },
            {
              title: "Performance and functionality cookies",
              description: "These cookies are used to enhance the performance and functionality of our website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable."
            },
            {
              title: "Analytics and customization cookies",
              description: "These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are, or to help us customize our website for you in order to enhance your experience."
            },
            {
              title: "Advertising cookies",
              description: "These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in some cases selecting advertisements that are based on your interests."
            },
            {
              title: "Social networking cookies",
              description: "These cookies are used to enable you to share pages and content that you find interesting on our website through third-party social networking and other websites. These cookies may also be used for advertising purposes."
            }
          ]
        },
        {
          title: "How can you control cookies?",
          content: "You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by clicking on the appropriate opt-out links provided in the cookie notice banner displayed when you first visit our website. You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted. As the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser's help menu for more information."
        },
        {
          title: "How often will we update this Cookie Policy?",
          content: "We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies. The date at the top of this Cookie Policy indicates when it was last updated."
        }
      ],
      contact: "If you have any questions about our use of cookies or other technologies, please email us at privacy@colorfulcard.com."
    },
    zh: {
      title: "Cookie政策",
      lastUpdated: "最后更新：2024年3月",
      introduction: "本Cookie政策解释了彩卡有限公司（"我们"或"我们的"）如何在您访问我们的网站时使用Cookie和类似技术来识别您。它解释了这些技术是什么，为什么我们使用它们，以及您控制我们使用它们的权利。",
      sections: [
        {
          title: "什么是Cookie？",
          content: "Cookie是在您访问网站时放置在您的计算机或移动设备上的小型数据文件。网站所有者广泛使用Cookie使其网站正常运行，或更有效地运行，以及提供报告信息。由网站所有者（在本例中为彩卡有限公司）设置的Cookie称为"第一方Cookie"。由网站所有者以外的方设置的Cookie称为"第三方Cookie"。第三方Cookie使第三方功能或功能能够在网站上或通过网站提供（例如，广告，交互内容和分析）。设置这些第三方Cookie的各方可以在您访问相关网站以及访问某些其他网站时识别您的计算机。"
        },
        {
          title: "为什么我们使用Cookie？",
          content: "我们使用第一方和第三方Cookie的原因有几个。某些Cookie出于技术原因是必需的，以便我们的网站能够运行，我们将其称为"必要"或"绝对必要"的Cookie。其他Cookie还使我们能够跟踪和定位用户的兴趣，以增强我们网站上的体验。第三方通过我们的网站提供Cookie，用于广告、分析和其他目的。下面将更详细地描述这一点。"
        },
        {
          title: "我们使用的Cookie类型",
          subsections: [
            {
              title: "必要Cookie",
              description: "这些Cookie对于通过我们的网站向您提供服务以及使用其某些功能（如访问安全区域）是绝对必要的。由于这些Cookie对于提供网站是绝对必要的，因此您不能拒绝它们而不影响我们网站的功能。"
            },
            {
              title: "性能和功能Cookie",
              description: "这些Cookie用于增强我们网站的性能和功能，但对其使用不是必不可少的。然而，如果没有这些Cookie，某些功能可能会变得不可用。"
            },
            {
              title: "分析和定制Cookie",
              description: "这些Cookie收集的信息以汇总形式用于帮助我们了解我们的网站如何被使用或我们的营销活动的效果如何，或帮助我们为您定制我们的网站，以增强您的体验。"
            },
            {
              title: "广告Cookie",
              description: "这些Cookie用于使广告信息与您更相关。它们执行的功能包括防止同一广告不断重复出现，确保广告正确显示，在某些情况下选择基于您兴趣的广告。"
            },
            {
              title: "社交网络Cookie",
              description: "这些Cookie用于使您能够通过第三方社交网络和其他网站分享您在我们网站上发现的有趣的页面和内容。这些Cookie也可能用于广告目的。"
            }
          ]
        },
        {
          title: "如何控制Cookie？",
          content: "您有权决定是接受还是拒绝Cookie。您可以通过点击您首次访问我们网站时显示的Cookie通知横幅中提供的适当选择退出链接来行使您的Cookie偏好。您还可以设置或修改您的网络浏览器控件以接受或拒绝Cookie。如果您选择拒绝Cookie，您仍然可以使用我们的网站，但您对我们网站的某些功能和区域的访问可能会受到限制。由于您可以通过网络浏览器控件拒绝Cookie的方式因浏览器而异，因此您应访问浏览器的帮助菜单以获取更多信息。"
        },
        {
          title: "我们多久更新一次本Cookie政策？",
          content: "我们可能会不时更新本Cookie政策，例如，反映我们使用的Cookie的变化或出于其他操作、法律或监管原因。因此，请定期重新访问本Cookie政策，了解我们使用Cookie和相关技术的情况。本Cookie政策顶部的日期表示其最后更新时间。"
        }
      ],
      contact: "如果您对我们使用Cookie或其他技术有任何疑问，请发送电子邮件至privacy@colorfulcard.com与我们联系。"
    }
  };

  const content = cookieContent[language];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">{content.title}</h1>
        <p className="text-gray-600 mb-6">{content.lastUpdated}</p>
        
        <p className="mb-8">{content.introduction}</p>
        
        {content.sections.map((section, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
            <p className="text-gray-700 mb-4">{section.content}</p>
            
            {section.subsections && (
              <div className="pl-5 mt-4 space-y-4">
                {section.subsections.map((subsection, idx) => (
                  <div key={idx}>
                    <h3 className="text-lg font-medium mb-2">{subsection.title}</h3>
                    <p className="text-gray-700">{subsection.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        
        <div className="mt-10 pt-6 border-t border-gray-200">
          <p className="text-gray-600">{content.contact}</p>
        </div>
      </div>
    </div>
  );
} 