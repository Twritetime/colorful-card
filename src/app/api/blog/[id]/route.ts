import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log('Fetching blog post:', params.id);
  try {
    const db = await connectToDatabase();
    console.log('Database connected');
    
    const collection = db.collection('blog');
    console.log('Using collection: blog');

    const post = await collection.findOne({
      _id: new ObjectId(params.id),
    });
    console.log('Found post:', post);

    if (!post) {
      console.log('Post not found');
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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log('Updating blog post:', params.id);
  try {
    const post = await request.json();
    console.log('Received update data:', post);

    const db = await connectToDatabase();
    console.log('Database connected');
    
    const collection = db.collection('blog');
    console.log('Using collection: blog');

    const updatedPost = {
      ...post,
      updatedAt: new Date(),
    };
    console.log('Prepared update data:', updatedPost);

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(params.id) },
      { $set: updatedPost },
      { returnDocument: 'after' }
    );
    console.log('Update result:', result);

    if (!result.value) {
      console.log('Post not found for update');
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result.value);
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log('Deleting blog post:', params.id);
  try {
    const db = await connectToDatabase();
    console.log('Database connected');
    
    const collection = db.collection('blog');
    console.log('Using collection: blog');

    const result = await collection.deleteOne({
      _id: new ObjectId(params.id),
    });
    console.log('Delete result:', result);

    if (result.deletedCount === 0) {
      console.log('Post not found for deletion');
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 