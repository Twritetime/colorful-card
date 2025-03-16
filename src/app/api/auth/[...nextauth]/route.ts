import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({ message: 'Auth API is temporarily disabled for deployment testing' });
}

export async function POST() {
  return NextResponse.json({ message: 'Auth API is temporarily disabled for deployment testing' });
} 