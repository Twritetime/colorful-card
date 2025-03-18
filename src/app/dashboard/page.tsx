"use client";

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">仪表盘</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/dashboard/products" className="block">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">产品管理</h2>
            <p className="text-gray-600">管理产品列表、添加新产品、更新产品信息</p>
          </Card>
        </Link>

        <Link href="/dashboard/categories" className="block">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">类别管理</h2>
            <p className="text-gray-600">管理产品类别、添加新类别、更新类别信息</p>
          </Card>
        </Link>

        <Link href="/dashboard/orders" className="block">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">订单管理</h2>
            <p className="text-gray-600">查看和处理订单、更新订单状态</p>
          </Card>
        </Link>
      </div>
    </div>
  );
} 