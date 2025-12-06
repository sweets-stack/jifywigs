// client/app/api/reviews/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { writeFile, unlink } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';

export const maxDuration = 300; // 5 minutes for uploads

// ✅ POST /api/reviews — Submit review with photos
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract fields
    const productId = formData.get('productId') as string;
    const rating = formData.get('rating') as string;
    const comment = formData.get('comment') as string;
    const userId = formData.get('userId') as string;
    const userName = formData.get('userName') as string;

    // Validate
    if (!productId || !rating || !comment || !userId || !userName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Handle file uploads
    const files: { name: string; path: string }[] = [];
    const imageFiles = formData.getAll('images') as File[];

    for (const file of imageFiles) {
      if (file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const path = join(tmpdir(), `review-${Date.now()}-${file.name}`);
        await writeFile(path, buffer);
        files.push({ name: file.name, path });
      }
    }

    // Forward to backend
    const backendFormData = new FormData();
    backendFormData.append('productId', productId);
    backendFormData.append('rating', rating);
    backendFormData.append('comment', comment);
    backendFormData.append('userId', userId);
    backendFormData.append('userName', userName);

    files.forEach(file => {
      backendFormData.append('image', new Blob([require('fs').readFileSync(file.path)]), file.name);
    });

    const res = await fetch(`${process.env.BACKEND_URL}/api/reviews`, {
      method: 'POST',
      body: backendFormData,
    });

    // Clean up temp files
    files.forEach(file => unlink(file.path).catch(() => {}));

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error: any) {
    console.error('Review API error:', error);
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
}

// ✅ GET /api/reviews/[productId] — Get product reviews
export async function GET(request: NextRequest, { params }: { params: { productId: string } }) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';

    const res = await fetch(`${process.env.BACKEND_URL}/api/reviews/product/${params.productId}?page=${page}`);
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}