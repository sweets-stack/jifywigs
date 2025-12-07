// app/api/products/slug/[slug]/reviews/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { proxyToExpress } from '../../../../../../lib/api-proxy';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { status, data } = await proxyToExpress(
      request,
      `/products/${params.slug}/reviews`
    );
    return NextResponse.json(data, { status });
  } catch (error: any) {
    console.error('Reviews proxy error:', error);
    return NextResponse.json(
      { reviews: [], currentPage: 1, totalPages: 0, totalReviews: 0 },
      { status: 200 }
    );
  }
}