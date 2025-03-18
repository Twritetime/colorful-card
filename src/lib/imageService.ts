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
    await connectToDatabase();
    
    // 将文件转换为 Buffer
    const buffer = await file.arrayBuffer();
    const binary = new Binary(Buffer.from(buffer));
    
    // 保存图片到 MongoDB
    const image = await Image.create({
      data: binary,
      contentType: file.type,
      filename: file.name
    });
    
    // 返回图片ID作为URL
    return `/api/images/${image._id}`;
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