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

// 增加请求体大小限制，默认4mb
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export async function POST(request: NextRequest) {
  try {
    console.log('开始处理图片上传请求');
    
    // 先连接数据库，再处理请求内容
    await connectToDatabase();
    console.log('数据库连接成功');

    // 设置超时时间处理formData
    const formDataPromise = request.formData();
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('表单数据处理超时')), 15000)
    );
    
    const formData = await Promise.race([formDataPromise, timeoutPromise]) as FormData;
    const file = formData.get('file') as File;
    
    console.log('接收到文件:', file?.name, file?.type, file?.size);

    if (!file) {
      console.error('未找到文件');
      return NextResponse.json(
        { error: '未找到文件' },
        { status: 400 }
      );
    }

    // 限制文件大小
    if (file.size > 8 * 1024 * 1024) { // 8MB
      console.error('文件太大');
      return NextResponse.json(
        { error: '文件太大，最大支持8MB' },
        { status: 400 }
      );
    }

    // 将文件转换为 Buffer
    const buffer = await file.arrayBuffer();
    console.log('文件转换为Buffer成功，大小:', buffer.byteLength);

    // 保存图片到 MongoDB
    const image = await Image.create({
      data: Buffer.from(buffer),
      contentType: file.type,
      filename: file.name
    });
    console.log('图片保存到MongoDB成功, ID:', image._id);

    // 返回图片URL
    return NextResponse.json({
      url: `/api/images/${image._id}`
    });
  } catch (error) {
    console.error('上传图片失败:', error);
    return NextResponse.json(
      { error: '上传图片失败: ' + (error as Error).message },
      { status: 500 }
    );
  }
} 