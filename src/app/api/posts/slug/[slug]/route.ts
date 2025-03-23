import { NextResponse } from 'next/server';

// 引入模拟数据
// 实际应用中，这里应该从数据库获取数据
let blogPosts = [
  {
    _id: '1',
    title: '彩卡印刷技术的最新趋势',
    slug: 'latest-trends-colorful-card-printing',
    excerpt: '探索彩卡印刷行业的最新技术趋势和创新方法，帮助您的业务保持竞争力。',
    content: '<p>彩卡印刷行业正在经历前所未有的技术革新，从数字印刷到环保材料的应用，新技术层出不穷。</p><p>本文将深入探讨以下关键趋势：</p><ul><li>高清数码印刷技术</li><li>智能卡片的集成解决方案</li><li>环保材料在印刷中的应用</li><li>个性化定制印刷服务</li></ul><p>了解这些趋势将帮助您的企业在竞争激烈的市场中脱颖而出。</p>',
    author: '张技术专家',
    status: 'published',
    coverImage: 'https://placehold.co/600x400/png',
    tags: ['印刷技术', '行业趋势', '创新'],
    publishedAt: '2023-11-15T08:00:00.000Z',
    createdAt: '2023-11-10T08:00:00.000Z',
    updatedAt: '2023-11-15T08:00:00.000Z'
  },
  {
    _id: '2',
    title: '如何选择适合您业务的彩卡印刷服务',
    slug: 'how-to-choose-printing-service',
    excerpt: '详细指南帮助企业选择最适合的彩卡印刷服务，确保质量和成本效益的平衡。',
    content: '<p>选择合适的彩卡印刷服务对企业形象至关重要。本文将为您提供全面的选择指南。</p><h2>评估标准</h2><p>在选择印刷服务时，应考虑以下因素：</p><ul><li>印刷质量与一致性</li><li>材料选择与环保性</li><li>价格与批量生产折扣</li><li>交付时间与可靠性</li><li>客户服务与沟通</li></ul><p>通过综合评估这些因素，您可以找到最符合企业需求的印刷合作伙伴。</p>',
    author: '李市场经理',
    status: 'published',
    coverImage: 'https://placehold.co/600x400/png',
    tags: ['采购指南', '印刷服务', '供应商选择'],
    publishedAt: '2023-12-05T08:00:00.000Z',
    createdAt: '2023-12-01T08:00:00.000Z',
    updatedAt: '2023-12-05T08:00:00.000Z'
  },
  {
    _id: '3',
    title: '彩卡在品牌营销中的战略应用',
    slug: 'strategic-use-of-cards-in-marketing',
    excerpt: '探讨如何利用精美彩卡提升品牌形象并增强客户忠诚度的营销策略。',
    content: '<p>在数字化时代，实体彩卡仍然是品牌营销的有力工具。本文将探讨彩卡在品牌推广中的战略应用。</p><h2>彩卡的营销价值</h2><p>精心设计的彩卡可以：</p><ul><li>增强品牌辨识度</li><li>提供触感体验，加深品牌印象</li><li>作为优惠券或会员卡使用</li><li>创造收藏价值，延长品牌接触</li></ul><p>通过案例分析，我们将展示如何将彩卡整合到您的整体营销策略中。</p>',
    author: '王营销总监',
    status: 'published',
    coverImage: 'https://placehold.co/600x400/png',
    tags: ['营销策略', '品牌推广', '客户忠诚度'],
    publishedAt: '2024-01-10T08:00:00.000Z',
    createdAt: '2024-01-05T08:00:00.000Z',
    updatedAt: '2024-01-10T08:00:00.000Z'
  }
];

// GET: 通过slug获取单个博客文章
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const post = blogPosts.find(post => post.slug === slug);
    
    if (!post) {
      return NextResponse.json(
        { success: false, error: '博客文章不存在' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error('获取博客文章失败:', error);
    return NextResponse.json(
      { success: false, error: '获取博客文章失败' },
      { status: 500 }
    );
  }
} 