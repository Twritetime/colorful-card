import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import Category from '@/models/Category';

// 获取单个类别
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    const { id } = params;
    const category = await Category.findById(id);
    
    if (!category) {
      return NextResponse.json(
        { success: false, message: '类别不存在' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    console.error('获取类别详情失败:', error);
    return NextResponse.json(
      { success: false, message: '获取类别详情失败', error: String(error) },
      { status: 500 }
    );
  }
}

// 更新类别
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    const { id } = params;
    const updateData = await request.json();
    
    // 确保slug格式正确
    if (updateData.slug) {
      updateData.slug = updateData.slug.toLowerCase().replace(/\s+/g, '-');
    }
    
    // 确保更新时间
    updateData.updatedAt = new Date();
    
    const category = await Category.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!category) {
      return NextResponse.json(
        { success: false, message: '类别不存在' },
        { status: 404 }
      );
    }
    
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
    
    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    console.error('更新类别失败:', error);
    return NextResponse.json(
      { success: false, message: '更新类别失败', error: String(error) },
      { status: 500 }
    );
  }
}

// 删除类别
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    const { id } = params;
    const category = await Category.findByIdAndDelete(id);
    
    if (!category) {
      return NextResponse.json(
        { success: false, message: '类别不存在' },
        { status: 404 }
      );
    }
    
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
      { success: true, message: '类别删除成功' }
    );
  } catch (error) {
    console.error('删除类别失败:', error);
    return NextResponse.json(
      { success: false, message: '删除类别失败', error: String(error) },
      { status: 500 }
    );
  }
} 