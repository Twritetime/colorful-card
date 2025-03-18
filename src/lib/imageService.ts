// 图片服务

/**
 * 上传图片到服务器
 * @param file 要上传的文件
 * @returns 上传成功后的图片URL
 */
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