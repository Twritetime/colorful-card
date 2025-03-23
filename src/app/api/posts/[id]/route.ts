import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDatabase } from '@/lib/db/mongodb';
import BlogPost from '@/models/BlogPost';
import mongoose from 'mongoose';

// 确保每次请求都获取最新数据
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET: 获取单个博客文章
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 正确处理：先await params对象
    const resolvedParams = await params;
    const id = resolvedParams.id;
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID不能为空" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    
    // 检查ID格式是否有效
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "无效的ID格式" },
        { status: 400 }
      );
    }
    
    const post = await BlogPost.findById(id).lean();

    if (!post) {
      return NextResponse.json(
        { success: false, error: "博客文章不存在" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error("获取博客文章失败:", error);
    return NextResponse.json(
      { success: false, error: "服务器错误" },
      { status: 500 }
    );
  }
}

// PUT: 更新博客文章
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    
    // 检查身份验证
    if (!session) {
      return NextResponse.json(
        { success: false, error: '未授权访问' },
        { status: 401 }
      );
    }
    
    // 正确处理：先await params对象
    const resolvedParams = await params;
    const id = resolvedParams.id;
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID不能为空" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    
    // 检查ID格式是否有效
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "无效的ID格式" },
        { status: 400 }
      );
    }
    
    const data = await request.json();
    
    // 处理发布状态变更
    if (data.status === 'published' && !data.publishedAt) {
      data.publishedAt = new Date();
    }
    
    // 更新文章
    const updatedPost = await BlogPost.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    ).lean();
    
    if (!updatedPost) {
      return NextResponse.json(
        { success: false, error: '博客文章不存在' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: updatedPost
    });
  } catch (error) {
    console.error('更新博客文章失败:', error);
    return NextResponse.json(
      { success: false, error: '更新博客文章失败' },
      { status: 500 }
    );
  }
}

// DELETE: 删除博客文章
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 正确处理：先await params对象
    const resolvedParams = await params;
    const id = resolvedParams.id;
    
    if (!id) {
      return NextResponse.json(
        { error: "文章ID不能为空" },
        { status: 400 }
      );
    }

    const session = await getServerSession();
    
    // 检查身份验证
    if (!session) {
      return NextResponse.json(
        { success: false, error: '未授权访问' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    
    // 检查ID格式是否有效
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "无效的ID格式" },
        { status: 400 }
      );
    }
    
    // 删除文章
    const deletedPost = await BlogPost.findByIdAndDelete(id);
    
    if (!deletedPost) {
      return NextResponse.json(
        { success: false, error: '博客文章不存在' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: '博客文章已成功删除'
    });
  } catch (error) {
    console.error('删除博客文章失败:', error);
    return NextResponse.json(
      { success: false, error: '删除博客文章失败' },
      { status: 500 }
    );
  }
} 