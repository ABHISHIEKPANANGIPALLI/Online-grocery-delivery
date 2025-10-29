import { ArrowLeft, Package, Truck, CheckCircle, User, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import type { Order, User as UserType } from '../App';

type OrderTrackingProps = {
  orders: Order[];
  onBack: () => void;
  user: UserType | null;
  onLogout: () => void;
};

export function OrderTracking({
  orders,
  onBack,
  user,
  onLogout,
}: OrderTrackingProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Package className="w-6 h-6 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="w-6 h-6 text-blue-500" />;
      case 'shipped':
        return <Truck className="w-6 h-6 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      default:
        return <Package className="w-6 h-6" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1>Order Tracking</h1>
            </div>
            
            {user && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">{user.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={onLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Order Tracking Content */}
      <div className="container mx-auto px-4 py-8">
        {orders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="mb-4">No orders yet</h2>
            <p className="text-gray-600 mb-6">Start shopping to see your orders here!</p>
            <Button onClick={onBack}>
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {[...orders].reverse().map((order) => (
              <div key={order.id} className="bg-white border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(order.status)}
                    <div>
                      <h3>Order #{order.id}</h3>
                      <p className="text-gray-600">
                        {order.date.toLocaleDateString()} at {order.date.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status.toUpperCase()}
                  </Badge>
                </div>

                <div className="border-t pt-4 mb-4">
                  <h3 className="mb-2">Order Items</h3>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-gray-700">
                        <span>{item.name} × {item.quantity}</span>
                        <span>₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4 mb-4">
                  <div className="flex justify-between mb-2">
                    <span>Delivery Address:</span>
                    <span className="text-right max-w-md">{order.deliveryAddress}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Method:</span>
                    <span className="uppercase">{order.paymentMethod}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span>Total Amount:</span>
                    <span className="text-green-600">₹{order.total}</span>
                  </div>
                </div>

                {/* Order Status Timeline */}
                <div className="mt-6 pt-6 border-t">
                  <h3 className="mb-4">Order Status</h3>
                  <div className="space-y-4">
                    <div className={`flex items-center gap-3 ${order.status === 'pending' || order.status === 'confirmed' || order.status === 'shipped' || order.status === 'delivered' ? 'text-green-600' : 'text-gray-400'}`}>
                      <CheckCircle className="w-5 h-5" />
                      <span>Order Placed</span>
                    </div>
                    <div className={`flex items-center gap-3 ${order.status === 'confirmed' || order.status === 'shipped' || order.status === 'delivered' ? 'text-green-600' : 'text-gray-400'}`}>
                      <CheckCircle className="w-5 h-5" />
                      <span>Order Confirmed</span>
                    </div>
                    <div className={`flex items-center gap-3 ${order.status === 'shipped' || order.status === 'delivered' ? 'text-green-600' : 'text-gray-400'}`}>
                      <Truck className="w-5 h-5" />
                      <span>Out for Delivery</span>
                    </div>
                    <div className={`flex items-center gap-3 ${order.status === 'delivered' ? 'text-green-600' : 'text-gray-400'}`}>
                      <CheckCircle className="w-5 h-5" />
                      <span>Delivered</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
