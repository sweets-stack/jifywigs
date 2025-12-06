import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { productId, quantity = 1 } = await request.json();
    if (!productId || quantity < 1) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    // In real app: call server API via fetch
    // For now: simulate success
    return NextResponse.json({
      items: [{ id: productId, name: 'Product', price: 10000, qty: quantity, image: '/images/product-1.jpg' }],
      totalItems: quantity,
      totalPrice: 10000 * quantity
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) {
      return NextResponse.json({ items: [], totalItems: 0, totalPrice: 0 }, { status: 200 });
    }

    // Simulate cart
    return NextResponse.json({
      items: [],
      totalItems: 0,
      totalPrice: 0
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ items: [], totalItems: 0, totalPrice: 0 }, { status: 200 });
  }
}