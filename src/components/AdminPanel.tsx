import { ArrowLeft, Package, Users, ShoppingCart, TrendingUp, User, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import type { Order, User as UserType } from '../App';

type AdminPanelProps = {
  orders: Order[];
  onBack: () => void;
  user: UserType | null;
  onLogout: () => void;
};

export function AdminPanel({
  orders,
  onBack,
  user,
  onLogout,
}: AdminPanelProps) {
  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;

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
              <h1>Admin Panel</h1>
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

      {/* Admin Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3>Total Sales</h3>
              <TrendingUp className="w-6 h-6" />
            </div>
            <p className="text-3xl">₹{totalSales}</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3>Total Orders</h3>
              <ShoppingCart className="w-6 h-6" />
            </div>
            <p className="text-3xl">{totalOrders}</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3>Pending</h3>
              <Package className="w-6 h-6" />
            </div>
            <p className="text-3xl">{pendingOrders}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3>Customers</h3>
              <Users className="w-6 h-6" />
            </div>
            <p className="text-3xl">1</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="orders">
          <TabsList>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="mt-6">
            <div className="bg-white border rounded-lg">
              <div className="p-4 border-b">
                <h2>All Orders</h2>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-gray-500">
                        No orders yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    [...orders].reverse().map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.date.toLocaleDateString()}</TableCell>
                        <TableCell>Customer</TableCell>
                        <TableCell>{order.items.reduce((sum, item) => sum + item.quantity, 0)}</TableCell>
                        <TableCell>₹{order.total}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              order.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : order.status === 'confirmed'
                                ? 'bg-blue-100 text-blue-800'
                                : order.status === 'shipped'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-green-100 text-green-800'
                            }
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="products" className="mt-6">
            <div className="bg-white border rounded-lg p-6">
              <h2 className="mb-4">Product Management</h2>
              <p className="text-gray-600">Product management features will be available here.</p>
              <Button className="mt-4">Add New Product</Button>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="bg-white border rounded-lg p-6">
              <h2 className="mb-4">Sales Analytics</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">Total Revenue</p>
                  <p className="text-green-600">₹{totalSales}</p>
                </div>
                <div>
                  <p className="text-gray-600">Average Order Value</p>
                  <p className="text-green-600">
                    ₹{totalOrders > 0 ? Math.round(totalSales / totalOrders) : 0}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Most Popular Category</p>
                  <p>Fruits</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
