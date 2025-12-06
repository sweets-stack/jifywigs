// client/app/cart/page.tsx
'use client';

import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const shipping = totalPrice > 50000 ? 0 : 1500;
  const total = totalPrice + shipping;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      router.push(`/login?callbackUrl=/checkout`);
      return;
    }
    router.push('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h2 className="text-2xl font-bold mt-4">Your cart is empty</h2>
          <p className="text-gray-600 mt-2">Looks like you haven't added anything yet.</p>
          <Button
            onClick={() => router.push('/shop')}
            className="mt-6"
          >
            Browse Wigs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pt-8 pb-52">
      <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
      <p className="text-gray-600 mb-8">You have {totalItems} item{totalItems !== 1 ? 's' : ''} in your cart</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-jify-primary font-semibold mt-1">
                        ₦{item.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => updateQuantity(item.id, item.qty - 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{item.qty}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.qty + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <div className="ml-6 text-right">
                      <p className="font-semibold text-gray-900">
                        ₦{(item.price * item.qty).toLocaleString()}
                      </p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 text-red-500 hover:text-red-700"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex justify-between">
            <Link href="/shop" className="text-jify-primary font-medium hover:underline">
              ← Continue Shopping
            </Link>
            <div className="space-x-3">
              <Button 
                variant="outline"
                onClick={clearCart}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                Clear Cart
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  // Update cart if needed
                  console.log('Cart updated');
                }}
              >
                Update Cart
              </Button>
            </div>
          </div>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₦{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'FREE' : `₦${shipping.toLocaleString()}`}
                  </span>
                </div>
                {totalPrice > 50000 && (
                  <div className="flex justify-between text-green-600">
                    <span>Free Shipping Applied!</span>
                    <span>-₦1,500</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg pt-3 border-t">
                  <span>Total</span>
                  <span className="text-jify-primary">₦{total.toLocaleString()}</span>
                </div>
              </div>
              <Button
                onClick={handleCheckout}
                className="w-full mt-6"
                disabled={items.length === 0}
              >
                {isAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}
              </Button>
              {!isAuthenticated && (
                <div className="mt-4 text-center text-sm text-gray-500">
                  Or{' '}
                  <Link href="/register" className="text-jify-primary hover:underline">
                    create an account
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-medium mb-3">Need Help?</h3>
              <p className="text-gray-600 text-sm">
                Call us at +234 803 123 4567 or email hello@jifywigs.com
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}