import { NextRequest, NextResponse } from 'next/server';
import { getImage } from '@/lib/imageService';

// 为解决Vercel部署问题，添加动态配置
export const dynamic = 'force-dynamic';

// 获取图片
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const image = await getImage(params.id);
    
    // 返回图片数据
    return new NextResponse(image.data, {
      headers: {
        'Content-Type': image.contentType,
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    console.error('获取图片失败:', error);
    return NextResponse.json(
      { success: false, message: '获取图片失败' },
      { status: 404 }
    );
  }
} 