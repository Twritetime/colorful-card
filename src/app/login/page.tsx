"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="container max-w-md mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold text-center mb-8">登录后台管理</h1>
      <LoginForm />
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>测试账号: admin@example.com</p>
        <p>测试密码: password123</p>
        <p className="mt-4">注意：目前处于演示模式，不需要实际注册即可登录。</p>
      </div>
    </div>
  );
} 