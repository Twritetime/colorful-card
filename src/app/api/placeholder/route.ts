import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function GET(request: Request) {
  try {
    // 默认尺寸和文本
    const { searchParams } = new URL(request.url);
    const width = parseInt(searchParams.get('width') || '400', 10);
    const height = parseInt(searchParams.get('height') || '400', 10);
    const text = searchParams.get('text') || '产品图片';
    
    // 创建一个灰色背景的SVG，带有文本
    const svg = Buffer.from(`
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f0f0f0"/>
        <text 
          x="50%" 
          y="50%" 
          font-family="Arial, sans-serif" 
          font-size="24" 
          text-anchor="middle" 
          dominant-baseline="middle"
          fill="#888888"
        >
          ${text}
        </text>
      </svg>
    `);

    // 转换SVG为PNG
    const pngBuffer = await sharp(svg)
      .png()
      .toBuffer();

    // 返回PNG图片
    return new NextResponse(pngBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('生成占位图失败:', error);
    return NextResponse.json(
      { error: '生成占位图失败' },
      { status: 500 }
    );
  }
} 