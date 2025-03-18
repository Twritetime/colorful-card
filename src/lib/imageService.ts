// 图片服务
import { connectToDatabase } from '@/lib/db/mongodb';
import mongoose from 'mongoose';
import { Binary } from 'mongodb';

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
export const uploadImage = async (file: File): Promise<string> => {
  try {
    // 创建 FormData
    const formData = new FormData();
    formData.append('file', file);
    
    // 上传图片到服务器
    const response = await fetch('/api/images', {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error('上传图片失败');
    }
    
    const result = await response.json();
    return result.url;
  } catch (error) {
    console.error('上传图片失败:', error);
    throw error;
  }
};

// 获取图片
export const getImage = async (id: string) => {
  try {
    await connectToDatabase();
    
    const image = await Image.findById(id);
    if (!image) {
      throw new Error('图片不存在');
    }
    
    return {
      data: image.data,
      contentType: image.contentType
    };
  } catch (error) {
    console.error('获取图片失败:', error);
    throw error;
  }
}; 