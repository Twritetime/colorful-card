import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import Product from '@/models/Product';

// 获取单个产品
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    const { id } = params;
    const product = await Product.findById(id);
    
    if (!product) {
      return NextResponse.json(
        { success: false, message: '产品不存在' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error('获取产品详情失败:', error);
    return NextResponse.json(
      { success: false, message: '获取产品详情失败', error: String(error) },
      { status: 500 }
    );
  }
}

// 更新产品
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    const { id } = params;
    const updateData = await request.json();
    
    // 确保更新时间
    updateData.updatedAt = new Date();
    
    const product = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return NextResponse.json(
        { success: false, message: '产品不存在' },
        { status: 404 }
      );
    }
    
    // 触发Vercel部署钩子，确保前端显示最新数据
    try {
      const DEPLOY_HOOK_URL = 'https://api.vercel.com/v1/integrations/deploy/prj_EeVz83Ew8k82vyl9uRKGX2fWYCqs/NSM7Z5B7wm';
      await fetch(DEPLOY_HOOK_URL, { method: 'POST' });
    } catch (deployError) {
      console.warn('触发部署钩子失败:', deployError);
      // 继续处理，不影响API响应
    }
    
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error('更新产品失败:', error);
    return NextResponse.json(
      { success: false, message: '更新产品失败', error: String(error) },
      { status: 500 }
    );
  }
}

// 删除产品
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    const { id } = params;
    const product = await Product.findByIdAndDelete(id);
    
    if (!product) {
      return NextResponse.json(
        { success: false, message: '产品不存在' },
        { status: 404 }
      );
    }
    
    // 触发Vercel部署钩子，确保前端显示最新数据
    try {
      const DEPLOY_HOOK_URL = 'https://api.vercel.com/v1/integrations/deploy/prj_EeVz83Ew8k82vyl9uRKGX2fWYCqs/NSM7Z5B7wm';
      await fetch(DEPLOY_HOOK_URL, { method: 'POST' });
    } catch (deployError) {
      console.warn('触发部署钩子失败:', deployError);
      // 继续处理，不影响API响应
    }
    
    return NextResponse.json(
      { success: true, message: '产品删除成功' }
    );
  } catch (error) {
    console.error('删除产品失败:', error);
    return NextResponse.json(
      { success: false, message: '删除产品失败', error: String(error) },
      { status: 500 }
    );
  }
} 