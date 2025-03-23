// API基础URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// 其他全局常量
export const SITE_NAME = '彩卡';
export const SITE_DESCRIPTION = '专业的印刷定制服务';

// 分页设置
export const PAGE_SIZE = 10;

// 上传文件大小限制（字节）
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// 支持的文件类型
export const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const SUPPORTED_VIDEO_TYPES = ['video/mp4', 'video/webm']; 