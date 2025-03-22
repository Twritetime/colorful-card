import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 格式化货币显示
 * @param amount 金额
 * @param currency 货币代码，默认为USD
 * @returns 格式化后的货币字符串
 */
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * 格式化日期
 * @param date 日期对象或日期字符串
 * @returns 格式化后的日期字符串
 */
export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * 截断文本
 * @param text 原始文本
 * @param length 最大长度
 * @returns 截断后的文本
 */
export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
};

/**
 * 生成随机ID
 * @returns 随机ID字符串
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};
