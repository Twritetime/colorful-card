import { put } from '@vercel/blob'

export async function uploadToBlob(file: File): Promise<string> {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || '上传失败')
    }

    const { url } = await response.json()
    return url
  } catch (error) {
    console.error('文件上传失败:', error)
    throw new Error('文件上传失败')
  }
} 