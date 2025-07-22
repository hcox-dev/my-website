import { NextResponse } from 'next/server';
import { getAllPosts, getAllTags } from '@/lib/blog/utils';

export async function GET() {
  try {
    const posts = getAllPosts();
    const tags = getAllTags();
    
    return NextResponse.json({
      posts,
      tags,
      success: true
    });
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch blog posts',
        success: false 
      },
      { status: 500 }
    );
  }
}
