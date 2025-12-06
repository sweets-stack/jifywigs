// client/app/dashboard/orders/page.tsx
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface Order {
  id: string;
  date: string;
  items: { name: string; qty: number }[];
  total: number;
  status: 'pending' | 'shipped' | 'delivered';
}

const mockOrders: Order[] = [
  {
    id: 'JW-7890',
    date: 'Dec 1, 2025',
    items: [{ name: 'Premium Bone Straight Wig', qty: 1 }],
    total: 38000,
    status: 'shipped',
  },
  {
    id: 'JW-7845',
    date: 'Nov 25, 2025',
    items: [
      { name: 'Wig Cap', qty: 2 },
      { name: 'Wig Glue', qty: 1 },
    ],
    total: 4500,
    status: 'delivered',
  },
];

export default function OrdersPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'shipped': return <Badge variant="secondary">Shipped</Badge>;
      case 'delivered': return <Badge variant="success">Delivered</Badge>;
      default: return <Badge variant="warning">Processing</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Orders</h1>
        <p className="text-gray-600 mt-1">Track and manage your purchases.</p>
      </div>

      <div className="space-y-4">
        {mockOrders.map((order) => (
          <Card key={order.id}>
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">Order #{order.id}</h3>
                  <p className="text-sm text-gray-600">{order.date}</p>
                </div>
                {getStatusBadge(order.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{item.name} × {item.qty}</span>
                    <span className="font-medium">
                      ₦{(item.qty * 10000).toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className="border-t pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span>₦{order.total.toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <Button size="sm">Track Order</Button>
                <Button size="sm" variant="outline">Reorder</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}