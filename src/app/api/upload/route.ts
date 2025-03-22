import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string || 'image'
    
    if (!file) {
      return NextResponse.json(
        { error: '没有找到文件' },
        { status: 400 }
      )
    }

    // 验证文件大小
    const maxSize = type === 'video' ? 100 * 1024 * 1024 : 5 * 1024 * 1024 // 100MB for videos, 5MB for images
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `文件大小超过限制 (${type === 'video' ? '100MB' : '5MB'})` },
        { status: 400 }
      )
    }

    // 验证文件类型
    const allowedTypes = type === 'video'
      ? ['video/mp4', 'video/webm', 'video/ogg']
      : ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: `不支持的文件类型: ${file.type}` },
        { status: 400 }
      )
    }

    console.log(`开始上传${type}:`, {
      name: file.name,
      size: file.size,
      type: file.type
    })

    // 生成一个唯一的文件名
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileName = `${type}/${timestamp}-${randomString}-${file.name}`

    try {
      // 上传文件到 Vercel Blob 存储
      const { url } = await put(fileName, file, {
        access: 'public',
        addRandomSuffix: false
      })

      if (!url) {
        throw new Error('上传失败：未获取到文件URL')
      }

      console.log(`${type}上传成功:`, url)
      return NextResponse.json({ url })
    } catch (uploadError) {
      console.error('Vercel Blob上传失败:', uploadError)
      return NextResponse.json(
        { error: '文件存储失败' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('文件上传失败:', error)
    return NextResponse.json(
      { error: '文件上传失败' },
      { status: 500 }
    )
  }
}

// 限制请求体大小为 100MB
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '100mb'
    }
  }
} 