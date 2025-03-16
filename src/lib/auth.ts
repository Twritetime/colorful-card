import { createHash, randomBytes, scrypt, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

// 生成随机盐
export function generateSalt(length = 16): string {
  return randomBytes(length).toString('hex');
}

// 哈希密码
export async function hash(password: string): Promise<string> {
  const salt = generateSalt();
  const derivedKey = await scryptAsync(password, salt, 64) as Buffer;
  return `${salt}:${derivedKey.toString('hex')}`;
}

// 验证密码
export async function compare(password: string, hashedPassword: string): Promise<boolean> {
  const [salt, key] = hashedPassword.split(':');
  const derivedKey = await scryptAsync(password, salt, 64) as Buffer;
  const keyBuffer = Buffer.from(key, 'hex');
  
  return keyBuffer.length === derivedKey.length && 
    timingSafeEqual(keyBuffer, derivedKey);
}

// 生成安全的随机令牌
export function generateToken(length = 32): string {
  return randomBytes(length).toString('hex');
}

// 创建MD5哈希（用于Gravatar等）
export function md5(data: string): string {
  return createHash('md5').update(data).digest('hex');
}

// 获取Gravatar URL
export function getGravatarUrl(email: string, size = 200): string {
  const hash = md5(email.toLowerCase().trim());
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=mp`;
} 