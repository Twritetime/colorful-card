import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// 生成URL友好的ID
function generateUrlId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-') // 保留中文、字母和数字，其他替换为-
    .replace(/^-+|-+$/g, '') // 删除开头和结尾的-
    .substring(0, 50); // 限制长度
}

export async function GET(request: Request) {
  console.log('Fetching blog posts...');
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const showAll = searchParams.get('showAll') === 'true'; // 添加showAll参数
    console.log('Search term:', search);
    console.log('Show all:', showAll);

    const db = await connectToDatabase();
    console.log('Database connected');
    
    const collection = db.collection('blog');
    console.log('Using collection: blog');

    // 构建查询条件
    let query: any = {};
    
    // 只有在showAll为false时才过滤published状态
    if (!showAll) {
      query.published = true;
    }
    
    // 添加搜索条件
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }
    
    console.log('Query:', JSON.stringify(query));

    const posts = await collection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();
    console.log(`Found ${posts.length} posts`);

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  console.log('Creating new blog post...');
  try {
    const post = await request.json();
    console.log('Received post data:', post);

    const db = await connectToDatabase();
    console.log('Database connected');
    
    const collection = db.collection('blog');
    console.log('Using collection: blog');

    const now = new Date();
    const urlId = generateUrlId(post.title);
    
    // 检查urlId是否已存在
    let finalUrlId = urlId;
    let counter = 1;
    while (await collection.findOne({ urlId: finalUrlId })) {
      finalUrlId = `${urlId}-${counter}`;
      counter++;
    }

    const newPost = {
      ...post,
      urlId: finalUrlId,
      createdAt: now,
      updatedAt: now,
      published: false, // 默认为未发布状态
    };
    console.log('Prepared post data:', newPost);

    const result = await collection.insertOne(newPost);
    console.log('Post created with ID:', result.insertedId);

    return NextResponse.json({ 
      _id: result.insertedId,
      urlId: finalUrlId
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 