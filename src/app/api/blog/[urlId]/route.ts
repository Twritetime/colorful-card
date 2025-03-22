import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(
  request: Request,
  { params }: { params: { urlId: string } }
) {
  console.log('Fetching blog post by urlId:', params.urlId);
  try {
    const db = await connectToDatabase();
    console.log('Database connected');
    
    const collection = db.collection('blog');
    console.log('Using collection: blog');

    const post = await collection.findOne({ urlId: params.urlId });
    console.log('Found post:', post ? 'yes' : 'no');

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 