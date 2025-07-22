import { NextResponse } from 'next/server';
import { getPostBySlug } from '@/lib/blog/utils';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    
    return NextResponse.json({
      post,
      success: true
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to fetch blog post',
        success: false 
      },
      { status: 404 }
    );
  }
}
