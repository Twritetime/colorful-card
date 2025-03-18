import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import mongoose from 'mongoose';
import { Binary } from 'mongodb';

// 为解决Vercel部署问题，添加动态配置
export const dynamic = 'force-dynamic';

// 图片模型
const imageSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String,
  filename: String,
  createdAt: { type: Date, default: Date.now }
});

// 确保模型只被创建一次
const Image = mongoose.models.Image || mongoose.model('Image', imageSchema);

// 上传图片
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { success: false, message: '未找到文件' },
        { status: 400 }
      );
    }
    
    // 将文件转换为 Buffer
    const buffer = await file.arrayBuffer();
    const binary = new Binary(Buffer.from(buffer));
    
    // 保存图片到 MongoDB
    const image = await Image.create({
      data: binary,
      contentType: file.type,
      filename: file.name
    });
    
    // 返回图片URL
    return NextResponse.json({
      success: true,
      url: `/api/images/${image._id}`
    });
  } catch (error) {
    console.error('上传图片失败:', error);
    return NextResponse.json(
      { success: false, message: '上传图片失败' },
      { status: 500 }
    );
  }
} 