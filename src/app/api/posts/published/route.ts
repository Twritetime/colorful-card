import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import BlogPost from '@/models/BlogPost';

// 确保每次请求都获取最新数据
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET: 获取所有已发布的博客文章
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // 获取查询参数
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100');
    const page = parseInt(searchParams.get('page') || '1');
    const tag = searchParams.get('tag');
    
    // 构建查询条件 - 只返回已发布的文章
    const query: any = { status: 'published', publishedAt: { $ne: null } };
    if (tag) {
      query.tags = tag;
    }
    
    // 计算分页
    const skip = (page - 1) * limit;
    
    // 查询博客文章
    const posts = await BlogPost.find(query)
      .sort({ publishedAt: -1 }) // 按发布日期排序
      .skip(skip)
      .limit(limit)
      .lean();
    
    // 计算总数
    const total = await BlogPost.countDocuments(query);
    
    return NextResponse.json({
      success: true,
      data: posts,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('获取已发布博客文章列表失败:', error);
    return NextResponse.json(
      { success: false, error: '获取博客文章列表失败' },
      { status: 500 }
    );
  }
} 