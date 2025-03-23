import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import BlogPost from '@/models/BlogPost';
import { getServerSession } from 'next-auth';

// 确保每次请求都获取最新数据
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET: 获取所有博客文章
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // 获取查询参数
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100');
    const page = parseInt(searchParams.get('page') || '1');
    const tag = searchParams.get('tag');
    const status = searchParams.get('status');
    const onlyPublished = searchParams.get('published') === 'true';
    
    // 构建查询条件
    const query: any = {};
    if (tag) {
      query.tags = tag;
    }
    if (status) {
      query.status = status;
    }
    
    // 如果请求只获取已发布的文章
    if (onlyPublished) {
      query.status = 'published';
      query.publishedAt = { $ne: null };
    }
    
    // 计算分页
    const skip = (page - 1) * limit;
    
    // 查询博客文章
    const posts = await BlogPost.find(query)
      .sort(onlyPublished ? { publishedAt: -1 } : { createdAt: -1 })
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
    console.error('获取博客文章列表失败:', error);
    return NextResponse.json(
      { success: false, error: '获取博客文章列表失败' },
      { status: 500 }
    );
  }
}

// POST: 创建新博客文章
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const session = await getServerSession();
    
    // 检查身份验证（在生产环境中，应验证用户是否有权限创建文章）
    if (!session) {
      return NextResponse.json(
        { success: false, error: '未授权访问' },
        { status: 401 }
      );
    }
    
    const data = await request.json();
    
    // 验证必填字段
    if (!data.title || !data.content || !data.author) {
      return NextResponse.json(
        { success: false, error: '标题、内容和作者为必填项' },
        { status: 400 }
      );
    }
    
    // 处理slug，确保唯一性
    let slug = data.slug;
    if (!slug) {
      // 如果没有提供slug，从标题生成
      slug = data.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
    }
    
    // 检查slug是否已存在
    const existingPost = await BlogPost.findOne({ slug });
    if (existingPost) {
      // 如果已存在，添加时间戳确保唯一性
      slug = `${slug}-${Date.now()}`;
    }
    
    // 处理发布状态
    const publishedAt = data.status === 'published' ? new Date() : null;
    
    // 创建新文章
    const newPost = new BlogPost({
      ...data,
      slug,
      publishedAt
    });
    
    await newPost.save();
    
    return NextResponse.json({
      success: true,
      data: newPost
    }, { status: 201 });
  } catch (error) {
    console.error('创建博客文章失败:', error);
    return NextResponse.json(
      { success: false, error: '创建博客文章失败' },
      { status: 500 }
    );
  }
} 