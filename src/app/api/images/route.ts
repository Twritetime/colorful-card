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

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: '未找到文件' },
        { status: 400 }
      );
    }
    
    // 将文件转换为 Buffer
    const buffer = await file.arrayBuffer();
    
    // 保存图片到 MongoDB
    const image = await Image.create({
      data: Buffer.from(buffer),
      contentType: file.type,
      filename: file.name
    });
    
    // 返回图片URL
    return NextResponse.json({
      url: `/api/images/${image._id}`
    });
  } catch (error) {
    console.error('上传图片失败:', error);
    return NextResponse.json(
      { error: '上传图片失败' },
      { status: 500 }
    );
  }
} 