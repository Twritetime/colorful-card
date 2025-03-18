// 图片服务
import { connectToDatabase } from '@/lib/db/mongodb';
import mongoose from 'mongoose';
import { Binary } from 'mongodb';
import sharp from 'sharp';

// 图片尺寸配置
const IMAGE_SIZES = {
  thumbnail: { width: 150, height: 150 },
  small: { width: 300, height: 300 },
  medium: { width: 600, height: 600 },
  large: { width: 1200, height: 1200 }
} as const;

// 图片格式配置
const IMAGE_FORMATS = ['jpeg', 'webp', 'avif'] as const;

// 图片模型
const imageSchema = new mongoose.Schema({
  data: Buffer,
  thumbnails: {
    thumbnail: Buffer,
    small: Buffer,
    medium: Buffer,
    large: Buffer
  },
  formats: {
    jpeg: Buffer,
    webp: Buffer,
    avif: Buffer
  },
  contentType: String,
  filename: String,
  width: Number,
  height: Number,
  size: Number,
  createdAt: { type: Date, default: Date.now }
});

// 确保模型只被创建一次
const Image = mongoose.models.Image || mongoose.model('Image', imageSchema);

// 处理图片
async function processImage(buffer: Buffer) {
  const image = sharp(buffer);
  const metadata = await image.metadata();
  
  // 生成不同尺寸的缩略图
  const thumbnails = await Promise.all(
    Object.entries(IMAGE_SIZES).map(async ([size, dimensions]) => {
      const resized = await image
        .resize(dimensions.width, dimensions.height, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({ quality: 80 })
        .toBuffer();
      return [size, resized];
    })
  );
  
  // 生成不同格式的图片
  const formats = await Promise.all(
    IMAGE_FORMATS.map(async (format) => {
      const converted = await image[format]({
        quality: 80,
        ...(format === 'avif' ? { effort: 4 } : {})
      }).toBuffer();
      return [format, converted];
    })
  );
  
  return {
    thumbnails: Object.fromEntries(thumbnails),
    formats: Object.fromEntries(formats),
    metadata: {
      width: metadata.width,
      height: metadata.height,
      size: buffer.length
    }
  };
}

// 上传图片
export const uploadImage = async (file: File): Promise<string> => {
  try {
    await connectToDatabase();
    
    // 将文件转换为 Buffer
    const buffer = await file.arrayBuffer();
    const imageBuffer = Buffer.from(buffer);
    
    // 处理图片
    const { thumbnails, formats, metadata } = await processImage(imageBuffer);
    
    // 保存图片到 MongoDB
    const image = await Image.create({
      data: imageBuffer,
      thumbnails,
      formats,
      contentType: file.type,
      filename: file.name,
      width: metadata.width,
      height: metadata.height,
      size: metadata.size
    });
    
    // 返回图片ID作为URL
    return `/api/images/${image._id}`;
  } catch (error) {
    console.error('上传图片失败:', error);
    throw error;
  }
};

// 获取图片
export const getImage = async (id: string, options?: {
  size?: keyof typeof IMAGE_SIZES;
  format?: keyof typeof IMAGE_FORMATS;
}) => {
  try {
    await connectToDatabase();
    
    const image = await Image.findById(id);
    if (!image) {
      throw new Error('图片不存在');
    }
    
    // 根据请求的尺寸和格式返回相应的图片
    if (options?.size && options?.format) {
      return {
        data: image.thumbnails[options.size],
        contentType: `image/${options.format}`
      };
    } else if (options?.size) {
      return {
        data: image.thumbnails[options.size],
        contentType: image.contentType
      };
    } else if (options?.format) {
      return {
        data: image.formats[options.format],
        contentType: `image/${options.format}`
      };
    }
    
    // 默认返回原始图片
    return {
      data: image.data,
      contentType: image.contentType
    };
  } catch (error) {
    console.error('获取图片失败:', error);
    throw error;
  }
};

// 获取图片信息
export const getImageInfo = async (id: string) => {
  try {
    await connectToDatabase();
    
    const image = await Image.findById(id, {
      filename: 1,
      width: 1,
      height: 1,
      size: 1,
      contentType: 1,
      createdAt: 1
    });
    
    if (!image) {
      throw new Error('图片不存在');
    }
    
    return {
      id: image._id,
      filename: image.filename,
      width: image.width,
      height: image.height,
      size: image.size,
      contentType: image.contentType,
      createdAt: image.createdAt,
      urls: {
        original: `/api/images/${image._id}`,
        ...Object.keys(IMAGE_SIZES).reduce((acc, size) => ({
          ...acc,
          [size]: `/api/images/${image._id}?size=${size}`
        }), {}),
        ...IMAGE_FORMATS.reduce((acc, format) => ({
          ...acc,
          [format]: `/api/images/${image._id}?format=${format}`
        }), {})
      }
    };
  } catch (error) {
    console.error('获取图片信息失败:', error);
    throw error;
  }
}; 