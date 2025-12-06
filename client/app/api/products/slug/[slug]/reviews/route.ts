// client/app/api/products/slug/[slug]/reviews/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Product, Review } from '@jifywigs/shared/models';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await connectToDatabase();
    
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '5');
    const skip = (page - 1) * limit;

    // Get product to verify exists
    const product = await Product.findOne({ slug: params.slug }).lean();
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Fetch approved reviews only
    const reviews = await Review.find({ 
      productId: product._id, 
      status: 'approved' 
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select('userId userName rating comment images verified createdAt')
    .lean();

    const totalReviews = await Review.countDocuments({ 
      productId: product._id, 
      status: 'approved' 
    });

    return NextResponse.json({
      reviews,
      currentPage: page,
      totalPages: Math.ceil(totalReviews / limit),
      totalReviews
    }, { status: 200 });
  } catch (error) {
    console.error('Reviews fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}