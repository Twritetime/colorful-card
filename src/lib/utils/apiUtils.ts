/**
 * 检查当前是否在浏览器环境中运行
 */
export const isBrowser = typeof window !== 'undefined';

/**
 * 获取API的基础URL
 * 在开发环境中使用相对路径，在生产环境中可以配置为完整的绝对URL
 */
export function getBaseApiUrl(): string {
  // 如果需要配置生产环境的API URL，可以在环境变量中设置
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // 相对路径，使用当前域名
  return '/api';
}

/**
 * 统一处理API响应
 * @param response Fetch响应对象
 * @returns 处理后的数据对象
 */
export async function handleApiResponse(response: Response) {
  if (!response.ok) {
    // 对于4xx和5xx错误，尝试解析错误消息
    try {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || `服务器返回错误: ${response.status}`
      };
    } catch (e) {
      // 如果无法解析JSON，返回基本错误信息
      return {
        success: false,
        error: `服务器返回错误: ${response.status}`
      };
    }
  }
  
  try {
    const data = await response.json();
    return {
      success: true,
      ...data
    };
  } catch (e) {
    return {
      success: false,
      error: '无法解析服务器响应'
    };
  }
} 