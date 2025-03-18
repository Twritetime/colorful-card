import { NextRequest, NextResponse } from 'next/server';
import { getImage, getImageInfo } from '@/lib/imageService';

// 为解决Vercel部署问题，添加动态配置
export const dynamic = 'force-dynamic';

// 获取图片
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 获取查询参数
    const { searchParams } = new URL(request.url);
    const size = searchParams.get('size') as any;
    const format = searchParams.get('format') as any;
    const info = searchParams.get('info') === 'true';
    
    // 如果请求图片信息
    if (info) {
      const imageInfo = await getImageInfo(params.id);
      return NextResponse.json(imageInfo);
    }
    
    // 获取图片数据
    const image = await getImage(params.id, { size, format });
    
    // 设置CDN缓存头
    const cacheControl = process.env.NODE_ENV === 'production'
      ? 'public, max-age=31536000, s-maxage=31536000, stale-while-revalidate=31536000'
      : 'no-cache';
    
    // 返回图片数据
    return new NextResponse(image.data, {
      headers: {
        'Content-Type': image.contentType,
        'Cache-Control': cacheControl,
        'CDN-Cache-Control': 'max-age=31536000',
        'Vercel-CDN-Cache-Control': 'max-age=31536000',
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