import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Product } from '@jifywigs/shared/models';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connectToDatabase();
    
    const { slug } = params;
    
    // Decode URL-encoded slug
    const decodedSlug = decodeURIComponent(slug);
    
    const product = await Product.findOne({ slug: decodedSlug }).lean();
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(product);
    
  } catch (error: any) {
    console.error('Error fetching product by slug:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product', message: error.message },
      { status: 500 }
    );
  }
}