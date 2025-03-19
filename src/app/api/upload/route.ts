import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json(
        { error: '文件名不能为空' },
        { status: 400 }
      );
    }

    // 直接将请求体传给put函数
    const blob = await put(filename, request.body, {
      access: 'public',
    });

    // 返回完整的blob对象
    return NextResponse.json(blob);
  } catch (error) {
    console.error('上传图片失败:', error);
    return NextResponse.json(
      { error: '上传图片失败', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 