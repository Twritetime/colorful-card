import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import mongoose from 'mongoose';

// 图片Schema
const imageSchema = new mongoose.Schema({
  data: { type: mongoose.Schema.Types.Mixed, required: true },
  contentType: { type: String, required: true },
  filename: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// 动态创建模型
const Image = mongoose.models.Image || mongoose.model('Image', imageSchema);

// 为解决Vercel部署问题，添加动态配置
export const dynamic = 'force-dynamic';

// 获取图片
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    const resolvedParams = await params;
    const image = await Image.findById(resolvedParams.id);
    
    if (!image) {
      return NextResponse.json(
        { error: '图片不存在' },
        { status: 404 }
      );
    }
    
    // 返回图片数据
    return new NextResponse(image.data, {
      headers: {
        'Content-Type': image.contentType,
        'Cache-Control': 'public, max-age=31536000'
      }
    });
  } catch (error) {
    console.error('获取图片失败:', error);
    return NextResponse.json(
      { error: '获取图片失败' },
      { status: 500 }
    );
  }
} 