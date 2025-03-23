import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(
  request: Request,
  { params }: { params: { urlId: string } }
) {
  console.log('Fetching blog post by urlId:', params.urlId);
  
  if (!params.urlId) {
    return NextResponse.json(
      { error: 'urlId is required' },
      { status: 400 }
    );
  }

  try {
    const db = await connectToDatabase();
    console.log('Database connected');
    
    const collection = db.collection('blog');
    console.log('Using collection: blog');

    const post = await collection.findOne({ 
      urlId: params.urlId,
      published: true // 只返回已发布的文章
    });
    console.log('Found post:', post ? 'yes' : 'no');

    if (!post) {
      console.log('Blog post not found for urlId:', params.urlId);
      return NextResponse.json(
        { error: 'Blog post not found', urlId: params.urlId },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch blog post', 
        details: error instanceof Error ? error.message : String(error),
        urlId: params.urlId
      },
      { status: 500 }
    );
  }
} 