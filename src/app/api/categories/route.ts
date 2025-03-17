import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import Category from '@/models/Category';

// 获取所有类别
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // 获取查询参数
    const searchParams = request.nextUrl.searchParams;
    const parentId = searchParams.get('parentId');
    
    // 构建查询条件
    const query: any = {};
    if (parentId === 'null' || parentId === '') {
      query.parentId = null;
    } else if (parentId) {
      query.parentId = parentId;
    }
    
    const categories = await Category.find(query).sort({ order: 1 });
    
    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    console.error('获取类别失败:', error);
    return NextResponse.json(
      { success: false, message: '获取类别失败', error: String(error) },
      { status: 500 }
    );
  }
}

// 创建新类别
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const categoryData = await request.json();
    
    // 确保slug的唯一性，将空格转换为连字符
    if (categoryData.slug) {
      categoryData.slug = categoryData.slug.toLowerCase().replace(/\s+/g, '-');
    } else if (categoryData.name) {
      categoryData.slug = categoryData.name.toLowerCase().replace(/\s+/g, '-');
    }
    
    const category = await Category.create(categoryData);
    
    // 触发Vercel部署钩子，确保前端显示最新数据
    try {
      const DEPLOY_HOOK_URL = process.env.VERCEL_DEPLOY_HOOK_URL;
      if (DEPLOY_HOOK_URL) {
        await fetch(DEPLOY_HOOK_URL, { method: 'POST' });
      }
    } catch (deployError) {
      console.warn('触发部署钩子失败:', deployError);
      // 继续处理，不影响API响应
    }
    
    return NextResponse.json(
      { success: true, message: '类别创建成功', data: category },
      { status: 201 }
    );
  } catch (error) {
    console.error('创建类别失败:', error);
    return NextResponse.json(
      { success: false, message: '创建类别失败', error: String(error) },
      { status: 500 }
    );
  }
} 