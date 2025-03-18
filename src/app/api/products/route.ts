import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import Product from '@/models/Product';

// 为解决Vercel部署问题，添加动态配置
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// 获取所有产品
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // 获取查询参数
    const searchParams = request.nextUrl.searchParams;
    const published = searchParams.get('published');
    const category = searchParams.get('category');
    
    // 构建查询条件
    const query: any = {};
    if (published === 'true') query.published = true;
    if (published === 'false') query.published = false;
    if (category) query.category = category;
    
    const products = await Product.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error('获取产品失败:', error);
    return NextResponse.json(
      { success: false, message: '获取产品失败', error: String(error) },
      { status: 500 }
    );
  }
}

// 创建新产品
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const productData = await request.json();
    const product = await Product.create(productData);
    
    // 触发Vercel部署钩子，确保前端显示最新数据
    try {
      const DEPLOY_HOOK_URL = 'https://api.vercel.com/v1/integrations/deploy/prj_EeVz83Ew8k82vyl9uRKGX2fWYCqs/NSM7Z5B7wm';
      await fetch(DEPLOY_HOOK_URL, { method: 'POST' });
    } catch (deployError) {
      console.warn('触发部署钩子失败:', deployError);
      // 继续处理，不影响API响应
    }
    
    return NextResponse.json(
      { success: true, message: '产品创建成功', data: product },
      { status: 201 }
    );
  } catch (error) {
    console.error('创建产品失败:', error);
    return NextResponse.json(
      { success: false, message: '创建产品失败', error: String(error) },
      { status: 500 }
    );
  }
} 